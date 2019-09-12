var applymodal = {};
applymodal.elements = {};
applymodal.init = function() {
    applymodal.elements.window = $('#applymodal');
    applymodal.elements.applycontent = $('#applycontent');
    applymodal.elements.apply_close = $('#apply_close');
    applymodal.elements.apply_del_temp = $('#apply_del_temp'); // choice_btn 1
    applymodal.elements.apply_save_temp = $('#apply_save_temp'); // choice_btn 2
    applymodal.elements.apply_save_result = $('#apply_save_result'); //choice_btn 3
    applymodal.elements.apply_add_typedata = $('#apply_add_typedata'); // choice_btn 4
    applymodal.elements.apply_del_typedata = $('#apply_del_typedata'); //choice_btn 5
    applymodal.elements.apply_save_typedata = $('#apply_save_typedata'); // choice_btn 6
    applymodal.elements.apply_apply_typedata = $('#apply_apply_typedata'); // choice_btn 7
    applymodal.elements.apply_togle_state = $('#apply_togle_state'); // choise_btn 8
    applymodal.elements.apply_close.on('click', function() {
        applymodal.handlers.close();
    });
};

applymodal.handlers = {
    show: function(text, choice_btn) {
        applymodal.elements.apply_close.attr('hidden', false);
        applymodal.elements.applycontent.text(text);
        applymodal.handlers.findbtn(choice_btn);
        applymodal.elements.window.modal('show');
    },
    close: function() {
        if (!applymodal.elements.apply_save_typedata.is('hidden')) {
            rightbar.handlers.toggleinputfield(); // clear inp field => not save
        }
        if (temp.DataWorkspace.images.length) {
            var i = temp.elementLeftBar.dataTable.object.find('i');
            i.each(function() {
                var $that = $(this);
                var parent$2 = $that.parent().parent();
                if ($that.attr('class').trim() === temp.img.activ) {
                    parent$2.addClass('selected');
                } else {
                    parent$2.removeClass('selected');
                }
            });
        }
        applymodal.elements.window.find('button').each(function() {
            $(this).attr('hidden', true);
        });
        applymodal.elements.applycontent.text('');
        applymodal.elements.window.modal('hide');
    },
    findbtn: function(number) {
        switch (number) {
            case 1:
                applymodal.elements.apply_del_temp.attr('hidden', false);
                break;
            case 2:
                applymodal.elements.apply_save_temp.attr('hidden', false);
                break;
            case 3:
                applymodal.elements.apply_save_result.attr('hidden', false);
                break;
            case 4:
                applymodal.elements.apply_add_typedata.attr('hidden', false);
                break;
            case 5:
                applymodal.elements.apply_del_typedata.attr('hidden', false);
                break;
            case 6:
                applymodal.elements.apply_save_typedata.attr('hidden', false);
                break;
            case 7:
                applymodal.elements.apply_apply_typedata.attr('hidden', false);
                break;
            case 8:
                applymodal.elements.apply_togle_state.attr('hidden', false);
                break;
        }
    }
};

applymodal.init();

