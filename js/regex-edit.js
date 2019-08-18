let redit = {};

redit.data = [];

redit.elements = {
    window: {id: 'redit-window', obj: {}},
    btn_edit_regex: {id: 'btn_edit_regex', obj: {}},
    btn_resize: {id: 'redit-options--resize', obj: {}},
    btn_close: {id: 'redit-options--close ', obj: {}},
    r_btn_new: {id: 'r_btn_new', obj: {}},
    r_preloader: {id: 'rg-preloader', obj: {}},
    shadow:{id:'blackShadow',obj:{}}

};

redit.init = {
    elements: () => {
        redit.elements.window.obj = $('.' + redit.elements.window.id);
        redit.elements.btn_edit_regex.obj = $('#' + redit.elements.btn_edit_regex.id);
        redit.table.object = $('#' + 'redit_table');
        redit.elements.btn_close.obj = $('.' + redit.elements.btn_close.id);
        redit.elements.btn_resize.obj = $('.' + redit.elements.btn_resize.id);
        redit.elements.r_btn_new.obj = $('.' + redit.elements.r_btn_new.id);
        redit.elements.r_preloader.obj = $('.' + redit.elements.r_preloader.id);
        redit.elements.shadow.obj = $('.' + redit.elements.shadow.id);
    },
    actions: () => {
        redit.elements.btn_edit_regex.obj.on('click', redit.handlers.openRegexWindow);
        redit.elements.btn_close.obj.on('click', redit.handlers.close);
        redit.elements.btn_resize.obj.on('click', redit.handlers.resize);
        redit.elements.r_btn_new.obj.on('click', redit.handlers.createNew);
    },
};

redit.table = {
    object: {},
    dt: {},
    clean: () => {
        if (!$.isEmptyObject(redit.table.dt)) {
            redit.table.dt.destroy();
            redit.table.object.find('tbody').remove();
            redit.table.dt = {};
        }
    },
    init: () => {
        redit.table.clean();
        redit.table.dt = redit.table.object.DataTable({
            "select": false,
            "pagingType": 'simple_numbers',
            "order": [],
            "lengthMenu": [
                [15],
                [15]
            ],
            "responsive": true,
            "data": redit.helpfunc.isTableData(redit.data),
            "columnDefs": [{
                'targets': 0,
                'orderable': false,
                'searchable': false,
                'className': 'dt-body-center',
                'render': function (data) {
                    return '<div data-pk = "' + data + '">' + data.substring(0, 8) + '...</div>';
                }
            },
                {
                    'targets': 1,
                    'orderable': false,
                    'searchable': false,
                    'className': 'dt-body-center',
                    'render': function (data) {
                        return data;
                    }
                }, {
                    'targets': 2,
                    'orderable': false,
                    'searchable': false,
                    'className': 'dt-body-center',
                    'render': function (data) {
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
            "dom":"t<'clear'><'row'<'col-md-12'p>>",
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
        return '<div class="r_td_edit"><button class="r_edit btn-sm btn btn-secondary">Edit</button><button class="r_delete btn-sm btn btn-danger">Delete</button><div>';
    },
};

redit.factory = {
    whatAction: (el, tr, data) => {
        if (el.hasClass('r_edit')) {
            redit.handlers.editRegex(el, tr, data[0]);
        }
        if (el.hasClass('r_delete')) {
            redit.handlers.deleteRegex(el, tr, data[0]);
        }
        if (el.hasClass('r_new_save')) {
            redit.handlers.saveNewTrData(el, tr);
        }
        if (el.hasClass('r_new_cancel')) {
            redit.handlers.cancelNewData(el, tr);
        }

        if (el.hasClass('r_edit_save')) {
            redit.handlers.saveEditField(el, tr)
        }
        if (el.hasClass('r_edit_cancel')) {
            redit.table.init();
        }
    }
};

redit.view = {
    editHtml: {
        getInputs: (data) => '<input type="text" class="form-control" data-prev="' + data + '" value="' + data + '"/>',
        getButton: () => '<div class="r_td_edit"><button class="r_edit_save btn btn-sm btn-secondary">Save</button><button class="r_edit_cancel btn btn-sm btn-danger">Cancel</button></td></div>',
    },
    newTrHtml: () => {
        return '<tr>' +
            '<td class="dt-body-center">0</td>' +
            '<td><input class="r_input_regex" type="text" class="form-control" placeholder="write Regex"></td>' +
            '<td><input class="r_input_description" type="text" class="form-control" placeholder="write Description"></td>' +
            '<td><div class="dt-body-center"><div class="r_td_edit"><button class="r_new_save btn btn-sm btn-secondary">Save</button><button class="r_new_cancel btn btn-sm btn-danger">Cancel</button></div></td>' +
            '</tr>';
    },
    prependNewTr: () => {
        redit.table.object.find('tbody').prepend(redit.view.newTrHtml())
    },
    togglePreloader: () => {
        if (redit.elements.r_preloader.obj.is(":hidden")) {
            redit.elements.r_preloader.obj.attr('hidden', false);
        } else {
            redit.elements.r_preloader.obj.attr('hidden', true);
        }
    },
};

redit.validate = {
    isExistNewTr: () => {
        if (redit.table.object.find('input').length > 0) {
            snack.info('End edit field');
            return true;
        } else {
            return false;
        }
    },
    isSuccessInputs: (r, d) => {
        return r.trim() != '' && d.trim() != '' && r.indexOf(' ') == -1;
    }
};


redit.handlers = {
    saveNewTrData: (el, tr) => {
        const inputs = tr.find('input');
        const regex = inputs.eq(0).val();
        const description = inputs.eq(1).val();
        // If Input fields empty strings or regex have spaces
        if (!redit.validate.isSuccessInputs(regex, description)) {
            snack.info('Fields must be filled out and contain valid regex');
            return;
        }
        ajax.post(temp.routes.sendAddRegexProccessUrl, {
            Pk: null,
            Name: description,
            Content: regex
        }, null, null, redit.view.togglePreloader, redit.view.togglePreloader)
            .then(response => {
                redit.handlers.setDataTableAndBase(response, tr)
            })
            .catch(err => snack.error( `Error: ${err}`));

    },
    setDataTableAndBase: (response, tr) => {
        redit.table.dt.row(tr).remove();
        redit.data = [response].concat(redit.data);
        rightbar.data.global.regex = [].concat(redit.data);
        rightpref.handlers.renderfieldoptions(rightbar.data.global.regex, rightbar.elements.selReg);
        // update dropdown data in headers
        hx.regex.create.init(redit.data, []);
        redit.table.init();
    },
    cancelNewData: (el, tr) => {
        redit.table.dt.row(tr).remove().draw();
    },
    openRegexWindow: (e) => {
        e.preventDefault();
        redit.handlers.open();
    },
    responseSuccess: (data) => {
        redit.data = data.Data.map((val) => $.extend({}, val));
        redit.table.init();
    },
    resize: () => {
        const w = redit.elements.window.obj;
        const cl = 'minimize';
        w.hasClass(cl) ? w.removeClass(cl) : w.addClass(cl)
    },
    close: () => {

        redit.elements.window.obj.attr('hidden', true);
        redit.elements.shadow.obj.attr('hidden', true);
        redit.elements.window.obj.addClass('minimize');
    },
    open: () => {
        redit.elements.window.obj.attr('hidden', false);
        redit.elements.shadow.obj.attr('hidden', false);
    },
    // create new Regex
    createNew: () => {
        if (!redit.validate.isExistNewTr()) {
            redit.view.prependNewTr();
        }
    },
    editRegex: (el, tr) => {
        // input fields is exist(need end edit prev regex)
        if (redit.validate.isExistNewTr()) return;
        const data = redit.table.dt.row(tr).data();
        const td = tr.find('td');
        $.each(td, (i, el) => {
            if (i != 0 && i != td.length - 1) {
                $(el).html(redit.view.editHtml.getInputs(data[i]))
            } else if (i == td.length - 1) {
                $(el).html(redit.view.editHtml.getButton())
            }
        })
    },
    saveEditField: (el, tr) => {
        const data = redit.table.dt.row(tr).data();
        const input = tr.find('input');
        const pk = data[0];
        const content = $(input[0]).val();
        const name = $(input[1]).val();
        if (redit.validate.isSuccessInputs(content, name)) {
            ajax.post(temp.routes.sendAddRegexProccessUrl, {
                Pk: pk,
                Content: content,
                Name: name
            }, null, null, redit.view.togglePreloader, redit.view.togglePreloader)
                .then(response => {
                    redit.data = redit.data.map((val) => {
                        if (val.Pk === response.Pk) {
                            return response;
                        } else {
                            return val;
                        }
                    });
                    rightbar.data.global.regex = [].concat(redit.data);
                    rightpref.handlers.renderfieldoptions(rightbar.data.global.regex, rightbar.elements.selReg);
                    redit.table.init();
                    hx.regex.create.init(redit.data, []);
                })
                .catch(err => snack.error(`Error response server:  ${err[1]}`))
        } else {
            snack.info('Please enter valid data');
        }
    },
    deleteRegex: (el, tr, pks) => {
        ajax.post(temp.routes.sendDeleteRegexUrl, {Pk: pks}, null, null, redit.view.togglePreloader, redit.view.togglePreloader)
            .then(data => {
                if (data[0] == 'Ok') {
                    redit.data = redit.data.filter(val => val.Pk != data[1]);
                    rightbar.data.global.regex = [].concat(redit.data);
                    rightpref.handlers.renderfieldoptions(rightbar.data.global.regex, rightbar.elements.selReg);
                    redit.table.dt.row(tr).remove().draw();
                    // update dropdown data in headers
                    hx.regex.create.init(redit.data, []);
                } else {
                    // regex exist in one Templaite i we not cun delete him
                    snack.info(`We use this regex in Template: ${data[0]}`);
                }
            }).catch((err) => snack.error(`${err[1]}`));
    }
};

redit.helpfunc = {
    isTableData: () => {
        let table = [];
        redit.data.forEach(val => table.push([val.Pk, val.Content, val.Name]));  // Regex => Content // Name => discriptions
        return table;
    }
};

redit.init.elements();
redit.init.actions();

