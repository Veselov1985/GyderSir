var ft = {};
ft.elements = {};

ft.elInit = function () {
    ft.elements.ft_input = $('#ft_input');
    ft.elements.ft_select = $('#ft_select');
    ft.elements.ft_btn = $('#ft_btn');
};

ft.actionsInit = function () {
    ft.elements.ft_btn.on('click', function () {
        ft.validate.init();
    });

    ft.elements.ft_btn.on('mouseenter', function () {
        snack.info(`Rule in Template: ${ft.validate.viewRule()}`);
    });
    ft.elements.ft_btn.on('mouseleave', function () {
        Snackbar.close();
    });
};

ft.validate = {
    viewRule: () => {
        if (!mp.data.RuleArr || !mp.data.RuleArr.length) return 'Empty';
        return mp.data.RuleArr.reduce(function (prew, next) {
            return prew + ' From: ' + next.CopyFrom + ',Rule: ' + next.Rule;
        }, '');
    },
    init: function () {
        var UsePage = ft.helpfunc.input.getValue().trim().toLowerCase();
        ft.validate.shakeValidate(UsePage);
    },
    shakeValidate: function (string) {
        var p;
        var PageFrom = +ft.helpfunc.select.getOptionVal();
        if (ft.validate.digitTest(string)) {
            p = ft.parsing.digitPars(string, PageFrom);
            mp.handlers.AddRule(PageFrom, string); // multi-page.js
            p = ft.parsing.PagesVerification(p); // get only existing pages
            ft.copy.init(PageFrom, p);
        } else if (ft.validate.nTest(string)) {
            p = ft.parsing.nPars(string, PageFrom);
            mp.handlers.AddRule(PageFrom, string); // multi-page.js
            p = ft.parsing.PagesVerification(p); // get only existing pages 
            ft.copy.init(PageFrom, p);
        } else if (ft.validate.starTest(string)) {
            p = ft.parsing.starPars(string, PageFrom);
            mp.handlers.AddRule(PageFrom, string); // multi-page.js
            p = ft.parsing.PagesVerification(p); // get only existing pages
            ft.copy.init(PageFrom, p);
        } else {
            snack.error('Field Copy To. Incorrect Enter');
        }
    },
    digitTest: function (str) {

        var test = true;
        var res = str.split(',').filter(function (val) {
            return val != '';
        }); // remove empty enter => ,, or ,1,2,
        res.forEach(function (val) {
            if (!$.isNumeric(val) || +val <= 0) test = false; // all number
        });
        return test;
    },
    nTest: function (string) {
        var res;
        var test = false;
        //  var pagesInDocument = temp.DataWorkspace.images.length;
        res = string.split('');
        if (res.length == 1 && res[0] == 'n') {
            test = true;
        }
        if (res.length == 3 && res[0] == 'n' && res[1] == '-' && $.isNumeric(res[2])) { //all - number
            test = true;
        }
        return test;
    },
    starTest: function (string) {
        var res, test;
        //  var pagesInDocument = temp.DataWorkspace.images.length;
        test = false;
        res = string.split('');
        if (res.length == 3 && res[0] == '*' && res[1] == "-" && $.isNumeric(res[2])) { //  *-1
            test = true;
        }
        if (res.length == 3 && res[2] == '*' && res[1] == "-" && $.isNumeric(res[0])) { // 2-*
            test = true;
        }
        var fromUpToAll = res.join('').split('-');
        if (
            fromUpToAll.length == 3 && // 2-*-1
            $.isNumeric(fromUpToAll[0]) &&
            $.isNumeric(fromUpToAll[2]) &&
            fromUpToAll[1] == "*" &&
            (+fromUpToAll[0] - 1) > 0
        ) {
            test = true;
        } else if (fromUpToAll.length == 1 && fromUpToAll[0] == "*") { // => '*' 
            test = true;
        }
        return test;
    },
};

ft.parsing = {
    init: function () {
        var PageFrom = +ft.helpfunc.select.getOptionVal();
    },
    digitPars: function (str, cf) { // cf => value selected option
        var p = str.split(',') // delete part now .filter(function(val) { return val != cf;  })
            .filter(function (val) {
                return val != '';
            }); // fix => ,3,4,
        // need clear repeat in p  fix this => 4,4
        return temp.helpfunc.deleteRepeatInArr(p).map(function ($val) {
            return +$val;
        });
    },
    nPars: function (str, cf) {
        var p;
        var pagesInDocument = temp.DataWorkspace.images.length;
        var res = str.split("");
        if (res.length == 1) { // n
            p = [pagesInDocument];
        } else { // n-5
            p = [pagesInDocument - (+res[2])];
        }
        return p.map(function ($val) {
            return +$val;
        }); // delete part now .filter(function(val) { return val != cf;  })
    },
    starPars: function (str, cf) {
        var p, res, len;
        p = [];
        var pagesInDocument = temp.DataWorkspace.images.length;
        res = str.split('-');
        if (res.length == 1 && res[0] == "*") {
            len = pagesInDocument;
            for (var i = 1; i <= len; i++) {
                p.push(i);
            }
        } else if (res.length == 2) {
            if (res[0] == "*") { //*-1
                len = pagesInDocument - (+res[1]);
                for (var i = 1; i <= len; i++) {
                    p.push(i);
                }
            } else if (res[1] == '*') { //2 -*
                len = pagesInDocument;
                for (var i = +res[0]; i <= len; i++) {
                    p.push(i);
                }
            }
        } else if (res.length == 3) { // 2-*-1
            len = pagesInDocument - (+res[2]);

            for (var i = +res[0]; i <= len; i++) {
                p.push(i);
            }
        }
        return p.map(function ($val) {
            return +$val;
        }); // delete part now .filter(function(val) { return val != cf;  })
    },
    PagesVerification: function (pArr) {
        var pages = temp.DataWorkspace.images.length;
        return pArr.filter(function (val) {
            return val <= pages;
        });
    },

};

ft.position = {
    init: (template, from, to) => {
        var currentFrom = from - 1;
        var fromHeadersAndMainHeader = ft.position.findHeader(template, from); // [ headers, ismain];
        var headerRectCord = fromHeadersAndMainHeader[1] ? fromHeadersAndMainHeader[1] : fromHeadersAndMainHeader[0][0].Rect;
        var wordSearch = ft.position.findKW(headerRectCord, template.Pages[currentFrom]);
        var pages = [].concat(template.Pages);
        to.forEach((page, i) => {
            var pageIndex = page - 1;
            var pageData = template.Pages[pageIndex];
            if (wordSearch) {
                var OCRFrom = template.Pages[currentFrom].OcrStrings.filter(item => wordSearch.trim() == item.Sentence.trim())[0];
                var OCRTo = pageData.OcrStrings.filter(item => wordSearch.trim() == item.Sentence.trim())[0];
                if (OCRFrom && OCRTo) {
                    var cordFrom = cc.handlers.convertServerRect(OCRFrom);
                    var cordTo = cc.handlers.convertServerRect(OCRTo);
                    var Ycord = cordTo.X0.Y < cordFrom.X0.Y ? -(cordFrom.X0.Y - cordTo.X0.Y) : cordTo.X0.Y - cordFrom.X0.Y;
                    if (pageData.MainHeader && pageData.MainHeader.Rect) {
                        pageData.MainHeader.Rect.X0.Y = pageData.MainHeader.Rect.X0.Y + Ycord;
                        pageData.MainHeader.Rect.X1.Y = pageData.MainHeader.Rect.X1.Y + Ycord;
                    }
                    const heightCord = ft.position.findHeightTableCoord(pageData.OcrStrings, headerRectCord, Ycord);
                    pageData.TableDatas = [].concat(pageData.TableDatas.map(item => {
                        if (heightCord && ! ft.position.isHeaderTableRect(fromHeadersAndMainHeader[0], item.Rect)) {
                            item.Rect.X0.Y = item.Rect.X0.Y + Ycord;
                            item.Rect.X1.Y =  heightCord ? heightCord : item.Rect.X1.Y + Ycord ;
                        } else {
                            item.Rect.X0.Y = item.Rect.X0.Y + Ycord;
                            item.Rect.X1.Y = item.Rect.X1.Y + Ycord;
                        }
                        return item;
                    }));
                    pages[pageIndex] = pageData;
                } else {
                    pages[pageIndex] = pageData;
                }
            } else {
                pages[pageIndex] = pageData;
            }
        });
        return pages;
    },
    footerWords: [
        "Pagina", "Klantnummer", "Bank ", "www.", "WWW.", "www", "BIC", "IBAN", "Factuur", "FACTUUR", "VAT", "@", "KvK", "Factuurnr",
        "Tel", "K.V.K", "Fax", "FAX", "Email", "NEDERLAND", "Factuurdatum", "Factuuradres", "Factuurnummer", "E-Mail", "E-mail",
        "tel:", "factuurn", "factuurnr", "KVK", "datum:", "Vervaldatum", "Debiteurnummer", "Ordernummer", "Verkooporder", "factuur",
        "Verval datum", "Klant nummer", "Netherlands", "Kvk", "BTW-nummer", "POSTBUS", 'BTW', 'Phone','Totaal','Total', 'Totaal EUR'
    ],
    findHeightTableCoord: (server, headerRect, newY) => {
        const headerArr = [].concat(headerRect);
        const bottomPointFront = headerArr.reduce((acc, item) => acc < item.X1.Y ? item.X1.Y : acc, 0) + newY;
        const wordsFooter = ft.position.footerWords.map(val => val.toLowerCase());
        const searchMatchesOnPage = server.reduce((acc, item) => {
            if (wordsFooter.indexOf(item['Sentence'].toLowerCase()) > -1) {
                return acc.concat(item)
            } else {
                return acc;
            }
        }, []);
        let filterMatches = searchMatchesOnPage
            .filter((item) => {
                const serverRect = cc.handlers.convertServerRect(item);
                return bottomPointFront < serverRect.X1.Y
            });
        filterMatches = filterMatches.length ?  filterMatches.reduce((prev, next) => prev.Ypos < next.Ypos ? prev : next) : false;
        if (filterMatches && filterMatches.Ypos) {
            const yCoord = cc.handlers.convertServerRect(filterMatches).X1.Y - 3;
            return yCoord;
        }
        return 0;

    },
    isHeaderTableRect: (headerRectArr, itemRect) => {
        return headerRectArr.reduce((state, item) => {
            return state ?
                true :
                (
                    item.Rect.X0.X === itemRect.X0.X &&
                    item.Rect.X0.Y === itemRect.X0.Y &&
                    item.Rect.X1.X === itemRect.X1.X &&
                    item.Rect.X1.Y === itemRect.X1.Y
                )
        }, false)
    },
    findHeader: (template, from) => {
        const pageData = template.Pages[from - 1];
        var pageTable = pageData.TableDatas.filter(function (rect) {
            return rect.Data.trim() == "";
        });
        var ismain = temp.helpfunc.isMainHeader(pageData.MainHeader);
        var headers;
        if (ismain) {
            var zeroLine = temp.helpfunc.zeroLine(ismain);
            headers = [].concat(temp.helpfunc.findRectInHeadLine(zeroLine, pageTable));
        } else {
            headers = temp.helpfunc.findBigRow(pageTable);
        }
        return [headers, ismain];
    },
    findKW: (cordHeader, template) => {
        var ocrData = template.OcrStrings;
        cc.handlers.getInitWHServer();
        return cc.handlers.findActiveCoordInServer(cordHeader, ocrData);  //front, serverList
    },
};


ft.copy = {
    init: function (from, to) {
        if (ft.copy.isEmptyPages(to)) return;
        var Templaite = temp.helpfunc.createresponsedata().Template;
        var DataFrom = ft.copy.getDataFrom(from, Templaite);
        var MainHeaderFrom = ft.copy.getMainHeader(from, Templaite);
        var newTemplaite = ft.copy.initCopareFromtoToData(DataFrom, to, Templaite, MainHeaderFrom);
        // this logic find header and set position in new copy page rule
        // this logic set height table on copy pages
        var templatePos = ft.position.init(JSON.parse(JSON.stringify(newTemplaite)), from, to);
        newTemplaite.Pages = [].concat(templatePos);
        ft.paint.init(newTemplaite);
    },
    isEmptyPages: function (arr) {
        if (arr.length == 0) {
            snack.error('Field Copy To:  Incorrect Enter(No pages found for stitching)');
            return true;
        } else {
            return false;
        }
    },
    getDataFrom: function (numPage, Templaite) {
        return ft.copy.filterTableInServer(Templaite.Pages[numPage - 1]);
    },
    getMainHeader: function (f, temps) {
        var Obj = temps.Pages[f - 1];
        if (Obj.MainHeader) {
            return Obj.MainHeader;
        } else {
            return null;
        }
    },

    filterTableInServer: function (temp) { //return [] rect Data Table
        return temp.TableDatas.filter(function (rect) {
            return rect.DataType.Name == "TableDatas";
        });
    },
    initCopareFromtoToData: function (fromTableData, toPages, Templaite, mainHeader) {
        var tempTo = ft.copy.filterTableinTo(Templaite, toPages);
        var resTemp = ft.copy.mergerDataFromTo(fromTableData, tempTo, toPages, mainHeader);
        return resTemp;
    },
    filterTableinTo: function (Templaite, pageArr) {
        var pages = Templaite.Pages.map(function (page, i) {
            if (ft.helpfunc.compareNumberInArr(i + 1, pageArr)) {
                if (!page.TableDatas) {
                    page.TableDatas = [];
                }
                page.TableDatas = page.TableDatas.filter(function (rect) {
                    return rect.DataType.Name != "TableDatas";
                });
                return page;
            } else {
                return page;
            }
        });
        Templaite.Pages = pages;
        return Templaite;
    },

    mergerDataFromTo: function (f, t, pages, mainHeader) {
        var page = t.Pages.map(function (p, i) {
            if (ft.helpfunc.compareNumberInArr(i + 1, pages)) {
                if (p.TableDatas == undefined) p.TableDatas = [];
                p.TableDatas = [].concat(f);
                if (!p.MainHeader) p.MainHeader = {};
                p.MainHeader = mainHeader;
                return p;
            } else {
                return p;
            }
        });
        t.Pages = page;
        return t;
    },
};

ft.paint = {
    init: function (temps) {
        ft.paint.clearPrevData(temps);
        paint.objects.datafromserver.arrdata = temps.Pages[temp.DataWorkspace.activpage];
        temp.DataWorkspace.initwindow();
    },

    clearPrevData: function (temps) {
        temp.elementLeftBar.Templaite.Pk = temp.zeroGuid; //Pk empty row
        temp.elementLeftBar.Templaite.Name = '';
        temp.elementLeftBar.Templaite.name = '';
        temp.elementLeftBar.Templaite.origin = {};
        paint.objects.disactiv = [];
        paint.objects.datafromserver.removelistpage = temps.Pages;
        paint.objects.global.disactivpage = [];
        paint.objects.datafromserver.datafromserverpage = temps.Pages;
        paint.handlers.clearsvgcontent();
    }
};

ft.helpfunc = {
    compareNumberInArr: function (n, arr) {
        return arr.filter(function (val) {
            return val == n;
        }).length > 0;
    },
    input: {
        getValue: function () {
            return ft.elements.ft_input.val();
        },
    },
    select: {
        renderSelect: function (pages) {
            ft.helpfunc.select.cleanSelect();
            pages.forEach(function (element, i) {
                i += 1;
                ft.elements.ft_select.append('<option value="' + i + '">' + i + '</option>');
            });
        },
        cleanSelect: function () {
            ft.elements.ft_select.empty();
        },
        getOptionVal: function () {
            return ft.elements.ft_select.find('option:selected').val();
        },

    },

};

ft.tooltipInit = function () {
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

ft.init = function () {
    ft.elInit();
    ft.tooltipInit();
    ft.actionsInit();
};

ft.init();
