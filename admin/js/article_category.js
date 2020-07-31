//文章管理页面
$(function() {

    // 封装ajax请求
    function render() {
        //发送ajax请求获取文章分类数据
        $.ajax({
            url: BigNew.category_list,
            type: 'get',
            success: function(res) {
                //使用模板渲染数据
                if (res.code == 200) {
                    var htmlStr = template('categoryList', res);
                    $('tbody').html(htmlStr);
                }
            }
        });
    }

    render();

    //给模态框的确定按钮注册点击事件
    $('#myModal .btn-sure').on('click', function() {
        //当前模态框是添加按钮还是更新按钮点出来的通过有无id值来判断
        //有id说明是更新操作 无id是添加操作
        var id = $('#myModal input[name=id]').val();

        $.ajax({
            // url: BigNew.category_add,
            url: id ? BigNew.article_edit : BigNew.category_add,
            type: 'post',
            data: $('#myForm').serialize(),
            //添加成功隐藏模态框
            success: function(res) {
                if (res.code == 201 || res.code == 200) {
                    $('#myModal').modal('hide');
                    // 进行局部刷新
                    render();
                }
            }
        });
    })


    //给删除的模态框注册时间
    $('#delModal').on('shown.bs.modal', function(e) {
        //将其转为jq对象获得id
        //将其提升作用域
        window.categoryId = $(e.relatedTarget).data('id');
    })

    //删除操作
    //给删除的模态框的确定按钮注册事件
    $('#delModal .btn-sure-del').on('click', function() {
        //发送ajax请求
        $.ajax({
            url: BigNew.category_delete,
            type: 'post',
            data: {
                id: window.categoryId
            },
            success: function(res) {
                if (res.code == 204) {
                    //隐藏模态框
                    $('#delModal').modal('hide');
                    //重新渲染
                    render();
                }
            }
        });
    })


    //确定模态框是哪个按钮触发
    //给模态框注册一个显示按钮触发的事件
    $('#myModal').on('shown.bs.modal', function(e) {
        if (e.relatedTarget.id == 'xinzengfenlei') {
            //如果是新增分类按钮
            $('#myModal h4').text('新增文件夹');
            //清空原来的数据 reset表单重置只能用于DOM对象
            $('#myForm')[0].reset();
        } else {
            //编辑按钮
            $('#myModal h4').text('更新文章分类');
            //向服务器发送请求 请求当年要编辑的数据
            $.ajax({
                type: 'get',
                url: BigNew.category_search,
                data: {
                    id: $(e.relatedTarget).data('id')
                },
                success: function(res) {
                    //渲染数据到页面上
                    //讲id存在隐藏域中
                    $('#myForm input[name=id]').val(res.data[0].id)
                    $('#myForm input[name=name]').val(res.data[0].name)
                    $('#myForm input[name=slug]').val(res.data[0].slug)
                }
            })
        }
    })
});