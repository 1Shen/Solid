<div id="showQuizzes">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
        <legend>题目列表</legend>
    </fieldset>

    <table class="layui-hide" id="test" lay-filter="test"></table>
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>
    <script type="text/html" id="toolbarDemo">
        <div class="layui-btn-container">
            <button class="layui-btn layui-btn-sm" lay-event="getCheckData">打印表格</button>
            <button class="layui-btn layui-btn-sm" lay-event="getCheckData">导出为Excel</button>
        </div>
    </script>
</div>
<script>
    layui.use('table', function() {
        var table = layui.table;

        table.render({
            elem: '#test',
            url: "{{ url('quiz/list') }}",
            toolbar: '#toolbarDemo',
            title: '用户数据表',
            cols: [
                [{
                    type: 'checkbox',
                    fixed: 'left'
                }, {
                    field: 'id',
                    title: 'ID',
                    width: 65,
                    fixed: 'left',
                    unresize: true,
                    sort: true
                }, {
                    field: 'title',
                    title: '题目',
                    width: 300
                }, {
                    field: 'optionA',
                    title: '选项A',
                    width: 100,
                    edit: 'text'
                }, {
                    field: 'optionB',
                    title: '选项B',
                    width: 100,
                    edit: 'text'
                }, {
                    field: 'optionC',
                    title: '选项C',
                    width: 100,
                    edit: 'text'
                }, {
                    field: 'optionD',
                    title: '选项D',
                    width: 100,
                    edit: 'text'
                }, {
                    field: 'answer',
                    title: '答案',
                    width: 65,
                }, {
                    field: 'analysis',
                    title: '答案解析',
                    width: 200
                }, {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#barDemo',
                    width: 150
                }]
            ],
            page: true
        });

        //监听行工具事件
        table.on('tool(test)', function(obj) {
            var data = obj.data;
            //console.log(obj)
            if (obj.event === 'del') {
                layer.confirm('真的删除行么', function(index) {
                    obj.del();
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                layer.prompt({
                    formType: 2,
                    value: data.email
                }, function(value, index) {
                    obj.update({
                        email: value
                    });
                    layer.close(index);
                });
            }
        });
    });
</script> 