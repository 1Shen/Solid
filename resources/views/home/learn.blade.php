<!DOCTYPE html>
<html>

<head>
    <script src="http://apps.bdimg.com/libs/angular.js/1.5.0-beta.0/angular.min.js"></script>
    <script src="/js/commons.js"></script>
    <script src="/js/home/learn.js"></script>
    <link rel="stylesheet" href="/css/home/learn.css">

    <link rel="stylesheet" href="/lib/ckin/dist/css/ckin.css">

    <title>虚拟仿真实验——课程中心</title>

</head>

<body ng-app="">
    @include('template.nav')

    <div id="main">
        <div class="blank-3x"></div>
        <div class="container">
            <div class="row">
                <div id="timeline-container" class="col-md-3">
                    <ul class="layui-timeline">

                        <li class="layui-timeline-item">
                            <i class="layui-icon layui-timeline-axis">&#xe63f;</i>

                            <div class="layui-timeline-content layui-text">
                                <h3 class="layui-timeline-title" data-video="1">研磨</h3>
                                <ul>
                                    <li>用药匙取干燥的样品粉末1mg</li>
                                    <li>将样品放入玛瑙研钵中</li>
                                    <li>然后用药匙取干燥的KBr粉末100mg</li>
                                    <li>将KBr粉末也放入玛瑙研钵中</li>
                                    <li>将研钵放在不易滑动的物体上，研杵保持垂直</li>
                                    <li>研杵按同一方向均匀用力</li>
                                    <li>研磨到试样中不再有肉眼可见的亮晶晶的小颗粒为止</li>
                                </ul>
                            </div>
                        </li>

                        <li class="layui-timeline-item">

                            <i class="layui-icon layui-timeline-axis">&#xe63f;</i>

                            <div class="layui-timeline-content layui-text">
                                <h3 class="layui-timeline-title" data-video="2">组装压模</h3>
                                <ul>
                                    <li>首先将中模与下冲头重合</li>
                                    <li>用药匙取少量研磨后的粉末</li>
                                    <li>将粉末填入模孔内</li>
                                    <li>将模孔边缘的粉末清理干净</li>
                                    <li>把上冲头轻轻的压在模孔上</li>
                                    <li>轻微旋转上冲头使粉末被压实</li>
                                </ul>
                            </div>

                        </li>

                        <li class="layui-timeline-item">

                            <i class="layui-icon layui-timeline-axis">&#xe63f;</i>

                            <div class="layui-timeline-content layui-text">
                                <h3 class="layui-timeline-title" data-video="3">制作装片</h3>
                                <ul>
                                    <li>松开压力机顶部的旋钮</li>
                                    <li>将组装好的压模置于压力机中部</li>
                                    <li>再调节顶部的旋钮将压模固定</li>
                                    <li>然后调节压力机前部的加压旋钮</li>
                                    <li>当压力表的压力到1MPa时，松开上下旋钮</li>
                                    <li>取出压模，可以观察到样品粉末被压成透明薄片</li>
                                </ul>
                            </div>

                        </li>

                        <li class="layui-timeline-item">

                            <i class="layui-icon layui-timeline-axis">&#xe63f;</i>

                            <div class="layui-timeline-content layui-text">
                                <h3 class="layui-timeline-title" data-video="4">红外分析</h3>
                                <ul>
                                    <li>打开红外分析仪的盖子</li>
                                    <li>取出分析仪内部的固定架</li>
                                    <li>将有样品薄片的中模卡在固定架上</li>
                                    <li>将固定架插回槽中</li>
                                    <li>旋转中模使红外光透过薄片较薄处</li>
                                    <li>盖上分析仪的盖子</li>
                                </ul>
                            </div>

                        </li>

                        <li class="layui-timeline-item">

                            <i class="layui-icon layui-timeline-axis">&#xe63f;</i>

                            <div class="layui-timeline-content layui-text" onClick="finishLearn()">
                                <h3 class="layui-timeline-title" data-video="5">完成</h3>
                            </div>

                        </li>

                    </ul>
                </div>
                <div id="video1" class="video-container col-md-9">
                    <video src="/static/videos/step1.mp4"></video>
                </div>
                <div id="video2" class="video-container col-md-9" style="display:none">
                    <video src="/static/videos/step2.mp4" data-ckin="default" data-overlay="2" data-title="固体红外光谱的测试与分析"></video>
                </div>
                <div id="video3" class="video-container col-md-9" style="display:none">
                    <video src="/static/videos/step3.mp4" data-ckin="default" data-overlay="2" data-title="固体红外光谱的测试与分析"></video>
                </div>
                <div id="video4" class="video-container col-md-9" style="display:none">
                    <video src="/static/videos/step4.mp4" data-ckin="default" data-overlay="2" data-title="固体红外光谱的测试与分析"></video>
                </div>
                <div id="video5" class="video-container col-md-9">
                    <!-- <a href="{{ url('game') }}" class="layui-btn layui-btn-lg">开始实验</a>
                    <a style="margin-left: 30px" href="{{ url('game') }}" class="layui-btn layui-btn-lg">课后练习</a> -->
                </div>
            </div>
        </div>
    </div>

    @include('template.footer')
</body>

<!-- script -->
<script src="/lib/ckin/dist/js/ckin.js"></script>
<script>
    $(function() {
        $('#learn-nav').addClass('nav-active');
        navbarBind();

        layui.use('element', function() {
            var element = layui.element;
        });
    });

    function finishLearn() {
        swal({
            title: '你已完成课程学习部分',
            text: "接下来开启虚拟仿真实验之旅吧！",
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '开始实验',
        }).then(function(isConfirm) {
            if (isConfirm) {
                window.location.href = "{{ url('game') }}";
            }
        });
    }
</script>

</html> 