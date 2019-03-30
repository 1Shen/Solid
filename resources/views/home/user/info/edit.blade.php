<div id="edit">
    <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title" id="LAY_mine">
            <li class="layui-this" lay-id="info">我的资料</li>
            <li lay-id="avatar" class="">头像</li>
            <li lay-id="pass" class="">密码</li>
        </ul>
        <div class="layui-tab-content" style="padding: 27px 0;">
            <div class="layui-form layui-form-pane layui-tab-item layui-show">
                <form method="">
                    <div class="layui-form-item"> <label for="L_email" class="layui-form-label">邮箱</label>
                        <div class="layui-input-inline"> <input type="text" id="L_email" name="email" required="" lay-verify="email" autocomplete="off" value="" class="layui-input"> </div>
                    </div>
                    <div class="layui-form-item"> <label for="L_username" class="layui-form-label">姓名</label>
                        <div class="layui-input-inline"> <input type="text" id="L_username" name="username" required="" lay-verify="required" autocomplete="off" value="{{ Auth::User()->name }}" class="layui-input"> </div>
                        <div class="layui-form-mid layui-word-aux">请正确填写姓名</div>
                    </div>
                    <div class="layui-form-item layui-form-text"> <label for="L_sign" class="layui-form-label">个性签名</label>
                        <div class="layui-input-block"> <textarea placeholder="随便写些什么刷下存在感" id="L_sign" name="sign" autocomplete="off" class="layui-textarea" style="height: 80px;"></textarea> </div>
                    </div>
                    <div class="layui-form-item"> <button class="layui-btn" key="set-mine" lay-filter="*" lay-submit="">确认修改</button> </div>
                </form>
            </div>
            <div class="layui-form layui-form-pane layui-tab-item">
                <div class="layui-form-item">
                    <div class="layui-upload">
                        <div class="layui-upload-list" id="image-holder">
                            <img class="layui-upload-img" id="demo1">
                            <p id="demoText">推荐上传正方形图片</p>
                            <button type="button" class="layui-btn layui-btn-normal" id="test1">上传图片</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-form layui-form-pane layui-tab-item">
                <div class="layui-form-item"> <label for="L_pass" class="layui-form-label">新密码</label>
                    <div class="layui-input-inline"> <input type="password" id="L_pass" name="pass" required="" lay-verify="required" autocomplete="off" class="layui-input"> </div>
                    <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                </div>
                <div class="layui-form-item"> <label for="L_repass" class="layui-form-label">确认密码</label>
                    <div class="layui-input-inline"> <input type="password" id="L_repass" name="repass" required="" lay-verify="required" autocomplete="off" class="layui-input"> </div>
                </div>
                <div class="layui-form-item"> <button class="layui-btn" key="set-mine" lay-filter="*" lay-submit="">确认修改</button> </div>
            </div>
        </div>
    </div>
</div>

<script>
    $(function() {
        layui.use('upload', function() {
            var $ = layui.jquery,
                upload = layui.upload;
            //普通图片上传
            upload.render({
                elem: '#test1',
                auto: false
            });
        });
        $('#test1').click(function() {
            $("#test1").next().on('change', function() {

                if (typeof(FileReader) != "undefined") {

                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $('#demo1').attr('src', e.target.result);
                    }
                    reader.readAsDataURL($(this)[0].files[0]);
                } else {
                    alert("你的浏览器不支持FileReader.");
                }
            });
        });
    });
</script> 