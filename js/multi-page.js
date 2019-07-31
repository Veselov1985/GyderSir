var mp = {};
mp.elements = {};
mp.data = {
    RuleArr: [],
};

mp.dataAction = {
    RuleFormingTemplate: {
        CopeFrom: '',
        Rule: '',
    },
    MemoryRule: [],
};

mp.empty = {
    page: {
        Base64Img: '',
        Subtotal: [],
        Ibans: [],
        InvoiceDates: [],
        InvoiceNumbers: [],
        KeyWord: [],
        MainHeader: [],
        OcrStrings: [],
        OnlyImages: '',
        OnlyText: '',
        OrderNumbers: [],
        Quantities: [],
        TableDatas: [],
        TotalBedrags: [],
        UnitPrices: [],
        VatAmounts: [],
        Vats: [],
    },
    TableDatas: [{
        Data: null,
        Regex: null,
        Position: '',
        Reserve: '',
        DataType: { Pk: "00000000-0000-0000-0000-000000000000", Name: "", IsText: false },
        Rect: { X0: { X: 0, Y: 0 }, X1: { X: 0, Y: 0 } }
    }],
};


mp.helpfuncs = {
    checkRoole: function(temp) { // return boolean  true or false;
        return $.isArray(temp.RuleFormingTemplate) && temp.RuleFormingTemplate[0] != undefined;
    },
    checkPage: function(temp, pagedoc) {
        var res = pagedoc.length - temp.length;
        if (res == 0) {
            return 'match';
        } else {
            return 'nomatch';
        }

    },
    clearRuleArr: function() {
        mp.data.RuleArr = [];
    },
    isEmptyCellInServerPages: function(arr) {
        return arr.filter(function(val) { return val == undefined; }).length > 0;

    },

    validate: {

        digitTest: function(str) {
            var test = true;
            var res = str.split(',').filter(function(val) { return val != ''; }); // remove empty enter => ,, or ,1,2,
            res.forEach(function(val) {
                if (!$.isNumeric(val)) test = false;
            });
            return test;
        },

        nTest: function(string) {
            var res;
            var test = false;
            res = string.split('');
            if (res.length == 1 && res[0] == 'n') {
                test = true;
            }
            if (res.length == 3 && res[0] == 'n' && res[1] == '-' && $.isNumeric(res[2])) {
                test = true;
            }
            return test;
        },
        starTest: function(string) {
            var res, test;
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
                fromUpToAll[1] == "*"
            ) {
                test = true;
            } else if (fromUpToAll.length == 1 && fromUpToAll[0] == "*") { // => '*' 
                test = true;
            }
            return test;
        },
    },
    parsing: {
        digitPars: function(string, from, FirstLastPage) {
            var p = ft.parsing.digitPars(string, from);
            return mp.helpfuncs.parsing.filterPagePars(p, FirstLastPage);
        },

        nPars: function(str, from, FirstLastPage) {
            var p;
            var pagesInDocument = FirstLastPage.length;
            var res = str.split("");
            if (res.length == 1) { // n
                p = [pagesInDocument];
            } else { // n-5
                p = [pagesInDocument - (+res[2])];
            }
            return p.map(function($val) { return +$val; }); // delete 16/09/2018 .filter(function(val) {   return val != cf;})
        },

        starPars: function(str, cf, FirstLastPage) {
            var p, res, len;
            p = [];
            var pagesInDocument = FirstLastPage.length;
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
            return p.map(function($val) { return +$val; }); // delete 16/09/2018 .filter(function(val) {   return val != cf;})
        },

        filterPagePars: function(pageArr, arr) {
            return pageArr.filter(function(val, i) {
                return arr.length >= val;
            });
        },
    },

};

mp.handlers = {
    AddRule: function(from, pString) {
        if (!mp.data.RuleArr) { mp.data.RuleArr = [] }
        mp.data.RuleArr.push({
            CopyFrom: from,
            Rule: pString
        });
    }
};

mp.actions = {
    createTemplate: function(tempFind) {
        // check if roole enabled
        if (!mp.helpfuncs.checkRoole(tempFind)) {
            var initDataFromServerPage = Array.apply(null, Array(temp.serverTemplate.Pages.length));
            tempFind = mp.actions.renderTemplateNotRulle(initDataFromServerPage, tempFind);

            tempFind.Pages = mp.copy.fillOcrBase64IOnlyImagesOnlyText(tempFind.Pages);
            return tempFind;
        }
        var ruleArr = tempFind.RuleFormingTemplate;
        return mp.actions.rendererTemplate(ruleArr, tempFind);
    },
    renderTemplateNotRulle: function(init, TempFind) {

        var pages = init.map(function(p, i) {
            if (TempFind.Pages[i] !== undefined) {
                return $.extend({}, TempFind.Pages[i]);
            } else {
                var page = mp.empty.page;
                page.TableDatas = mp.empty.TableDatas;
                return page;
            }
        });
        mp.data.RuleArr = []; // state rulle in multi-page.js

        return {

            Pk: TempFind.Pk, //temp.Data.leftTempList.datas.Pk
            Name: TempFind.Name, //temp.Data.leftTempList.datas.Name
            // Scopes: TempFind.Scopes, // Scope Pages Settings all,first,last   =>  NEED CHANGE PagesTemp.Scopes   // TODO delete  02/11/2018
            ///  RuleFormingTemplate: [],    // TODO delete  02/11/2018
            Pages: pages,
            PropertyPdf: TempFind.PropertyPdf ? TempFind.PropertyPdf : {}, // ADD PropertyPdf   NEW Template object 16/12/2018
        };

    },
    rendererTemplate: function(arrRulle, PagesTemp) {
        var pages = mp.actions.createPage(arrRulle, PagesTemp.Pages);
        pages = mp.copy.fillOcrBase64IOnlyImagesOnlyText(pages);
        var newTemplaiteObj = {
            Pk: PagesTemp.Pk, //temp.Data.leftTempList.datas.Pk
            Name: PagesTemp.Name, //temp.Data.leftTempList.datas.Name
            // Scopes: PagesTemp.Scopes, // Scope Pages Settings all,first,last   =>  NEED CHANGE PagesTemp.Scopes
            // RuleFormingTemplate: PagesTemp.RuleFormingTemplate,
            Pages: pages,
            PropertyPdf: PagesTemp.PropertyPdf ? PagesTemp.PropertyPdf : {}, // ADD PropertyPdf   NEW Template object 16/12/2018

        };
        return newTemplaiteObj;
    },
    createPage: function(arrRulle, PagesTemp) {
        switch (mp.helpfuncs.checkPage(PagesTemp, temp.serverTemplate.Pages)) {
            case 'match':
                return PagesTemp;
                break;
            case 'nomatch':
                return mp.actions.init(arrRulle, PagesTemp);
                break;
        }
    },
    init: function(arrRulle, PagesTemp) {
        var initDataFromServerPage = Array.apply(null, Array(temp.serverTemplate.Pages.length)); // create empty array length
        // init first and last page
        initDataFromServerPage = initDataFromServerPage.map(function(page, i) {
            if (i == 0 || i == initDataFromServerPage.length - 1) {
                if (i == 0) { // first page [0]
                    return PagesTemp[i];
                } else {
                    return PagesTemp[PagesTemp.length - 1]; // last page [n];
                }
            } else {
                return page;
            }
        });

        if (mp.helpfuncs.isEmptyCellInServerPages(initDataFromServerPage)) {
            initDataFromServerPage = mp.actions.fillOtherPages(initDataFromServerPage, arrRulle, PagesTemp);
            return initDataFromServerPage;
        } else {
            return initDataFromServerPage; //
        }
    },

    fillOtherPages: function(FirstLastPage, Rulle, PagesTemp) {
        var Temp = FirstLastPage;
        Rulle.forEach(function(rule) {
            // for rule 
            var p;
            var PageFrom = rule.CopyFrom;
            if (mp.helpfuncs.validate.digitTest(rule.Rule)) {
                p = mp.helpfuncs.parsing.digitPars(rule.Rule, PageFrom, FirstLastPage);

                Temp = mp.copy.init(Temp, PageFrom, p, PagesTemp);
            } else if (mp.helpfuncs.validate.nTest(rule.Rule)) {
                p = mp.helpfuncs.parsing.nPars(rule.Rule, PageFrom, FirstLastPage);

                Temp = mp.copy.init(Temp, PageFrom, p, PagesTemp);
            } else if (mp.helpfuncs.validate.starTest(rule.Rule)) {
                p = mp.helpfuncs.parsing.starPars(rule.Rule, PageFrom, FirstLastPage);

                Temp = mp.copy.init(Temp, PageFrom, p, PagesTemp);
            } else {
                console.log('error when create rulle');
            }
        });
        return Temp;
    },
};

mp.copy = {
    init: function(TempArr, PageFrom, p, PagesTempStart) {
        var DataFrom = mp.copy.getDataFrom(PageFrom, TempArr, PagesTempStart);
        var MainHeaderFrom = mp.copy.getMainHeader(TempArr, PagesTempStart, PageFrom);
        var Temp = mp.copy.insertData(DataFrom, MainHeaderFrom, p, TempArr);
        Temp = mp.copy.fillEmtyPages(Temp);
        return Temp;
    },
    getDataFrom: function(f, firstlastTemp, startTemp) {
        var getDataTempCopy = mp.copy.whereGetData(firstlastTemp, startTemp, f);
        return mp.copy.isTableDatasFilter(getDataTempCopy);
    },
    whereGetData: function(fl, start, f) {
        if (fl[f - 1] != undefined) {
            return fl[f - 1];
        } else {
            return start[f - 1];
        }
    },
    isTableDatasFilter: function(temp) {
        return temp.TableDatas.filter(function(rect) {
            return rect.DataType.Name == "TableDatas";
        });
    },
    getMainHeader: function(firstlastTemp, startTemp, f) {
        var getDataTempCopy = mp.copy.whereGetData(firstlastTemp, startTemp, f);
        var Obj = getDataTempCopy;
        if (Obj.MainHeader) {
            return Obj.MainHeader;
        } else {
            return null;
        }
    },
    insertData: function(TableDatas, MainHeader, pages, firstLastTemp) {
        var page = firstLastTemp.map(function(p, i) {
            if (ft.helpfunc.compareNumberInArr(i + 1, pages)) {
                if (p == undefined) p = mp.empty.page;
                if (p.TableDatas == undefined) p.TableDatas = [];
                if (p.TableDatas.length > 0) p.TableDatas = [];
                p.TableDatas = p.TableDatas.concat(TableDatas);
                if (!MainHeader) p.MainHeader = [];
                p.MainHeader = MainHeader;
                return p;
            } else {
                return p;
            }
        });
        return page;
    },

    fillEmtyPages: function(temp) {
        return temp.map(function(val) {
            if (val == undefined) {
                var page = mp.empty.page;
                page.TableDatas = mp.empty.TableDatas;
                return page;
            } else {
                return val;
            }
        });
    },

    fillOcrBase64IOnlyImagesOnlyText: function(pages) {
        var arr = temp.serverTemplate.Pages.map(function(p) {
            return { im: p.OnlyImages, text: p.OnlyText, ocr: p.OcrStrings, base: p.Base64Img };
        });
        return arr.map(function(v, i) {
            var page = pages[i];
            page.OnlyImages = v.im;
            page.OnlyText = v.text;
            page.OcrStrings = v.ocr;
            page.Base64Img = v.base;
            return $.extend({}, page);
        });
    },
};
