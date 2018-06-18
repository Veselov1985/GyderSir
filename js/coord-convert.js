var cc={};

cc={
WHServer:[],
};

cc.helpfunc={

};


cc.handlers={

    getInitWHServer:function(){
        var res =temp.serverInfo[0][0].Chars[0];
        cc.WHServer=[res.Xpos,res.Ypos];
    },
    convertWHServer:function(){
        var page =temp.DataWorkspace.activpage;
        var serverArrPage =temp.serverInfo[page];
        var AciveRect=cc.handlers.getCoordActiveRectangle(); // need convert in %




    },
    getCoordActiveRectangle:function(){
        var act=paint.objects.activrect.rectData; // this is Array [0,1]
    return act;
    },



}


cc.init=function(){
    cc.handlers.getInitWHServer();








    return result;  // need return str result

}