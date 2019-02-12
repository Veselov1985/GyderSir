var pm = {};
pm.element = {};

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
    hidePreloader1: function() {
        pm.element.preloader1.attr('hidden', 'hidden');
    },
    showPreloader1: function() {
        pm.element.preloader1.attr('hidden', false);
    },
};

pm.init();
