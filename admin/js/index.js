//主页面

$(function() {
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        // beforeSend: function(xhr) {
        //     //设置请求头
        //     // xhr.setRequestHeader('Authorization', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHAiOjIyMDA0NDE1MjYsImlhdCI6MTU5NTY0MTUyNn0.LF_9uUdvrJ10UxenLX3orpjfaYHbRxXHUBwjOCoRpqjOprXxJHoA023XXvt_pYC-3ZWtxA9INWCnUAe5iJRApRIKfMHKLB0taWPWgTzyJohzsnHcZekFg-rEsxpXNlGGFfoTqJqKknBpc5JNo5XqrKiLx1HMKsElKbhSy4PIyPQ')
        //     xhr.setRequestHeader('Authorization', localStorage.getItem(token));
        // },
        //响应回来的数据渲染到页面上
        success: function(res) {
            if (res.code == 200) {
                $('.sider .user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`);
                $('.sider .user_info img').attr('src', res.data.userPic);
                $('.header_bar .user_center_link img').attr('src', res.data.userPic);
            }
        },
    });

    //退出功能
    $('.logout').on('click', function() {
        // 删除token
        localStorage.removeItem('token');
        //跳转到登陆页面
        location.href = './login.html';
    })



    //左侧按钮高亮事件
    $('.menu .level01').on('click', function() {
        $(this).addClass('active').siblings('.level01').removeClass('active');
        // console.log($(this));
        //点击文章管理按钮时候 ul展开或者合并
        if ($(this).index() == 1) {
            //ul展开或者合并
            $('.menu .level02').slideToggle();
            //右侧小三角进行旋转
            $('.menu .level01:eq(1) b').toggleClass('rotate0');
            //默认让子标签的第一个高亮显示
            $('.menu .level02 li:eq(0)').click();
        }
    })


    //给里面的li高亮事件
    $('.menu .level02 li').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
    })
});
// xhr.setRequestHeader('Authorization','eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHAiOjIyMDA0NDE1MjYsImlhdCI6MTU5NTY0MTUyNn0.LF_9uUdvrJ10UxenLX3orpjfaYHbRxXHUBwjOCoRpqjOprXxJHoA023XXvt_pYC-3ZWtxA9INWCnUAe5iJRApRIKfMHKLB0taWPWgTzyJohzsnHcZekFg-rEsxpXNlGGFfoTqJqKknBpc5JNo5XqrKiLx1HMKsElKbhSy4PIyPQ')