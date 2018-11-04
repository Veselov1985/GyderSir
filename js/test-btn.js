 var zaglyshka = {};
 zaglyshka.data = {
     header: [],
     lines: [],
     xml: [],
     pdf_image: [],
     page: 0,
     pages: 0,
     xmlOutout: ''
 };

 var test = {};

 test.elements = {
     test_btn: { id: 'test_btn' },
     modalwindow: { id: 'test_modal' },
     testfindtemp_btn: { id: 'test_find_temp' },
     header_dataTables: { id: 'header_dataTables' },
     info_server_header: { id: 'info_server_header' },
     lines_dataTables: { id: 'lines_dataTables' },
     xmlfield: { id: 'XML' },
     pdf_text: { id: 'pdf_text' },
     slidecont: { id: 'rslides' },
     textarea: { id: 'textarea' },
     btn_test_prew: { id: 'btn_test_prew' },
     btn_test_next: { id: 'btn_test_next' },
     btn_test_view: { id: 'btn_test_view' },
     result_test_btn: { id: 'result_test_btn' },
 };

 test.objects = {
     dataTableHeader: {
         object: {},
         dt: {},
     },
     dataTableLines: {
         object: {},
         dt: {},
         columnsDefs: [],
     },
     xml: {},
 };

 test.ajax = {
     sendTestProccess: function(datas) {
         $.ajax({
             headers: {
                 'accept': 'application/json',
                 'Content-Type': 'application/json'
             },
             url: temp.routes.sendTestProccessUrl,
             type: "POST",
             data: JSON.stringify(datas), //.replace( /{/g, "*" ).replace(/}/g,"`"),
             dataType: 'json',
             success: function(data, textStatus, jqXHR) {
                 test.handlers.sendTestsuccess(data);
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 test.handlers.sendTesterror(jqXHR);
             },
             beforeSend: function() {
                 load.handlers.showLoader(load.elements.load_btn_test, load.elements.boss_btn_test);
                 //  pm.handlers.showPreloader(); // main preloader

                 pm.handlers.showPreloader1(); // main prelodaer1
             },
             complete: function() {
                 load.handlers.hideLoader(load.elements.load_btn_test, load.elements.boss_btn_test);
                 // pm.handlers.hidePreloader(); // main preloader
                 pm.handlers.hidePreloader1(); // main prelodaer1
             }
         });
     }
 };

 test.handlers = {
     clean: function(object) {
         if (!$.isEmptyObject(object.dt)) {
             object.dt.destroy();
             object.object.find('tbody').remove();
             object.dt = {};
         }
     },
     initDataTableHeader: function(dataHeader) {
         test.handlers.clean(test.objects.dataTableHeader);
         test.objects.dataTableHeader.dt = test.objects.dataTableHeader.object.DataTable({
             "ordering": false,
             "select": false,
             "responsive": true,
             "data": dataHeader,
             "columns": [{ title: "Field" }, { title: "Value" }, { title: "Format" }],
             "dom": "<'row'<'col-md-6'><'col-md-6'>>t<'clear'><'row'<'col-md-12'p>>",
         });
     },
     initDataTableLines: function(dataLines) {
         test.handlers.clean(test.objects.dataTableLines);
         test.handlers.formColumnDefs(dataLines);
         test.objects.dataTableLines.dt = test.objects.dataTableLines.object.DataTable({
             "ordering": false,
             "select": false,
             "responsive": true,
             "data": dataLines.td,
             "dom": "<'row'<'col-md-6'><'col-md-6'f>>t<'clear'><'row'<'col-md-12'p>>",
         });
     },
     formColumnDefs: function(dataLines) {
         var $th = test.elements.lines_dataTables.find('tr');
         $th.empty();
         dataLines.th.forEach(function(val, i) {
             $('<th>' + val + '</th>').appendTo($th);
         });
     },
     xmlOutput: function(xml) {
         var reg = /(>)\s*(<)(\/*)/g;
         var wsexp = / *(.*) +\n/g;
         var contexp = /(<.+>)(.+\n)/g;
         xml = xml.replace('<TestTemplate>', '');
         xml = xml.replace('<\/TestTemplate>', '');
         xml = xml.replace(/\r|\n/g, '');
         xml = xml.replace(reg, '$1\r\n$2$3');
         var formatted = '';
         var lines = xml.split('\n');
         var indent = 0;
         var lastType = 'other';
         var transitions = {
             'single->single': 0,
             'single->closing': -1,
             'single->opening': 0,
             'single->other': 0,
             'closing->single': 0,
             'closing->closing': -1,
             'closing->opening': 0,
             'closing->other': 0,
             'opening->single': 1,
             'opening->closing': 0,
             'opening->opening': 1,
             'opening->other': 1,
             'other->single': 0,
             'other->closing': -1,
             'other->opening': 0,
             'other->other': 0
         };
         for (var i = 0; i < lines.length; i++) {
             var ln = lines[i];
             var single = Boolean(ln.match(/<.+\/>/));
             var closing = Boolean(ln.match(/<\/.+>/));
             var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
             var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
             var fromTo = lastType + '->' + type;
             lastType = type;
             var padding = '';
             indent += transitions[fromTo];
             for (var j = 0; j < indent; j++) {
                 padding += '    ';
             }
             formatted += padding + ln + '\n';
         }
         return formatted;
     },
     addxmlfield: function() {
         $('#textarea').text('' + test.handlers.xmlOutput(zaglyshka.data.xml[0]) + '');
     },
     creathtmlslider: function() {
         zaglyshka.data.pdf_image.forEach(function(val, i) {
             test.elements.slidecont.append('<li><img src="' + val + '" alt=""></li>');
         });
     },
     cleanimg: function() {
         var $parent = test.elements.slidecont.parent();
         $parent.empty();
         $parent.append('<ul class="rslides"></ul>');
         test.elements.slidecont = $('.rslides');
     },
     slideinit: function() {
         test.handlers.creathtmlslider();
         test.elements.slidecont.responsiveSlides({
             auto: false,
             speed: 1000,
             timeout: 4000,
             pager: true,
             nav: false,
             random: false,
             pause: false,
             pauseControls: true,
             namespace: "rslides",
         });
     },
     ruleScope: function(DataType, Scopes, page, lastPage) {
         var arrObjectScopes = Scopes.filter(function(val) {
             return val.Name.toLowerCase().trim() == DataType.toLowerCase().trim();
         });
         if (arrObjectScopes.length > 0) {
             var rule = arrObjectScopes[0].Data; // number rule 1-all 2-first 3-last
             if (rule == 1) {
                 return true;
             } else if (rule == 2 && page == 0) {
                 return true;
             } else if (rule == 3 && page == lastPage) {
                 return true;
             } else {
                 return false;
             }
         } else {
             // not found nothing => create hand user dataType
             return true;
         }
     },
     addLinesArr: function(arr, arrScopes) {
         var lastPage = arr.length - 1;
         arr.forEach(function(val, i) {
             if (val.DataTypes.length == 0) {
                 zaglyshka.data.header.push(['empty', 'empty', 'empty']);
             } else {
                 var page = i;
                 val.DataTypes.forEach(function(object) {
                     var DataTypeName = object.Name + 's';

                     // TODO  now rulle do not use  04/11/2018
                     // if (test.handlers.ruleScope(DataTypeName, arrScopes, page, lastPage)) { // checkRuleScope
                     //     if (object.Data.trim() != '') {
                     //         zaglyshka.data.header.push([object.Name, object.Data, object.Format]);
                     //     }
                     // }
                     //  TODO  now rulle do not use  04/11/2018

                     zaglyshka.data.header.push([object.Name, object.Data, object.Format]);

                 });
             }
         });
         test.handlers.clearHeaderTable();
     },

     clearHeaderTable: function() {
         var res = zaglyshka.data.header.filter(function(val, i) {
             var r = val.filter(function(v, j) { return v != 'empty'; });
             if (r.length == 0) { return false; } else { return true; }
         });
         zaglyshka.data.header = (res.length != 0) ? res : [].concat(zaglyshka.data.header);
     },
     addHeadArr: function(arr) {
         arr.forEach(function(val, i) { // add th for page num      
             zaglyshka.data.lines.push({ th: [], td: [] });
             if (val.TableLines.length != 0) {
                 test.handlers.cookHeaderLines(val.TableLines[0].Columns, i); // set header table
                 test.handlers.cookDataCell(val.TableLines, i); // set cell on this header
             } else {
                 zaglyshka.data.lines[i].th.push('empty table'); // no table on this page
                 zaglyshka.data.lines[i].td.push('-');
             }
         });
     },
     cookHeaderLines: function(arr, iter) { //TableLines  
         arr.forEach(function(val, i) {
             zaglyshka.data.lines[iter].th.push(val.Header.toLowerCase());
         });
     },
     cookDataCell: function(arr, iteration) {
         arr.forEach(function(val, i) {
             zaglyshka.data.lines[iteration].td.push([]);
             val.Columns.forEach(function(el, j) { //  Columns array Columns
                 var data;
                 if (el.Data != null) {
                     data = el.Data;
                     data = xml.handlers.newLineText(data); // replace '↵' to => ';' in dataTable Lines
                     if (data.toLowerCase() == 'Exception whith Regex'.toLowerCase()) data = '';
                 } else {
                     data = "-";
                 }
                 zaglyshka.data.lines[iteration].td[i].push(data);
             });
         });
         test.handlers.cleanEmptyTd();

     },
     cleanEmptyTd: function() {
         zaglyshka.data.lines = zaglyshka.data.lines.map(function(val, i) {
             var tdArrayClean = val.td.filter(function(arr, j) {
                 if (arr == '-') return true;
                 if (arr.filter(function(z) { return z != ''; }).length != 0) {
                     return true;
                 } else {
                     return false;
                 }
             });
             return { th: val.th, td: tdArrayClean };
         });
     },
     setControlView: function() {
         test.elements.btn_test_view.val(zaglyshka.data.page + 1 + " (" + zaglyshka.data.pages + ")");
     },

     addImgArr: function(arr) {
         arr.forEach(function(val) {
             zaglyshka.data.pdf_image.push("data:image/jpeg;base64," + val.Base64);
         });
     },
     addXmlStr: function(text) {
         zaglyshka.data.xmlOutput = '';
         zaglyshka.data.xml[0] = text;
         zaglyshka.data.xmlOutput = text;
     },
     addNameTemplaite: function(name) {
         test.elements.testfindtemp_btn.val(name);
     },
     sendTestsuccess: function(data) {
         test.handlers.cleanimg();
         test.handlers.CleanDataTest();
         zaglyshka.data.pages = data.Pages.length;
         test.handlers.addLinesArr(data.Pages, data.Scopes); // Scopes => [{name:string,Data:number}] 1-All 2 -first 3-last Page
         test.handlers.addHeadArr(data.Pages); // change create table and fix multi page show   Scopes => [{name:string,Data:number}] 1-All 2 -first 3-last Page
         test.handlers.setControlView();
         test.handlers.addImgArr(data.Pages);
         test.handlers.addXmlStr(data.XmlData); // remove front rendering xml string(29/10/2018) test.handlers.addXmlStr(xml.init.getData(data)); //   <=======   xml.js 
         test.handlers.initDataTableHeader(zaglyshka.data.header);
         test.handlers.initDataTableLines(zaglyshka.data.lines[zaglyshka.data.page]);
         test.handlers.slideinit();
         test.handlers.addxmlfield();
         test.handlers.addNameTemplaite(data.TemplateName);
         test.elements.modalwindow.modal('show');
     },
     sendTesterror: function(data) {
         console.log(data);
     },
     CleanDataTest: function() {
         zaglyshka.data.header = [];
         zaglyshka.data.lines = [];
         zaglyshka.data.xml = [""];
         zaglyshka.data.pdf_image = [];
         zaglyshka.data.page = 0;
         zaglyshka.data.pages = 0;
     },
 };
 test.init = function() {
     test.elements.btn_xml = $('#btn_xml');
     test.elements.textarea = $('#textarea');
     test.elements.test_btn = $('#' + test.elements.test_btn.id);
     test.elements.modalwindow = $('#' + test.elements.modalwindow.id);
     test.elements.testfindtemp_btn = $('#' + test.elements.testfindtemp_btn.id);
     test.elements.header_dataTables = $('#' + test.elements.header_dataTables.id);
     test.objects.dataTableHeader.object = test.elements.header_dataTables;
     test.elements.info_server_header = $('#' + test.elements.info_server_header.id);
     test.elements.lines_dataTables = $('#' + test.elements.lines_dataTables.id);
     test.objects.dataTableLines.object = test.elements.lines_dataTables;
     test.elements.xmlfield = $('#' + test.elements.xmlfield.id);
     test.elements.pdf_text = $('#' + test.elements.pdf_text.id);
     test.elements.slidecont = $('.' + test.elements.slidecont.id);
     // buttons control paging
     test.elements.btn_test_next = $('#' + test.elements.btn_test_next.id);
     test.elements.btn_test_prew = $('#' + test.elements.btn_test_prew.id);
     test.elements.btn_test_view = $('#' + test.elements.btn_test_view.id);

     // show prew result btn
     test.elements.result_test_btn = $('#' + test.elements.result_test_btn.id);
 };

 test.init();
 test.fix = {
     addVatsandIbans: function(object) {
         var cloneObj = $.extend({}, object);
         var arrclone = cloneObj.Pages.slice(0);
         arrclone.forEach(function(val, i) {
             if (!val.Vats) {
                 arrclone[i].Vats = [];
             }
             if (!val.Ibans) {
                 arrclone[i].Ibans = [];
             }
             if (!val.KeyWord) {
                 arrclone[i].KeyWord = [];
             }
             if (!val.MainHeader) {
                 arrclone[i].MainHeader = { Rect: null };
             }
             if (!val.ExcludingTaxesAmounts) {
                 arrclone[i].ExcludingTaxesAmounts = [];
             }
             if (!val.InvoiceDates) {
                 arrclone[i].InvoiceDates = [];
             }
             if (!val.InvoiceNumbers) {
                 arrclone[i].InvoiceNumbers = [];
             }
             if (!val.ItemNumbers) {
                 arrclone[i].ItemNumbers = [];
             }
             if (!val.OrderNumbers) {
                 arrclone[i].OrderNumbers = [];
             }
             if (!val.Quantities) {
                 arrclone[i].Quantities = [];
             }
             if (!val.TotalBedrags) {
                 arrclone[i].TotalBedrags = [];
             }
             if (!val.UnitPrices) {
                 arrclone[i].UnitPrices = [];
             }
             if (!val.VatAmounts) {
                 arrclone[i].VatAmounts = [];
             }
         });
         cloneObj.Pages = arrclone;
         return cloneObj;
     },
 };

 test.elements.test_btn.on('click', function() {
     if (temp.DataWorkspace.images.length == 0 || temp.DataWorkspace.images.length == undefined) return;
     test.handlers.clean(test.objects.dataTableHeader);
     test.handlers.clean(test.objects.dataTableLines);
     test.ajax.sendTestProccess(test.fix.addVatsandIbans(temp.helpfunc.createresponsedata().Template));
 });

 test.elements.btn_test_next.on('click', function() {
     if (zaglyshka.data.pages > zaglyshka.data.page + 1) {
         zaglyshka.data.page += 1;
     }
     test.handlers.setControlView();
     test.handlers.clean(test.objects.dataTableLines);
     test.handlers.initDataTableLines(zaglyshka.data.lines[zaglyshka.data.page]);
 });

 test.elements.btn_test_prew.on('click', function() {
     if (0 != zaglyshka.data.page) {
         zaglyshka.data.page -= 1;
     }
     test.handlers.setControlView();
     test.handlers.clean(test.objects.dataTableLines);
     test.handlers.initDataTableLines(zaglyshka.data.lines[zaglyshka.data.page]);
 });

 test.elements.result_test_btn.on('click', function() {
     if (zaglyshka.data.pages != 0) {
         test.elements.modalwindow.modal('show');
     } else {
         temp.helpfunc.modalInfo(['No Data to Show', '']);
     }
 });
