<div id="show" class="fly-full">
    <div class="banner">
        <img class="avatar" src="{{ asset('storage') . '/default.jpg' }}" alt="">
        <h1 class="username">{{ $user->username }}</h1>
        <p class="fly-home-sign">（这个人懒得留下签名）</p>
    </div>

    <div class="container">
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
            <legend>{{ $user->username }}最近的实验记录</legend>
        </fieldset>
        <table class="layui-hide" id="test" lay-filter="test"></table>
        <script type="text/html" id="barDemo">
            <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
        </script>
        <script type="text/html" id="toolbarDemo">
            <div class="layui-btn-container">
                <button class="layui-btn layui-btn-sm" lay-event="getCheckData">打印表格</button>
                <button class="layui-btn layui-btn-sm" lay-event="getCheckData">导出为Excel</button>
            </div>
        </script>
    </div>
</div> 