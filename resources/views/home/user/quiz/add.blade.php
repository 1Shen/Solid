<div id="addQuiz">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
        <legend>题目</legend>
    </fieldset>
    <form class="layui-form layui-form-pane form-inline">
        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">请输入题目的内容</label>
            <div class="layui-input-block">
                <textarea placeholder="" class="layui-textarea title"></textarea>
            </div>
        </div>
    </form>

    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
        <legend>选项</legend>
    </fieldset>
    <blockquote class="layui-elem-quote layui-text" style="margin-bottom:20px">
        附加图片为可选项，若选择，则图片将与选项内容一同显示
    </blockquote>
    <form class="layui-form layui-form-pane" action="">
        <div class="layui-form-item">
            <label class="layui-form-label">选项A</label>
            <div class="layui-input-inline">
                <input type="text" name="username" lay-verify="required" placeholder="选项内容" autocomplete="off" class="layui-input optionA">
            </div>
            <div class="layui-input-inline">
                <div class="layui-upload margin-left-sm">
                    <button type="button" class="layui-btn layui-btn-normal" id="optionA">附加图片</button>
                </div>
            </div>
            <label class="layui-form-label">选项B</label>
            <div class="layui-input-inline">
                <input type="text" name="username" lay-verify="required" placeholder="选项内容" autocomplete="off" class="layui-input optionB">
            </div>
            <div class="layui-input-inline">
                <div class="layui-upload margin-left-sm">
                    <button type="button" class="layui-btn layui-btn-normal" id="optionB">附加图片</button>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">选项C</label>
            <div class="layui-input-inline">
                <input type="text" name="username" lay-verify="required" placeholder="选项内容" autocomplete="off" class="layui-input optionC">
            </div>
            <div class="layui-input-inline">
                <div class="layui-upload margin-left-sm">
                    <button type="button" class="layui-btn layui-btn-normal" id="optionC">附加图片</button>
                </div>
            </div>
            <label class="layui-form-label">选项D</label>
            <div class="layui-input-inline">
                <input type="text" name="username" lay-verify="required" placeholder="选项内容" autocomplete="off" class="layui-input optionD">
            </div>
            <div class="layui-input-inline">
                <div class="layui-upload margin-left-sm">
                    <button type="button" class="layui-btn layui-btn-normal" id="optionD">附加图片</button>
                </div>
            </div>
        </div>
    </form>

    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
        <legend>答案与解析</legend>
    </fieldset>
    <form class="layui-form layui-form-pane form-inline" action="">
        <div class="layui-form-item">
            <label class="layui-form-label">正确答案</label>
            <div class="layui-input-block">
                <input type="text" name="username" lay-verify="required" placeholder="选项" autocomplete="off" class="layui-input answer">
            </div>
        </div>
        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">答案解析</label>
            <div class="layui-input-block">
                <textarea placeholder="" class="layui-textarea analysis"></textarea>
            </div>
        </div>
    </form>

    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
        <legend>上传</legend>
    </fieldset>
    <blockquote class="layui-elem-quote layui-text" style="margin-bottom:20px">
        背景图片为可选项，若选择，则图片将显示在习题页的左侧区域，供学生参考
    </blockquote>
    <form class="layui-form layui-form-pane" action="">
        <div class="layui-form-item">
            <button type="button" class="layui-btn layui-btn-normal" id="bgImg">选择背景</button>
            <a class="layui-btn margin-left-1x" onClick="uploadQuiz()">上传题目</a>
        </div>
    </form>
</div>
<script>
    layui.use('upload', function() {
        var $ = layui.jquery,
            upload = layui.upload;
        //选完文件后不自动上传
        upload.render({
            elem: '#optionA',
            auto: false
        });
        upload.render({
            elem: '#optionB',
            auto: false
        });
        upload.render({
            elem: '#optionC',
            auto: false
        });
        upload.render({
            elem: '#optionD',
            auto: false
        });
        upload.render({
            elem: '#bgImg',
            auto: false
        });
    });

    // 上传题目
    function uploadQuiz() {
        var form = new FormData();
        var $div = $('#addQuiz');
        form.append('title', $div.find('textarea.title').val());
        form.append('pic', $div.find('#bgImg').next()[0].files[0]);
        form.append('atext', $div.find('input.optionA').val());
        form.append('aimg', $div.find('#optionA').next()[0].files[0]);
        form.append('btext', $div.find('input.optionB').val());
        form.append('bimg', $div.find('#optionB').next()[0].files[0]);
        form.append('ctext', $div.find('input.optionC').val());
        form.append('cimg', $div.find('#optionC').next()[0].files[0]);
        form.append('dtext', $div.find('input.optionD').val());
        form.append('dimg', $div.find('#optionD').next()[0].files[0]);
        form.append('answer', $div.find('input.answer').val());
        form.append('analysis', $div.find('textarea.analysis').val());
        $.ajax({
            url: "{{ url('quiz/add') }}",
            type: 'POST',
            cache: false,
            data: form,
            processData: false,
            contentType: false,
            success: function(res) {
                if (res.errCode >= 200) {
                    layer.msg('上传成功');
                } else {
                    layer.msg(res.errMsg);
                }
            }
        });
    }
</script> 