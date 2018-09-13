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



mp.helpfuncs = {
    checkRoole: function(temp) { // return boolean  true or false;
        return $.isArray(temp.RuleFormingTemplate) && temp.RuleFormingTemplate[0] != undefined;
    },
    checkPage: function(temp, pagedoc) {
        var res = pagedoc - temp;
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
        nPars: function(string, from, FirstLastPage) {
            var p;
            var pagesInDocument = FirstLastPage.length;
            var res = str.split("");
            if (res.length == 1) { // n
                p = [pagesInDocument];
            } else { // n-5
                p = [pagesInDocument - (+res[2])];
            }
            return p.filter(function(val) {
                return val != cf;
            }).map(function($val) { return +$val; });

        }
    },
    starPars: function(string, from, FirstLastPage) {
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
        return p.filter(function(val) {
            return val != cf;
        }).map(function($val) { return +$val; });
    },

    filterPagePars: function(pageArr, arr) {
        return pageArr.filter(function(val, i) {
            return arr.length >= val;
        });

    }




};

mp.handlers = {

    AddRule: function(from, pString) {
        mp.data.RuleArr.push({
            CopyFrom: from,
            Rule: pString
        });
    }


};

mp.actions = {

    createTemplate: function(tempFind, dataFromServer) {
        // check if roole enabled
        if (!mp.helpfuncs.checkRoole(tempFind)) return;
        var ruleArr = tempFind.RuleFormingTemplate;

        mp.actions.rendererTemplate(ruleArr, tempFind, dataFromServer);


    },
    rendererTemplate: function(arrRulle, PagesTemp, dataFromServer) {
        var newTemplaiteObj = {
            Pk: temp.elementLeftBar.Templaite.Pk, //temp.Data.leftTempList.datas.Pk
            Name: temp.elementLeftBar.Templaite.Name, //temp.Data.leftTempList.datas.Name
            Scopes: PagesTemp.Scopes, // Scope Pages Settings all,first,last   =>  NEED CHANGE PagesTemp.Scopes
            RuleFormingTemplate: mp.data.RuleArr,
            Pages: mp.actions.createPage(arrRulle, PagesTemp.Pages, dataFromServer)
        };
    },
    createPage: function(arrRulle, PagesTemp, dataFromServer) {


        switch (mp.helpfuncs.checkPage(PagesTemp, dataFromServer.Pages)) {
            case 'match':
                return PagesTemp; //@@@@@@@@@@@@@@@@@@@@@@@ need Osr Server Copy in Template
                break;
            case 'nomatch':
                return mp.actions.init(arrRulle, PagesTemp, dataFromServer);
                break;
        }
    },
    init: function(arrRulle, PagesTemp, dataFromServer) {
        var Pages = [];
        var initDataFromServerPage = Array.apply(null, Array(dataFromServer.Pages.length)); // create empty array length
        // init first and last page
        initDataFromServerPage = initDataFromServerPage.map(function(page, i) {
            if (i == 0 || i == initDataFromServerPage.length - 1) {
                if (i == 0) { // first page [0]
                    return PagesTemp[i];
                } else {
                    return PagesTemp[i]; // last page [n];
                }
            } else {
                return page;

            }
        });

        if (mp.helpfuncs.isEmptyCellInServerPages(initDataFromServerPage)) {

            initDataFromServerPage = mp.actions.fillOtherPages(initDataFromServerPage, arrRulle, PagesTemp, dataFromServer);
            return initDataFromServerPage;

        } else {
            return initDataFromServerPage;
        }


    },



    fillOtherPages: function(FirstLastPage, Rulle, PagesTemp, dataFromServer) {


        var Temp = FirstLastPage;

        Rulle.forEach(function(rule, i) {
            // for rule 
            var p;
            var PageFrom = rule.CopyFrom;
            if (mp.helpfuncs.validate.digitTest(rule.Rule)) {
                p = mp.helpfuncs.parsing.digitPars(rule.Rule, PageFrom);
                // need filter list pages for this document length
                Temp = mp.copy.init(FirstLastPage, PageFrom, p, PagesTemp);
            } else if (mp.helpfuncs.validate.nTest(rule.Rule)) {
                p = mp.helpfuncs.parsing.nPars(rule.Rule, PageFrom);
                // need filter list pages for this document length
                Temp = mp.copy.init(FirstLastPage, PageFrom, p, PagesTemp);

            } else if (mp.helpfuncs.validate.starTest(rule.Rule)) {
                p = mp.helpfuncs.parsing.starPars(rule.Rule, PageFrom);
                // need filter list pages for this document length
                Temp = mp.copy.init(FirstLastPage, PageFrom, p, PagesTemp);
            } else {
                console.log('error when create rulle');
            }

            /*
            @@ discription 
             @ maybe need check emptyPages and addOcrData and other
              @mp.helpfuncs.isEmptyCellInServerPages
            */

            return Temp;

        });

    },


};

mp.copy = {
    init: function(TempArr, PageFrom, p, PagesTempStart) {
        var DataFrom = mp.copy.getDataFrom(PageFrom, TempArr, PagesTempStart);
        var MainHeaderFrom = mp.copy.getMainHeader(from, TempArr, PagesTempStart);
        var Temp = mp.copy.insertData(DataFrom, MainHeaderFrom, p, TempArr);
        return Temp;
    },
    getDataFrom: function(f, firstlastTemp, startTemp) {
        var getDataTempCopy = mp.copy.whereGetData(firstlastTemp, startTemp, f);
        return mp.copy.isTableDatasFilter(getDataTempCopy);
    },
    whereGetData: function(fl, start, f) {
        if (fl[f - 1] != undefined) {
            return firstlastTemp[f - 1];
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
        var page = firstLastTemp.Pages.map(function(p, i) {
            if (ft.helpfunc.compareNumberInArr(i + 1, pages)) {
                if (p.TableDatas == undefined) p.TableDatas = [];
                p.TableDatas = p.TableDatas.concat(TableDatas);
                if (!MainHeader) p.MainHeader = {};
                p.MainHeader = MainHeader;
                return p;
            } else {
                return p;
            }
        });
        firstLastTemp.Pages = page;
        return firstLastTemp;
    },
};

mp.init = function() {};

mp.init();