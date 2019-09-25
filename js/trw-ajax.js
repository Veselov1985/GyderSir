let ajax = {};
ajax.production = false;
ajax.devFlow = 'https://gip-api.demo-server.ml';
ajax.prodFlow = '';
ajax.root = ajax.production ? ajax.prodFlow : ajax.devFlow;
ajax.routes = {
    template: `${ajax.root}/api/TemplateRequest`,
    job: `${ajax.root}/api/TemplateRequest/`,
    process: `${ajax.root}/api/TemplateRequest/process`,
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
    errorAuth: (errorThrown) => {
        if (errorThrown === 'Unauthorized') {
            sign.local.deleteLocal('token');
            sign.data.token = false;
            sign.view.main.showSignIn();
        }
    },
    getAll: () => {
        trw.worker.fetchTemplate = [];
        return new Promise((resolve, reject) => {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sign.data.token}`,
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
                    ajax.ajax.errorAuth(errorThrown);
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
        if (find) return new Promise(resolve => {
            ajax.loader.handler.offLoad();
            return resolve(find)
        });
        return new Promise((resolve, reject) => {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sign.data.token}`,
                },
                url: `${ajax.routes.template}/${id}`,
                type: "GET",
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

ajax.loader.handler.init();
