var kw={};
kw.data= [
        'ExcludingTaxesAmounts',
        'InvoiceDates',
        'ItemNumbers',
        'OrderNumbers',
        'QuantitysLists',
        'TotalBedrags',
        'UnitPrices',
        'VatAmounts'
         ];
kw.state=false;
kw.elements={}
kw.initEl= function(){
    kw.elements.absolutePos={ object:$('#absolutePos'),id:'#absolutePos'};
    kw.elements.kwContent={ object:$('#kwContent'),id:'#kwContent'};
    kw.elements.btn_edit_kw={object:$('#btn_edit_kw'),id:'#btn_edit_kw'};
    kw.elements.textarea_label ={object:$('#textarea_label'),id:'#textarea_label'};
    kw.elements.textarea_kw={object:$('#textarea_kw'),id:'#textarea_kw'};
}


kw.handlers={
    hideWrapfieldContentToggle:function(){
        var state= rightbar.elements.wrapfieldContent.attr('hidden');
        (state=='hidden')? state=false :state=true;
        rightbar.elements.wrapfieldContent.attr('hidden',state);
    },
    hideabsolutePosToggle:function(){
        var state= kw.elements.absolutePos.object.attr('hidden');
        (state=='hidden')? state=false :state=true;
        kw.elements.absolutePos.object.attr('hidden',state);
    },
    hidesaveDataType:function(){
        var state= rightbar.elements.saveDataType.attr('hidden');
        (state=='hidden')? state=false :state=true;
        rightbar.elements.saveDataType.attr('hidden',state);
    },

    hidekwContentToggle:function(){
        var state=kw.elements.kwContent.object.attr('hidden');
        (state=='hidden')? state=false :state=true;
        kw.elements.kwContent.object.attr('hidden',state);
    },
    findKeyWord:function(data){
      return data.find('td').text();
    },

    compareNeedKw:function(text){
        var state=false;
        kw.data.forEach(function(val,i) {
            if(text==val) state=true;
        });
        return state;
    },
    textarea:{
        clearVal:function(){
            kw.elements.textarea_kw.object.val('')
        },
        setVal:function(text){
            kw.elements.textarea_kw.object.val(text);
        },
        getVal:function(){
           return  kw.elements.textarea_kw.object.val();
        },
    },
    label:{
        clearLabel:function(){
            kw.elements.textarea_label.object.text('');
        },
        setText:function(text){
            kw.elements.textarea_label.object.text(text);
        },
        getLabel:function(){
          return  kw.elements.textarea_label.object.text();
        }
    },
    changeTabSetNew:function(table,that){
        var KW=that.find('td').text().trim();

     if( kw.handlers.compareNeedKw(kw.handlers.findKeyWord(that)) && !kw.state )  {     //KW=true  state=of

            kw.handlers.textarea.clearVal();
            kw.handlers.label.clearLabel();
            kw.handlers.hideabsolutePosToggle();
            kw.handlers.hideWrapfieldContentToggle();
            kw.handlers.hidesaveDataType();
            kw.handlers.hidekwContentToggle();       
            kw.state=!kw.state;

            //AJAX NEED    kw.ajax.getKW(/*data*/)
             


     }else if(!kw.handlers.compareNeedKw(kw.handlers.findKeyWord(that)) && kw.state) {   //KW =false  state=on
            kw.handlers.textarea.clearVal();
            kw.handlers.label.clearLabel();
            kw.handlers.hideabsolutePosToggle();
            kw.handlers.hideWrapfieldContentToggle();
            kw.handlers.hidesaveDataType();
            kw.handlers.hidekwContentToggle();      
            kw.state=!kw.state;

     }else if(kw.handlers.compareNeedKw(kw.handlers.findKeyWord(that)) && kw.state ){    //KW=true satet=on
        kw.handlers.textarea.clearVal();
        kw.handlers.label.clearLabel();

        //AJAX NEED    kw.ajax.getKW(/*data*/)

     }

    },

    changeTab:function(selected){
        if(selected.length ==1 && !kw.state && kw.handlers.compareNeedKw(kw.handlers.findKeyWord(selected))){
            kw.handlers.textarea.clearVal();
            kw.handlers.label.clearLabel();
            kw.handlers.hideabsolutePosToggle();
            kw.handlers.hideWrapfieldContentToggle();
            kw.handlers.hidesaveDataType();
            kw.handlers.hidekwContentToggle();       // how KW
            kw.state=!kw.state;



           //AJAx need      kw.ajax.getKW(/*data*/)

        }
    },

    setTab:function(){
        if(kw.state){     // edit KW on 
            kw.handlers.hideabsolutePosToggle();
            kw.handlers.hideWrapfieldContentToggle();
            kw.handlers.hidesaveDataType();
            kw.handlers.hidekwContentToggle();        // how KW
            kw.state=!kw.state;
  }

    },
    splitData:function(data){
      var arr=data.split(/\n|\;|\,|\s/);
     arr= arr.filter(function(val,i){
          return val != "" 
      })
       return arr;
    },
  
}

kw.ajax={
    getKW: function(data) {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: temp.root.getKWProccessUrl,                             // need add url  =>in app.js
                type: "POST",

                data: JSON.stringify(data),
                dataType: 'json',
                success: function(data, textStatus, jqXHR) {
                 kw.ajax.getKWDone(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                },
                beforeSend: function() {
                },
                complete: function() {
                  
                }
            });

    },
    editKW:function(data){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: temp.root.editKWProccessUrl,      // need add url  to edit KW =>in app.js
            type: "POST",

            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
              kw.ajax.editKWDone(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            },
            beforeSend: function() {
            },
            complete: function() {
              
            }
        });

    },
    getKWDone:function(data){

    },
    editKWDone:function(data){

    }



}

kw.initEv=function(){
    kw.elements.btn_edit_kw.object.on('click',function(e){
        e.preventDefault();
        var labelKw=kw.handlers.label.getLabel();
        var data=kw.handlers.splitData(kw.handlers.textarea.getVal());
         console.log(data)

        // add Ajax edit KW
        
    })

}





kw.initEl();
kw.initEv()
