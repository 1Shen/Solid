// game.js
// TODO: 游戏过程逻辑，控制游戏正确顺序 --舍弃过程逻辑

// 任务提示对照表
const missionTip = {
    '获取待测样品': '<p>左键获取桌上药匙，在物品栏中点击激活药匙，点击桌上装有待测样品的烧杯，即可获取待测样品。</p>',
    '在玛瑙研钵中加入适当比例的样品和溴化钾固体': '<p>点击激活装有样品的药匙后，点击桌上的玛瑙研钵即可将药匙上的样品装入研钵。</p><p>用同样的方法加入1：100的溴化钾，即可满足研磨所需。</p><p>注意：取样品一次1mg，取溴化钾一次20mg。</p>',
    '研磨': '<p>获取玛瑙钵杵后点击装好混合物的玛瑙研钵，即可自动研磨。待动画播放完毕，钵杵会回到物品栏。</p><p>研磨总计需要三次。</p>',
    '组装压模': '<p>点击获取中部后点击桌上的底部，可以将中部放到底部上，之后应将混合物倒入中部的凹槽内，再盖上顶部</p><p>正确的组装顺序为"底部，中部，研磨好的混合物，顶部"。</p>',
    '制作装片': '<p>将组装好的压模放入装片``机，如果顶部的固定旋钮过紧，则先旋松旋钮，放入后再旋紧旋钮。</p><p>压模固定后，调整前部的压力旋钮，每次旋转会加压0.5吨，正确的压力应为1吨。</p><p>压力正确后减小压力，松开固定旋钮，取出压模，这时的压模中部即为我们所需要的装片。</p><p>如果压力不正确，获取的压模中部将会是未完成的，此时需要重新进行前面的步骤。</p>',
    '分析结果': '<p>点击打开红外分析仪的盖子，将压模中部放入中间的固定架上，盖上盖子即可。</p>'
};

// 物品属性表
const property = {

    // 玛瑙研钵
    'empty-agate_mortar': {
        totalVal: 5, //reset 5
        initVal: 0,
        currVal: 0,
        needsample: 1, //reset 1
        needKBr: 4, //reset 4
        pickable: true,
        menuEnable: true,
        menuName: 'agate_mortar',
        tooltipTitle: "玛瑙研钵",
        tooltipContent: "右键：清空"
    },

    // 玛瑙钵杵
    'agate_pestle': {
        count: 0,
        maxCount: 1, //reset 3
        pickable: true,
        tooltipTitle: "玛瑙钵杵",
        tooltipContent: "用于研磨"
    },

    // 样品烧杯
    'sample-beaker': {
        totalVal: 8,
        initVal: 8,
        currVal: 8,
        pickable: true,
        tooltipTitle: "样品烧杯",
        tooltipContent: "盛放：待测样品<br>( 每次取1mg )"
    },

    // 溴化钾烧杯
    'KBr-beaker': {
        totalVal: 10,
        initVal: 10,
        currVal: 10,
        pickable: true,
        tooltipTitle: "溴化钾烧杯",
        tooltipContent: "盛放：溴化钾<br>( 每次取25mg )"
    },

    // 药匙
    'empty-spoon': {
        totalVal: 1,
        initVal: 0,
        currVal: 0,
        pickable: true,
        animation: animation['spoon_fetch'],
        tooltipTitle: "药匙",
        tooltipContent: "用于取药品"
    },

    // 压模底部
    'stamper_bottom': {
        pickable: true,
        tooltipTitle: "压模底部",
        tooltipContent: ""
    },

    // 压模中部
    'empty-stamper_middle': {
        totalVal: 1,
        initVal: 0,
        currVal: 0,
        failed: null,
        pickable: true,
        changeable: false,
        tooltipTitle: "压模中部",
        tooltipContent: ""
    },

    // 压模顶部
    'stamper_top': {
        pickable: true,
        menuEnable: false,
        tooltipTitle: "压模顶部",
        tooltipContent: ""
    },

    // 压力机主体
    'press_body': {
        empty: true,
        needFix: 2,
        needPress: 2, //reset 2
        tooltipTitle: "压力机主体",
        tooltipContent: "用于放置压模"
    },

    // 固定旋钮
    'press_screw_top': {
        menuEnable: true,
        count: 2, //reset 2
        maxCount: 5,
        tooltipTitle: "固定旋钮",
        tooltipContent: "右键：调节松紧程度"
    },

    // 压力旋钮
    'press_screw_front': {
        menuEnable: true,
        count: 0,
        maxCount: 5, //reset 5
        tooltipTitle: "压力旋钮",
        tooltipContent: "右键：调节压力值"
    },

    // 红外分析仪
    'infrared_analyzer_body': {
        empty: true,
        opened: false,
        tooltipTitle: "红外分析仪",
        tooltipContent: ""
    },

    // 红外分析仪盖子
    'infrared_analyzer_cover': {
        tooltipTitle: "分析仪盖子",
        tooltipContent: "左键：打开"
    },

    // 组装好的压模
    'stamper': {
        tooltipTitle: "组装好的压模",
        tooltipContent: "同步拾取，同步放置"
    },

    // 电脑
    'computer': {
        tooltipTitle: "电脑",
        tooltipContent: "左键：查看分析结果"
    }
};

// 物品中文翻译表
const zn_CH = {
    'empty-agate_mortar': '空的玛瑙研钵',
    'sample-agate_mortar': '装有样品的玛瑙研钵',
    'KBr-agate_mortar': '装有溴化钾的玛瑙研钵',
    'mixture-agate_mortar': '装有未成品的玛瑙研钵',
    'product-agate_mortar': '装有研磨成品的玛瑙研钵',
    'agate_pestle': '玛瑙钵杵',
    'sample-beaker': '样品烧杯',
    'KBr-beaker': '溴化钾烧杯',
    'infrared_analyzer_fix_frame': '红外分析仪固定架',
    'empty-spoon': '空的药匙',
    'sample-spoon': '装有样品的药匙',
    'KBr-spoon': '装有溴化钾的药匙',
    'mixture-spoon': '装有混合物的药匙',
    'product-spoon': '装有研磨成品的药匙',
    'stamper_bottom': '压模底部',
    'empty-stamper_middle': '空的压模中部',
    'product-stamper_middle': '装有研磨成品的压模中部',
    'tablet-stamper_middle': '装有样品薄片的压模中部',
    'failure-stamper_middle': '装有失败品的压模中部',
    'stamper_top': '压模上部',
    'tweezers': '镊子',
    'stamper': '组装好的压模',
};

/**
 * 交互动作表
 * action[a][b]的含义: 物品栏的[物品a]与场景中的[模型b]有交互
 * 通过action[a][b].do() 可执行交互
 * 通过action[a][b].do = null 可暂时屏蔽交互
 */

var action = {
    // 空药匙
    "empty-spoon": {

        "sample-beaker": {
            do: function () {

                let beaker = global.object.model['sample-beaker'].modelObject;

                animation['spoon_fetch'].onPlayDone = function () {
                    fetchReagent('sample-beaker', 'empty-spoon');
                    stepComplete(0, 0);
                }

                animation['spoon_fetch'].play(beaker.position.x + 6, beaker.position.y + 50, beaker.position.z);

                if (guide[2] && guide[2].done == false) {
                    guide[2].do();
                }
            }
        },

        "KBr-beaker": {
            do: function () {

                let beaker = global.object.model['KBr-beaker'].modelObject;

                animation['spoon_fetch'].onPlayDone = function () {
                    fetchReagent('KBr-beaker', 'empty-spoon');
                }

                animation['spoon_fetch'].play(beaker.position.x + 6, beaker.position.y + 50, beaker.position.z);
            }
        },

        "sample-agate_mortar": {
            do: function () {
                fetchReagent('sample-agate_mortar', 'empty-spoon');
            }
        },

        "KBr-agate_mortar": {
            do: function () {
                fetchReagent('KBr-agate_mortar', 'empty-spoon');
            }
        },

        "mixture-agate_mortar": {
            do: function () {
                showErrorMsg('固体粉末尚未充分研磨');
            }
        },

        "product-agate_mortar": {
            do: function () {
                fetchReagent('product-agate_mortar', 'empty-spoon');
                //showValMsg('product-agate_mortar');
            }
        }
    },

    // 装有样品的药匙
    "sample-spoon": {

        "empty-agate_mortar": {
            do: function () {
                dropReagent('sample-spoon', 'empty-agate_mortar');
                stepComplete(1, 0);
            }
        },

        "sample-beaker": {
            do: function () {
                dropReagent('sample-spoon', 'sample-beaker');
                if (guide[3] && guide[3].done == false) {
                    guide[3].do();
                }
            }
        },

        "sample-agate_mortar": {
            do: function () {
                dropReagent('sample-spoon', 'sample-agate_mortar');
            }
        },

        "KBr-agate_mortar": {
            do: function () {
                dropReagent('sample-spoon', 'KBr-agate_mortar');
            }
        },

        "mixture-agate_mortar": {
            do: function () {
                dropReagent('sample-spoon', 'mixture-agate_mortar');
            }
        }
    },

    // 装有溴化钾的药匙
    "KBr-spoon": {

        "empty-agate_mortar": {
            do: function () {
                dropReagent('KBr-spoon', 'empty-agate_mortar');
            }
        },

        "KBr-beaker": {
            do: function () {
                dropReagent('KBr-spoon', 'KBr-beaker');
            }
        },

        "KBr-agate_mortar": {
            do: function () {
                dropReagent('KBr-spoon', 'KBr-agate_mortar');
            }
        },

        "sample-agate_mortar": {
            do: function () {
                dropReagent('KBr-spoon', 'sample-agate_mortar');
                stepComplete(1, 1);
            }
        },

        "mixture-agate_mortar": {
            do: function () {
                dropReagent('KBr-spoon', 'mixture-agate_mortar');
            }
        }
    },

    // 玛瑙钵杵
    "agate_pestle": {
        "mixture-agate_mortar": {
            do: function () {
                grind();
                let mortar = global.object.model['empty-agate_mortar'].modelObject;
                if (mortar['needKBr'] != 0 || mortar['needsample'] != 0) {
                    showErrorMsg('尚未按正确比例混合样品与溴化钾');
                    recordError("尚未按正确比例混合样品与溴化钾");
                }
            }
        },

        "product-agate_mortar": {
            do: grind
        },
    },

    // 压模中部
    "empty-stamper_middle": {

        "stamper_bottom": {
            do: placeMiddleOnBottom,
        },
    },

    // 装有样品薄片的压模中部
    "tablet-stamper_middle": {

        "infrared_analyzer_body": {
            do: function () {
                let analyzer = global.object.model['infrared_analyzer_body'].modelObject;
                if (!analyzer.opened) {
                    showErrorMsg('分析仪盖子尚未打开');
                } else {
                    placeStamperOnAnalyzer();
                }
            }
        }
    },

    // 压模顶部
    "stamper_top": {
        "product-stamper_middle": {
            do: null
        }
    },

    // 装有研磨成品的药匙
    "product-spoon": {
        "empty-stamper_middle": {
            do: null
        }
    },

    // 组装好的压模
    "stamper": {
        "press_body": {
            do: placeStamperOnPress
        }
    },
};

//===============================================================================================
// (所有交互动作写这里)

// 将压模放入分析仪
function placeStamperOnAnalyzer() {
    let middle = global.object.model['empty-stamper_middle'].modelObject;
    let analyzer = global.object.model['infrared_analyzer_body'].modelObject;

    middle.show(analyzer.position.x - 3, analyzer.position.y, analyzer.position.z);
    middle.rotation.z = Math.PI / 2;
    middle.sample.rotation.z = Math.PI / 2;

    dropItem();

    analyzer.empty = false;
    analyzer.trigger = fetchStamperFromAnalyzer;
}

// 从分析仪中取出压模
function fetchStamperFromAnalyzer() {
    let middle = global.object.model['empty-stamper_middle'].modelObject;
    let analyzer = global.object.model['infrared_analyzer_body'].modelObject;

    if (analyzer.opened) {
        middle.rotation.z = 0;
        pickItem(middle);
        analyzer.empty = true;
        analyzer.trigger = null;
    } else {
        showErrorMsg('分析仪盖子尚未打开');
    }
}

// 将压模放入压力机
function placeStamperOnPress() {

    let stamper = global.object.model['stamper'].modelObject;
    let press = global.object.model['press_body'].modelObject;
    let top = global.object.model['press_screw_top'].modelObject;

    if (top.count < press.needFix) {
        stamper.show(press.position.x, press.position.y + 33, press.position.z);
        dropItem();
        press.empty = false;
        stamper.removeHighlight();

        press.trigger = fetchStamperFromPress;
    } else {
        showErrorMsg('放不进去');
    }
}

// 从压力机中取出压模
function fetchStamperFromPress() {
    let stamper = global.object.model['stamper'];
    let top = global.object.model['press_screw_top'].modelObject;
    let middle = global.object.model['empty-stamper_middle'].modelObject;

    if (!this.empty) {
        if (top.count < this.needFix) {

            if (middle.failed == false) {
                stepComplete(4, 2);
            }

            pickItem(stamper.modelObject);
            this.empty = true;
            stamper.modelObject.addHighlight();
            global.object.model['press_body'].modelObject.trigger = null;
        } else {
            showErrorMsg('请先松开固定旋钮');
        }
    }
}

// 研磨
function grind() {

    dropItem();

    let bar = global.object.model['agate_pestle'].modelObject;
    let bowl = global.object.model['mixture-agate_mortar'].modelObject;

    bar.show(bowl.position.x, bowl.position.y + 20, bowl.position.z);

    if (bowl.needsample == 0 && bowl.needKBr == 0) {

        bar.count++;
        console.log("研磨进度: " + bar.count + "/" + 3);

        animation['grind'].onPlayDone = function () {
            stepComplete(2, 0);
        }

        if (bar.count == bar.maxCount) {
            animation['grind'].onPlayDone = function () {
                replaceModel(bowl, "product", "agate_mortar");
                bowl.sample.children[0].material.color.setHex(0xffffff);
                bowl.sample.position.y -= 5;
                bowl.currVal -= 5;
                bowl.changeable = false;
                stepComplete(2, 1);
                missionComplete(mission_step);
            }
        }
    }

    animation['grind'].play();
}

// 压模中部放在底部上
function placeMiddleOnBottom() {

    stepComplete(3, 0);

    let middle = global.object.model['empty-stamper_middle'].modelObject;
    let bottom = global.object.model['stamper_bottom'].modelObject;

    middle.show(bottom.position.x, bottom.position.y, bottom.position.z);

    bottom.pickable = false;

    dropItem();

    action['product-spoon']['empty-stamper_middle'].do = function () {

        stepComplete(3, 1);

        dropReagent('product-spoon', 'empty-stamper_middle');
        bottom.pickable = false;
        global.object.model['product-stamper_middle'].modelObject.pickable = false;
        global.object.model['product-stamper_middle'].modelObject.trigger = function () {
            showErrorMsg('药品装入压模后，不可再拆解压模');
        }

        action['stamper_top']['product-stamper_middle'].do = function () {
            swal({
                title: '将压模部件组装成一个整体',
                text: "同步拾取，同步放置，且暂时无法拆分",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '是的，组装',
                cancelButtonText: '暂时不要'
            }).then(function (isConfirm) {
                if (isConfirm) {
                    placeTopOnMiddle();
                    closeMagnifier();

                    stepComplete(3, 1);
                    missionComplete(mission_step);
                }
            });
        };
    };

    middle.onHide = function () {
        action['product-spoon']['empty-stamper_middle'].do = null;
        bottom.pickable = true;
    }

    bottom.onHide = function () {
        closeMagnifier();
    }

    openMagnifier(new THREE.Vector3(
        middle.position.x,
        middle.position.y + 15,
        middle.position.z + 15
    ), new THREE.Vector3(
        middle.position.x,
        middle.position.y - 4,
        middle.position.z
    ));
}

// 压模顶部放在中部上
function placeTopOnMiddle() {
    let top = global.object.model['stamper_top'].modelObject;
    let middle = global.object.model['product-stamper_middle'].modelObject;
    let bottom = global.object.model['stamper_bottom'].modelObject;

    top.show(middle.position.x, middle.position.y, middle.position.z);

    dropItem();

    mergeModels([bottom, middle, top], 'stamper');
}

//从origin上将reagent放到target上
function dropReagent(origin, target) {

    let oModel = global.object.model[origin].modelObject;
    let tModel = global.object.model[target].modelObject;

    // 已满判定
    if (tModel.currVal == tModel.totalVal) {
        showErrorMsg(zn_CH[tModel.name] + "已满");
        return;
    };

    // 混合判定
    let strO = origin.split('-');
    let strT = target.split('-');
    let reagent = strO[0];
    if ((strO[0] == 'sample' && strT[0] == 'KBr') || (strT[0] == 'sample' && strO[0] == 'KBr')) {
        reagent = 'mixture';
    } else if (strT[0] == 'mixture') {
        reagent = 'mixture';
    }

    if (reagent == 'mixture') {
        let sample = global.object.model['mixture_on-' + strT[1]].modelObject;
        sample.children[0].material.color.setHex(0xdddddd);
    }

    // origin model
    oModel.currVal--;
    if (oModel.currVal == 0) {
        replaceModel(oModel, "empty", strO[1]);
    } else {
        replaceModel(oModel, reagent, strO[1]);
    }

    // target model
    tModel.currVal++;
    replaceModel(tModel, reagent, strT[1]);
    console.log(tModel.name + ": " + tModel.currVal + "/" + tModel.totalVal);


    // need sample:KBr = 1:5
    if (tModel['need' + strO[0]] != null) {
        tModel['need' + strO[0]]--;
        console.log("当前还需要加入 " + tModel['need' + strO[0]] + " 次 " + strO[0]);
        if (tModel.needKBr == 0 && tModel.needsample == 0) {
            stepComplete(1, 2);
            missionComplete(mission_step);
        }
    }

    // inventory
    let $div = $('#inventory').data('actived');
    setItemImage($div, "empty-" + strO[1]);
    $div.trigger('click');
}

//也是从origin上将reagent放到target上
function fetchReagent(origin, target) {

    let oModel = global.object.model[origin].modelObject;
    let tModel = global.object.model[target].modelObject;

    // 混合判定
    let strO = origin.split('-');
    let strT = target.split('-');
    let reagent = strO[0];


    // tModel: 目标模型
    tModel.currVal++;
    replaceModel(tModel, reagent, strT[1]);


    // oModel: 源模型
    oModel.currVal--;
    if (oModel.currVal == 0) {
        replaceModel(oModel, "empty", strO[1]);
    } else {
        replaceModel(oModel, reagent, strO[1]);
    }
    console.log(oModel.name + ": " + oModel.currVal + "/" + oModel.totalVal);


    // need sample:KBr = 1:5
    if (oModel['need' + strO[0]] != null) {
        oModel['need' + strO[0]]++;
        console.log("当前还需要加入 " + oModel['need' + strO[0]] + " 次 " + strO[0]);
    }


    // 物品栏变化
    let $div = $('#inventory').data('actived');
    setItemImage($div, reagent + "-" + strT[1]);
    $div.trigger('click');
}

// 用新的名字指向旧的model
function replaceModel(model, reagent, name) {

    highlight.forEach(function (each, index) {
        if (each == model.name) {
            highlight[index] = reagent + "-" + name;
        }
    })

    model.name = reagent + "-" + name;

    global.object.model[model.name] = {
        modelObject: model
    }

    let visible = model.visible;
    model.onHide();

    let sample = global.object.model[reagent + "_on-" + name];

    if (sample) {
        model.onShow = function () {
            let y;
            if (model.changeable == false) {
                y = this.position.y;
            } else {
                y = this.position.y + this.currVal - this.initVal;
            }
            sample.modelObject.show(this.position.x, y, this.position.z);
        }

        model.onHide = function () {
            sample.modelObject.hide();
        }

        model.sample = sample.modelObject;
    } else {
        model.onShow = function () {}
        model.onHide = function () {}

        model.sample = null;
    }

    visible ? model.reShow() : null;
}

//===============================================================================================

// 初始化物体属性
function initItems() {

    for (var item in property) {

        for (var attr in property[item]) {

            if (global.object.model[item]) {
                global.object.model[item].modelObject[attr] = property[item][attr];
            }
        }
    }

    // 可触发
    global.object.model['infrared_analyzer_cover'].modelObject.trigger = animation['cover_open'].play;
    // global.object.model['press_body'].modelObject.trigger = fetchStamperFromPress;
}

// 将整体还原成多个model
function divideModels(entirety) {
    entirety.unHighlight();

    let models = entirety.component;

    models.forEach(function (model) {
        model.entirety = null;
        model.onHighlight = function () {};
        model.onUnHighlight = function () {};
        model.pickable = true;
    });

    delete global.object.model[entirety.name];
    delete entirety;
}

// 将多个model组装成一个整体（同时拾取、同时放下）
function mergeModels(models, newName) {

    let entirety = {
        name: newName,
        component: models,
        pickable: true,

        onHide: function () {},
        onShow: function () {},

        hide: function () {
            this.component.forEach(function (each) {
                each.hide();
            });

            this.onHide();
        },

        show: function (x, y, z) {
            this.component.forEach(function (each) {
                each.show(x, y, z);
            });

            this.onShow();
        },

        highlight: function () {
            this.component.forEach(function (each) {
                if (!each.highlighted) {
                    each.highlight();
                }
            });
        },

        unHighlight: function () {
            this.component.forEach(function (each) {
                if (each.highlighted) {
                    each.unHighlight();
                }
            });
        },

        removeHighlight: function () {
            this.component.forEach(function (each) {
                removeHighlight(each.name);
            })
        },

        addHighlight: function () {
            this.component.forEach(function (each) {
                addHighlight(each.name);
            })
        }
    }

    global.object.model[entirety.name] = {
        modelObject: entirety
    }

    for (var attr in property[newName]) {

        global.object.model[newName].modelObject[attr] = property[newName][attr];

    }

    models.forEach(function (model) {
        model.entirety = entirety;

        model.onHighlight = function () {
            this.entirety.highlight();
        }

        model.onUnHighlight = function () {
            this.entirety.unHighlight();
        }

        model.pickable = false;
    });
}

// 拾取物品
function pickItem(item) {

    if (obtainItem(item.name)) {

        item.hide();

        sound['pickItem'].play();

    } else {
        // TODO: 信息提示
        showErrorMsg('物品栏已满');
    }
}

// 放置物品
function placeItem(event) {

    if (event.button == 2) return;

    let table = global.object.model['experiment_table'].modelObject;
    let ret = hoverObject(event, [table]);
    let itemName = $('#inventory').data('actived') ? $('#inventory').data('actived').data('name') : '';

    if (ret && itemName) {

        unableControls();
        canvas.onmouseup = function () {
            enableControls();
        }

        let allow = true;
        unable_place_area.forEach(function (pos) {
            if (ret.point.x > pos[0] && ret.point.x < pos[1]) {
                showErrorMsg('该处不允许放置物品');
                allow = false;
            }
        })

        if (!allow) return;

        let model = global.object.model[itemName].modelObject;

        if (model instanceof THREE.Group || model instanceof THREE.Scene) {
            model.show(ret.point.x, model.origin.y, ret.point.z);
        } else {
            model.show(ret.point.x, model.component[0].origin.y, ret.point.z);
        }

        sound['placeItem'].play();
        dropItem();

        if (guide[4] && guide[4].done == false) {
            guide[4].do(itemName);
        }
    }
}

// 允许放置物品
function enablePlaceItem() {

    let events = $._data($(canvas)[0], "events");
    if (events == null || events['mousedown'] == null) {
        $(canvas).bind('mousedown', placeItem);
    }
}

// 不允许放置物品
function unablePlaceItem() {
    $(canvas).unbind('mousedown');
}
