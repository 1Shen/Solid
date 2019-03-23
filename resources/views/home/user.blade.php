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

    @if ($user->role == 2)
    校外人士
    @elseif ($user->role == 1)
    <div id="addQuizzes">
        <div>题目：<textarea class="title"></textarea></div>
        <div>
            背景图片：
            <input class="bg" type="file">
        </div>
        <div>
            选项A：<input class="atext" type="text">
            <input class="aimg" type="file">
        </div>
        <div>
            选项B：<input class="btext" type="text">
            <input class="bimg" type="file">
        </div>
        <div>
            选项C：<input class="ctext" type="text">
            <input class="cimg" type="file">
        </div>
        <div>
            选项D：<input class="dtext" type="text">
            <input class="dimg" type="file">
        </div>
        <div>
            正确答案：<input class="answer" type="text">
        </div>
        <div>
            答案解析：<textarea class="analysis"></textarea>
        </div>
        <a class="layui-btn" href="javascript: uploadQuiz()">上传题目</a>
    </div>
    @elseif ($user->role == 0)
    学生
    @endif

    @include('template.footer')
</body>

<script>
    var layer;

    $(function() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $('#index-nav').addClass('nav-active');
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