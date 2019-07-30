let gf = {};
gf.handlers = {
    sendProcess: function(temp) {
        test.ajax.sendTestProccess(temp);
    },
};

gf.init = function(Temp) {
    gf.handlers.sendProcess(test.fix.addVatsandIbans(Temp));
};
