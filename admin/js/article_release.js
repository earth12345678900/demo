//文章发布页面
$(function() {

    //发送ajax请求获取文章分类数据
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        success: function(res) {
            //使用模板渲染数据
            if (res.code == 200) {
                var htmlStr = template('categoryList', res);
                $('#selCategory').html(htmlStr);
            }
        }
    });


    //实现图片本地预览
    $('#inputCover').on('change', function() {
        //获取待上传的文件
        var file = this.files[0];
        //生成一个图片链接
        var url = URL.createObjectURL(file);
        //给img赋值
        $('#myForm .article_cover').attr('src', url);
    })


    //启用日期插件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        onClose: false,
        zIndex: 99999
    })

    //启用富文本编辑器
    var E = window.wangEditor
    var editor = new E('#editor')
        // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();

    //给富文本编辑器添加内容  相当于是将服务器端数据库中的数据渲染在富文本编辑器上
    // html方法会将原来的数据给覆盖掉
    // editor.txt.html('<p>这是使用富文本编辑器来添加的新的内容数据</p>')
    // editor.txt.append('<p>这是使用富文本编辑器来添加的新的内容数据</p>')

    //给form表单注册事件
    $('#myForm').on('click', '.btn', function(e) {
        e.preventDefault();
        //获取发送给服务器的数据FormData
        var data = new FormData($('#myForm')[0])
            //submit获取不到 所以将文章内容追加到data中
        data.append('content', editor.txt.html());
        //判断文章状态是已发布还是存为草稿
        if ($(this).hasClass('btn-release')) {
            //发布按钮
            data.append('state', '已发布');
        } else {
            //草稿按钮
            data.append('state', '草稿');
        }
        //发送ajax请求
        $.ajax({
            url: BigNew.article_publish,
            type: 'post',
            data: data,
            //不加会非法调用
            processData: false, //不需要拼接字符串
            contentType: false, //不需要进行额外的编码
            success: function(res) {
                //添加成功以后跳转到文章列表页面
                if (res.code == 200) {
                    window.history.back();
                    //左侧对应按钮高亮
                    parent.$('.menu .level02 li:eq(0)').click();
                }
            }
        });
    })
});