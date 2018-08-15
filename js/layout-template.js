var lt = {};
lt.elements = {};
lt.state = {};

lt.memory = {
    DataPrew: {
        removeListPage: [],
        disactivpage: [],
        datafromserverpage: []
    },
    templaiteForAll: []
};

lt.init = function() {
    lt.elements.layout_content = $('#layout_content');
    lt.elements.off = $('#btn_layout_off');
    lt.elements.on = $('#btn_layout_on');
};

lt.handlers = {
    getActivepage: function() {
        return temp.DataWorkspace.activpage;
    },

    SaveInMemory: function() {
        lt.memory.DataPrew.removeListPage = paint.objects.datafromserver.removelistpage;
        lt.memory.DataPrew.disactivPage = paint.objects.global.disactivpage;
        lt.memory.DataPrew.datafromserverpage = paint.objects.datafromserver.datafromserverpage;
    },

    cloneTemplaite: function() {
        var iterator = temp.DataWorkspace.images.length;
        var arr = [];
        for (var i = 0; i < iterator; i++) {
            arr.push(paint.objects.disactiv);
        }
        lt.memory.templaiteForAll = [].concat(arr);
    },

    setFalseRemoveListPage: function(pages) {
        var arr = [];
        for (var i = 0; i < pages; i++) {
            arr.push(false);
        }
        paint.objects.datafromserver.removelistpage = [].concat(arr);
    },

    setCloneDepedence: function() {
        var pages = temp.DataWorkspace.images.length;
        lt.handlers.setFalseRemoveListPage(pages);
        paint.objects.global.disactivpage = [].concat(lt.memory.templaiteForAll);

    },
    setViewClone: function() {
        paint.objects.datafromserver.arrdata = paint.objects.global.disactivpage[temp.DataWorkspace.activpage];
        paint.objects.disactiv = [];
        paint.handlers.clearsvgcontent();
        temp.DataWorkspace.initwindow();
    },
    setBackMemory: function() {
        paint.objects.datafromserver.removelistpage = lt.memory.DataPrew.removeListPage;
        paint.objects.global.disactivpage = lt.memory.DataPrew.disactivPage;
        paint.objects.datafromserver.datafromserverpage = lt.memory.DataPrew.datafromserverpage;
    },
    setViewBack: function() {
        if (paint.objects.datafromserver.removelistpage[temp.DataWorkspace.activpage] != false) {
            paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage];
        } else {
            paint.objects.datafromserver.arrdata = paint.objects.global.disactivpage[temp.DataWorkspace.activpage];
        }
        paint.objects.disactiv = [];
        paint.handlers.clearsvgcontent();
        temp.DataWorkspace.initwindow();
    }

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
        lt.handlers.setBackMemory();
        lt.handlers.setViewBack();
    });

    lt.elements.on.on('click', function(e) {
        if (lt.view.checkActivebutton(e) || !lt.helpfunc.checkPdfLoad()) return;
        lt.view.setOn();
        lt.handlers.SaveInMemory();
        lt.handlers.cloneTemplaite();
        lt.handlers.setCloneDepedence();
        lt.handlers.setViewClone();
    });
};

lt.inits = function() {
    lt.init();
    lt.events();
};

lt.inits();