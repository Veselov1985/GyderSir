let ajax = {};

ajax.options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

ajax.post = (url, data$, success, error, beforeLoad, afterLoad) => new Promise((resolve, reject) => {
    $.ajax({
        headers: ajax.options.headers,
        url: `${url}`,
        type: "POST",
        data: data$ ? JSON.stringify(data$) : null,
        dataType: 'json',
        success: (data) => {
            success ? success(data) : console.log('no callbackSuccess');
            resolve(data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            error ? error(data) : console.log('no callbackError');
            reject([jqXHR, textStatus, errorThrown]);
        },
        beforeSend: () => {
            beforeLoad ? beforeLoad() : console.log('');
        },
        complete: () => {
            beforeLoad ? afterLoad() : console.log('');
        }
    });
});



