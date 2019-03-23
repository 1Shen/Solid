<!DOCTYPE html>
<html>

<head>
    <script src="/js/commons.js"></script>

    <link rel="stylesheet" href="/css/home/quiz.css">
    <script src="/js/home/quiz.js"></script>
    <script src="/js/nav.js"></script>

    <!-- <link rel="stylesheet" href="/lib/layui/css/layui.css">
    <script src="/lib/layui/layui.js"></script> -->

    <title>习题</title>
</head>

<body>
    @include('template.nav')

    <!-- 红外光谱背景 -->
    <div id="map-bg">
        <div class="img-box">
            <img class="bg" src="/static/images/bg/new/0_0.png" alt="">
            <div class="gif">
                <img src="" alt="">
            </div>
            <div class="introduce"></div>
        </div>
        <div class="quiz-box">
            <div class="title">在2962cm<sup>-1</sup>处的峰是CH<SUB>3</SUB>基团的反对称伸缩振动。这种反对称伸缩振动的范围为2962±10cm<sup>-1</sup>，事实上，存在两个简并的反对称伸缩振动（显示其中一个）。
            </div>
            <form class="layui-form" action="">
                <div class="layui-form-item">
                    <div class="layui-input-block options">
                        <input type="radio" name="role" value="0" title="A" checked>
                        <input type="radio" name="role" value="1" title="B">
                        <input type="radio" name="role" value="2" title="C">
                        <input type="radio" name="role" value="3" title="D">
                    </div>
                </div>
            </form>
            <div class="explaination">在2962cm<sup>-1</sup>处的峰是CH<SUB>3</SUB>基团的反对称伸缩振动。这种反对称伸缩振动的范围为2962±10cm<sup>-1</sup>，事实上，存在两个简并的反对称伸缩振动（显示其中一个）。</div>
            <div class="q-button">
                <div class="layui-btn layui-btn-lg">提交</div>
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

        // 从题库中拉取10道随机选择题
        $.ajax({
            type: "GET",
            url: "{{ url('quiz/fetch') }}",
            dataType: "json",
            success: function (res) {
                var quizzes = res.quizzes;
                console.log(quizzes);
            }
        });
    });
</script>

</html> 