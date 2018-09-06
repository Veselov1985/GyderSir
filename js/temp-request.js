var tr = {};
tr.data = {
    windowChild: '',
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

tr.elements = {};



tr.elements.init = function() {
    tr.elements.btn_temp_request = $('#btn_temp_request');
    // modal window
    tr.elements.temp_request_modal = $('#temp_request_modal');
    tr.elements.temp_request_upload = $('#temp_request_upload');
    tr.elements.temp_request_cancel = $('#temp_request_cancel');
    //table
    tr.dataTable.object = $('#temp_request_table');
};

tr.dataTable = {
    object: {},
    dt: {},
    activ: {},
    clean: function() {
        if (!$.isEmptyObject(tr.dataTable.dt)) {
            tr.dataTable.dt.destroy();
            tr.dataTable.object.find('tbody').remove();
            tr.dataTable.dt = {};
        }
    },
    init: function(table, data) {
        tr.dataTable.clean();
        tr.dataTable.dt = table.DataTable({
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
                    'orderable': false,
                    'searchable': false,
                    'className': '',
                    'render': function(data, type, full, meta) {
                        return '<span data-id=' + full[3] + '>' + data + '</span>';
                    }
                },
                {
                    'targets': 1,
                    'orderable': false,
                    'searchable': false,
                    'className': 'dt-body-center',
                    'render': function(data, type, full, meta) {
                        return data;
                    },
                },
                {
                    'targets': 2,
                    'orderable': false,
                    'searchable': false,
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
            "dom": "t<'clear'><'row'<'col-md-12'p>>",
        });
    },
};


tr.handlers = {
    getTemplatesuccess: function(data) {
        tr.helpfunc.initMemoryDataTable(data);
        tr.dataTable.init(tr.dataTable.object, tr.data.zag);
    },


    getDocumentsuccess: function(data) {

        /*
        @need send to part pdf Load events
           temp.Data.LoadPdfOpt.file_pdf = new FormData();
            $.each(data, function(key, value) {
                temp.Data.LoadPdfOpt.file_pdf.append(key, value);
            });
            temp.Ajax.sendFileToProccess(null,temp.loadEvent.success, temp.loadEvent.error);
        
     
                tr.elements.temp_request_modal.modal('hide');

        */
    },
    getSelectedTr: function() {
        return tr.dataTable.object.find('.selected');
    },
    getIdSelectedTemplate: function(tr) {
        return tr.find('span').data();
    },
};

tr.helpfunc = {
    clearMemoryDataTable: function() {
        tr.data.zag = [];
        tr.data.id = '';
    },
    initMemoryDataTable: function(data) {
        tr.helpfunc.clearMemoryDataTable();
        data.forEach(function(el, i) {
            tr.data.zag.push([el]);
        });
    },
};


tr.ajax = {
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
                tr.handlers.getTemplatesuccess(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            },
            beforeSend: function() {
                pm.handlers.showPreloader();
            },
            complete: function() {
                pm.handlers.hidePreloader();
            }
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
                tr.handlers.getDocumentsuccess(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            },
            beforeSend: function() {
                pm.handlers.showPreloader();
            },
            complete: function() {
                pm.handlers.hidePreloader();
            }
        });
    },
};



tr.action = function() {
    tr.elements.btn_temp_request.on('click', function() {
        tr.data.windowChild = window.open('./TempRequest.html', 'request', "width=600,height=400,left=20px,top=20px,menubar=yes,toolbar=yes,location=yes,resizable=yes,scrollbars=yes");
        //  tr.ajax.getTemplate();
        tr.dataTable.init(tr.dataTable.object, tr.data.zag);
        // tr.elements.temp_request_modal.modal('show');

    });




    // cancel modal
    tr.elements.temp_request_cancel.on('click', function() {
        tr.elements.temp_request_modal.modal('hide');
    });

    // Upload Event

    tr.elements.temp_request_upload.on('click', function() {
        var trSelected = tr.handlers.getSelectedTr();
        if (trSelected.length > 0) {
            var id = tr.handlers.getIdSelectedTemplate(trSelected);
            tr.data.id = id;

            /* -----------------------------------------
            @need ajax to get pdf.file at the server

            tr.ajax.getTemplateDocument(id);

             ----------------------------

            */

        } else {
            // need output message??
        }

    });

};


tr.init = function() {
    tr.elements.init();
    tr.action();
};

tr.init();