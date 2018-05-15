// resize work window
var resize = {};

resize.data = {
    prew: {
        widthimg: '',
        height: ''
    },
    next: {
        width: '',
        height: ''
    },
    compareOldColorCreate:'',
};

resize.handlers = {
    debounce: function(func, wait, immediate) {
        var timeout;
        return function() {
            var defs = d3.select("defs");
            var svg = d3.select('svg');
            if (svg[0][0] != null && defs[0][0] == null) {
                if (!paint.zoom.global.state) {
                    svg.append("defs")
                        .append("filter")
                        .attr("id", "blur")
                        .append("feGaussianBlur")
                        .attr("stdDeviation", 5);
                    svg.attr("filter", "url(#blur)");
                }
            }
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    colorSetAutoCreateCollum:function(arr){
       arr.forEach(function(elemOld,i){
        var count=0;
            var oldCoord= resize.handlers.parsedataservercord(elemOld); // need absolute coord

                paint.objects.disactiv.forEach(function(elemNew,j){
                    if(count!=0) return;
                    var newCoord=elemNew.rectData;
            
                    if( Math.abs(oldCoord[0].x-newCoord[0].x)<1       &&   
                        Math.abs(oldCoord[1].x-newCoord[1].x)<1       && 
                        Math.abs(oldCoord[0].y-newCoord[0].y)<1       &&
                        Math.abs(oldCoord[1].y-newCoord[1].y)<1 )        
                        
                        {paint.objects.disactiv[j].autoCreate='rectauto';count++} ;
                })

        })

    },
   
     parsedataservercord: function(cord) {
            return [{ x: resize.handlers.convertcordabsx(cord.X0.X, paint.objects.global.wh), y: resize.handlers.convertcordabsy(cord.X0.Y, paint.objects.global.wh) }, { x: resize.handlers.convertcordabsx(cord.X1.X, paint.objects.global.wh), y: resize.handlers.convertcordabsy(cord.X1.Y, paint.objects.global.wh) }];
    
    
        },
    
    convertcordabsx: function(cordx, arrWH) {
            return (cordx * arrWH[0]) / 100;
    
        },
     convertcordabsy: function(cordy, arrWH) {
            return (cordy * arrWH[1]) / 100;
        },


    grabCreateColorRect:function(){
      return  resize.data.compareOldColorCreate.filter(function(el){
         return  el.autoCreate=="rectauto";
      })



    },
    percentCoord:function(arr){
        return arr.map(function(el){
           return  temp.helpfunc.percentchangecord(el.rectData);    
        })
    }


};
resize.logic = {
    findWHImg: function(el) {
        return [el.width(), el.height()];
    },
};

$(window).on("resize", resize.handlers.debounce(function() {
    if (paint.objects.global.wh.length < 1) return;
    if (paint.zoom.global.state) return;
   if(resize.data.compareOldColorCreate=="") resize.data.compareOldColorCreate=paint.objects.disactiv.map(function(obj) { return $.extend({}, obj); });
   resize.data.prew.widthimg = paint.objects.global.wh[0];
    resize.data.prew.height = paint.objects.global.wh[1];
    resize.data.next.widthimg = resize.logic.findWHImg($('#dynamicImg'))[0];
    resize.data.next.height = resize.logic.findWHImg($('#dynamicImg'))[1];
    var grabDataprew = temp.helpfunc.createresponsedata().Template;
    var arrDataColorCreateCollums= resize.handlers.grabCreateColorRect();
    var dataCoordColorChangePercent=resize.handlers.percentCoord(arrDataColorCreateCollums);
    paint.zoom.handlers.removesvg();
    grabDataprew.Pages.forEach(function(element, i) {
        grabDataprew.Pages[i].OnlyImages = temp.elementLeftBar.Templaite.OnlyImages[i];
        grabDataprew.Pages[i].OnlyText = temp.elementLeftBar.Templaite.OnlyText[i];
    });
    // clear global scope
    temp.helpfunc.clearglobalstate(true);
    temp.control.templaite.renderDataListPaint(grabDataprew.Pages);
    paint.objects.global.wh[0] = resize.data.next.widthimg;
    paint.objects.global.wh[1] = resize.data.next.height;
    paint.objects.datafromserver.arrdata = paint.objects.datafromserver.datafromserverpage[temp.DataWorkspace.activpage];
    paint.init();
    resize.handlers.colorSetAutoCreateCollum(dataCoordColorChangePercent);
    resize.data.compareOldColorCreate='';
      // set color autocreate collum right click  after resize
    db.handler.setColorAutoCreate();
}, 200));