let job = {};
job.workFlowUrl = 'https://gip-api.demo-server.ml';

job.elements = {
    JobName: {el: {}, id: '#JobName'},
    FileName: {el: {}, id: '#FileName'},
    Token: {el: {}, id: '#Token'},
    File: {el: {}, id: '#File'},
    add_button: {el: {}, id: '#add_button'},
};

job.handlers = {
    getValue: () => {
        return {
            JobName: job.elements.JobName.el.val(),
            FileName: job.elements.JobName.el.val(),
            Token: job.elements.Token.el.val(),
            File: job.elements.File.el.val(),
            CustomerId: job.handlers.getGuid()
        }
    },

    getFormData: (obj) => {
        let f = new FormData();
        Object.entries(obj)
            .filter(([key, value]) => key !== 'Token')
            .map(([field, v]) => {
            if (field === 'File') {
                return [field, job.elements.File.el[0].files[0]]
            } else {
                return [field, v];
            }
        })
            .reduce((acc, [k, val]) => {
                f.append(k, val);
                acc[k] = val;
                return acc
            }, {});
        return f;
    },
    isNotEmptyFields: (obj) => Object.values(obj).reduce((acc, item) => !!(acc && item.trim().length), true),
    resetFilelds: () => {
        const inputEl = [job.elements.JobName.el,
            job.elements.FileName.el,
            job.elements.Token.el,
            job.elements.File.el];
        inputEl.forEach(el => el.val(''))
    },
    getGuid: () => {
        return '09960b26-42bc-4d77-bc29-adc760084005';
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
};

job.init = {
    elements: () => {
        job.elements.JobName.el = $(job.elements.JobName.id);
        job.elements.FileName.el = $(job.elements.FileName.id);
        job.elements.Token.el = $(job.elements.Token.id);
        job.elements.File.el = $(job.elements.File.id);
        job.elements.add_button.el = $(job.elements.add_button.id);

    },
    actions: () => {
        job.elements.add_button.el.on('click', () => {
            const params = job.handlers.getValue();
            const valid = job.handlers.isNotEmptyFields(params);
            if (valid) {
                const headers = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${params.Token}`,
                };
                const body =  job.handlers.getFormData(params);
                const options =  {
                    headers,
                    method: 'POST',
                    mode: 'cors', // no-cors, *cors, same-origin
                    body
                };
                fetch(
                    `${job.workFlowUrl}/api/Job`,
                    options
                   )
                    .then(resp => {
                        if (resp.status !== 200) {
                            snack.error(resp.statusText);
                        } else {
                            console.log(resp)
                        }

                    }).catch(err => {
                    snack.error(err);
                })
            } else {
                snack.info('Fields must not be empty')
            }
        })
    }

};

job.init.elements();
job.init.actions();
