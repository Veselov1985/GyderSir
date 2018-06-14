var xml={};
xml.data={
   headerXML:'<?xml version="1.0" encoding="UTF-8"?>' 
}
xml.handlers={
    infoSir:function(date,nameTemp){
        return '<Info><ProcessingDate>'+date+'</ProcessingDate><TemplateName>'+nameTemp+'</TemplateName></Info>';
    },
    PageSir:function(page){
      var str=xml.handlers.headerSir(page[0].DataTypes);
        page.forEach(function(val,i) {
            var st=xml.handlers. tableBodySir(page);
              str+=st;
        });
        return str;
    },
    headerSir:function(arrHeader){
        var init='';
        if(arrHeader.length==0) return  '<Headers>Empty</Headers>'
        arrHeader.forEach(function(val,i){
          init+='<'+ val.Name+'>'+val.Data+'</'+val.Name+'>';
        })
      return '<Headers>'+init+'</Headers>'
    },
    tableBodySir:function(page){
       var str=xml.handlers.tableSirLines(page)
        return '<Lines>'+str+'</Lines>';
      },
    tableSirLines:function(page){
        var str='';
   page.forEach(function(val,i){
    val.TableLines.forEach(function(v,j){
            str+='<Line>'
            v.Columns.forEach(function(d,k){
            str+='<'+d.Header +'>'+d.Data+'</'+d.Header +'>'
        })
        str+='</Line>'
    })
   })
      return str;
     },
};
xml.init={
    getData:function(data){
    return xml.data.headerXML+ xml.handlers.infoSir(data.ProcessingDate,data.TemplateName)+ xml.handlers.PageSir(data.Pages);  
    },
}