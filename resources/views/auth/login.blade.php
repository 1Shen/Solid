@extends('layouts.app')

@section('content')
<div class="blank-2x"></div>

<div class="container">
    <div class="row">
        <div class="col-md-2"></div>
        <div class="form-container col-md-8">
            <form class="layui-form" method="POST" action="{{ route('login') }}">
                @csrf

                <div class="layui-form-item">
                    <label for="username" class="layui-form-label">
                        <!-- {{ __('E-Mail Address') }} -->用户名</label>

                    <div class="layui-input-block">
                        <input id="username" type="text" class="layui-input layui-form-danger {{ $errors->has('username') ? ' is-invalid' : '' }}" name="username" value="{{ old('username') }}" required autofocus placeholder="请输入用户名">
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
                    <label class="layui-form-label" for="remember">
                        <!-- {{ __('Remember Me') }} -->记住我</label>

                    <div class="layui-input-block">
                        <input class="layui-form-check-input" lay-text="ON|OFF" lay-skin="switch" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                    </div>
                </div>

                <div class="layui-form-item">
                    <div class="layui-input-block btn-blank">
                        <button type="submit" class="layui-btn">
                            <!-- {{ __('Login') }} -->登录</button>

                        @if (Route::has('password.request'))
                        <a class="lalink" href="{{ route('password.request') }}">
                            <!-- {{ __('Forgot Your Password?') }} -->忘记密码？</a>
                        @endif
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    $(function() {
        $('#login-nav').addClass('nav-active');
    });
</script>
@endsection 