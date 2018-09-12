var mp = {};
mp.elements = {};



mp.helpfuncs = {
    checkRoole: function(temp) { // return boolean  true or false;
        return $.isArray(temp.RuleFormTemplate) && temp.RuleFormTemplate[0] != undefined;
    },
    checkPage: function(temp, pagedoc) {
        var res = pagedoc - temp;
        if (res > 0) { //roole  document page > template page
            return;
        } else if (res < 0 && temp.Pages.length != 1) { // roole    document page < template
            return;
        } else {
            return; // init template how it now
        }
    },




};

mp.handlers = {

};

mp.actions = {

};


mp.init = function() {};



mp.init();