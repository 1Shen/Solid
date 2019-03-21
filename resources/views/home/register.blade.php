<!DOCTYPE html>
<html>

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>register</title>
    <script src="http://apps.bdimg.com/libs/angular.js/1.5.0-beta.0/angular.min.js"></script>
    <script src="/js/commons.js"></script>
    <script src="/js/home/register.js"></script>
    <link rel="stylesheet" href="/css/home/register.css">
</head>

<body ng-app="">
    @include('template.nav')

    <div id="main">
        <div class="blank-2x"></div>

        <div class="container">
            <div class="row">

                <div class="col-md-2"></div>

                <div class="form-container col-md-8 edge">
                    <form class="layui-form" action="">

                        <div class="layui-form-item">
                            <label class="layui-form-label">用户名</label>

                            <div class="layui-input-block">
                                <input id="username" type="text" name="title" required lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input layui-form-danger">
                            </div>

                            <label class="layui-form-label label-right"></label>
                            <div class="blank-2x"></div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">密码</label>

                            <div class="layui-input-block">
                                <input id="password" type="password" name="password" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input layui-form-danger">
                            </div>

                            <label class="layui-form-label label-right"></label>
                            <div class="layui-form-mid layui-word-aux blank-2x">辅助文字</div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">确认密码</label>

                            <div class="layui-input-block">
                                <input id="passwordConfirm" type="password" name="password" required lay-verify="required" placeholder="请再次输入密码" autocomplete="off" class="layui-input layui-form-danger">
                            </div>

                            <label class="layui-form-label label-right"></label>
                            <div class="layui-form-mid layui-word-aux blank-2x">辅助文字</div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">邮箱</label>

                            <div class="layui-input-block">
                                <input id="email" type="text" name="title" required lay-verify="required" placeholder="请输入邮箱" autocomplete="off" class="layui-input layui-form-danger">
                            </div>

                            <label class="layui-form-label label-right"></label>
                            <div class="blank-2x"></div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">身份</label>

                            <div id="role" class="layui-input-block">
                                <input type="radio" name="role" value="0" title="学生" checked>
                                <input type="radio" name="role" value="1" title="教师">
                                <input type="radio" name="role" value="2" title="校外人士">
                            </div>

                            <div class="blank-2x"></div>
                        </div>

                        <div class="layui-form-item">
                            <div class="layui-input-block btn-blank">
                                <button id="submit" class="layui-btn" lay-submit lay-filter="formDemo">提交</button>
                                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
    </div>

    @include('template.footer')
</body>

<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $(function() {
        $('#register-nav').addClass('nav-active');
        navbarBind();

        // Demo
        layui.use('form', function() {
            var form = layui.form;

            //监听提交
            form.on('submit(formDemo)', function(data) {
                // layer.msg(JSON.stringify(data.field));
                return false;
            });
        });

        // 注册
        $('#submit').click(function() {

            if (!checkSubmit()) return;

            $.ajax({
                type: "post",
                url: "{{ url('register') }}",
                data: {
                    username: $('#username').val(),
                    password: $('#password').val(),
                    email: $('#email').val(),
                    role: $('#role input:checked').val()
                },
                dataType: "json",
                success: function(res) {

                    if (res.errCode >= 200) { //success
                        swal({
                            title: '注册成功',
                            text: "开始虚拟仿真实验之旅吧",
                            type: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '好的'
                        }).then(function(isConfirm) {
                            if (isConfirm) {
                                window.location.href = "{{ url('/') }}";
                            }
                        });
                    } else { //fail
                        console.log(res.errMsg);
                    }
                }
            });
        });

        // 格式检测
        function checkSubmit() {
            let flag = true;
            $('.layui-form-item input').each(function() {
                if ($(this).val() == '') {
                    flag = false;
                    return false;
                }
            });
            if ($('#password').val() != $('#passwordConfirm').val()) {
                layer.msg('两次输入密码不相同');
                flag = false;
            }
            return flag;
        }
    });
</script>

</html> 