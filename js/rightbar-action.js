var rightbaraction = {};
rightbaraction.Ajax = {
    sendDeleteDataTypeProccess: function(data) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendDeleteDataTypeProccessUrl,
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                rightbaraction.handlers.DeleteDataTypesuccess(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                rightbaraction.handlers.DeleteDataTypeerror(jqXHR);
            },
            beforeSend: function() {
                load.handlers.showLoader(load.elements.load_btn_del_datatype, load.elements.boss_btn_del_datatype);
            },
            complete: function() {
                load.handlers.hideLoader(load.elements.load_btn_del_datatype, load.elements.boss_btn_del_datatype);
            }
        });
    },
    sendSaveDataTypeProccess: function(data) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendSaveDataTypeProccessUrl,
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                rightbaraction.handlers.SaveDataTypesuccess(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                rightbaraction.handlers.SaveDataTypeerror(jqXHR);
            },
            beforeSend: function() {
                load.handlers.showLoader(load.elements.load_btn_add_datatype, load.elements.boss_btn_add_datatype);
            },

            complete: function() {
                load.handlers.hideLoader(load.elements.load_btn_add_datatype, load.elements.boss_btn_add_datatype);
            }
        });

    },
    sendAddAmountProccess: function(data, e) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendAddAmountProccessUrl,
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                rightbaraction.handlers.sendAddAmountsuccess(data, e);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                rightbaraction.handlers.sendAddAmounterror(jqXHR);
            },
            beforeSend: function() {},
            complete: function() {}
        });
    },
    sendAddDateProccess: function(data, e) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendAddDateProccessUrl,
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                rightbaraction.handlers.sendAddDatesuccess(data, e);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                rightbaraction.handlers.sendAddDateerror(jqXHR);
            },
            beforeSend: function() {},
            complete: function() {}
        });
    },
    sendAddRegexProccess: function(data, e) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendAddRegexProccessUrl,
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                rightbaraction.handlers.sendAddRegexsuccess(data, e);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                rightbaraction.handlers.sendAddRegexerror(jqXHR);
            },
            beforeSend: function() {},
            complete: function() {}
        });
    },
    sendAddAlternateProccess: function(data, e) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendAddAlternateProccessUrl,
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                rightbaraction.handlers.sendAddAlternatesuccess(data, e);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                rightbaraction.handlers.sendAddAlternateerror(jqXHR);
            },
            beforeSend: function() {},

            complete: function() {}
        });
    },

    sendDeletePref: function(url, datas, done, error) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: url,
            type: "POST",
            data: JSON.stringify(datas),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                done(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                error(jqXHR);
            },
            beforeSend: function() {},
            complete: function() {}
        });
    },
};

rightbaraction.handlers = {
    DeleteDataTypesuccess: function(data) {
        var name;
        rightbar.data.global.dataType = rightbar.data.global.dataType.filter(function(value, j) {
            if (value.Pk == data.Pk) {
                name = value.DataType;
                return false;
            } else {
                return true;
            }
        });
        rightbar.zag.dataTable = rightbar.zag.dataTable.filter(function(val) {
            return val[0] != name ? true : false;
        });
        rightbar.dataTable.clean(rightbar.dataTable.set.object);
        rightbar.dataTable.clean(rightbar.dataTable.change.object);
        rightbar.dataTable.init(rightbar.dataTable.set, rightbar.zag.dataTable);
        rightbar.dataTable.init(rightbar.dataTable.change, rightbar.zag.dataTable);
    },
    DeleteDataTypeerror: function(data) {
        alert(data);
    },
    SaveDataTypesuccess: function(data) {
        var state = false;
        rightbar.data.global.dataType.forEach(function(val, i) {
            if (data.Pk == val.Pk) {
                state = true;
                rightbar.data.global.dataType[i] = { DataType: val.DataType, Pk: val.Pk };
                for (var key in data) {
                    if (key != 'Pk' && key != 'Name' && key != 'IsText') {
                        if (data[key] != null) rightbar.data.global.dataType[i][key] = data[key];

                    } else if (key == 'IsText' && data[key] == true) {
                        rightbar.data.global.dataType[i][key] = true;
                    }
                }
            }
        });
        if (!state) {
            rightbar.data.global.dataType.push(rightbaraction.handlers.createobjinDataType(data));
            rightbar.zag.dataTable.push([data.Name]);
        }
        rightbar.dataTable.clean(rightbar.dataTable.set.object);
        rightbar.dataTable.clean(rightbar.dataTable.change.object);
        rightbar.dataTable.init(rightbar.dataTable.set, rightbar.zag.dataTable);
        rightbar.dataTable.init(rightbar.dataTable.change, rightbar.zag.dataTable);
    },
    createobjinDataType: function(obj) {
        var newobj = { DataType: '', Pk: '' };
        newobj.DataType = obj.Name;
        newobj.Pk = obj.Pk;
        for (var key in obj) {
            if (obj[key] != null && key != 'Name' && key != 'Pk' && obj[key] != false) {
                newobj[key] = obj[key];
            } else if (obj[key] != null && key != 'Name' && key != 'Pk' && obj[key] == true) {
                newobj[key] = obj[key];
            }
        }
        return newobj;
    },
    SaveDataTypeerror: function(data) {
        alert(data);
    },
    sendAddAmountsuccess: function(data, e) {
        rightbaraction.handlers.addoptionInselect(e, data);
        rightbar.data.global.amount.push(data);
    },
    sendAddAmounterror: function(data) {
        alert(data);
    },
    sendAddDatesuccess: function(data, e) {
        rightbaraction.handlers.addoptionInselect(e, data);
        rightbar.data.global.date.push(data);
    },
    sendAddDateerror: function(data) {
        alert(data);
    },
    sendAddRegexsuccess: function(data, e) {
        rightbaraction.handlers.addoptionInselect(e, data);
        rightbar.data.global.regex.push(data);
    },
    sendAddRegexerror: function(data) {
        alert(data);
    },
    sendAddAlternatesuccess: function(data, e) {
        rightbaraction.handlers.addoptionInselect(e, data);
        rightbar.data.global.alternate.push(data);
    },
    sendAddAlternateerror: function(data) {
        alert(data);
    },
    addoptionInselect: function(e, data) {
        var $e_curr = $(e.currentTarget);
        var bodyselect = $e_curr.parent().prev().prev();
        bodyselect.find('option:selected').attr("selected", false);
        bodyselect.append('<option value="' + data.Pk + '" selected>' + data.Content + '<option>');
        bodyselect.find('option:last').remove();
        $e_curr.parent().prev().val('');
        rightbar.handlers.togleshowelem(bodyselect);
        rightbar.handlers.togleshowelem($e_curr.parent().prev());
    },
    DeleteOptionPref: function(selectEl, Pk) {
        selectEl.find('option').each(function(i, val) {
            if (Pk == val.value) $(this).remove();
        })
    },
    clearListMemory: function(list, Pk) {
        list = list.filter(function(val) {
            return val.Pk != Pk;
        });
        return list;
    },
    initselectedFirst: function(select) {
        select.find('option:first').attr('selected', true);
    },
    sendDeleteAmountsuccess: function(data) {
        rightbaraction.handlers.DeleteOptionPref(rightbar.elements.selAmount, data);
        rightbar.data.global.amount = rightbaraction.handlers.clearListMemory(rightbar.data.global.amount, data);
        rightbaraction.handlers.initselectedFirst(rightbar.elements.selAmount);
    },
    sendDeleteAmounterror: function(error) { console.log(error); },
    sendDeleteDatesuccess: function(data) {
        rightbaraction.handlers.DeleteOptionPref(rightbar.elements.selDate, data);
        rightbar.data.global.date = rightbaraction.handlers.clearListMemory(rightbar.data.global.date, data);
        rightbaraction.handlers.initselectedFirst(rightbar.elements.selDate);
    },
    sendDeleteDateerror: function(error) { console.log(error); },
    sendDeleteRegexsuccess: function(data) {
        rightbaraction.handlers.DeleteOptionPref(rightbar.elements.selReg, data);
        rightbar.data.global.regex = rightbaraction.handlers.clearListMemory(rightbar.data.global.regex, data);
        redit.data = [].concat(rightbar.data.global.regex);
        rightbaraction.handlers.initselectedFirst(rightbar.elements.selReg);
    },
    sendDeleteRegexerror: function(error) { console.log(error); },
    sendDeleteAlternatesuccess: function(data) {
        rightbaraction.handlers.DeleteOptionPref(rightbar.elements.selalternate, data);
        rightbar.data.global.alternate = rightbaraction.handlers.clearListMemory(rightbar.data.global.alternate, data);
        rightbaraction.handlers.initselectedFirst(rightbar.elements.selalternate);
    },
    sendDeleteAlternateerror: function(error) { console.log(error); },
};
