<!DOCTYPE html>
<html>

<head>
    <title>虚拟仿真实验——个人中心</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="/js/commons.js"></script>
    <script src="/js/scene/utils.js"></script>
    <link rel="stylesheet" href="/css/home/user.css">
    <link rel="stylesheet" href="/css/home/user/quiz.css">
    <link rel="stylesheet" href="/css/home/user/edit.css">
    <link rel="stylesheet" href="/css/home/user/show.css">
</head>

<body ng-app="">
    @include('template.nav-fluid')

    <ul id="nav-side" class="layui-nav layui-nav-tree layui-nav-side" lay-filter="test">
        <li class="layui-nav-item layui-nav-itemed">
            <a href="javascript:;">个人信息</a>
            <dl class="layui-nav-child">
                <dd class="@if ($action == 'info' && $op == 'show') layui-this @endif">
                    <a href="{{ url('user/info/show') }}">首页</a>
                </dd>
                <dd class="@if ($action == 'info' && $op == 'edit') layui-this @endif">
                    <a href="{{ url('user/info/edit') }}">修改信息</a>
                </dd>
            </dl>
        </li>
        @if ($user->role == 1)
        <li class="layui-nav-item layui-nav-itemed">
            <a href="javascript:;">管理题库</a>
            <dl class="layui-nav-child">
                <dd class="@if ($action == 'quiz' && $op == 'list') layui-this @endif">
                    <a href="{{ url('user/quiz/list') }}">浏览题库</a>
                </dd>
                <dd class="@if ($action == 'quiz' && $op == 'add') layui-this @endif">
                    <a href="{{ url('user/quiz/add') }}">添加题目</a>
                </dd>
                <dd class="@if ($action == 'quiz' && $op == 'edit') layui-this @endif">
                    <a href="{{ url('user/quiz/edit') }}">修改题目</a>
                </dd>
            </dl>
        </li>
        @endif
    </ul>

    <div id="main">
        @if ($action == 'info')

        @if ($op == 'show')

        @include('home.user.info.show')

        @elseif ($op == 'edit')

        @include('home.user.info.edit')

        @endif

        @endif


        @if ($user->role == 1)

        @if ($action == 'quiz')

        @if ($op == 'add')

        @include('home.user.quiz.add')

        @elseif ($op == 'edit')

        @elseif ($op == 'list')

        @include('home.user.quiz.list')

        @endif

        @endif

        @else

        @endif

        <ul class="layui-fixbar">
            <li onclick='$("html,body").animate({"scrollTop":0});' class="layui-icon layui-fixbar-top" lay-type="top" style="background-color: #1E9FFF; display: list-item;"></li>
        </ul>

        @include('template.footer')
    </div>

</body>

<script>
    var layer;

    $(function() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $('#dropdown-nav').addClass('nav-active');
        navbarBind();

        // element模块
        layui.use('element', function() {
            var element = layui.element;

            //一些事件监听
            element.on('tab(demo)', function(data) {
                console.log(data);
            });
        });

        layui.use('layer', function() {
            layer = layui.layer;
        });

        layui.use('table', function() {
            var table = layui.table;

            table.render({
                elem: '#test',
                url: "{{ url('quiz/list') }}",
                toolbar: '#toolbarDemo',
                title: '用户数据表',
                cols: [
                    [{
                        type: 'checkbox',
                        fixed: 'left'
                    }, {
                        field: 'id',
                        title: 'ID',
                        width: 65,
                        fixed: 'left',
                        unresize: true,
                        sort: true
                    }, {
                        field: 'title',
                        title: '题目',
                        width: 300
                    }, {
                        field: 'optionA',
                        title: '选项A',
                        width: 100,
                        edit: 'text'
                    }, {
                        field: 'optionB',
                        title: '选项B',
                        width: 100,
                        edit: 'text'
                    }, {
                        field: 'optionC',
                        title: '选项C',
                        width: 100,
                        edit: 'text'
                    }, {
                        field: 'optionD',
                        title: '选项D',
                        width: 100,
                        edit: 'text'
                    }, {
                        field: 'answer',
                        title: '答案',
                        width: 65,
                    }, {
                        field: 'analysis',
                        title: '答案解析',
                        width: 200
                    }]
                ],
                page: true
            });

            //监听行工具事件
            table.on('tool(test)', function(obj) {
                var data = obj.data;
                //console.log(obj)
                if (obj.event === 'del') {
                    layer.confirm('真的删除行么', function(index) {
                        obj.del();
                        layer.close(index);
                    });
                } else if (obj.event === 'edit') {
                    layer.prompt({
                        formType: 2,
                        value: data.email
                    }, function(value, index) {
                        obj.update({
                            email: value
                        });
                        layer.close(index);
                    });
                }
            });
        });
    });
</script>

</html> 