$(function () {
    var layer =layui.layer
    var form=layui.form
    initEditor()
    initCate()
    function initCate() {
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function (result) {
                if (result.status!==0) layer.msg("获取文章分类列表失败")
                let htmlStr=template('tpl-cate',result)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    function publishArcicle(fd) {
        $.ajax({
            method:'post',
            url:'/my/article/add',
            data:fd,
            contentType:false,
            processData:false,
            success:function (result) {
                console.log(result)
                if (result.status!==0) return layer.msg('发布文章失败')
                layer.msg('发布文章成功')
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')
// 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
// 3. 初始化裁剪区域
    $image.cropper(options)
    $('#btnChooseCover').on('click',function () {
        $('#coverFile').click();
    })
    $('#coverFile').on('change',function (event) {
        let files=event.target.files
        if(files.length===0){
            return
        }
        let newImageUrl=URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImageUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    var article_state='已发布'
    $('#btnSave2').on('click',function () {
        article_state='草稿'
    })
    $("#form_pub").on('submit',function (event) {
        event.preventDefault();
        var fm= new FormData($(this)[0])
        fm.append('state',article_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
// 得到文件对象后，进行后续的操作
                fm.append("cover_img",blob)
                publishArcicle(fm)
            })


    })
})
