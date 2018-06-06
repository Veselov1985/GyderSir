var kw = {};
kw.data = [
    'ExcludingTaxesAmounts',
    'InvoiceDates',
    'ItemNumbers',
    'OrderNumbers',
    'QuantitysLists',
    'TotalBedrags',
    'UnitPrices',
    'VatAmounts'
];

/*
InvoiceDate
OrderNumber
TotalBedrag


*/

kw.state = false;
kw.elements = {};
kw.initEl = function() {
    kw.elements.absolutePos = { object: $('#absolutePos'), id: '#absolutePos' };
    kw.elements.kwContent = { object: $('#kwContent'), id: '#kwContent' };
    kw.elements.btn_edit_kw = { object: $('#btn_edit_kw'), id: '#btn_edit_kw' };
    kw.elements.textarea_label = { object: $('#textarea_label'), id: '#textarea_label' };
    kw.elements.textarea_kw = { object: $('#textarea_kw'), id: '#textarea_kw' };
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
        kw.elements.absolutePos.object.attr('hidden', state);
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
    changeTabSetNew: function(table, that) {
        var KW = that.find('td').text().trim();

        if (kw.handlers.compareNeedKw(kw.handlers.findKeyWord(that)) && !kw.state) { //KW=true  state=of

            kw.handlers.textarea.clearVal();
            kw.handlers.label.clearLabel();
            kw.handlers.hideabsolutePosToggle();
            kw.handlers.hideWrapfieldContentToggle();
            kw.handlers.hidesaveDataType();
            kw.handlers.hidekwContentToggle();
            kw.state = !kw.state;

            kw.ajax.getKW({ Name: kw.handlers.delEndKW(KW), Data: '' });



        } else if (!kw.handlers.compareNeedKw(kw.handlers.findKeyWord(that)) && kw.state) { //KW =false  state=on
            kw.handlers.textarea.clearVal();
            kw.handlers.label.clearLabel();
            kw.handlers.hideabsolutePosToggle();
            kw.handlers.hideWrapfieldContentToggle();
            kw.handlers.hidesaveDataType();
            kw.handlers.hidekwContentToggle();
            kw.state = !kw.state;

        } else if (kw.handlers.compareNeedKw(kw.handlers.findKeyWord(that)) && kw.state) { //KW=true satet=on
            kw.handlers.textarea.clearVal();
            kw.handlers.label.clearLabel();

            kw.ajax.getKW({ Name: kw.handlers.delEndKW(KW), Data: '' });

        }

    },

    changeTab: function(selected) {
        if (selected.length == 1 && !kw.state && kw.handlers.compareNeedKw(kw.handlers.findKeyWord(selected))) {
            var KW = selected.find('td').text().trim();
            kw.handlers.textarea.clearVal();
            kw.handlers.label.clearLabel();
            kw.handlers.hideabsolutePosToggle();
            kw.handlers.hideWrapfieldContentToggle();
            kw.handlers.hidesaveDataType();
            kw.handlers.hidekwContentToggle(); // how KW
            kw.state = !kw.state;

            kw.ajax.getKW({ Name: kw.handlers.delEndKW(KW), Data: null });

        }
    },

    setTab: function() {
        if (kw.state) { // edit KW on 
            kw.handlers.hideabsolutePosToggle();
            kw.handlers.hideWrapfieldContentToggle();
            kw.handlers.hidesaveDataType();
            kw.handlers.hidekwContentToggle(); // how KW
            kw.state = !kw.state;
        }
    },
    splitData: function(data) {
        var arr = data.split(/\n|\;|\,|\s/);
        arr = arr.filter(function(val, i) {
            return val != "";
        });
        return arr;
    },
    delEndKW: function(str) {
        return str.split('').splice(0, str.length - 1).join('');
    }

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
                kw.ajax.editKWDone(datas);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            },
            beforeSend: function() {},
            complete: function() {},
        });

    },
    getKWDone: function(data) {
        console.log(data);
        kw.handlers.label.setText(data.Name + ':'); // label
        kw.handlers.textarea.setVal(kw.ajax.setNewLineTextArea(data.Data)); // value textarea
    },
    editKWDone: function(data) {


    },
    setNewLineTextArea: function(text) {
        return text.split(',').map(function(val) {
            return val.trim().replace(/\n/, '');
        }).join(',\n');
    },


};

kw.initEv = function() {
    kw.elements.btn_edit_kw.object.on('click', function(e) {
        e.preventDefault();
        var labelKw = kw.handlers.delEndKW(kw.handlers.label.getLabel());
        var data = kw.handlers.splitData(kw.handlers.textarea.getVal()).join(',');
        console.log(data);

        // add Ajax edit KW   kw.ajax.editKW({Name:labelKw,Data:data});

    });

};





kw.initEl();
kw.initEv();


/*
InvoiceDate
OrderNumber
TotalBedrag


*/