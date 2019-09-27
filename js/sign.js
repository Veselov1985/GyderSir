let sign = {};

sign.data = {
    token: false,
};

sign.workFlowUrl = 'https://gip-api.demo-server.ml';
sign.routers = {
    sign_in: `${sign.workFlowUrl}/api/Users/authenticate`,
    sign_up: `${sign.workFlowUrl}/api/Users/register`,
    get_users: `${sign.workFlowUrl}/api/Users`,
    get_user: (id) => `${sign.workFlowUrl}/api/Users/${id}`,
};
sign.elements = {
    auth: {el: {}, id: '#auth'},
    request_content_auth: {el: {}, id: '#request_content_auth'},
    sign_in_root: {el: {}, id: '#sign_in_root'},
    sign_in_checkbox: {el: {}, id: '#sign_in_checkbox'},
    sign_in_login: {el: {}, id: '#sign_in_login'},
    sign_in_password: {el: {}, id: '#sign_in_password'},
    sign_in__button: {el: {}, id: '#sign_in__button'},
    sign_in__password_view: {el: {}, id: '#sign_in__password_view'},
    sign_in__password_hide: {el: {}, id: '#sign_in__password_hide'},


    sign_up_router_action: {el: {}, id: '#sign_up_router_action'},
    sign_up_root: {el: {}, id: '#sign_up_root'},
    sign_in_router_action: {el: {}, id: '#sign_in_router_action'},
    sign_up_first_name: {el: {}, id: '#sign_up_first_name'},
    sign_up_last_name: {el: {}, id: '#sign_up_last_name'},
    sign_up_user_name: {el: {}, id: '#sign_up_user_name'},
    sign_up_password: {el: {}, id: '#sign_up_password'},
    sign_up_button: {el: {}, id: '#sign_up_button'},
    sign_up_password_view: {el: {}, id: '#sign_up_password_view'},
    sign_up_password_hide: {el: {}, id: '#sign_up_password_hide'},

    user_name: {el: {}, id: '#user_name'},

};
sign.handlers = {
    getSignInValue: () => {
        return {
            "username": sign.elements.sign_in_login.el.val(),
            "password": sign.elements.sign_in_password.el.val(),
        }
    },
    getSignUpValue: () => {
        return {
            "firstName": sign.elements.sign_up_first_name.el.val(),
            "lastName": sign.elements.sign_up_last_name.el.val(),
            "username": sign.elements.sign_up_user_name.el.val(),
            "password": sign.elements.sign_up_password.el.val(),
        }

    },
    resetSignUpValue: () => {
        const inpSignUp = [sign.elements.sign_up_first_name.el,
            sign.elements.sign_up_last_name.el,
            sign.elements.sign_up_user_name.el,
            sign.elements.sign_up_password.el];
        inpSignUp.forEach(item => item.val(''))
    },
};

sign.validators = {
    sign_in: {
        form: (params) => {
            return Object.values(params).reduce((acc, item) => !!(acc && item.trim().length), true)
        }
    }
};

sign.actions = {
    login: (params) => {
        const user = {
            id: 0,
            isAdmin: true,
            firstName: '',
            lastName: ''
        };
        const userAuth = {...user, ...params};
        sign.ajax.fetch(sign.routers.sign_in, 'POST', userAuth)
            .then(response => {
                const {token, username} = response;
                if (token) {
                    if (sign.local.getLocal('remember')) {
                        sign.local.setToken(token);
                        sign.local.setLocal('username', username);
                    }
                    sign.view.main.setUserName(username, true);
                    sign.data.token = token;
                    sign.view.main.showContent();
                    trw.auth.init();
                }
            }).catch((err) => {
            snack.error(JSON.parse(err[0].responseText).message);
        })
    },
    register: (param) => {
        const additionalParams = {
            "id": 0,
            "isAdmin": true,
        };
        const params = {...additionalParams, ...param};
        sign.ajax.fetch(sign.routers.sign_up, 'POST', params)
            .then(() => {
                snack.info('Are you registered.Go to the Sign In page');
                sign.handlers.resetSignUpValue();
            })
            .catch(err => {
                snack.error(JSON.parse(err[0].responseText).message)
            })
    }
};
sign.view = {
    main: {
        showSignUp: () => {
            sign.elements.request_content_auth.el.css('display', 'none');
            sign.elements.auth.el.css('display', 'flex');
            sign.elements.sign_up_root.el.css('display', 'flex');
            sign.elements.sign_in_root.el.css('display', 'none');
        },
        showSignIn: () => {
            sign.elements.request_content_auth.el.css('display', 'none');
            sign.elements.auth.el.css('display', 'flex');
            sign.elements.sign_up_root.el.css('display', 'none');
            sign.elements.sign_in_root.el.css('display', 'flex');
        },
        showContent: () => {
            sign.elements.auth.el.css('display', 'none');
            sign.elements.request_content_auth.el.css('display', 'block');
        },
        setRemember: () => {
            const state = sign.local.getLocal('remember');
            const checkBox = sign.elements.sign_in_checkbox.el;
            checkBox.attr('checked', state);
        },
        signInShowPassword: () => {
            sign.elements.sign_in__password_view.el.attr('hidden', true);
            sign.elements.sign_in__password_hide.el.attr('hidden', false);
            sign.elements.sign_in_password.el.attr('type', 'text');

        },
        signInHidePassword: () => {
            sign.elements.sign_in__password_view.el.attr('hidden', false);
            sign.elements.sign_in__password_hide.el.attr('hidden', true);
            sign.elements.sign_in_password.el.attr('type', 'password');
        },
        signUpshowPassword: () => {
            sign.elements.sign_up_password_view.el.attr('hidden', true);
            sign.elements.sign_up_password_hide.el.attr('hidden', false);
            sign.elements.sign_up_password.el.attr('type', 'text');

        },
        signUphidePassword: () => {
            sign.elements.sign_up_password_view.el.attr('hidden', false);
            sign.elements.sign_up_password_hide.el.attr('hidden', true);
            sign.elements.sign_up_password.el.attr('type', 'password');
        },
        setUserName: (value, state) => {
            sign.elements.user_name.el.text(state ? `User: ${value}` : '')
        }
    }
};

sign.ajax = {
    fetch: (url, method, params, token) => {
        return new Promise((resolve, reject) => {
            const headers = token ? {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': token,
            } : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            $.ajax({
                headers,
                url: url,
                type: method,
                data: params ? JSON.stringify(params) : null,
                dataType: 'json',
                success: (data) => {
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject([jqXHR, textStatus, errorThrown])
                },
                beforeSend: () => {
                    ajax.loader.handler.onLoad()
                },
                complete: () => {
                    ajax.loader.handler.offLoad()
                }
            });
        })
    },
};

sign.local = {
    deleteLocal: (key) => localStorage.removeItem(key),
    getLocal: (key) => localStorage.getItem(key),
    setLocal: (key, params) => localStorage.setItem(key, params),
    toggleRemember: () => {
        sign.local.getLocal('remember') ? sign.local.deleteLocal('remember') : sign.local.setLocal('remember', true);
    },
    setToken: (value) => {
        sign.data.token = value;
        if (sign.local.getLocal('remember')) {
            sign.local.setLocal('token', value)
        }
    },
    deleteToken: () => {
        sign.local.deleteLocal('token')
    },
};

sign.init = {
    elements: () => {
        // Sign In
        sign.elements.auth.el = $(sign.elements.auth.id);
        sign.elements.sign_in_root.el = $(sign.elements.sign_in_root.id);
        sign.elements.sign_up_router_action.el = $(sign.elements.sign_up_router_action.id);
        sign.elements.sign_in_checkbox.el = $(sign.elements.sign_in_checkbox.id);
        sign.elements.sign_in_password.el = $(sign.elements.sign_in_password.id);
        sign.elements.sign_in__button.el = $(sign.elements.sign_in__button.id);
        sign.elements.sign_in_login.el = $(sign.elements.sign_in_login.id);
        sign.elements.sign_in__password_view.el = $(sign.elements.sign_in__password_view.id);
        sign.elements.sign_in__password_hide.el = $(sign.elements.sign_in__password_hide.id);
        // Sign Up
        sign.elements.sign_up_root.el = $(sign.elements.sign_up_root.id);
        sign.elements.sign_in_router_action.el = $(sign.elements.sign_in_router_action.id);
        sign.elements.sign_up_first_name.el = $(sign.elements.sign_up_first_name.id);
        sign.elements.sign_up_last_name.el = $(sign.elements.sign_up_last_name.id);
        sign.elements.sign_up_user_name.el = $(sign.elements.sign_up_user_name.id);
        sign.elements.sign_up_password.el = $(sign.elements.sign_up_password.id);
        sign.elements.sign_up_button.el = $(sign.elements.sign_up_button.id);
        sign.elements.sign_up_password_view.el = $(sign.elements.sign_up_password_view.id);
        sign.elements.sign_up_password_hide.el = $(sign.elements.sign_up_password_hide.id);
        // Content
        sign.elements.request_content_auth.el = $(sign.elements.request_content_auth.id);
        sign.elements.user_name.el = $(sign.elements.user_name.id);
    },
    actions: () => {
        sign.view.main.setRemember();
        const token = sign.local.getLocal('token');
        const username = sign.local.getLocal('username');
        if (token) {
            sign.data.token = token;
            sign.view.main.setUserName(username, true);
            sign.view.main.showContent();
            trw.auth.init()
        } else {
            sign.view.main.showSignIn();
            ajax.loader.handler.offLoad()
        }
        sign.elements.sign_up_router_action.el.on('click', () => {
            sign.view.main.showSignUp();
        });
        sign.elements.sign_in_router_action.el.on('click', () => {
            sign.view.main.showSignIn();
        });

        sign.elements.sign_in_checkbox.el.on('change', () => {
            sign.local.toggleRemember();
        });

        sign.elements.sign_in__password_view.el.on('click', () => {
            sign.view.main.signInShowPassword()
        });
        sign.elements.sign_in__password_hide.el.on('click', () => {
            sign.view.main.signInHidePassword();
        });

        sign.elements.sign_up_password_view.el.on('click', () => {
            sign.view.main.signUpshowPassword()
        });
        sign.elements.sign_up_password_hide.el.on('click', () => {
            sign.view.main.signUphidePassword();
        });

        sign.elements.sign_in__button.el.on('click', () => {
            const params = sign.handlers.getSignInValue();
            if (sign.validators.sign_in.form(params)) {
                sign.actions.login(params);
            } else {
                snack.info('Fields must not be empty');
            }
        });

        sign.elements.sign_up_button.el.on('click', () => {
            const params = sign.handlers.getSignUpValue();
            if (sign.validators.sign_in.form(params)) {
                sign.actions.register(params);
            } else {
                snack.info('Fields must not be empty');
            }
        })


    },
};

sign.init.elements();
sign.init.actions();
