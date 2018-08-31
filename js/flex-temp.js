var ft = {};

ft.elements = {};

ft.elInit = function() {
    ft.elements.ft_input = $('#ft_input');
    ft.elements.ft_select = $('#ft_select');
    ft.elements.ft_btn = $('#ft_btn');
};

ft.actionsInit = function() {
    ft.elements.ft_btn.on('click', function() {
        ft.validate.init();
    });
};

ft.validate = {
    init: function() {
        var UsePage = ft.helpfunc.input.getValue().trim().toLowerCase();
        ft.validate.shakeValidate(UsePage);
    },
    shakeValidate: function(string) {
        var p;
        var PageFrom = ft.helpfunc.select.getOptionVal();
        if (ft.validate.digitTest(string)) {
            p = ft.parsing.digitPars(string, PageFrom);

        } else if (ft.validate.nTest(string)) {
            p = ft.parsing.nPars(string, PageFrom);

        } else if (ft.validate.starTest(string)) {
            p = ft.parsing.starPars(string, PageFrom);

        } else {
            temp.helpfunc.modalInfo(['Field Copy To', 'Incorrect Enter']);
        }
    },
    digitTest: function(str) {
        var pagesInDocument = temp.DataWorkspace.images.length;
        var test = true;
        var res = str.split(',');
        res.forEach(function(val) {
            if (!$.isNumeric(val) || +val > pagesInDocument) test = false;
        });
        return test;
    },
    nTest: function(string) {
        var res;
        var test = false;
        var pagesInDocument = temp.DataWorkspace.images.length;
        var matchN = string.match(/n/ig);
        if (matchN == null || matchN.length > 1) {
            test = false;
        } else {
            res = string.split('');
            if (res.length == 1 && res[0] == 'n') {
                test = true;
            }
            if (res.length == 3 && res[0] == 'n' && res[1] == '-' && $.isNumeric(res[2]) && +res[2] < pagesInDocument) {
                test = true;
            }
        }
        return test;
    },
    starTest: function(string) {
        var res, test;
        var pagesInDocument = temp.DataWorkspace.images.length;
        test = false;
        var matchN = string.match(/\*/ig);
        if (matchN == null || matchN.length > 1) {
            test = false;
        } else {
            res = string.split('');
            if (res[0] == '*' && res[1] == "-" && $.isNumeric(res[2]) && pagesInDocument - (+res[2]) > 0) {
                test = true;
            }
            var fromUpToAll = res.join('').split('-');
            if ($.isNumeric(fromUpToAll[0]) &&
                +fromUpToAll[0] < pagesInDocument &&
                fromUpToAll[1] == "*" &&
                $.isNumeric(fromUpToAll[2]) &&
                +fromUpToAll[2] < pagesInDocument &&
                (pagesInDocument - +fromUpToAll[0] - +fromUpToAll[2]) > 0
            ) {
                test = true;
            } else if (fromUpToAll.length == 1 && fromUpToAll[0] == "*") {
                test = true;
            }
        }
        return test;
    },
};

ft.parsing = {
    init: function() {
        var PageFrom = +ft.helpfunc.select.getOptionVal();
    },
    digitPars: function(str, cf) { // cf => value selected option
        return str.split(',').filter(function(val, i) {
            return +val != cf;
        });
    },
    nPars: function(str, cf) {
        var p;
        var pagesInDocument = temp.DataWorkspace.images.length;
        var res = str.split("");
        if (res.length == 1) {
            p = [pagesInDocument].filter(function(val) { return pagesInDocument != val; });
        } else {
            p = [pagesInDocument - (+res[2])].filter(function(val) { return pagesInDocument != val; });
        }
        return p;
    },
    starPars: function(str, cf) {
        var p, res, arr;
        p = [];
        arr = [];
        var pagesInDocument = temp.DataWorkspace.images.length;
        res = str.split('-');
        if (res.length == 1 && res[0] == "*") {
            arr.length = pagesInDocument;
            arr.forEach(function(val, i) {
                p.push(i + 1);
            });
        } else if (res.length == 2) {
            if (res[0] == "*") { //*-1
                arr.length = pagesInDocument - (+res[1]);
                arr.forEach(function(val, i) {
                    p.push(i + 1);
                });

            } else if (res[1] == '*') { //2 -*
                arr.length = pagesInDocument;
                arr.forEach(function(val, i) {
                    if (val >= +res[0]) {
                        p.push(i + 1);
                    }
                });
            }
        } else if (res.length == 3) { // 2-*-1
            arr.length = pagesInDocument - (+res[2]);
            arr.forEach(function(val, i) {
                if (val >= +res[0]) {
                    p.push(i + 1);
                }
            });
        }
        return p.filter(function(val) {
            return val != cf;
        });
    },
};


ft.handlers = {

};

ft.helpfunc = {
    input: {
        getValue: function() {
            return ft.elements.ft_input.val();
        },
    },
    select: {
        renderSelect: function(pages) {
            ft.helpfunc.select.cleanSelect();
            pages.forEach(function(element, i) {
                i += 1;
                ft.elements.ft_select.append('<option value="' + i + '">' + i + '</option>');
            });
        },
        cleanSelect: function() {
            ft.elements.ft_select.empty();
        },
        getOptionVal: function() {
            return ft.elements.ft_select.find('option:selected').val();
        },

    },
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