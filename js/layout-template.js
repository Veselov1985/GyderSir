var lt = {};
lt.elements = {};
lt.state = {};

lt.memory = {
    DataPrew: {
        ListTEmplatePage: [],
        ListPageReview: [],
    }
};


lt.init = function() {
    lt.elements.layout_content = $('#layout_content');
    lt.elements.off = $('#btn_layout_off');
    lt.elements.on = $('#btn_layout_on');

};

lt.handlers = {
    setTemplateForOther: function() {

    },
    getActivepage: function() {

    },

};

lt.helpfunc = {
    checkPdfLoad: function() {
        return temp.DataWorkspace.images.length > 0; //  load => true , not load => false
    }
};

lt.view = {
    setOff: function() {
        lt.view.destroySetButton();
        var parent$ = lt.elements.off.parent();
        parent$.addClass('focus active');
    },

    setOn: function() {
        lt.view.destroySetButton();
        var parent$ = lt.elements.on.parent();
        parent$.addClass('focus active');
    },

    destroySetButton: function() {
        var elem$ = lt.elements.layout_content.find('.active');
        elem$.removeClass('active');
        elem$.removeClass('focus');
    },
    checkActivebutton: function(e) {
        var elem = $(e.target);
        return elem.parent().hasClass('active focus'); // if buuton active = return true  disactive => false
    },

};


lt.events = function() {

    lt.elements.off.on('click', function(e) {
        if (lt.view.checkActivebutton(e) || !lt.helpfunc.checkPdfLoad()) return;
        lt.view.setOff();


    });

    lt.elements.on.on('click', function(e) {
        if (lt.view.checkActivebutton(e) || !lt.helpfunc.checkPdfLoad()) return;
        lt.view.setOn();
    });



};


lt.inits = function() {
    lt.init();
    lt.events();
};



lt.inits();