<nav class="navbar navbar-cyan">
    <div class="container">
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-left">
                <a href="{{ url('/') }}">
                    <li class="navbar-brand">虚拟仿真实验</li>
                </a>
                <li id="index-nav" class="nav-item"><a href="{{ url('/') }}">主页</a></li>
                <li id="learn-nav" class="nav-item"><a href="{{ url('learn') }}">课程</a></li>
                <li id="quiz-nav" class="nav-item"><a href="{{ url('quiz') }}">习题</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li id="login-nav" class="nav-item"><a href="{{ url('login') }}">登录</a></li>
                <li id="register-nav" class="nav-item"><a href="{{ url('register') }}">注册</a></li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav> 