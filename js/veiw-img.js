 var veiw = {
     state: 'all',
 };

 veiw.elements = {};

 veiw.handlers = {

     removeselected: function() {
         veiw.elements.optionwiev.find('option').each(function() {
             $(this).removeAttr('selected');
         });
     },
     addselected: function(val) {
         veiw.handlers.removeselected();
         if (val == 'all') {
             veiw.state = 'all';
             veiw.elements.optionwiev_all.attr('selected', true);
             veiw.handlers.svgshow();
         }
         if (val == 'text') {
             veiw.state = 'text';
             veiw.elements.optionwiev_text.attr('selected', true);
             veiw.handlers.textonlyshow();

         }
         if (val == 'img') {
             veiw.state = 'img';
             veiw.elements.optionwiev_img.attr('selected', true);
             veiw.handlers.imgonlyshow();
         }
     },

     textonlyshow: function() {
         veiw.handlers.clearimg();
         // veiw.handlers.svghidden();
         veiw.handlers.addimg(temp.elementLeftBar.Templaite.OnlyText[temp.DataWorkspace.activpage]);
     },

     imgonlyshow: function() {
         veiw.handlers.clearimg();
         // veiw.handlers.svghidden();
         veiw.handlers.addimg(temp.elementLeftBar.Templaite.OnlyImages[temp.DataWorkspace.activpage]);
     },

     svgshow: function() {
         veiw.handlers.clearimg();
         var img = $('<img unselectable="on" class="img-fluid w-100" id="dynamicImg">');
         img.attr('src', temp.DataWorkspace.images[temp.DataWorkspace.activpage]).attr({
             "ondrag": "return false",
             "ondragdrop": "return false",
             "ondragstart": "return false",
             "onmousedown": "return false",
         });
         img.appendTo(paint.zoom.elements.pdfWindow);
     },

     addimg: function(href) {
         var img = $('<img unselectable="on" class="img-fluid w-100" id="dynamicImg">');
         img.attr('src', href).attr({
             "ondrag": "return false",
             "ondragdrop": "return false",
             "ondragstart": "return false",
             "onmousedown": "return false",

         });
         img.appendTo(paint.zoom.elements.pdfWindow);
     },

     clearimg: function() {
         $('#dynamicImg').remove();
     },
 };

 veiw.init = function() {
     veiw.elements.optionwiev = $('#optionwiev');
     veiw.elements.optionwiev_all = $('#optionwiev_all');
     veiw.elements.optionwiev_text = $('#optionwiev_text');
     veiw.elements.optionwiev_img = $('#optionwiev_img');
     veiw.elements.optionwiev.on('change', function(e) {
         if (temp.elementLeftBar.Templaite.OnlyText.length == 0 && temp.elementLeftBar.Templaite.OnlyImages.length == 0) return;
         veiw.handlers.addselected(e.target.value);
     });
 };

 veiw.init();