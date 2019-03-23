@extends('layouts.app')

@section('content')
<div class="blank-2x"></div>

<div class="container">
    <div class="row">
        <div class="col-md-2"></div>
        <div class="form-container col-md-8">
            <form class="layui-form" method="POST" action="{{ route('register') }}">
                @csrf

                <div class="layui-form-item">
                    <label for="username" class="layui-form-label">
                        <!-- {{ __('Name') }} -->用户名</label>

                    <div class="layui-input-block">
                        <input id="username" type="text" class="layui-input layui-form-danger {{ $errors->has('name') ? ' is-invalid' : '' }}" name="username" value="{{ old('username') }}" required autofocus placeholder="请输入用户名">
                        @if ($errors->has('username'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('username') }}</strong>
                        </span>
                        @endif
                    </div>

                    <label class="layui-form-label label-right"></label>
                    <div class="blank-2x"></div>
                </div>

                <div class="layui-form-item">
                    <label for="email" class="layui-form-label">
                        <!-- {{ __('E-Mail Address') }} -->邮箱</label>

                    <div class="layui-input-block">
                        <input id="email" type="email" class="layui-input layui-form-danger {{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required placeholder="请输入邮箱">
                        @if ($errors->has('email'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                        @endif
                    </div>

                    <label class="layui-form-label label-right"></label>
                    <div class="blank-2x"></div>
                </div>

                <div class="layui-form-item">
                    <label for="password" class="layui-form-label">
                        <!-- {{ __('Password') }} -->密码</label>

                    <div class="layui-input-block">
                        <input id="password" type="password" class="layui-input layui-form-danger {{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required placeholder="请输入密码">
                        @if ($errors->has('password'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                        @endif
                    </div>

                    <label class="layui-form-label label-right"></label>
                    <div class="blank-2x"></div>
                </div>

                <div class="layui-form-item">
                    <label for="password-confirm" class="layui-form-label">
                        <!-- {{ __('Confirm Password') }} -->确认密码</label>

                    <div class="layui-input-block">
                        <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required placeholder="请确认密码">
                    </div>

                    <label class="layui-form-label label-right"></label>
                    <div class="blank-2x"></div>
                </div>

                <div class="layui-form-item">
                    <label for="role" class="layui-form-label">
                        <!-- {{ __('E-Mail Address') }} -->身份</label>

                    <div>
                        <!-- <input style="width:4%" id="role" type="radio" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required> -->
                        <div id="role" class="layui-input-block">
                            <input type="radio" name="role" value="0" title="学生" checked>
                            <input type="radio" name="role" value="1" title="教师">
                            <input type="radio" name="role" value="2" title="校外人士">
                        </div>
                        <!-- @if ($errors->has('email'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                        @endif -->

                        <div class="blank-2x"></div>
                    </div>
                </div>

                <div class="layui-form-item">
                    <div class="layui-input-block btn-blank">
                        <button type="submit" class="layui-btn">
                            <!-- {{ __('Register') }} -->注册</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $(function() {
        $('#register-nav').addClass('nav-active');
        navbarBind();
        $('#username').focus().click();

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
@endsection 