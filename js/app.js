var temp = {};
temp.debug = false;
temp.Owen = 'http://91.235.136.123:591/';
temp.workRoot = 'http://85.214.225.230/';
temp.root = temp.debug ? '' : temp.workRoot;
temp.routes = {
    sendRenderProccessUrl: temp.root + '/api/template/gettemplates',
    sendRenderDataTypeProccessUrl: temp.root + '/api/datatypes/getdatatypes',
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
    },
    object: {},
    dataTable: {
        active: '',
        object: {},
        dt: {},
        clean: function() {
            if (!$.isEmptyObject(temp.elementLeftBar.dataTable.dt)) {
                temp.elementLeftBar.dataTable.dt.destroy();
                temp.elementLeftBar.dataTable.object.find('tbody').remove();
                temp.elementLeftBar.dataTable.dt = {};
            }
        },

        init: function(leftTempListData) {
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
                        'render': function(data, type, full, meta) {
                            return data;
                        }
                    },
                    {
                        'targets': 1,
                        'orderable': false,
                        'searchable': false,
                        'className': 'dt-body-center',
                        'render': function(data, type, full, meta) {
                            return '<i  class=" ' + data + ' "  aria-hidden="true"></i>';
                        }
                    }
                ],
                "columns": [
                    { title: "Template" },
                    { title: "Status" }
                ],
                "dom": /* "<'row'<'col-md-6'l><'col-md-6'>>*/ "t<'clear'><'row'<'col-md-12'p>>",
            });

            // select fix

            temp.elementLeftBar.dataTable.object.off('click').on('click', 'tr', function(e) {
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
                    if (temp.elementLeftBar.dataTable.active.toLowerCase().trim() != 'Create new Template'.toLowerCase() && temp.DataWorkspace.images.length > 0) {
                        temp.elementLeftBar.Templaite.state = 'temp';
                        if (temp.DataWorkspace.images.length > 0 && temp.elementLeftBar.Templaite.Pk == temp.zeroGuid) {
                            applymodal.handlers.show('Close Templaite without saving', 8);
                        } else if (temp.DataWorkspace.images.length > 0) {
                            temp.helpfunc.changeTempNotSaving();
                            temp.elementLeftBar.Templaite.state = '';
                        } else if (!temp.DataWorkspace.images.length) { // initial state => pdf not load
                            temp.Data.leftTempList.data.forEach(function(val, i) {
                                if (val[1] == temp.img.activ) val[1] = temp.img.off;
                                if (val[0] == temp.elementLeftBar.dataTable.active) val[1] = temp.img.activ;
                            });
                            temp.elementLeftBar.dataTable.clean();
                            temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);

                            temp.elementLeftBar.dataTable.object.find('i').each(function() {
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

                        if (temp.DataWorkspace.images.length > 0 && temp.elementLeftBar.Templaite.Pk == temp.zeroGuid) {
                            applymodal.handlers.show('Close Templaite without saving', 8);
                        } else if (temp.DataWorkspace.images.length > 0) {
                            temp.helpfunc.changeTempNotCreate();
                            ph.objects.data = ph.objects.default;
                            temp.elementLeftBar.Templaite.state = '';
                        } else {
                            temp.elementLeftBar.Templaite.state = '';
                        }
                    }
                }
            });

            // togle templaite state
            applymodal.elements.apply_togle_state.off('click').on('click', function() {
                applymodal.handlers.close();
                if (temp.elementLeftBar.Templaite.state == 'temp') { // choise templite
                    temp.helpfunc.changeTempNotSaving();
                    led.action.ledOff();
                }
                if (temp.elementLeftBar.Templaite.state == 'load') {
                    temp.helpfunc.changeTempNotLoad();
                }
                if (temp.elementLeftBar.Templaite.state == 'newtemp') { /// create new
                    temp.helpfunc.changeTempNotCreate();
                    led.action.ledOff();
                    lt.view.setOff();
                }
                temp.elementLeftBar.Templaite.state = '';
            });

            // delete template modal window
            temp.elementLeftBar.object.btn_del_temp.click(function(e) {
                e.preventDefault();
                var selected$ = temp.elementLeftBar.dataTable.object.find('.selected');
                if (selected$.length != 0 && selected$['0'].children[0].innerHTML != 'Create new Template') {
                    var namedeleterow = selected$.find('td.sorting_1').text();
                    applymodal.handlers.show('Delete Templaite ' + namedeleterow, 1);
                }
            });

            // delete templaite

            applymodal.elements.apply_del_temp.off('click').on('click', function() {
                applymodal.handlers.close();
                //temp.Ajax.sendDeleteTemplaiteProccess();
                temp.elementLeftBar.dataTable.deleteTemp();
            });

            // show save templaite modal window  
            temp.elementLeftBar.object.btn_save_temp.on('click', function() {
                applymodal_tempresult.elements.applymodal_tempresult_input.val(temp.elementLeftBar.Templaite.origin.Name);
                applymodal_tempresult.handlers.showtemp();
            });

            // template save

            applymodal_tempresult.elements.apply_tempresult_save_temp.on('click', function() {
                var state = false;
                var newNametemp = applymodal_tempresult.elements.applymodal_tempresult_input.val();
                if (newNametemp == '') {
                    applymodal_tempresult.handlers.close();
                    return;
                }
                temp.elementLeftBar.Templaite.name = newNametemp;
                temp.elementLeftBar.Templaite.Name = newNametemp;

                temp.Data.leftTempList.list.forEach(function(val) {
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

                var success = function(data) {
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
                    temp.elementLeftBar.dataTable.object.find('i').each(function() {
                        $that = $(this);
                        var parent$2 = $that.parent().parent();
                        if ($that.attr('class').trim() == temp.img.activ) {
                            parent$2.addClass('selected');
                        } else {
                            parent$2.removeClass('selected');
                        }
                    });
                    lt.view.setOff();
                };
                var error = function(data) {
                    console.log(data);
                };
                temp.Data.leftTempList.datas = temp.helpfunc.createresponsedata().Template;
                temp.elementLeftBar.Templaite.name = '';
                temp.Ajax.sendSaveTemplaiteProccess(temp.Data.leftTempList.datas, success, error);
                applymodal_tempresult.handlers.close();
            });

            // save result modal window   btn=> applymodal_tempresult.elements.apply_tempresult_save_result
            temp.elementLeftBar.object.btn_save_result.on('click', function() {
                if (zaglyshka.data.header.length == 0 || zaglyshka.data.xml.length == 0 || zaglyshka.data.pdf_image == 0) return;
                applymodal_tempresult.handlers.showresult();
            });
        },

        deleteTemp: function(select) {
            led.action.ledOff();
            lt.view.setOff();
            var $selected = temp.elementLeftBar.dataTable.object.find('.selected');
            if ($selected.length != 0) {
                if ($selected['0'].children[0].innerHTML != 'Create new Template') {
                    var deleterow = $selected.find('td:first').text();
                    var findPk = function() {
                        var Pk;
                        temp.Data.leftTempList.list.forEach(function(val, i) {
                            if (val.Name == deleterow) Pk = val.Pk;
                        });
                        return Pk;
                    };

                    var success = function(data) {
                        if (data.IsSuccess == true) {
                            ph.data.object = ph.data.default; // Scope Default if templaite delete
                            $selected.addClass('deleteRow');
                            temp.helpfunc.changeData(deleterow);
                            temp.elementLeftBar.dataTable.clean();
                            temp.elementLeftBar.dataTable.active = '';
                            temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
                            filter.handlers.deletefilter(data); //filter delete fix
                            temp.Data.leftTempList.list = temp.Data.leftTempList.list.filter(function(val) {
                                return val.Pk != data.Pk;
                            });
                            temp.elementLeftBar.Templaite.origin = {};
                            paint.handlers.clearsvgcontent();
                            temp.helpfunc.clearglobalstate(true);
                            temp.helpfunc.modalInfo(['Delete Templaite', deleterow]);
                            paint.init();
                        }
                    };
                    var error = function(data) {
                        console.log(data);
                    };
                    temp.Ajax.sendDeleteTemplaiteProccess({ "Pk": findPk() }, success, error);
                }
            }
        },
    },
    action: {}
};

temp.helpfunc = {
    changeTempNotSaving: function() {
        var $that = temp.elementLeftBar.Templaite.that;
        temp.Data.leftTempList.list.forEach(function(val) {
            if (val.Name == $that.find('td:first').text()) {
                temp.elementLeftBar.Templaite.origin = val;
                ph.handlers.reverseToFront(val.Scopes);
            }
            lt.view.setOff();
        });
        temp.elementLeftBar.Templaite.Pk = temp.elementLeftBar.Templaite.origin.Pk;
        temp.elementLeftBar.Templaite.Name = temp.elementLeftBar.Templaite.origin.Name;
        paint.handlers.clearsvgcontent();
        temp.helpfunc.clearglobalstate(true);

        //  temp.elementLeftBar.Templaite.origin
        temp.elementLeftBar.Templaite.origin.Pages.forEach(function(val) {
            paint.objects.datafromserver.datafromserverpage.push(val);
        });

        temp.elementLeftBar.Templaite.origin.Pages.forEach(function(val) {
            paint.objects.datafromserver.removelistpage.push(val);
        });

        paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage];
        temp.Data.leftTempList.data.forEach(function(val, i) {
            if (val[1] == temp.img.activ) val[1] = temp.img.off;
            if (val[0] == temp.elementLeftBar.Templaite.origin.Name) val[1] = temp.img.activ;
        });

        temp.elementLeftBar.Templaite.that = '';
        temp.elementLeftBar.dataTable.clean();
        temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);

        temp.helpfunc.searchPage(); // need page search

        temp.elementLeftBar.dataTable.object.find('i').each(function() {
            $that = $(this);
            if ($that.attr('class').trim() == temp.img.activ) {
                $that.parent().parent().addClass('selected');
            }
        });
        temp.DataWorkspace.initwindow();
    },

    searchPage: function() {
        var infopages = temp.elementLeftBar.dataTable.dt.page.info().pages;
        var result = false;
        for (var i = 0; i <= infopages - 1; i++) {
            var res = temp.elementLeftBar.dataTable.object.find('i');
            res.each(function() {
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

    changeTempNotLoad: function() {
        temp.elementLeftBar.Templaite.Pk = temp.zeroGuid; //Pk empty row
        temp.elementLeftBar.Templaite.Name = '';
        ph.handlers.data = ph.handlers.default;
        var e = temp.elementLeftBar.Templaite.e;
        temp.helpfunc.modalLoad(e);
    },

    changeTempNotCreate: function() {
        //Clear SVG and clear All rectangle
        temp.elementLeftBar.Templaite.Pk = temp.zeroGuid; //Pk empty row
        temp.elementLeftBar.Templaite.Name = '';
        temp.elementLeftBar.Templaite.origin = {};
        temp.helpfunc.clearglobalstate(true);
        temp.Data.leftTempList.data.forEach(function(val, i) {
            if (val[1] == temp.img.activ) val[1] = temp.img.off;
        });
        temp.elementLeftBar.dataTable.clean();
        temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
        temp.elementLeftBar.dataTable.object.find('i').each(function() {
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
    arrayClone: function(arr) {
        var i, copy;
        if (Array.isArray(arr)) {
            copy = arr.slice(0);
            for (i = 0; i < copy.length; i++) {
                copy[i] = temp.helpfunc.arrayClone(copy[i]);
            }
            return copy;
        } else if (typeof arr === 'object') {
            throw 'Cannot clone array containing an object!';
        } else {
            return arr;
        }
    },
    addTemplaite: function() {
        var add = true;
        var circle = 'fa fa-plus-circle';
        var trash = 'fa fa-trash';
        temp.Data.leftTempList.list.forEach(function(val, i) {
            if (val.Pk == temp.Data.leftTempList.datas.Pk) {
                add = false;
                temp.Data.leftTempList.list[i] = temp.Data.leftTempList.datas;
                temp.Data.leftTempList.data.forEach(function(val, i) {
                    if (val[1] != circle && val[1] != trash) temp.Data.leftTempList.data[i][1] = temp.img.off;
                    if (val[1] != circle && temp.Data.leftTempList.data[i][0] == temp.Data.leftTempList.datas.Name) {
                        temp.Data.leftTempList.data[i][1] = temp.img.activ;
                    }
                });
            }
        });
        if (add) {
            temp.Data.leftTempList.list.push(temp.Data.leftTempList.datas);
            temp.Data.leftTempList.data.forEach(function(val, i) {
                if (val[1] != circle && val[1] != trash) temp.Data.leftTempList.data[i][1] = temp.img.off;
            });
            temp.Data.leftTempList.data.push([temp.elementLeftBar.Templaite.name, temp.img.activ]);
            filter.handlers.addData([temp.elementLeftBar.Templaite.name, temp.img.off]); // filter add data
        }
    },

    deleteZeroCordRect: function(arr) {
        return arr.filter(function(val) {
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
    createresponsedata: function() {
        var empty = {
            Base64Img: "",
            TableDatas: [{
                Data: null,
                Regex: null,
                Position: '',
                Reserve: '',
                DataType: { Pk: "00000000-0000-0000-0000-000000000000", Name: "", IsText: false },
                Rect: { X0: { X: 0, Y: 0 }, X1: { X: 0, Y: 0 } }
            }],
            OnlyImages: "",
            OnlyText: "",
            OcrStrings: [{
                Sentence: "",
                Chars: [{ Char: "", Xpos: 0, Ypos: 0 }],
                Xpos: 0,
                Ypos: 0,
                XDim: 0,
                YDim: 0
            }]
        };

        return {
            Template: {
                Pk: temp.elementLeftBar.Templaite.Pk, //temp.Data.leftTempList.datas.Pk
                Name: temp.elementLeftBar.Templaite.Name, //temp.Data.leftTempList.datas.Name
                Scopes: ph.handlers.reverseToServer(), // Scope Pages Settings all,first,last
                Pages: function() {
                    var obj = temp.helpfunc.collectdata();
                    var imgarr = [];
                    obj.img.forEach(function(val) {
                        imgarr.push(val.substring('data:image/jpeg;base64,'.length));
                    });

                    // fix length page 
                    var objlength = obj.page.length;
                    var imglength = imgarr.length;
                    if (imglength > objlength) {
                        var n = imglength - objlength;
                        while (n) {
                            obj.page.push(empty);
                            n--;
                        }
                    }

                    imgarr.forEach(function(val, i) {
                        obj.page[i].Base64Img = imgarr[i];
                    });

                    // if put btn test fix
                    obj.page = obj.page.map(function(val) {
                        val.OnlyImages = ''; //temp.elementLeftBar.Templaite.OnlyImages[i].substring('data:image/jpeg;base64,'.length);
                        val.OnlyText = ''; //temp.elementLeftBar.Templaite.OnlyText[i].substring('data:image/jpeg;base64,'.length);
                        return val;
                    });

                    // add OcrStrings ==> send OCR DATA from server
                    obj.page = obj.page.map(function(val, i) {
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
        };
    },
    collectdata: function() {
        return {
            img: temp.DataWorkspace.images,
            wh: paint.objects.global.wh,
            page: function() {
                temp.helpfunc.grabrect();
                return temp.helpfunc.grabpagedata();
            }(),
        };
    },

    grabrect: function() {
        paint.objects.global.collect = [];
        paint.objects.disactiv = temp.helpfunc.deleteZeroCordRect(paint.objects.disactiv); // clear zero rectangles
        paint.objects.global.disactivpage[temp.DataWorkspace.activpage] = (paint.objects.disactiv.map(function(val) { return $.extend({}, val); }).slice());

        paint.objects.datafromserver.datafromserverpage.forEach(function(val, i) {
            if (paint.objects.global.disactivpage[i] == undefined) {
                paint.objects.global.collect[i] = val;
            } else {
                paint.objects.global.collect[i] = temp.helpfunc.deleteZeroCordRect(paint.objects.global.disactivpage[i]); // need fix zero coord
            }
        });

        if (paint.objects.global.collect.length == 0) {
            temp.DataWorkspace.images.forEach(function(val, i) {
                paint.objects.global.collect.push(undefined);
            });
            paint.objects.global.collect[temp.DataWorkspace.activpage] = paint.objects.global.disactivpage[temp.DataWorkspace.activpage];
        }
    },

    grabpagedata: function() {
        var res = [];
        paint.objects.global.collect.forEach(function(val, i) {
            if (val == undefined) val = [{}];
            if ($.type(val) != 'array') {
                res.push(val);
            } else {
                res.push(temp.helpfunc.arrchangeobjdata(val));
            }
        });
        return res;
    },

    thisIsText: function(pk) {
        var res = false;
        var IsText;
        if (!pk) return false;
        rightbar.data.global.dataType.filter(function(val, i) {
            if (val.Pk == pk) {
                if (rightbar.data.global.dataType[i].IsText) res = true;
            }
        });
        return res;
    },

    arrchangeobjdata: function(arr) {

        var getCurentTypeRect = function(text) {
            return rightbar.data.global.dataType.filter(function(val) {
                if (val.DataType.toLowerCase().trim() == text.toLowerCase().trim() && val.Pk == false) {
                    return true;
                } else {
                    return false;
                }
            }).length > 0;
        };

        var obj = {};
        arr.forEach(function(val, i) {
            var newDataType = false;
            if (getCurentTypeRect(val.type)) {
                if (val.type == 'MainHeader') {
                    if (obj[val.type] == undefined) obj[val.type] = [];
                    obj[val.type] = { Rect: temp.helpfunc.percentchangecord(val.rectData) };
                    if (obj.TableDatas == undefined) {
                        obj.TableDatas = [];
                    }
                    val.type = 'TableDatas';
                    newDataType = 'TableDatas';
                    if (obj[val.type] == undefined) obj[val.type] = [];
                    obj.TableDatas.push({ Rect: temp.helpfunc.percentchangecord(val.rectData), Position: (val.position.length == 0) ? [] : val.position, Regex: val.regex, Reserve: val.reserve, Data: val.value, DataType: { Name: newDataType ? newDataType : val.type, Pk: val.Pk ? val.Pk : null, IsText: temp.helpfunc.thisIsText(val.Pk) } });
                } else {
                    if (obj[val.type] == undefined) obj[val.type] = [];
                    obj[val.type].push({ Rect: temp.helpfunc.percentchangecord(val.rectData), Data: val.value });
                }
            } else {
                newDataType = val.type;
                val.type = 'TableDatas';
                if (obj[val.type] == undefined) obj[val.type] = [];
                obj[val.type].push({ Rect: temp.helpfunc.percentchangecord(val.rectData), Position: (val.position.length == 0) ? [] : val.position, Regex: val.regex, Reserve: val.reserve, Data: val.value, DataType: { Name: newDataType ? newDataType : val.type, Pk: val.Pk ? val.Pk : null, IsText: temp.helpfunc.thisIsText(val.Pk) } });
            }

            // if (getCurentTypeRect(val.type)) {
            //     newDataType = val.type;
            //     val.type = 'TableDatas';
            //     obj[val.type].push({ Rect: temp.helpfunc.percentchangecord(val.rectData), Position: (val.position.length == 0) ? [] : val.position, Regex: val.regex, Reserve: val.reserve, Data: val.value, DataType: { Name: newDataType ? newDataType : val.type, Pk: val.Pk ? val.Pk : null, IsText: temp.helpfunc.thisIsText(val.Pk) } });
            // } else if (val.type != 'MainHeader') {
            //     obj[val.type].push({ Rect: temp.helpfunc.percentchangecord(val.rectData), Data: val.value });
            // } else {
            //     obj[val.type] = { Rect: temp.helpfunc.percentchangecord(val.rectData) };
            //     if (obj.TableDatas == undefined) {
            //         obj.TableDatas = [];
            //     }
            //     val.type = 'TableDatas';
            //     newDataType = 'TableDatas';
            //     obj.TableDatas.push({ Rect: temp.helpfunc.percentchangecord(val.rectData), Position: (val.position.length == 0) ? [] : val.position, Regex: val.regex, Reserve: val.reserve, Data: val.value, DataType: { Name: newDataType ? newDataType : val.type, Pk: val.Pk ? val.Pk : null, IsText: temp.helpfunc.thisIsText(val.Pk) } });
            // }
        });
        return obj;
    },
    percentchangecord: function(arr) {
        var res = {};
        if (arr == undefined) return { X0: { X: 0, Y0: 0 }, X1: { X: 0, Y0: 0 } };
        arr.forEach(function(val, i) {
            res['X' + i] = { X: temp.helpfunc.blockcalcpercent(val.x, paint.objects.global.wh[0]), Y: temp.helpfunc.blockcalcpercent(val.y, paint.objects.global.wh[1]) };
        });
        return res;
    },

    blockcalcpercent: function(coord, wh) {
        return +((coord.toFixed(3) * 100 / wh).toFixed(3));
    },

    // change data after delete
    changeData: function(text) {
        $.each(temp.Data.leftTempList.data, function(i, val) {
            if (val[0] == text) {
                temp.Data.leftTempList.data[i][1] = temp.img.delete;
            }
        });
    },
    modalInfo: function(text) {
        var $modal = temp.elementLeftBar.object.infoModal;
        $modal.find('h5').text(text[0]);
        $modal.find('.lead').text(text[1]);
        $modal.modal('show');
        setTimeout(function() {
            $modal.modal('hide');
        }, 3000);
    },

    modalLoad: function(e) {
        e.preventDefault();
        temp.elementLeftBar.object.modalWindow.modal();
    },

    modal_btn_add: function() {
        var row = temp.elementLeftBar.object.modalWindow.find('#rowIndent');
        row.append(temp.html.addRowLoad);
    },

    cookfilesend: function() {
        var $arrOpt = temp.elementLeftBar.object.modalWindow.find('#rowIndent form');
        $.each($arrOpt, function(i) {
            var $that = $(this);
            if ($that.find('input').val() != '') {
                temp.Data.LoadPdfOpt.advanc_settings_search.push([($that.find('select option:selected').text()), $that.find('input').val()]);
                temp.Data.LoadPdfOpt.nameTemplate = temp.elementLeftBar.dataTable.active;
            }
        });
        temp.elementLeftBar.object.modalWindow.modal('hide');
    },
    // advanced option to load pdf file
    addadvancedoption: function() {
        if (temp.Data.LoadPdfOpt.advanc_settings_search.length > 0) {
            var arr = [];
            temp.Data.LoadPdfOpt.advanc_settings_search.forEach(function(val, i) {
                arr.push({ name: val[0], value: val[1] });
            });
            temp.Data.LoadPdfOpt.file_pdf.append(JSON.stringify(arr), '');
            //   temp.Data.LoadPdfOpt.file_pdf.append('advancedoption',temp.Data.LoadPdfOpt.advanc_settings_search);
        }
    },

    errorfindTemplaite: function(jqXHR, textStatus, errorThrown) {
        temp.helpfunc.modalInfo(['Eror server', '#404']);
    },

    successfindTemplaite: function(data, textStatus, jqXHR) {},

    createpageList: function(arrimg) {
        if (!$('img').is('#dynamicImg')) {
            var $wind = temp.DataWorkspace.object.pdfWindow;
            var img = $('<img unselectable="on" class="img-fluid w-100" id="dynamicImg">');
            var getcurrentimg = function(state) {
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

            img.appendTo($wind).on('load', function() {
                paint.objects.global.wh = [img.width(), img.height()]; // detect WH inner IMG   
                paint.init();
            });
        }
    },
    cleanImg: function() {
        $('#dynamicImg').remove();
    },

    infowind: function() {
        temp.elementControl.object.page_info_control.attr("placeholder", "" + function() {
            return temp.DataWorkspace.activpage + 1;
        }() + " " + "(" + temp.DataWorkspace.images.length + ")");
    },

    clearglobalstate: function() {
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
    nextPage: function() {
        if (temp.DataWorkspace.activpage < temp.DataWorkspace.images.length - 1) {
            paint.objects.global.disactivpage[temp.DataWorkspace.activpage] = paint.objects.disactiv;
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
    prewPage: function() {
        if (temp.DataWorkspace.activpage != 0) {
            paint.objects.global.disactivpage[temp.DataWorkspace.activpage] = paint.objects.disactiv;
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
    initwindow: function() {
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
            ["Create new Template", "fa fa-plus-circle"]
        ]
    },
    rightTempList: {}
};

temp.control = {
    templaite: {
        searchtemplaite: function(guid) {
            return temp.Data.leftTempList.list.filter(function(val) {
                return val.Pk == guid;
            });
        },
        saveServerInfo: function(arrData) {
            arrData.forEach(function(val, i) {
                temp.serverInfo.push(val.OcrStrings);
            });
        },
        renderDataTemplaite: function(data) {
            var base64Title = 'data:image/jpeg;base64,';
            var pages = [];
            $.each(data, function(i, v) {
                pages.push(base64Title + v.Base64Img);
            });
            temp.DataWorkspace.images = pages;
            temp.elementLeftBar.Templaite.OnlyImages = [];
            temp.elementLeftBar.Templaite.OnlyText = [];
            data.forEach(function(val, i) {
                temp.elementLeftBar.Templaite.OnlyImages[i] = base64Title + val.OnlyImages;
                temp.elementLeftBar.Templaite.OnlyText[i] = base64Title + val.OnlyText;
            });
        },

        renderDataListPaint: function(pagearr) {
            pagearr.forEach(function(val) {
                paint.objects.datafromserver.datafromserverpage.push(val);
            });
            pagearr.forEach(function(val) {
                paint.objects.datafromserver.removelistpage.push(val);
            });
        },

        unselectDataTable: function() {
            temp.Data.leftTempList.data.forEach(function(val, i) {
                if (val[1] == temp.img.activ) temp.Data.leftTempList.data[i][1] = temp.img.off;
            });
            temp.elementLeftBar.dataTable.object.find('selected').removeClass('selected');
        },

        selectfindTemplaite: function(templaiteObj) {
            //clear img.activ prev
            temp.control.templaite.unselectDataTable();
            temp.Data.leftTempList.data.forEach(function(val, i) {
                if (val[0] == templaiteObj.Name) {
                    temp.Data.leftTempList.data[i][1] = temp.img.activ;
                }
            });
            temp.elementLeftBar.dataTable.clean();
            temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
            (function() {
                var pagelength = temp.elementLeftBar.dataTable.dt.page.info().pages;
                for (var i = 0; i <= pagelength - 1; i++) {
                    temp.elementLeftBar.dataTable.dt.page(i).draw(false);
                    var findactivimg = temp.elementLeftBar.dataTable.object.find('' + temp.img.activ);
                    if (findactivimg.length > 0) {
                        findactivimg.parent().parent().parent().addClass('selected');
                        break;
                    }
                }
            })();
            temp.elementLeftBar.dataTable.object.find('i').each(function() {
                $that = $(this);
                if ($that.attr('class').trim() == temp.img.activ) {
                    $that.parent().parent().addClass('selected');
                }
            });
        },
    },

    addemptyData: function(arr, n, pos) {
        var base64Length = 'data:image/jpeg;base64,'.length;
        var position = pos;
        var clone = arr.slice(0);
        var data = {
            Base64Img: "",
            TableDatas: [{
                Data: null,
                DataType: { Pk: "00000000-0000-0000-0000-000000000000", Name: "", IsText: false },
                Rect: { X0: { X: 0, Y: 0 }, X1: { X: 0, Y: 0 } }
            }],
            OnlyImages: "",
            OnlyText: "",
        };
        for (var i = 0; i < n; i++) {
            data.Base64Img = temp.DataWorkspace.images[position + 1].substring(base64Length);
            data.OnlyImages = temp.elementLeftBar.Templaite.OnlyImages[positions + 1].substring(base64Length);
            data.OnlyText = temp.elementLeftBar.Templaite.OnlyText[position + 1].substring(base64Length);
            clone.push(data);
            position++;
        }
        return clone;
    },
};

temp.init = {
    element: function() {
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

    eventHandler: function() {

        $('input[type=file]').fileselect({
            browseBtnClass: 'btn btn-secondary',
            language: 'en'
        });

        $('input[type=file]').on('change', prepareUpload);
        // Grab the files and set them to our variable
        function prepareUpload(event) {

            temp.Data.LoadPdfOpt.file_pdf = new FormData();
            $.each(event.target.files, function(key, value) {
                temp.Data.LoadPdfOpt.file_pdf.append(key, value);
            });
        }
        // load pdf to the server

        temp.elementLeftBar.object.btn_load_temp.click(function(e) {
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
        temp.elementControl.object.btn_filter.on('click', function() {
            if (temp.Data.leftTempList.filter.length == 0) return;
            filter.handlers.toggleLight();
            var selectedName = function() {
                var res = "";
                temp.elementLeftBar.dataTable.object.find('i').each(function() {
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
                temp.Data.leftTempList.data = temp.Data.leftTempList.data.map(function(val) {
                    if (val[0] == selectedName) {
                        return [selectedName, temp.img.activ];
                    } else {
                        return val;
                    }
                });
                temp.elementLeftBar.dataTable.clean();
                temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
                // fix datablesearch templaite selected
                /* 
                             if( temp.elementLeftBar.dataTable.dt.find('.'+ temp.img.activ).length==0){
                                 temp.elementLeftBar.dataTable.dt.page('next').draw(false);
                             }

                */
                var infopages = temp.elementLeftBar.dataTable.dt.page.info().pages;
                var result = false;
                for (var i = 0; i <= infopages - 1; i++) {
                    var res = temp.elementLeftBar.dataTable.object.find('i');
                    res.each(function() {
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
        // fix datable search templaite selected
        /* 
                temp.elementLeftBar.dataTable.dt.on( 'page.dt', function () {
                    var info = table.page.info();
                   if( temp.elementLeftBar.dataTable.dt.find('.'+ temp.img.activ).length!=0){
                     temp.elementLeftBar.dataTable.dt.find('.'+ temp.img.activ).parent().parent().addClass('.selected');
                   }else {
                         temp.elementLeftBar.dataTable.dt.page('next').draw(false);
                   }
                } );
        */
        temp.elementLeftBar.object.btn_addIndent.click(function() {
            temp.helpfunc.modal_btn_add();
        });

        temp.elementLeftBar.object.deleteIndent.click(function() {
            temp.elementLeftBar.object.modalWindow.find('#rowIndent form:last').remove();
        });

        temp.elementLeftBar.object.btn_save_search.click(function() {
            if (temp.Data.LoadPdfOpt.file_pdf.__proto__.constructor.name != "FormData") {
                temp.helpfunc.modalInfo(['Info', 'Please download .pdf file']);
                return;
            } // if pdf file not load 
            led.action.ledOff(); // off led MainHeader
            lt.view.setOff(); // off layout
            // clear global state
            temp.helpfunc.cleanImg();
            temp.helpfunc.clearglobalstate();
            temp.helpfunc.cookfilesend();
            temp.helpfunc.addadvancedoption();
            filter.handlers.enabled();
            var success = function(data) {
                temp.serverInfo = []; // clean data prew server
                filter.handlers.filterClear();
                //////////////////////////////////////////////////////////////////////////////////////////////////////////
                // fix b. end
                var fix = function(arr) {
                    var obj = {};
                    for (var i = 0; i < arr.length; i++) {
                        var str = arr[i];
                        obj[str] = true;
                    }
                    return Object.keys(obj);
                };
                data.Pks = fix(data.Pks);
                ////////////////////////////////////////////////////////////////////////////
                if (data.Pks.length > 1) {

                    ph.data.object = ph.data.default; // set default pages objects
                    filter.handlers.toggleLight();

                    // check id pdf download and button not push
                    temp.Data.leftTempList.filter = temp.helpfunc.arrayClone(temp.Data.leftTempList.data);

                    temp.Data.leftTempList.data = [
                        ["Create new Template", "fa fa-plus-circle"]
                    ];

                    temp.elementLeftBar.dataTable.clean();
                    data.Pks.forEach(function(val) {
                        for (var i = 0; i < temp.Data.leftTempList.list.length; i++) {
                            if (val == temp.Data.leftTempList.list[i].Pk) temp.Data.leftTempList.data.push([temp.Data.leftTempList.list[i].Name, temp.img.off]);
                        }
                    });
                    temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
                    temp.elementLeftBar.Templaite.Pk = data.Template.Pk;
                    temp.elementLeftBar.Templaite.name = data.Template.Name;
                    temp.control.templaite.renderDataTemplaite(data.Template.Pages);
                    temp.control.templaite.renderDataListPaint(data.Template.Pages);
                    temp.control.templaite.saveServerInfo(data.Template.Pages); //server info    paint.serverInfo
                    paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage];
                    temp.DataWorkspace.initwindow();
                } else if (data.Pks.length == 1) {
                    gf.init(data); // fast request to the server => get response result 

                    filter.handlers.toggleLight(); // filter fix


                    temp.Data.leftTempList.filter = temp.helpfunc.arrayClone(temp.Data.leftTempList.data);
                    temp.Data.leftTempList.data = [
                        ["Create new Template", "fa fa-plus-circle"]
                    ];
                    temp.elementLeftBar.dataTable.clean();
                    data.Pks.forEach(function(val) {
                        for (var i = 0; i < temp.Data.leftTempList.list.length; i++) {
                            if (val == temp.Data.leftTempList.list[i].Pk) temp.Data.leftTempList.data.push([temp.Data.leftTempList.list[i].Name, temp.img.activ]);
                        }
                    });
                    var oneData = temp.Data.leftTempList.list.filter(function(val, i) {
                        return val.Pk == data.Pks[0];
                    });
                    temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
                    temp.elementLeftBar.dataTable.object.find('i').each(function() {
                        $that = $(this);
                        if ($that.attr('class').trim() == temp.img.activ) {
                            $that.parent().parent().addClass('selected');
                        }
                    });
                    ph.handlers.reverseToFront(oneData[0].Scopes); // add Scopes in object pages all,first,last
                    temp.elementLeftBar.Templaite.Name = oneData[0].Name;
                    temp.elementLeftBar.Templaite.Pk = oneData[0].Pk;
                    temp.elementLeftBar.Templaite.name = oneData[0].Name;
                    temp.control.templaite.renderDataTemplaite(data.Template.Pages);
                    temp.control.templaite.renderDataListPaint(oneData[0].Pages);
                    temp.control.templaite.saveServerInfo(data.Template.Pages); //server info    paint.serverInfo
                    paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage];
                    temp.DataWorkspace.initwindow();


                    //  setTimeout(function() { test.elements.test_btn.click(); }, 3000);
                    // Get result if found only one Templaite
                } else {
                    ph.data.object = ph.data.default; // default Scopes from object Page all,first,Last
                    temp.control.templaite.unselectDataTable();
                    temp.elementLeftBar.dataTable.clean();
                    temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
                    temp.elementLeftBar.Templaite.Pk = data.Template.Pk;
                    temp.elementLeftBar.Templaite.name = data.Template.Name;
                    temp.control.templaite.renderDataTemplaite(data.Template.Pages);
                    temp.control.templaite.renderDataListPaint(data.Template.Pages);
                    temp.control.templaite.saveServerInfo(data.Template.Pages); //server info    paint.serverInfo
                    paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage];
                    temp.DataWorkspace.initwindow();
                }
            };
            var error = function(data) {
                alert(data);
            };
            temp.Ajax.sendFileToProccess(null, success, error);
        });

        temp.elementControl.object.btn_page_next.click(function() {
            temp.elementControl.nextPage();
        });

        temp.elementControl.object.btn_page_prew.click(function() {
            temp.elementControl.prewPage();
        });
    },
};

temp.render = {
    templaite: {
        success: function(data) {
            var datas = [];
            data.forEach(function(val, i) {
                datas.push($.parseJSON(val));
            });
            datas.forEach(function(val, i) {
                temp.Data.leftTempList.data.push([val.Name, temp.img.off]);
                temp.Data.leftTempList.list.push(val);
            });
            temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
        },
        error: function(data) {
            alert(data);
        },
    }
};

temp.Ajax = {
    sendFileToProccess: function(url, success, error) {
        $.ajax({
            url: temp.routes.sendFileToProccessUrl,
            data: temp.Data.LoadPdfOpt.file_pdf,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data, textStatus, jqXHR) {
                success(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                error(textStatus);
            },
            beforeSend: function() {
                pm.handlers.showPreloader(); //
                // load.handlers.togleLoader();
                load.handlers.showLoader(load.elements.load_btn_load_temp, load.elements.boss_btn_load_temp);
            },
            complete: function() {
                // load.handlers.togleLoader();
                pm.handlers.hidePreloader();
                load.handlers.hideLoader(load.elements.load_btn_load_temp, load.elements.boss_btn_load_temp);
            }
        });
    },

    sendSaveTemplaiteProccess: function(data, success, error) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendSaveTempaiteProccess,
            type: "POST",

            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                success(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                error(jqXHR);
            },
            beforeSend: function() {
                load.handlers.togleLoader();
                load.handlers.showLoader(load.elements.load_btn_save_temp, load.elements.boss_btn_save_temp);
                pm.handlers.showPreloader(); // main preloader

            },
            complete: function() {
                load.handlers.togleLoader();
                load.handlers.hideLoader(load.elements.load_btn_save_temp, load.elements.boss_btn_save_temp);
                pm.handlers.hidePreloader(); // main preloader
            }
        });
    },
    sendDeleteTemplaiteProccess: function(data, success, error) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendDeleteTemplaiteProccess,
            type: "POST",

            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                success(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                error(errorThrown);
            },
            beforeSend: function() {
                load.handlers.togleLoader(); //-->
                pm.handlers.showPreloader();
                load.handlers.showLoader(load.elements.load_btn_del_temp, load.elements.boss_btn_del);
            },

            complete: function() {
                pm.handlers.hidePreloader();
                load.handlers.togleLoader(); // -->
                load.handlers.hideLoader(load.elements.load_btn_del_temp, load.elements.boss_btn_del);
            }
        });
    },
    sendRenderProccessUrl: function(data, success, error) {
        $.ajax({
            data: data,
            url: temp.routes.sendRenderProccessUrl,
            type: "POST",
            success: function(data, textStatus, jqXHR) {
                success(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                error(errorThrown);
            },
            beforeSend: function() {},
            complete: function() {
                pm.handlers.check(); // preload--
            }
        });
    },
};

$(document).ready(function() {
    temp.init.element();
    temp.init.eventHandler();
    temp.Ajax.sendRenderProccessUrl('', temp.render.templaite.success, temp.render.templaite.error);
    rightpref.Ajax.sendRenderDataTypeProccess();
    rightpref.Ajax.sendRenderAmountProccess();
    rightpref.Ajax.sendRenderDataProccess();
    rightpref.Ajax.sendRenderRegexProccess();
    rightpref.Ajax.sendRenderAlternateProccess();
    hx.ajax.getAllHeader(null);
    au.elements.init();
});