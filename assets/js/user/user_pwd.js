$(function () {
    var form=layui.form
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        samePwd:function (value) {
            if (value===$('[name=oldPwd]').val()){
                return '新旧密码相同，请更换新密码'
            }

        },
        rePwd:function (value) {
            if (value!==$('[name=newPwd]').val()){
                return '确认密码不正确'
            }
        }
    })
    $('.layui-form').on('submit',function (event) {
        event.preventDefault();
        let arr=$(this).serialize().split('&').filter((value,index)=>{
            return index!==2
        })
        let data=arr.join('&')
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:data,
            success:function (result) {
                console.log(result)
                if (result.status!==0) return layui.layer.msg('更新密码失败')
                layui.layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})
