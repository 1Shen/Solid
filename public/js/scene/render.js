var TOTAL_MODEL_NUM = 32; //需加载的模型总数

// 场景渲染(帧循环)
function render() {

    if (!global.system.pause) {

        // Test Your Code Here

        stats.update();

        TWEEN.update();

        renderer.render(scene, camera);

        if (global.camera.t_camera.enabled) {
            t_renderer.render(scene, t_camera);
        }

    }

    requestAnimationFrame(render);

}

// function changeProgressBar() {
//     // var n = 0;
//     // var m = parseInt($('#loadStatusListener').val() / TOTAL_MODEL_NUM * 100) + 1;
//     // var timer = setInterval(function () {
//     //     n++;
//     //     if (n > 100) {
//     //         n = 100;
//     //         clearInterval(timer);
//     //     } else if (n > m) {
//     //         n = m;
//     //     }
//     //     $('#progress-bar div').css('width', n + "%");
//     // }, 100);
//     $('#progress-bar div').animate({
//         width: '100%'
//     }, 30000);
// }

// 监听模型加载的进度
function loadStatusChange() {

    let loadedModelNum = $('#loadStatusListener').val();
    console.log("当前模型加载进度：" + loadedModelNum + "/" + TOTAL_MODEL_NUM);

    // 模型加载完成后开始动画渲染和事件监听
    if (loadedModelNum == TOTAL_MODEL_NUM) {

        document.getElementById('loadStatusListener').onchange = function () {};
        console.log(global.object.model);

        initObjects(); //初始化模型的位置和方法
        initAnimations(); //初始化动画
        initItems(); //初始化物品属性
        initControls(); //初始化控制器

        // 开始渲染
        render();

        // 关闭遮罩层
        $('#canvas').busyLoad('hide');

        showMainMenu();
        menu_shown = null;
    }
}
