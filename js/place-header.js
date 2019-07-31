var ph = {};

ph.elements = {};

ph.data = { //1-all,2-first,3-last
    object: {
        Vats: 1,
        Ibans: 1,
        Subtotals: 1,
        InvoiceDates: 1,
        InvoiceNumbers: 1,
        OrderNumbers: 1,
        Totals: 1,
        VatAmounts: 1,
    },
    default: {
        Vats: 1,
        Ibans: 1,
        Subtotals: 3,
        InvoiceDates: 1,
        InvoiceNumbers: 1,
        OrderNumbers: 1,
        Totals: 1,
        UnitPrices: 1,
        VatAmounts: 1,
    },
};

ph.helpfunc = {
    select: {
        hide: function() {
            ph.elements.ph_container.attr('hidden', true);
        },
        show: function() {
          //  ph.elements.ph_container.removeAttr('hidden');  <!--TODO   02/11/2018   now this block only hidden all func not deleted-->
        },
    },
    getSelectTD: function() {
        return rightbar.dataTable.change.object.find('tr.selected').find('td').text();
    },
    setSelectedChoiseFromClickTable: function(that) {
        var text, value;
        text = that.find('td').text();
        if ($.isNumeric(ph.data.object[text])) {
            ph.helpfunc.select.show();
            value = ph.data.object[text];
            ph.helpfunc.optionValSelected(value);
        } else {
            ph.helpfunc.select.hide();
        }
    },
    removeselected: function() {
        ph.elements.ph_select.find('option').each(function() {
            $(this).removeProp('selected');
        });
    },
    addselected: function(option) {
        option.prop('selected', true);
    },
    optionValSelected: function(val) {
        ph.helpfunc.removeselected();
        ph.helpfunc.addselected(ph.elements.ph_select.find('option[value="' + val + '"]'));
    },
};

ph.handlers = {
    reverseToServer: function() {
        var res = [];
        for (var key in ph.data.object) {
            res.push({
                Name: key,
                Data: ph.data.object[key]
            });
        }
        return res;
    },
    reverseToFront: function(dataArr) {
        dataArr.forEach(function(el) {
            ph.data.object[el.Name] = el.Data;
        });
    },
};

ph.init = function() {
    ph.elements.ph_container = $('#ph_container');
    ph.elements.ph_select = $('#ph_select');
    ph.elements.ph_container.on('change', function(e) {
        var textTDSelected = ph.helpfunc.getSelectTD();
        if (textTDSelected != '' && ph.data.object[textTDSelected]) {
            var option = $(this).find('option:selected');
            var valpage = option.val();
            ph.helpfunc.removeselected();
            ph.helpfunc.addselected(option);
            ph.data.object[textTDSelected] = +valpage;
        }
    });
};

ph.init();
