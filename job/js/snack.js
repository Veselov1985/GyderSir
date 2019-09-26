
!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],function(){return a.Snackbar=b()}):"object"==typeof module&&module.exports?module.exports=a.Snackbar=b():a.Snackbar=b()}(this,function(){var a={};a.current=null;var b={text:"Default Text",textColor:"#FFFFFF",width:"auto",showAction:!0,actionText:"Dismiss",actionTextColor:"#4CAF50",showSecondButton:!1,secondButtonText:"",secondButtonTextColor:"#4CAF50",backgroundColor:"#323232",pos:"bottom-left",duration:5e3,customClass:"",onActionClick:function(a){a.style.opacity=0},onSecondButtonClick:function(a){},onClose:function(a){}};a.show=function(d){var e=c(!0,b,d);a.current&&(a.current.style.opacity=0,setTimeout(function(){var a=this.parentElement;a&&
a.removeChild(this)}.bind(a.current),500)),a.snackbar=document.createElement("div"),a.snackbar.className="snackbar-container "+e.customClass,a.snackbar.style.width=e.width;var f=document.createElement("p");if(f.style.margin=0,f.style.padding=0,f.style.color=e.textColor,f.style.fontSize="14px",f.style.fontWeight=300,f.style.lineHeight="1em",f.innerHTML=e.text,a.snackbar.appendChild(f),a.snackbar.style.background=e.backgroundColor,e.showSecondButton){var g=document.createElement("button");g.className="action",g.innerHTML=e.secondButtonText,g.style.color=e.secondButtonTextColor,g.addEventListener("click",function(){e.onSecondButtonClick(a.snackbar)}),a.snackbar.appendChild(g)}if(e.showAction){var h=document.createElement("button");h.className="action",h.innerHTML=e.actionText,h.style.color=e.actionTextColor,h.addEventListener("click",function(){e.onActionClick(a.snackbar)}),a.snackbar.appendChild(h)}e.duration&&setTimeout(function(){a.current===this&&(a.current.style.opacity=0,
// When natural remove event occurs let's move the snackbar to its origins
    a.current.style.top="-100px",a.current.style.bottom="-100px")}.bind(a.snackbar),e.duration),a.snackbar.addEventListener("transitionend",function(b,c){"opacity"===b.propertyName&&"0"===this.style.opacity&&("function"==typeof e.onClose&&e.onClose(this),this.parentElement.removeChild(this),a.current===this&&(a.current=null))}.bind(a.snackbar)),a.current=a.snackbar,document.body.appendChild(a.snackbar);getComputedStyle(a.snackbar).bottom,getComputedStyle(a.snackbar).top;a.snackbar.style.opacity=1,a.snackbar.className="snackbar-container "+e.customClass+" snackbar-pos "+e.pos},a.close=function(){a.current&&(a.current.style.opacity=0)};
// Pure JS Extend
// http://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
    var c=function(){var a={},b=!1,d=0,e=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(b=arguments[0],d++);for(var f=function(d){for(var e in d)Object.prototype.hasOwnProperty.call(d,e)&&(b&&"[object Object]"===Object.prototype.toString.call(d[e])?a[e]=c(!0,a[e],d[e]):a[e]=d[e])};d<e;d++){var g=arguments[d];f(g)}return a};return a});
//# sourceMappingURL=snackbar.min.js.map

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
