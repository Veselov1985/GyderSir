var au = {};
au.data = {
    Of: true,
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
        regex: '',
        position: [],
        reserve: '',
        isDrag: false,
        isActive: false,
        isDrawing: false,
    },
    arrMemory: []
};

au.elements = {};
au.elements.init = function() {
    au.elements.switcher = $('#switch-table');
    au.elements.switcher.hurkanSwitch({
        // Callbacks
        'on': function() { au.data.Of = false; },
        'off': function() { au.data.Of = true; },
        // label text
        'onTitle': 'On',
        'offTitle': 'Of',
        'responsive': true,
        'animate': true,
        'offColor': '',
        'onColor': 'info',
        'className': 'mr-2 mb-1 ml-2',
        'width': 30
    });
    $('.hurkanSwitch .active').click();

};


au.d3 = {
    updateRect: function() {
        au.data.copyrect.rect = d3.select(au.data.copyrect.rectangleElement[0][0]);
        au.data.copyrect.rect.attr({
            x: au.data.copyrect.rectData[1].x - au.data.copyrect.rectData[0].x > 0 ? au.data.copyrect.rectData[0].x : au.data.copyrect.rectData[1].x,
            y: au.data.copyrect.rectData[1].y - au.data.copyrect.rectData[0].y > 0 ? au.data.copyrect.rectData[0].y : au.data.copyrect.rectData[1].y,
            width: Math.abs(au.data.copyrect.rectData[1].x - au.data.copyrect.rectData[0].x),
            height: Math.abs(au.data.copyrect.rectData[1].y - au.data.copyrect.rectData[0].y)
        });
        var radius = 4;
        au.data.points.point1 = d3.select(au.data.copyrect.pointElement1[0][0]).data(au.data.copyrect.rectData);
        au.data.points.point1.attr('r', radius)
            .attr('cx', au.data.copyrect.rectData[0].x)
            .attr('cy', au.data.copyrect.rectData[0].y);
        au.data.points.point2 = d3.select(au.data.copyrect.pointElement2[0][0]).data(au.data.copyrect.rectData);
        au.data.points.point2.attr('r', radius)
            .attr('cx', au.data.copyrect.rectData[1].x)
            .attr('cy', au.data.copyrect.rectData[1].y);
        au.data.points.point3 = d3.select(au.data.copyrect.pointElement3[0][0]).data(au.data.copyrect.rectData);
        au.data.points.point3.attr('r', radius)
            .attr('cx', au.data.copyrect.rectData[1].x)
            .attr('cy', au.data.copyrect.rectData[0].y);
        au.data.points.point4 = d3.select(au.data.copyrect.pointElement4[0][0]).data(au.data.copyrect.rectData);
        au.data.points.point4.attr('r', radius)
            .attr('cx', au.data.copyrect.rectData[0].x)
            .attr('cy', au.data.copyrect.rectData[1].y);
    },
    dragRect: function(e) {
        for (var i = 0; i < au.data.copyrect.rectData.length; i++) {
            d3.select(au.data.copyrect.rectangleElement[0][0])
                .attr('x', au.data.copyrect.rectData[i].x += e.dx)
                .attr('y', au.data.copyrect.rectData[i].y += e.dy);
        }
        au.d3.updateRect();
    },
    dragPoint1: function(e, pos) {
        var d4 = d3.select(au.data.copyrect.pointElement1[0][0]);
        if (pos === 'all') {
            d4.attr('cx', au.data.copyrect.rectData[0].x += e.dx)
                .attr('cy', au.data.copyrect.rectData[0].y += e.dy);
        } else if (pos === 'w') {
            d4.attr('cx', au.data.copyrect.rectData[0].x += e.dx);
        } else if (pos === 'h') {
            d4.attr('cy', au.data.copyrect.rectData[0].y += e.dy);
        }
        au.d3.updateRect();
    },
    dragPoint2: function(e, pos) {
        var d4 = d3.select(au.data.copyrect.pointElement2[0][0]);
        if (pos === 'all') {
            d4.attr('cx', au.data.copyrect.rectData[1].x += e.dx)
                .attr('cy', au.data.copyrect.rectData[1].y += e.dy);
        } else if (pos === 'w') {
            d4.attr('cx', au.data.copyrect.rectData[1].x += e.dx);
        } else if (pos === 'h') {
            d4.attr('cy', au.data.copyrect.rectData[1].y += e.dy);
        }
        au.d3.updateRect();
    },
    dragPoint3: function(e, pos) {
        var d4 = d3.select(au.data.copyrect.pointElement3[0][0]);
        if (pos === 'all') {
            d4.attr('cx', au.data.copyrect.rectData[1].x += e.dx)
                .attr('cy', au.data.copyrect.rectData[0].y += e.dy);
        } else if (pos === 'w') {
            d4.attr('cx', au.data.copyrect.rectData[1].x += e.dx);
        } else if (pos === 'h') {
            d4.attr('cy', au.data.copyrect.rectData[0].y += e.dy);
        }
        au.d3.updateRect();
    },
    dragPoint4: function(e, pos) {
        var d4 = d3.select(au.data.copyrect.pointElement4[0][0]);
        if (pos === 'all') {
            d4.attr('cx', au.data.copyrect.rectData[0].x += e.dx)
                .attr('cy', au.data.copyrect.rectData[1].y += e.dy);
        } else if (pos === 'w') {
            d4.attr('cx', au.data.copyrect.rectData[0].x += e.dx);
        } else if (pos === 'h') {
            d4.attr('cy', au.data.copyrect.rectData[1].y += e.dy);
        }
        au.d3.updateRect();
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
        return res ? res :  array[0];
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
        return res ? res :  array[0];
    },

    findLineArr: function(y0, y1) {
        var header = [];
        var Yg0 = y0;
        var Yg1 = y1;
        var zeroLine = Yg0 + ((Yg1 - Yg0) / 2);
        paint.objects.disactiv.forEach(function(val) {
            if (val.rectData[0].y < zeroLine && val.rectData[1].y > zeroLine && (val.type === "TableDatas" || val.type === 'MainHeader')) {
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
            if (lengZero === findLineArr.length) {
                return ['coll-table', Down[1], findLineArr];
            } else {
                return false;
            }
        } else {
            var Up = au.helpfunc.lookUp();
            if (Up[0]) {
                findLineArr = au.helpfunc.findLineArr(Up[1].rectData[0].y, Up[1].rectData[1].y);
                if (lengZero === findLineArr.length) {
                    return ['header', Up[1], findLineArr];
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    },
    lookDown: function() {
        var x0 = paint.objects.activrect.rectData[0].x;
        var x1 = paint.objects.activrect.rectData[1].x;
        var zeroX = x0 + ((x1 - x0) / 2);
        var zDoll = paint.objects.activrect.rectData[1].y;
        var res = paint.objects.disactiv.filter(function(val, i) {
            if (val.rectData[0].x < zeroX && val.rectData[1].x > zeroX && val.type === "TableDatas" && zDoll < val.rectData[1].y) {
                return true;
            } else {
                return false;
            }
        });
        if (!!res.length) {
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
            if (val.rectData[0].x < zeroX && val.rectData[1].x > zeroX && (val.type === "TableDatas" || val.type === 'MainHeader') && zDoll > val.rectData[1].y) {
                return true;
            } else {
                return false;
            }
        });
        if (!!res.length) {
            res = au.helpfunc.getMaxinValue(res);
            return [true, res];
        } else {
            return [false, null];
        }
    },
    replaceCopyToDisactive: function(copy) {
        paint.objects.disactiv = paint.objects.disactiv.map(function(val) {
            if (val.id === copy.id) {
                return copy;
            } else {
                return val;
            }
        });
    },
    HeaderRooles: function(e, w, header, table) {
        var HeaderRect = header[0];
        if (w === 'dragRect') {
            au.data.copyrect = HeaderRect;
            au.d3[w](e);
            au.helpfunc.replaceCopyToDisactive(au.data.copyrect); // ned replace data in paint.objects.disactive
        } else {
            au.data.copyrect = HeaderRect; // change width Header Rectangle
            au.d3[w](e, 'w');
            au.helpfunc.replaceCopyToDisactive(au.data.copyrect);
            var arrRecogCollumnsFiltered = au.helpfunc.filterInTableActiveRect(table);
            arrRecogCollumnsFiltered.forEach(function(val) {
                au.data.copyrect = val;
                au.d3[w](e, 'h');
                au.helpfunc.replaceCopyToDisactive(au.data.copyrect);
            });
        }
    },
    TableRooles: function(e, w, header, table) {
        au.data.copyrect = table[0];
        if (w === 'dragRect') {
            au.d3[w](e);
            au.helpfunc.replaceCopyToDisactive(au.data.copyrect); // ned replace data in paint.objects.disactive
        } else {

            au.d3[w](e, 'w'); // all,w-x coord ,h- y coord
            au.helpfunc.replaceCopyToDisactive(au.data.copyrect);
        }
    },
    filterInTableActiveRect: function(table) {
        return table.filter(function(val) {
            return val.id != paint.objects.activrect.id;
        });
    },
    filterInmultiArr: function(del, arr) {
        return arr.filter(function(val) {
            return val.id != del.id;
        });
    },
    checkIntersectionRect: function(arrRectLine) {
        var state = false;
        var r = temp.helpfunc.percentchangecord(paint.objects.activrect.rectData);
        arrRectLine.forEach(function(val) {
            var ri = temp.helpfunc.percentchangecord(val.rectData);
            if (cc.helpfunc.compareInit(r, ri)) state = true;
        });
        return state;
    },
};

au.handlers = {
    findHeader: function(e, w) { // e=event mouse ,  w - 'string' name function from file  d3-js-last.js
        var header, table;
        var zero = au.helpfunc.findLineArr(paint.objects.activrect.rectData[0].y, paint.objects.activrect.rectData[1].y);
        if (zero.length < 3) return; //=> table must have 3 collumns min  !Important
        var UpDown = au.helpfunc.lookAroundZeroString(zero.length);
        if (!UpDown) return;
        if (UpDown[0] === 'coll-table') { //Table collumns   // change table collum if Headerrectangle recognize
            //  var  UpDown => Table
            // var zero => Header
            header = zero; // [array header included active rectangle]
            table = UpDown.splice(1); // [rect ander header,arrline collumns]
            //
            if (au.helpfunc.checkIntersectionRect(au.helpfunc.filterInTableActiveRect(header).concat(au.helpfunc.filterInmultiArr(table[0], table[1])))) return; // if rect intersections
            au.helpfunc.TableRooles(e, w, header, table);
        } else { // Table Collumns click => Change Header
            // var zero => Table Line
            // var UpDown => THeder Line
            header = UpDown.splice(1);
            table = zero; // included activerectangle
            if (au.helpfunc.checkIntersectionRect(au.helpfunc.filterInTableActiveRect(table).concat(au.helpfunc.filterInmultiArr(header[0], header[1])))) return; // if rect intersections
            au.helpfunc.HeaderRooles(e, w, header, table);
        }
    },
};

au.init = {
    recognizeAuto: function(event, whatdo) {
        if (au.data.Of) return;
        au.handlers.findHeader(event, whatdo);
    }
};
