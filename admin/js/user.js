//个人中心界面
$(function() {
    //发送请求获取数据
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        success: function(res) {
            if (res.code == 200) {
                // $('#myForm .username').val(res.data.username);
                // $('#myForm .nickname').val(res.data.nickname);
                // $('#myForm .email').val(res.data.email);
                // $('#myForm .userPic').attr('src', res.data.userPic);
                //简写
                for (var key in res.data) {
                    $(`#myForm .${key}`).val(res.data[key]);
                };
                $('#myForm .userPic').attr('src', res.data.userPic);
            }
        }
    });

    //给图片注册onchange事件 一有图片被选中就会触发该事件 讲图片存储到input标签中
    $('#exampleInputFile').on('change', function() {
        //获取待上传的图片
        var file = this.files[0];
        //生成一个二进制形式的图片链接
        var url = URL.createObjectURL(file);
        //给img属性设置
        $('#myForm .user_pic').attr('src', url);
    })

    //更新个人中心数据
    //给修改按钮注册事件
    $('#myForm').on('submit', function(e) {
        //submit有默认行为
        e.preventDefault();
        //准备要发送的数据
        var data = new FormData($('#myForm')[0])
            //发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: data,
            processData: false, //不需要拼接字符串
            contentType: false, //不需要进行额外的编码
            success: function(res) {
                if (res.code == 200) {
                    $.ajax({
                        url: BigNew.user_info,
                        type: 'get',
                        success: function(res) {
                            if (res.code == 200) {
                                parent.$('.sider .user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`);
                                parent.$('.sider .user_info img').attr('src', res.data.userPic);
                                parent.$('.header_bar .user_center_link img').attr('src', res.data.userPic);
                            }
                        },
                    });
                }

            }
        })

    })






});