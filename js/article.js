//文章详细信息页面
$(function() {

    //根据当前地址栏的参数渲染详细信息页面
    var str = location.search.slice(1);
    var id = utils.converToObj(str).id;

    //发送ajax请求
    $.ajax({
        url: BigNew.article_detail,
        type: 'get',
        data: { id: id },
        success: function(res) {
            //将数据渲染到页面
            if (res.code == 200) {
                var htmlStr = template('articleTmp', res.data);
                $('.setfr .box').html(htmlStr);

                //给隐藏域添加id
                $('#myForm input[name=articleId').val(res.data.id)
                    //渲染完毕后渲染评论列表
                getCommentData();
            }
        }
    });




    //发表评论
    // 给form表单注册事件
    $('#myForm').on('submit', function(e) {
        e.preventDefault()
            //发送ajax请求
        $.ajax({
            url: BigNew.post_comment,
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.code == 201) {
                    alert(res, msg);
                    //清空输入框
                    $('#myForm')[0].reset();
                }

            }
        });
    })

    //评论列表
    function getCommentData() {
        $.ajax({
            url: BigNew.comment_list,
            type: 'get',
            data: { articleId: id },
            success: function(res) {
                if (res.code == 200) {
                    var htmlStr = template('commentList', res)
                    $('.comment_list_con').html(htmlStr);
                    $('.comment_count').html(`${res.data.length}条评论`);
                }
            }
        });
    }






});