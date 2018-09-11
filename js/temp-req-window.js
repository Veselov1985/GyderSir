var trw = {};
trw.debug = false;
trw.workRoot = '';
trw.root = trw.debug ? '' : trw.workRoot;
trw.routes = {
    getTemplateUrl: trw.root + '',
};

window.webkitStorageInfo = navigator.webkitTemporaryStorage || navigator.webkitPersistentStorage;
document.origin = window.origin || self.origin;

trw.elements = {};
trw.data = {
    id: '',
    zag: [
        ['doc1',
            'rer@mail.ru',
            new Date(),
            1,
        ],
        ['doc2',
            'rer2@mail.ru',
            new Date(),
            2
        ],
        ['doc3',
            'rer3@mail.ru',
            new Date(),
            3
        ],
        ['doc4',
            'rer4@mail.ru',
            new Date(),
            4
        ],
        ['doc5',
            'rer5@mail.ru',
            new Date(),
            5
        ],
    ]
};


trw.init = function() {
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
    clean: function() {
        if (!$.isEmptyObject(trw.dataTable.dt)) {
            trw.dataTable.dt.destroy();
            trw.dataTable.object.find('tbody').remove();
            trw.dataTable.dt = {};
        }
    },
    init: function(table, data) {
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
            "columnDefs": [{
                    'targets': 0,
                    'orderable': true,
                    'searchable': true,
                    'className': 'dt-body-center',
                    'render': function(data, type, full, meta) {
                        return '<span data-id=' + full[3] + '>' + data + '</span>';
                    }
                },
                {
                    'targets': 1,
                    'orderable': true,
                    'searchable': true,
                    'className': 'dt-body-center',
                    'render': function(data, type, full, meta) {
                        return data;
                    },
                },
                {
                    'targets': 2,
                    'orderable': true,
                    'searchable': true,
                    'className': 'dt-body-center',
                    'render': function(data, type, full, meta) {
                        return data;
                    },
                }
            ],
            "columns": [
                { title: "Template Name" },
                { title: "Email" },
                { title: "Time" }
            ],
            "dom": "<'row'<'col-md-12'f>>t<'clear'><'row'<'col-md-12'p>>",
        });
    },
};


trw.helpfunc = {
    clearMemoryDataTable: function() {
        tr.data.zag = [];
        tr.data.id = '';
    },
    initMemoryDataTable: function(data) {
        trw.helpfunc.clearMemoryDataTable();
        data.forEach(function(el, i) {
            tr.data.zag.push([el]);
        });
    },

};

trw.EventEmmiter = {
    listen: function(callback) {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        // Listen to message from parent window
        eventer(messageEvent, function(e) {
            if (!trw.debug && e.origin != window.origin) return;
            console.log('origin: ', e.origin);
            console.log('parent received message!: ', e.data);
            callback(e.data);
        }, false);
    },
    emit: function(data) {
        // data => { token: 'aaa', secret: 'bbb' }

        self.opener.postMessage(data, '*');
        // window.opener.postMessage(data, '*');
    },
    callbackHandlers: function(data) {
        console.log(data);
    }
};


trw.ACTIONSCREATER = {
    documentProcessing: function(obj) {
        return { event: 'DocumentProcessing', data: obj };
    },
    CloseWindow: function() {
        return { event: 'CloseChild' };
    }


};

trw.chakeEvents = {
    init: function(message, data) {
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
    pdfNextStep: function(data) {
        trw.handlers.filterProcessedDocumnet(data.id);
        trw.Ajax.deleteTemplateDocument(data.id);
        if (trw.dataTable.object.find('tr').length != 0) {
            var next = trw.data.zag[0];
            trw.Ajax.getTemplateDocument(next[3]);
        } else {
            // listen end doc => close window

            trw.EventEmmiter.emit(trw.ACTIONSCREATER.CloseWindow()); // in future add sheck update list on the server
        }


        // clear id prew pdf document
        // @ send id to Api => delete in database
        // send next filter: 
    },

};



trw.handlers = {
    getTemplatesuccess: function(data) {
        trw.helpfunc.initMemoryDataTable(data);
        trw.dataTable.init(trw.dataTable.object, trw.data.zag);
    },
    getSelectedTr: function() {
        return trw.dataTable.object.find('.selected');
    },
    getIdSelectedTemplate: function(trw) {
        return trw.find('span').data();
    },

    getDocumentsuccess: function(data) {
        var obj = { id: data.id, file: data.file };
        trw.EventEmmiter.emit(trw.ACTIONSCREATER.documentProcessing(obj));
    },
    filterProcessedDocumnet: function(id) {
        trw.data.zag = trw.data.zag.filter(function(val) {
            return val.id != id;
        });
    }
};


trw.Ajax = {
    getTemplate: function(url, data) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                trw.handlers.getTemplatesuccess(data);
                Snackbar.show({ text: 'Data updated', pos: 'top-right' });

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            },
            beforeSend: function() {},
            complete: function() {}
        });

    },
    getTemplateDocument: function(id) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: url,
            type: "POST",
            data: JSON.stringify(id),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                trw.handlers.getDocumentsuccess(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            },
            beforeSend: function() {},
            complete: function() {}
        });
    },
    deleteTemplateDocument: function(id, url) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: url,
            type: "POST",
            data: JSON.stringify(id),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            },
            beforeSend: function() {},
            complete: function() {}
        });
    },

};


trw.action = function() {
    // listener parent window
    trw.EventEmmiter.listen(trw.EventEmmiter.callbackHandlers);

    // Upload Events
    trw.elements.temp_request_child_upload.on('click', function() {
        var trSelected = trw.handlers.getSelectedTr();
        if (trSelected.length > 0) {
            var id = trw.handlers.getIdSelectedTemplate(trSelected);
            trw.data.id = id;
            /* -----------------------------------------
            @need ajax to get pdf.file at the server

            trw.ajax.getTemplateDocument(trw.data.id);

             ----------------------------
            */
            trw.EventEmmiter.emit(id);
        } else {
            Snackbar.show({ text: 'You must select at least one', pos: 'top-right' });
        }
    });

    // update child data
    trw.elements.temp_request_child_update.on('click', function() {
        //  trw.Ajax.getTemplate();
    });

    // close child window
    trw.elements.temp_request_cancel.on('click', function() {
        window.close();
    });
};




$(document).ready(function() {
    trw.init();
    trw.action();
    // get document list data
    // trw.Ajax.getTemplate(trw.routes.getTemplateUrl);
    trw.dataTable.init(trw.dataTable.object, trw.data.zag);
    window.focus();
});