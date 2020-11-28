$(function () {
    $('#reg-link').on('click',function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#login-link').on('click',function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })
    var form= layui.form
    var layer=layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ]
    })
    $('#regForm').on('submit',function (event) {
        event.preventDefault();
        $.post('/api/reguser',{
            username:$('#regForm [name=username]').val(),
            password:$('#regForm [name=password]').val()
        },function (res) {
            if (res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#login-link').click();
        })
    })
    $('#loginForm').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'post',
            data:$(this).serialize(),
            success:function (result) {
                if (result.status!==0) return layer.msg('登录失败')
                layer.msg('登录成功')
                localStorage.setItem('token',result.token)
                //location.href='/index.html'
            }
        })
    })
})
