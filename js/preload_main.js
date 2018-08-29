var pm = {};
pm.element = {};
pm.data = {
    state: 0, // first download data   => need 7
};

pm.init = function() {
    pm.element.preloader = $('#preloader');
    pm.element.preloader1 = $('#preloader1');
};

pm.handlers = {
    hidePreloader: function() {
        pm.element.preloader.attr('hidden', 'hidden');
    },
    showPreloader: function() {
        pm.element.preloader.attr('hidden', false);
    },
    check: function() {
        pm.data.state++;
        pm.data.state == 7 ? pm.handlers.hidePreloader() : null;
    },
    hidePreloader1: function() {
        pm.element.preloader1.attr('hidden', 'hidden');
    },
    showPreloader1: function() {
        pm.element.preloader1.attr('hidden', false);
    },
};

pm.init();