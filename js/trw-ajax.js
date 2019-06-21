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
ajax.loader.element = {class:'preloader', object:{}};

ajax.loader.handler={
    init:()=> { ajax.loader.element.object = $(`.${ajax.loader.element.class}`)},
    onLoad:() => {ajax.loader.element.object.css('display','block')},
    offLoad:()=> {ajax.loader.element.object.css('display','none')},
};

ajax.ajax = {
    getAll: () => {
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
                    resolve(data);
                    snack.alert('Data updated');
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject([jqXHR, textStatus, errorThrown]);
                },
                beforeSend:()=> {ajax.loader.handler.onLoad()},
                complete:() => {ajax.loader.handler.offLoad()}
            });
        })
    },
    getId: (id) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                url: `${ajax.routes.template}/${id}`,
                type: 'GET',
                success: function (data, textStatus, jqXHR) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject([jqXHR, textStatus, errorThrown]);
                },
                beforeSend:()=> {ajax.loader.handler.onLoad()},
                complete:() => {ajax.loader.handler.offLoad()}
            })
        });
    },
    getProcess: (id,pks) => {
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
                beforeSend:()=> {ajax.loader.handler.onLoad()},
                complete:() => {ajax.loader.handler.offLoad()}
            });
        })
    },
};
