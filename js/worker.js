let worker = {};
!function(t,e){function n(t){return t&&e.XDomainRequest&&!/MSIE 1/.test(navigator.userAgent)?new XDomainRequest:e.XMLHttpRequest?new XMLHttpRequest:void 0}function o(t,e,n){t[e]=t[e]||n}var r=["responseType","withCredentials","timeout","onprogress"];t.ajax=function(t,a){function s(t,e){return function(){c||(a(void 0===f.status?t:f.status,0===f.status?"Error":f.response||f.responseText||e,f),c=!0)}}var u=t.headers||{},i=t.body,d=t.method||(i?"POST":"GET"),c=!1,f=n(t.cors);f.open(d,t.url,!0);var l=f.onload=s(200);f.onreadystatechange=function(){4===f.readyState&&l()},f.onerror=s(null,"Error"),f.ontimeout=s(null,"Timeout"),f.onabort=s(null,"Abort"),i&&(o(u,"X-Requested-With","XMLHttpRequest"),e.FormData&&i instanceof e.FormData||o(u,"Content-Type","application/x-www-form-urlencoded"));for(var p,m=0,v=r.length;v>m;m++)p=r[m],void 0!==t[p]&&(f[p]=t[p]);for(var p in u)f.setRequestHeader(p,u[p]);return f.send(i),f},e.nanoajax=t}({},function(){return this}());

worker.data = {
    ids: [],
    turnDataPromise: [],
    callbackData: [],
};

worker.url = {
    infoTemplate: 'https://gip-api.demo-server.ml/api/Template/',
};

worker.handlers = {
    AddAllIds: (arr) => worker.data.ids = arr.map(obj => obj.id),
    getTemplateData: (id) => {
        const template = worker.data.callbackData.find( obj => obj.id === id);
        worker.actions.emit(template)
    },
    fetchData: (arr) => {
        worker.data.ids = [];
        worker.data.callbackData = [];
        worker.handlers.AddAllIds(arr);
        worker.handlers.callbackHell();
    },
    callbackHell: () => {
        if (worker.data.ids.length) {
            worker.fetch.get(worker.data.ids[0]).then((resp) => {
                worker.data.callbackData.push(resp);
                worker.actions.emit(resp);
                worker.data.ids.splice(0, 1);
                worker.handlers.callbackHell();
            }).catch((e) => {
                console.error('Response error', e);
                worker.data.ids.splice(0, 1);
                worker.handlers.callbackHell();
            });
        }
    }
};

worker.actions = {
    listeners: () => {
        self.addEventListener('message', (e) => {
            switch (e.data.data.action) {
                case 'get':
                    worker.handlers.getTemplateData();
                    break;
                case 'fetch':
                    worker.handlers.fetchData(e.data.data.data);
                    break;
                default:
                    console.error('not found handlers');
            }
        }, false);
    },
    emit: (data) => self.postMessage(data,null),
};

worker.fetch = {
    get: (id) => {
        return new Promise((resolve,reject) => {
            nanoajax.ajax({ url: worker.url.infoTemplate + id, method: 'GET'}, function (code, responseText, request) {
                if(code === 200) {
                    resolve(JSON.parse(responseText))
                }else{
                  reject(responseText);
                }
            })
        } );
    },
};

worker.actions.listeners();




