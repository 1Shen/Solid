/**
 * animation.js
 * 动画相关
 */

// 动画列表
var animation = {
    "tighten": {}, //拧紧
    "loosen": {}, //松开
    "press": {}, //加压
    "depress": {}, //减压
    "cover_open": {}, //打开盖子
    "cover_close": {}, //关上盖子
    "grind": {}, //研磨
    "spoon_fetch": {}, //药匙取样
    "3D_arrow": {
        tweens: []
    }, //3D指示箭头
    "2D_arrow": {}, //2D指示箭头
    "camera_to_pc": {}, //镜头锁定电脑
}

function initAnimations() {
    // 固定旋钮
    initTightenAnime();
    initLoosenAnime();

    // 压力旋钮
    initPressAnime();
    initDepressAnime();

    // 分析仪盖子
    initCoverOpenAnime();
    initCoverCloseAnime();

    // 研磨
    initGrindAnime();

    // 药匙
    initSpoonFetch();

    // 箭头
    init3DArrowAnime();
    init2DArrowAnime();

    // 镜头
    initCameraToPCAnime();
}

//===============================================================================================
// (镜头锁定电脑)

function initCameraToPCAnime() {

    TWEEN.removeAll();
    let model = global.object.model['computer'].modelObject;

    animation['camera_to_pc'].play = function () {

        new TWEEN.Tween(camera.position).to({

            x: model.position.x - 310,
            y: model.position.y + 225,
            z: model.position.z - 300

        }, 1500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
            orbitControls.update();
        }).start();

        new TWEEN.Tween(orbitControls.target).to({

            x: model.position.x,
            y: model.position.y + 70,
            z: model.position.z

        }, 1500).easing(TWEEN.Easing.Quadratic.Out).onStart(function () {
            orbitControls.enabled = false;
        }).onUpdate(function () {
            orbitControls.update();
        }).onComplete(function () {
            orbitControls.enabled = true;
            showMessage("单击电脑查看分析结果", 3000);
            model.trigger = function () {
                pause();
                $('#map-bg').show().addClass('largen').removeClass('narrow');
                $('.spop-container').remove();
            }
        }).start();
    }

    // model.trigger = animation['camera_to_pc'].play
}

//===============================================================================================
// (指示箭头)

function init2DArrowAnime() {

    let ele = $('#arrow_upon_item');
    let w = window.innerHeight - $('body')[0].offsetHeight;

    animation['2D_arrow'].play = function (bottom, right) {

        ele.css('bottom', bottom);
        ele.css('padding-right', right);
        ele.css('display', 'flex');
        ele.css('bottom', w + 160 + "px");

        let anime = function () {
            ele.animate({
                bottom: "-=17px"
            }, 400).animate({
                bottom: "+=17px"
            }, 400, anime);
        }

        anime();
    }

    animation['2D_arrow'].stop = function () {
        ele.hide();
    }
}

function init3DArrowAnime() {

    TWEEN.removeAll();
    let model = global.object.model['arrow'].modelObject;
    model.children[0].material.color.setHex(0xff3333);

    animation['3D_arrow'].play = function (x, y, z) {
        model.show(x, y, z);

        let rotateTween = new TWEEN.Tween(model.rotation).to({

            x: model.rotation.x,
            y: model.rotation.y - Math.PI * 2,
            z: model.rotation.z

        }, 10000);

        let downwardTween = new TWEEN.Tween(model.position).to({

            x: model.position.x,
            y: model.position.y - 10,
            z: model.position.z

        }, 550);

        let upwardTween = new TWEEN.Tween(model.position).to({

            x: model.position.x,
            y: model.position.y,
            z: model.position.z

        }, 550);

        this.tweens.push(rotateTween);
        this.tweens.push(upwardTween);
        this.tweens.push(downwardTween);

        downwardTween.chain(upwardTween);
        upwardTween.chain(downwardTween);
        downwardTween.start();
        rotateTween.start().repeat(Infinity);
    }

    animation['3D_arrow'].stop = function () {
        this.tweens.forEach(function (tween) {
            tween.stop();
        });
        model.hide();
    }
}

//===============================================================================================
// (固定旋钮)

function initTightenAnime() {
    TWEEN.removeAll();
    let model = global.object.model['press_screw_top'].modelObject;
    let press = global.object.model['press_body'].modelObject;
    animation['tighten'].play = function () {

        let maxCount = press.empty ? model.maxCount : press.needFix;

        if (model.count == maxCount) {
            showErrorMsg('旋不动了');
            return;
        }

        new TWEEN.Tween(model.rotation).to({

            x: model.rotation.x,
            y: model.rotation.y - 4,
            z: model.rotation.z

        }, 2000).start();

        new TWEEN.Tween(model.position).to({

            x: model.position.x,
            y: model.position.y - 6,
            z: model.position.z

        }, 2000).onStart(function () {

            removeHighlight(model.name);
            removeHighlight("press_body");
            removeHighlight("press_screw_front");

        }).onComplete(function () {

            model.resetCoverBox();
            addHighlight(model.name);
            addHighlight("press_body");
            addHighlight("press_screw_front");

            model.count++;

            if (model.count == press.needFix && !press.empty) {
                stepComplete(4, 0);
            }

        }).start();
    }

    animation['tighten'].origin = animation['tighten'].play;
}

function initLoosenAnime() {
    TWEEN.removeAll();
    let model = global.object.model['press_screw_top'].modelObject;
    let front = global.object.model['press_screw_front'].modelObject;
    animation['loosen'].play = function () {

        if (model.count == 0) {
            showErrorMsg('旋不动了');
            return;
        }

        if (front.count > 0) {
            showErrorMsg('压力机正处于施压状态'); 
            recordError("压力机正处于施压状态");
            return;
        }

        new TWEEN.Tween(model.rotation).to({

            x: model.rotation.x,
            y: model.rotation.y + 4,
            z: model.rotation.z

        }, 2000).start();

        new TWEEN.Tween(model.position).to({

            x: model.position.x,
            y: model.position.y + 6,
            z: model.position.z

        }, 2000).onStart(function () {

            removeHighlight(model.name);
            removeHighlight("press_body");
            removeHighlight("press_screw_front");

        }).onComplete(function () {

            model.resetCoverBox();
            addHighlight(model.name);
            addHighlight("press_body");
            addHighlight("press_screw_front");

            model.count--;

        }).start();
    }

    animation['loosen'].origin = animation['tighten'].play;
}

//===============================================================================================
// (压力旋钮)

function initPressAnime() {
    TWEEN.removeAll();
    let model = global.object.model['press_screw_front'].modelObject;
    let press = global.object.model['press_body'].modelObject;
    let top = global.object.model['press_screw_top'].modelObject;
    let pointer = global.object.model['press_pointer'].modelObject;

    animation['press'].play = function () {

        if (press.empty) {
            showErrorMsg('压力机当前为空');
            return;
        }

        if (top.count < press.needFix) {
            showErrorMsg('请先固定压模');
            recordError('请先固定压模');
            return;
        }

        if (model.count == model.maxCount) {
            showErrorMsg('压力值过大');
            recordError("压力值过大");
            return;
        }

        openMagnifier(new THREE.Vector3(
            pointer.position.x,
            -16,
            pointer.position.z
        ), new THREE.Vector3(
            pointer.position.x,
            -40.2,
            pointer.position.z
        ));

        new TWEEN.Tween(pointer.rotation).to({

            x: pointer.rotation.x,
            y: pointer.rotation.y - Math.PI / 4,
            z: pointer.rotation.z,

        }, 2000).start();

        new TWEEN.Tween(model.rotation).to({

            x: model.rotation.x,
            y: model.rotation.y,
            z: model.rotation.z - 2

        }, 2000).start();

        new TWEEN.Tween(model.position).to({

            x: model.position.x,
            y: model.position.y,
            z: model.position.z - 3

        }, 2000).onStart(function () {

            removeHighlight(model.name);
            removeHighlight("press_body");
            removeHighlight("press_screw_top");

        }).onComplete(function () {

            model.resetCoverBox();
            addHighlight(model.name);
            addHighlight("press_body");
            addHighlight("press_screw_top");

            model.count++;
            let middle = global.object.model['product-stamper_middle'].modelObject;

            if (model.count == press.needPress && !middle.failed) {
                let _top = global.object.model['stamper_top'].modelObject;
                replaceModel(middle, 'tablet', 'stamper_middle');

                _top.menuEnable = true;

                let stamper = global.object.model['stamper'].modelObject;
                stamper.tooltipContent = "右键：拆分";

                middle.failed = false;
                stepComplete(4, 1);
            }

            if (model.count == model.maxCount) {
                replaceModel(middle, 'failure', 'stamper_middle');
                middle.failed = true;
            }

        }).start();
    }

    animation['press'].origin = animation['press'].play;
}

function initDepressAnime() {
    TWEEN.removeAll();
    let model = global.object.model['press_screw_front'].modelObject;
    let press = global.object.model['press_body'].modelObject;
    let top = global.object.model['press_screw_top'].modelObject;
    let pointer = global.object.model['press_pointer'].modelObject;

    animation['depress'].play = function () {

        if (press.empty) {
            showErrorMsg('压力机当前为空');
            return;
        }

        if (top.count < press.needFix) {
            showErrorMsg('请先固定压模');
            return;
        }

        if (model.count == 0) {
            showErrorMsg('压力值不可为负');
            return;
        }

        new TWEEN.Tween(pointer.rotation).to({

            x: pointer.rotation.x,
            y: pointer.rotation.y + Math.PI / 4,
            z: pointer.rotation.z,

        }, 2000).start();

        new TWEEN.Tween(model.rotation).to({

            x: model.rotation.x,
            y: model.rotation.y,
            z: model.rotation.z + 2

        }, 2000).start();

        new TWEEN.Tween(model.position).to({

            x: model.position.x,
            y: model.position.y,
            z: model.position.z + 3

        }, 2000).onStart(function () {

            removeHighlight(model.name);
            removeHighlight("press_body");
            removeHighlight("press_screw_top");

        }).onComplete(function () {

            model.resetCoverBox();
            addHighlight(model.name);
            addHighlight("press_body");
            addHighlight("press_screw_top");

            model.count--;

            if (model.count == 0) {
                closeMagnifier();
            }

        }).start();
    }

    animation['depress'].origin = animation['depress'].play;
}

//===============================================================================================
// (分析仪盖子)

function initCoverOpenAnime() {

    TWEEN.removeAll();
    let model = global.object.model['infrared_analyzer_cover'].modelObject;
    let fixFrame = global.object.model['infrared_analyzer_fix_frame'].modelObject;

    animation['cover_open'].play = function () {

        openMagnifier(new THREE.Vector3(
            fixFrame.position.x - 30,
            fixFrame.position.y + 10,
            fixFrame.position.z + 20
        ), new THREE.Vector3(
            fixFrame.position.x,
            fixFrame.position.y,
            fixFrame.position.z
        ));

        new TWEEN.Tween(model.rotation).to({

            x: model.rotation.x - 1,
            y: model.rotation.y,
            z: model.rotation.z

        }, 2000).onStart(function () {

            removeHighlight(model.name);

        }).onComplete(function () {

            model.resetCoverBox();
            addHighlight(model.name);
            model.trigger = animation['cover_close'].play;

            let analyzer = global.object.model['infrared_analyzer_body'].modelObject;
            analyzer.opened = true;

        }).start();
    }
}

function initCoverCloseAnime() {
    TWEEN.removeAll();
    let model = global.object.model['infrared_analyzer_cover'].modelObject;
    let analyzer = global.object.model['infrared_analyzer_body'].modelObject;
    animation['cover_close'].play = function () {

        analyzer.opened = false;

        new TWEEN.Tween(model.rotation).to({

            x: model.rotation.x + 1,
            y: model.rotation.y,
            z: model.rotation.z

        }, 2000).onStart(function () {

            removeHighlight(model.name);

        }).onComplete(function () {

            model.resetCoverBox();
            addHighlight(model.name);
            model.trigger = animation['cover_open'].play;

            closeMagnifier();

            if (!analyzer.empty) {

                swal({
                    title: '开始进行样品的红外分析',
                    text: "你可以移步至电脑处点击屏幕查看分析结果",
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '好的',
                }).then(function (isConfirm) {
                    animation['camera_to_pc'].play();
                });

                model.trigger = function () {
                    showErrorMsg('分析仪工作中，请勿开盖');
                }
            }

        }).start();
    }
}

//===============================================================================================
// (研磨)

function initGrindAnime() {
    TWEEN.removeAll();

    let model = global.object.model['agate_pestle'].modelObject;
    let sample = global.object.model['mixture_on-agate_mortar'].modelObject;

    animation['grind'].onPlayDone = function () {}

    animation['grind'].play = function () {

        let bowl = global.object.model['mixture-agate_mortar'].modelObject;

        openMagnifier(new THREE.Vector3(
            bowl.position.x,
            bowl.position.y + 65,
            bowl.position.z
        ), new THREE.Vector3(
            bowl.position.x,
            bowl.position.y,
            bowl.position.z
        ));

        model.rotation.z = Math.PI / 180 * 15;

        new TWEEN.Tween(model.rotation).to({

            x: model.rotation.x,
            y: model.rotation.y + 12,
            z: model.rotation.z

        }, 4000).onStart(function () {

            removeHighlight("empty-agate_mortar");
            removeHighlight("agate_pestle");

        }).onComplete(function () {

            model.rotation.setFromVector3(model.originRotation);
            pickItem(model);

            animation['grind'].onPlayDone();

            addHighlight("empty-agate_mortar");
            addHighlight("agate_pestle");

        }).start();

        if (!sample.visible) {
            sample = global.object.model['product_on-agate_mortar'].modelObject;
        }

        new TWEEN.Tween(sample.rotation).to({

            x: sample.rotation.x,
            y: sample.rotation.y + 0.5,
            z: sample.rotation.z

        }, 4000).start();
    }
}

// (药匙取样)

function initSpoonFetch() {
    TWEEN.removeAll();
    let model = global.object.model['empty-spoon'].modelObject;

    animation['spoon_fetch'].onPlayDone = function () {}
    animation['spoon_fetch'].onPlayComplete = function () {}

    animation['spoon_fetch'].play = function (x, y, z) {

        model.show(x, y, z);
        model.rotation.z = Math.PI / 2;

        let upwardTween = new TWEEN.Tween(model.position).to({

            x: model.position.x,
            y: model.position.y,
            z: model.position.z

        }, 250).onComplete(function () {
            model.hide();

            $('.item').each(function () {

                if ($(this).data('name') == "") {

                    // 设置div的图片
                    setItemImage($(this), model.name, false);

                    $(this).trigger('click');

                    return false;
                }
            });

            animation['spoon_fetch'].onPlayDone();
            animation['spoon_fetch'].onPlayComplete();
        });

        let rotateTween = new TWEEN.Tween(model.rotation).to({

            x: model.rotation.x,
            y: model.rotation.y,
            z: model.rotation.z - Math.PI / 180 * 15

        }, 250).chain(upwardTween);

        new TWEEN.Tween(model.position).to({

            x: model.position.x,
            y: model.position.y - 20,
            z: model.position.z

        }, 250).onStart(function () {

            dropItem();

        }).start().chain(rotateTween);
    }
}

//===============================================================================================