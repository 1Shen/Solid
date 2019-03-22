/**
 * quiz.js
 * 红外分析题目
 * TODO：
 * 提交按钮逻辑
 * 1.答案检测
 * 2.题目切换
 */

$(function () {
    // 提交按钮
    $('.q-button .layui-btn').click(function () {
        switchQuiz();
    });
});

var count = 0;
// 题目切换
function switchQuiz() {
    // 图片
    let path = "/static/images/quiz/bg";
    $('.bg').attr('src', path);
    // 标题
    $('.quiz-box .title').text();
    // 选项，文本及图片
    let option = $('<div class="content"></div>');
    let formRadio = $('.quiz-box').find('.layui-form-radio').first();
    for (var i = 0; i < 4; i++) {
        if (sth.text = "") {
            option.text('<img src=""></img>');
            option.children().attr('src', sth.img);
        } else {
            option.text(sth.text);
        }
        formRadio.append('<br>');
        formRadio.children().first().next().after(option);
        formRadio = formRadio.next();
    }
    // 题目解释
    $('.quiz-box .explaination').text();
    count++;
}
