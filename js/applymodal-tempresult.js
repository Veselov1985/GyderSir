var applymodal_tempresult = {};
applymodal_tempresult.elements = {};
applymodal_tempresult.init = function() {
    applymodal_tempresult.elements.applymodal_tempresult = $('#applymodal_tempresult');
    applymodal_tempresult.elements.applymodal_tempresult_text = $('#applymodal_tempresult_text');
    applymodal_tempresult.elements.applymodal_tempresult_input = $('#applymodal_tempresult_input');
    applymodal_tempresult.elements.apply_tempresult_save_temp = $('#apply_tempresult_save_temp');
    applymodal_tempresult.elements.apply_tempresult_save_result = $('#apply_tempresult_save_result');
    applymodal_tempresult.elements.apply_tempresult_close = $('#apply_tempresult_close');

    applymodal_tempresult.elements.apply_tempresult_close.on('click', function() {
        applymodal_tempresult.handlers.close();
    });

    applymodal_tempresult.elements.applymodal_tempresult.on('shown.bs.modal', function() {
        applymodal_tempresult.elements.applymodal_tempresult_input.focus();
        applymodal_tempresult.elements.applymodal_tempresult_input[0].selectionEnd=0;

    });
    // esc fix
    applymodal_tempresult.elements.applymodal_tempresult.on('hidden.bs.modal', function() {
        applymodal_tempresult.handlers.close();
    });
};

applymodal_tempresult.handlers = {
    close: function() {
        applymodal_tempresult.elements.applymodal_tempresult.modal('hide');
        applymodal_tempresult.elements.apply_tempresult_save_temp.attr('hidden', true);
        applymodal_tempresult.elements.apply_tempresult_save_result.attr('hidden', true);
        applymodal_tempresult.handlers.cleartextinp();
    },

    showtemp: function() {
        applymodal_tempresult.elements.applymodal_tempresult_text.text('Template name');
        applymodal_tempresult.elements.apply_tempresult_save_temp.attr('hidden', false);
        applymodal_tempresult.elements.applymodal_tempresult.modal('show');
    },
    showresult: function() {
        applymodal_tempresult.elements.apply_tempresult_save_result.attr('hidden', false);
        applymodal_tempresult.elements.applymodal_tempresult_text.text('Save Results as');
        applymodal_tempresult.elements.applymodal_tempresult_input.val(applymodal_tempresult.handlers.getdate());
        applymodal_tempresult.elements.applymodal_tempresult.modal('show');
    },
    getdate: function() {
        return applymodal_tempresult.handlers.formatdate(new Date());
    },
    formatdate: function(date) {
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;
        return 'new -' + dd + '/' + mm + '/' + yy;
    },
    cleartextinp: function() {
        applymodal_tempresult.elements.applymodal_tempresult_text.text('');
        applymodal_tempresult.elements.applymodal_tempresult_input.val('');
    }

};

applymodal_tempresult.init();
applymodal_tempresult.elements.apply_tempresult_save_result.on('click', function() {
    var FileName = applymodal_tempresult.elements.applymodal_tempresult_input.val()+ '.xml';
    var filecontent = test.elements.textarea.text().replace(/\r|\n|\s+/g, ''); //  xml = xml.replace(/\r|\n/g, ''); 
    var saveData = (function() {
        window.URL = window.URL || window.webkitURL;
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function(data, fileName) {
            var json = JSON.stringify(filecontent),
                blob = new Blob([json], { type: " application/xml" }),

                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    saveData(filecontent, FileName);
    applymodal_tempresult.elements.applymodal_tempresult_input.val(applymodal_tempresult.handlers.getdate());
    applymodal_tempresult.handlers.close();
})