var tr = {};
tr.routes = {};
tr.debug = false;
tr.routes.openWindow = tr.debug ? 'TemplateRequest/TempRequest' : 'TempRequest.html';

tr.data = {
    windowChild: '',
    id: '',
};
tr.elements = {};

tr.elements.init = function() {
    tr.elements.btn_temp_request = $('#btn_temp_request');
};

tr.handlers = {
    getDocumentsuccess: function(data) {
        /*
        @need send to part pdf Load events
           temp.Data.LoadPdfOpt.file_pdf = new FormData();
            $.each(data, function(key, value) {
                temp.Data.LoadPdfOpt.file_pdf.append(key, value);
            });
            temp.Ajax.sendFileToProccess(null,temp.loadEvent.success, temp.loadEvent.error);
                tr.elements.temp_request_modal.modal('hide');

        */
    },

};

tr.helpfunc = {

};




tr.ACTIONSCREATER = {
    saveTemplateNextStep: function(obj) {
        // obj=> {id: number - delete Template}
        return { event: 'NextStep', data: obj };
    }

    // part Actions createrow fow child
};


tr.chakeEvents = {
    init: function(data) {
        switch (data.event) {
            case 'DocumentProcessing':
                tr.chakeEvents.pdfDocumentWorker(data.data);
                break;
            case 'CloseChild':
                tr.chakeEvents.CloseChild();
                break;
            default:
                break;
        }

    },
    pdfDocumentWorker: function(data) {
        // child window send pdf document
        // save id work pdf document
        //  tr.data.id = data.id;
    },
    CloseChild: function() {
        tr.data.windowChild.close();
        tr.data.windowChild = '';
    }

};

tr.EventEmmiter = {
    listener: function(callback) {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        // Listen to message from child window
        eventer(messageEvent, function(e) {
            if (!tr.debug && e.origin != window.origin) return;
            console.log('origin: ', e.origin);
            console.log('parent received message!: ', e.data);
            callback(e);
        }, false);
    },
    emit: function(data) {
        //data => { event: 'name', data: '' }
        tr.data.windowChild.postMessage(data, '*');

    },
    callbackHandlers: function(e) {
        console.log(e);
        tr.chakeEvents.init(e.data);
    }
};



tr.action = function() {
    tr.elements.btn_temp_request.on('click', function() {
        if (tr.data.windowChild.closed == true || typeof tr.data.windowChild == 'string') {
            tr.data.windowChild = '';
            tr.data.windowChild = window.open(tr.routes.openWindow, 'request', "width=600,height=400,left=20px,top=20px,menubar=yes,toolbar=yes,location=yes,resizable=yes,scrollbars=yes");
        } else {
            temp.helpfunc.modalInfo(['Child Window', 'Already Open ']);
            return;
        }
    });

    // listener message child
    tr.EventEmmiter.listener(tr.EventEmmiter.callbackHandlers);
};


tr.init = function() {
    tr.elements.init();
    tr.action();
};