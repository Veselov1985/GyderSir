var rightpref = {};

rightpref.data = {
    zeroGuid: '00000000-0000-0000-0000-000000000000',
};

rightpref.Ajax = {
    sendRenderDataTypeProccess: function(data) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendRenderDataTypeProccessUrl,
            type: "POST",

            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                rightpref.handlers.DataTypesuccess(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                rightpref.handlers.DataTypeerror(errorThrown);
            },
            beforeSend: function() {},
            complete: function() {
                pm.handlers.check(); //preload
            }
        });
    },
    sendRenderAmountProccess: function() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendRenderAmountProccessUrl,
            type: "POST",
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                rightpref.handlers.Amountsuccess(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                rightpref.handlers.Amounterror(jqXHR);
            },
            beforeSend: function() {},
            complete: function() {
                pm.handlers.check(); // preload
            }
        });

    },
    sendRenderDataProccess: function() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendRenderDataProccessUrl,
            type: "POST",
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                rightpref.handlers.Datasuccess(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                rightpref.handlers.Dataerror(errorThrown);
            },
            beforeSend: function() {},
            complete: function() {
                pm.handlers.check();
            }
        });

    },
    sendRenderRegexProccess: function() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendRenderRegexProccessUrl,
            type: "POST",
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                rightpref.handlers.Regexsuccess(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                rightpref.handlers.Regexerror(errorThrown);
            },
            beforeSend: function() {},
            complete: function() {
                pm.handlers.check(); // preload--
            }
        });

    },
    sendRenderAlternateProccess: function() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.sendRenderAlternateProccessUrl,
            type: "POST",

            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                rightpref.handlers.Alternatesuccess(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                rightpref.handlers.Alternateerror(errorThrown);
            },
            beforeSend: function() {},
            complete: function() {
                pm.handlers.check(); // preload--
            }
        });
    },
};

rightpref.handlers = {
    DataTypesuccess: function(data) {

        data.Data.forEach(function(val) {
            var findfield, fieldPk, state;
            for (var key in val) {
                if (key != 'Name' && key != 'Pk' && key != 'IsText') {
                    if (val[key] != null) {
                        findfield = key;
                        fieldPk = val[key];
                        state = true;
                    }
                } else if (key == "IsText" && val[key] == true) {
                    findfield = "IsText";
                    fieldPk = true;
                }
            }
            var obj = { DataType: val.Name, Pk: val.Pk };
            obj[findfield] = fieldPk;
            rightbar.data.global.dataType.push(obj);
            rightbar.zag.dataTable.push([val.Name]);
        });
        rightbar.dataTable.clean(rightbar.dataTable.set.object);
        rightbar.dataTable.clean(rightbar.dataTable.change.object);
        rightbar.dataTable.init(rightbar.dataTable.set, rightbar.zag.dataTable);
        rightbar.dataTable.init(rightbar.dataTable.change, rightbar.zag.dataTable);

    },
    DataTypeerror: function(data) {},
    Amountsuccess: function(data) {
        data.Data.forEach(function(val) {
            rightbar.data.global.amount.push(val);
        });
        rightpref.handlers.renderfieldoptions(rightbar.data.global.amount, rightbar.elements.selAmount);
    },
    Amounterror: function(data) {
        console.log('hi' + data);
    },
    Datasuccess: function(data) {
        data.Data.forEach(function(val) {
            rightbar.data.global.date.push(val);
        });
        rightpref.handlers.renderfieldoptions(rightbar.data.global.date, rightbar.elements.selDate);
    },
    Dataerror: function(data) {
        console.log(data);
    },
    Regexsuccess: function(data) {
        data.Data.forEach(function(val) {
            rightbar.data.global.regex.push(val);
        });
        rightpref.handlers.renderfieldoptions(rightbar.data.global.regex, rightbar.elements.selReg);
    },
    Regexerror: function(data) {
        console.log(data);
    },
    Alternatesuccess: function(data) {
        data.Data.forEach(function(val) {
            rightbar.data.global.alternate.push(val);
        });
        rightpref.handlers.renderfieldoptions(rightbar.data.global.alternate, rightbar.elements.selalternate);
    },
    Alternateerror: function(data) {
        console.log(data);
    },
    renderfieldoptions: function(list, selectId) {
        list.forEach(function(val) {
            rightpref.handlers.addoptioninselect(selectId, val);
        });
        selectId.find(':first-child').attr('selected', 'selected');
    },
    addoptioninselect: function(select, option) {
        var html = $('<option value="' + option.Pk + '">' + option.Content + '</option>');
        select.append(html);
    },
};