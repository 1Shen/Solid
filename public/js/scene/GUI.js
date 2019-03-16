// GUI.js
// TODO: 游戏的界面逻辑，主菜单，任务栏(也许)，提示按钮
// 各种错误提示以及最终得分展示
var menu_shown = null;
var ins_shown = false;
var space_enable = true;

// 任务物品
const missonItem = {

    'sample-spoon': {
        done: false,
        onComplete: function () {
            if (missionComplete(mission_step) != false) {
                this.done = true;
            }
        }
    },

    'tablet-stamper_middle': {
        done: false,
        onComplete: function () {
            stepComplete(4, 3);
            missionComplete(mission_step);
            this.done = true;
        }
    },

    'failure-stamper_middle': {
        done: false,
        onComplete: function () {
            swal({
                title: '样品装片制作失败',
                text: "清空压模中部的粉末以重新制作装片",
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '确定'
            }).then(function (isConfirm) {
                if (isConfirm) {
                    let middle = global.object.model['failure-stamper_middle'].modelObject;
                    replaceModel(middle, 'empty', 'stamper_middle');
                    middle.currVal = 0;
                    middle.failed = false;
                    let $div = $('.item[data-name="failure-stamper_middle"]');
                    setItemImage($div, "empty-stamper_middle");
                    $div.trigger('click');
                }
            })

            this.done = true;
        }
    }
}

$(function () {

    initTip();

    // 加载操作说明文本
    loadInsText();

    // 物品栏数组
    var items = [];
    $('.item').each(function () {
        items.push($(this));
    });

    // 格子样式
    $('.item').hover(function () {
        $(this).parent().css('background', '#ffe000');
    }, function () {
        if (!$(this).hasClass('active')) {
            $(this).parent().css('background', '');
        }
    });


    // main menu
    $('#btnStart').click(function () {
        hideMainMenu();
        menu_shown = false;
        sound['mouseClick'] ? sound['mouseClick'].play() : null;
    });

    $('#btnIns').click(function () {
        $('#textIns').fadeIn(400);
        $('#mainMenu').hide();
        ins_shown = true;
        sound['mouseClick'] ? sound['mouseClick'].play() : null;
    });

    // 提示按钮
    $('#btnTip').click(function () {
        pause();
        $('#textTip').fadeIn(400);
    });

    // 关闭提示
    $('#btnReturnTip').click(function () {
        unPause();
        $(this).parent().fadeOut(400);
    });


    // 关闭操作说明
    $('#btnReturnIns').click(function () {
        $(this).parent().fadeOut(400);
        $('#mainMenu').fadeIn('fast');
        ins_shown = false;
    });

    // 暂停
    $('#btnPause').click(btnPauseClick);

    // 提示按钮特效
    $('#btnTip').mouseover(function () {
        $('#btnTip').addClass('button-glow');
        $('#btnTip').css('color', '#FFB90F');
        $('#btnTip').css('font-size', '280%');
    });
    $('#btnTip').mouseout(function () {
        $('#btnTip').removeClass("button-glow");
        $('#btnTip').css('color', 'rgb(150, 148, 148)');
        $('#btnTip').css('font-size', '225%');
    });
    // 暂停按钮特效
    $('#btnPause').mouseover(function () {
        $(this).addClass('button-glow');
    })
    $('#btnPause').mouseout(function () {
        $(this).removeClass('button-glow');
    })
    // 放大镜
    $('#btnSearch').mouseover(function () {
        $(this).addClass('button-glow');
    })
    $('#btnSearch').mouseout(function () {
        $(this).removeClass('button-glow');
    })

    // 初始化属性, name为空说明该格子没有物品
    $('.item').each(function () {
        $(this).data('name', "");
    });

    // 格子点击事件
    $('.item').click(function () {

        let _this = $(this);

        $('.item').each(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).parent().css('background', '');
            }
        });

        _this.addClass('active');
        _this.parent().css('background', '#ffe000');

        $('#inventory').data('activeDiv', _this);

        if (_this.data('name')) {

            sound['mouseClick'].play();

            // 设置物品栏属性actived，指向当前被选中的格子(div[class='item'])
            $('#inventory').data('actived', _this);

            // 如果当前点击的格子name非空，即格子上有物品，则允许放置
            if (!HIGHLIGHT) enablePlaceItem();

            // TODO: 物品栏上方显示当前选中物品的名字（渐入渐出？）
            $('#inventory').find('.text').text(zn_CH[_this.data('name')]);

            if (guide[guide_step] && guide[guide_step].done == false) {
                guide[guide_step].do(_this.data('name'));
            }

        } else {

            $('#inventory').data('actived', null);
            $('#inventory').find('.text').text("");

            unablePlaceItem();
        }
    });

    $('.item').first().trigger('click');

    // 键盘事件
    $(window).keydown(function (e) {
        let key = String.fromCharCode(e.keyCode);

        switch (key) {
            case String.fromCharCode(27):
            case ' ':
                if (!space_enable) break;
                if (!global.system.pause && !menu_shown) {
                    $('#btnPause').trigger('click');
                } else if (menu_shown && !ins_shown) {
                    $('#btnStart').trigger('click');
                }
                break;

            case '1':
            case 'a':
                items[0].trigger('click');
                break;

            case '2':
            case 'b':
                items[1].trigger('click');
                break;

            case '3':
            case 'c':
                items[2].trigger('click');
                break;

            case '4':
            case 'd':
                items[3].trigger('click');
                break;

            case '5':
            case 'e':
                items[4].trigger('click');
                break;

            case '6':
            case 'f':
                items[5].trigger('click');
                break;

            default:
                break;
        }
    });

    //选项卡点击事件
    $('.title').click(function () {

        $('.ins-body').scrollTop(0);

        var _this = $(this);

        $('.title').each(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                let textId = $(this).attr('data-text');
                $('#' + textId).removeClass('content');
                return false;
            }
        });

        _this.addClass('active');
        let textId = _this.attr('data-text');
        $('#' + textId).addClass('content');

        sound['bookPage'].play ? sound['bookPage'].play() : null;
    });

    //选项卡悬停
    $('.title').hover(function () {
        $(this).tooltip('show');
    });
});

// 获得物品
function obtainItem(itemName) {

    let full = true;

    $('.item').each(function () {

        if ($(this).data('name') == "") {

            // 设置div的图片
            setItemImage($(this), itemName);

            // 调整选中的格子
            $('.item').each(function () {
                if ($(this).data('name') == '') {
                    $(this).trigger('click');
                    return false;
                }
            });

            if ($(this).hasClass('active')) {
                $(this).trigger('click');
            }

            // 物品栏未满标记
            full = false;
            return false;
        }
    })

    return !full;
}

// 丢弃当前选中物品
function dropItem() {

    if ($('#inventory').data('actived') == null) return;

    $('.item').each(function () {
        if ($(this).hasClass('active')) {
            $(this).data('name', "");
            $(this).children().first().attr('src', "");
            $('#inventory').data('actived', null);
            $('#inventory').find('.text').text("");

            unablePlaceItem();
        }
    })
}

// 设置div的图片
function setItemImage($div, itemName, showMsg = true) {
    let imgPath = "../../static/images/item/" + itemName + ".png";
    $div.children().first().attr('src', imgPath);
    $div.data('name', itemName);
    $div.attr('data-name', itemName);
    showMsg ? showItemMsg(itemName) : null;

    // 判断任务进度
    if ((missonItem[itemName]) && (!missonItem[itemName].done)) {
        missonItem[itemName].onComplete();
    }

    // 判断游戏引导进度
    if (guide[guide_step] && guide[guide_step].done == false) {
        guide[guide_step].do(itemName);
    }
}

// 激活对应物品的格子
function activeItem(itemName) {
    $('.item').each(function () {
        if ($(this).data('name') == itemName) {
            $(this).trigger('click');
            return false;
        }
    });
}


// 显示主菜单
function showMainMenu() {
    pause();
    if (menu_shown != null) {
        space_enable = false;
        $('#btnPause').unbind('click');
        $('#mainMenu').show().animate({
            opacity: '1',
            top: '+=50px'
        }, 400, function () {
            space_enable = true;
            $('#btnPause').bind('click', btnPauseClick);
        });

    } else {
        $('#mainMenu').fadeIn('slow');
    }
}
// 隐藏主菜单
function hideMainMenu() {
    unPause();
    if (menu_shown == null) {
        $('#title').hide();
        space_enable = false;
        $('#btnPause').unbind('click');
        $('#mainMenu').animate({
            opacity: '0',
            top: '-=110px'
        }, 400, function () {
            $('#mainMenu').hide();
            space_enable = true;
            $('#btnPause').bind('click', btnPauseClick);

            // game start
            animation['3D_arrow'].play(-100, -30, 0);
            showMessage("点击拿起实验台上的【药匙】", toast_time);
        });

        // 初始化物品栏位置
        let w = window.innerHeight - $('body')[0].offsetHeight;
        $('#inventory').css('bottom', w + 18 + "px");
    } else {
        space_enable = false;
        $('#btnPause').unbind('click');
        $('#mainMenu').animate({
            opacity: '0',
            top: '-=50px'
        }, 400, function () {
            $('#mainMenu').hide();
            space_enable = true;
            $('#btnPause').bind('click', btnPauseClick);
        });
    }
}

// 暂停游戏
function pause() {
    $('#btnTip').hide();
    $('#btnPause').hide();
    $('#inventory').hide();
    $('.spop-container').hide();
    $('#runner').hide();
    $('#btnSearch').hide();
    $('#canvas').css('filter', "blur(2px)");

    $('#runner').runner('stop');

    hideTooltip();

    global.system.pause = true;
    orbitControls.enabled = false;
    unbindMouseEvent();

    if (menu_shown == null) {
        $('#title').show();
    }
}
// 继续游戏
function unPause() {
    $('#canvas').css('filter', "blur(0px)");
    $('#btnTip').show();
    $('#btnPause').show();
    $('#inventory').show();
    $('.spop-container').show();
    $('#runner').show();
    $('#btnSearch').show();

    $('#runner').runner('start');

    global.system.pause = false;
    orbitControls.enabled = true;
    bindMouseEvent();
}

//显示错误提示
function showErrorMsg(template) {
    spop({
        template: "错误：" + template,
        style: 'error',
        autoclose: 4000,
        group: 'Error'
    });

    sound['error'].play();
}

//显示物品提示
//TODO: currVal等的判断     --省去
function showItemMsg(itemName) {
    var count;
    if (itemName == "sample-spoon") {
        count = "1毫克";
    } else if (itemName == "KBr-spoon") {
        count = "25毫克";
    } else {
        count = "";
    }
    var name = zn_CH[itemName].replace("装有", "装有" + count);
    spop({
        template: "获取：" + "[" + name + "]",
        style: 'info',
        autoclose: 1500
    });
}

//显示任务提示
function showMissonMsg(template) {
    spop({
        template: "目标：" + template,
        style: 'warning',
        autoclose: false,
        group: 'Misson',
        onClose: false
    });

    sound['missionReceive'].play();

    $('#btnTip').trigger('mouseover');
    setTimeout(function () {
        $('#btnTip').trigger('mouseout');
    }, 2000);
}
//显示任务完成提示
//TODO: 任务表来自动检索下一个应该显示的任务提示
function showCompleteMsg(template, onClose) {
    spop({
        template: "完成：" + template,
        style: 'success',
        autoclose: 3500,
        group: 'Misson',
        onClose: onClose
    });
    sound['missionComplete'].play();
}

function loadInsText() {

    var loadedTextNum = 0;
    var totalTextNum = 7;

    var callback = function () {

        loadedTextNum++;
        if (loadedTextNum == totalTextNum) {

            $('#textIns .title').first().trigger('click');

            // 操作说明智能滚动条
            $('.ins-body').scroll(function () {

                // let $this = $(this);

                $(this).css('margin-right', '10px');

                // var nDivHight = $(this)[0].clientHeight;
                // var nScrollHight = $(this)[0].scrollHeight;
                // var nScrollTop = $(this)[0].scrollTop;

                // let parentId = $(this).parent().attr('id');
                // let tabDiv = $('#textIns .title[data-text="' + parentId + '"]');

                // // 向下滚
                // if (nScrollTop + nDivHight >= nScrollHight - 1) {

                //     $this.on($.getmouseEventType(), function (event) {
                //         var oEvent = $.mousewheelEvent(event);
                //         if (oEvent.delta < 0) {
                //             $this.scrollTop(0);
                //             if (parentId == 'text7') {
                //                 $('#textIns .title').first().trigger('click');
                //             } else {
                //                 tabDiv.next().trigger('click');
                //             }
                //             $this.unbind($.getmouseEventType());
                //         }
                //     })
                // } else {
                //     $this.unbind($.getmouseEventType());
                // }
            });

            $('.ins-body').scrollEnd(function () {
                $('.ins-body').css('margin-right', '-60px');
            });
        }
    }

    $('#text1').load('../../html/scene/insText/text1.html', callback);
    $('#text2').load('../../html/scene/insText/text2.html', callback);
    $('#text3').load('../../html/scene/insText/text3.html', callback);
    $('#text4').load('../../html/scene/insText/text4.html', callback);
    $('#text5').load('../../html/scene/insText/text5.html', callback);
    $('#text6').load('../../html/scene/insText/text6.html', callback);
    $('#text7').load('../../html/scene/insText/text7.html', callback);
}

function btnPauseClick() {
    $('#btnStart').text("继续实验");
    showMainMenu();
    menu_shown = true;
}

//===============================================================================================
// (tooltip)

function showTooltip(item, event) {

    hideTooltip();

    let events = $._data($(canvas)[0], "events");
    if (events == null || events['mousemove'] == null) {
        $(canvas).bind('mousemove', function (e) {
            showTooltip(item, e);
        });
    }

    var _item = item;

    if (_item.entirety) _item = _item.entirety;

    if (!_item.tooltipTitle) return;

    let divEle = $('<div class="tooltipMsg"></div>');
    let titleDiv = $('<div class="title">' + _item.tooltipTitle + '</div>');
    let contentDiv = $('<div class="content">' + _item.tooltipContent + '</div>');
    divEle.append(titleDiv);
    divEle.append(contentDiv);

    $('body').append(divEle);

    divEle.css('position', 'absolute');
    divEle.css('right', getPointerX(event) - divEle.width() / 2 + "px");
    divEle.css('bottom', getPointerY(event) + 55 + "px");
    divEle.show();
}

function hideTooltip() {
    $('.tooltipMsg').remove();
}