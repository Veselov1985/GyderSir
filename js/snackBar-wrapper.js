function Snack () {
    this.configuration = {
        default: {
            pos: 'top-right',
            showAction: true,
            duration: 3000,
            width: '400px',
            actionText: 'Close',
            actionTextColor: 'black',
            onActionClick: e =>{
                $(e).css('opacity', 0)
            }
        },
        alert: {
            textColor:'black',
            backgroundColor: '#a9f294',
            customClass: 'snackBar--message  snack--alert',
        },
        info: {
            textColor: '#059' ,
            backgroundColor: '#BEF',
            customClass: 'snackBar--message snack--info',
        },
        error: {
            textColor: 'black',
            backgroundColor: '#FFBABA',
            customClass: 'snackBar--message snack--error',
        },
    }
}

Snack.prototype.alert = (text) => {
    Snackbar.show({...{text: text}, ...snack.configuration.default, ...snack.configuration.alert})
};
Snack.prototype.error = (text) => {
    Snackbar.show({...{text: text}, ...snack.configuration.default, ...snack.configuration.error})
};
Snack.prototype.info = (text) => {
    Snackbar.show({...{text: text}, ...snack.configuration.default, ...snack.configuration.info})
};

const snack = new Snack();




