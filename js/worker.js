let worker = {};

worker.data = {
    turnDataPromise: [],
    callbackData: [],
};

worker.url = {
    infoTemplate: `https://gip-api.demo-server.ml/api/Template/`,
};

worker.handlers = {
    getAllIdToPromise: (arr) => worker.data.turnDataPromise = [].concat(arr.map((obj) => worker.fetch.get(obj.id))),
    callbackTurn: () => Promise.all(worker.data.turnDataPromise),
    getAllTemplate: (arr) => Promise.all(arr.map((obj) => worker.fetch.get(obj.id))),
};

worker.actions = {
    listeners: () => {
        self.addEventListener('message', (e) => {
            worker.handlers.getAllTemplate(e.data.data).then((arr) => {
                worker.actions.emit(arr);
            });
        }, false);
    },
    emit: (data) => self.postMessage('worker', null, [...data]),
};

worker.fetch = {
    get: (id) => {
        return fetch(worker.url.infoTemplate + id,
            {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                credentials: 'omit',
                mode: 'no-cors',
            });
    },
    post: (url, data) => {
    }
};

worker.actions.listeners();




