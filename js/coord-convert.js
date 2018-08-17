var cc = {};

cc = {
    WHServer: [],
};

cc.helpfunc = {
    compareInit: function(f, s) {
        return (f.X0.Y < s.X1.Y && f.X1.Y > s.X0.Y && f.X1.X > s.X1.X && f.X0.X < s.X0.X + 6 && f.X0.X < s.X1.X);
    },
};

cc.frontAction = {
    getViewFrontData: function() {
        return temp.helpfunc.percentchangecord(paint.objects.activrect.rectData); // return % coord search rectangle
    },
};

cc.handlers = {
    getInitWHServer: function() {
        var res = temp.serverInfo[0][0].Chars[0];
        cc.WHServer = [res.Xpos, res.Ypos];
    },
    findActiveDataServer: function() {
        var page = temp.DataWorkspace.activpage;
        return temp.serverInfo[page];
    },
    convertAbsCoordW: function(num) {
        return +((num.toFixed(3) * 100 / cc.WHServer[0]).toFixed(3));
    },
    convertAbsCoordH: function(num) {
        return +((num.toFixed(3) * 100 / cc.WHServer[1]).toFixed(3));
    },

    convertServerRect: function(obj) {
        return {
            X0: { X: cc.handlers.convertAbsCoordW(obj.Xpos), Y: cc.handlers.convertAbsCoordH(obj.Ypos) },
            X1: { X: cc.handlers.convertAbsCoordW(obj.XDim), Y: cc.handlers.convertAbsCoordH(obj.Ypos + obj.YDim) },
        };
    },
    findActiveCoordInServer: function(front, serverList) {
        var res = '';
        serverList.forEach(function(val, i) {
            var wordSever = val.Sentence;
            var RectServer = {
                XDim: val.XDim,
                Xpos: val.Xpos,
                YDim: val.YDim,
                Ypos: val.Ypos
            };
            RectServer = cc.handlers.convertServerRect(RectServer);
            if (cc.helpfunc.compareInit(front, RectServer)) {
                res += wordSever + '*';
            }
        });
        if (res == "") return false;
        return res.replace(/\*/g, " ").trim(); //if not found=> boolean , string=> secuss
    }
};

cc.init = function() {
    cc.handlers.getInitWHServer();
    var searchRectFront = cc.frontAction.getViewFrontData();
    var serverListData = cc.handlers.findActiveDataServer();
    return cc.handlers.findActiveCoordInServer(searchRectFront, serverListData);
};