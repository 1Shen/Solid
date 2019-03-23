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
                @guest
                <li id="login-nav" class="nav-item"><a href="{{ url('login') }}">登录</a></li>
                <li id="register-nav" class="nav-item"><a href="{{ url('register') }}">注册</a></li>
                @else
                <li id="dropdown-nav" class="dropdown nav-item">
                    <a href="#" class="dropdown-toggle nav-item" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <img src="/static/images/icon/user-active.png" alt="" class="active" style="display:none">
                        <img src="/static/images/icon/user.png" alt="" class="normal">
                        admin
                        <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="{{ url('user') }}">个人中心</a></li>
                        <li><a href="#">在线商城</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="{{ route('logout') }}" onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();">注销</a></li>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </ul>
                </li>
                @endguest
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav> 