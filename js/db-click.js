var db = {};
db.data = {
    x: '',
    y: '',
    default: {
        heigth: 100,
        indentheader: 50
    }
};

db.handler = {
    findHeader: function(coordX, coordY) {
        var list = paint.objects.disactiv.filter(function(val) {
            if (val.rectData[1].x - val.rectData[0].x > 0) {
                if (val.rectData[0].x <= coordX && val.rectData[1].x >= coordX && val.rectData[1].y < coordY) { return true; } else { return false; }
            } else {
                if (val.rectData[0].x >= coordX && val.rectData[1].x <= coordX && val.rectData[1].y < coordY) { return true; } else { return false; }
            }
        });
        if (list.length > 0) return db.handler.exHeader(list, coordY);
        return null;
    },
    findLeftCol: function(coordX, coordY) {
        var list = paint.objects.disactiv.filter(function(val) {
            if (val.rectData[1].y - val.rectData[0].y > 0) {
                if (coordY >= val.rectData[0].y && coordY <= val.rectData[1].y && coordX > val.rectData[0].x) { return true; } else { return false; }
            } else {
                if (coordY <= val.rectData[0].y && coordY >= val.rectData[1].y && coordX > val.rectData[0].x) { return true; } else { return false; }
            }
        });
        if (list.length > 0) return db.handler.exLeftCol(list);
        var rightCollumn = db.handler.findRightCol(coordX, coordY); // right coll
        if (rightCollumn != null) return rightCollumn;
        return null;
    },
    findRightCol: function(x, y) {
        var list = paint.objects.disactiv.filter(function(val) {
            if (val.rectData[1].y - val.rectData[0].y > 0) {
                if (y >= val.rectData[0].y && y <= val.rectData[1].y && x < val.rectData[0].x) { return true; } else { return false; }
            } else {
                if (y <= val.rectData[0].y && y >= val.rectData[1].y && x < val.rectData[0].x) { return true; } else { return false; }
            }
        });
        if (list.length > 0) return db.handler.exRightCol(list);
        return null;
    },

    exHeader: function(arr, coordY) {
        return arr.reduce(function(prew, next) {
            if (prew.rectData[0].y > next.rectData[0].y) {
                return prew;
            } else {
                return next;
            }
        });
    },
    exLeftCol: function(arr) {
        return arr.reduce(function(prew, next) {
            if (prew.rectData[1].x > next.rectData[1].x) {
                return prew;
            } else {
                return next;
            }
        });
    },
    exRightCol: function(arr) {
        return arr.reduce(function(prew, next) {
            if (prew.rectData[1].x < next.rectData[1].x) {
                return prew;
            } else {
                return next;
            }
        });
    },
    changeCoordRect: function(rect) {
        var rectx0 = rect.rectData[0].x;
        var rectx1 = rect.rectData[1].x;
        var recty0 = rect.rectData[0].y;
        var recty1 = rect.rectData[1].y;
        if (rect.rectData[1].x - rect.rectData[0].x > 0) {
            rect.rectData[0].x = rectx0;
            rect.rectData[1].x = rectx1;
        } else {
            rect.rectData[1].x = rectx0;
            rect.rectData[0].x = rectx1;
        }
        if (rect.rectData[1].y - rect.rectData[0].y > 0) {
            rect.rectData[0].y = recty0;
            rect.rectData[1].y = recty1;
        } else {
            rect.rectData[1].y = recty0;
            rect.rectData[0].y = recty1;
        }
        return rect;
    },
    addNewColData: function(headers, coll) {
        var rect = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
        var header, col;
        header = db.handler.changeCoordRect(headers);
        rect[0].x = db.handler.grabXpos(header).x0;
        rect[1].x = db.handler.grabXpos(header).x1;
        if (coll != null) {
            col = db.handler.changeCoordRect(coll);
            rect[0].y = db.handler.grabYpos(coll).y0;
            rect[1].y = db.handler.grabYpos(coll).y1;
        } else {
            rect[0].y = header.rectData[1].y + db.data.default.indentheader;
            rect[1].y = rect[0].y + db.data.default.heigth;
        }
        return rect;
    },
    grabXpos: function(rect) {

        return { x0: rect.rectData[0].x, x1: rect.rectData[1].x };
    },
    grabYpos: function(rect) {
        return { y0: rect.rectData[0].y, y1: rect.rectData[1].y };
    },
    paintNew: function(data) {
        paint.objects.activrect.isDataServerSide = false;
        paint.handlers.disactivRect();
        paint.objects.activrect.id = paint.handlers.generId();
        paint.objects.activrect.rectData = data;
        paint.objects.activrect.type = 'TableDatas';
        paint.objects.activrect.Pk = '';
        paint.objects.activrect.value = '';
        paint.objects.activrect.autoCreate = 'rectauto';
        if (paint.objects.activrect.datatype) {
            paint.objects.activrect.datatype = [];
        }
        rightbar.dataTable.emmitchangerect(paint.objects.activrect);
        paint.handlers.initrectpoint();
        paint.handlers.updateRect();
        paint.objects.activrect.isActive = false;
        paint.objects.activrect.isDrag = true;
        paint.objects.activrect.isDrawing = false;
        var newobj = $.extend({}, paint.objects.activrect);
        paint.objects.disactiv.push(newobj);
        paint.objects.activrect.isActive = true;

    },
    setColorAutoCreate: function() {
        paint.objects.disactiv.forEach(function(element, i) {
            if (element.autoCreate == 'rectauto') $('#' + element.id).addClass('rectauto');
        });
        if (paint.objects.activrect.id != "") {
            $('#' + paint.objects.activrect.id).removeClass('rectauto').addClass('rect');
        }

    }
};

db.logic = {
    init: function(coord) {
        paint.objects.global.mousedown = true;
        db.data.x = coord[0];
        db.data.y = coord[1];
        var headerRect = db.handler.findHeader(db.data.x, db.data.y);
        var leftColRect = db.handler.findLeftCol(db.data.x, db.data.y);
        if (headerRect != null) {
            var data = db.handler.addNewColData(headerRect, leftColRect);
            db.handler.paintNew(data);
            paint.objects.global.mousedown = false;
            paint.objects.global.nopush = true;

            db.handler.setColorAutoCreate();

        } else {
            paint.objects.global.mousedown = false;
            return;
        }
    }
};