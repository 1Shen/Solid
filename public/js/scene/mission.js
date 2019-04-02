var mission_start = false;
var mission_step = 0;
const TOTAL_MISSION_STEP = 6;

var mission = [{
        title: "获取待测样品",
        step: 0,
        stepList: [false]
    },

    {
        title: "在玛瑙研钵中加入适当比例样品和溴化钾固体",
        step: 0,
        stepList: [false, false, false]
    },

    {
        title: "研磨",
        step: 0,
        stepList: [false, false]
    },

    {
        title: "组装压模",
        step: 0,
        stepList: [false, false, false]
    },

    {
        title: "制作装片",
        step: 0,
        stepList: [false, false]
    },

    {
        title: "分析结果",
        step: 0,
        stepList: [false, false]
    }
];

// 游戏引导
var guide_step = 0;
const toast_time = 10000;
const guide = [{
        done: false,
        do: function (itemName) {
            if (itemName == 'empty-spoon') {

                this.done = true;
                guide_step++;

                animation['3D_arrow'].stop();

                animation['2D_arrow'].play('25%', '475px');

                showMessage("选择刚刚拿到的 [ <span class='toast-high'>药匙</span> ]", toast_time);

                console.log(guide_step)
            }
        }
    },

    {
        done: false,
        do: function (itemName) {
            if (itemName == 'empty-spoon') {

                this.done = true;
                guide_step++;

                animation['2D_arrow'].stop();

                let model = global.object.model['sample-beaker'].modelObject;

                animation['3D_arrow'].play(model.position.x, model.position.y + 50, model.position.z);

                showMessage("从烧杯中取一匙 [ <span class='toast-high'>样品粉末</span> ]", toast_time);

                console.log(guide_step)
            }
        }
    },

    {
        done: false,
        do: function (itemName) {
            if (itemName) return;

            this.done = true;
            guide_step++;

            animation['3D_arrow'].stop();

            animation['spoon_fetch'].onPlayComplete = function () {
                let model = global.object.model['sample-beaker'].modelObject;

                animation['3D_arrow'].play(model.position.x, model.position.y + 50, model.position.z);

                showMessage("再次点击可将粉末倒回烧杯", toast_time);

                animation['spoon_fetch'].onPlayComplete = function () {};
            }

            console.log(guide_step)

        }
    },

    {
        done: false,
        do: function (itemName) {
            if (itemName) return;
            this.done = true;
            guide_step++;

            animation['3D_arrow'].stop();

            let model = global.object.model['empty-spoon'].modelObject;

            animation['3D_arrow'].play(model.origin.x, model.origin.y + 50, model.origin.z);

            showMessage("点击桌子可以放置物品", toast_time);
            console.log(guide_step)
        }
    },

    {
        done: false,
        do: function (itemName) {
            if (itemName == 'empty-spoon') {
                this.done = true;
                guide_step++;
                animation['3D_arrow'].stop();

                swal({
                    title: '你已完成实验引导',
                    text: "接下来开始做实验吧！<br>小提示：开始游戏前请仔细阅读<span class='high'>操作说明</span>",
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '好的',
                }).then(function (isConfirm) {
                    if (isConfirm) {
                        mission_start = true;
                        showMissonMsg('获取待测样品');
                        $('.cpt-toast').hide();
                    }
                });
            }
        }
    }
];


// 完成游戏引导
function guideComplete(step, param = null) {
    if (guide[guide_step] && guide[guide_step].done == false && guide_step == step) {
        if (param) {
            guide[step].do(param);
        } else {
            guide[step].do();
        }
    }
}


// tip初始化
function initTip() {
    $('.tip-body').scroll(function () {
        $(this).css('margin-right', '0px');
    });

    $('.tip-body').scrollEnd(function () {
        $('.tip-body').css('margin-right', '-150px');
    });

    $('.tip-body').load('/html/scene/tipText/mission_0.html');
}

// 完成任务
function missionComplete(step) {

    if (!mission_start) return false;

    let _step = step;

    if (step < TOTAL_MISSION_STEP - 1) {

        showCompleteMsg(mission[step].title, function () {

            showMissonMsg(mission[_step + 1].title);

        });

        switchMissionTip(++step, function () {
            mission_step++;
        });
    }
}


// 完成步骤
function stepComplete(step, stepIndex) {

    if (!mission_start) return false;

    if (mission[step].stepList[stepIndex] || step != mission_step) return;

    let divId = 'step_' + step + '_' + stepIndex;
    $('#' + divId).find('.layui-timeline-axis').css('color', '#fff').css('background', '#5FB878').css('font-weight', 'bolder');
    $('#' + divId).removeClass('layui-timeline-item').addClass('layui-timeline-item-active');

    mission[step].stepList[stepIndex] = true;
    mission[step].step++;
}

// 切换任务提示
function switchMissionTip(step, callback) {
    $('.tip-body').load('/html/scene/tipText/mission_' + step + '.html', callback);
}
