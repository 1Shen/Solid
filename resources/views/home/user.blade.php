<!DOCTYPE html>
<html>

<head>
    <title>虚拟仿真实验</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="/js/commons.js"></script>
    <script src="/js/scene/utils.js"></script>
    <link rel="stylesheet" href="/css/home/user.css">
</head>

<body ng-app="">
    @include('template.nav')

    <ul id="nav-side" class="layui-nav layui-nav-tree layui-nav-side" lay-filter="test">
        <li class="layui-nav-item layui-nav-itemed">
            <a href="javascript:;">个人信息</a>
            <dl class="layui-nav-child">
                <dd><a href="javascript:;">首页</a></dd>
                <dd><a href="javascript:;">修改信息</a></dd>
            </dl>
        </li>
        <li class="layui-nav-item">
            <a href="javascript:;">管理题库</a>
            <dl class="layui-nav-child">
                <dd><a href="javascript:;">添加题目</a></dd>
                <dd><a href="javascript:;">修改题目</a></dd>
            </dl>
        </li>
    </ul>

    <div id="main">
        @if ($user->role == 2)
        校外人士
        @elseif ($user->role == 1)
        <div class="layui-row layui-col-space15">
            <div class="titles layui-card layui-col-md11">
                <div class="layui-card-header">题目：</div>
                <div class="layui-card-body">
                    <textarea class="title"></textarea>
                    <div>背景图片：<input class="bg" type="file"></div>
                </div>
            </div>

            <div class="options layui-card layui-col-md11">
                <div class="layui-card-header">选项</div>
                <div class="layui-card-body">
                    <div class="layui-row layui-col-space15">
                        <div class="layui-card layui-col-md5 layui-col-md-offset1">
                            <div class="layui-card-header">选项A：</div>
                            <div class="layui-card-body">
                                <input class="atext" type="text">
                                <input class="aimg" type="file">
                            </div>
                        </div>
                        <div class="layui-card layui-col-md5 layui-col-md-offset1">
                            <div class="layui-card-header">选项B：</div>
                            <div class="layui-card-body">
                                <input class="btext" type="text">
                                <input class="bimg" type="file">
                            </div>
                        </div>
                    </div>
                    <div class="layui-row layui-col-space15">
                        <div class="layui-card layui-col-md5 layui-col-md-offset1">
                            <div class="layui-card-header">选项C：</div>
                            <div class="layui-card-body">
                                <input class="ctext" type="text">
                                <input class="cimg" type="file">
                            </div>
                        </div>
                        <div class="layui-card layui-col-md5 layui-col-md-offset1">
                            <div class="layui-card-header">选项D：</div>
                            <div class="layui-card-body">
                                <input class="dtext" type="text">
                                <input class="dimg" type="file">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="answers layui-card layui-col-md11">
                <div class="layui-card-header">答案</div>
                <div class="layui-card-body">
                    <div class="layui-row">
                        <div class="layui-card layui-col-md5 layui-col-md-offset1">
                            <div class="layui-card-header">正确答案：</div>
                            <div class="layui-card-body">
                                <input class="answer" type="text">
                            </div>
                        </div>
                        <div class="layui-card layui-col-md5 layui-col-md-offset1">
                            <div class="layui-card-header">答案解析：</div>
                            <div class="layui-card-body">
                                <input class="analysis" type="text">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="u-button layui-col-md12">
                <a class="layui-btn" href="javascript: uploadQuiz()">上传题目</a>
            </div>
        </div>
        @elseif ($user->role == 0)
        学生
        @endif
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
    })

    // 录入题目
    function uploadQuiz() {
        var form = new FormData();
        var $div = $('#addQuizzes');
        form.append('title', $div.find('textarea.title').val());
        form.append('pic', $div.find('input.bg')[0].files[0]);
        form.append('atext', $div.find('input.atext').val());
        form.append('aimg', $div.find('input.aimg')[0].files[0]);
        form.append('btext', $div.find('input.btext').val());
        form.append('bimg', $div.find('input.bimg')[0].files[0]);
        form.append('ctext', $div.find('input.ctext').val());
        form.append('cimg', $div.find('input.cimg')[0].files[0]);
        form.append('dtext', $div.find('input.dtext').val());
        form.append('dimg', $div.find('input.dimg')[0].files[0]);
        form.append('answer', $div.find('input.answer').val());
        form.append('analysis', $div.find('textarea.analysis').val());

        $.ajax({
            url: "{{ url('quiz/add') }}",
            type: 'POST',
            cache: false,
            data: form,
            processData: false,
            contentType: false,
            success: function(res) {
                if (res.errCode >= 200) {
                    layer.msg('上传成功');
                } else {
                    layer.msg(res.errMsg);
                }
            }
        });
    }
</script>

</html> 