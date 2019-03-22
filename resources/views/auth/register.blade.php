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
                    <label for="username" class="col-md-4 col-form-label text-md-right">
                        <!-- {{ __('Name') }} -->
                        用户名
                    </label>

                    <div class="col-md-6">
                        <input id="username" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="username" value="{{ old('username') }}" required autofocus>

                        @if ($errors->has('username'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('username') }}</strong>
                        </span>
                        @endif
                    </div>
                </div>

                <div class="form-group row">
                    <label for="email" class="col-md-4 col-form-label text-md-right">
                        <!-- {{ __('E-Mail Address') }} -->
                        邮箱
                    </label>

                    <div class="col-md-6">
                        <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>

                        @if ($errors->has('email'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                        @endif
                    </div>
                </div>

                <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">
                        <!-- {{ __('Password') }} -->
                        密码
                    </label>

                    <div class="col-md-6">
                        <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                        @if ($errors->has('password'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                        @endif
                    </div>
                </div>

                <div class="form-group row">
                    <label for="password-confirm" class="col-md-4 col-form-label text-md-right">
                        <!-- {{ __('Confirm Password') }} -->
                        确认密码
                    </label>

                    <div class="col-md-6">
                        <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="role" class="col-md-4 col-form-label text-md-right">
                        <!-- {{ __('E-Mail Address') }} -->
                        身份
                    </label>

                    <div class="col-md-6" style="padding-top:8px">
                        <!-- <input style="width:4%" id="role" type="radio" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required> -->
                        <div id="role">
                            <label class="radio-inline" style="margin-right:18px">
                                <input type="radio" name="role" value="0" checked> 学生
                            </label>
                            <label class="radio-inline" style="margin-right:18px">
                                <input type="radio" name="role" value="1"> 教师
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="role" value="2"> 校外人员
                            </label>
                        </div>
                        <!-- @if ($errors->has('email'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                        @endif -->
                    </div>
                </div>

                <div class="form-group row mb-0">
                    <div class="col-md-6 offset-md-4">
                        <button type="submit" class="btn btn-primary">
                            {{ __('Register') }}
                            注册
                        </button>
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