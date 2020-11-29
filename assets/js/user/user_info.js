$(function () {
    var form=layui.form
    form.verify({
        nickname:function (value) {
            if (value.length>6){
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method:'get',
            url:'/my/userinfo',
            success:function (result) {
                if (result.status!==0) return layui.layer.msg('获取用户信息失败')
                form.val('userInfo',result.data)
            }
        })
    }
    $('#btnReset').on('click',function (event) {
        event.preventDefault()
        initUserInfo()

    })
    $('.layui-form').on('submit',function (event) {
        event.preventDefault();
        //拿到表单中的数据，去掉username
        let arr= $('.layui-form').serialize().split('&').filter((value,index)=>{
            return index!==1
        })
        let data=arr.join('&')
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data:data,
            success:function(result) {
                if (result.status!==0) return layer.msg('更改用户信息失败')
                layer.msg("更改用户信息成功")
                window.parent.getUserInfo()
            }

        })

    })

})
