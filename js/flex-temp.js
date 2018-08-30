var ft = {};

ft.elements = {
    tooltip: '',
};


ft.validate = {

};




ft.elInit = function() {
    ft.elements.tooltip1 = $('#tooltip1');
    ft.elements.ft_input = $('#ft_input');
    ft.elements.ft_select = $('#ft_select');
    ft.elements.ft_btn = $('#ft_btn');
};


ft.actionsInit = function() {
    ft.elements.ft_btn.on('click', function() {

    });
};



ft.handlers = {

};


ft.tooltipInit = function() {

    ft.elements.tooltip = new Tooltip(ft.elements.ft_input, {
        title: "Hey there",
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow">S</div><div class="tooltip-inner">ssssss</div></div>',
        placement: 'bottom'
    });





    // ft.elements.tooltip1.tooltip({
    //     title: 'Valid entries are:fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    //     boundary: 'window',
    //     container: 'body',
    //     placement: 'bottom',
    //     template: '<div class="tooltip bs-tooltip-top" role="tooltip"> <div class="arrow"></div> <div class="tooltip-inner">Some tooltip text!</div></div>'
    // });
    ft.elements.ft_input.mouseenter(function() {
        ft.elements.tooltip.show();
        // $(this).tooltip('show');
    });

    ft.elements.ft_input.mouseout(function() {
        // $(this).tooltip('hide');
        ft.elements.tooltip.hide();
    });
};


ft.init = function() {
    ft.elInit();
    ft.tooltipInit();
    ft.actionsInit();
};


ft.init();