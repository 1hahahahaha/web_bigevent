// 每次调用接口hi先调用$.ajaxPrefilter函数，可以拿到我们给Ajax提供的内置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax请求之前先拼接url地址
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)

})