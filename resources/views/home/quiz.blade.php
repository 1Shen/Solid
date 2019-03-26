<!DOCTYPE html>
<html>

<head>
    <script src="/js/commons.js"></script>

    <link rel="stylesheet" href="/css/home/quiz.css">
    <script src="/js/nav.js"></script>
    <script src="js/scene/utils.js"></script>

    <!-- <link rel="stylesheet" href="/lib/layui/css/layui.css">
    <script src="/lib/layui/layui.js"></script> -->

    <title>虚拟仿真实验——习题测试</title>
</head>

<body>
    @include('template.nav')

    <!-- 红外光谱背景 -->
    <div id="main">
        <div id="map-bg">
            <div class="img-box">
                <img class="bg" src="/static/images/bg/map/0_0.png" alt="">
                <div class="gif">
                    <img src="" alt="">
                </div>
                <div class="introduce"></div>
            </div>
            <div class="quiz-box">
                <div class="title"></div>
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <div class="layui-input-block options layui-row">
                            <div class="layui-col-md6">
                                <input class="a" type="radio" name="role" value="A" title="A" checked>
                                <div class="option-bg"><img src="" alt=""></div>
                            </div>
                            <div class="layui-col-md6">
                                <input class="b" type="radio" name="role" value="B" title="B">
                                <div class="option-bg"><img src="" alt=""></div>
                            </div>
                            <div class="layui-col-md6">
                                <input class="c" type="radio" name="role" value="C" title="C">
                                <div class="option-bg"><img src="" alt=""></div>
                            </div>
                            <div class="layui-col-md6">
                                <input class="d" type="radio" name="role" value="D" title="D">
                                <div class="option-bg"><img src="" alt=""></div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="analysis" style="display: none"></div>
                <input class="answer" type="hidden">
                <div class="q-button">
                    <div class="layui-btn layui-btn-lg">提交</div>
                </div>
            </div>
        </div>
    </div>

    @include('template.footer')
</body>

<script>
    $(function() {
        $('#quiz-nav').addClass('nav-active');
        navbarBind();
        //Demo
        layui.use('form', function() {
            var form = layui.form;

            //监听提交
            form.on('submit(formDemo)', function(data) {
                layer.msg(JSON.stringify(data.field));
                return false;
            });
        });

        // 图片点击
        $('.option-bg').click(function() {
            $(this).prev().trigger('click');
        });

        // 从题库中拉取10道随机选择题
        var quizzes;
        var count = 0;
        var analysis, answer, options, pic, title;
        var score = 100;
        var minus = 0.1;

        $.ajax({
            type: "GET",
            url: "{{ url('quiz/fetch') }}",
            dataType: "json",
            success: function(res) {
                quizzes = res.quizzes;
                console.log(quizzes);

                analysis = quizzes[count].analysis;
                answer = quizzes[count].answer;
                options = JSON.parse(quizzes[count].options);
                pic = quizzes[count].pic;
                title = quizzes[count].title;
                console.log(title)

                updateQuiz(analysis, answer, options, pic, title);
            }
        });

        function updateQuiz(analysis, answer, options, pic, title) {
            count++;
            $('.analysis').text(analysis).hide();
            $('.answer').val(answer);
            $('.options .a').next().find('div').text(options.A.text);
            $('.options .b').next().find('div').text(options.B.text);
            $('.options .c').next().find('div').text(options.C.text);
            $('.options .d').next().find('div').text(options.D.text);
            $('.options .a').parent().find('img').attr('src', '{{ asset("storage/") }}' + options.A.img);
            $('.options .b').parent().find('img').attr('src', '{{ asset("storage/") }}' + options.B.img);
            $('.options .c').parent().find('img').attr('src', '{{ asset("storage/") }}' + options.C.img);
            $('.options .d').parent().find('img').attr('src', '{{ asset("storage/") }}' + options.D.img);
            $('.bg').attr('src', '{{ asset("storage/") }}' + pic);
            $('.title').text(count + "、" + title);
            $('#map-bg').reShow(1000);
        }

        $('.q-button div').click(function() {
            var choice = $('.layui-form input:checked').val();
            if (choice.toLowerCase() == $('.answer').val().toLowerCase()) {
                layer.msg('回答正确');
            } else {

                layer.msg('回答错误');
                score = parseInt(score * (1 - minus));
                $('.analysis').slideDown(400);
                return;
            }

            if (!quizzes[count]) {
                layer.msg('你已经回答完所有问题<br>总分为：' + score);
                $('.q-button div').unbind('click').text('');
                $('.q-button div').append('<a>返回首页</a>');
                $('.q-button div a').attr('href', '{{ url("/") }}');
                return;
            };
            analysis = quizzes[count].analysis;
            answer = quizzes[count].answer;
            options = JSON.parse(quizzes[count].options);
            pic = quizzes[count].pic;
            title = quizzes[count].title;

            updateQuiz(analysis, answer, options, pic, title);
        })
    });
</script>

</html> 