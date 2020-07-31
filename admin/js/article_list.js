//文章列表页
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



    //发送ajax请求获取文章分类数据
    $.ajax({
        url: BigNew.article_query,
        type: 'get',
        success: function(res) {
            //使用模板渲染数据
            if (res.code == 200) {
                var htmlStr = template('articleList', res.data);
                $('tbody').html(htmlStr);
                // 要根据响应回来的数据来确定是否启用分页
                if (res.data.totalCount == 0) {
                    $('#pagination-demo').hide().next().show()
                } else {
                    $('#pagination-demo').show().next().hide()
                        // 2.3 启用分页
                    pagination(res)
                }
            }
        }
    });
    // 3. 启用分页功能
    // 3.1 分页插件的代码比较多，可以封装到一个函数当中
    var currentPage = 1

    function pagination(res) {
        $('#pagination-demo').twbsPagination({
            // totalPages: 35,
            totalPages: res.data.totalPage,
            visiblePages: 7, // 每页显示的最多页码值
            first: '首页',
            last: '尾页',
            prev: '上一页',
            next: '下一页',
            initiateStartPageClick: false,
            onPageClick: function(event, page) {
                // $('#page-content').text('Page ' + page)
                // console.log(event); // 事件对象
                // console.log(page); // 当前的页码值
                currentPage = page
                    // 4. 实现分页功能
                    // 4.1 要根据当前页码来发送ajax请求 
                    //发送ajax请求获取文章分类数据
                $.ajax({
                    url: BigNew.article_query,
                    type: 'get',
                    data: {
                        key: $('#myForm input[name=key]').val(),
                        type: $('#myForm select[name=type]').val(),
                        state: $('#myForm select[name=state]').val(),
                        page: page,
                        perpage: 6
                    },
                    success: function(res) {
                        //使用模板渲染数据
                        if (res.code == 200) {
                            var htmlStr = template('articleList', res.data);
                            $('tbody').html(htmlStr);
                            // 要根据响应回来的数据来确定是否启用分页
                            if (res.data.totalCount == 0) {
                                $('#pagination-demo').hide().next().show()
                            } else {
                                $('#pagination-demo').show().next().hide()
                                    // 2.3 启用分页
                                pagination(res)
                            }
                        }
                    }
                });
            }
        })
    }


    //筛选功能
    $('#btnSearch').on('click', function(e) {
        //给form表单注册所以要阻止默认行为
        e.preventDefault();
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            data: {
                key: $('#myForm input[name=key]').val(),
                type: $('#myForm select[name=type]').val(),
                state: $('#myForm select[name=state]').val(),
                page: 1,
                perpage: 6
            },
            success: function(res) {
                var htmlStr = template('articleList', res.data);
                $('tbody').html(htmlStr);
                //重绘分页插件
                //changeTotalPages事件 总页码发生改变时
                //总页码的值
                //默认显示的页码 默认从第一页开始
                $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1);
            }
        });

    })

    //获取删除按钮中的id
    $('#delModal').on('shown.bs.modal', function(e) {
        //将其转为jq对象获得id
        //将其提升作用域
        window.articleId = $(e.relatedTarget).data('id');
    })


    //删除按钮
    $('#delModal .btn-sure-del').on('click', function() {
        //发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: {
                id: window.articleId
            },
            success: function(res) {
                if (res.code == 204) {
                    //隐藏模态框
                    $('#delModal').modal('hide');
                    //删除成功后显示当前页码剩余的数据
                    $.ajax({
                        url: BigNew.article_query,
                        type: 'get',
                        data: {
                            key: $('#myForm input[name=key]').val(),
                            type: $('#myForm select[name=type]').val(),
                            state: $('#myForm select[name=state]').val(),
                            page: currentPage,
                            perpage: 6
                        },
                        success: function(res) {
                            //使用模板渲染数据
                            if (res.code == 200) {
                                var htmlStr = template('articleList', res.data);
                                $('tbody').html(htmlStr);
                                //当前页码没有数据显示上一个页码的页面
                                if (res.data.totalCount != 0 && res.data.data.length == 0) {
                                    currentPage--;
                                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage);
                                } else if (res.data.totalCount == 0) {
                                    $('#pagination-demo').hide().next().show();
                                }
                            }
                        }
                    });
                }
            }
        })
    })


    //单击发表文章按钮 跳转
    $('#release_btn').on('click', function() {
        //触发左侧按钮点击事件
        parent.$('.menu .level02 li:eq(1)').click();
    })
});