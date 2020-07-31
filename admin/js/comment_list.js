//评论页面

$(function() {
    //跳转到该页面 发送ajax请求获得数据并渲染页面
    $.ajax({
        url: BigNew.comment_list,
        type: 'get',
        success: function(res) {
            if (res.code == 200) {
                var htmlStr = template('commentList', res.data);
                $('tbody').html(htmlStr);

                //启用分页插件
                pagination(res);
            }
        }
    });






    // 分装分页插件
    var currentPage = 1;

    function pagination(res) {
        //启用分页插件
        $('#pagination-demo').twbsPagination({
            // totalPages: 35,
            totalPages: res.data.totalPage, // 总页数
            visiblePages: 7, // 每页显示的最多页码值
            first: '首页',
            last: '尾页',
            prev: '上一页',
            next: '下一页',
            onPageClick: function(event, page) {
                currentPage = page;
                $.ajax({
                    url: BigNew.comment_list,
                    type: 'get',
                    data: {
                        page: page,
                    },
                    success: function(res) {
                        if (res.code == 200) {
                            var htmlStr = template('commentList', res.data);
                            $('tbody').html(htmlStr);
                            //改变页码值的显示
                            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1);
                        }
                    }
                });
            }
        })
    }





    //给通过按钮注册事件带上id
    //发送ajax请求 请求通过后讲状态改为通过
    $('tbody').on('click', 'btn-pass', function() {
        var that = this;
        $.ajax({
            type: 'post',
            url: BigNew.comment_pass,
            data: {
                id: $(this).data('id')
            },
            success: function(res) {
                if (res.code == 200) {
                    $(that).parent().prev().text(res.msg);
                }

            }
        })
    })


    //拒绝按钮
    $('tbody').on('click', 'btn-reject', function() {
        var that = this;
        $.ajax({
            type: 'post',
            url: BigNew.comment_reject,
            data: {
                id: $(this).data('id')
            },
            success: function(res) {
                if (res.code == 200) {
                    $(that).parent().prev().text(res.msg);
                }

            }
        })
    })

    //删除按钮
    $('tbody').on('click', 'btn-del', function() {
        $.ajax({
            type: 'post',
            url: BigNew.comment_delete,
            data: {
                id: $(this).data('id')
            },
            success: function(res) {
                if (res.code == 200) {
                    //根据当前页码重新发送ajax请求 讲数据渲染到页面上
                    $.ajax({
                        type: 'get',
                        url: BigNew.comment_list,
                        data: {
                            page: currentPage
                        },
                        success: function(res) {
                            //使用模板渲染数据
                            if (res.code == 200) {
                                var htmlStr = template('commentList', res.data)
                                $('tbody').html(htmlStr);

                                //最后一页的特殊情况
                                if (res.data.totalPage != 0 && res.data.data.length == 0) {
                                    currentPage--;
                                }
                                //重新生成页码
                                $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage);
                            }
                        }
                    })
                }
            }
        })
    })







});