var au = {};
au.data = {
    points: {
        point1: '',
        point2: '',
        point3: '',
        point4: '',
    },
    state: false,
    copyrect: {
        id: '',
        rect: {},
        self: {},
        m1: [],
        m2: [],
        type: '',
        value: '',
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

};

au.d3 = {
    updateRect: function() {
        au.data.copyrect.rect = d3.select(au.data.copyrect.rectangleElement[0][0]);
        au.data.copyrect.rect.attr({
            x: au.data.copyrect.rectData[1].x - au.data.copyrect.rectData[0].x > 0 ? au.data.copyrect.rectData[0].x : au.data.copyrect.rectData[1].x,
            y: au.data.copyrect.rectData[1].y - au.data.copyrect.rectData[0].y > 0 ? au.data.copyrect.rectData[0].y : au.data.copyrect.rectData[1].y,
            width: Math.abs(au.data.copyrect.rectData[1].x - au.data.copyrect.rectData[0].x),
            height: Math.abs(au.data.copyrect[1].y - au.data.copyrect.rectData[0].y)
        });
        var radius = 4; // settings radius all point
        ua.data.points.point1 = d3.select(au.data.copyrect.pointElement1[0][0]).data(au.data.copyrect.rectData);
        ua.data.points.point1.attr('r', radius)
            .attr('cx', au.data.copyrect.rectData[0].x)
            .attr('cy', au.data.copyrect.rectData[0].y);
        ua.data.points.point2 = d3.select(au.data.copyrect.pointElement2[0][0]).data(au.data.copyrect.rectData);
        ua.data.points.point2.attr('r', radius)
            .attr('cx', au.data.copyrect.rectData[1].x)
            .attr('cy', au.data.copyrect.rectData[1].y);
        ua.data.points.point3 = d3.select(au.data.copyrect.pointElement3[0][0]).data(au.data.copyrect.rectData);
        ua.data.points.point3.attr('r', radius)
            .attr('cx', au.data.copyrect.rectData[1].x)
            .attr('cy', au.data.copyrect.rectData[0].y);
        ua.data.points.point4 = d3.select(au.data.copyrect.pointElement4[0][0]).data(au.data.copyrect.rectData);
        ua.data.points.point4.attr('r', radius)
            .attr('cx', au.data.copyrect.rectData[0].x)
            .attr('cy', au.data.copyrect.rectData[1].y);
    },
    dragRect: function(e) {
        for (var i = 0; i < au.data.copyrect.rectData.length; i++) {
            d3.select(au.data.copyrect.rectangleElement[0][0])
                .attr('x', au.data.copyrect.rectData[i].x += e.dx)
                .attr('y', au.data.copyrect.rectData[i].y += e.dy);
        }
        au.handlers.updateRect.updateRect();
    },
    dragPoint1: function(e) {
        d3.select(au.data.copyrect.pointElement1[0][0])
            .attr('cx', au.data.copyrect.rectData[0].x += e.dx)
            .attr('cy', au.data.copyrect.rectData[0].y += e.dy);
        au.handlers.updateRect.updateRect();
    },
    dragPoint2: function(e) {
        d3.select(au.data.copyrect.pointElement2[0][0])
            .attr('cx', au.data.copyrect.rectData[1].x += e.dx)
            .attr('cy', au.data.copyrect.rectData[1].y += e.dy);
        au.handlers.updateRect.updateRect();
    },
    dragPoint3: function(e) {
        d3.select(au.data.copyrect.pointElement3[0][0])
            .attr('cx', au.data.copyrect.rectData[1].x += e.dx)
            .attr('cy', au.data.copyrect.rectData[0].y += e.dy);
        au.handlers.updateRect.updateRect();
    },
    dragPoint4: function(e) {
        d3.select(au.data.copyrect.pointElement4[0][0])
            .attr('cx', au.data.copyrect.rectData[0].x += e.dx)
            .attr('cy', au.data.copyrect.rectData[1].y += e.dy);
        au.handlers.updateRect.updateRect();
    },


};

au.helpfunc = {
    getMinValue: function(array) {
        var res = false;
        var min = array[0].rectData[0].y;
        for (var i = 0; i < array.length; i++) {
            if (min > array[i].rectData[0].y) {
                res = array[i];
                min = array[i].rectData[0].y;
            }
        }
        if (res == false) return array[0];
        return res;
    },
    getMaxinValue: function(array) {
        var res = false;
        var max = array[0].rectData[0].y;
        for (var i = 0; i < array.length; i++) {
            if (max < array[i].rectData[0].y) {
                max = array[i].rectData[0].y;
                res = array[i];
            }
        }
        if (res == false) return array[0];
        return res;
    },

    findLineArr: function(y0, y1) {
        var header = [];
        var Yg0 = y0;
        var Yg1 = y1;
        var zeroLine = Yg0 + ((Yg1 - Yg0) / 2);
        paint.objects.disactiv.forEach(function(val, i) { // this header or colluns
            if (val.rectData[0].y < zeroLine && val.rectData[1].y > zeroLine && val.type == "TableDatas") {
                header.push(val);
            }
        });
        return header;

    },
    lookAroundZeroString: function(lengZero) {
        var findLineArr;
        var Down = au.helpfunc.lookDown();
        if (Down[0]) {
            findLineArr = au.helpfunc.findLineArr(Down[1].rectData[0].y, Down[1].rectData[1].y);
            if (lengZero == findLineArr.length) {
                return ['coll-table', Down[1], findLineArr];
            } else {
                var Up = au.helpfunc.lookUp();
                if (Up[0]) {
                    findLineArr = au.helpfunc.findLineArr(Up[1].rectData[0].y, Up[1].rectData[1].y);
                    if (lengZero == findLineArr.length) {
                        return ['header', Up[1], findLineArr];
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    },
    lookDown: function() {
        var x0 = paint.objects.activrect.rectData[0].x;
        var x1 = paint.objects.activrect.rectData[1].x;
        var zeroX = x0 + ((x1 - x0) / 2);
        var zDoll = paint.objects.activrect.rectData[1].y;
        var res = paint.objects.disactiv.filter(function(val, i) {
            if (val.rectData[0].x < zeroX && val.rectData[1].x > zeroX && val.type == "TableDatas" && zDoll < val.rectData[1].y) {
                return true;
            } else {
                return false;
            }
        });
        if (res.length != 0) {
            res = au.helpfunc.getMinValue(res);
        } else {
            return [false, null];
        }
        if (res != false) {
            return [true, res]; //=> if find  rectangle ander header
        } else {
            return [false, null];
        }
    },
    lookUp: function() {
        var x0 = paint.objects.activrect.rectData[0].x;
        var x1 = paint.objects.activrect.rectData[1].x;
        var zeroX = x0 + ((x1 - x0) / 2);
        var zDoll = paint.objects.activrect.rectData[0].y;

        var res = paint.objects.disactiv.filter(function(val, i) {
            if (val.rectData[0].x < zeroX && val.rectData[1].x > zeroX && val.type == "TableDatas" && zDoll < val.rectData[1].y) {
                return true;
            } else {
                return false;
            }
        });
        if (res.length != 0) {

            res = au.helpfunc.getMaxinValue(res);
            return [true, res];
        } else {
            return [false, null];
        }
    },
    HeaderRooles: function(e, w, zero, UpDown) {
        au.data.copyrect = UpDown[1];
        au.d3['w'](e);
    },


};

au.handlers = {
    findHeader: function(e, w) { // e=event mouse ,  w - 'string' name function from file  d3-js-last.js

        var zero = au.helpfunc.findLineArr(paint.objects.activrect.rectData[0].y, paint.objects.activrect.rectData[1].y);
        if (zero.length - 1 < 4) return; //=> table must have 4 collumns min  !Important

        var UpDown = au.helpfunc.lookAroundZeroString(zero.length);
        if (!UpDown) return;

        if (UpDown[0] == 'coll-table') { //Table collumns
            //  var  UpDown => Headet Line
            // var zero => TAble Line



        } else { // Table Header click
            // var zero => Header LIne
            // var UpDown => Table Line

            au.helpfunc.HeaderRooles(e, w, zero, UpDown);

        }
    },



};


au.init = function(event, whatdo) {
    if (!au.data.state) return; // not mousedown;
    au.handlers.findHeader(event, whatdo);

};