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
        },
        nPars: function(string, from, FirstLastPage) {
            var p = ft.parsing.nPars(string, from);
        },
        starPars: function(string, from, FirstLastPage) {
            var p = ft.parsing.starPars(string, from);
        },
    },



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
        var initDataFromServerPage = [].length = dataFromServer.Pages.length;
        // init first and last page
        initDataFromServerPage.map(function(page, i) {
            if (i == 0 || i == initDataFromServerPage.length - 1) {
                if (i == 0) { // first page [0]
                    return PagesTemp[i];
                } else {
                    return PagesTemp[PagesTemp - 1]; // last page [n];
                }
            } else {

            }
        });

        if (mp.helpfuncs.isEmptyCellInServerPages(initDataFromServerPage)) {

            initDataFromServerPage = mp.actions.fillOtherPages(initDataFromServerPage, arrRulle, PagesTemp, dataFromServer);

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
            if (mp.validate.digitTest(rule.Rule)) {
                p = mp.parsing.digitPars(rule.Rule, PageFrom);
                // need filter list pages for this document length


            } else if (mp.validate.nTest(rule.Rule)) {
                p = mp.parsing.nPars(rule.Rule, PageFrom);
                // need filter list pages for this document length


            } else if (mp.validate.starTest(rule.Rule)) {
                p = mp.parsing.starPars(rule.Rule, PageFrom);
                // need filter list pages for this document length

            } else {
                console.log('error when create rulle');
            }

        });

    },


};


mp.init = function() {};



mp.init();