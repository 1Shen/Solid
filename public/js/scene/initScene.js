var canvas; //画布
var renderer; //渲染器
var camera; //主摄像机
var scene; //场景
var clock; //系统时钟
var orbitControls; //场景漫游控制器

var t_canvas; //放大镜视野
var t_renderer; //副渲染器
var t_camera; //副摄像机
var t_orbitControls; //副控制器

// 初始化渲染器
function initRenderer() {

    // 主渲染器
    canvas = document.getElementById('canvas');
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(width, height);
    canvas.appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff, 1.0);

    // 副渲染器
    t_canvas = document.getElementById('t_canvas');
    t_width = t_canvas.clientWidth;
    t_height = t_canvas.clientHeight;
    t_renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    t_renderer.setSize(t_width, t_height);
    t_canvas.appendChild(t_renderer.domElement);
    t_renderer.setClearColor(0xffffff, 1.0);

    // fps监测器
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    // canvas.appendChild(stats.domElement);
}

// 展开放大镜扩展
function openSearch() {
    if ($('.search-group').hasClass('smaller')) {
        $('.search-group').addClass('bigger').removeClass('smaller');
        $('#btnSearch').removeClass('fa-search').addClass('fa-times');
    } else {
        $('.search-group').addClass('smaller').removeClass('bigger');
        $('#btnSearch').removeClass('fa-times').addClass('fa-search');
    }
}

// 打开放大镜视野
function openMagnifier(pos = null, target = null) {

    $('#btnSearch').hide();

    if (!pos && !target) {
        t_orbitControls.update();
        $(t_canvas).css("z-index", 0);
        global.camera.t_camera.enabled = true;
        return;
    }

    t_camera.position.set(pos.x, pos.y, pos.z);
    t_orbitControls.target = new THREE.Vector3(target.x, target.y, target.z);
    t_orbitControls.update();
    $(t_canvas).css("z-index", 0);
    global.camera.t_camera.enabled = true;
}

// 关闭放大镜视野
function closeMagnifier() {
    $(t_canvas).css("z-index", -1);
    global.camera.t_camera.enabled = false;
    $('#btnSearch').show();
}

// 放大镜放大
function zoomIn() {
    let o = t_camera.position;
    let t = t_orbitControls.target;

    let temp = new THREE.Vector3(t.x, t.y, t.z);

    let p = temp.sub(o).normalize().multiplyScalar(3).add(o);
    let newPos = new THREE.Vector3(p.x, p.y, p.z);
    temp = new THREE.Vector3(t.x, t.y, t.z);

    if (p.dot(temp.sub(newPos)) <= 0) return;
    t_camera.position.set(newPos.x, newPos.y, newPos.z);
    t_orbitControls.update();
}

// 放大镜缩小
function zoomOut() {
    // TODO
    let o = t_camera.position;
    let t = t_orbitControls.target;
    let temp = new THREE.Vector3(t.x, t.y, t.z);
    let p = temp.sub(o).normalize().multiplyScalar(-3).add(o);
    let newPos = new THREE.Vector3(p.x, p.y, p.z);
    temp = new THREE.Vector3(t.x, t.y, t.z);
    if (p.dot(temp.sub(newPos)) <= 0) return;
    t_camera.position.set(newPos.x, newPos.y, newPos.z);
    t_orbitControls.update();
}

// 初始化照相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 7500);
    camera.position.set(0, 100, 210);
    camera.up.set(0, 1, 0);

    t_camera = new THREE.PerspectiveCamera(50, t_width / t_height, 0.1, 7500);
    t_camera.position.set(200, -16, -66.5);
    t_camera.up.set(0, 1, 0);
}

// 初始化控制器
function initControls() {
    // 视角旋转控制器
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    orbitControls.target = new THREE.Vector3(0, -60, 0);
    orbitControls.update();

    orbitControls.addEventListener('start', function () {
        unbindMouseEvent();
    });

    orbitControls.addEventListener('end', function () {
        bindMouseEvent();
    });

    t_orbitControls = new THREE.OrbitControls(t_camera, t_renderer.domElement);
    t_orbitControls.target = new THREE.Vector3(
        t_camera.position.x,
        t_camera.position.y - 24.2,
        t_camera.position.z
    );
    t_orbitControls.enablePan = false; // an animation loop is required when either damping or auto-rotation are enabled
    // orbitControls.dampingFactor = 0.25;
    // t_orbitControls.enableZoom = false;
    // t_orbitControls.enableRotate = false;
    // orbitControls.rotateSpeed = 0.05;
    // orbitControls.screenSpacePanning = false;
    // orbitControls.maxPolarAngle = Math.PI / 2;
}

// 初始化光源
function initLights() {
    // 点光源
    // var pointLight = new THREE.PointLight(0xffffff);
    // pointLight.position.set(-100, 100, 100);
    // scene.add(pointLight);

    // 环境光
    var ambientLight = new THREE.AmbientLight(0x222222, 1);
    scene.add(ambientLight);

    // 平行光（太阳光）
    var directionalLight = new THREE.DirectionalLight(0xeeeeee, 1);
    directionalLight.position.set(-1, 1, 1).normalize();
    scene.add(directionalLight);
}

// 初始化场景
function initScene() {
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    initRenderer();
    initCamera();
    initLights();
}

// 加载所有模型
function loadModels() {
    // 打开遮罩层
    $('#canvas').busyLoad('show', {
        background: '#6495ED',
        text: "Loading Models...",
        fontSize: "25px",
        fontawesome: "fa fa-cog fa-spin fa-4x fa-fw",
    });

    // load3DModel("../../static/models/agate_pestle", false);
    loadGLTFModel("/static/models/agate_pestle", false);
    // load3DModel("../../static/models/agate_mortar", false, 'empty-agate_mortar');
    loadGLTFModel("/static/models/agate_mortar", false, 'empty-agate_mortar');

    load3DModel("../../static/models/press_body", false);

    // load3DModel("../../static/models/press_screw_top", false);
    loadGLTFModel("../../static/models/press_screw_top", false);

    // load3DModel("../../static/models/press_screw_front", false);
    loadGLTFModel("../../static/models/press_screw_front", false);

    // load3DModel("../../static/models/press_pointer", false); //sp
    loadGLTFModel("../../static/models/press_pointer", false); //sp

    load3DModel("../../static/models/stamper_top", false);
    // loadGLTFModel("../../static/models/stamper_top", false);

    load3DModel("../../static/models/stamper_middle", false, 'empty-stamper_middle');
    // loadGLTFModel("../../static/models/stamper_middle", false, 'empty-stamper_middle');

    // load3DModel("../../static/models/stamper_bottom", false);
    loadGLTFModel("../../static/models/stamper_bottom", false);

    load3DModel("../../static/models/tweezers", false);
    // load3DModel("../../static/models/beaker", false, 'sample-beaker');
    loadGLTFModel("../../static/models/beaker", false, 'sample-beaker');
    // load3DModel("../../static/models/KBr-beaker", false);
    load3DModel("../../static/models/KBr-beaker", false);

    // load3DModel("../../static/models/spoon", false, 'empty-spoon');
    loadGLTFModel("../../static/models/spoon", false, 'empty-spoon');

    load3DModel("../../static/models/infrared_analyzer_body", false);
    // loadGLTFModel("../../static/models/infrared_analyzer_body", false);

    // load3DModel("../../static/models/infrared_analyzer_cover", false); //sp
    loadGLTFModel("../../static/models/infrared_analyzer_cover", false); //sp

    // load3DModel("../../static/models/infrared_analyzer_fix_frame", false);
    loadGLTFModel("../../static/models/infrared_analyzer_fix_frame", false);

    load3DModel("../../static/models/experiment_table", false);
    // loadGLTFModel("../../static/models/experiment_table", false);

    // load3DModel("../../static/models/computer_desk", false);
    loadGLTFModel("../../static/models/computer_desk", false);
    // load3DModel("../../static/models/computer", false);
    loadGLTFModel("../../static/models/computer", false);


    // 固体粉末
    // load3DModel("../../static/models/sample_on-spoon", false);
    loadGLTFModel("../../static/models/sample_on-spoon", false);

    // load3DModel("../../static/models/KBr_on-spoon", false);
    loadGLTFModel("../../static/models/KBr_on-spoon", false);

    // load3DModel("../../static/models/mixture_on-spoon", false);
    loadGLTFModel("../../static/models/mixture_on-spoon", false);

    // load3DModel("../../static/models/product_on-spoon", false);
    loadGLTFModel("../../static/models/product_on-spoon", false);

    // load3DModel("../../static/models/sample_on-agate_mortar", false);
    loadGLTFModel("../../static/models/sample_on-agate_mortar", false);

    // load3DModel("../../static/models/KBr_on-agate_mortar", false);
    loadGLTFModel("../../static/models/KBr_on-agate_mortar", false);

    // load3DModel("../../static/models/mixture_on-agate_mortar", false);
    loadGLTFModel("../../static/models/mixture_on-agate_mortar", false);

    // load3DModel("../../static/models/product_on-agate_mortar", false);
    loadGLTFModel("../../static/models/product_on-agate_mortar", false);

    // load3DModel("../../static/models/KBr_on-beaker", false);
    loadGLTFModel("../../static/models/KBr_on-beaker", false);

    // load3DModel("../../static/models/sample_on-beaker", false);
    loadGLTFModel("../../static/models/sample_on-beaker", false);


    // load3DModel("../../static/models/product_on-stamper_middle", false);
    loadGLTFModel("../../static/models/product_on-stamper_middle", false);

    // load3DModel("../../static/models/tablet_on-stamper_middle", false);
    loadGLTFModel("../../static/models/tablet_on-stamper_middle", false);


    // arrow
    // load3DModel("../../static/models/arrow", false);
    loadGLTFModel("/static/models/arrow", false);

}

// 应用入口
function start() {

    // changeProgressBar();
    initScene();
    initRoom();
    loadModels();
}
