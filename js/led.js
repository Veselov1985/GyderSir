var led = {};
led.element = {};

led.init = function() {
    led.element.led = $('#led');
};

led.action = {
    ledOn: function() {
        led.element.led.removeClass('led-off').addClass('led-on');
    },
    ledOff: function() {
        led.element.led.removeClass('led-on').addClass('led-off');
    },
    ledRect: function() {
        if (paint.objects.activrect.type == 'MainHeader') {
            led.action.ledOn();
        } else {
            led.action.ledOff();
        }
    }
};
led.init();