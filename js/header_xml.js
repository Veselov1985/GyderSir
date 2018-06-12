var hx={};

hx.data={
    list:[],
    tableList:[],
}


 hx.elements={};

  hx.init=function(){
    hx.elements.header_xml=$('#header_xml');
    hx.elements.HeaderXmlList=$('#HeaderXmlList');
    hx.dataTable.set.object=$('#table_xml');
    hx.elements.fieldPref=$('#fieldPref');
    // btn
    hx.elements.savdelDHeaderXML=$('#savdelDHeaderXML'); // block btn
    hx.elements.btn_apply_xml=$('#btn_apply_xml');
    hx.elements.btn_new_xml=$('#btn_new_xml');
    hx.elements.btn_del_xml=$('#btn_del_xml');


    hx.elements.editXML=$('#editXML'); // block edit xml
    hx.elements.textarea_label_xml=$('#textarea_label_xml'); // labek xml
    hx.elements.textarea_xml=$('#textarea_xml');  // textArea Xml Header


    hx.elements.edit_XML_btn=$('#edit_XML_btn');   //btn block edit textarea

    hx.elements.btn_edit_xml=$('#btn_edit_xml');    // btn edit xml Header

  



    // block btn saveNewXml
    hx.elements.saveNewXml=$('#saveNewXml');
    hx.elements.btn_xml_ok=$('#btn_xml_ok');
    hx.elements.btn_new_xml_cancel=$('#btn_new_xml_cancel');

    //input new

    hx.elements.tabSaveNameXML=$('#tabSaveNameXML');
    hx.elements.input_new_HEaderXml=$('#input_new_HEaderXml');


  };

  hx.dataTable = {
    set: {
        object: {},
        dt: {},
        activ: {},
    },
    clean: function() {
        if (!$.isEmptyObject(hx.dataTable.set.dt)) {
            hx.dataTable.set.dt.destroy();
            hx.dataTable.set.object.find('tbody').remove();
            hx.dataTable.set.object.find('thead').remove();
            hx.dataTable.set.dt = {};
        }
    },

    init: function(header_xml_list) {
       hx.dataTable.clean();
       hx.dataTable.set.dt =  hx.dataTable.set.object.DataTable({
            "pagingType": 'simple_numbers',
            "order": [],
            "lengthMenu": [
                [13],
                [13]
            ],
            "select": true,
            "responsive": true,
            "data":  header_xml_list,
            "columns": [{
                title: "Header XML"
            }],
            "dom": "t<'clear'><'row'<'col-md-12'p>>",
        });
    },

  };


  hx.helpfunc={
      clearListTable:function(){
        hx.data.tableList=[];
      },
      clearListData:function(){
        hx.data.list=[];
      },
      hideElem:function(elem){
        elem.attr('hidden','hidden');

      },
      showElem:function(elem){
        elem.attr('hidden',false);
      },
      clearInput:function(){
        hx.elements.input_new_HEaderXml.val('');
      },
      getInput:function(){
          return hx.elements.input_new_HEaderXml.val(); 
      },
      setInput:function(val){
        hx.elements.input_new_HEaderXml.val(val);
      },
      splitData: function(data) {
        var arr = data.split(/\n|\;|\,/);
        arr = arr.filter(function(val, i) {
            return val != "";
        });
        return arr;
    },
    setNewLineTextArea: function(text) {
        if (text == null) return '';
        return text.split(',').map(function(val) {
            return val.trim().replace(/\n/, '');
        }).join(',\n');
    },
    clearTextArea:function(){
        hx.elements.textarea_xml.val('');
    },
    getValTextArea:function(){
        return hx.elements.textarea_xml.val();
    },
    setTextArea:function(str){
        hx.elements.textarea_xml.val(hx.helpfunc.setNewLineTextArea(str));
    },
    clearLabel:function(){
        hx.elements.textarea_label_xml.text(':');
    },
    setLabel:function(text){
        hx.elements.textarea_label_xml.text(text+':');

    }


  };



  hx.handlears={
    createListTable:function(arr){
        if(arr.length>0){
        arr.forEach(function(val) {
            hx.data.tableList.push(val.Data);
        });
    }
    },
    createListData:function(arr){
        if(arr.length>0){
            hx.data.list =hx.data.list.concat(arr)         
        }
    },

  };

  hx.action=function(){

    hx.elements.btn_new_xml.on('click',function(){
      hx.helpfunc.hideElem(hx.elements.HeaderXmlList);
      hx.helpfunc.showElem( hx.elements.tabSaveNameXML);
      hx.helpfunc.hideElem( hx.elements.savdelDHeaderXML);
      hx.helpfunc.showElem(hx.elements.saveNewXml);  
      hx.helpfunc.hideElem( hx.elements.edit_XML_btn);
    })

    hx.elements.btn_new_xml_cancel.on('click',function(){
        hx.helpfunc.clearInput();
        hx.helpfunc.showElem(hx.elements.HeaderXmlList);
        hx.helpfunc.hideElem(hx.elements.tabSaveNameXML);
        hx.helpfunc.showElem(hx.elements.savdelDHeaderXML);
        hx.helpfunc.hideElem(hx.elements.saveNewXml); 
        hx.helpfunc.showElem(hx.elements.edit_XML_btn);

    })

    hx.elements.btn_xml_ok.on('click',function(e){
        e.preventDefault();
        var $input= hx.helpfunc.getInput();
        var $textarea= hx.helpfunc.splitData(hx.helpfunc.getValTextArea()).join(',');
        if( $input.trim()!=''){
            hx.ajax.editNewHeader({Name:$input,Data:$textarea})
        } else{
            // add modal Info 
        }
        hx.helpfunc.clearInput();
        hx.helpfunc.showElem(hx.elements.HeaderXmlList);
        hx.helpfunc.hideElem(hx.elements.tabSaveNameXML);
        hx.helpfunc.showElem(hx.elements.savdelDHeaderXML);
        hx.helpfunc.hideElem(hx.elements.saveNewXml);  
     hx.helpfunc.showElem(hx.elements.edit_XML_btn);
        hx.helpfunc.clearTextArea();
    })


    hx.elements.btn_del_xml.on('click',function(){

      var $selected = hx.dataTable.set.dt.$('tr.selected');
      if($selected.length!=0){
        var text=$selected.find('td').text().trim();
        hx.ajax.deleteHeader({Name:$selected,Data:null});
      }else{
          // option can show modal Info
      }
    })


    hx.elements.btn_apply_xml.on('click',function(){
        var $selected = hx.dataTable.set.dt.$('tr.selected');
        if($selected.length!=0){
            // logic add Header  Xml in rect
        }else {
            // option show modal Info
        }

    })

  }




  hx.ajax={
getAllHeader:function(datas){
    $.ajax({
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url:temp.routes.getallheaderdatatypesUrl,
        type: "POST",
        data: JSON.stringify(datas), 
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
          hx.ajax.getAllHeaderSuccess(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            hx.ajax.getAllHeaderError(jqXHR);
        },
        beforeSend: function() {},
        complete: function() {}
    });
},
deleteHeader:function(datas){

    $.ajax({
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url:temp.routes.deleteheaderdatatypeUrl,
        type: "POST",
        data: JSON.stringify(datas),
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
           hx.ajax.deleteHeaderSuccess(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            hx.ajax.deleteHeaderError(jqXHR);
        },
        beforeSend: function() { },
        complete: function() { }
    });

},
editNewHeader:function(datas){
    $.ajax({
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: temp.routes.createorupdateheaderdatatypeUrl,
        type: "POST",
        data: JSON.stringify(datas), 
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
           hx.ajax.editNewHeaderSuccess(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            hx.ajax.editNewHeaderError(jqXHR);
        },
        beforeSend: function() {},
        complete: function() {}
    });


},
getAllHeaderSuccess:function(data){
    hx.helpfunc.clearListTable(); // clear table data
    hx.helpfunc.clearListData();  // clear HeaderXml data
    hx.handlears.createListData(data);
    hx.handlears.createListTable(data);
    hx.dataTable.init(hx.data.tableList);
    if($('#tabdata a:first').attr('class').indexOf('active')!=-1){
        hx.elements.header_xml.removeClass('active');
    }
},
getAllHeaderError:function(data){
    console.log(data);
},
deleteHeaderSuccess:function(data){
    if(data){
        hx.helpfunc.clearLabel();  // option clear label
        hx.helpfunc.clearTextArea();  // option clear TextArea
        hx.ajax.getAllHeader(null);
    }else{
        console.log('Header XML Not Deleted')
    }

},
deleteHeaderError:function(data){
    console.log(data);
},
editNewHeaderSuccess:function(data){
    if(data){
        hx.ajax.getAllHeader(null);
    }else{
    console.log(data);
    }
    hx.helpfunc.clearInput();
    hx.helpfunc.showElem(hx.elements.HeaderXmlList);
    hx.helpfunc.hideElem(hx.elements.tabSaveNameXML);
    hx.helpfunc.showElem(hx.elements.savdelDHeaderXML);
    hx.helpfunc.hideElem(hx.elements.saveNewXml); 



   
}, 
editNewHeaderError:function(data){
    console.log(data)
}


  }


  hx.init();
  hx.action();


