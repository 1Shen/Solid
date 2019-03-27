<!DOCTYPE html>
<html>

<head>
    <script src="http://apps.bdimg.com/libs/angular.js/1.5.0-beta.0/angular.min.js"></script>
    <script src="/js/commons.js"></script>
    <script src="/js/home/index.js"></script>
    <link rel="stylesheet" href="/css/home/index.css">

    <title>虚拟仿真实验</title>
</head>

<body ng-app="">
    @include('template.nav')

    <div id="main">
        <div id="banner" class="container-fluid">
            <div class="container">
                <div class="title">固体红外光谱<small>的测试与分析</small></div>
                <div class="content">
                    <p>红外光谱反映的是分子的振动情况。当用一定频率的红外光照射某物质分子时，分子间的振动能产生偶极矩周期性变化。</p>
                    <p>本实验旨在让学生通过虚拟仿真实验练习，掌握红外光谱仪的一些基本操作以及红外光谱测定的样品制备方法，熟悉如何由红外光谱鉴别官能团并根据官能团确定未知组分的主要结构。</p>
                </div>
                <a class="layui-btn layui-btn-lg" href="{{ url('game') }}">开始实验</a>
                <a style="margin-left: 17px" class="layui-btn layui-btn-lg" href="{{ url('learn') }}">先去学习</a>
            </div>
        </div>
        <div id="content" class="container">
            <div class="row">
                <div class="col-left col-md-8">
                    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                        <ul class="layui-tab-title">
                            <li class="layui-this">实验原理</li>
                            <li>药品试剂</li>
                            <li>仪器设备</li>
                            <li>注意事项</li>
                        </ul>
                        <div class="layui-tab-content">
                            <div class="layui-tab-item layui-show">
                                <div class="subtitle">实验原理</div>
                                <div class="subcontent">
                                    <p>红外光谱反映的是分子的振动情况。当用一定频率的红外光照射某物质分子时，若该物质的分子中某基团的振动频率与它相同，则此物质就能吸收这种红外光，使分子由振动基态跃迁到激发态。因此，若用不同频率的红外光依次通过测定分子时，就会出现不同强弱的吸收现象。用T％--λ作图就得到红外吸收光谱。红外吸收光谱具有很高的特征性，每种化合物都具有特征的红外光谱。用它可进行物质的结构分析和定量测定。</p>
                                    <p>当分子间的振动能产生偶极矩周期性变化时，就具有红外吸收光谱。习惯上把红外光谱划分为两个区域，即“特征区”（4000—1330cm－1）和“指纹区”（1330—400cm－1）。特征区主要反映了某些官能团的伸缩振动，该区域内的吸收峰较少，且同一种官能团存在于不同的化合物中，它的红外吸收峰的位置在比较窄的范围内变动，特征性较强，可用来检定官能团。指纹区反映了某此分子骨架的特征振动，在这一个区域，一部分振动频率对整个分子结构环境的变化十分敏感。由于同一种官能团所处的分子环境可能不一样，对其振动频率肯定会产生不同的影响，因此，可将“特征区”及“指纹区”相结合来判断分子的结构。</p>
                                </div>
                            </div>
                            <div class="layui-tab-item">
                                <div class="subtitle">正己烷</div>
                                <div class="subcontent">
                                    <p>正己烷，是低毒、有微弱的特殊气味的无色液体。正己烷是一种化学溶剂，主要用于丙烯等烯烃聚合时的溶剂、食用植物油的提取剂、橡胶和涂料的溶剂以及颜料的稀释剂，具有一定的毒性，会通过呼吸道、皮肤等途径进入人体，长期接触可导致人体出现头痛、头晕、乏力、四肢麻木等慢性中毒症状，严重的可导致晕倒、神志丧失、癌症甚至死亡。</p>
                                    <div class="content-img">
                                        <img src="/static/images/img/hexane.jpg" alt="">
                                    </div>
                                </div>

                                <div class="subtitle">溴化钾</div>
                                <div class="subcontent">
                                    <p>溴化钾（Potassium bromide），化学式为KBr，相对分子质量为119.00。</p>
                                    <p>无色结晶或白色粉末，有强烈咸味，见光色变黄。稍有吸湿性。1g溶于1.5ml水，水溶液呈中性。相对密度为2.75。熔点730℃。沸点1435℃。有刺激性。主要用于光谱分析，点滴分析测定铜及银，极谱分析铟、镉和砷，显影剂。</p>
                                    <div class="content-img">
                                        <img src="/static/images/img/hexane.jpg" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-tab-item">
                                <div class="subtitle">傅里叶变换红外光谱仪</div>
                                <div class="subcontent">
                                    <p>傅里叶变换红外光谱仪（Fourier Transform Infrared Spectrometer，简写为 FTIR
                                        Spectrometer）,简称为傅里叶红外光谱仪。它不同于色散型红外分光的原理，是基于对干涉后的红外光进行傅里叶变换的原理而开发的红外光谱仪，主要由红外光源、光阑、干涉仪（分束器、动镜、定镜）、样品室、检测器以及各种红外反射镜、激光器、控制电路板和电源组成。可以对样品进行定性和定量分析，广泛应用于医药化工、地矿、石油、煤炭、环保、海关、宝石鉴定、刑侦鉴定等领域。</p>
                                </div>

                                <div class="subtitle">仪器原理</div>
                                <div class="subcontent">
                                    <p>光源发出的光被分束器（类似半透半反镜）分为两束，一束经反射到达动镜，另一束经透射到达定镜。两束光分别经定镜和动镜反射再回到分束器，动镜以一恒定速度作直线运动，因而经分束器分束后的两束光形成光程差，产生干涉。干涉光在分束器会合后通过样品池，通过样品后含有样品信息的干涉光到达检测器，然后通过傅里叶变换对信号进行处理，最终得到透过率或吸光度随波数或波长的红外吸收光谱图。</p>
                                    <div class="content-img">
                                        <img src="/static/images/img/analyzer.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-tab-item">
                                <div class="subtitle">注意事项</div>
                                <div class="subcontent">
                                    <p>1.
                                        应使谱图中所有的吸收峰的强度落在纵坐标T％的20～80％范围，如果透射太大则易将小的吸收峰埋没，太小则易将其它的吸收峰拉平，因此，应调节好适当的样品和KBr的比例。</p>
                                    <p>2. 压片压力应保持在6吨左右。太大会压坏模具，太小不易成片。</p>
                                    <p>3. 数据处理应注意有效数字。</p>
                                </div>

                                <div class="subtitle">思考</div>
                                <div class="subcontent">
                                    <p>1. 对照文献归属所测的样品红外吸收峰，说明样品是何物质？</p>
                                    <p>2. 说说红外光谱对你今后科研工作发挥的作用。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-right col-md-4">
                    <div class="sidebar">
                        <div class="title">教师简介</div>
                        <div class="avatar">
                            <img src="{{ asset('storage') . '/default.jpg' }}" alt="">
                        </div>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>

                        <div class="title">联系我们</div>
                        <div class="content">
                            <p>QQ：123456</p>
                            <p>邮箱：123456@qq.com</p>
                        </div>
                        <div class="title">其他</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('template.footer')
</body>

<script>
    $(function() {
        $('#index-nav').addClass('nav-active');
        navbarBind();

        layui.use('element', function() {
            var element = layui.element;

            //一些事件监听
            element.on('tab(demo)', function(data) {
                console.log(data);
            });
        });
    })
</script>

</html> 