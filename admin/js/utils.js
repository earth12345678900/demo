//工具函数

// var utils = {
//     converToObj: function(search) {
//         var arr = search.split('&');

//         var obj = {};

//         for (let i = 0; i < arr.length; i++) {
//             var temp = arr[i].split('=');
//             obj[temp[0]] = temp[1];
//         }
//         return obj;
//     }
// }
//沙箱
(function(w) {
    var utils = {
        converToObj: function(search) {
            var arr = search.split('&');

            var obj = {};

            for (let i = 0; i < arr.length; i++) {
                var temp = arr[i].split('=');
                obj[temp[0]] = temp[1];
            }
            return obj;
        }
    }
    w.utils = utils;
})(window)