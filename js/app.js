var temp = {};
temp.debug = false;
temp.Owen = 'http://91.235.136.123:591/';
temp.workRoot = 'http://85.214.225.230/';
temp.root = temp.debug ? '' : temp.workRoot;
temp.routes = {
    getTemplateListName: temp.root + 'api/template/getsimplytemplatelist',
    getTemplateItemObject: temp.root + 'api/template/gettemplate',
    sendRenderProccessUrl: temp.root + 'api/template/gettemplates',
    sendRenderDataTypeProccessUrl: temp.root + 'api/datatypes/getdatatypes',
    sendRenderAmountProccessUrl: temp.root + 'api/datatypes/getamountnotations',
    sendRenderDataProccessUrl: temp.root + 'api/datatypes/getdatanotations',
    sendRenderRegexProccessUrl: temp.root + 'api/datatypes/getregexs',
    sendRenderAlternateProccessUrl: temp.root + 'api/datatypes/getalternates',
    // block rightbar // save del DataType
    sendDeleteDataTypeProccessUrl: temp.root + 'api/datatypes/deletedatatype',
    sendSaveDataTypeProccessUrl: temp.root + 'api/datatypes/savedatatype',

    // block rightbar pref add options
    sendAddAmountProccessUrl: temp.root + 'api/datatypes/saveamountnotation',
    sendAddDateProccessUrl: temp.root + 'api/datatypes/savedatanotation',
    sendAddRegexProccessUrl: temp.root + 'api/datatypes/saveregex',
    sendAddAlternateProccessUrl: temp.root + 'api/datatypes/savealternate',

    // delete pref
    sendDeleteAmountUrl: temp.root + 'api/datatypes/deleteamountnotation',
    sendDeleteDateUrl: temp.root + 'api/datatypes/deletedatanotation',
    sendDeleteRegexUrl: temp.root + 'api/datatypes/deleteregex',
    sendDeleteAlternateUrl: temp.root + 'api/datatypes/deletealternate',
    sendFileToProccessUrl: temp.root + 'api/pdf/ocrpdffindtable',
    sendSaveTempaiteProccess: temp.root + 'api/template/savetemplate',
    sendDeleteTemplaiteProccess: temp.root + 'api/template/deletetemplate',
    //Test
    sendTestProccessUrl: temp.root + 'api/pdf/testaction',
    //KW
    getKWProccessUrl: temp.root + 'api/datatypes/getautodatatypes',
    editKWProccessUrl: temp.root + 'api/datatypes/saveautodatatype',
    //Header XML 
    getallheaderdatatypesUrl: temp.root + 'api/datatypes/getallheaderdatatypes',
    createorupdateheaderdatatypeUrl: temp.root + 'api/datatypes/createorupdateheaderdatatype',
    deleteheaderdatatypeUrl: temp.root + 'api/datatypes/deleteheaderdatatype',
};

temp.html = {
    addRowLoad: ' <form class="form-inline row mb-2"><div class="mr-sm-2 col-3">' +
        '<select class="custom-select pb-1 mb-2 mr-sm-2 mb-sm-0 form-control-sm">' +
        '<option value="String" selected>String</option><option value="Numeric">Numeric</option><option value="Field">Field</option>' +
        '<option value="Checksum">Checksum</option></select>' +
        '</div><input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0 form-control-sm col-7"></form>',
};

temp.img = {
    delete: 'fa fa-trash',
    activ: 'fa fa-toggle-on',
    off: 'fa fa-toggle-off'
};

temp.zeroGuid = "00000000-0000-0000-0000-000000000000";
temp.serverInfo = []; // forward server info ===> test
temp.PropertyPdf = {};
temp.serverTemplate = [];

temp.elementLeftBar = {
    Templaite: {
        Pk: '',
        name: '',
        origin: {},

        state: '',
        that: '',
        e: '',
        OnlyText: [],
        OnlyImages: [],
        RuleArr: [],
    },
    object: {},
    dataTable: {
        active: '',
        object: {},
        dt: {},
        clean: function () {
            if (!$.isEmptyObject(temp.elementLeftBar.dataTable.dt)) {
                temp.elementLeftBar.dataTable.dt.destroy();
                temp.elementLeftBar.dataTable.object.find('tbody').remove();
                temp.elementLeftBar.dataTable.dt = {};
            }
        },

        init: function (leftTempListData) {
            temp.elementLeftBar.dataTable.clean();
            temp.elementLeftBar.dataTable.dt = temp.elementLeftBar.dataTable.object.DataTable({
                "pagingType": 'simple_numbers',
                "order": [],
                "lengthMenu": [
                    [15],
                    [15]
                ],
                "select": true,
                "responsive": true,
                "data": leftTempListData,
                "columnDefs": [{
                    'targets': 0,
                    'orderable': false,
                    'searchable': false,
                    'className': '',
                    'render': function (data) {
                        return data;
                    }
                },
                    {
                        'targets': 1,
                        'orderable': false,
                        'searchable': false,
                        'className': 'dt-body-center',
                        'render': function (data) {
                            return '<i  class=" ' + data + ' "  aria-hidden="true"></i>';
                        }
                    }
                ],
                "columns": [
                    {title: "Configuration"},
                    {title: "Status"}
                ],
                "dom":"t<'clear'><'row'<'col-md-12'p>>",
            });

            // select fix
            temp.elementLeftBar.dataTable.object.off('click').on('click', 'tr', function (e) {
                var $that = $(this);
                temp.elementLeftBar.Templaite.that = $that;
                if ($that.find('i').attr('class') == ' fa fa-trash ') {
                    e.preventDefault();
                    return false;
                } else if ($that.attr('class').indexOf('selected') != -1) {
                    e.preventDefault();
                    return false;
                } else {
                    temp.elementLeftBar.dataTable.active = $that.find('td:first').text();
                    if (temp.elementLeftBar.dataTable.active.toLowerCase().trim() != 'Create new Configuration'.toLowerCase() && !!temp.DataWorkspace.images.length) {
                        temp.elementLeftBar.Templaite.state = 'temp';
                        if (temp.DataWorkspace.images.length > 0 && temp.elementLeftBar.Templaite.Pk == temp.zeroGuid) {
                            applymodal.handlers.show('Close Templaite without saving', 8);
                        } else if (temp.DataWorkspace.images.length > 0) {
                            temp.helpfunc.changeTempNotSaving();
                            temp.elementLeftBar.Templaite.state = '';
                        } else if (!temp.DataWorkspace.images.length) { // initial state => pdf not load
                            temp.Data.leftTempList.data.forEach(function (val, i) {
                                if (val[1] == temp.img.activ) val[1] = temp.img.off;
                                if (val[0] == temp.elementLeftBar.dataTable.active) val[1] = temp.img.activ;
                            });
                            temp.elementLeftBar.dataTable.clean();
                            temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);

                            temp.elementLeftBar.dataTable.object.find('i').each(function () {
                                $that = $(this);
                                if ($that.attr('class').trim() == temp.img.activ) {
                                    $that.parent().parent().addClass('selected');
                                }
                            });
                            temp.elementLeftBar.Templaite.state = '';
                        } else {
                            temp.elementLeftBar.Templaite.state = '';
                        }

                    } else {
                        // Create new template
                        temp.elementLeftBar.Templaite.state = 'newtemp';
                        if (temp.DataWorkspace.images.length && temp.elementLeftBar.Templaite.Pk == temp.zeroGuid) {
                            applymodal.handlers.show('Close Templaite without saving', 8);
                        } else if (temp.DataWorkspace.images.length > 0) {
                            temp.helpfunc.changeTempNotCreate();
                            ph.data.objects = ph.data.default;
                            temp.elementLeftBar.Templaite.state = '';
                        } else {
                            temp.elementLeftBar.Templaite.state = '';
                        }
                    }
                }
            });

            // togle templaite state
            applymodal.elements.apply_togle_state.off('click').on('click', function () {
                applymodal.handlers.close();
                if (temp.elementLeftBar.Templaite.state == 'temp') {
                    temp.helpfunc.changeTempNotSaving();
                    led.action.ledOff();
                }
                if (temp.elementLeftBar.Templaite.state == 'load') {
                    temp.helpfunc.changeTempNotLoad();
                }
                if (temp.elementLeftBar.Templaite.state == 'newtemp') {
                    temp.helpfunc.changeTempNotCreate();
                    led.action.ledOff();
                    lt.view.setOff();
                }
                temp.elementLeftBar.Templaite.state = '';
            });

            // delete template modal window
            temp.elementLeftBar.object.btn_del_temp.click(function (e) {
                e.preventDefault();
                var selected$ = temp.elementLeftBar.dataTable.object.find('.selected');
                if (selected$.length && selected$['0'].children[0].innerHTML !== 'Create new Configuration') {
                    var namedeleterow = selected$.find('td.sorting_1').text();
                    applymodal.handlers.show('Delete Templaite ' + namedeleterow, 1);
                }
            });

            // delete templaite
            applymodal.elements.apply_del_temp.off('click').on('click', function () {
                applymodal.handlers.close();
                temp.elementLeftBar.dataTable.deleteTemp();
            });

            // show save templaite modal window  
            temp.elementLeftBar.object.btn_save_temp.on('click', function () {
                applymodal_tempresult.elements.applymodal_tempresult_input.val(temp.elementLeftBar.dataTable.object.find('.selected td:first').text());
                applymodal_tempresult.handlers.showtemp();
            });

            // template save
            applymodal_tempresult.elements.apply_tempresult_save_temp.on('click', function () {
                var state = false;
                var newNametemp = applymodal_tempresult.elements.applymodal_tempresult_input.val();
                if (newNametemp == '') {
                    applymodal_tempresult.handlers.close();
                    return;
                }
                temp.elementLeftBar.Templaite.name = newNametemp;
                temp.elementLeftBar.Templaite.Name = newNametemp;

                temp.Data.leftTempList.list.forEach(function (val) {
                    if (val.Name == newNametemp) {
                        temp.elementLeftBar.Templaite.Pk = val.Pk;
                        temp.Data.leftTempList.datas.Pk = val.Pk;
                        state = true;
                    }
                });
                if (!state) {
                    temp.elementLeftBar.Templaite.Pk = ''; // if create new templaite and new Name need clean Templaite PK => create clone PK in new templaite
                    temp.Data.leftTempList.datas.Pk = '';
                }
                temp.Data.leftTempList.datas = temp.helpfunc.createresponsedata().Template;
                temp.elementLeftBar.Templaite.name = '';
                temp_ajax.sendSaveTemplaiteProccess(test.fix.addVatsandIbans(temp.Data.leftTempList.datas))
                    .then(data => temp.elementLeftBar.action.templateSaveSuccess(data))
                    .catch(err => temp.elementLeftBar.action.templateSaveError(err));
                applymodal_tempresult.handlers.close();
            });

            temp.elementLeftBar.object.btn_save_result.on('click', function () {
                if (!zaglyshka.data.header.length || !zaglyshka.data.xml.length || zaglyshka.data.pdf_image == 0) return;
                applymodal_tempresult.handlers.showresult();
            });
        },

        deleteTemp: function (select) {
            led.action.ledOff();
            lt.view.setOff();
            var $selected = temp.elementLeftBar.dataTable.object.find('.selected');
            if ($selected.length) {
                if ($selected['0'].children[0].innerHTML != 'Create new Configuration') {
                    var deleterow = $selected.find('td:first').text();
                    var findPk = function () {
                        var Pk;
                        temp.Data.leftTempList.list.forEach(function (val, i) {
                            if (val.Name == deleterow) Pk = val.Pk;
                        });
                        return Pk;
                    };
                    temp_ajax.sendDeleteTemplaiteProccess({"Pk": findPk()})
                        .then(data => temp.elementLeftBar.action.deleteSuccess(data, $selected, deleterow))
                        .catch(err => temp.elementLeftBar.action.deleteError(err));
                }
            }
        },
    },
    action: {
        deleteSuccess: (data, $selected, deleterow) => {
            if (data.IsSuccess == true) {
                ph.data.object = ph.data.default; // Scope Default if templaite delete
                $selected.addClass('deleteRow');
                temp.helpfunc.changeData(deleterow);
                temp.elementLeftBar.dataTable.clean();
                temp.elementLeftBar.dataTable.active = '';
                temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
                filter.handlers.deletefilter(data); //filter delete fix
                temp.Data.leftTempList.list = temp.Data.leftTempList.list.filter(function (val) {
                    return val.Pk != data.Pk;
                });
                temp.elementLeftBar.Templaite.origin = {};
                paint.handlers.clearsvgcontent();
                temp.helpfunc.clearglobalstate(true);
                snack.alert(`Delete Template: ${deleterow}`);
                paint.init();
            }
        },
        deleteError: (err) => {
            snack.error(`${err[1]}`);
        },
        templateSaveSuccess: (data) => {
            // block Template Request
            // check if this request
            tr.handlers.checkIfRequest(data.Pk);
            // add new create templaite in list
            temp.Data.leftTempList.datas.Pk = data.Pk;
            temp.Data.leftTempList.datas.Name = data.Name;
            temp.elementLeftBar.Templaite.name = data.Name;
            temp.elementLeftBar.Templaite.Name = data.Name;
            temp.elementLeftBar.Templaite.origin = temp.Data.leftTempList.datas;
            temp.helpfunc.addTemplaite();
            // filter.handlers.addTemplaite(); // in filter mode add in List after
            temp.Data.leftTempList.datas = {};
            temp.elementLeftBar.dataTable.clean();
            temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
            temp.helpfunc.searchPage(); // need search page
            temp.elementLeftBar.dataTable.object.find('i').each(function () {
                var $that = $(this);
                var parent$2 = $that.parent().parent();
                if ($that.attr('class').trim() == temp.img.activ) {
                    parent$2.addClass('selected');
                } else {
                    parent$2.removeClass('selected');
                }
            });
            lt.view.setOff();
        },
        templateSaveError: (err) => {
            snack.error(`${err[1]}`);
        }

    }
};

temp.helpfunc = {
    deleteRepeatInArr: function (arr) {
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            obj[str] = true;
        }
        return Object.keys(obj);
    },
    changeTempNotSaving: function () {
        var $that = temp.elementLeftBar.Templaite.that;
        const findTemplatePk = temp.Data.leftTempList.list.find(item => item.Name == $that.find('td:first').text());
        temp_ajax.getTemplateObject(findTemplatePk.Pk)
            .then(responseTemplate => {
                lt.view.setOff();
                temp.elementLeftBar.Templaite.origin = mp.actions.createTemplate(responseTemplate, temp.serverTemplate);
                temp.elementLeftBar.Templaite.Pk = temp.elementLeftBar.Templaite.origin.Pk;
                temp.elementLeftBar.Templaite.Name = temp.elementLeftBar.Templaite.origin.Name;
                temp.elementLeftBar.Templaite.name = temp.elementLeftBar.Templaite.origin.Name;
                (temp.elementLeftBar.Templaite.origin.PropertyPdf == undefined) ? temp.PropertyPdf = temp.elementLeftBar.Templaite.origin.PropertyPdf : temp.PropertyPdf = {};
                (temp.elementLeftBar.Templaite.origin.RuleFormingTemplate == undefined) ? mp.data.RuleArr = [] : mp.data.RuleArr = temp.elementLeftBar.Templaite.origin.RuleFormingTemplate;
                temp.elementLeftBar.Templaite.RuleArr = mp.data.RuleArr;
                paint.handlers.clearsvgcontent();
                temp.helpfunc.clearglobalstate(true);

                temp.elementLeftBar.Templaite.origin.Pages.forEach(function (val) {
                    paint.objects.datafromserver.datafromserverpage.push(val);
                });

                temp.elementLeftBar.Templaite.origin.Pages.forEach(function (val) {
                    paint.objects.datafromserver.removelistpage.push(val);
                });

                paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage];
                temp.Data.leftTempList.data.forEach(function (val, i) {
                    if (val[1] == temp.img.activ) val[1] = temp.img.off;
                    if (val[0] == temp.elementLeftBar.Templaite.origin.Name) val[1] = temp.img.activ;
                });

                temp.elementLeftBar.Templaite.that = '';
                temp.elementLeftBar.dataTable.clean();
                temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);

                temp.helpfunc.searchPage(); // need page search

                temp.elementLeftBar.dataTable.object.find('i').each(function () {
                    $that = $(this);
                    if ($that.attr('class').trim() == temp.img.activ) {
                        $that.parent().parent().addClass('selected');
                    }
                });
                temp.DataWorkspace.initwindow();
            })

    },

    searchPage: function () {
        var infopages = temp.elementLeftBar.dataTable.dt.page.info().pages;
        var result = false;
        for (var i = 0; i <= infopages - 1; i++) {
            var res = temp.elementLeftBar.dataTable.object.find('i');
            res.each(function () {
                $that = $(this);
                if ($that.attr('class').trim() == temp.img.activ) {
                    $that.parent().parent().addClass('selected');
                    result = true;
                }
            });
            if (result) {
                break;
            } else {
                temp.elementLeftBar.dataTable.dt.page(i + 1).draw(false);
            }
        }
    },

    changeTempNotLoad: function () {
        temp.elementLeftBar.Templaite.Pk = temp.zeroGuid; //Pk empty row
        temp.elementLeftBar.Templaite.Name = '';
        temp.elementLeftBar.Templaite.RuleArr = [];
        temp.PropertyPdf = {};
        mp.data.RuleArr = [];
        ph.data.object = ph.data.default;
        var e = temp.elementLeftBar.Templaite.e;
        temp.helpfunc.modalLoad(e);
    },

    changeTempNotCreate: function () {
        //Clear SVG and clear All rectangle
        temp.elementLeftBar.Templaite.Pk = temp.zeroGuid; //Pk empty row
        temp.elementLeftBar.Templaite.Name = '';
        temp.elementLeftBar.Templaite.origin = {};
        temp.elementLeftBar.Templaite.RuleArr = [];
        mp.PropertyPdf = {};
        mp.data.RuleArr = [];
        temp.helpfunc.clearglobalstate(true);
        temp.Data.leftTempList.data.forEach(function (val) {
            if (val[1] == temp.img.activ) val[1] = temp.img.off;
        });
        temp.elementLeftBar.dataTable.clean();
        temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
        temp.elementLeftBar.dataTable.object.find('i').each(function () {
            var $that = $(this);
            var parent$2 = $that.parent().parent();
            if ($that.attr('class').trim() == 'fa fa-plus-circle') {
                parent$2.addClass('selected');
            } else {
                parent$2.removeClass('selected');
            }
        });
        paint.init();
        temp.elementLeftBar.Templaite.state = '';
    },
    arrayClone: function (arr) {
        var i, copy;
        if (Array.isArray(arr)) {
            copy = arr.slice(0);
            for (i = 0; i < copy.length; i++) {
                copy[i] = temp.helpfunc.arrayClone(copy[i]);
            }
            return copy;
        } else if (typeof arr == 'object') {
            throw 'Cannot clone array containing an object!';
        } else {
            return arr;
        }
    },
    addTemplaite: function () {
        var add = true;
        var circle = 'fa fa-plus-circle';
        var trash = 'fa fa-trash';
        temp.Data.leftTempList.list.forEach(function (val, i) {
            if (val.Pk == temp.Data.leftTempList.datas.Pk) {
                add = false;
                temp.Data.leftTempList.list[i] = temp.Data.leftTempList.datas;
                temp.Data.leftTempList.data.forEach(function (val, i) {
                    if (val[1] != circle && val[1] != trash) temp.Data.leftTempList.data[i][1] = temp.img.off;
                    if (val[1] != circle && temp.Data.leftTempList.data[i][0] == temp.Data.leftTempList.datas.Name) {
                        temp.Data.leftTempList.data[i][1] = temp.img.activ;
                    }
                });
            }
        });
        if (add) {
            temp.Data.leftTempList.list.push(temp.Data.leftTempList.datas);
            temp.Data.leftTempList.data.forEach(function (val, i) {
                if (val[1] != circle && val[1] != trash) temp.Data.leftTempList.data[i][1] = temp.img.off;
            });
            temp.Data.leftTempList.data.push([temp.elementLeftBar.Templaite.name, temp.img.activ]);
            filter.handlers.addData([temp.elementLeftBar.Templaite.name, temp.img.off]); // filter add data
        }
    },

    deleteZeroCordRect: function (arr) {
        return arr.filter(function (val) {
            var X0 = val.rectData[0].x;
            var Y0 = val.rectData[0].y;
            var X1 = val.rectData[1].x;
            var Y1 = val.rectData[1].y;
            var X = Math.abs(X0 - X1) < 5; //px   x(width) or Y(height) rectangle <5 px
            var Y = Math.abs(Y0 - Y1) < 5; //px
            if (X && Y) {
                return false;
            } else {
                return true;
            }
        });
    },
    createresponsedata: function () {
        var empty = {
            Base64Img: "",
            TableDatas: [],
            OnlyImages: "",
            OnlyText: "",
            OcrStrings: [{
                Sentence: "",
                Chars: [{Char: "", Xpos: 0, Ypos: 0}],
                Xpos: 0,
                Ypos: 0,
                XDim: 0,
                YDim: 0
            }]
        };
        return temp.helpfunc.initHeaders({
            Template: {
                Pk: temp.elementLeftBar.Templaite.Pk,
                Name: temp.elementLeftBar.Templaite.Name,
                PropertyPdf: temp.PropertyPdf ? temp.PropertyPdf : {},
                Pages: function () {
                    var obj = temp.helpfunc.collectdata();
                    var imgarr = [];
                    obj.img.forEach(function (val) {
                        imgarr.push(val.substring('data:image/jpeg;base64,'.length));
                    });
                    var objlength = obj.page.length;
                    var imglength = imgarr.length;
                    if (imglength > objlength) {
                        var n = imglength - objlength;
                        while (n) {
                            obj.page.push(empty);
                            n--;
                        }
                    }
                    imgarr.forEach(function (val, i) {
                        obj.page[i].Base64Img = imgarr[i];
                    });
                    obj.page = obj.page.map(function (val) {
                        val.OnlyImages = '';
                        val.OnlyText = '';
                        return val;
                    });
                    obj.page = obj.page.map(function (val, i) {
                        if (temp.serverInfo[i]) {
                            val.OcrStrings = temp.serverInfo[i];
                        } else {
                            val.OcrStrings = empty.OcrStrings;
                        }
                        return val;
                    });
                    return obj.page;
                }(),
            }
        });
    },
    initHeaders: function (obj) {
        var pageTable = obj.Template.Pages[0].TableDatas.filter(function (rect) {
            return rect.Data == "";
        });
        var ismain = temp.helpfunc.isMainHeader(obj.Template.Pages[0].MainHeader);
        if (ismain) {
            var zeroLine = temp.helpfunc.zeroLine(ismain);
            obj.Template.Headers = [].concat(temp.helpfunc.findRectInHeadLine(zeroLine, pageTable));
        } else {
            obj.Template.Headers = temp.helpfunc.findBigRow(pageTable);
        }
        return obj;
    },
    isMainHeader: function (main) {
        return main ? main.Rect : false;
    },
    zeroLine: function (rect) {
        return rect.X0.Y < rect.X1.Y ? rect.X0.Y + (rect.X1.Y - rect.X0.Y) / 2 : rect.X1.Y + (rect.X0.Y - rect.X1.Y) / 2;
    },
    findRectInHeadLine: function (zero, rectArr) {
        return rectArr.filter(function (rect) {
            return (rect.Rect.X0.Y < rect.Rect.X1.Y) ? rect.Rect.X0.Y < zero && rect.Rect.X1.Y > zero : rect.Rect.X0.Y > zero && rect.Rect.X1.Y < zero;
        }).map(function (rect) {
            return {Rect: rect.Rect};
        });
    },
    findBigRow: function (table) {
        var row = [];
        var workArr = [].concat(table);
        workArr.forEach(function (val, i, arr) {
            var zeroNext = val.Rect.X0.Y + (val.Rect.X1.Y - val.Rect.X0.Y) / 2;
            if (row.length) {
                var prewRowRect = row[row.length - 1][0];
                var zeroPrew = prewRowRect.Rect.X0.Y + (prewRowRect.Rect.X1.Y - prewRowRect.Rect.X0.Y) / 2;
                var rectY0 = val.Rect.X0.Y;
                var rectY1 = val.Rect.X1.Y;
                if (rectY0 < zeroPrew && rectY1 > zeroPrew) {
                    // not add  row data
                } else {
                    row[i] = [];
                    arr.forEach(function (vals) {
                        var rectY0 = vals.Rect.X0.Y;
                        var rectY1 = vals.Rect.X1.Y;
                        if (rectY0 < zeroNext && rectY1 > zeroNext) {
                            row[i].push({Rect: vals.Rect});
                        }
                    });
                }
            } else {
                row[i] = [];
                arr.forEach(function (vals) {
                    var rectY0 = vals.Rect.X0.Y;
                    var rectY1 = vals.Rect.X1.Y;
                    if (rectY0 < zeroNext && rectY1 > zeroNext) {
                        row[i].push({Rect: vals.Rect});
                    }
                });
            }
        });
        var res = temp.helpfunc.IsMaxArr(row);
        if (!res.length) return [];
        if (Array.isArray(res[0])) {
            return res[0];
        } else {
            return res;
        }
    },
    IsMaxArr: function (arr) {
        if (!arr.length) return [];
        return arr.reduce(function (prew, next) {
            if (prew.length > next.length && !Array.isArray(prew[0])) {
                return prew;
            } else if (next.length > prew.length && !Array.isArray(prew[0])) {
                return next;
            } else if (prew.length == next.length) {
                return [prew, next];
            } else if (Array.isArray(prew[0])) {
                return prew[0].length > next.length ? prew : next;
            }
        });
    },
    collectdata: function () {
        return {
            img: temp.DataWorkspace.images,
            wh: paint.objects.global.wh,
            page: function () {
                temp.helpfunc.grabrect();
                return temp.helpfunc.grabpagedata();
            }(),
        };
    },

    grabrect: function () {
        paint.objects.global.collect = [];
        paint.objects.disactiv = temp.helpfunc.deleteZeroCordRect(paint.objects.disactiv); // clear zero rectangles
        paint.objects.global.disactivpage[temp.DataWorkspace.activpage] = (paint.objects.disactiv.map(function (val) {
            return $.extend({}, val);
        }).slice());

        paint.objects.datafromserver.datafromserverpage.forEach(function (val, i) {
            if (!paint.objects.global.disactivpage[i]) {
                paint.objects.global.collect[i] = val;
            } else {
                paint.objects.global.collect[i] = paint.objects.global.disactivpage[i]; // need fix zero coord
            }
        });

        if (paint.objects.global.collect.length == 0) {
            temp.DataWorkspace.images.forEach(function () {
                paint.objects.global.collect.push(undefined);
            });
            paint.objects.global.collect[temp.DataWorkspace.activpage] = paint.objects.global.disactivpage[temp.DataWorkspace.activpage];
        }
    },

    grabpagedata: function () {
        var res = [];
        paint.objects.global.collect.forEach(function (val, i) {
            if (val == undefined) val = [{}];
            if ($.type(val) != 'array') {
                res.push(val);
            } else {
                res.push(temp.helpfunc.arrchangeobjdata(val));
            }
        });
        return res.map(function (page) {
            if (page.TableDatas == null) {
                page.TableDatas = [];
            }
            if (page.TableDatas.length == 1 && page.TableDatas[0].Rect.X0.X == 0 && page.TableDatas[0].Rect.X0.Y == 0 && page.TableDatas[0].Rect.X1.Y == 0 && page.TableDatas[0].Rect.X1.X == 0) {
                page.TableDatas = [];
                return page;
            } else {
                return page;
            }
        });
    },

    thisIsText: function (pk) {
        var res = false;
        var IsText;
        if (!pk) return false;
        rightbar.data.global.dataType.filter(function (val, i) {
            if (val.Pk == pk) {
                if (rightbar.data.global.dataType[i].IsText) res = true;
            }
        });
        return res;
    },

    arrchangeobjdata: function (arr) {
        var getCurentTypeRect = function (text) {
            return rightbar.data.global.dataType.filter(function (val) {
                if (val.DataType.toLowerCase().trim() == text.toLowerCase().trim() && val.Pk == false) {
                    return true;
                } else {
                    return false;
                }
            }).length > 0;
        };

        var obj = {};
        arr.forEach(function (val) {
            var newDataType = false;
            if (val.type == undefined) return;
            if (getCurentTypeRect(val.type)) {
                if (val.type == 'MainHeader') {
                    if (obj[val.type] == undefined) obj[val.type] = [];
                    obj[val.type] = {Rect: temp.helpfunc.percentchangecord(val.rectData)};
                    if (obj.TableDatas == undefined) {
                        obj.TableDatas = [];
                    }
                    val.type = 'TableDatas';
                    newDataType = 'TableDatas';
                    if (obj[val.type] == undefined) obj[val.type] = [];
                    obj.TableDatas.push({
                        Rect: temp.helpfunc.percentchangecord(val.rectData),
                        Position: (val.position.length == 0) ? [] : val.position,
                        Regex: val.regex,
                        Reserve: val.reserve,
                        Data: val.value,
                        DataType: {
                            Name: newDataType ? newDataType : val.type,
                            Pk: val.Pk ? val.Pk : null,
                            IsText: temp.helpfunc.thisIsText(val.Pk)
                        }
                    });
                } else {
                    if (obj[val.type] == undefined) obj[val.type] = [];
                    obj[val.type].push({Rect: temp.helpfunc.percentchangecord(val.rectData), Data: val.value});
                }
            } else {
                newDataType = val.type;
                val.type = 'TableDatas';
                if (obj[val.type] == undefined) obj[val.type] = [];
                obj[val.type].push({
                    Rect: temp.helpfunc.percentchangecord(val.rectData),
                    Position: val.position.length == 0 ? [] : val.position,
                    Regex: val.regex,
                    Reserve: val.reserve,
                    Data: val.value,
                    DataType: {
                        Name: newDataType ? newDataType : val.type,
                        Pk: val.Pk ? val.Pk : null,
                        IsText: temp.helpfunc.thisIsText(val.Pk)
                    }
                });
            }
        });
        if (obj.TableDatas == undefined) obj.TableDatas = [];
        if (Object.keys(obj).length == 0) {
            obj.Vats = [];
            obj.TableDatas = [];
            obj.Iban = [];
        }
        if (obj.TableDatas.length == 1 && obj.TableDatas[0].Rect.X0.X == 0 && obj.TableDatas[0].Rect.X0.Y == 0 && obj.TableDatas[0].Rect.X1.Y == 0 && obj.TableDatas[0].Rect.X1.X == 0) {
            obj.TableDatas = [];
        }
        return obj;
    },
    percentchangecord: function (arr) {
        var res = {};
        if (arr == undefined) return {X0: {X: 0, Y0: 0}, X1: {X: 0, Y0: 0}};
        arr.forEach(function (val, i) {
            res['X' + i] = {
                X: temp.helpfunc.blockcalcpercent(val.x, paint.objects.global.wh[0]),
                Y: temp.helpfunc.blockcalcpercent(val.y, paint.objects.global.wh[1])
            };
        });
        return temp.helpfunc.reverseCoordFix(res);
    },

    blockcalcpercent: function (coord, wh) {
        return +((coord.toFixed(3) * 100 / wh).toFixed(3));
    },
    reverseCoordFix: function (obj) {
        var rectx0 = obj.X0.X;
        var rectx1 = obj.X1.X;
        var recty0 = obj.X0.Y;
        var recty1 = obj.X1.Y;
        if (obj.X0.X - obj.X1.X > 0) {
            obj.X0.X = rectx1;
            obj.X1.X = rectx0;
        }
        if (obj.X0.Y - obj.X1.Y > 0) {
            obj.X0.Y = recty1;
            obj.X1.Y = recty0;
        }
        return obj;
    },

    // change data after delete
    changeData: function (text) {
        $.each(temp.Data.leftTempList.data, function (i, val) {
            if (val[0] == text) {
                temp.Data.leftTempList.data[i][1] = temp.img.delete;
            }
        });
    },
    modalLoad: function (e) {
        e.preventDefault();
        temp.elementLeftBar.object.modalWindow.modal();
    },

    modal_btn_add: function () {
        var row = temp.elementLeftBar.object.modalWindow.find('#rowIndent');
        row.append(temp.html.addRowLoad);
    },

    cookfilesend: function () {
        var $arrOpt = temp.elementLeftBar.object.modalWindow.find('#rowIndent form');
        $.each($arrOpt, function () {
            var $that = $(this);
            if ($that.find('input').val() != '') {
                temp.Data.LoadPdfOpt.advanc_settings_search.push([($that.find('select option:selected').text()), $that.find('input').val()]);
                temp.Data.LoadPdfOpt.nameTemplate = temp.elementLeftBar.dataTable.active;
            }
        });
        temp.elementLeftBar.object.modalWindow.modal('hide');
    },
    // advanced option to load pdf file
    addadvancedoption: function () {
        if (temp.Data.LoadPdfOpt.advanc_settings_search.length > 0) {
            var arr = [];
            temp.Data.LoadPdfOpt.advanc_settings_search.forEach(function (val) {
                arr.push({name: val[0], value: val[1]});
            });
            temp.Data.LoadPdfOpt.file_pdf.append(JSON.stringify(arr), '');
        }
    },
    createpageList: function (arrimg) {
        if (!$('img').is('#dynamicImg')) {
            var $wind = temp.DataWorkspace.object.pdfWindow;
            var img = $('<img unselectable="on" class="img-fluid w-100" id="dynamicImg">');
            var getcurrentimg = function (state) {
                switch (state) {
                    case 'all':
                        return arrimg[temp.DataWorkspace.activpage];
                        break;
                    case 'text':
                        return temp.elementLeftBar.Templaite.OnlyText[temp.DataWorkspace.activpage];
                        break;
                    case 'img':
                        return temp.elementLeftBar.Templaite.OnlyImages[temp.DataWorkspace.activpage];
                        break;
                }
            };

            img.attr('src', getcurrentimg(veiw.state)).attr({
                "ondrag": "return false",
                "ondragdrop": "return false",
                "ondragstart": "return false",
                "onmousedown": "return false"
            });

            img.appendTo($wind).on('load', function () {
                paint.objects.global.wh = [img.width(), img.height()]; // detect WH inner IMG   
                paint.init();
            });
        }
    },
    cleanImg: function () {
        $('#dynamicImg').remove();
    },

    infowind: function () {
        temp.elementControl.object.page_info_control.attr("placeholder", "" + function () {
            return temp.DataWorkspace.activpage + 1;
        }() + " " + "(" + temp.DataWorkspace.images.length + ")");
    },

    clearglobalstate: function () {
        paint.handlers.clearsvgcontent();
        if (arguments[0] != true) temp.helpfunc.cleanImg();
        paint.objects.datafromserver.datafromserverpage = [];
        paint.objects.datafromserver.removelistpage = [];
        paint.objects.datafromserver.arrdata = [];
        paint.objects.global.disactivpage = [];
        paint.objects.disactiv = [];
        paint.objects.activrect = {
            id: '',
            rect: {},
            self: {},
            m1: [],
            m2: [],
            type: '',
            rectData: [],
            datatype: [],
            rectangleElement: [],
            pointElement1: [],
            pointElement2: [],
            pointElement3: [],
            pointElement4: [],
            isDrag: false,
            isActive: false,
            isDrawing: false,
        };
        paint.zoom.global.state = false;
        paint.zoom.global.img = '';
        paint.zoom.data.widthheight = [];
        paint.zoom.data.rectlistdata = [];
        if (arguments[0] != true) paint.objects.global.wh = [];
        paint.objects.global.svg = [];
        if (arguments[0] != true) temp.DataWorkspace.activpage = 0;
        if (arguments[0] != true) temp.DataWorkspace.images = [];
        temp.Data.LoadPdfOpt.advanc_settings_search = [];
    },
};

temp.elementControl = {
    object: {},
    nextPage: function () {
        if (temp.DataWorkspace.activpage < temp.DataWorkspace.images.length - 1) {
            paint.objects.global.disactivpage[temp.DataWorkspace.activpage] = paint.objects.disactiv.map(function (obj) {
                return $.extend({}, obj);
            });
            if (paint.objects.datafromserver.removelistpage[temp.DataWorkspace.activpage + 1] != false) {
                paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage + 1];
                paint.objects.datafromserver.removelistpage[temp.DataWorkspace.activpage] = false;
            }
            temp.DataWorkspace.activpage += 1;
            if (paint.objects.global.disactivpage[temp.DataWorkspace.activpage]) {
                paint.objects.datafromserver.arrdata = paint.objects.global.disactivpage[temp.DataWorkspace.activpage];
            }
            paint.objects.disactiv = [];
            paint.handlers.clearsvgcontent();
            temp.DataWorkspace.initwindow();
        }
    },
    prewPage: function () {
        if (temp.DataWorkspace.activpage != 0) {
            paint.objects.global.disactivpage[temp.DataWorkspace.activpage] = paint.objects.disactiv.map(function (obj) {
                return $.extend({}, obj);
            });
            temp.DataWorkspace.activpage -= 1;
            if (paint.objects.datafromserver.removelistpage[temp.DataWorkspace.activpage] != false) {
                paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage];
            }
            paint.objects.datafromserver.removelistpage[temp.DataWorkspace.activpage + 1] = false;
            if (paint.objects.global.disactivpage[temp.DataWorkspace.activpage]) {
                paint.objects.datafromserver.arrdata = paint.objects.global.disactivpage[temp.DataWorkspace.activpage];
            }
            paint.objects.disactiv = [];
            paint.handlers.clearsvgcontent();
            temp.DataWorkspace.initwindow();
        }
    },
};


temp.DataWorkspace = {
    object: {},
    data: {},
    page: {},
    activpage: 0,
    images: [],
    arrdata: [],
    initwindow: function () {
        temp.helpfunc.cleanImg();
        temp.helpfunc.createpageList(temp.DataWorkspace.images);
        temp.helpfunc.infowind();
    },
};

temp.elementRightBar = {
    object: {}
};

temp.Data = {
    LocalData: {},
    LoadPdfOpt: {
        advanc_settings_search: [],
        nameTemplate: '',
        file_pdf: {},
    },

    leftTempList: {
        filter: [],
        list: [],
        datas: {},
        data: [
            ["Create new Configuration", "fa fa-plus-circle"]
        ]
    },
    rightTempList: {}
};

temp.control = {
    templaite: {
        saveServerInfo: function (arrData) {
            temp.serverInfo = [];
            arrData.forEach(function (val, i) {
                temp.serverInfo.push(val.OcrStrings);
            });
        },
        savePropertyPdf: function (data) {
            temp.PropertyPdf = $.extend({}, data);
        },
        renderDataTemplaite: function (data) {
            var base64Title = 'data:image/jpeg;base64,';
            var pages = [];
            $.each(data, function (i, v) {
                pages.push(base64Title + v.Base64Img);
            });
            temp.DataWorkspace.images = [];
            temp.elementLeftBar.Templaite.OnlyImages = [];
            temp.elementLeftBar.Templaite.OnlyText = [];
            temp.DataWorkspace.images = pages;
            data.forEach(function (val, i) {
                temp.elementLeftBar.Templaite.OnlyImages[i] = base64Title + val.OnlyImages;
                temp.elementLeftBar.Templaite.OnlyText[i] = base64Title + val.OnlyText;
            });
        },

        renderDataListPaint: function (pagearr) {
            paint.objects.datafromserver.datafromserverpage = [];
            paint.objects.datafromserver.removelistpage = [];
            pagearr.forEach(function (val) {
                paint.objects.datafromserver.datafromserverpage.push(val);
            });
            pagearr.forEach(function (val) {
                paint.objects.datafromserver.removelistpage.push(val);
            });
        },

        unselectDataTable: function () {
            temp.Data.leftTempList.data.forEach(function (val, i) {
                if (val[1] == temp.img.activ) temp.Data.leftTempList.data[i][1] = temp.img.off;
            });
            temp.elementLeftBar.dataTable.object.find('selected').removeClass('selected');
        },
    },
};

temp.init = {
    element: function () {
        // Bloc LeftBar
        temp.elementLeftBar.object.btn_del_temp = $('#btn_del_temp');
        temp.elementLeftBar.object.btn_load_temp = $('#btn_load_temp');
        temp.elementLeftBar.object.btn_save_temp = $('#btn_save_temp');
        temp.elementLeftBar.object.btn_save_result = $('#btn_save_result');
        temp.elementLeftBar.dataTable.object = $('#leftTempList');
        temp.elementLeftBar.object.infoModal = $('#info_modal');
        temp.elementLeftBar.object.modalWindow = $('#myModal');
        temp.elementLeftBar.object.btn_addIndent = $('#addIndent');
        temp.elementLeftBar.object.deleteIndent = $('#deleteIndent');
        temp.elementLeftBar.object.btn_save_search = $('#btn_save_search');
        // Block Control
        temp.elementControl.object.btn_page_next = $('#btn_page_next');
        temp.elementControl.object.btn_page_prew = $('#btn_page_prew');
        temp.elementControl.object.page_info_control = $('#page_info_control');
        // Block WorkWindow
        temp.DataWorkspace.object.pdfWindow = $('#pdfWindow');
        // filter_btn
        temp.elementControl.object.btn_filter = $('#btn_filter');
    },

    eventHandler: function () {

        $('input[type=file]').fileselect({
            browseBtnClass: 'btn btn-secondary',
            language: 'en'
        });

        $('input[type=file]').on('change', prepareUpload);

        // Grab the files and set them to our variable
        function prepareUpload(event) {

            temp.Data.LoadPdfOpt.file_pdf = new FormData();
            $.each(event.target.files, function (key, value) {
                temp.Data.LoadPdfOpt.file_pdf.append(key, value);
            });
        }

        // load pdf to the server
        temp.elementLeftBar.object.btn_load_temp.click(function (e) {
            temp.elementLeftBar.Templaite.e = e;
            temp.elementLeftBar.Templaite.state = 'load';
            if (temp.DataWorkspace.images.length > 0 && temp.elementLeftBar.Templaite.Pk == temp.zeroGuid) {
                applymodal.handlers.show('Close Templaite without saving', 8);
            } else {
                temp.helpfunc.changeTempNotLoad();
                temp.elementLeftBar.Templaite.state = "";
            }

        });

        // filter_btn
        temp.elementControl.object.btn_filter.on('click', function () {
            if (!temp.Data.leftTempList.filter.length) return;
            filter.handlers.toggleLight();
            var selectedName = function () {
                var res = "";
                temp.elementLeftBar.dataTable.object.find('i').each(function () {
                    $that = $(this);
                    if ($that.attr('class').trim() == temp.img.activ) {
                        res = $that.parent().prev().text();
                    }
                });
                return res;
            }();
            filter.handlers.notActivetoggle();
            temp.Data.leftTempList.data = temp.helpfunc.arrayClone(temp.Data.leftTempList.filter);
            temp.Data.leftTempList.filter = [];
            filter.handlers.disabledFilter();
            temp.elementLeftBar.dataTable.clean();
            temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
            if (selectedName != "") {
                temp.Data.leftTempList.data = temp.Data.leftTempList.data.map(function (val) {
                    if (val[0] == selectedName) {
                        return [selectedName, temp.img.activ];
                    } else {
                        return val;
                    }
                });
                temp.elementLeftBar.dataTable.clean();
                temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);

                var infopages = temp.elementLeftBar.dataTable.dt.page.info().pages;
                var result = false;
                for (var i = 0; i <= infopages - 1; i++) {
                    var res = temp.elementLeftBar.dataTable.object.find('i');
                    res.each(function () {
                        $that = $(this);
                        if ($that.attr('class').trim() == temp.img.activ) {
                            $that.parent().parent().addClass('selected');
                            result = true;
                        }
                    });
                    if (result) {
                        break;
                    } else {
                        temp.elementLeftBar.dataTable.dt.page(i + 1).draw(false);
                    }
                }
            }
        });

        temp.elementLeftBar.object.btn_addIndent.click(function () {
            temp.helpfunc.modal_btn_add();
        });

        temp.elementLeftBar.object.deleteIndent.click(function () {
            temp.elementLeftBar.object.modalWindow.find('#rowIndent form:last').remove();
        });

        temp.elementLeftBar.object.btn_save_search.click(function () {
            if (temp.Data.LoadPdfOpt.file_pdf.__proto__.constructor.name != "FormData") {
                snack.info(`Info: Please download .pdf file`);
                return;
            }
            tr.data.obj = {};
            led.action.ledOff();
            lt.view.setOff();
            // clear global state
            temp.helpfunc.cleanImg();
            temp.helpfunc.clearglobalstate();
            temp.helpfunc.cookfilesend();
            temp.helpfunc.addadvancedoption();
            filter.handlers.enabled();
            temp_ajax.sendFileToProccess()
                .then(data => {
                    temp.loadEvent.success(data);
                })
                .catch(err => {
                    temp.loadEvent.error(err[1])
                });
        });
        temp.elementControl.object.btn_page_next.click(function () {
            temp.elementControl.nextPage();
        });
        temp.elementControl.object.btn_page_prew.click(function () {
            temp.elementControl.prewPage();
        });
    },
};

temp.loadEvent = {
    success: function (data) {
        data = temp.loadEvent.prependConvertData(data);
        if (data.Pks.length > 1) {
            ph.data.object = ph.data.default;
            filter.handlers.toggleLight();
            // check id pdf download and button not push
            temp.Data.leftTempList.filter = temp.helpfunc.arrayClone(temp.Data.leftTempList.data);
            temp.Data.leftTempList.data = [
                ["Create new Configuration", "fa fa-plus-circle"]
            ];
            temp.elementLeftBar.dataTable.clean();
            data.Pks.forEach(function (val) {
                for (var i = 0; i < temp.Data.leftTempList.list.length; i++) {
                    if (val == temp.Data.leftTempList.list[i].Pk) temp.Data.leftTempList.data.push([temp.Data.leftTempList.list[i].Name, temp.img.off]);
                }
            });
            temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
            temp.elementLeftBar.Templaite.Pk = data.Template.Pk;
            temp.elementLeftBar.Templaite.name = data.Template.Name;
            temp.elementLeftBar.Templaite.RuleArr = data.Template.RuleFormingTemplate ? data.Template.RuleFormingTemplate : [];
            mp.data.RuleArr = data.Template.RuleFormingTemplate ? data.Template.RuleFormingTemplate : [];
            temp.control.templaite.renderDataTemplaite(data.Template.Pages);
            temp.control.templaite.renderDataListPaint(data.Template.Pages);
            paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage];
            temp.DataWorkspace.initwindow();
        } else if (data.Pks.length == 1) {
            var deployedTemplate = $.extend({}, data.Template);
            gf.init(deployedTemplate); // fast request to the server => get response result
            filter.handlers.toggleLight(); // filter fix
            temp.Data.leftTempList.filter = temp.helpfunc.arrayClone(temp.Data.leftTempList.data);
            temp.Data.leftTempList.data = [
                ["Create new Configuration", "fa fa-plus-circle"]
            ];
            temp.elementLeftBar.dataTable.clean();
            data.Pks.forEach(function (val) {
                for (var i = 0; i < temp.Data.leftTempList.list.length; i++) {
                    if (val == temp.Data.leftTempList.list[i].Pk) temp.Data.leftTempList.data.push([temp.Data.leftTempList.list[i].Name, temp.img.activ]);
                }
            });
            temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
            temp.elementLeftBar.dataTable.object.find('i').each(function () {
                $that = $(this);
                if ($that.attr('class').trim() == temp.img.activ) {
                    $that.parent().parent().addClass('selected');
                }
            });
            temp.elementLeftBar.Templaite.Name = deployedTemplate.Name;
            temp.elementLeftBar.Templaite.Pk = deployedTemplate.Pk;
            temp.elementLeftBar.Templaite.name = deployedTemplate.Name;
            temp.elementLeftBar.Templaite.origin = deployedTemplate;
            temp.elementLeftBar.Templaite.RuleArr = deployedTemplate.RuleFormingTemplate;
            mp.data.RuleArr = deployedTemplate.RuleFormingTemplate;
            temp.control.templaite.renderDataTemplaite(deployedTemplate.Pages);
            temp.control.templaite.renderDataListPaint(deployedTemplate.Pages);
            paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage];
            temp.DataWorkspace.initwindow();
        } else {
            // No template Found
            temp.loadEvent.singleRender(data);
        }
    },
    error: function (error) {
        console.log(error);
    },
    // no Template => Request data Render
    singleRender: (data) => {
        ph.data.object = ph.data.default; // default Scopes from object Page all,first,Last
        temp.control.templaite.unselectDataTable();
        temp.elementLeftBar.dataTable.clean();
        temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
        temp.elementLeftBar.Templaite.Pk = data.Template.Pk;
        temp.elementLeftBar.Templaite.name = data.Template.Name ? data.Template.Name : '';
        temp.elementLeftBar.Templaite.RuleArr = data.Template.RuleFormingTemplate ? data.Template.RuleFormingTemplate : [];
        mp.data.RuleArr = data.Template.RuleFormingTemplate ? data.Template.RuleFormingTemplate : [];
        temp.control.templaite.renderDataTemplaite(data.Template.Pages);
        temp.control.templaite.renderDataListPaint(data.Template.Pages);
        paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage];
        temp.DataWorkspace.initwindow();
    },
    prependConvertData: (data) => {
        temp.serverTemplate = $.extend({}, data.Template);
        temp.control.templaite.saveServerInfo($.extend({}, data.Template).Pages);
        temp.control.templaite.savePropertyPdf(data.Template.PropertyPdf ? data.Template.PropertyPdf : {}); // PropertyPdf
        ft.helpfunc.select.renderSelect(data.Template.Pages); // render option in select Copy from
        data.Pks = temp.helpfunc.deleteRepeatInArr(data.Pks ? data.Pks : []);
        return data;
    },
};

temp.pass = {
    init: () => {
        try {
            jQuery.event.special.touchstart =
                {
                    setup: function (_, ns, handle) {
                        if (ns.includes("noPreventDefault")) {
                            this.addEventListener("touchstart", handle, {passive: false});
                        }
                        else {
                            this.addEventListener("touchstart", handle, {passive: true});
                        }
                    }
                };
        } catch (e) {
            console.log('error fix touchstart event');
        }
    }
};

$(document).ready(function () {
    temp.pass.init();
    temp.init.element();
    temp.init.eventHandler();
    mt.handlers.init();
    const arrRequestToApi = [
        temp_ajax.getTemplateNameList(),
        // temp_ajax.sendRenderProccessUrl(), // get all Templates Objects
        rightpref.Ajax.sendRenderDataTypeProccess(),
        rightpref.Ajax.sendRenderAmountProccess(),
        rightpref.Ajax.sendRenderDataProccess(),
        rightpref.Ajax.sendRenderRegexProccess(),
        rightpref.Ajax.sendRenderAlternateProccess(),
        hx.ajax.getAllHeader(null),
    ];
    Promise.all(arrRequestToApi)
        .then((data) => {
            temp_ajax.render.templaite.success(data[0]);
            hx.regex.create.init(data[4].Data, []);
            redit.handlers.responseSuccess(data[4]);
            pm.handlers.hidePreloader();
        })
        .catch( err => snack.error(`Server error: ${err}`));
    au.elements.init();
    tr.init();
});
