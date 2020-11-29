$.ajaxPrefilter(function (options) {
    options.url= 'http://127.0.0.1:3007'+options.url
    if (options.url.indexOf('/my/')!==-1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete=function (result) {
        if (result.responseJSON.status===1&&result.responseJSON.message==='身份认证失败！'){
            localStorage.removeItem('token')
            location.href='/bigEvent/login.html'
        }
    }
})
