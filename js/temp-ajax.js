let temp_ajax = {
    sendFileToProccess: () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: temp.routes.sendFileToProccessUrl,
                data: temp.Data.LoadPdfOpt.file_pdf,
                processData: false,
                contentType: false,
                type: 'POST',
                success: (data) => {
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject([jqXHR, textStatus, errorThrown])
                },
                beforeSend: () => {
                    pm.handlers.showPreloader();
                    load.handlers.showLoader(load.elements.load_btn_load_temp, load.elements.boss_btn_load_temp);
                },
                complete: () => {
                    pm.handlers.hidePreloader();
                    load.handlers.hideLoader(load.elements.load_btn_load_temp, load.elements.boss_btn_load_temp);
                }
            });
        })
    },
    sendSaveTemplaiteProccess: (data) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: temp.routes.sendSaveTempaiteProccess,
                type: "POST",
                data: JSON.stringify(data),
                dataType: 'json',
                success: (data) => {
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject([jqXHR, textStatus, errorThrown]);
                },
                beforeSend: () => {
                    load.handlers.togleLoader();
                    load.handlers.showLoader(load.elements.load_btn_save_temp, load.elements.boss_btn_save_temp);
                    pm.handlers.showPreloader();
                },
                complete: () => {
                    load.handlers.togleLoader();
                    load.handlers.hideLoader(load.elements.load_btn_save_temp, load.elements.boss_btn_save_temp);
                    pm.handlers.hidePreloader();
                }
            });
        })
    },
    sendDeleteTemplaiteProccess: (data) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: temp.routes.sendDeleteTemplaiteProccess,
                type: "POST",
                data: JSON.stringify(data),
                dataType: 'json',
                success: (data) => {
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject([jqXHR, textStatus, errorThrown]);
                },
                beforeSend: () => {
                    load.handlers.togleLoader();
                    pm.handlers.showPreloader();
                    load.handlers.showLoader(load.elements.load_btn_del_temp, load.elements.boss_btn_del);
                },
                complete: () => {
                    pm.handlers.hidePreloader();
                    load.handlers.togleLoader();
                    load.handlers.hideLoader(load.elements.load_btn_del_temp, load.elements.boss_btn_del);
                }
            });
        })
    },
    sendRenderProccessUrl: () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                data: '',
                url: temp.routes.sendRenderProccessUrl,
                type: "POST",
                success: (data) => {
                    temp_ajax.render.templaite.success(data);
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    temp_ajax.render.templaite.error(textStatus);
                    reject(errorThrown);
                },
                beforeSend: () => {
                },
                complete: () => {
                }
            });
        });
    },
};


temp_ajax.render = {
    templaite: {
        success: function (data) {
            var datas = [];
            data.forEach(function (val, i) {
                datas.push($.parseJSON(val));
            });
            datas.forEach(function (val, i) {
                temp.Data.leftTempList.data.push([val.Name, temp.img.off]);
                temp.Data.leftTempList.list.push(val);
            });
            temp.elementLeftBar.dataTable.init(temp.Data.leftTempList.data);
        },
        error: function () {
            snack.error('Error Server');
        },
    }
};
