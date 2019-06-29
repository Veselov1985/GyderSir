let trw = {};
window.webkitStorageInfo = navigator.webkitTemporaryStorage || navigator.webkitPersistentStorage;
document.origin = window.origin || self.origin;
trw.dev = true;
trw.rootPathWorker = trw.dev ? '/js/worker.js':'/Scripts/worker.js';
trw.elements = {};
trw.data = {
    obj: {},
    zag: []
};

trw.init = function () {
    trw.elements.btn_send_req = $('#btn_send_req');
    //table child
    trw.elements.temp_request_table_child = $('#temp_request_table_child');
    trw.dataTable.object = trw.elements.temp_request_table_child;
    // btn child
    trw.elements.temp_request_child_upload = $('#temp_request_child_upload');
    trw.elements.temp_request_child_update = $('#temp_request_child_update');
    trw.elements.temp_request_cancel = $('#temp_request_cancel');
    ajax.loader.handler.init()
};

trw.worker = {
    fetchTemplate:[],
    worker: undefined,
    isEnabledWorker: () => typeof(Worker) !== "undefined",
    init: () => {
        if (trw.worker.isEnabledWorker()) {
            trw.worker.worker = new Worker(trw.rootPathWorker);
            trw.worker.listener();
            snack.info('Worker Enabled');
        } else {
            snack.error('Worker Disabled');
        }
    },
    emit: (data) => {
        trw.worker.worker.postMessage({data});
    },
    listener: () => {
        trw.worker.worker.onmessage = (event) => {
            trw.worker.fetchTemplate.push(event.data);
            snack.info('Worker fetch Template');
        }
    },
    terminate: () => {
        trw.worker.worker.terminate();
        trw.worker.worker = undefined;
    },
};


trw.dataTable = {
    object: {},
    dt: {},
    activ: {},
    clean: function () {
        if (!$.isEmptyObject(trw.dataTable.dt)) {
            trw.dataTable.dt.destroy();
            trw.dataTable.object.find('tbody').remove();
            trw.dataTable.dt = {};
        }
    },
    init: function (table, data) {
        trw.dataTable.clean();
        trw.dataTable.dt = table.DataTable({
            "pagingType": 'simple_numbers',
            "order": [],
            "lengthMenu": [
                [15],
                [15]
            ],
            "select": true,
            "responsive": true,
            "data": data,
            "columnDefs": [
                {
                    'targets': 0,
                    'orderable': true,
                    'searchable': true,
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                        return `<span data-id="${full.join(',')}">${data}</span>`;
                    }
                },
                {
                    'targets': 1,
                    'orderable': true,
                    'searchable': true,
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                        return data;
                    },
                },
                {
                    'targets': 2,
                    'orderable': true,
                    'searchable': true,
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                        return data;
                    },
                },
                {
                    'targets': 3,
                    'orderable': true,
                    'searchable': true,
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                        return data;
                    },
                }
            ],
            "columns": [
                {title: "Template Name"},
                {title: "fileId"},
                {title: "id"},
                {title: 'jobId'},
            ],
            "dom": "<'row'<'col-md-12'f>>t<'clear'><'row'<'col-md-12'p>>",
        });
    },
};

trw.helpfunc = {
    clearMemoryDataTable: function () {
        trw.data.zag = [];
        trw.data.obj = {};
    },
    initMemoryDataTable: function (data) {
        trw.helpfunc.clearMemoryDataTable();
        trw.data.zag = data.map((val) => {
            const res = [val.fileName, val.fileId, val.id, val.jobId];
            return res;
        });
    },
    isValidJSON: (str) => {
        try {
            const obj = JSON.parse(str);
            if (obj !== undefined && obj !== null && typeof obj === 'object') {
                return true;
            } else {
                return false
            }
        } catch {
            return false;
        }
    },

};

trw.EventEmmiter = {
    listen: function (callback) {
        let eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        let eventer = window[eventMethod];
        let messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        // Listen to message from parent window
        eventer(messageEvent, function (e) {
            if (!trw.debug && e.origin != window.origin) return;
            console.log('origin: ', e.origin);
            console.log('parent received message!: ', e.data);
            callback(e.data);
        }, false);
    },
    emit: function (data) {
        self.opener.postMessage(data, '*');
    },
    callbackHandlers: function (data) {
        trw.callbackActions.factory(data);
    }
};

trw.callbackActions = {
    factory: (data) => {
        switch (data.event) {
            case 'Save Template':
                trw.handlers.saveTemplateParent(data);
                break;
            default:
                console.log('error in callback');
                break;
        }
    }
};

trw.ACTIONSCREATER = {
    documentProcessing: function (obj) {
        return {event: 'DocumentProcessing', data: obj};
    },
    CloseWindow: function () {
        return {event: 'CloseChild'};
    }
};
trw.chakeEvents = {
    init: function (message, data) {
        switch (message) {
            case 'NextStep':
                tr.chakeEvents.pdfNextStep(data);
                break;
            default:
                console.log('error in callback');
                break;
        }
    },
    pdfNextStep: function () {
        if (trw.data.zag.length !== 0) {
            const obj = trw.handlers.getNextStepIdObj();
            trw.data.obj = $.extend({}, obj);
            trw.handlers.getTemplateAndSendParent(trw.data.obj.id);
        } else {
            // listen end doc => close window
            // check update list Request templates
            ajax.ajax.getAll().then(data => {
                if (data.length === 0) {
                    trw.EventEmmiter.emit(trw.ACTIONSCREATER.CloseWindow());
                } else {
                    trw.handlers.getTemplatesSuccess(data);
                    const obj = trw.handlers.getNextStepIdObj();
                    trw.data.obj = $.extend({}, obj);
                    trw.handlers.getTemplateAndSendParent(trw.data.obj.id);
                }
            }).catch(() => {
                snack.error('Error update');
            });
        }
    },
};


trw.handlers = {
    checkParent: () => {
        setInterval(trw.handlers.checkOpener, 5000);
    },
    // Check parent window is exist
    checkOpener: () => {
        const child = (self || this || window);
        const childOpener = child.opener;
        childOpener ? console.log('child have Parent') : child.close();
    },
    deletePrewJob: (id) => {
        trw.data.zag = trw.data.zag.filter(val => +val[2] !== id);
        trw.dataTable.init(trw.dataTable.object, trw.data.zag);
    },
    saveTemplateParent: (data) => {
        ajax.ajax.getProcess(data.obj.id, data.templateId)   // send id Template and Pks create Template
            .then((response) => {
                if (response) {
                    // need  remove id worker in the list
                    trw.handlers.deletePrewJob(response.id);
                    trw.chakeEvents.pdfNextStep();
                }
            })
            .catch((err) => {
                snack.error(`Server Error: ${err[1]}`);
            });
    },
    getTemplatesSuccess: function (data) {
        trw.helpfunc.initMemoryDataTable(data);
        trw.dataTable.init(trw.dataTable.object, trw.data.zag);
    },
    getNextStepIdObj: () => {
        const dataAttr = trw.data.zag[0];
        return {
            fileName: dataAttr[0],
            fileId: +dataAttr[1],
            id: +dataAttr[2],
            jobId: +dataAttr[3],
        }
    },
    getSelectedTr: function () {
        return trw.dataTable.object.find('.selected');
    },
    getIdSelectedTemplate: function (trw) {
        const dataAttr = trw.find('span').data('id').split(',');
        return {
            fileName: dataAttr[0],
            fileId: +dataAttr[1],
            id: +dataAttr[2],
            jobId: +dataAttr[3],
        }
    },
    getTemplateAndSendParent: (id) => {
        ajax.ajax.getId(id)
            .then(data => {
                // validate JSON String
                if (trw.helpfunc.isValidJSON(data.data)) {
                    console.log('TEMPLATE from Api', data);
                    const Template = JSON.parse(data.data);
                    trw.EventEmmiter.emit({event: 'DocumentProcessing', id: trw.data.obj, Template});
                } else {
                    snack.error('Bad Document');
                    trw.handlers.deletePrewJob(trw.data.obj.id);
                    trw.chakeEvents.pdfNextStep();
                }
            })
            .catch(error => {
                console.log('Error Response server', error[1]);
                snack.error(`${error[1]}`)
            });
    }
};

trw.action = function () {
    // listener parent window
    trw.EventEmmiter.listen(trw.EventEmmiter.callbackHandlers);
    // Upload Events
    trw.elements.temp_request_child_upload.on('click', function () {
        const trSelected = trw.handlers.getSelectedTr();
        if (trSelected.length > 0) {
            const obj = trw.handlers.getIdSelectedTemplate(trSelected);
            trw.data.obj = $.extend({}, obj);
            trw.handlers.getTemplateAndSendParent(trw.data.obj.id);
        } else {
            snack.info('You must select at least one');
        }
    });

    // update child data
    trw.elements.temp_request_child_update.on('click', function () {
        ajax.ajax.getAll().then(data => {
            trw.handlers.getTemplatesSuccess(data);
            window.focus();
            snack.alert('Data Update');
        }).catch(err => {
            snack.error(`Server Error ${err[1]}`)
        })
    });

    // close child window
    trw.elements.temp_request_cancel.on('click', function () {
        trw.worker.terminate();
        window.close();
    });
};


$(document).ready(function () {
    trw.handlers.checkOpener();
    trw.init();
    trw.action();
    // TODO feature WORKER
    trw.worker.init();
    // End WORKER
    // get document list data
    ajax.ajax.getAll()
        .then(data => {
            if (data.length !== 0) {
                trw.handlers.getTemplatesSuccess(data);
                window.focus();
                trw.chakeEvents.pdfNextStep();
            } else {
                snack.info('Not find any work')
            }
        })
        .catch(error => {
            snack.error(`Server Error: ${error[1]}`);

            // TODO TEST Section
            moca.get.table().then(data => {
                trw.handlers.getTemplatesSuccess(data);
                window.focus();
            })
            // TODO End  TEST Section
        }).finally(() => {
        trw.handlers.checkParent();
    });

    $(window).on("beforeunload", function () {
        console.log('emit prepend close');
        trw.worker.terminate();
        trw.EventEmmiter.emit({event: 'CloseChild'});
        return true;
    })
});

