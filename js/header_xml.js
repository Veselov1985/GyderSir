    var hx = {};
    hx.data = {
        list: [],
        tableList: [],
    }

    hx.elements = {};
    hx.init = function() {
        hx.elements.header_xml = $('#header_xml');
        hx.elements.HeaderXmlList = $('#HeaderXmlList');
        hx.dataTable.set.object = $('#table_xml');
        hx.elements.fieldPref = $('#fieldPref');
        // btn
        hx.elements.savdelDHeaderXML = $('#savdelDHeaderXML'); // block btn
        hx.elements.btn_apply_xml = $('#btn_apply_xml');
        hx.elements.btn_new_xml = $('#btn_new_xml');
        hx.elements.btn_del_xml = $('#btn_del_xml');

        hx.elements.editXML = $('#editXML'); // block edit xml
        hx.elements.textarea_label_xml = $('#textarea_label_xml'); // labek xml
        hx.elements.textarea_xml = $('#textarea_xml'); // textArea Xml Header
        hx.elements.edit_XML_btn = $('#edit_XML_btn'); //btn block edit textarea
        hx.elements.btn_edit_xml = $('#btn_edit_xml'); // btn edit xml Header

        // block btn saveNewXml
        hx.elements.saveNewXml = $('#saveNewXml');
        hx.elements.btn_xml_ok = $('#btn_xml_ok');
        hx.elements.btn_new_xml_cancel = $('#btn_new_xml_cancel');

        //input new
        hx.elements.tabSaveNameXML = $('#tabSaveNameXML');
        hx.elements.input_new_HEaderXml = $('#input_new_HEaderXml');
    };

    hx.dataTable = {
        set: {
            object: {},
            dt: {},
            activ: {},
        },
        clean: function() {
            if (!$.isEmptyObject(hx.dataTable.set.dt)) {
                hx.dataTable.set.dt.destroy();
                hx.dataTable.set.object.find('tbody').remove();
                hx.dataTable.set.object.find('thead').remove();
                hx.dataTable.set.dt = {};
            }
        },

        init: function(header_xml_list) {
            hx.dataTable.clean();
            hx.dataTable.set.dt = hx.dataTable.set.object.DataTable({
                "pagingType": 'simple_numbers',
                "order": [],
                "lengthMenu": [
                    [13],
                    [13]
                ],
                "select": true,
                "responsive": true,
                "data": header_xml_list,
                "columns": [{
                    title: "Header XML"
                }],
                "dom": "t<'clear'><'row'<'col-md-12'p>>",
            });
        },

    };

    hx.helpfunc = {
        clearListTable: function() {
            hx.data.tableList = [];
        },
        clearListData: function() {
            hx.data.list = [];
        },
        hideElem: function(elem) {
            elem.attr('hidden', 'hidden');

        },
        showElem: function(elem) {
            elem.attr('hidden', false);
        },
        clearInput: function() {
            hx.elements.input_new_HEaderXml.val('');
        },
        getInput: function() {
            return hx.elements.input_new_HEaderXml.val();
        },
        setInput: function(val) {
            hx.elements.input_new_HEaderXml.val(val);
        },
        splitData: function(data) {
            var arr = data.split(/\n|\;|\,/);
            arr = arr.filter(function(val, i) {
                return val != "";
            });
            return arr.map(function(val) { return hx.helpfunc.low(val) });
        },
        setNewLineTextArea: function(text) {
            if (text == null) return '';
            return text.split(',').map(function(val) {
                return val.trim().replace(/\n/, '');
            }).join(',\n');
        },
        clearTextArea: function() {
            hx.elements.textarea_xml.val('');
        },
        getValTextArea: function() {
            return hx.elements.textarea_xml.val();
        },
        setTextArea: function(str) {
            hx.elements.textarea_xml.val(hx.helpfunc.setNewLineTextArea(str));
        },
        clearLabel: function() {
            hx.elements.textarea_label_xml.text(':');
        },
        setLabel: function(text) {
            hx.elements.textarea_label_xml.text(text + ':');

        },
        low: function(str) {
            return str.toLowerCase();
        },
        deleteDubl: function(arr) {
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                var str = arr[i];
                obj[str] = true;
            }
            return Object.keys(obj);
        }
    };

    hx.handlears = {
        createListTable: function(arr) {
            if (arr.length > 0) {
                arr.forEach(function(val) {
                    hx.data.tableList.push([val.Name]);
                });
            }
        },
        createListData: function(arr) {
            if (arr.length > 0) {
                hx.data.list = hx.data.list.concat(arr.map(function(val, i) {
                    val.Data = (val.Data.split().map(function(v, j) { return hx.helpfunc.low(v); })).join(',');
                    return val;
                }));
            }
        },
        findDataHeader: function(text) {
            return arr = hx.data.list.filter(function(val, i) {
                return val.Name == text;
            })[0];
        },
        filterList: function(name) {
            hx.data.list = hx.data.list.filter(function(val) {
                return val.Name != name;
            });
        },
        filterDataTable: function(name) {
            hx.data.tableList = hx.data.tableList.filter(function(val) {
                return val[0] != name;
            });
        },
        changeOrReplaceList: function(obj) {
            var state = false;
            hx.data.list = hx.data.list.map(function(val, i) {
                if (obj.Name == val.Name) {
                    val.Data = obj.Data;
                    state = true;
                    return val;
                } else {
                    return val;
                }
            });
            if (!state) hx.data.list.push(obj);
        },
        pushOrNotTableList: function(name) {
            var state = false;
            hx.data.tableList.forEach(function(val) {
                if (val[0] == name) {
                    state = true;
                }
            })
            if (!state) hx.data.tableList.push([name]);
        },
        //////////////////////////////////////////////////////////////////
        setchangeselectdatatype: function() { // need switch page

            if (!paint.objects.activrect.value) return; // clear in future  // issue trim()
            var pages, pageStart;
            var state = false;
            pageStart = hx.dataTable.set.dt.page.info().page;
            pages = hx.dataTable.set.dt.page.info().pages;
            for (var p = 0; p <= pages; p++) {
                hx.dataTable.set.dt.page(p).draw(false);
                var val = hx.dataTable.set.object.find('tr');
                val.each(function(i, value) {
                    var $that = $(this);
                    var $text = $that.find('td').text().trim();
                    $that.removeClass('selected');
                    if ($text == paint.objects.activrect.value.trim() && hx.handlears.test()) {
                        $(value).addClass('selected');
                        state = true;
                        // set label and textarea
                        var objHeader = hx.handlears.findDataHeader($text); // =>{Name: Data:}
                        hx.helpfunc.setLabel(objHeader.Name);
                        hx.helpfunc.setTextArea(objHeader.Data);
                    }
                });
                if (state) break;
            }
            if (!state) {
                hx.dataTable.set.dt.page(pageStart).draw(false);
            }
        },
        test: function() {
            var state = false;
            var rectValue = paint.objects.activrect.value.trim();
            hx.data.tableList.forEach(function(val) {
                if (val[0] == rectValue) {
                    state = true;
                }
            });
            return state;
        },
        ///////////////////////////////////////////////////////////////////////
        setHeaderXmlSelected: function() {

            if (paint.objects.activrect.value == '' && !hx.handlears.test()) {

                $.each(hx.dataTable.set.object.find('tr'), function(i, val) {
                    var $tr = $(this);
                    $tr.removeClass('selected');
                });
                hx.helpfunc.clearLabel();
                hx.helpfunc.clearTextArea();
                return;
            }
            $.each(hx.dataTable.set.object.find('tr'), function(i, val) {
                var $tr = $(this);
                $tr.removeClass('selected');
                if (paint.objects.activrect.value == $tr.find('td').text().trim() && hx.handlears.test()) {
                    $tr.addClass('selected');
                }
            });
            if (temp.DataWorkspace.images.length > 0) hx.handlears.setchangeselectdatatype();
        },

    };

    hx.action = function() {
        hx.elements.btn_new_xml.on('click', function() {
            hx.helpfunc.clearInput();
            hx.helpfunc.clearLabel();
            hx.helpfunc.clearTextArea();
            hx.helpfunc.hideElem(hx.elements.HeaderXmlList);
            hx.helpfunc.showElem(hx.elements.tabSaveNameXML);
            hx.helpfunc.hideElem(hx.elements.savdelDHeaderXML);
            hx.helpfunc.showElem(hx.elements.saveNewXml);
            hx.helpfunc.hideElem(hx.elements.edit_XML_btn);
        })

        hx.elements.btn_new_xml_cancel.on('click', function() {
            hx.helpfunc.clearInput();
            hx.helpfunc.clearLabel();
            hx.helpfunc.clearTextArea();
            hx.helpfunc.showElem(hx.elements.HeaderXmlList);
            hx.helpfunc.hideElem(hx.elements.tabSaveNameXML);
            hx.helpfunc.showElem(hx.elements.savdelDHeaderXML);
            hx.helpfunc.hideElem(hx.elements.saveNewXml);
            hx.helpfunc.showElem(hx.elements.edit_XML_btn);
            var $tr = hx.dataTable.set.object.find('tr.selected');
            if ($tr.length > 0) {
                $tr.removeClass('selected');
            }
        })

        hx.elements.btn_xml_ok.on('click', function(e) {
            e.preventDefault();
            var $input = hx.helpfunc.getInput();
            var $textarea = hx.helpfunc.splitData(hx.helpfunc.getValTextArea());
            $textarea = hx.helpfunc.deleteDubl($textarea).join(',') // delete Dublicate
            if ($input.trim() != '') {
                hx.ajax.editNewHeader({ Name: $input, Data: $textarea })
            } else {
                temp.helpfunc.modalInfo(['XML Header', 'Field must not be empty']);
            }
        });

        hx.elements.btn_del_xml.on('click', function() {
            var $selected = hx.dataTable.set.dt.$('tr.selected');
            if ($selected.length != 0) {
                var text = $selected.find('td').text().trim();
                hx.ajax.deleteHeader({ Name: text, Data: null });
            } else {
                temp.helpfunc.modalInfo(['XML Header', 'Need select at least one']);
            }
        });

        hx.elements.btn_apply_xml.on('click', function() {
            if (!temp.DataWorkspace.images.length) return;
            var $selected = hx.dataTable.set.dt.$('tr.selected');
            var $text = $selected.find('td').text();
            if ($selected.length != 0) {
                // logic add Header  Xml in rect
                paint.objects.activrect.value = $text;
                ///////////////////////////// block add new keyword in dataBase
                var newKeyWord = cc.init();
                if (newKeyWord) { // send toSave in database

                    // maybe need check error or replace newKeyWord

                    var newDataTextarea = hx.helpfunc.deleteDubl((hx.helpfunc.splitData(hx.helpfunc.getValTextArea())).concat(newKeyWord.toLowerCase().trim()));
                    hx.helpfunc.clearTextArea();
                    hx.helpfunc.setTextArea(newDataTextarea.join(","));
                    hx.elements.btn_edit_xml.click();
                }


                /////////////////////////////
                paint.objects.disactiv = paint.objects.disactiv.map(function(val, i) {
                    if (paint.objects.activrect.id == val.id) {
                        val.value = $text;
                        return val;
                    } else {
                        return val;
                    }
                });
                temp.helpfunc.modalInfo(['XML Header', 'XML Header add in rectangle']);
            } else {
                temp.helpfunc.modalInfo(['XML Header', 'Need select at least one']); // option show modal Info
            }
        })

        hx.elements.input_new_HEaderXml.keyup(function() {
            var text = $(this).val();
            hx.helpfunc.setLabel(text);
        });

        hx.elements.btn_edit_xml.on('click', function() {
            var $selected = hx.dataTable.set.dt.$('tr.selected');
            if ($selected.length > 0) {
                var $text = $selected.find('td').text().trim();
                var $data = hx.helpfunc.splitData(hx.helpfunc.getValTextArea());
                $data = hx.helpfunc.deleteDubl($data).join(',');
                hx.ajax.editNewHeader({ Name: $text, Data: $data });
            } else {
                temp.helpfunc.modalInfo(['XML Header', 'Need select at least one']);
            }
        });

        hx.dataTable.set.object.on('click', 'tr', function(e) {
            var $selected = $(e.target);
            if ($selected.parent().attr('class').indexOf('selected') != -1) { // unselected tr
                hx.helpfunc.clearTextArea();
                hx.helpfunc.clearLabel();
            } else {
                $.each(hx.dataTable.set.object.find('tr'), function(i, val) {
                    $(this).removeClass('selected');
                }); //selected tr
                var text = $selected.text();
                var objHeader = hx.handlears.findDataHeader(text); // =>{Name: Data:}
                hx.helpfunc.setLabel(objHeader.Name);
                hx.helpfunc.setTextArea(objHeader.Data);
            }
        });
    };

    hx.ajax = {
        getAllHeader: function(datas) {
            $.ajax({
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: temp.routes.getallheaderdatatypesUrl,
                type: "POST",
                data: JSON.stringify(datas),
                dataType: 'json',
                success: function(data, textStatus, jqXHR) {
                    hx.ajax.getAllHeaderSuccess(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    hx.ajax.getAllHeaderError(jqXHR);
                },
                beforeSend: function() {},
                complete: function() {
                    pm.handlers.check(); // preload--
                }
            });
        },
        deleteHeader: function(datas) {
            $.ajax({
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: temp.routes.deleteheaderdatatypeUrl,
                type: "POST",
                data: JSON.stringify(datas),
                dataType: 'json',
                success: function(data, textStatus, jqXHR) {
                    hx.ajax.deleteHeaderSuccess(data, datas.Name);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    hx.ajax.deleteHeaderError(jqXHR);
                },
                beforeSend: function() {},
                complete: function() {}
            });
        },
        editNewHeader: function(datas) {
            $.ajax({
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: temp.routes.createorupdateheaderdatatypeUrl,
                type: "POST",
                data: JSON.stringify(datas),
                dataType: 'json',
                success: function(data, textStatus, jqXHR) {
                    hx.ajax.editNewHeaderSuccess(data, datas);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    hx.ajax.editNewHeaderError(jqXHR);
                },
                beforeSend: function() {
                    hx.helpfunc.clearInput();
                    hx.helpfunc.showElem(hx.elements.HeaderXmlList);
                    hx.helpfunc.hideElem(hx.elements.tabSaveNameXML);
                    hx.helpfunc.showElem(hx.elements.savdelDHeaderXML);
                    hx.helpfunc.hideElem(hx.elements.saveNewXml);
                    hx.helpfunc.showElem(hx.elements.edit_XML_btn);
                    hx.helpfunc.clearTextArea();
                },
                complete: function() {}
            });
        },
        getAllHeaderSuccess: function(data) {
            hx.helpfunc.clearListTable(); // clear table data
            hx.helpfunc.clearListData(); // clear HeaderXml data
            hx.helpfunc.clearLabel();
            hx.handlears.createListData(data);
            hx.handlears.createListTable(data);
            hx.dataTable.init(hx.data.tableList);
            if ($('#tabdata a:first').attr('class').indexOf('active') != -1) {
                hx.elements.header_xml.removeClass('active');
            }
        },
        getAllHeaderError: function(data) {
            console.log(data);
        },
        deleteHeaderSuccess: function(data, deleteName) {
            if (data) {
                hx.helpfunc.clearLabel(); // option clear label
                hx.helpfunc.clearTextArea(); // option clear TextArea
                hx.handlears.filterList(deleteName);
                hx.handlears.filterDataTable(deleteName);
                hx.dataTable.init(hx.data.tableList);
            } else {
                temp.helpfunc.modalInfo(['XML Header', 'Header XML Not Deleted']);
            }
        },
        deleteHeaderError: function(data) {
            console.log(data);
        },
        editNewHeaderSuccess: function(data, datas) {
            if (data) {
                hx.handlears.changeOrReplaceList(datas);
                hx.handlears.pushOrNotTableList(datas.Name);
                hx.dataTable.init(hx.data.tableList);
                $.each(hx.dataTable.set.object.find('tr'), function(i, val) {
                    var $tr = $(this);
                    if ($tr.find('td').text().trim() == datas.Name) {
                        $tr.addClass('selected');
                    }
                })
                hx.helpfunc.setLabel(datas.Name);
                hx.helpfunc.setTextArea(datas.Data);
                if (temp.DataWorkspace.images.length > 0) hx.handlears.setchangeselectdatatype();
            } else {
                temp.helpfunc.modalInfo(['XML Header', 'Error,try latter']);
            }
            hx.helpfunc.clearInput();
            hx.helpfunc.showElem(hx.elements.HeaderXmlList);
            hx.helpfunc.hideElem(hx.elements.tabSaveNameXML);
            hx.helpfunc.showElem(hx.elements.savdelDHeaderXML);
            hx.helpfunc.hideElem(hx.elements.saveNewXml);
        },
        editNewHeaderError: function(data) {
            console.log(data);
        },
    }

    hx.init();
    hx.action();