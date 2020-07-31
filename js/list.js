 //列表页面
 $(function() {
     //根据URL地址栏中的数据判断是否是正常跳转

     var searchStr = location.search;
     //根据数值判断是否是正常跳转
     if (!searchStr) {
         //不是正常跳转 则跳转到主页面
         location.href = './index.html';
         return;
     }

     //  //根据url地址进行判断 看根据id跳转还是根据关键词跳转
     //  var id = utils.converToObj(searchStr.slice(1)).id;
     //  var data;
     //  //如果有id 根据id跳转 没有id根据关键词跳转
     //  if (id) {
     //      data = { type: id }
     //  } else {
     //      //关键词跳转
     //      var key = utils.converToObj(searchStr.slice(1)).search;
     //      //有汉字时候要进行转义
     //      data = { key: decodeURI(key) };
     //  }

     //写法2
     var obj = utils.converToObj(searchStr.slice(1));
     var data;
     if (obj.id) {
         data = { type: obj.id }
     } else {
         data = { key: decodeURI(obj.search) }
     }


     //发送ajax请求
     $.ajax({
         url: BigNew.artilce_list,
         type: 'get',
         data: data,
         success: function(res) {
             if (res.code == 200) {
                 if (res.data.data.length == 0) {
                     var str = '';
                     $('.main_con .setfr').html('暂时没有数据');
                 } else {
                     //有数据 根据id或者关键字 将其渲染到页面上
                     if (obj.id) {
                         str = `
                         <div class="list_title">
                             <h3>分类:${res.data.data[0].category}</h3>
                         </div>`
                     } else {
                         str = `
                         <div class="list_title">
                             <h3>关键词:${decodeURI(obj.search)}</h3>
                         </div>`
                     }

                     var htmlStr = template('articleList', res.data);
                     $('.main_con .setfr').html(str + htmlStr);
                 }
             }
         }
     });











 });