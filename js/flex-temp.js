var ft = {};

ft.elements = {
    tooltip: '',
};


ft.validate = {

};




ft.elInit = function() {
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

    var myTemplate = document.createElement('div');
    myTemplate.innerHTML = '<div style="width: 18rem;">' +
        '<div class="row">' +
        ' <div class="col-sm-12 p-2"> ' +
        '<h5 class="card-title">Valid entries are: </h5>' +
        '<p class="card-text">digit (1,2,3,4 etc  divided by a comma)</p> ' +
        '<p class="card-text">An asterisk (*) all pages</p> ' +
        '<p class="card-text">N Last page</p> ' +
        '<p class="card-text">N-1 last page minus number</p> ' +
        '<p class="card-text">*-1 all minus number</p> ' +
        '<p class="card-text">2-* from 2 up to all</p> ' +
        '<p class="card-text">2-*-1 from 2 up to all minus 1</p> ' +
        ' </div> ' +
        '</div>';

    tippy(document.getElementById('ft_input'), {
        allowTitleHTML: true,
        animateFill: true,
        delay: 100,
        arrow: true,
        arrowType: 'round',
        size: 'large',
        duration: 500,
        animation: 'shift-toward',
        theme: 'honeybee',
        placement: 'right',
        html: myTemplate
    });

};

ft.init = function() {
    ft.elInit();
    ft.tooltipInit();
    ft.actionsInit();
};


ft.init();