//前台的主页面
$(function() {
    //发送ajax请求
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        success: function(res) {
            if (res.code == 200) {
                //使用模板渲染数据
                var htmlStr = template('categoryList', res);
                //在垂直方向显示
                $('.menu .level_two').html('<li class="up"></li>' + htmlStr);
                //在水平方向显示
                $('.menu .left_menu').html(htmlStr);
            }
        }
    });


    //热点图
    //发送ajax请求
    $.ajax({
        url: BigNew.hotPic_news,
        type: 'get',
        success: function(res) {
            if (res.code == 200) {
                //使用模板渲染数据
                var htmlStr = template('hotPicTmp', res);
                $('.main_con .focus_list').html(htmlStr);
            }
        }
    });


    //热点资讯
    $.ajax({
        url: BigNew.latest_news,
        type: 'get',
        success: function(res) {
            if (res.code == 200) {
                var htmlStr = template('lastNewsList', res);
                $('.common_news').html(htmlStr);
            }
        }
    });


    //一周热门排行
    $.ajax({
        url: BigNew.hotrank_list,
        type: 'get',
        success: function(res) {
            if (res.code == 200) {
                var htmlStr = template('hotrank_list', res);
                $('.hotrank_list').html(htmlStr);
            }
        }
    });



    //最新评论
    $.ajax({
        url: BigNew.latest_comment,
        type: 'get',
        success: function(res) {
            if (res.code == 200) {
                var htmlStr = template('lastNewsList', res);
                $('.comment_list').html(htmlStr);
            }
        }
    });




    //焦点关注
    $.ajax({
        url: BigNew.attention_news,
        type: 'get',
        success: function(res) {
            if (res.code == 200) {
                var htmlStr = template('attentionList', res);
                $('.guanzhu_list').html(htmlStr);
            }
        }
    });


    //搜索按钮
    //搜索按钮注册点击事件
    $('.search_btn').on('click', function() {
        //获取搜索框中的数据
        var txtValue = $('.search_txt').val()
            //如果搜索框中没有数据
        if (txtValue.trim() == '') {
            alert('请输入内容');
            return;
        }
        //搜索框有数据
        location.href = './list.html?search=' + txtValue;
    })











});