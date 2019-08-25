!function(t,e){function n(t){return t&&e.XDomainRequest&&!/MSIE 1/.test(navigator.userAgent)?new XDomainRequest:e.XMLHttpRequest?new XMLHttpRequest:void 0}function o(t,e,n){t[e]=t[e]||n}var r=["responseType","withCredentials","timeout","onprogress"];t.ajax=function(t,a){function s(t,e){return function(){c||(a(void 0===f.status?t:f.status,0===f.status?"Error":f.response||f.responseText||e,f),c=!0)}}var u=t.headers||{},i=t.body,d=t.method||(i?"POST":"GET"),c=!1,f=n(t.cors);f.open(d,t.url,!0);var l=f.onload=s(200);f.onreadystatechange=function(){4===f.readyState&&l()},f.onerror=s(null,"Error"),f.ontimeout=s(null,"Timeout"),f.onabort=s(null,"Abort"),i&&(o(u,"X-Requested-With","XMLHttpRequest"),e.FormData&&i instanceof e.FormData||o(u,"Content-Type","application/x-www-form-urlencoded"));for(var p,m=0,v=r.length;v>m;m++)p=r[m],void 0!==t[p]&&(f[p]=t[p]);for(var p in u)f.setRequestHeader(p,u[p]);return f.send(i),f},e.nanoajax=t}({},function(){return this}());

let ajax = {};
ajax.production = false;
ajax.devFlow = 'https://gip-api.demo-server.ml';
ajax.prodFlow = '';
ajax.root = ajax.production ? ajax.prodFlow : ajax.devFlow;
ajax.routes = {
    template: `${ajax.root}/api/Template`,
    job: `${ajax.root}/api/Template/job`,
    process: `${ajax.root}/api/Template/process`,
};
ajax.loader = {};
ajax.loader.element = {class: 'preloader', object: {}};

ajax.loader.handler = {
    init: () => {
        ajax.loader.element.object = $(`.${ajax.loader.element.class}`)
    },
    onLoad: () => {
        ajax.loader.element.object.css('display', 'block')
    },
    offLoad: () => {
        ajax.loader.element.object.css('display', 'none')
    },
};

ajax.ajax = {
    getAll: () => {
        trw.worker.fetchTemplate = [];
        return new Promise((resolve, reject) => {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: ajax.routes.template,
                type: "GET",
                dataType: 'json',
                success: (data, textStatus, jqXHR) => {
                    if (trw.worker.worker) {
                        trw.worker.emit({action: 'fetch', data});
                    }
                    snack.alert('Data updated');
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject([jqXHR, textStatus, errorThrown]);
                },
                beforeSend: () => {
                    ajax.loader.handler.onLoad()
                },
                complete: () => {
                    ajax.loader.handler.offLoad()
                }
            });
        })
    },
    getId: (id) => {
        ajax.loader.handler.onLoad();
        const find = trw.worker.fetchTemplate.find(t => t.id == id);
        if (find) return new Promise(resolve => {  ajax.loader.handler.offLoad(); return resolve(find)});
        return new Promise((resolve,reject) => {
            nanoajax.ajax({ url: `${ajax.routes.template}/${id}`, method: 'GET',withCredentials: false, cors: false ,   timeout: 1000 * 60 }, function (code, responseText, request) {
                if(code === 200) {
                    resolve(JSON.parse(responseText))
                }else{
                    reject(responseText);
                }
                ajax.loader.handler.offLoad()
            })
        } );

        // return new Promise((resolve, reject) => {
        //     $.ajax({
        //         headers: {
        //             'accept': 'application/json',
        //             'Content-Type': 'application/json',
        //             'Access-Control-Allow-Origin': '*'
        //         },
        //         url: `${ajax.routes.template}/${id}`,
        //         type: 'GET',
        //         success: function (data, textStatus, jqXHR) {
        //             resolve(data);
        //         },
        //         error: function (jqXHR, textStatus, errorThrown) {
        //             reject([jqXHR, textStatus, errorThrown]);
        //         },
        //         beforeSend: () => {
        //             ajax.loader.handler.onLoad()
        //         },
        //         complete: () => {
        //             ajax.loader.handler.offLoad()
        //         }
        //     })
        // });
    },
    getProcess: (id, pks) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: `${ajax.routes.process}/${id}`,
                type: "PUT",
                data: JSON.stringify({templateId: `${pks}`}),
                dataType: 'json',
                success: (data, textStatus, jqXHR) => {
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject([jqXHR, textStatus, errorThrown])
                },
                beforeSend: () => {
                    ajax.loader.handler.onLoad()
                },
                complete: () => {
                    ajax.loader.handler.offLoad()
                }
            });
        })
    },
};
