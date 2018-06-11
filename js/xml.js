var xml={};
xml.data={
   headerXML:'<?xml version="1.0" encoding="UTF-8"?>' 
}
xml.handlers={
    infoSir:function(date,nameTemp){
        return '<Info><ProcessingDate>'+date+'</ProcessingDate><TemplateName>'+nameTemp+'</TemplateName></Info>';
    },
    PageSir:function(page){
      var str=''
        page.forEach(function(val,i) {
            var st=xml.handlers.openpageSir(i)+ 
             xml.handlers.headerSir(val.DataTypes)+
              xml.handlers. tableBodySir(val.TableLines) +
              xml.handlers.closepageSir(i);
              str+=st;
        });
        return str;
    },
    openpageSir:function(i){
        return '<Page'+(i+1)+'>';
    },
    closepageSir:function(i){
        return '</Page'+(i+1)+'>';
    },
    headerSir:function(arrHeader){
        var init='';
        if(arrHeader.length==0) return  '<Headers>Empty</Headers>'
        arrHeader.forEach(function(val,i){
          init+='<'+ val.Name+'>'+val.Data+'</'+val.Name+'>';
        })
      return '<Headers>'+init+'</Headers>'
    },
    tableBodySir:function(arrLines){
        if(arrLines.length==0) return '';
         var str= xml.handlers.tableHeaderSir(arrLines[0]);
        arrLines.forEach(function(val,i){
            var st='';
           st+= xml.handlers.tableSirLines(val);
           str+=st;
        })
        return '<table>'+str+'</table>';
      },
    tableHeaderSir:function(arr){
        var str='';
        arr.Сolumns.forEach(function(val){
            str+='<th>'+val.Header+'</th>'
        })
      return '<tr>'+str+'</tr>'
    },
    tableSirLines:function(arr){
        var str='';
        arr.Сolumns.forEach(function(val){
            str+='<td>'+val.Data+'</td>'
        })
         return '<tr>'+str+'</tr>'
            },
};
xml.init={
    getData:function(data){
    return xml.data.headerXML+ xml.handlers.infoSir(data.ProcessingDate,data.TemplateName)+'<Pages>'+ xml.handlers.PageSir(data.Pages)+'</Pages>';  
    }
}