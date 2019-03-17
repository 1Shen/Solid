<!DOCTYPE html>
<html>

<head>
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
                                <input type="text" name="title" required lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input layui-form-danger">
                            </div>

                            <label class="layui-form-label label-right"></label>
                            <div class="blank-2x"></div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">密码</label>

                            <div class="layui-input-block">
                                <input type="password" name="password" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input layui-form-danger">
                            </div>

                            <label class="layui-form-label label-right"></label>
                            <div class="layui-form-mid layui-word-aux blank-2x">辅助文字</div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">确认密码</label>

                            <div class="layui-input-block">
                                <input type="password" name="password" required lay-verify="required" placeholder="请再次输入密码" autocomplete="off" class="layui-input layui-form-danger">
                            </div>

                            <label class="layui-form-label label-right"></label>
                            <div class="layui-form-mid layui-word-aux blank-2x">辅助文字</div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">邮箱</label>

                            <div class="layui-input-block">
                                <input type="text" name="title" required lay-verify="required" placeholder="请输入邮箱" autocomplete="off" class="layui-input layui-form-danger">
                            </div>

                            <label class="layui-form-label label-right"></label>
                            <div class="blank-2x"></div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">身份</label>

                            <div class="layui-input-block">
                                <input type="radio" name="role" value="0" title="学生" checked>
                                <input type="radio" name="role" value="1" title="教师">
                                <input type="radio" name="role" value="2" title="校外人士">
                            </div>

                            <div class="blank-2x"></div>
                        </div>

                        <div class="layui-form-item">
                            <div class="layui-input-block btn-blank">
                                <button class="layui-btn" lay-submit lay-filter="formDemo">提交</button>
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
    $(function() {
        $('#register-nav').addClass('nav-active');
        navbarBind();

        //Demo
        layui.use('form', function() {
            var form = layui.form;

            //监听提交
            form.on('submit(formDemo)', function(data) {
                layer.msg(JSON.stringify(data.field));
                return false;
            });
        });
    });
</script>

</html> 