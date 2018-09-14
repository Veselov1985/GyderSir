var gf = {};
gf.handlers = {
    sendProcess: function(temp) {
        test.ajax.sendTestProccess(temp);
    },
    getPagesOcrString: function(data) {
        var pages = data.Template.Pages;
        return pages.map(function(val) { return val.OcrStrings; });
    },
    getPagesBase64: function(data) {
        var pages = data.Template.Pages;

        return pages.map(function(val, i) { return val.Base64Img; });
    },
    getTemplaiteInList: function(data) {
        var Pk = data.Pks[0];
        return temp.Data.leftTempList.list.filter(function(val, i) {
            if (Pk == val.Pk) { return true; } else { return false; }
        })[0];
    },
    setCurrentOcrStringAndBase64: function(temp, Ocr, base64) {
        var objPages = temp.Pages.map(function(val, i) {
            val.OcrStrings = Ocr[i];
            val.Base64Img = base64[i];
            return val;
        });
        temp.Pages = objPages;
        return temp;
    },
};

gf.init = function(Temp) {
    /*  var Ocr = gf.handlers.getPagesOcrString(data);
      var base64 = gf.handlers.getPagesBase64(data);
      var templaite = gf.handlers.getTemplaiteInList(data);
      var currentTemp = gf.handlers.setCurrentOcrStringAndBase64(templaite, Ocr, base64);
      test.handlers.CleanDataTest();
      test.handlers.cleanimg();
      test.handlers.clean(test.objects.dataTableHeader);
      test.handlers.clean(test.objects.dataTableLines);*/
    gf.handlers.sendProcess(test.fix.addVatsandIbans(Temp));
};