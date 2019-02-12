let trw = {};
window.webkitStorageInfo = navigator.webkitTemporaryStorage || navigator.webkitPersistentStorage;
document.origin = window.origin || self.origin;
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
                        return '<span data-id=' + full + '>' + data + '</span>';
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
        console.log(data);
        trw.callbackActions.factory(data);
    }
};

trw.callbackActions = {
    factory: (data) => {
        switch (data.event) {
            case 'Save Template':
                trw.handlers.saveTemplateParent(data);
                break;
                case '':
                break;
            default:
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
            case 'value2':
                break;
            default:
                break;
        }
    },
    pdfNextStep: function () {
        if (trw.data.zag.length !== 0) {
            const obj = trw.handlers.getNextStepIdObj();
            trw.data.obj = $.extend({}, obj);
            ajax.ajax.getId(trw.data.obj.id).then(data => {
                //  trw.EventEmmiter.emit( {event: 'DocumentProcessing', obj: trw.data.obj, Template: data});
                console.log('TEMPLATE from Api', data);
                // TODO TEST BLOCK MOCA

                moca.get.template().then(data => {
                    console.log(data);
                    trw.EventEmmiter.emit({event: 'DocumentProcessing', obj: trw.data.obj, Template: data});
                }).catch(err => console.log(err));

                // TODO TEST BLOCK MOCA END

            }).catch(() => Snackbar.show({text: 'Error Server'})
            )
        } else {
            // listen end doc => close window
            // check update list Request templates
            ajax.ajax.getAll().then(data => {
                if (data.length === 0) {
                    trw.EventEmmiter.emit(trw.ACTIONSCREATER.CloseWindow());
                } else {
                    trw.handlers.getTemplatesSuccess(data);
                }
            }).catch(() => {
                Snackbar.show({text: 'Error update'});
            });
        }
    },
};


trw.handlers = {
    deletePrewJob: (id) => {
        trw.data.zag = trw.data.zag.filter(val => +val[2]!== id);
        trw.dataTable.init(trw.dataTable.object, trw.data.zag);
    },
    saveTemplateParent: (data) => {
        ajax.ajax.getProcess(data.obj.id, data.templateId)   // send id Template and Pks create Template
            .then((response) => {
              if(response ) {
                  // need  remove id worker in the list
                  trw.handlers.deletePrewJob(response.id);
                  trw.chakeEvents.pdfNextStep();
              }
            })
            .catch( (err) => {
                Snackbar.show({text: 'Server Error'});
                console.log(err[1])
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
            // TODO maybe need emit data???
            ajax.ajax.getId(trw.data.obj.id).then(data => {
                //  trw.EventEmmiter.emit( {id: trw.data.obj.id ,Template:[]});
                console.log('TEMPLATE from Api', data);

                // TODO TEST BLOCK MOCA
                moca.get.template().then(data => {
                    console.log(data);
                    trw.EventEmmiter.emit({event: 'DocumentProcessing', obj: trw.data.obj, Template: data});
                }).catch(err => console.log(err));

                // TODO TEST BLOCK MOCA END
            }).catch(error => {
                console.log('Error Response server', error[1]);
                Snackbar.show({text: 'Try Latter', pos: 'top-right'});
                // TODO TEST BLOCK MOCA
                moca.get.template().then(data => {
                    console.log(data);
                    trw.EventEmmiter.emit({event: 'DocumentProcessing', id: id, Template: data});
                }).catch(err => console.log(err));


                // TODO TEST BLOCK MOCA


            });
        } else {
            Snackbar.show({text: 'You must select at least one', pos: 'top-right'});
        }
    });

    // update child data
    trw.elements.temp_request_child_update.on('click', function () {
        ajax.ajax.getAll().then(data => {
            trw.handlers.getTemplatesSuccess(data);
            window.focus();
            Snackbar.show({text: 'Data Update', pos: 'top-right'})
        }).catch(err => {
            Snackbar.show({text: `Server Error ${err[1]}`, pos: 'top-right'})
        })
    });

    // close child window
    trw.elements.temp_request_cancel.on('click', function () {
        window.close();
    });
};


$(document).ready(function () {
    trw.init();
    trw.action();
    // get document list data
    ajax.ajax.getAll()
        .then(data => {
            if(data.length !== 0 ) {
                trw.handlers.getTemplatesSuccess(data);
                window.focus();
                trw.chakeEvents.pdfNextStep();
            }
        })
        .catch(error => {
            Snackbar.show({text: `Server Error`, pos: 'top-right'});
            console.log(error[1]);

            // TODO TEST Section
            moca.get.table().then(data => {
                console.log(data);
                trw.handlers.getTemplatesSuccess(data);
                window.focus();
            })
            // TODO End  TEST Section
        });

    $(window).on("beforeunload", function () {
        console.log('emit prepend close')
        trw.EventEmmiter.emit({event: 'CloseChild'});
        return true;
    })

});

