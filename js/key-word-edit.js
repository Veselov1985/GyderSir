var kw = {};
kw.data = [
    'ExcludingTaxesAmounts',
    'InvoiceDates',
    'ItemNumbers',
    'InvoiceNumbers',
    'OrderNumbers',
    'Quantities',
    'TotalBedrags',
    'UnitPrices',
    'VatAmounts'
];

kw.state = false;
kw.elements = {};
kw.initEl = function() {
    kw.elements.absolutePos = { object: $('#absolutePos'), id: '#absolutePos' };
    kw.elements.kwContent = { object: $('#kwContent'), id: '#kwContent' };
    kw.elements.btn_edit_kw = { object: $('#btn_edit_kw'), id: '#btn_edit_kw' };
    kw.elements.textarea_label = { object: $('#textarea_label'), id: '#textarea_label' };
    kw.elements.textarea_kw = { object: $('#textarea_kw'), id: '#textarea_kw' };

    // KW modal
    kw.elements.applymodal_KW = { object: $('#applymodal_KW'), id: '#applymodal_KW' };
    kw.elements.apply_save_KW = { object: $('#apply_save_KW'), id: '#apply_save_KW' };
    kw.elements.apply_no_KW = { object: $('#apply_no_KW'), id: '#apply_no_KW' };
};

kw.handlers = {
    hideWrapfieldContentToggle: function() {
        var state = rightbar.elements.wrapfieldContent.attr('hidden');
        (state == 'hidden') ? state = false: state = true;
        rightbar.elements.wrapfieldContent.attr('hidden', state);
    },
    hideabsolutePosToggle: function() {
        var state = kw.elements.absolutePos.object.attr('hidden');
        (state == 'hidden') ? state = false: state = true;
        kw.elements.absolutePos.object.attr('hidden', true); // always hidden block absolut position: 
    },
    hidesaveDataType: function() {
        var state = rightbar.elements.saveDataType.attr('hidden');
        (state == 'hidden') ? state = false: state = true;
        rightbar.elements.saveDataType.attr('hidden', state);
    },

    hidekwContentToggle: function() {
        var state = kw.elements.kwContent.object.attr('hidden');
        (state == 'hidden') ? state = false: state = true;
        kw.elements.kwContent.object.attr('hidden', state);
    },
    findKeyWord: function(data) {
        return data.find('td').text();
    },
    compareNeedKw: function(text) {
        var state = false;
        kw.data.forEach(function(val, i) {
            if (text == val) state = true;
        });
        return state;
    },
    textarea: {
        clearVal: function() {
            kw.elements.textarea_kw.object.val('');
        },
        setVal: function(text) {
            kw.elements.textarea_kw.object.val(text);
        },
        getVal: function() {
            return kw.elements.textarea_kw.object.val();
        },
    },
    label: {
        clearLabel: function() {
            kw.elements.textarea_label.object.text('');
        },
        setText: function(text) {
            kw.elements.textarea_label.object.text(text);
        },
        getLabel: function() {
            return kw.elements.textarea_label.object.text();
        }
    },
    KwClear: function() {
        kw.handlers.textarea.clearVal();
        kw.handlers.label.clearLabel();
    },
    KwToggle: function() {
        kw.handlers.hideabsolutePosToggle();
        kw.handlers.hideWrapfieldContentToggle();
        kw.handlers.hidesaveDataType();
        kw.handlers.hidekwContentToggle();
    },
    changeTabSetNew: function(table, that) {
        var KW = that.find('td').text().trim();
        if (kw.handlers.compareNeedKw(kw.handlers.findKeyWord(that)) && !kw.state) { //KW=true  state=of
            kw.handlers.KwClear();
            kw.handlers.KwToggle();
            kw.state = !kw.state;
            kw.ajax.getKW({ Name: kw.handlers.delEndKW(KW), Data: '' });
        } else if (!kw.handlers.compareNeedKw(kw.handlers.findKeyWord(that)) && kw.state) { //KW =false  state=on
            kw.handlers.KwClear();
            kw.handlers.KwToggle();
            kw.state = !kw.state;
        } else if (kw.handlers.compareNeedKw(kw.handlers.findKeyWord(that)) && kw.state) { //KW=true satet=on
            kw.handlers.KwClear();
            kw.ajax.getKW({ Name: kw.handlers.delEndKW(KW), Data: '' });
        }
    },
    deleteRepeatKw: function(arr){return arr.filter(function (val,i,arr) { return arr.indexOf(val) == i;  })
    },
    changeTab: function(selected) {
        if (selected.length == 1 && !kw.state && kw.handlers.compareNeedKw(kw.handlers.findKeyWord(selected))) {
            var KW = selected.find('td').text().trim();
            kw.handlers.KwClear();
            kw.handlers.KwToggle();
            kw.state = !kw.state;
            kw.ajax.getKW({ Name: kw.handlers.delEndKW(KW), Data: null });
        }
    },
    setTab: function() {
        if (kw.state) { // edit KW on 
            kw.handlers.KwToggle();
            kw.state = !kw.state;
        }
    },
    splitData: function(data) {
        var arr = data.split(/\n/);   // TODO  delete 04/11/2018  var arr = data.split(/\n|\;|\,/);
        arr = arr.filter(function(val) {
            return val.split() != "";
        });
        return arr;
    },
    delEndKW: function(str) {
        return (str.trim() != 'Quantities') ? str.split('').splice(0, str.length - 1).join('') : 'Quantity';
    },
    kwfixD3JS: function(type) {
        if (!kw.handlers.compareNeedKw(type) && kw.state && rightbar.data.global.currenttab == 1) {
            kw.handlers.KwClear();
            kw.handlers.KwToggle();
            kw.state = !kw.state;
        } else if (kw.handlers.compareNeedKw(type) && !kw.state && rightbar.data.global.currenttab == 1) {
            kw.handlers.KwClear();
            kw.handlers.KwToggle();
            kw.state = !kw.state;
            kw.ajax.getKW({ Name: kw.handlers.delEndKW(type), Data: '' });
        }
    },
};

kw.ajax = {
    getKW: function(data) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.getKWProccessUrl,
            type: "POST",

            data: JSON.stringify(data),
            dataType: 'json',
            success: function(datas, textStatus, jqXHR) {
                kw.ajax.getKWDone(datas);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            },
            beforeSend: function() {},
            complete: function() {}
        });
    },
    editKW: function(data) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.routes.editKWProccessUrl, // need add url  to edit KW =>in app.js
            type: "POST",

            data: JSON.stringify(data),
            dataType: 'json',
            success: function(datas, textStatus, jqXHR) {
                kw.ajax.editKWDone(datas,data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                kw.elements.applymodal_KW.object.modal('hide');
                snack.error('Key word Info: Error server');
            },
            beforeSend: function() {},
            complete: function() {},
        });
    },
    getKWDone: function(data) {
        kw.handlers.label.setText(data.Name + ':'); // label
        kw.handlers.textarea.setVal(kw.ajax.setNewLineTextArea(data.Data)); // value textarea
    },
    editKWDone: function(data,datas) {
        if (data == true) {
            kw.handlers.textarea.setVal(kw.ajax.setNewLineTextArea(datas.Data));
            kw.elements.applymodal_KW.object.modal('hide');
            snack.alert('Key Words Edited');
        } else {
            kw.elements.applymodal_KW.object.modal('hide');
            snack.error('Key Words Edit Error');
        }
    },
    setNewLineTextArea: function(text) {                 // TODO  split enter Data KEYWORD
        if (text == null) return '';
        return text.split('^').filter(function(inst) {return inst.trim() !='';}).map(function(val) {
            return val.trim().replace(/\n/g, '');
         }).join('\n');     // .join(',\n'); => delete <,> join
    }
};

kw.initEv = function() {
    kw.elements.btn_edit_kw.object.on('click', function(e) {
        kw.elements.applymodal_KW.object.modal('show');
    });
    kw.elements.apply_save_KW.object.on('click', function(e) {
        var labelKw = kw.handlers.delEndKW(kw.handlers.label.getLabel());
        var data = kw.handlers.splitData( kw.handlers.textarea.getVal());
        // TODO delete repeat in data KW not use register 04/11/2018
        data = kw.handlers.deleteRepeatKw(data).join('^');
        kw.ajax.editKW({ Name: labelKw, Data: data }); // edit KW
    });
    kw.elements.apply_no_KW.object.on('click', function(e) {
        kw.elements.applymodal_KW.object.modal('hide');
    });
};

kw.initEl();
kw.initEv();
