/**
 * result.js
 * 红外光谱显示
 * 计分逻辑
 * 得分面板
 */

$(function () {

    // 光谱
    $("#map-bg .img-box").mousemove(function (e) {

        let mouseX = e.pageX - $("#map-bg .img-box").offset().left;

        $('#scanLine').css('margin-left', mouseX - 0.75 + 'px');
    });

    $("#map-bg .img-box").hover(function () {
        // over
        $('#scanLine').show();
    }, function () {
        // out
        $('#scanLine').hide();
    });

    $('.pageTurnBtn').hover(function () {
        // over
        $('#scanLine').hide();
    }, function () {
        // out
        $('#scanLine').show();
    });

    $('.highlight').click(function () {

        $('.highlight').removeClass('active');
        $(this).addClass('active');

        let fileName = $(this).attr('data-img');
        let src = "/static/images/bg/new/" + fileName + ".png";
        $("#map-bg").find('.bg').attr('src', src);

        $("#map-bg .introduce").hide();

        $("#map-bg .introduce").load('/html/scene/resText/' + fileName + '.html', function () {
            let gifPath = "/static/images/molecule/" + fileName + ".gif";
            $("#map-bg .gif").css('top', $("#map-bg .introduce .text").attr('data-img-top'));
            $("#map-bg .gif").css('left', $("#map-bg .introduce .text").attr('data-img-left'));
            $("#map-bg .gif img").attr('src', gifPath);

            $("#map-bg .introduce").css('top', $("#map-bg .introduce .text").attr('data-top'));
            $("#map-bg .introduce").css('left', $("#map-bg .introduce .text").attr('data-left'));

            $("#map-bg .gif img").hide().fadeIn(600);
            $("#map-bg .introduce").fadeIn(400);
        });

        if ($(this).next().next().length == 0) {
            $('.pageTurnBtn .pageRight').text('查看分数');
            $('.pageTurnBtn .pageRight')[0].onmousedown = function () {
                $('#map-bg').addClass('narrow').removeClass('largen');
                setTimeout(() => {
                    displayResult();
                }, 1000);
                $('#scorePanel').fadeIn(1500);
            }
        } else {
            $('.pageTurnBtn .pageRight').text('下一个');
            $('.pageTurnBtn .pageRight')[0].onmousedown = null;
        }
    });

    $('.pageTurnBtn .pageLeft').click(function () {
        if ($('.fill-box .active').length > 0) {
            var $temp = $('.fill-box .active').prev();
            while ($temp.length > 0 && !$temp.hasClass('highlight')) {
                $temp = $temp.prev();
            }
            $temp.trigger('click');
        }
    });

    $('.pageTurnBtn .pageRight').click(function () {
        if ($('.fill-box .active').length > 0) {
            var $temp = $('.fill-box .active').next();
            while ($temp.length > 0 && !$temp.hasClass('highlight')) {
                $temp = $temp.next();
            }
            $temp.trigger('click');
        } else {
            $('.highlight').first().trigger('click');
        }
    });
});


// 总扣分
var minusScore = 0;

/**
 * 游戏评级表
 * level[seconds]的值表示: 游戏总时长小于seconds秒时的评级
 * 玩家最终得分 = 100 * 评级 - 总扣分 
 */
var level = {
    "180": 1,
    "220": 0.9,
    "260": 0.8,
    "300": 0.7
}

// 错误列表
var errorList = {
    // 类型:{文本，分数}

    "尚未按正确比例混合样品与溴化钾": {
        text: "未按正确比例混合样品与溴化钾即开始研磨",
        score: 2,
        done: 0
    },
    "压力值过大": {
        text: "制作装片时加压过大会损坏压模",
        score: 5,
        done: 0
    },
    "压力机正处于施压状态": {
        text: "压力机处于施压状态时不能取出压模",
        score: 2,
        done: 0
    },
    "固体粉末尚未充分研磨": {
        text: "固体粉末尚未充分研磨",
        score: 3,
        done: 0
    },
    "请先固定压模": {
        text: "未固定压模不能施压",
        score: 3,
        done: 0
    }
}

// 计算游戏评级
function scoreLevel() {

    let totalTimes = global.system.seconds;

    for (var seconds in level) {
        if (totalTimes < parseInt(seconds)) {
            return level[seconds];
        }
    }

    return 0.6;
}

var fadeInTime = 1100;
var fadeInWaitTime = 600;
// TODO: 游戏结算（结果展示）
function displayResult() {

    // $('#scorePanel .errorList').nextAll().hide();
    // $('.pricingTable a').hide();
    $('#scorePanel .score .text').hide();
    $('#scorePanel .rank .text').hide();

    // 最终得分
    let finalScore = global.system.score * scoreLevel() - minusScore;

    // 总时间文本（时:分:秒）
    let totalTimeText = $('#runner').text();

    // 等级
    let rank = "";

    if (finalScore >= 95) {
        rank = "A+";
    } else if (finalScore >= 90) {
        rank = "A-";
    } else if (finalScore >= 85) {
        rank = "B+";
    } else if (finalScore >= 80) {
        rank = "B-";
    } else if (finalScore >= 75) {
        rank = "C+";
    } else if (finalScore >= 70) {
        rank = "C-";
    } else if (finalScore >= 65) {
        rank = "D+";
    } else if (finalScore >= 60) {
        rank = "D-";
    } else {
        rank = "E ";
    }

    // TODO: 结果展示
    // 时间
    $('#scorePanel .time .text').text(totalTimeText);

    // 错误
    let count = 0;
    for (var name in errorList) {
        if (errorList[name].done) {
            let error = $('<div class="error disable"></div>');
            count++;
            error.append('<div class="text"></div>')
            error.find('.text').text(errorList[name].text);
            $('#scorePanel .errorList').append(error);
            $('#scorePanel .errorList .error').hide();
        }
    }

    $('#scorePanel .count .text').text(count);


    $('#scorePanel .time').fadeIn(fadeInTime);
    setTimeout(() => {
        $('#scorePanel .count').fadeIn(fadeInTime);
        setTimeout(() => {
            showRecord($('.error').first());
        }, fadeInWaitTime);
    }, fadeInWaitTime);

    // 分数及评级
    $('#scorePanel .score .text').text(finalScore);
    $('#scorePanel .rank .text').text(rank[0]).append("<sup>" + rank[1] + "</sup>");

    // 上传成绩
    $('#scorePanel button').trigger('click');
}

// 计时器
$(function () {
    $('#runner').runner({
        oldSeconds: 0,
        milliseconds: false,
        format: function millisecondsToString(milliseconds) {
            var oneHour = 3600000;
            var oneMinute = 60000;
            var oneSecond = 1000;
            var seconds = 0;
            var minutes = 0;
            var hours = 0;
            var result;

            if (milliseconds >= oneHour) {
                hours = Math.floor(milliseconds / oneHour);
            }

            milliseconds = hours > 0 ? (milliseconds - hours * oneHour) : milliseconds;

            if (milliseconds >= oneMinute) {
                minutes = Math.floor(milliseconds / oneMinute);
            }

            milliseconds = minutes > 0 ? (milliseconds - minutes * oneMinute) : milliseconds;

            if (milliseconds >= oneSecond) {
                seconds = Math.floor(milliseconds / oneSecond);
                if (seconds != this.oldSeconds) {
                    global.system.seconds++;
                    // sound['clock'].play();
                }
                this.oldSeconds = seconds;
            }

            milliseconds = seconds > 0 ? (milliseconds - seconds * oneSecond) : milliseconds;

            if (hours > 0) {
                result = (hours > 9 ? hours : "0" + hours) + ":";
            } else {
                result = "00:";
            }

            if (minutes > 0) {
                result += (minutes > 9 ? minutes : "0" + minutes) + ":";
            } else {
                result += "00:";
            }

            if (seconds > 0) {
                result += (seconds > 9 ? seconds : "0" + seconds);
            } else {
                result += "00";
            }

            return result;
        }
    });
});

// 错误记录
function recordError(name) {
    let text = errorList[name].text;
    minusScore += errorList[name].score;
    errorList[name].done = 1;
}

// 显示记录
function showRecord(div) {
    if (div.hasClass('error')) {
        div.fadeIn(fadeInTime);
        div = div.next();
        setTimeout(function () {
            showRecord(div);
        }, fadeInWaitTime);
    } else {
        $('#scorePanel .score .text').fadeIn(fadeInTime);
        setTimeout(() => {
            $('#scorePanel .rank .text').fadeIn(fadeInTime);
            setTimeout(() => {
                $('#scorePanel .return-btn').fadeIn(fadeInTime);
            }, fadeInWaitTime);
        }, fadeInWaitTime);
        // $('#scorePanel .rank .text').removeClass('big').addClass('small');
    }
}
