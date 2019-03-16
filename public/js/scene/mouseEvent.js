var HIGHLIGHT = null; // 当前经过的物体(高亮显示)

function bindMouseEvent() {
    canvas.onmousemove = function (event) {
        // 鼠标经过时，物体高亮显示
        highlightObject(event);

        // TODO: other mouse events
    }
}

function unbindMouseEvent() {
    canvas.onmousemove = null;
    canvas.onmousedown = null;
    canvas.onmouseup = null;

    $(canvas).unbind('mousemove');
}

function enableControls() {
    orbitControls.enablePan = true;
    orbitControls.enableRotate = true;
}

function unableControls() {
    if (HIGHLIGHT && HIGHLIGHT.menuEnable) {
        orbitControls.enablePan = false;
    }

    if (HIGHLIGHT && (HIGHLIGHT.pickable || HIGHLIGHT.trigger)) {
        orbitControls.enableRotate = false;
    } else {
        let item = $('#inventory').data('actived') ? $('#inventory').data('actived').data('name') : '';
        let model = HIGHLIGHT ? HIGHLIGHT.name : '';

        if (action[item] && action[item][model] && action[item][model].do) {
            orbitControls.enableRotate = false;
        }
    }

    if (HIGHLIGHT && HIGHLIGHT.entirety && HIGHLIGHT.entirety.pickable) {
        orbitControls.enableRotate = false;
    }
}

// all models need to highlight
var highlight = [
    "KBr-beaker",
    "agate_pestle",
    "computer",
    "empty-agate_mortar",
    "empty-spoon",
    "infrared_analyzer_body",
    "infrared_analyzer_cover",
    "infrared_analyzer_fix_frame",
    "press_body",
    "press_pointer",
    "press_screw_front",
    "press_screw_top",
    "sample-beaker",
    "stamper_bottom",
    "empty-stamper_middle",
    "stamper_top",
];

// 将模型移出高亮列表(暂不高亮)
function removeHighlight(name) {
    global.object.model[name].modelObject.unHighlight()
    highlight.remove(name);
}

// 将模型添入高亮列表
function addHighlight(name) {
    highlight.push(name);
}

//======================================================================================
// (物体高亮显示)

function highlightObject(event) {

    // 待检测的全部包围盒
    let coverBoxs = [];
    highlight.forEach(function (name) {
        let model = global.object.model[name].modelObject;
        if (model.coverBox) {
            coverBoxs.push(model.coverBox);
        }
    })
    let ret = hoverObject(event, coverBoxs);

    if (ret != null && ret.object instanceof THREE.Mesh) {
        let object = ret.object.trueObject;

        if (object != HIGHLIGHT) {

            // 改变指针样式
            changeMouseStyle("hand");

            if (HIGHLIGHT) {
                HIGHLIGHT.unHighlight();
                $(canvas).unbind('mousemove');
            }

            HIGHLIGHT = object;

            HIGHLIGHT.highlight();

            // 绑定鼠标事件
            canvas.onmousedown = mouseEvent;
            // canvas.onmouseup = function () {
            //     enableControls();
            // }

            hideTooltip();
            showTooltip(HIGHLIGHT, event);
        }

        unablePlaceItem();
        unableControls();

    } else {
        // 改变指针样式
        changeMouseStyle("arrow");

        if (HIGHLIGHT) HIGHLIGHT.unHighlight();

        HIGHLIGHT = null;

        // 解除鼠标事件
        canvas.onmousedown = null;

        enablePlaceItem();
        enableControls();
        $(canvas).unbind('mousemove');

        hideTooltip();
    }
}

function changeMouseStyle(style) {
    let url = "url('../../static/cursors/" + style + ".cur'), pointer";
    canvas.style.cursor = url;
}

//======================================================================================
// (鼠标点击事件)

function mouseEvent(event) {

    // 左键点击
    if (event.button == 0) {

        let item = $('#inventory').data('actived') ? $('#inventory').data('actived').data('name') : '';
        let model = HIGHLIGHT ? HIGHLIGHT.name : '';

        if (action[item] && action[item][model] && action[item][model].do) {

            // 先判断物品栏与场景模型是否有交互
            action[item][model].do(event);

        } else if (HIGHLIGHT && HIGHLIGHT.pickable) {

            // 再判断场景模型是否可拾取
            pickItem(HIGHLIGHT);

        } else if (HIGHLIGHT && HIGHLIGHT.trigger) {
            
            // 再判断场景模型是否可触发
            HIGHLIGHT.trigger(event);

            sound['mouseClick'].play();

        } else if (HIGHLIGHT.entirety && HIGHLIGHT.entirety.pickable) {
            
            pickItem(HIGHLIGHT.entirety);

        } else {
            // sound['mouseClick'].play();
        }
    }

    // TODO: 右键点击
    if (event.button == 2) {

        showItemMenu(event, HIGHLIGHT);
    }

    $(canvas).trigger('mousemove');
}

//======================================================================================
// (菜单事件)

function showItemMenu(event, item = HIGHLIGHT) {

    if (!item.menuEnable) return;

    if ($('#' + item.name + '_menu').length > 0) {
        $('#' + item.name + '_menu').contextMenu({
            x: event.clientX,
            y: event.clientY
        });
    }
}

//======================================================================================
// (暂时废弃部分)

// 用于得到复杂对象的材质的颜色值
function getMaterialHex(material) {
    if (material.length != null && material.length > 0) {
        var hexs = [];
        material.forEach(function (element) {
            hexs.push(element.color.getHex());
        });
        return hexs;
    } else {
        return material.color.getHex();
    }
}

// 用于设置复杂对象的材质的颜色值
function setMaterialHex(material, hex) {
    if (material.length != null && material.length > 0) {
        for (var i in material) {
            if (hex.length != null && hex.length > 0) {
                material[i].color.setHex(hex[i]);
            } else {
                material[i].color.setHex(hex);
            }
        }
    } else {
        return material.color.setHex(hex);
    }
}

//======================================================================================