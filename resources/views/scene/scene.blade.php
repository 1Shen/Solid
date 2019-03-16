<!DOCTYPE html>
<html>

<head>
    <title>3d实验场景</title>

    <!-- 引入公共头部 -->
    <script src="/js/commons.js"></script>

    <!-- css -->
    <link rel="stylesheet" href="/css/scene/scene.css">
    <link rel="stylesheet" href="/css/scene/ins.css">
    <link rel="stylesheet" href="/css/scene/tip.css">
    <link rel="stylesheet" href="/css/scene/result.css">
    <link rel="stylesheet" href="/css/scene/score.css">

    <!-- ThreeJS lib -->
    <script src='/lib/ThreeJS/three.js'></script>
    <script src='/lib/ThreeJS/Stats.js'></script>
    <script src="/lib/ThreeJS/tween.min.js"></script>
    <script src='/lib/ThreeJS/controls/OrbitControls.js'></script>
    <script src="/lib/ThreeJS/controls/DragControls.js"></script>
    <script src='/lib/ThreeJS/loaders/MTLLoader.js'></script>
    <script src='/lib/ThreeJS/loaders/OBJLoader.js'></script>
    <script src='/lib/ThreeJS/loaders/TGALoader.js'></script>
    <!-- js -->
    <script src="/js/scene/global.js"></script>
    <script src="/js/scene/utils.js"></script>
    <script src="/js/scene/initScene.js"></script>
    <script src="/js/scene/initMenu.js"></script>
    <script src="/js/scene/initObject.js"></script>
    <script src="/js/scene/render.js"></script>
    <script src="/js/scene/mouseEvent.js"></script>
    <script src="/js/scene/animation.js"></script>
    <script src="/js/scene/GUI.js"></script>
    <script src="/js/scene/game.js"></script>
    <script src="/js/scene/result.js"></script>
    <script src="/js/scene/sound.js"></script>
    <script src="/js/scene/mission.js"></script>
    <!-- 遮罩层插件 -->
    <link href="https://cdn.jsdelivr.net/npm/busy-load/dist/app.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/busy-load/dist/app.min.js"></script>

</head>

<body onload="start()" oncontextmenu="return false">

    <!-- <div id="scorePanel">
        <div class="scroll-panel">
            <div class="title">实验结果</div>
            <div class="totalTime">
                <div class=""></div>
            </div>
        </div>
    </div> -->

    <!-- 红外光谱背景 -->
    <div id="map-bg" class="narrow">
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
            <div id="scanLine"></div>
            <div class="gif">
                <img src="" alt="">
            </div>
            <div class="introduce"></div>
            <div class="pageTurnBtn">
                <a class="pageLeft button button-primary">上一个</a>
                <a class="pageRight button button-primary">下一个</a>
            </div>
        </div>
    </div>

    <!-- canvas -->
    <div id="canvas">
        <!-- 放大镜 -->
        <div id="t_canvas">
            <div class="close" onclick="closeMagnifier()">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
            <div class="function">
                <i class="fa fa-search-plus" aria-hidden="true" onclick="zoomIn()"></i>
                <i class="fa fa-search-minus" aria-hidden="true" onclick="zoomOut()"></i>
            </div>
        </div>
        <!-- 放大镜 -->
        <i onclick="openMagnifier()" class="fa fa-search button-raised button-circle button-jumbo" id="btnSearch"
            aria-hidden="true" style="display:none"></i>

    </div>

    <div id="arrow_upon_item">
        <img src="/static/images/icon/arrow.png" alt="">
    </div>

    <!-- itemBar -->
    <div id="inventory" style="display:none">
        <div class="text text-center"></div>
        <div class="itemBar">
            <div class="activeBorder">
                <div class="item active">
                    <img src="" alt="">
                </div>
            </div>
            <div class="activeBorder">
                <div class="item">
                    <img src="" alt="">
                </div>
            </div>
            <div class="activeBorder">
                <div class="item">
                    <img src="" alt="">
                </div>
            </div>
            <div class="activeBorder">
                <div class="item">
                    <img src="" alt="">
                </div>
            </div>
            <div class="activeBorder">
                <div class="item">
                    <img src="" alt="">
                </div>
            </div>
            <div class="activeBorder">
                <div class="item">
                    <img src="" alt="">
                </div>
            </div>
        </div>
    </div>

    <!-- 倒计时 -->
    <span id="runner" style="display:none"></span>

    <!-- title -->
    <div id="title" style="display:none">
        <span>固体红外光谱的测试与分析</span>
    </div>

    <!-- main menu -->
    <div class="text text-center" id="mainMenu" style="display:none">
        <div class="button button-3d" id="btnStart">开始实验</div>
        <div class="button button-3d" id="btnIns">操作说明</div>
        <div class="button button-3d" id="btnExit">退出实验</div>
    </div>

    <!-- tab -->
    <div id="textIns" style="display:none">
        <div class="tab">
            <div class="title" data-text="text1" data-placement="left" title="操作">
                <img class="img-m" src="/static/images/instruction/keyboard.png" alt="">
                <!-- <i class="fa fa-gamepad" aria-hidden="true"></i> -->
            </div>
            <div class="title" data-text="text2" data-placement="left" title="界面">
                <img class="img-l" src="/static/images/instruction/spop.png" alt="">
            </div>
            <div class="title" data-text="text3" data-placement="left" title="烧杯和药匙">
                <img src="/static/images/instruction/beaker_spoon.png" alt="">
            </div>
            <div class="title" data-text="text4" data-placement="left" title="研钵和钵杵">
                <img src="/static/images/instruction/mortar_pestle.png" alt="">
            </div>
            <div class="title" data-text="text5" data-placement="left" title="压模">
                <img src="/static/images/instruction/stamper.png" alt="">
            </div>
            <div class="title" data-text="text6" data-placement="left" title="压力机">
                <img src="/static/images/instruction/press.png" alt="">
            </div>
            <div class="title fixed active" data-text="text7" data-placement="left" title="游戏说明">
                <img class="img-m" src="/static/images/instruction/trophy.png" alt="">
                <!-- <i style="color: #FFB90F;" class="fa fa-trophy" aria-hidden="true"></i> -->
            </div>

            <div id="text1" class="text"></div>
            <div id="text2" class="text"></div>
            <div id="text3" class="text"></div>
            <div id="text4" class="text"></div>
            <div id="text5" class="text"></div>
            <div id="text6" class="text"></div>
            <div id="text7" class="text content"></div>

        </div>

        <div class=" button button-raised button-circle button-jumbo button-small" id="btnReturnIns"><i class="fa fa-times"
                aria-hidden="true"></i></div>
    </div>

    <div class="text" id="textMisson" style="display:none">这是任务目标</div>
    <i class="fa fa-lightbulb-o button-raised button-circle button-jumbo" aria-hidden="true" id="btnTip" style="display:none"></i>
    <div id="textTip" style="display:none">
        <div class="tip-body">

        </div>
        <div class=" button button-raised button-circle button-jumbo button-small" id="btnReturnTip"><i class="fa fa-times"
                aria-hidden="true"></i></div>
    </div>
    <div class="button button-raised button-circle button-jumbo" id="btnPause" style="display:none">暂停</div>

    <!-- item menu -->
    <div id="press_screw_front_menu"></div>
    <div id="press_screw_top_menu"></div>
    <div id="stamper_top_menu"></div>
    <div id="empty-agate_mortar_menu"></div>

    <!-- Listener -->
    <input type="hidden" value="0" id="loadStatusListener" onchange="loadStatusChange()">
</body>

</html>