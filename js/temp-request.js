let tr = {};
tr.routes = {};
tr.debug = false;
tr.routes.openWindow = tr.debug ? 'TemplateRequest/TempRequest' : 'TempRequest.html';

tr.data = {
    windowChild: '',
    obj: {},
};
tr.elements = {
    btn_temp_request: {el:{},id:'btn_temp_request'}
};

tr.elements.init = function () {
    tr.elements.btn_temp_request.el = $(`#${tr.elements.btn_temp_request.id}`);
};

tr.handlers = {
    checkIfRequest: (pks) => {
        if (!$.isEmptyObject(tr.data.obj)) {
            const id = tr.data.obj;
            tr.data.obj = {};
            // TODO send to child window
            tr.EventEmmiter.emit({event: 'Save Template',obj: id, templateId:pks})
        }
    },
};

tr.helpfunc = {};

tr.chakeEvents = {
    init: function (data) {
        switch (data.event) {
            case 'DocumentProcessing':
                tr.chakeEvents.pdfDocumentWorker(data);
                break;
            case 'CloseChild':
                tr.chakeEvents.CloseChild();
                break;
            default: console.log('error in Events');
                break;
        }

    },
    pdfDocumentWorker: function (data) {
        window.focus();
        // if filter enable => reset filter
        if(temp.Data.leftTempList.filter.length>0) {
            temp.elementControl.object.btn_filter.click();
        }
        tr.data.obj = data.id;
        let $data = data.Template;
        $data = temp.loadEvent.prependConvertData($data);
        temp.loadEvent.singleRender($data);
    },
    CloseChild: function () {
        try {
            tr.data.windowChild.close();
        }
        catch (e) {
            console.log(e);
        }
        tr.data.windowChild = '';
        tr.data.obj = {};
    }

};

tr.EventEmmiter = {
    listener: function (callback) {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        // Listen to message from child window
        eventer(messageEvent, function (e) {
            if (!tr.debug && e.origin != window.origin) return;
            console.log('origin: ', e.origin);
            console.log('parent received message!: ', e.data);
            callback(e);
        }, false);
    },
    emit: function (data) {
        tr.data.windowChild.postMessage(data, '*');
    },
    callbackHandlers: function (e) {
        tr.chakeEvents.init(e.data);
    }
};


tr.action = function () {
    tr.elements.btn_temp_request.el.on('click', function () {
        if (tr.data.windowChild.closed === true || typeof tr.data.windowChild === 'string') {
            tr.data.windowChild = '';
            tr.data.windowChild = window.open(tr.routes.openWindow, 'request', "width=600,height=400,left=20px,top=20px,menubar=yes,toolbar=yes,location=yes,resizable=yes,scrollbars=yes");
        } else {
            tr.data.windowChild.focus();
        }
    });
    // listener message child
    tr.EventEmmiter.listener(tr.EventEmmiter.callbackHandlers);
};


tr.init = function () {
    tr.elements.init();
    tr.action();
};
