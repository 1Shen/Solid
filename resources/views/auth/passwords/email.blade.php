@extends('layouts.app')

@section('content')
<div class="blank-2x"></div>

<div class="container">
    <div class="row">
        <div class="col-md-2"></div>
        <div class="form-container col-md-8">
            <div class="title">
                <!-- {{ __('Reset Password') }} -->重置密码</div>

            @if (session('status'))
            <div class="alert alert-success" role="alert">
                {{ session('status') }}
            </div>
            @endif

            <form class="layui-form" method="POST" action="{{ route('password.email') }}">
                @csrf

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
                    <div class="layui-input-block btn-blank">
                        <button type="submit" class="layui-btn">
                            <!-- {{ __('Send Password Reset Link') }} -->发送重置密码链接</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection 