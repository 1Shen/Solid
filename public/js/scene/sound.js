/**
 * 游戏音效表
 * sound['音效名'].play() 可以播放对应音效
 * e.g.: sound['pickItem'].play() 可以播放拾取物品的音效
 */
const sound = {

    pickItem: {
        name: "PickItem_01.wav",
    },

    mouseClick: {
        name: "Click_02.mp3",
    },

    placeItem: {
        name: "PlaceItem_01.mp3",
    },

    clock: {
        name: "Clock_01.mp3",
    },

    error: {
        name: "Error_01.mp3",
    },

    missionComplete: {
        name: "MissionComplete_01.mp3",
    },

    missionReceive: {
        name: "MissionReceive_01.mp3",
    },

    bookPage: {
        name: "BookPage_02.mp3",
    },

    button_01: {
        name: "Button_02.mp3",
    },

    selectItem: {
        name: "SelectItem_01.mp3"
    },

    grind: {
        name: "Grind.mp3"
    }

    // TODO: other game sounds
}

$(function () {

    // 拾取物品音
    loadGameSound('pickItem');

    // 放置物品音
    loadGameSound('placeItem');

    // 鼠标点击音
    loadGameSound('mouseClick');

    // 计时声
    loadGameSound('clock');

    // 错误提示音
    loadGameSound('error');

    // 任务完成音
    loadGameSound('missionComplete');

    // 接到任务音
    loadGameSound('missionReceive');

    // 书籍翻页音
    loadGameSound('bookPage');

    // 主菜单按钮音
    loadGameSound('button_01');

    // 选中物品音
    loadGameSound('selectItem');

    // 研磨音
    loadGameSound('grind');

    // TODO: other game sounds to be loaded here
})

// 加载游戏音效
function loadGameSound(soundName, callback = null) {

    document.getElementById('loadStatusListener').value--;

    let audioEle = $("<audio preload='auto'></audio>");

    let soundPath = "../../static/sounds/" + sound[soundName].name;

    audioEle.attr('src', soundPath);

    $('body').append(audioEle);

    audioEle.on('canplaythrough', function () {
        let _this = this;

        sound[soundName].play = function () {
            _this.play();
        }

        updateLoadStatus();
    })
}