var trw = {};
trw.elements = {};
trw.data = {};


trw.init = function() {
    trw.elements.btn_send_req = $('#btn_send_req');
};



trw.EventEmmiter = {
    listen: function(callback) {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

        // Listen to message from parent window
        eventer(messageEvent, function(e) {
            console.log('origin: ', e.origin);
            console.log('parent received message!: ', e.data);
            callback(e.data);
        }, false);
    },
    emit: function(data) {
        // data => { token: 'aaa', secret: 'bbb' }
        window.opener.postMessage(data, '*');
    },
    callbackHandlers: function(data) {
        console.log(data);
    }
};






$(document).ready(function() {
    trw.init();
    trw.EventEmmiter.listen(trw.EventEmmiter.callbackHandlers);


    trw.elements.btn_send_req.on('click', function() {
        trw.EventEmmiter.emit({ data: 'test' });
    });




});