$(function () {
    getUserInfo();
    var layer=layui.layer
    $('#btnLogout').on('click',function () {
        layer.confirm('确定要退出吗？', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/bigEvent/login.html'
            layer.close(index);
        });
    })
})
function  getUserInfo() {
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        //
        // },
        success:function (result) {
            if (result.status!==0) return layui.layer.msg("获取用户信息失败")
            //console.log(result.data)
            renderAvatar(result.data)
        }
    })
}
function renderAvatar(user){
    var name=user.nickname||user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;'+name)
    if (user.user_pic!=null){
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avator').hide()
    }else {
        $('.layui-nav-img').hide()
        $('.text-avator').html(name[0].toUpperCase()).show()
    }
}
