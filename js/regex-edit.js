let redit = {};

redit.data = [];

redit.elements = {
    window: {id: 'redit-window', obj: {}},
    btn_edit_regex: {id: 'btn_edit_regex', obj: {}},
    btn_resize: {id: 'redit-options--resize', obj: {}},
    btn_close: {id: 'redit-options--close ', obj: {}},
    r_btn_new: {id: 'r_btn_new', obj: {}},

};

redit.table = {
    object: {},
    dt: {},
    clean: () => {
        if (!$.isEmptyObject(redit.table.dt)) {
            redit.table.dtt.destroy();
            redit.table.object.find('tbody').remove();
            redit.table.dt = {};
        }
    },
    init: () => {
        redit.table.clean();
        redit.table.dt = redit.table.object.DataTable({
            "pagingType": 'simple_numbers',
            "order": [],
            "lengthMenu": [
                [15],
                [15]
            ],
            "select": true,
            "responsive": true,
            "data": redit.helpfunc.isTableData(redit.data),
            "columnDefs": [{
                'targets': 0,
                'orderable': false,
                'searchable': false,
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    return data;
                }
            },
                {
                    'targets': 1,
                    'orderable': false,
                    'searchable': false,
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                        return data;
                    }
                }, {
                    'targets': 2,
                    'orderable': false,
                    'searchable': false,
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                        return data;
                    }
                }, {
                    'targets': 3,
                    'orderable': false,
                    'searchable': false,
                    'className': 'dt-body-center',
                    'data': null,
                    "defaultContent": redit.html.edit(),
                }
            ],
            "columns": [
                {title: "Id"},
                {title: "Regex"},
                {title: 'Description'},
                {title: 'Edit'}
            ],
            "dom": /* "<'row'<'col-md-6'l><'col-md-6'>>*/ "t<'clear'><'row'<'col-md-12'p>>",
        });

        redit.table.object.find('tbody').on('click', 'button', function (e) {
            const $that = $(this);
            const tr = $that.parents('tr');
            const data = redit.table.dt.row(tr).data();
            redit.factory.whatAction($that, tr, data);
        });

    }

};
redit.html = {
    edit: () => {
        return '<div class="r_td_edit"><button class="r_edit btn-sm btn btn-secondary">Edit</button><button class="r_save btn-sm btn btn-info">Save</button><button class="r_delete btn-sm btn btn-danger">Delete</button><div>';
    },
};

redit.factory = {
    whatAction: (el, tr, data) => {
        if (el.hasClass('r_edit')) {
            redit.handlers.editRegex(el, tr, data[0]);
        }
        if (el.hasClass('r_save')) {
            redit.handlers.saveRegex(el, tr, data[0]);
        }
        if (el.hasClass('r_delete')) {
            redit.handlers.deleteRegex(el, tr, data[0]);
        }
    }

};


redit.handlers = {
    openRegexWindow: (e) => {
        e.preventDefault();
        redit.handlers.open();
    },
    responseSuccess: (data) => {
        redit.data = data.map((val) => $.extend({}, val));
        redit.table.init();
    },
    responseError: (error) => {
        Snackbar.show({text: `Error: ${error}`, pos: 'top-center'});
    },
    resize: () => {
        const w = redit.elements.window.obj;
        const cl = 'minimize';
        w.hasClass(cl) ? w.removeClass(cl) : w.addClass(cl)
    },
    close: () => {
        redit.elements.window.obj.attr('hidden', true);
        redit.elements.window.obj.addClass('minimize');
    },
    open: () => {
        redit.elements.window.obj.attr('hidden', false);
    },
    // create new Regex
    createNew: () => {
        redit.table.dt.row.add([
           '0',
            '<input type="text" class="form-control" placeholder="write Regex">',
            '<input type="text" class="form-control" placeholder="write Description">',
            '<div class="r_custom"><button class="btn btn-sm btn-secondary">Save</button><button class="btn btn-sm btn-danger">Cancel</button></div>',
        ])
            .draw(true);
    },
    editRegex: (el) => {
    },
    saveRegex: (el) => {
    },
    deleteRegex: (el, tr, pks) => {
        redit.ajax.post('test', {Pks: pks})
            .then((data) => {
                if (data) {
                    redit.data = redit.data.filter(val => val.Pks != pks);
                    redit.table.dt.row(tr).remove().draw();
                }
            })
            .catch((err) => Snackbar.show({text: `${err[1]}`, pos: 'top-right'}));
    }

};

redit.helpfunc = {
    isTableData: () => {
        let table = [];
        redit.data.forEach(val => table.push([val.Pks, val.Regex, val.description]));
        return table;
    }
};

redit.init = {
    elements: () => {
        redit.elements.window.obj = $('.' + redit.elements.window.id);
        redit.elements.btn_edit_regex.obj = $('#' + redit.elements.btn_edit_regex.id);
        redit.table.object = $('#' + 'redit_table');
        redit.elements.btn_close.obj = $('.' + redit.elements.btn_close.id);
        redit.elements.btn_resize.obj = $('.' + redit.elements.btn_resize.id);
        redit.elements.r_btn_new.obj = $('.' + redit.elements.r_btn_new.id);
    },
    actions: () => {
        redit.elements.btn_edit_regex.obj.on('click', redit.handlers.openRegexWindow);
        redit.elements.btn_close.obj.on('click', redit.handlers.close);
        redit.elements.btn_resize.obj.on('click', redit.handlers.resize);
        redit.elements.r_btn_new.obj.on('click', redit.handlers.createNew);
    },
};


redit.ajax = {
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                data: data,
                url: `${temp.root}${url}`,
                type: "POST",
                success: (data) => {
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    //  reject(errorThrown);
                    // TODO TEST
                    resolve(true);
                },
            });
        });
    }


};

redit.init.elements();
redit.init.actions();

