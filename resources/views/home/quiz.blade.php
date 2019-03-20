<!DOCTYPE html>
<html>

<head>
    <script src="/js/commons.js"></script>

    <link rel="stylesheet" href="/css/home/quiz.css">
    <script src="/js/home/quiz.js"></script>
    <script src="/js/nav.js"></script>

    <title>习题</title>
</head>

<body>
    @include('template.nav')

    <!-- 红外光谱背景 -->
    <div id="map-bg">
        <div class="img-box">
            <img class="bg" src="/static/images/bg/new/0_0.png" alt="">
            <div class="fill-box">

                <!-- 原始位置 position: absolute; 无display -->
                <!-- <div class="fill" style="left: 00.00%; width: 18.05%; background-color: red;"></div>
                <div class="fill" style="left: 18.05%; width: 03.80%; background-color: orange;"></div>
                <div class="fill" style="left: 19.16%; width: 03.65%; background-color: yellow;"></div>
                <div class="fill" style="left: 19.65%; width: 03.12%; background-color: green;"></div>
                <div class="fill" styble="left: 19.92%; width: 03.73%; background-color: cyan;"></div>
                <div class="fill" style="left: 23.65%; width: 30.85%; background-color: blue;"></div>
                <div class="fill" style="left: 54.50%; width: 03.22%; background-color: violet;"></div>
                <div class="fill" style="left: 54.86%; width: 03.31%; background-color: gray;"></div>
                <div class="fill" style="left: 57.67%; width: 02.80%; background-color: pink;"></div>
                <div class="fill" style="left: 60.16%; width: 25.27%; background-color: black;"></div>
                <div class="fill" style="left: 85.06%; width: 01.74%; background-color: white;"></div>
                <div class="fill" style="left: 86.80%; width: 13.20%; background-color: brown;"></div> -->

                <!-- 调整位置 display: flex; 无position -->
                <div class="fill" style="width: 18.05%; background-color: red;"></div>
                <div data-img="1_1" class="fill highlight" style="width: 01.855%; background-color: orange;"></div>
                <div data-img="1_2" class="fill highlight" style="width: 01.225%; background-color: yellowgreen;"></div>
                <div data-img="1_3" class="fill highlight" style="width: 00.815%; background-color: blue;"></div>
                <div data-img="1_4" class="fill highlight" style="width: 01.705%; background-color: cyan;"></div>
                <div class="fill" style="width: 30.85%; background-color: #888888;"></div>
                <div data-img="2_1" class="fill highlight" style="width: 01.790%; background-color: purple;"></div>
                <div data-img="2_2" class="fill highlight" style="width: 01.630%; background-color: red;"></div>
                <div data-img="3_1" class="fill highlight" style="width: 02.395%; background-color: orange;"></div>
                <div data-img="4_1" class="fill highlight" style="width: 24.930%; background-color: yellowgreen;"></div>
                <div data-img="5_1" class="fill highlight" style="width: 01.555%; background-color: blue;"></div>
                <div class="fill" style="width: 13.20%; background-color: cyan;"></div>
            </div>
            <!-- <div id="scanLine"></div> -->
            <div class="gif">
                <img src="" alt="">
            </div>
            <div class="introduce"></div>
            <div class="pageTurnBtn">
                <!-- <a class="pageLeft button button-primary">上一个</a> -->
                <a class="pageRight button button-primary">下一个</a>
            </div>
        </div>
        <div class="quiz-box">
            <h3>这里事题目区域，，</h3>
            <div class="question">这事题目</div>
            <div class="option">这事选项</div>
        </div>
    </div>

    @include('template.footer')
</body>

<script>
    $(function () {
        $('#quiz-nav').addClass('nav-active');
        navbarBind();
    });

</script>

</html>
