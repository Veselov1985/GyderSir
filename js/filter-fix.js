filter = {};

filter.handlers = {
    checkFilter: function() {
        if (temp.Data.leftTempList.filter.length != 0) {
            return true;
        } else {
            return false;
        }
    },
    addData: function(data) {
        if (filter.handlers.checkFilter()) {
            temp.Data.leftTempList.filter.push(data);
        }
    },
    deletefilter: function(data) {
        if (filter.handlers.checkFilter()) {
            var res = temp.Data.leftTempList.list.filter(function(val) {
                return val.Pk == data.Pk;
            })[0];
            temp.Data.leftTempList.filter = temp.Data.leftTempList.filter.filter(function(val, i) {
                return val[0] != res.Name;
            });
        }
    },
    filterClear: function() {
        if (filter.handlers.checkFilter()) {
            temp.Data.leftTempList.data = temp.helpfunc.arrayClone(temp.Data.leftTempList.filter);
            temp.Data.leftTempList.filter = [];
        }
    },

    notActivetoggle: function() {
        temp.Data.leftTempList.filter = temp.Data.leftTempList.filter.map(function(val) {
            if (val[1] == temp.img.activ) {
                return [val[0], temp.img.off];
            } else {
                return val;
            }
        });
    },

    toggleLight: function() {
        if (temp.elementControl.object.btn_filter.hasClass('filterActive')) {
            temp.elementControl.object.btn_filter.removeClass('filterActive');
            temp.elementControl.object.btn_filter.addClass('filterNotActive');
        } else {
            temp.elementControl.object.btn_filter.addClass('filterActive');
            temp.elementControl.object.btn_filter.removeClass('filterNotActive');
        }
    },

    disabledFilter: function() {
        temp.elementControl.object.btn_filter.attr('disabled', true);
    },

    enabled: function() {
        temp.elementControl.object.btn_filter.attr('disabled', false);
        temp.elementControl.object.btn_filter.removeClass('filterActive');
        temp.elementControl.object.btn_filter.addClass('filterNotActive');
    },
};