//登录界面
$(function() {
    // //给登陆按钮注册点击事件 并发送ajax请求
    // $('.input_sub').on('click', function(e) {
    //     //submit会触发form表单的默认行为 要阻止
    //     e.preventDefault();
    //     $.ajax({
    //         url: 'http://localhost:8080/api/v1/admin/user/login',
    //         type: 'post',
    //         data: $('.login_form').serialize(),
    //         success: function(res) {
    //             if (res.code == 200) {
    //                 location.href = './index.html';
    //             }
    //         }
    //     });
    // })

    //用submit注册事件
    $('.login_form').on('submit', function(e) {
        //阻止默认行为
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            url: BigNew.user_login,
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                $('#myModal').modal('show');
                $('#myModal .modal-body p').text(res.msg);
                if (res.code == 200) {
                    //讲服务器端响应回来的token存储到本地
                    localStorage.setItem('token', res.token);
                    // location.href = './index.html';
                    //模态框隐藏后跳转页面
                    $('#myModal').on('hidden.bs.modal', function(e) {
                        location.href = './index.html';
                    })
                }
            }
        });
    })
});