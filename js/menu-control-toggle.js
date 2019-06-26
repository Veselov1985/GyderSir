let mt = {};


mt.elements = {
    close: {object: {}, class: `.menu--option__close`},
    open: {object: {}, class: `.menu--option__open`},
    control: {object: {}, class: `.controls`},
    menu: {object: {}, class: `.menu--options`}
};


mt.handlers = {
    initElements: () => {
        mt.elements.close.object = $(mt.elements.close.class);
        mt.elements.open.object = $(mt.elements.open.class);
        mt.elements.control.object = $(mt.elements.control.class);
        mt.elements.menu.object = $(mt.elements.menu.class);
    },
    initActions: () => {
        mt.elements.close.object.on('click', mt.actions.closeMenu);
        mt.elements.open.object.on('click', mt.actions.openMenu);
    },
    init: () => {
        mt.handlers.initElements();
        mt.handlers.initActions();
        window.addEventListener('resize', () => mt.actions.controlResize());
    }
};


mt.actions = {
    controlResize: () => {
        const width = $(this).width() + 5;
        if (width > 1360) {
            mt.elements.menu.object.attr('hidden', true);
            mt.actions.openMenu();
        } else {
            mt.elements.menu.object.attr('hidden', false);
            mt.actions.closeMenu();
        }
    },
    closeMenu: () => {
        mt.elements.control.object.attr('hidden', true);
        mt.elements.close.object.attr('hidden', true);
        mt.elements.open.object.attr('hidden', false);

    },
    openMenu: () => {
        mt.elements.control.object.attr('hidden', false);
        mt.elements.close.object.attr('hidden', false);
        mt.elements.open.object.attr('hidden', true);
    }

};
