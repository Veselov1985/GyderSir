var load = {};
load.elements = {
    target: {}
};

load.handlers = {
    showLoader: function(showloadelem, hidebosselem) {
        showloadelem.css('display', 'inline-block').attr('hidden', false);
        if (hidebosselem) hidebosselem.attr('hidden', true);
    },
    hideLoader: function(hideloadelem, showbosselem) {
        hideloadelem.css('display', 'none').attr('hidden', true);
        if (showbosselem) showbosselem.attr('hidden', false);
    },
    togleLoader: function() {
        load.elements.loaderworkSpase.attr('hidden') ? load.elements.loaderworkSpase.attr('hidden', false) : load.elements.loaderworkSpase.attr('hidden', true);
    }
};

load.init = function() {
    //loaders
    load.elements.load_btn_del_temp = $('.load_btn_del_temp');
    load.elements.load_btn_load_temp = $('.load_btn_load_temp');
    load.elements.load_btn_save_temp = $('.load_btn_save_temp');
    load.elements.load_btn_save_result = $('.load_btn_save_result');
    load.elements.load_btn_add_datatype = $('.load_btn_add_datatype');
    load.elements.load_btn_del_datatype = $('.load_btn_del_datatype');
    load.elements.load_btn_test = $('.load_btn_test');

    load.elements.btn_save_datatype = $('.load_btn_save_datatype');

    //loaderworkSpase
    load.elements.loaderworkSpase = $('.loaderworkSpase');


    //bosselem
    load.elements.boss_btn_del = $('.boss_btn_del');
    load.elements.boss_btn_load_temp = $('.boss_btn_load_temp');
    load.elements.boss_btn_save_temp = $('.boss_btn_save_temp');
    load.elements.boss_btn_save_result = $('.boss_btn_save_result');
    load.elements.boss_btn_add_datatype = $('.boss_btn_add_datatype');
    load.elements.boss_btn_del_datatype = $('.boss_btn_del_datatype');
    load.elements.boss_btn_test = $('.boss_btn_test');

    load.elements.boss_btn_save_datatype = $('.btn_save_datatype');

};
load.init();
//loader button dell  block action

load.handlers.showLoader(load.elements.load_btn_del_temp, load.elements.boss_btn_del);
load.handlers.hideLoader(load.elements.load_btn_del_temp, load.elements.boss_btn_del);

//loader button load pdf
load.handlers.showLoader(load.elements.load_btn_load_temp, load.elements.boss_btn_load_temp);
load.handlers.hideLoader(load.elements.load_btn_load_temp, load.elements.boss_btn_load_temp);

//loader button savetemplaite  block action
load.handlers.showLoader(load.elements.load_btn_save_temp, load.elements.boss_btn_save_temp);
load.handlers.hideLoader(load.elements.load_btn_save_temp, load.elements.boss_btn_save_temp);

//loader button result block action
load.handlers.showLoader(load.elements.load_btn_save_result, load.elements.boss_btn_save_result);
load.handlers.hideLoader(load.elements.load_btn_save_result, load.elements.boss_btn_save_result);

//loader button add block  leftbar->datatype
load.handlers.showLoader(load.elements.load_btn_add_datatype, load.elements.boss_btn_add_datatype);
load.handlers.hideLoader(load.elements.load_btn_add_datatype, load.elements.boss_btn_add_datatype);

//loader button dell datatype leftbar->datatype
load.handlers.showLoader(load.elements.load_btn_del_datatype, load.elements.boss_btn_del_datatype);
load.handlers.hideLoader(load.elements.load_btn_del_datatype, load.elements.boss_btn_del_datatype);


// loader button save new datatype rightbar -> datatype

load.handlers.showLoader(load.elements.load_btn_add_datatype, load.elements.boss_btn_add_datatype);
load.handlers.hideLoader(load.elements.load_btn_add_datatype, load.elements.boss_btn_add_datatype);

//loader button Test block => control
load.handlers.showLoader(load.elements.btn_save_datatype, load.elements.boss_btn_save_datatype);
load.handlers.hideLoader(load.elements.btn_save_datatype, load.elements.boss_btn_save_datatype);