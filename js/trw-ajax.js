var ajax = {};
ajax.production = false;
ajax.devFlow = 'https://gip-api.demo-server.ml';
ajax.prodFlow = '';
ajax.root = ajax.production ? ajax.prodFlow : ajax.devFlow;
ajax.routes = {
    template: `${ajax.root}/api/Template`,
    job: `${ajax.root}/api/Template/job`,
    process: `${ajax.root}/api/Template/process`,
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
                    Snackbar.show({text: 'Data updated', pos: 'top-right'});
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject([jqXHR, textStatus, errorThrown]);
                },
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
            })
        });
    },
    getJob: (jobId, data) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: `${ajax.routes.job}/${jobId}`,
                type: "POST",
                data: JSON.stringify(data),
                dataType: 'json',
                success: (data, textStatus, jqXHR) => {
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject([jqXHR, textStatus, errorThrown]);
                },
            });
        })
    },
    getProcess: (id) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: `${ajax.routes.process}/${id}`,
                type: "PUT",
                data: JSON.stringify(id),
                dataType: 'json',
                success: (data, textStatus, jqXHR) => {
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject([jqXHR, textStatus, errorThrown])
                },
            });
        })
    },
};
