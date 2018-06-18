var xml={};
xml.data={
   headerXML:'<?xml version="1.0" encoding="UTF-8"?>'
}
xml.handlers={
    deleteSpase:function(str){
        if(typeof str!='string') str='';
        return str.trim().replace(/\n/,'');
    },
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
          init+='<'+ xml.handlers.deleteSpase(val.Name).replace(/\s/,'')+'>'+xml.handlers.deleteSpase(val.Data)+'</'+xml.handlers.deleteSpase(val.Name).replace(/\s/,'')+'>';
        });
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
            str+='<'+xml.handlers.deleteSpase(d.Header) +'>'+xml.handlers.deleteSpase(d.Data)+'</'+xml.handlers.deleteSpase(d.Header)+'>'
        });
        str+='</Line>'
    });
   });
      return str;
     },
};
xml.init={
    getData:function(data){
    return xml.data.headerXML+'<GliderSir>'+xml.handlers.infoSir(data.ProcessingDate,data.TemplateName)+ xml.handlers.PageSir(data.Pages)+'</GliderSir>';  
    },
}