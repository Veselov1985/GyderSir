var paint = {};
paint.abs = {};

paint.statefix = false;

paint.statefix = {
    mousedown: false,
    mousemove: false,
    mouseup: false,
};

paint.zoom = {
    touchtime: 0,
    statedblclick: false,
    global: {
        state: false,
        svg: {},
        container: {},
        zoomheader: {},
        img: '',
    },
    data: {
        widthheight: [],
        rectlistdata: [],
    },
    elements: {},
    handlers: {},
};

paint.zoom.elements = {
    olready: false,
    info_zoom: { id: 'info_zoom', elem: '' },
    btn_zoom_plus: { id: "btn_zoom_plus", elem: '' },
    btn_zoom_minus: { id: 'btn_zoom_minus', elem: '' },
    pdfWindow: { id: 'pdfWindow', elem: '' },
    // block leftbar=>absolute
    checkAbsolut: { id: 'checkAbsolut', elem: '' },
    xpos: { id: 'xpos' },
    ypos: { id: 'ypos' },
    widthpos: { id: 'widthpos' },
    heightpos: { id: 'heightpos' },
};

paint.zoom.init = function() {
    paint.zoom.elements.info_zoom = $('#' + paint.zoom.elements.info_zoom.id);
    paint.zoom.elements.btn_zoom_plus = $('#' + paint.zoom.elements.btn_zoom_plus.id);
    paint.zoom.elements.btn_zoom_minus = $('#' + paint.zoom.elements.btn_zoom_minus.id);
    paint.zoom.elements.pdfWindow = $('#' + paint.zoom.elements.pdfWindow.id);
    // block leftbar=>absolute
    paint.zoom.elements.checkAbsolut = $('#' + paint.zoom.elements.checkAbsolut.id);
    paint.zoom.elements.xpos = $('#' + paint.zoom.elements.xpos.id);
    paint.zoom.elements.ypos = $('#' + paint.zoom.elements.ypos.id);
    paint.zoom.elements.widthpos = $('#' + paint.zoom.elements.widthpos.id);
    paint.zoom.elements.heightpos = $('#' + paint.zoom.elements.heightpos.id);
    paint.zoom.elements.olready = true;
};


paint.abs.handlers = {
    onabsblock: function() {
        paint.zoom.elements.xpos.attr('disabled', false);
        paint.zoom.elements.ypos.attr('disabled', false);
        paint.zoom.elements.widthpos.attr('disabled', false);
        paint.zoom.elements.heightpos.attr('disabled', false);
        rightbar.elements.wrapAbs.attr('hidden', false);
    },
    offabsblock: function() {
        paint.zoom.elements.xpos.attr('disabled', true);
        paint.zoom.elements.ypos.attr('disabled', true);
        paint.zoom.elements.widthpos.attr('disabled', true);
        paint.zoom.elements.heightpos.attr('disabled', true);
        rightbar.elements.wrapAbs.attr('hidden', 'hidden');
    },
    showcoord: function(activrect) {
        if (activrect[0].x.toFixed(0)) {
            paint.zoom.elements.xpos.val(activrect[0].x.toFixed(0));
            paint.zoom.elements.ypos.val(activrect[1].y.toFixed(0));
            paint.zoom.elements.widthpos.val((Math.abs(activrect[1].x - activrect[0].x)).toFixed(0));
            paint.zoom.elements.heightpos.val((Math.abs(activrect[1].y - activrect[0].y)).toFixed(0));
        }
    },
    backnewobjrecdata: function() {
        return [$.extend({}, paint.objects.activrect.rectData[0]), $.extend({}, paint.objects.activrect.rectData[1])];
    },
    dotecheck: function(newdata) {
        return parseFloat(newdata) && newdata.length - 1 != newdata.indexOf('.');
    }
};

paint.zoom.handlers = {
    increasezoom: function() {
        if (!paint.zoom.global.state) {
            paint.objects.global.disactivpage[temp.DataWorkspace.activpage] = paint.objects.disactiv;
            paint.objects.datafromserver.removelistpage[temp.DataWorkspace.activpage] = false;
            paint.zoom.handlers.swithstate();
            paint.zoom.handlers.removesvg();
            paint.zoom.handlers.findWHdiv();
            paint.zoom.handlers.createzoomsvg();
            paint.zoom.handlers.addimgactiv();
            paint.zoom.handlers.addfild();
        }
    },
    zoom: function() {
        return d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", paint.zoom.handlers.zoomed);
    },
    zoomed: function() {
        paint.zoom.global.container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        paint.zoom.handlers.getzoomscale();
    },
    getzoomscale: function() {
        var extzoom = d3.event.scale;
        if (extzoom == 1) {
            extzoom = '100%';
        } else if (extzoom == 10) {
            extzoom = '1000%';
        } else {
            extzoom += '';
            extzoom = extzoom.substring(0, 4).replace(/\./g, "") + '%';
        }
        paint.zoom.elements.info_zoom.val(extzoom);
    },
    removesvg: function() {
        d3.select('svg').remove();
    },
    findWHdiv: function() {
        paint.zoom.data.widthheight = paint.objects.global.wh;
        $('#pdfWindow').height(paint.zoom.data.widthheight[1]).width(paint.zoom.data.widthheight[0]);
    },
    swithstate: function() {
        paint.zoom.global.state = !paint.zoom.global.state;
    },
    addimgactiv: function() {
        paint.zoom.global.container.append("image")
            .attr("width", paint.zoom.data.widthheight[0] + "px")
            .attr("height", paint.zoom.data.widthheight[1] + "px")
            .style("pointer-events", "none")
            .attr("xlink:href", temp.DataWorkspace.images[temp.DataWorkspace.activpage]);
    },
    creatDataPaint: function() {
        if (paint.objects.global.disactivpage[temp.DataWorkspace.activpage]) {

            paint.objects.global.disactivpage[temp.DataWorkspace.activpage].forEach(function(val, i) {
                paint.zoom.data.rectlistdata.push(val.rectData);
            });
        }
    },
    createNewRecData: function() {
        paint.zoom.data.rectlistdata.forEach(function(cord, i) {
            // paint.objects.global.nopush = false;
            paint.handlers.disactivRect();
            paint.objects.activrect.id = paint.handlers.generId();
            paint.objects.activrect.rectData = cord;
            paint.zoom.handlers.initzoomrectpoint();
            paint.zoom.handlers.updatezoomRect();
        });

    },
    initzoomrectpoint: function() {
        paint.objects.activrect.rectangleElement = paint.zoom.global.container.append('rect').attr('class', 'rectangle').attr('id', paint.objects.activrect.id);
        paint.objects.activrect.pointElement1 = paint.zoom.global.container.append('circle').attr('class', 'pointC');
        paint.objects.activrect.pointElement2 = paint.zoom.global.container.append('circle').attr('class', 'pointC');
        paint.objects.activrect.pointElement3 = paint.zoom.global.container.append('circle').attr('class', 'pointC');
        paint.objects.activrect.pointElement4 = paint.zoom.global.container.append('circle').attr('class', 'pointC');
    },
    updatezoomRect: function() {
        paint.objects.activrect.rect = d3.select(paint.objects.activrect.rectangleElement[0][0]);
        paint.objects.activrect.rect.attr({
            x: paint.objects.activrect.rectData[1].x - paint.objects.activrect.rectData[0].x > 0 ? paint.objects.activrect.rectData[0].x : paint.objects.activrect.rectData[1].x,
            y: paint.objects.activrect.rectData[1].y - paint.objects.activrect.rectData[0].y > 0 ? paint.objects.activrect.rectData[0].y : paint.objects.activrect.rectData[1].y,
            width: Math.abs(paint.objects.activrect.rectData[1].x - paint.objects.activrect.rectData[0].x),
            height: Math.abs(paint.objects.activrect.rectData[1].y - paint.objects.activrect.rectData[0].y)
        });
        paint.objects.point1 = d3.select(paint.objects.activrect.pointElement1[0][0]).data(paint.objects.activrect.rectData);
        paint.objects.point1.attr('r', 3)
            .attr('cx', paint.objects.activrect.rectData[0].x)
            .attr('cy', paint.objects.activrect.rectData[0].y);
        paint.objects.point2 = d3.select(paint.objects.activrect.pointElement2[0][0]).data(paint.objects.activrect.rectData);
        paint.objects.point2.attr('r', 3)
            .attr('cx', paint.objects.activrect.rectData[1].x)
            .attr('cy', paint.objects.activrect.rectData[1].y);
        paint.objects.point3 = d3.select(paint.objects.activrect.pointElement3[0][0]).data(paint.objects.activrect.rectData);
        paint.objects.point3.attr('r', 3)
            .attr('cx', paint.objects.activrect.rectData[1].x)
            .attr('cy', paint.objects.activrect.rectData[0].y);
        paint.objects.point4 = d3.select(paint.objects.activrect.pointElement4[0][0]).data(paint.objects.activrect.rectData);
        paint.objects.point4.attr('r', 3)
            .attr('cx', paint.objects.activrect.rectData[0].x)
            .attr('cy', paint.objects.activrect.rectData[1].y);
    },

    createzoomsvg: function() {
        paint.zoom.global.svg = d3.select('#pdfWindow').append('svg').attr('width', paint.zoom.data.widthheight[0]).attr('height', paint.zoom.data.widthheight[1]).call(d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", paint.zoom.handlers.zoomed));
        var g = paint.zoom.global.svg.append("g");
        g.append('rect').attr("width", paint.zoom.data.widthheight[0])
            .attr("height", paint.zoom.data.widthheight[1])
            .style("fill", "none")
            .style("pointer-events", "all");
        paint.zoom.global.container = g.append('g');
        paint.zoom.global.img = $('#dynamicImg').clone();
        $('#dynamicImg').remove();
        paint.zoom.elements.pdfWindow.width(paint.zoom.data.widthheight[0]).height(paint.zoom.data.widthheight[1]);
    },

    addfild: function() {
        paint.zoom.handlers.creatDataPaint();
        paint.zoom.handlers.createNewRecData();
    },

    backtopaint: function() {
        if (paint.zoom.global.state) {
            paint.zoom.handlers.swithstate();
            paint.zoom.elements.info_zoom.val('100%');
            paint.objects.datafromserver.arrdata = paint.objects.global.disactivpage[temp.DataWorkspace.activpage];
            paint.zoom.handlers.removesvg();
            paint.zoom.global.img.appendTo($('#pdfWindow'));
            paint.objects.disactiv = [];
            paint.zoom.data.rectlistdata = [];
            paint.handlers.regulations();
            paint.objects.activrect.isDrag = true;
            paint.objects.activrect.isDrawing = false;
        }
    }
};

paint.objects = {
    datafromserver: {
        datafromserverpage: [],
        removelistpage: [],
    },
    global: {
        keyDelevent: false,
        mouseup: false,
        mousedown: false,
        d3mouse: {},
        svg: {},
        swith: {},
        mouseEvent: [],
        nopush: false,
        wh: [],
        disactivpage: [],
        collect: [],
    },
    activrect: {
        id: '',
        rect: {},
        self: {},
        m1: [],
        m2: [],
        type: '',
        value: '',
        regex: '',
        position: '',
        reserve: '',
        rectData: [],
        datatype: [],
        rectangleElement: [],
        pointElement1: [],
        pointElement2: [],
        pointElement3: [],
        pointElement4: [],
        isDrag: false,
        isActive: false,
        isDrawing: false,
    },
    disactiv: [],
};

paint.handlers = {
    checkMainHeader: function(mainHeader, rect) {
        if (mainHeader == undefined || mainHeader.Rect == null) return;
        var maiHeaderCoord = paint.handlers.parsedataservercord(mainHeader);
        if (paint.handlers.compareCoord(maiHeaderCoord, rect)) {
            paint.objects.activrect.type = 'MainHeader';
        }
    },
    compareCoord: function(main, rect) {
        if (
            main[0].x == rect.rectData[0].x &&
            main[0].y == rect.rectData[0].y &&
            main[1].x == rect.rectData[1].x &&
            main[1].y == rect.rectData[1].y
        ) {
            return true;
        } else {
            return false;
        }
    },

    parsedataservercord: function(cord) {
        return [{ x: paint.handlers.convertcordabsx(cord.Rect.X0.X, paint.objects.global.wh), y: paint.handlers.convertcordabsy(cord.Rect.X0.Y, paint.objects.global.wh) }, { x: paint.handlers.convertcordabsx(cord.Rect.X1.X, paint.objects.global.wh), y: paint.handlers.convertcordabsy(cord.Rect.X1.Y, paint.objects.global.wh) }];
    },
    convertcordabsx: function(cordx, arrWH) {
        return (cordx * arrWH[0]) / 100;
    },
    convertcordabsy: function(cordy, arrWH) {
        return (cordy * arrWH[1]) / 100;
    },
    createNewRecData: function() {
        paint.objects.disactiv = [];
        // new templaite create
        if (!paint.objects.datafromserver.arrdata) return;
        if (paint.objects.datafromserver.arrdata.length != 0) {
            if (!Array.isArray(paint.objects.datafromserver.arrdata)) {
                for (var type in paint.objects.datafromserver.arrdata) {
                    //  if (type != 'CustomData' && type != 'Base64Img') {};
                    if (paint.objects.datafromserver.arrdata[type] == null) continue;
                    if (type != 'TableDatas' && type != 'CustomData' && type != 'Base64Img' && type != 'OnlyImages' && type != 'OnlyText' && type != 'OcrStrings') {
                        if (type == 'MainHeader' && paint.objects.datafromserver.arrdata[type].Rect == null) continue; // main header initial state from server
                        if (type != 'MainHeader') { // mainHeader now checked in block DataTables (function checkMainHeader )
                            //     new Array(paint.objects.datafromserver.arrdata[type]).forEach(function(cord, i) {
                            //         paint.objects.global.nopush = false;
                            //         paint.handlers.disactivRect();
                            //         paint.objects.activrect.id = paint.handlers.generId();
                            //         paint.objects.activrect.regex = (cord.regex && cord.regex != "") ? cord.regex : '^.*$?';
                            //         paint.objects.activrect.position = (cord.position && cord.position.length != 0) ? cord.position : (cord.position && cord.position.length == 0) ? [] : [0];
                            //         paint.objects.activrect.reserve = '';
                            //         paint.objects.activrect.type = type;
                            //         paint.objects.activrect.value = cord.Data ? cord.Data : '';
                            //         paint.objects.activrect.rectData = paint.handlers.parsedataservercord(cord);
                            //         paint.handlers.initrectpoint();
                            //         paint.handlers.updateRect();
                            //         paint.objects.activrect.isDrag = false;
                            //         paint.objects.activrect.isDataServerSide = true;
                            //         paint.objects.disactiv.push($.extend({}, paint.objects.activrect));
                            //         if (paint.objects.datafromserver.arrdata[type].length - 1 == i) {
                            //             rightbar.dataTable.emmitchangerect($.extend({}, paint.objects.activrect));
                            //             hp.handlears.setPosition();
                            //             hp.handlears.setRegex();
                            //         }
                            //     });
                            // } else {
                            paint.objects.datafromserver.arrdata[type].forEach(function(cord, i) {
                                paint.objects.global.nopush = false;
                                paint.handlers.disactivRect();
                                paint.objects.activrect.id = paint.handlers.generId();
                                paint.objects.activrect.type = type;
                                paint.objects.activrect.value = cord.Data ? cord.Data : '';
                                paint.objects.activrect.regex = (cord.regex && cord.regex != "") ? cord.regex : '^.*$?';
                                paint.objects.activrect.position = (cord.position && cord.position.length != 0) ? cord.position : (cord.position && cord.position.length == 0) ? [] : [0];
                                paint.objects.activrect.reserve = '';
                                paint.objects.activrect.rectData = paint.handlers.parsedataservercord(cord);
                                paint.handlers.initrectpoint();
                                paint.handlers.updateRect();
                                paint.objects.activrect.isDrag = false;
                                paint.objects.activrect.isDataServerSide = true;
                                paint.objects.disactiv.push($.extend({}, paint.objects.activrect));
                                if (paint.objects.datafromserver.arrdata[type].length - 1 == i) {
                                    rightbar.dataTable.emmitchangerect($.extend({}, paint.objects.activrect));
                                    hp.handlears.setPosition();
                                    hp.handlears.setRegex();
                                }
                            });
                        }
                    } else if (type == 'TableDatas') {
                        // render dataTable from the server 
                        paint.objects.datafromserver.arrdata[type].forEach(function(val, i) {
                            for (var typ in val) {
                                if (typ != 'Rect') continue;
                                paint.objects.global.nopush = false;
                                paint.handlers.disactivRect();
                                paint.objects.activrect.id = paint.handlers.generId();
                                paint.objects.activrect.type = val.DataType.Name;
                                paint.objects.activrect.Pk = val.DataType.Pk;
                                val.Data ? paint.objects.activrect.value = val.Data : paint.objects.activrect.value = '';
                                paint.objects.activrect.rectData = paint.handlers.parsedataservercord(val);


                                paint.objects.activrect.regex = (val.Regex && val.Regex != '') ? val.Regex : '^.*$?';
                                paint.objects.activrect.position = (val.Position && val.Position.length != 0) ? val.Position : (val.Position && val.Position.length == 0) ? [] : [0];
                                paint.objects.activrect.reserve = '';
                                paint.handlers.checkMainHeader(paint.objects.datafromserver.arrdata['MainHeader'], paint.objects.activrect);
                                paint.handlers.initrectpoint();
                                paint.handlers.updateRect();
                                paint.objects.activrect.isDrag = false;
                                paint.objects.activrect.isDataServerSide = true;
                                paint.objects.disactiv.push($.extend({}, paint.objects.activrect));
                                if (paint.objects.datafromserver.arrdata[type].length - 1 == i) {
                                    rightbar.dataTable.emmitchangerect($.extend({}, paint.objects.activrect));
                                    hp.handlears.setPosition();
                                    hp.handlears.setRegex();
                                }
                            }
                        });
                    }
                }
            } else {
                paint.objects.datafromserver.arrdata.forEach(function(cord, i) {
                    paint.objects.global.nopush = false;
                    paint.handlers.disactivRect();
                    paint.objects.activrect = cord;
                    if (!paint.objects.activrect.value) paint.objects.activrect.value = ''; //check if value ==undefined
                    paint.objects.activrect.regex = (cord.regex && cord.regex != "") ? cord.regex : '^.*$?';
                    paint.objects.activrect.position = (cord.position && cord.position.length != 0) ? cord.position : (cord.position && cord.position.length == 0) ? [] : [0];
                    paint.objects.activrect.reserve = '';
                    paint.handlers.initrectpoint();
                    paint.handlers.updateRect();
                    paint.objects.activrect.isDrag = false;
                    paint.objects.activrect.isDataServerSide = false;
                    paint.objects.disactiv.push($.extend({}, paint.objects.activrect));
                    if (paint.objects.datafromserver.arrdata.length - 1 == i) {
                        rightbar.dataTable.emmitchangerect($.extend({}, paint.objects.activrect));
                        hp.handlears.setPosition();
                        hp.handlears.setRegex();
                    }
                });
            }
        }
    },

    createNewRec: function() {
        paint.objects.activrect.isDataServerSide = false;
        // paint.objects.global.nopush = false;
        paint.handlers.disactivRect();
        paint.objects.activrect.id = paint.handlers.generId();
        paint.objects.activrect.rectData = [{ x: paint.objects.activrect.m1[0], y: paint.objects.activrect.m1[1] }, { x: paint.objects.activrect.m1[0], y: paint.objects.activrect.m1[1] }];
        paint.objects.activrect.type = 'TableDatas';
        paint.objects.activrect.Pk = '';
        paint.objects.activrect.value = '';
        paint.objects.activrect.regex = '';
        paint.objects.activrect.position = [0];
        paint.objects.activrect.reserve = '';
        if (paint.objects.activrect.datatype) {
            paint.objects.activrect.datatype = [];
        }
        rightbar.dataTable.emmitchangerect(paint.objects.activrect);
        paint.handlers.initrectpoint();
        paint.handlers.updateRect();
        paint.objects.activrect.isActive = true;
        paint.objects.activrect.isDrag = false;
    },
    initrectpoint: function() {
        paint.objects.activrect.rectangleElement = paint.objects.global.svg.append('rect').attr('class', 'rectangle').attr('id', paint.objects.activrect.id).call(d3.behavior.drag().on('drag', paint.handlers.dragRect));
        paint.objects.activrect.pointElement1 = paint.objects.global.svg.append('circle').attr('class', 'pointC ' + paint.objects.activrect.id).call(d3.behavior.drag().on('drag', paint.handlers.dragPoint1));
        paint.objects.activrect.pointElement2 = paint.objects.global.svg.append('circle').attr('class', 'pointC ' + paint.objects.activrect.id).call(d3.behavior.drag().on('drag', paint.handlers.dragPoint2));
        paint.objects.activrect.pointElement3 = paint.objects.global.svg.append('circle').attr('class', 'pointC ' + paint.objects.activrect.id).call(d3.behavior.drag().on('drag', paint.handlers.dragPoint3));
        paint.objects.activrect.pointElement4 = paint.objects.global.svg.append('circle').attr('class', 'pointC ' + paint.objects.activrect.id).call(d3.behavior.drag().on('drag', paint.handlers.dragPoint4));
    },
    updateRect: function() {
        // paint.abs.handlers.showcoord(paint.objects.activrect.rectData);
        paint.objects.activrect.rect = d3.select(paint.objects.activrect.rectangleElement[0][0]);
        paint.objects.activrect.rect.attr({
            x: paint.objects.activrect.rectData[1].x - paint.objects.activrect.rectData[0].x > 0 ? paint.objects.activrect.rectData[0].x : paint.objects.activrect.rectData[1].x,
            y: paint.objects.activrect.rectData[1].y - paint.objects.activrect.rectData[0].y > 0 ? paint.objects.activrect.rectData[0].y : paint.objects.activrect.rectData[1].y,
            width: Math.abs(paint.objects.activrect.rectData[1].x - paint.objects.activrect.rectData[0].x),
            height: Math.abs(paint.objects.activrect.rectData[1].y - paint.objects.activrect.rectData[0].y)
        });
        var radius = 5; // settings radius all point
        paint.objects.point1 = d3.select(paint.objects.activrect.pointElement1[0][0]).data(paint.objects.activrect.rectData);
        paint.objects.point1.attr('r', radius)
            .attr('cx', paint.objects.activrect.rectData[0].x)
            .attr('cy', paint.objects.activrect.rectData[0].y);
        paint.objects.point2 = d3.select(paint.objects.activrect.pointElement2[0][0]).data(paint.objects.activrect.rectData);
        paint.objects.point2.attr('r', radius)
            .attr('cx', paint.objects.activrect.rectData[1].x)
            .attr('cy', paint.objects.activrect.rectData[1].y);
        paint.objects.point3 = d3.select(paint.objects.activrect.pointElement3[0][0]).data(paint.objects.activrect.rectData);
        paint.objects.point3.attr('r', radius)
            .attr('cx', paint.objects.activrect.rectData[1].x)
            .attr('cy', paint.objects.activrect.rectData[0].y);
        paint.objects.point4 = d3.select(paint.objects.activrect.pointElement4[0][0]).data(paint.objects.activrect.rectData);
        paint.objects.point4.attr('r', radius)
            .attr('cx', paint.objects.activrect.rectData[0].x)
            .attr('cy', paint.objects.activrect.rectData[1].y);
        if (paint.objects.disactiv.length > 0) {
            paint.objects.disactiv[paint.objects.disactiv.length - 1].isActive = false;
        }
        paint.handlers.comparedatarect();
    },
    swithactivRect: function() {
        var newrect = d3.select(paint.objects.global.mouseEvent.path[0])[0];
        paint.objects.disactiv.forEach(function(val, i) {
            if (val.pointElement1[0][0].outerHTML == newrect[0].outerHTML || newrect[0].outerHTML == val.pointElement2[0][0].outerHTML || newrect[0].outerHTML == val.pointElement3[0][0].outerHTML || newrect[0].outerHTML == val.pointElement4[0][0].outerHTML || newrect[0].outerHTML == val.rect[0][0].outerHTML) {
                var newobj = $.extend({}, paint.objects.disactiv[i]);
                paint.objects.activrect = newobj;
                rightbar.dataTable.emmitchangerect(paint.objects.activrect); //rightbar emmit change activ rect state
                //  paint.abs.handlers.showcoord(paint.objects.activrect.rectData); // abs show swith activ rect
            }
        });
    },
    disactivRect: function() {
        d3.selectAll('rect').attr('class', function() { return 'rectdis'; });
        paint.objects.disactiv.forEach(function(element, i) {
            if (element.autoCreate == 'rectauto' && element.id != paint.objects.activrect.id) $('#' + element.id).addClass('rectauto');
        });
    },
    activRect: function() {
        paint.objects.activrect.rect.attr('rectdis', '').attr('class', 'rectangle');
    },
    dragRect: function() {
        var e = d3.event;
        for (var i = 0; i < paint.objects.activrect.rectData.length; i++) {
            d3.select(paint.objects.activrect.rectangleElement[0][0])
                .attr('x', paint.objects.activrect.rectData[i].x += e.dx)
                .attr('y', paint.objects.activrect.rectData[i].y += e.dy);
        }
        paint.objects.activrect.rect.style('cursor', 'move');
        paint.handlers.updateRect();
        au.init.recognizeAuto(e, 'dragRect');
        // au.init(e, 'dragRect'); // => au.js
    },
    dragPoint1: function() {
        var e = d3.event;
        d3.select(paint.objects.activrect.pointElement1[0][0])
            .attr('cx', paint.objects.activrect.rectData[0].x += e.dx)
            .attr('cy', paint.objects.activrect.rectData[0].y += e.dy);
        paint.handlers.updateRect();
        au.init.recognizeAuto(e, 'dragPoint1');
        //  au.init(e, 'dragPoint1'); // => au.js
    },
    dragPoint2: function() {
        var e = d3.event;
        d3.select(paint.objects.activrect.pointElement2[0][0])
            .attr('cx', paint.objects.activrect.rectData[1].x += e.dx)
            .attr('cy', paint.objects.activrect.rectData[1].y += e.dy);
        paint.handlers.updateRect();
        au.init.recognizeAuto(e, 'dragPoint2');
        //au.init(e, 'dragPoint2'); // => au.js
    },
    dragPoint3: function() {
        var e = d3.event;
        d3.select(paint.objects.activrect.pointElement3[0][0])
            .attr('cx', paint.objects.activrect.rectData[1].x += e.dx)
            .attr('cy', paint.objects.activrect.rectData[0].y += e.dy);
        paint.handlers.updateRect();
        au.init.recognizeAuto(e, 'dragPoint3');
        // au.init(e, 'dragPoint3'); // => au.js
    },

    dragPoint4: function() {
        var e = d3.event;
        d3.select(paint.objects.activrect.pointElement4[0][0])
            .attr('cx', paint.objects.activrect.rectData[0].x += e.dx)
            .attr('cy', paint.objects.activrect.rectData[1].y += e.dy);
        paint.handlers.updateRect();
        au.init.recognizeAuto(e, 'dragPoint4');
        // au.init(e, 'dragPoint4'); // => au.js
    },

    compare: function() {
        return d3.select(paint.objects.global.mouseEvent.path[0])[0][0].outerHTML == paint.objects.activrect.rect[0][0].outerHTML;
    },

    generId: function() {
        return '' + Math.random().toString(36).substr(2, 16);
    },
    comparedatarect: function() {
        paint.objects.disactiv.forEach(function(val, i) {
            if (val.id == paint.objects.activrect.id && !paint.objects.activrect.isDataServerSide) {
                paint.objects.disactiv[i] = $.extend({}, paint.objects.activrect);
            }
        });
    },

    compareOldRect: function(newobj) {
        var repeat = false;
        if (paint.objects.disactiv.length > 0) {
            paint.objects.disactiv.forEach(function(val, i) {
                if (val.id == newobj.id)
                    repeat = true;
            });
            return repeat;
        }
    },
    deleteRect: function() {
        var targetId = d3.event.target.id;
        // multidel.handlers.initparen(targetId);
        paint.objects.disactiv.forEach(function(elem, i) {
            if (elem.id == targetId) {
                paint.handlers.clearMemoryObjRect(i);
            }
        });
    },
    clearMemoryObjRect: function(i) {
        var delelem = $.extend({}, paint.objects.disactiv[i]);
        paint.handlers.removesvgelems(delelem);
        paint.objects.disactiv = paint.objects.disactiv.map(function(obj) { return $.extend({}, obj); }).filter(function(val, j) { return i != j; });

    },
    delactivrect: function() {
        if (paint.objects.disactiv.length > 0) {
            var delelem = $.extend({}, paint.objects.activrect);

            multidel.log.init(delelem);
            paint.handlers.removesvgelems(delelem);
            paint.objects.disactiv = paint.objects.disactiv.map(function(obj) { return $.extend({}, obj); }).filter(function(val, j) { return val.id != delelem.id; });
        }
    },
    removesvgelems: function(delelem) {
        d3.select(delelem.rectangleElement[0][0]).remove();
        d3.select(delelem.pointElement1[0][0]).remove();
        d3.select(delelem.pointElement2[0][0]).remove();
        d3.select(delelem.pointElement3[0][0]).remove();
        d3.select(delelem.pointElement4[0][0]).remove();
    },

    isemptyobj: function(object) {
        return JSON.stringify(object) == "{}";
    },
    clearsvgcontent: function() {
        d3.select('svg').remove();
    },
    littlerect: function(obj) {
        var cord1 = obj.rectData[0];
        var cord2 = obj.rectData[1];
        if (Math.abs(cord1.x - cord2.x) < 10 && Math.abs(cord1.y - cord2.y) < 10) return true;
        return false;
    },

    regulations: function() {
        paint.objects.global.svg = d3.select('#pdfWindow').append('svg');
        paint.handlers.createNewRecData();
        paint.objects.global.svg.on('mousedown', function(e) {
                if (paint.statefix.mousedown) return;
                paint.statefix.mousedown = true;
                temp.elementLeftBar.Templaite.Pk = temp.zeroGuid; //Pk empty row
                temp.elementLeftBar.Templaite.Name = '';
                paint.objects.global.mouseEvent = d3.event;
                paint.objects.activrect.m1 = d3.mouse(this);
                var $node = paint.objects.global.mouseEvent.path[0].nodeName;
                paint.objects.global.mousedown = true;
                if (paint.objects.global.keyDelevent && $node == 'rect') {
                    // paint.handlers.deleteRect();          // if need  function delete rectangle ( dell + click )  remove -  10/08/2018 23/35
                    paint.statefix.mousedown = false;
                } else {
                    paint.objects.global.nopush = false;
                    paint.objects.activRect = {};
                    if ($node.length == 3 && !paint.objects.global.keyDelevent) { // click on svg
                        paint.handlers.createNewRec();
                        paint.objects.activrect.isDrawing = true;
                        hx.helpfunc.clearTextArea();
                        hx.helpfunc.clearLabel();
                        hx.helpfunc.clearRegex(hx.elements.hr_input);

                    }
                    if ($node == 'circle') {
                        // au.js if click circle and active rectangle
                        au.data.state = true;
                        paint.objects.global.nopush = true;
                        paint.handlers.disactivRect();
                        var IdNode = paint.objects.global.mouseEvent.path[0].classList[1];
                        paint.objects.disactiv.forEach(function(val, i) {
                            if (val.id == IdNode) {
                                var newobj = $.extend({}, paint.objects.disactiv[i]);
                                paint.objects.activrect = newobj;
                                rightbar.dataTable.emmitchangerect(paint.objects.activrect); //rightbar emmit change activ rect state
                                // paint.abs.handlers.showcoord(paint.objects.activrect.rectData); // abs show swith activ rect
                            }
                        });
                        paint.handlers.activRect();
                        led.action.ledRect(); // check led
                        hx.handlears.setHeaderXmlSelected(); //  set Header Xml hx.js
                        paint.objects.activrect.isActive = true;
                        paint.objects.activrect.isDrag = true;
                        paint.objects.activrect.isDrawing = false;
                        //KW block
                        kw.handlers.kwfixD3JS(paint.objects.activrect.type);
                        // set color autocreate collum right click
                        db.handler.setColorAutoCreate();
                        // set dataType rightbar
                        rightbar.handlers.setDataType();
                        //set datatype  pref value in rightbar
                        rightbar.handlers.cleanoptiondataType();
                        // set position Header and Regex in DataTables
                        hp.handlears.setPosition();
                        // hp.handlears.setRegex();
                        if (paint.objects.activrect.type != "") rightbar.handlers.showoptiondataType(paint.objects.activrect.type);
                    }
                    // check if rectangle
                    if ($node == 'rect' && !paint.handlers.compare()) {
                        // au.js if click rectangle => drag rectangle 
                        au.data.state = true;
                        paint.objects.global.nopush = true;
                        paint.handlers.disactivRect();
                        paint.handlers.swithactivRect();
                        paint.handlers.activRect();
                        led.action.ledRect(); // check led MainHeader
                        hx.handlears.setHeaderXmlSelected(); //  set Header Xml hx.js
                        paint.objects.activrect.isActive = true;
                        paint.objects.activrect.isDrag = true;
                        paint.objects.activrect.isDrawing = false;
                        //KW block
                        kw.handlers.kwfixD3JS(paint.objects.activrect.type);
                        // set color autocreate collum right click
                        db.handler.setColorAutoCreate();
                        // set dataType rightbar
                        rightbar.handlers.setDataType();
                        //set datatype  pref value in rightbar
                        rightbar.handlers.cleanoptiondataType();
                        hp.handlears.setPosition();
                        // hp.handlears.setRegex();
                        if (paint.objects.activrect.type != "") rightbar.handlers.showoptiondataType(paint.objects.activrect.type);
                    }
                }
                // paint.abs.handlers.showcoord(paint.objects.activrect.rectData);
                paint.statefix.mousedown = false;
            })
            .on('mousemove', function() {
                if (paint.statefix.mousedown) return;

                if (paint.objects.global.keyDelevent) return;
                if (paint.objects.global.mousedown && paint.objects.activrect.isActive && !paint.objects.activrect.isDrag) {
                    paint.objects.activrect.m2 = d3.mouse(this);
                    paint.objects.activrect.rectData[1] = { x: paint.objects.activrect.m2[0], y: paint.objects.activrect.m2[1] };
                    paint.handlers.updateRect();
                    // paint.abs.handlers.showcoord(paint.objects.activrect.rectData);
                }
            })
            .on('mouseup', function() {
                au.data.state = false;
                if (paint.statefix.mousedown) return;
                if (paint.objects.global.keyDelevent) return;
                paint.objects.global.mousedown = false;
                if (!paint.objects.global.nopush) {
                    var newobj = $.extend({}, paint.objects.activrect);
                    // newobj.isActive = true;
                    if (!newobj.isDataServerSide) {
                        if (!paint.handlers.compareOldRect(newobj)) {
                            if (paint.handlers.littlerect(newobj)) { // fix little dote rectangle
                                paint.handlers.removesvgelems(newobj);
                                paint.objects.activrect = $.extend({}, paint.objects.disactiv[paint.objects.disactiv.length - 1]);
                                paint.objects.activrect.isActive = true;
                                paint.objects.activrect.isDrag = true;
                                paint.objects.activrect.isDrawing = false;
                                rightbar.dataTable.emmitchangerect(paint.objects.activrect); //rightbar emmit change activ rect state
                                // paint.abs.handlers.showcoord(paint.objects.activrect.rectData); // abs show swith activ rect
                                paint.handlers.activRect();
                                // set dataType rightbar
                                rightbar.handlers.setDataType();
                                //set datatype  pref value in rightbar
                                rightbar.handlers.cleanoptiondataType();
                                if (paint.objects.activrect.type != "") {
                                    rightbar.handlers.showoptiondataType(paint.objects.activrect.type);
                                    paint.statefix.mousedown = false;
                                    return;
                                }
                            }
                            paint.objects.activrect.isActive = true;
                            paint.objects.activrect.isDrag = true;
                            paint.objects.activrect.isDrawing = false;
                            paint.objects.disactiv.push(newobj);
                            paint.objects.global.nopush = true;
                        }
                    }
                }
                if (paint.objects.activrect.isDrawing) {
                    paint.objects.activrect.isActive = true;
                    paint.objects.activrect.isDrag = true;
                    paint.objects.activrect.isDrawing = false;
                }
                paint.statefix.mousedown = false;
            })
            .on('contextmenu', function() {
                d3.event.preventDefault();
                paint.objects.global.mouseEvent = d3.event;
                paint.objects.activrect.m1 = d3.mouse(this);

                if (paint.objects.global.mouseEvent.path[0].nodeName.length == 3) {
                    db.logic.init(paint.objects.activrect.m1);
                    paint.zoom.statedblclick = false;
                    paint.objects.global.mousedown = false;
                }
                paint.statefix.mousedown = false;

            });
    }
};


paint.init = function() {
    if (!paint.zoom.elements.olready) paint.zoom.init();
    paint.zoom.elements.btn_zoom_plus.on('click', paint.zoom.handlers.increasezoom);
    paint.zoom.elements.btn_zoom_minus.on('click', paint.zoom.handlers.backtopaint);

    paint.handlers.regulations();
    // paint.zoom.elements.checkAbsolut.attr('disabled', false); hidden absolute block

    paint.zoom.elements.checkAbsolut.on('change', function() {
        if (this.checked) {
            paint.abs.handlers.onabsblock();
        } else {
            paint.abs.handlers.offabsblock();
        }
    });

    paint.zoom.elements.xpos.on('input', function() {
        var newdata = $(this).val();
        var recdata = paint.abs.handlers.backnewobjrecdata();
        if (paint.abs.handlers.dotecheck(newdata)) {
            recdata[0].x = parseFloat(newdata);
            paint.objects.activrect.rectData = recdata;
            paint.handlers.updateRect();
        }
    });

    paint.zoom.elements.ypos.on('input', function() {
        var newdata = $(this).val();
        var recdata = paint.abs.handlers.backnewobjrecdata();
        if (paint.abs.handlers.dotecheck(newdata)) {
            recdata[1].y = parseFloat(newdata);
            paint.objects.activrect.rectData = recdata;
            paint.handlers.updateRect();
        }
    });
    paint.zoom.elements.widthpos.on('input', function() {
        var newdata = $(this).val();
        var recdata = paint.abs.handlers.backnewobjrecdata();
        if (paint.abs.handlers.dotecheck(newdata)) {
            recdata[1].x - recdata[0].x > 0 ? recdata[1].x = recdata[0].x + parseFloat(newdata) : recdata[1].x = recdata[0].x - parseFloat(newdata);
            paint.objects.activrect.rectData = recdata;
            paint.handlers.updateRect();
        }
    });
    paint.zoom.elements.heightpos.on('input', function() {
        var newdata = $(this).val();
        var recdata = paint.abs.handlers.backnewobjrecdata();
        if (paint.abs.handlers.dotecheck(newdata)) {
            recdata[0].y - recdata[1].y > 0 ? recdata[0].y = recdata[1].y + parseFloat(newdata) : recdata[0].y = recdata[1].y - parseFloat(newdata);
            paint.objects.activrect.rectData = recdata;
            paint.handlers.updateRect();
        }
    });
};

document.addEventListener('keydown', function(event) {
    var key = event.key;
    if (key === "Delete") {
        temp.elementLeftBar.Templaite.Pk = temp.zeroGuid;
        temp.elementLeftBar.Templaite.Name = '';
        paint.objects.global.keyDelevent = true;
        paint.handlers.delactivrect();
    }
});

document.addEventListener('keyup', function(event) {
    var key = event.key;
    if (key === "Delete") {
        paint.objects.global.keyDelevent = false;
    }
});