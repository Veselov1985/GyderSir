 var rightbar = {};

 rightbar.zag = {
     dataTable: [
         ["Vats"],
         ["Ibans"],
         ["KeyWord"],
         ["MainHeader"],
         ['ExcludingTaxesAmounts'],
         ['InvoiceDates'],
         ['ItemNumbers'],
         ['OrderNumbers'],
         ['Quantities'],
         ['TotalBedrags'],
         ['UnitPrices'],
         ['VatAmounts'],
     ],
 };

 rightbar.data = {
     global: {
         checkboxList: [],
         currenttab: 0,
         activrect: {},
         dataType: [{ DataType: 'Vats', Pk: false },
             { DataType: 'Ibans', Pk: false },
             { DataType: 'KeyWord', Pk: false },
             { DataType: 'MainHeader', Pk: false },
             { DataType: 'ExcludingTaxesAmounts', Pk: false },
             { DataType: 'InvoiceDates', Pk: false },
             { DataType: 'ItemNumbers', Pk: false },
             { DataType: 'OrderNumbers', Pk: false },
             { DataType: 'Quantities', Pk: false },
             { DataType: 'TotalBedrags', Pk: false },
             { DataType: 'UnitPrices', Pk: false },
             { DataType: 'VatAmounts', Pk: false },
         ],
         amount: [],
         date: [],
         regex: [],
         alternate: []
     },
 };

 rightbar.elements = {};

 rightbar.init = function() {
     // container #fieldPref
     rightbar.elements.fieldPref = $('#fieldPref');
     //wrapfieldContent
     rightbar.elements.wrapfieldContent = $('#wrapfieldContent');
     //cont datatable change
     rightbar.elements.dataTypeList1 = $('#dataTypeList1');
     //dataTable
     rightbar.dataTable.set.object = $('#rightBarData');
     rightbar.dataTable.change.object = $('#rightBarData1');
     //buttons handler
     rightbar.elements.tabSaveNameData = $('#tabSaveNameData');
     rightbar.elements.saveDataType = $('#saveDataType');
     rightbar.elements.btn_cancel_datatype = $('#btn_cancel_datatype');
     //checkbox
     rightbar.elements.checkAmount = $('#checkAmount');
     rightbar.elements.checkDate = $('#checkDate');
     rightbar.elements.checkReg = $('#checkReg');
     rightbar.elements.checkalternate = $('#checkalternate');
     rightbar.elements.checkText = $('#checkText');
     //buttons rev data
     rightbar.elements.changeAmount = $('#changeAmount');
     rightbar.elements.changeDate = $('#changeDate');
     rightbar.elements.changeRegex = $('#changeRegex');
     rightbar.elements.changeAlternate = $('#changeAlternate');
     //selects
     rightbar.elements.selAmount = $('#selAmount');
     rightbar.elements.selDate = $('#selDate');
     rightbar.elements.selReg = $('#selReg');
     rightbar.elements.selalternate = $('#selalternate');

     // cont btn add & dell
     rightbar.elements.savdelData = $('#savdelData');

     // buttons tab 
     rightbar.elements.btn_apply_not = $('#btn_apply_not');
     rightbar.elements.btn_add_type = $('#btn_add_type');
     rightbar.elements.btn_del_type = $('#btn_del_type');

     //button save datatype
     rightbar.elements.btn_save_datatype = $('#btn_save_datatype');

     //input new name typedata
     rightbar.elements.input_new_typedata = $('#input_new_typedata');

     //btn_dell preference
     rightbar.elements.deleteAmount = $('#deleteAmount');
     rightbar.elements.deleteDate = $('#deleteDate');
     rightbar.elements.deleteRegex = $('#deleteRegex');
     rightbar.elements.deleteAlternate = $('#deleteAlternate ');
     //ABS WRAP
     rightbar.elements.checkAbsolut = $('#checkAbsolut');
     rightbar.elements.wrapAbs = $('#wrapAbs');

 };


 rightbar.dataTable = {
     set: {
         object: {},
         dt: {},
         activ: {},
     },
     change: {
         object: {},
         dt: {},
         activ: {},
     },

     clean: function(table) {
         if (!$.isEmptyObject(table.dt)) {
             table.dt.destroy();
             table.object.find('tbody').remove();
             table.dt = {};
         }
     },

     init: function(table, rightTempListData) {
         rightbar.dataTable.clean(table);
         table.dt = table.object.DataTable({
             "pagingType": 'simple_numbers',
             "order": [],
             "lengthMenu": [
                 [13],
                 [13]
             ],
             "select": true,
             "responsive": true,
             "data": rightTempListData,
             "columns": [{
                 title: "Data Type"
             }],
             "dom": "t<'clear'><'row'<'col-md-12'p>>",
         });
     },
     emmitchangerect: function(activ) {
         rightbar.data.global.activrect = activ;
         rightbar.dataTable.checkdatatype();

     },
     checkdatatype: function() {
         if (rightbar.data.global.activrect.type.length == 0 && rightbar.dataTable.set.dt.$('tr.selected').length > 0) {
             rightbar.dataTable.set.dt.$('tr.selected').removeClass('selected');

         } else {

         }
     }
 };

 rightbar.handlers = {
     cleanselect: function(select) {
         select.remove();
     },
     currenttabchange: function(e) {
         var $href= $(e.target).attr('href');
        if( $href == '#set') return 1;
         if( $href == '#change') return 2;
         if( $href == '#header_xml') return 3

       
     },
     togleshowelem: function(elem) {
         elem.is(":hidden") ? elem.attr("hidden", false) : elem.attr('hidden', true);
     },
     togledisabledelem: function(elem) {
         elem.is(":disabled") ? elem.attr("disabled", false) : elem.attr('disabled', true);
     },

     inittoggle: function() {
         rightbar.handlers.togleshowelem(rightbar.elements.changeAmount);
         rightbar.handlers.togleshowelem(rightbar.elements.changeDate);
         rightbar.handlers.togleshowelem(rightbar.elements.changeRegex);
         rightbar.handlers.togleshowelem(rightbar.elements.changeAlternate);
         rightbar.handlers.togleshowelem(rightbar.elements.saveDataType);

         rightbar.handlers.togleshowelem(rightbar.elements.deleteAmount);
         rightbar.handlers.togleshowelem(rightbar.elements.deleteDate);
         rightbar.handlers.togleshowelem(rightbar.elements.deleteRegex);
         rightbar.handlers.togleshowelem(rightbar.elements.deleteAlternate);
         // rightbar.handlers.togledisabledelem(rightbar.elements.selAmount)
         // rightbar.handlers.togledisabledelem(rightbar.elements.selDate)
         // rightbar.handlers.togledisabledelem(rightbar.elements.selReg)
         // rightbar.handlers.togledisabledelem(rightbar.elements.selalternate)
     },
     findactivdatatype: function() { // {set{name: Pk: Text:},change{Name: ,Pk: , Text:}}
         var set = rightbar.dataTable.set.dt.$('tr.selected');
         var change = rightbar.dataTable.change.dt.$('tr.selected');

         return {
             set: {
                 activtr: set,
                 Name: set.length > 0 ? set.find('td').text() : '',
                 Pk: ''
             },
             change: {
                 activtr: change,
                 Name: change.length > 0 ? change.find('td').text() : '',
                 Pk: '',

             }
         };
     },
     addnewpref: function(e) {
         e.preventDefault();
         var $e_curr = $(e.currentTarget);
         /*   if ($e_curr.parent().prev().is(':hidden')) {

                return;
            }
            */
         var select = $e_curr.parent().parent().find('select');

         if (!select.is(':hidden')) {

             var input = $e_curr.parent().parent().find('input:not([type="checkbox"])');
             if (input.length > 0) {
                 var $newhtml = input;
                 var $old = select;
                 rightbar.handlers.togleshowelem($old);
                 rightbar.handlers.togleshowelem($newhtml);
             } else {
                 var $old = $e_curr.parent().prev();
                 var $oldId = $old.attr('id');
                 var $newhtml = $('<input class="form-control form-control-sm" id="_' + $oldId + '" type="text" >');
                 $old.after($newhtml);
                 rightbar.handlers.togleshowelem($old);
             }
             // $('#_' + $oldId).focus();
             $newhtml.focus();
         } else {
             var selectfield = $e_curr.parent().parent().find('select');
             var inputfield = $e_curr.parent().parent().find('input:not([type="checkbox"])');
             var addselectcont = inputfield.val(); // input field
             if (addselectcont == '') {
                 inputfield.focus();
                 return;
             }
             var datas = rightbar.handlers.formdataoption(selectfield.attr('data-sel'), addselectcont);
             rightbar.handlers.setneedAjax(selectfield, e, datas);

         }

     },
     setneedAjax: function(select, e, data) {
         var res = select.attr('data-sel');
         if (res == 'AmountNotation') rightbaraction.Ajax.sendAddAmountProccess(data, e);
         if (res == 'DataNotation') rightbaraction.Ajax.sendAddDateProccess(data, e);
         if (res == 'Regex') rightbaraction.Ajax.sendAddRegexProccess(data, e);
         if (res == 'Alternate') rightbaraction.Ajax.sendAddAlternateProccess(data, e);
     },

     formdataoption: function(name, cont) {
         var res = {
             Content: cont,
             Name: '',
             Pk: ''
         };
         if (name == 'AmountNotation') {
             //   rightbar.data.global.amount
         }
         if (name == 'DataNotation') {
             //   rightbar.data.global.date 
         }
         if (name == 'Regex') {
             //   rightbar.data.global.regex
         }
         if (name == 'Alternate') {
             //  rightbar.data.global.alternate
         }
         return res;
     },
     findrectofdatatype: function(nameDataType) {
         paint.objects.disactiv.forEach(function(val, i) {
             if (val.type.toLowerCase().trim() == nameDataType.toLowerCase().trim()) {
                 $(val.rectangleElement[0][0]).attr('class', 'datacheck');
             } else {
                 $(val.rectangleElement[0][0]).attr('class', 'rectdis');
             }
             $(paint.objects.activrect.rectangleElement[0][0]).attr('class', 'rectangle');

         });

     },
     setchangeselectdatatype: function(table) {
         var pages, pageStart;
         var state = false;
         pageStart = table.dt.page.info().page;
         pages = table.dt.page.info().pages;
         for (var p = 0; p <= pages; p++) {
             table.dt.page(p).draw(false);
             var val = table.object.find('tr');
             val.each(function(i, value) {
                 var $that = $(this);
                 $that.removeClass('selected');
                 if ($that.find('td').text().trim().toLowerCase() == paint.objects.activrect.type.trim().toLowerCase()) {
                     $(value).addClass('selected');
                     state = true;
                 }
             });
             if (state) break;
         }
         if (!state) {
             table.dt.page(pageStart).draw(false);
         }
     },
     setDataType: function() {
         rightbar.handlers.setchangeselectdatatype(rightbar.dataTable.set);
         rightbar.handlers.setchangeselectdatatype(rightbar.dataTable.change);
     },

     checktypeinactivrect: function() {
         var state = false;
         rightbar.dataTable.set.object.find('tr').each(function(i, val) {
             var $that = $(this);
             if ($that.find('td').text().trim().toLowerCase() == paint.objects.activrect.type.trim().toLowerCase()) {
                 state = true;
             }
         });
         return state;
     },

     finddeleterowDatatype: function() {
         return rightbar.dataTable.change.object.find('.selected').length > 0 ? rightbar.dataTable.change.object.find('.selected').text() : false;
     },

     deletedatatype: function() {
         var $selected = rightbar.dataTable.change.object.find('.selected');
         if ($selected.length > 0) {
             if (rightbar.data.global.dataType.length > 0) {
                 // delete datatype in List new create
                 var findPk;
                 rightbar.data.global.dataType.forEach(function(val) {
                     if (val.DataType == $selected.text()) findPk = { Pk: val.Pk };
                 });
                 rightbaraction.Ajax.sendDeleteDataTypeProccess(findPk);
             }
         }
     },

     initsettabstate: function() {
         rightbar.data.global.checkboxList.forEach(function(val, i) {
             val.prop('checked', false);
             var inp = val.parent().parent().parent().find('input:not([type="checkbox"])');
             var sel = val.parent().parent().parent().find('select');
             sel.attr('disabled', true);
             sel.attr('hidden', false);
             inp.attr('hidden', true);
             inp.val('');
         });
     },

     findactivcheckbox: function() {
         var res = [false];
         rightbar.data.global.checkboxList.forEach(function(val, i) {
             if (val.prop('checked') == true) {

                 if (val.attr('id') == 'checkText') {
                     res[0] = true;
                     res.push(rightbar.elements.input_new_typedata.val()); //name datatype
                     res.push('Text');
                     res.push('');
                 } else {
                     res[0] = true;
                     res.push(rightbar.elements.input_new_typedata.val()); //name datatype
                     res.push(val.parent().parent().parent().prev().text().trim()); // pref name
                     res.push(val.parent().parent().parent().find('select').find('option:selected').text()); // pref value
                 }

             }
         });
         return res; // return [boolean,name datatype,pref name, pref value]
     },
     addnewdatatype: function() {
         var obj = {
             Pk: "",
             Name: "",
             Regex: null,
             Alternate: null,
             AmountNotation: null,
             DataNotation: null,
             IsText: false
         };

         var arr = rightbar.handlers.findactivcheckbox();
         var result = rightbar.data.global.dataType.filter(function(val) {
             if (val.DataType == arr[1]) return true;
         });

         if (result.length > 0) {
             obj.Pk = result[0].Pk;
             obj.Name = result[0].DataType;

         } else {
             obj.Pk = '';
             obj.Name = arr[1];
         }
         if (arr[2] == 'Amount notation') {
             rightbar.data.global.amount.forEach(function(val) {
                 if (val.Content == arr[3]) obj.AmountNotation = val.Pk;
             });
         }
         if (arr[2] == 'Date Notation') {
             rightbar.data.global.date.forEach(function(val) {
                 if (val.Content == arr[3]) obj.DataNotation = val.Pk;
             });
         }
         if (arr[2] == 'Regex') {
             rightbar.data.global.regex.forEach(function(val) {
                 if (val.Content == arr[3]) obj.Regex = val.Pk;
             });
         }
         if (arr[2] == 'alternate') {
             rightbar.data.global.alternate.forEach(function(val) {
                 if (val.Content == arr[3]) obj.Alternate = val.Pk;
             });
         }
         if (arr[2] == 'Text') {
             obj.IsText = true;
         }
         rightbaraction.Ajax.sendSaveDataTypeProccess(obj);
     },

     createobjectdatatype: function(arr) {
         return {
             dataType: arr[1],
             pref: arr[2],
             val: arr[3]

         };
     },
     showoptiondataType: function(text) {
         if (text == 'Ibans' ||
             text == 'Vats' ||
             text == 'KeyWord' ||
             text == 'MainHeader' ||
             text == 'ExcludingTaxesAmounts' ||
             text == 'InvoiceDates' ||
             text == 'ItemNumbers' ||
             text == 'OrderNumbers' ||
             text == 'Quantities' ||
             text == 'TotalBedrags' ||
             text == 'UnitPrices' ||
             text == 'VatAmounts'
         ) return;

         rightbar.data.global.dataType.forEach(function(val) {

             if (val.DataType == text) {
                 rightbar.handlers.colorsetdataType(rightbar.handlers.findfieldelement(val));
             }
         });

     },
     findfieldelement: function(val) {

         for (var key in val) {
             if (key != 'DataType' && key != 'Pk')
                 var find = key;
             switch (find) {
                 case 'AmountNotation':
                     return [rightbar.data.global.checkboxList[0], rightbar.elements.selAmount, rightbar.handlers.findtextoption(rightbar.data.global.amount, val[key])];
                     break;
                 case 'DataNotation':
                     return [rightbar.data.global.checkboxList[1], rightbar.elements.selDate, rightbar.handlers.findtextoption(rightbar.data.global.date, val[key])];
                     break;
                 case 'Regex':
                     return [rightbar.data.global.checkboxList[2], rightbar.elements.selReg, rightbar.handlers.findtextoption(rightbar.data.global.regex, val[key])];
                     break;
                 case 'Alternate':
                     return [rightbar.data.global.checkboxList[3], rightbar.elements.selalternate, rightbar.handlers.findtextoption(rightbar.data.global.alternate, val[key])];
                     break;
                 case 'IsText':
                     return [rightbar.data.global.checkboxList[4], false];
                     break;
             }
         }
     },

     findtextoption: function(arr, Pk) {
         var res = arr.filter(function(val) {
             return Pk == val.Pk;
         });
         return res[0].Content;
     },

     colorsetdataType: function(arr) {
         arr[0].prop('checked', true).addClass('checkdat');
         if (arr[1] != false) rightbar.handlers.findactivoption(arr[1], arr[2]);
     },

     findactivoption: function(elem, text) {

         elem.find('option').each(function(val) {
             var $that = $(this);
             $that.prop('selected', false);
             if ($that.text() == text) {
                 $that.prop('selected', true);
                 $that.addClass('checkdat');
             }
         });
         elem.addClass('checkdat');
     },

     removeprefsettings: function() {
         var checkbox = rightbar.data.global.checkboxList;
         var select = rightbar.elements.wrapfieldContent.find('select');
         checkbox.forEach(function(val) {
             val.prop('checked', false);
         });
         select.each(function() {
             var $that = $(this);
             if ($that.hasClass('checkdat')) {
                 $that.removeClass('checkdat');
             }
         });
     },

     cleanoptiondataType: function() {
         rightbar.elements.fieldPref.find('.checkdat').each(function() {
             var $that = $(this);
             if ($that.is('option')) {
                 $that.prop('selected', false);
                 $that.removeClass('checkdat');
                 $that.parent().removeClass('checkdat');
             } else if ($that.is('input')) {
                 $that.prop('checked', false);
                 $that.removeClass('checkdat');
             }
         });
     },
     emmitsetchangetab: function(text, $this) {
         var $that = $this;
         var settr = rightbar.dataTable.set.object.find('tr');
         var changetr = rightbar.dataTable.change.object.find('tr');

         if (!$this.hasClass('selected')) {
             rightbar.handlers.removeselectedAll(settr);
             rightbar.handlers.removeselectedAll(changetr);
             rightbar.handlers.removeprefsettings();
             return;
         }
         rightbar.handlers.removeselectedAll(settr);
         rightbar.handlers.removeselectedAll(changetr);
         rightbar.handlers.addselected(settr, text);
         rightbar.handlers.addselected(changetr, text);
     },

     removeselectedAll: function(object) {
         object.each(function() {
             $(this).removeClass('selected');
         });
     },

     addselected: function(object, text) {
         object.find('td').each(function() {
             if ($(this).text() == text) $(this).parent().addClass('selected');
         });
     },

     toggleinputfield: function() {
         rightbar.elements.input_new_typedata.val('');
         rightbar.elements.tabSaveNameData.attr("hidden", true);
         rightbar.elements.dataTypeList1.attr("hidden", false);
         rightbar.elements.savdelData.attr("hidden", false);

     },
     clearstatePref: function() {
         var checkbox = rightbar.data.global.checkboxList;
         var select = rightbar.elements.wrapfieldContent.find('select');
         checkbox.forEach(function(val) {
             val.prop('checked', false);
         });
         select.each(function() {
             $(this).attr('disabled', true);
         });

     },
     clearinputfield: function() {
         var input = rightbar.elements.wrapfieldContent.find('input:not([type="checkbox"])');
         var select = rightbar.elements.wrapfieldContent.find('select');
         input.each(function() {
             $(this).val('').attr('hidden', true);
         });
         select.each(function() {
             $that = $(this);
             if ($that.attr('hidden')) $that.attr('hidden', false);
         });
     },
 };

 rightbar.initdoo = function() {
     rightbar.dataTable.clean(rightbar.dataTable.set.object);
     rightbar.dataTable.clean(rightbar.dataTable.change.object);
     rightbar.dataTable.init(rightbar.dataTable.set, rightbar.zag.dataTable);
     rightbar.dataTable.init(rightbar.dataTable.change, rightbar.zag.dataTable);


     rightbar.data.global.checkboxList = [rightbar.elements.checkAmount,
         rightbar.elements.checkDate,
         rightbar.elements.checkReg,
         rightbar.elements.checkalternate,
         rightbar.elements.checkText
     ];

     // set tab show
     $('#tabdata a:first').tab('show');

     //change tab show

     $('#dataType a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
         if (rightbar.handlers.currenttabchange(e)==2) {
             rightbar.handlers.inittoggle();
             rightbar.data.global.currenttab = 1;    // Change
             // KW block
             kw.handlers.changeTab(rightbar.dataTable.change.object.find('tr.selected'));
             hx.helpfunc.showElem(hx.elements.fieldPref);
              hx.helpfunc.hideElem(hx.elements.savdelDHeaderXML);
         } else if(rightbar.handlers.currenttabchange(e)==1){
             rightbar.handlers.inittoggle();
             rightbar.handlers.initsettabstate();
             rightbar.data.global.currenttab = 0;    //Set
             hx.helpfunc.showElem(hx.elements.fieldPref);
             kw.handlers.setTab();
             hx.helpfunc.hideElem(hx.elements.savdelDHeaderXML);
         }else{      
            rightbar.data.global.currenttab = 3;                          //Tab Header XML
            hx.helpfunc.hideElem(hx.elements.fieldPref);
            hx.helpfunc.showElem(hx.elements.savdelDHeaderXML);

      
         }
     });

     rightbar.elements.changeAmount.on('click', function(e) {
         rightbar.handlers.addnewpref(e);
     });
     rightbar.elements.changeDate.on('click', function(e) {
         rightbar.handlers.addnewpref(e);
     });
     rightbar.elements.changeRegex.on('click', function(e) {
         rightbar.handlers.addnewpref(e);
     });
     rightbar.elements.changeAlternate.on('click', function(e) {
         rightbar.handlers.addnewpref(e);
     });

     // tab set

     rightbar.dataTable.set.object.on('click', 'tr', function(e) {
         var $that = $(this);

         if ($that.hasClass('selected')) {
             $that.removeClass('selected');
             rightbar.handlers.emmitsetchangetab($that.find('td').text(), $that);
             return;
         }
         if (!rightbar.handlers.checktypeinactivrect()) {
             rightbar.handlers.clearstatePref();
             rightbar.handlers.cleanoptiondataType();
             rightbar.handlers.showoptiondataType($that.addClass('selected').find('td').text());
         } else {
             rightbar.handlers.findrectofdatatype($that.addClass('selected').find('td').text());
             rightbar.handlers.clearstatePref();
             rightbar.handlers.cleanoptiondataType();
             rightbar.handlers.showoptiondataType($that.addClass('selected').find('td').text());
         }
         rightbar.handlers.emmitsetchangetab($that.find('td').text(), $that);
     });

     // page fix set =>change
     rightbar.dataTable.set.object.on('page.dt', function() {
         var info = rightbar.dataTable.set.dt.page.info().page;
         rightbar.dataTable.change.dt.page(info).draw(false);
     });
     // page fix change => set
     rightbar.dataTable.change.object.on('page.dt', function() {
         var info = rightbar.dataTable.change.dt.page.info().page;
         rightbar.dataTable.set.dt.page(info).draw(false);
     });

     //tab shange

     rightbar.dataTable.change.object.on('click', 'tr', function(e) {
         var $that = $(this);
         if ($that.hasClass('selected')) {
             $that.removeClass('selected');
         }

         if (!rightbar.handlers.checktypeinactivrect()) {
             rightbar.handlers.clearstatePref();
             rightbar.handlers.cleanoptiondataType();
             rightbar.handlers.showoptiondataType($that.addClass('selected').find('td').text());
         } else {
             rightbar.handlers.findrectofdatatype($that.addClass('selected').find('td').text());
             rightbar.handlers.clearstatePref();
             rightbar.handlers.cleanoptiondataType();
             rightbar.handlers.showoptiondataType($that.addClass('selected').find('td').text());
         }

         //KW block 

         kw.handlers.changeTabSetNew(rightbar.dataTable.change.object, $that);

         rightbar.handlers.emmitsetchangetab($that.find('td').text(), $that);

     });

     // add datatype rectangle

     rightbar.elements.btn_apply_not.on('click', function(e) {
         e.preventDefault();
         var selected = rightbar.dataTable.set.dt.$('tr.selected');
         if (selected.length == 0) return;
         // if (paint.objects.activrect.type == '' || paint.objects.activrect.type == 'TableDatas') { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         applymodal.handlers.show('Add type "' + selected.find('td').text() + '" in field ', 7);
         //   }
     });

     // add type in rect

     applymodal.elements.apply_apply_typedata.on('click', function() {
         var selected = rightbar.dataTable.set.dt.$('tr.selected');
         if (selected.length == 0) return;
         var DataTypeName = selected.find('td').text();
         if (DataTypeName == 'MainHeader') { // mainHeader clear prew
             paint.objects.disactiv.forEach(function(val, i) {
                 if (val.type == 'MainHeader') {
                     paint.objects.disactiv[i].type = 'TableDatas';
                 }
             });
         }
         paint.objects.activrect.type = DataTypeName;
         rightbar.data.global.dataType.forEach(function(val) {
             if (val.DataType == paint.objects.activrect.type) {
                 paint.objects.activrect.Pk = val.Pk;
             }
         });

         paint.objects.disactiv.forEach(function(val, i) {
             if (val.id == paint.objects.activrect.id) {
                 val.type = paint.objects.activrect.type;
                 val.Pk = paint.objects.activrect.Pk;
             }
         });
         applymodal.handlers.close();

     });


     // btn dell datatype tabs change=>open modal


     rightbar.elements.btn_del_type.on('click', function(e) {
         var selected = rightbar.dataTable.change.dt.$('tr.selected').find('td').text();
         e.preventDefault();
         if (kw.state) return; //kw block
         if (
             selected == "Vats" ||
             selected == "Ibans" ||
             selected == "KeyWord" ||
             selected == "MainHeader" ||
             selected == "ExcludingTaxesAmounts" ||
             selected == "InvoiceDates" ||
             selected == "ItemNumbers" ||
             selected == "OrderNumbers" ||
             selected == "Quantities" ||
             selected == "TotalBedrags" ||
             selected == "UnitPrices" ||
             selected == "VatAmounts"
         ) {
             return;
         }
         if (!rightbar.handlers.finddeleterowDatatype()) {
             return;
         } else {
             applymodal.handlers.show('Delete Type ' + rightbar.handlers.finddeleterowDatatype(), 5);
         }
     });

     applymodal.elements.apply_del_typedata.on('click', function() {
         rightbar.handlers.deletedatatype();
         applymodal.handlers.close();

     });

     //-----------------------------------------------------------------------------



     rightbar.elements.btn_add_type.on('click', function(e) {
         var selected = rightbar.dataTable.change.dt.$('tr.selected').find('td').text();
         e.preventDefault();
         if (kw.state) return; //kw block
         if (
             selected == "Vats" ||
             selected == "Ibans" ||
             selected == "KeyWord" ||
             selected == "MainHeader" ||
             selected == "ExcludingTaxesAmounts" ||
             selected == "InvoiceDates" ||
             selected == "ItemNumbers" ||
             selected == "OrderNumbers" ||
             selected == "Quantities" ||
             selected == "TotalBedrags" ||
             selected == "UnitPrices" ||
             selected == "VatAmounts"
         ) {
             return;
         }


         rightbar.elements.input_new_typedata.val(rightbar.handlers.findactivdatatype().change.Name);
         rightbar.elements.tabSaveNameData.attr("hidden", false);
         rightbar.elements.dataTypeList1.attr("hidden", true);
         rightbar.elements.savdelData.attr("hidden", true);
         rightbar.elements.input_new_typedata.focus();

     });

     //-----------------------------------------------------------------------------------------
     // open modal window =>    save datatype new

     rightbar.elements.btn_save_datatype.on('click', function(e) {
         e.preventDefault();
         if (rightbar.elements.input_new_typedata.val() != '' && rightbar.handlers.findactivcheckbox()[0]) {
             e.preventDefault();
             applymodal.handlers.show('Save type ' + rightbar.elements.input_new_typedata.val(), 6);

         }

     });


     // add new typedata

     applymodal.elements.apply_save_typedata.on('click', function() {

         //rightbar.handlers.findactivcheckbox();

         rightbar.handlers.addnewdatatype();

         rightbar.handlers.toggleinputfield();

         applymodal.handlers.close();

     });
     //-----------------------------------------------------------------------------------------

     // cancel btn 

     rightbar.elements.btn_cancel_datatype.on('click', function() {

         rightbar.handlers.toggleinputfield();

     });

     //--------------------------------------------------------------------------------------------

     // block control checkbox

     rightbar.data.global.checkboxList.forEach(function(val, i) {
         val.on('click', function() {
             if (rightbar.data.global.currenttab == 0) {
                 val.prop('checked', false);
                 return;
             }
             var $that = $(this);
             rightbar.handlers.clearinputfield();
             rightbar.elements.fieldPref.find('.checkdat').removeClass('checkdat');
             rightbar.data.global.checkboxList.forEach(function(val, i) {
                 if (val.attr('id') != $that.attr('id')) {
                     val.prop('checked', false);
                     if (val.attr('id') != 'checkText') val.parent().parent().parent().find('select').attr('disabled', true);
                 } else {
                     if (val.attr('id') != 'checkText') val.parent().parent().parent().find('select').attr('disabled', false);
                     val.prop('checked', true);
                 }

             });

         });

     });



     rightbar.elements.deleteAmount.on('click', function() {
         if (rightbar.elements.selAmount.attr('hidden') != 'hidden' && rightbar.elements.selAmount.attr('disabled') != 'disabled') {
             var Pkdelete = rightbar.elements.selAmount.find('option:selected').val();
             rightbaraction.Ajax.sendDeletePref(temp.routes.sendDeleteAmountUrl, { Pk: Pkdelete }, rightbaraction.handlers.sendDeleteAmountsuccess, rightbaraction.handlers.sendDeleteAmounterror);
         }
     });

     rightbar.elements.deleteDate.on('click', function() {
         if (rightbar.elements.selDate.attr('hidden') != 'hidden' && rightbar.elements.selDate.attr('disabled') != 'disabled') {
             var Pkdelete = rightbar.elements.selDate.find('option:selected').val();
             rightbaraction.Ajax.sendDeletePref(temp.routes.sendDeleteDateUrl, { Pk: Pkdelete }, rightbaraction.handlers.sendDeleteDatesuccess, rightbaraction.handlers.sendDeleteDateerror);
         }
     });
     rightbar.elements.deleteRegex.on('click', function() {
         if (rightbar.elements.selReg.attr('hidden') != 'hidden' && rightbar.elements.selReg.attr('disabled') != 'disabled') {
             var Pkdelete = rightbar.elements.selReg.find('option:selected').val();
             rightbaraction.Ajax.sendDeletePref(temp.routes.sendDeleteRegexUrl, { Pk: Pkdelete }, rightbaraction.handlers.sendDeleteRegexsuccess, rightbaraction.handlers.sendDeleteRegexerror);
         }
     });
     rightbar.elements.deleteAlternate.on('click', function() {
         if (rightbar.elements.selalternate.attr('hidden') != 'hidden' && rightbar.elements.selalternate.attr('disabled') != 'disabled') {
             var Pkdelete = rightbar.elements.selalternate.find('option:selected').val();
             rightbaraction.Ajax.sendDeletePref(temp.routes.sendDeleteAlternateUrl, { Pk: Pkdelete }, rightbaraction.handlers.sendDeleteAlternatesuccess, rightbaraction.handlers.sendDeleteAlternateerror);
         }
     });




     /*
         $('#optionwiev').on('change', function(e) {
             console.log(($(this.options[this.selectedIndex])));
         })
         $('select').each(function() {
             $(this).on('change', function() {
                 var newactiv = $(this.options[this.selectedIndex]);
                 var oldactiv = $(this).find('option:selected');
                 console.log(newactiv);
                 console.log(oldactiv);
                 console.log($("#optionwiev option:selected").text());
             })
         })


     */
 };



 rightbar.init();
 rightbar.initdoo();