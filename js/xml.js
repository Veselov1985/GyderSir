var xml = {};
xml.data = {
    headerXML: '<?xml version="1.0" encoding="UTF-8"?>',
    $em:0 // epty index
}
xml.handlers = {
    removeStringError:function(str){
        return str.replace(/>/g,'&gt;')
      .replace(/</g,'&lt;')
       .replace(/&/g,'&amp;')
        .replace(/\'/g,'&apos;')
       .replace(/"/g,'&quot;');
    },
    remomeXMLEror:function(str){
        return str.replace(/[^a-zA-ZА-Яа-я0-9\s]/g,'_');
    },
       emtyHeader:function(){  
        var str ='Empty'+xml.data.$em;
        xml.data.$em++;
        return str;
       },
    deleteSpase: function(str) {
        if (typeof str != 'string') str = '';
        return str.trim().replace(/\n/, '_');
    },
    infoSir: function(date, nameTemp) {
        return '<Info><ProcessingDate>' + xml.handlers.removeStringError(date) + '</ProcessingDate><TemplateName>' +  xml.handlers. removeStringError(nameTemp) + '</TemplateName></Info>';
    },
    PageSir: function(page) {
        var str = xml.handlers.headerSir(page[0].DataTypes);
        page.forEach(function(val, i) {
            var st = xml.handlers.tableBodySir(page);
            str += st;
        });
        return str;
    },
    headerSir: function(arrHeader) {
        var init = '';
        if (arrHeader.length == 0) return '<Headers>Empty</Headers>'
        arrHeader.forEach(function(val, i) {
            var HeaderTag=xml.handlers.deleteSpase(val.Name).replace(/\s/, '_');
            var $text=xml.handlers.deleteSpase(val.Data);
            HeaderTag = (HeaderTag=="") ? xml.handlers.emtyHeader() : HeaderTag;
            HeaderTag = xml.handlers.remomeXMLEror(HeaderTag);
            $text= xml.handlers.removeStringError($text);
            init += '<' + HeaderTag + '>' + $text + '</' + HeaderTag + '>';
        });
        return '<Headers>' + init + '</Headers>'
    },
    tableBodySir: function(page) {
        var str = xml.handlers.tableSirLines(page)
        return '<Lines>' + str + '</Lines>';
    },
    tableSirLines: function(page) {
        var str = '';
        page.forEach(function(val, i) {
            val.TableLines.forEach(function(v, j) {
                str += '<Line>'
                v.Columns.forEach(function(d, k) {
                    var HeaderTag=xml.handlers.deleteSpase(d.Header).replace(/\s/, '_');
                    var $text=xml.handlers.deleteSpase(d.Data);
                    HeaderTag = (HeaderTag=="") ? xml.handlers.emtyHeader() : HeaderTag;
                    HeaderTag = xml.handlers.remomeXMLEror(HeaderTag);
                    $text= xml.handlers.removeStringError($text);
                    str += '<' + HeaderTag + '>' + $text + '</' + HeaderTag + '>'
                });
                str += '</Line>'
            });
        });
        return str;
    },
};
xml.init = {
    getData: function(data) {
        xml.data.$em=0;
        return xml.data.headerXML + '<GliderSir>' + xml.handlers.infoSir(data.ProcessingDate, data.TemplateName) + xml.handlers.PageSir(data.Pages) + '</GliderSir>';
    },
}