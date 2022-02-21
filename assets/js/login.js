$(function() {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {

            $('.reg-box').show()
            $('.login-box').hide()

        })
        // 点击去登录的链接
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify自定义校验规则
    form.verify({
            // 自定义一个密码校验规则
            'pwd': [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 定义校验两次密码是否一致的规则
            repwd: function(value) {
                // 通过形参拿到确认密码框的内容
                // 还要拿到密码框中的内容
                // 判断两次是否相等
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return "两次密码不一致!"
                }
            }
        })
        // 监听注册表单提交事件
    $('#layui-reg').on('click', function(e) {

            e.preventDefault()
            console.log('username', $('#layui-username').val())
            var data = { username: $('#layui-username').val(), password: $('#lay-password').val() }
            $.post('/api/reguser', data, function(res) {
                console.log('status', res)
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                }
                layer.msg('注册成功，请登录！')
                    // 模拟点击行为
                $('#link_login').click()
            })
        })
        // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登陆成功得到的token字符串保持在localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                    // location.href = '/index.html'
            }
        })
    })
})