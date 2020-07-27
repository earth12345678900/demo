//个人中心界面
$(function() {
    //发送请求获取数据
    $.$.ajax({
        url: BigNew.user_detail,
        type: 'get',
        success: function(res) {
            if (res, code == 200) {
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
        var file = this.file[0];
        //生成一个二进制形式的图片链接
        var url = URL.createObjectURL(file);
        //给img属性设置
        $('#myForm .user_pic').attr('src', url);

    })






});