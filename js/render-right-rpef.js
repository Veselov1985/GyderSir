var rightpref = {};

rightpref.data = {
    zeroGuid: '00000000-0000-0000-0000-000000000000',
};

rightpref.Ajax = {
    sendRenderDataTypeProccess: function(data) {
        return new Promise((resolve, reject) => {
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
                    resolve(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    rightpref.handlers.DataTypeerror(errorThrown);
                    reject([jqXHR, textStatus, errorThrown]);
                },
                beforeSend: function() {},
                complete: function() {
                }
            });
        });
    },
    sendRenderAmountProccess: function() {
        return new Promise((resolve, reject)=> {
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
                    resolve(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    rightpref.handlers.Amounterror(jqXHR);
                    reject([jqXHR, textStatus, errorThrown]);
                },
                beforeSend: function() {},
                complete: function() {
                }
            });
        });
    },
    sendRenderDataProccess: function() {
        return new Promise((resolve, reject) =>{
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: temp.routes.sendRenderDataProccessUrl,
                type: "POST",
                dataType: 'json',
                success: function(data) {
                    rightpref.handlers.Datasuccess(data);
                    resolve(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    rightpref.handlers.Dataerror(errorThrown);
                    reject([jqXHR, textStatus, errorThrown])
                },
                beforeSend: function() {},
                complete: function() {}
            });
        })


    },
    sendRenderRegexProccess: function() {
        return new Promise((resolve, reject) =>{
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: temp.routes.sendRenderRegexProccessUrl,
                type: "POST",
                dataType: 'json',
                success: function(data) {
                    rightpref.handlers.Regexsuccess(data);
                    resolve(data)
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    rightpref.handlers.Regexerror(errorThrown);
                    reject([jqXHR, textStatus, errorThrown]);
                },
                beforeSend: function() {},
                complete: function() {
                }
            });
        });

    },
    sendRenderAlternateProccess: function() {
        return new Promise((resolve, reject)=>{
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: temp.routes.sendRenderAlternateProccessUrl,
                type: "POST",

                dataType: 'json',
                success: function(data) {
                    rightpref.handlers.Alternatesuccess(data);
                    resolve(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    rightpref.handlers.Alternateerror(errorThrown);
                    reject([jqXHR, textStatus, errorThrown]);
                },
                beforeSend: function() {},
                complete: function() {}
            });
        });

    },
};

rightpref.handlers = {
    getUnique: (arr, comp) => {
        const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    },
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
    DataTypeerror: function(data) {console.log(data)},
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
       const list = rightpref.handlers.getUnique(data.Data,'Content');
        list.forEach(function(val) {
            rightbar.data.global.regex.push(val);
        });
        redit.data = [].concat(rightbar.data.global.regex);
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
        selectId.empty();
        var html = '';
        list.forEach(function(val) {
         html += rightpref.handlers.addoptioninselect(val);
        });
        rightpref.handlers.append(selectId,html);
        selectId.find(':first-child').attr('selected', 'selected');
    },
    addoptioninselect: function( option) {
        return '<option value="' + option.Pk + '">' + option.Content + '</option>';
    },
    append:(select, html) => select.append(html),
};
