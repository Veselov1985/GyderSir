var xml = {};
xml.data = {
    headerXML: '<?xml version="1.0" encoding="UTF-8"?>',
    $em: 0,
    Scopes: [],
};
xml.handlers = {
    newLineText: function(str) {
        if (typeof str != 'string') return '';
        str = str.replace(/(\r\n|\n|\r)/gm, ";").split(';') // replace '↵' to => ';'
            .map(function(val) { return val.trim(); })
            .join(';');
        return xml.handlers.deleteEndStr(str.trim());
    },
    deleteEndStr: function(str) {
        var strLastIndex = str.length - 1;
        if (str[strLastIndex] == ';') {
            str = str.slice(0, -1);
        }
        return str;
    },
    removeStringError: function(str) {
        var s = str.replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/&/g, '&amp;')
            .replace(/\'/g, '&apos;')
            .replace(/"/g, '&quot;');
        if (s.toLowerCase() == 'Exception whith Regex'.toLowerCase()) {
            return '';
        }
        return s;
    },
    remomeXMLEror: function(str) {
        return str.replace(/[^a-zA-ZА-Яа-я0-9\s]/g, '_');
    },
    emtyHeader: function() {
        var str = 'Empty' + xml.data.$em;
        xml.data.$em++;
        return str;
    },
    deleteSpase: function(str) {
        if (typeof str != 'string') return '';
        return str.trim().replace(/\s+/g, '_');
    },
    infoSir: function(date, nameTemp) {
        return '<Info><ProcessingDate>' + xml.handlers.removeStringError(date) + '</ProcessingDate><TemplateName>' + xml.handlers.removeStringError(nameTemp) + '</TemplateName></Info>';
    },
    PageSir: function(page) {
        var str = xml.handlers.headerSir(page); // block Header
        var st = xml.handlers.tableBodySir(page); // block table Lines =>argument = array pages => return table
        str += st;
        return str;
    },
    checkHeaderNull: function(arr) {
        var stateHeader = false;
        var stateData = false;
        var headerArr = arr.filter(function(val, i) { return (typeof val.Header) == 'string'; });
        if (headerArr.length == 0) { stateHeader = true; }
        var dataArr = arr.filter(function(val, i) {
            if ((typeof val.Data) == 'string') {
                if (val.Data.toLowerCase() !== 'Exception whith Regex'.toLowerCase() && val.Data != '') {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });
        if (dataArr.length == 0) { stateData = true; }
        if (stateHeader) return true;
        if (stateData) return true;
        return false;
    },
    headerSir: function(arrPage) {
        var lastPageI = arrPage.length - 1;
        var Scopes = xml.data.Scopes;
        var init = '';
        arrPage.forEach(function(pageI, i) {
            var page = i;
            pageI.DataTypes.forEach(function(val) {
                if (test.handlers.ruleScope(val.Name, Scopes, page, lastPageI)) { // check rule from Header 1-all 2 First 3-Last page (only Datatype from DataBase)
                    var HeaderTag = xml.handlers.deleteSpase(val.Name);
                    var $text = xml.handlers.newLineText(val.Data); // // replace '↵' to => ';'
                    HeaderTag = (HeaderTag == "") ? xml.handlers.emtyHeader() : HeaderTag;
                    HeaderTag = xml.handlers.remomeXMLEror(HeaderTag);
                    $text = xml.handlers.removeStringError($text);
                    init += '<' + HeaderTag + '>' + $text + '</' + HeaderTag + '>';
                }
            });
        });
        xml.data.$em = 0;
        return (init == '') ? '<Headers>Empty</Headers>' : '<Headers>' + init + '</Headers>';
    },
    tableBodySir: function(page) {
        var str = xml.handlers.tableSirLines(page);
        return '<Lines>' + str + '</Lines>';
    },
    tableSirLines: function(page) {
        var str = '';
        page.forEach(function(val, i) {
            val.TableLines.forEach(function(v, j) {
                if (xml.handlers.checkHeaderNull(v.Columns)) { // check null Header tag
                } else {
                    str += '<Line>';
                    v.Columns.forEach(function(d, k) {
                        var HeaderTag = xml.handlers.deleteSpase(d.Header);
                        var $text = xml.handlers.newLineText(d.Data); // replace '↵' to => ';'
                        HeaderTag = (HeaderTag == "") ? xml.handlers.emtyHeader() : HeaderTag;
                        HeaderTag = xml.handlers.remomeXMLEror(HeaderTag);
                        $text = xml.handlers.removeStringError($text);
                        str += '<' + HeaderTag + '>' + $text + '</' + HeaderTag + '>';
                    });
                    str += '</Line>';
                    xml.data.$em = 0;
                }
            });
        });
        return str;
    },
};
xml.init = {
    getData: function(data) {
        xml.data.Scopes = data.Scopes;
        xml.data.$em = 0;
        return xml.data.headerXML + '<GliderSir>' + xml.handlers.infoSir(data.ProcessingDate, data.TemplateName) + xml.handlers.PageSir(data.Pages) + '</GliderSir>';
    },
};