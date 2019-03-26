/**
 * initMenu.js
 * 初始化右键场景物体时的弹出菜单
 */
$(function () {

    // 压模顶部
    $.contextMenu({
        selector: '#stamper_top_menu',
        animation: {
            duration: 200
        },
        callback: function (key) {
            if (key == 'divide') {
                let stamper = global.object.model['stamper'].modelObject;
                divideModels(stamper);
            }
        },
        items: {
            name: {
                name: "压模顶部"
            },

            seperator: "-",

            divide: {
                name: "拆分"
            }
        },
        events: {
            show: function (opt) {
                unbindMouseEvent();
            },
            hide: function (opt) {
                bindMouseEvent();
            }
        }
    });

    // 压力机压力旋钮
    $.contextMenu({
        selector: '#press_screw_front_menu',
        animation: {
            duration: 200
        },
        callback: function (key) {
            if (animation[key] && animation[key].play) {
                animation[key].play();
            }
            sound['mouseClick'].play();
        },
        items: {
            name: {
                name: "压力旋钮"
            },

            seperator: "-",

            press: {
                name: "加压"
            },

            depress: {
                name: "减压"
            }
        },
        events: {
            show: function (opt) {
                unbindMouseEvent();
            },
            hide: function (opt) {
                bindMouseEvent();
            }
        }
    });

    // 压力机固定旋钮
    $.contextMenu({
        selector: '#press_screw_top_menu',
        animation: {
            duration: 200
        },
        callback: function (key) {

            if (animation[key] && animation[key].play) {
                animation[key].play();
            }
            sound['mouseClick'].play();
        },
        items: {
            name: {
                name: "固定旋钮"
            },

            seperator: "-",

            tighten: {
                name: "拧紧"
            },

            loosen: {
                name: "松开"
            }
        },
        events: {
            show: function (opt) {
                unbindMouseEvent();
            },
            hide: function (opt) {
                bindMouseEvent();
            }
        }
    });

    // 压模整体
    $.contextMenu({
        selector: '#stamper_menu',
        animation: {
            duration: 200
        },
        callback: function (key) {
            if (key == '拆分') {
                let stamper = global.object.model['stamper'].modelObject;
                divideModels(stamper);
            }
        },
        items: {
            name: {
                name: "压模"
            },

            seperator: "-",

            divide: {
                name: "拆分"
            }
        },
        events: {
            show: function (opt) {
                unbindMouseEvent();
            },
            hide: function (opt) {
                bindMouseEvent();
            }
        }
    });

    // 玛瑙研钵
    $.contextMenu({
        selector: '#agate_mortar_menu',
        animation: {
            duration: 200
        },
        callback: function (key) {
            if (key == 'clear') {
                let bowl = global.object.model['empty-agate_mortar'].modelObject;
                replaceModel(bowl, "empty", "agate_mortar");
                bowl.currVal = 0;
                bowl['needKBr'] = 4;
                bowl['needsample'] = 1;
                bowl.changeable = true;
            }
        },
        items: {
            name: {
                name: "玛瑙研钵"
            },

            seperator: "-",

            clear: {
                name: "清空"
            }
        },
        events: {
            show: function (opt) {
                unbindMouseEvent();
            },
            hide: function (opt) {
                bindMouseEvent();
            }
        }
    });
})
