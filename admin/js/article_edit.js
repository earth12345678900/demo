//文章编辑页面
$(function() {
    //跳转到文章编辑页面获取文章所有分类
    //发送ajax请求获取文章分类数据
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        success: function(res) {
            if (res.code == 200) {
                //使用模板渲染数据
                var htmlStr = template('categoryList', res)
                $('#categoryId').html(htmlStr);
            }
        }
    });

    //获取传过来的id根据id获取待编辑的文章数据
    var search = location.search
    search = search.slice(1);

    var id = utils.converToObj(search).id;

    //根据id发送ajax请求
    $.ajax({
        url: BigNew.article_search,
        type: 'get',
        data: {
            id: id
        },
        success: function(res) {
            //将数据渲染到页面
            if (res.code == 200) {
                $('#myForm input[name=id]').val(res.data.id);
                $('#myForm input[name=title]').val(res.data.title);
                $('#myForm .article_cover').attr('src', res.data.cover);
                $('#myForm input[name=date]').val(res.data.date);
                editor.txt.html(res.data.content);
            }

        }
    });


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


    //实现图片预览
    $('#inputCover').on('change', function() {
        $('#myForm .article_cover').attr('src', URL.createObjectURL(this.files[0]));
    })

    //更新文章
    //给form表单注册点击事件
    $('#myForm').on('click', 'btn', function(e) {
        e.preventDefault();
        //获取页面数据
        var data = new FormData($('myForm')[0])
        data.append('content', editor.txt.html());
        //判断哪个按钮触发的 修改按钮还是存为草稿按钮
        if ($(this).hasClass('btn-edit')) {
            //修改按钮还是存为草稿按钮
            data.append('state', '已发布');
        } else {
            //存为草稿
            data.append('state', '存为草稿');
        }
    })


    //发送ajax请求
    $.ajax({
        url: BigNew.article_edit,
        type: 'post',
        data: data,
        processData: false, //不需要拼接字符串
        contentType: false, //不需要进行额外的编码
        success: function(res) {
            if (res.code == 200) {
                //跳转到文章列表页面
                location.href = './article_list.html';
            }
        }
    });
});