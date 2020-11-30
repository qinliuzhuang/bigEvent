$(function () {
    var layer =layui.layer;
    var form=layui.form;
    initArtCate()
    function initArtCate() {
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function (result) {
                if (result.status!==0) layer.msg("请求列表失败")
                let str=template('art_cate_date',result)
                $('tbody').html(str)
            }
        })
    }
    var index_add=null
    $('#add_cate').on('click',function () {
        index_add= layer.open({
            title:'添加文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog-add').html() //这里content是一个普通的String
        });
    })
    $('body').on('submit','#add-cate-form',function (event) {
        event.preventDefault()
        $.ajax({
            method: 'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function (result) {
                console.log(result)
                if (result.status!==0) return layer.msg("新增文章分类失败")
                layer.msg("添加文章分类成功")
                initArtCate();
                layer.close(index_add)
            }
        })
    })
    var index_edit=null
    $('body').on('click','.btnEdit',function () {
        index_edit= layer.open({
            title:'修改文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog-edit').html() //这里content是一个普通的String
        });
        let id=$(this).attr('data-id')
        console.log(id)
        $.ajax({
            method:'GET',
            url:"/my/article/cates/"+id,
            success:function (result) {
                if (result.status!==0) return layer.msg('获取文章分类失败')
                form.val("editForm",result.data)
            }
        })
    })
    $('body').on('submit','#edit-cate-form',function (event) {
        event.preventDefault();
        $.ajax({
            method:'post',
            url:"/my/article/updatecate",
            data:$('#edit-cate-form').serialize(),
            success:function (result) {
                if (result.status!==0) return layer.msg("更新文章分类失败")
                layer.msg("文章分类更新成功")
                layer.close(index_edit)
                initArtCate()
            }
        })
    })
    $('body').on('click','#btnDelete',function () {
        let id=$(this).attr('data-id')
        layer.confirm('是否删除', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'get',
                url:'/my/article/deletecates/'+id,
                success:function (result) {
                    console.log(result)
                    if (result.status!==0) return layer.msg('删除失败')
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCate()
                }
            })

        });
    })
})
