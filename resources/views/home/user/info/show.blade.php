<div id="show" class="fly-full">
    <div class="banner">
        <img class="avatar" src="{{ asset('storage') . '/default.jpg' }}" alt="">
        <h1 class="username">{{ $user->username }}</h1>
        <p class="fly-home-sign">（这个人懒得留下签名）</p>
    </div>

    <div class="container">
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
            <legend>
                @if (Auth::User()->role == 1)
                    所有学生
                @else
                    {{ $user->username }}
                @endif
                最近的实验记录
            </legend>
        </fieldset>
        <table class="layui-hide" id="test" lay-filter="test"></table>
        <script type="text/html" id="toolbarDemo">
            <div class="layui-btn-container">
                <button class="layui-btn layui-btn-sm" lay-event="getCheckData">打印表格</button>
                <button class="layui-btn layui-btn-sm" lay-event="getCheckData">导出为Excel</button>
            </div>
        </script>
    </div>
</div>
<script>
    layui.use('table', function() {
        var table = layui.table;

        table.render({
            elem: '#test',
            url: "{{ url('info/show') }}",
            toolbar: '#toolbarDemo',
            title: '实验记录表',
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
                    }
                    @if (Auth::User()->role == 1)
                    , {
                        field: 'username',
                        title: '用户名',
                        width: 100
                    }
                    @endif
                    , {
                        field: 'faults',
                        title: '错误',
                        width: 300,
                        edit: 'text'
                    }, {
                        field: 'fault_count',
                        title: '错误个数',
                        width: 100,
                    }, {
                        field: 'score',
                        title: '得分',
                        width: 100
                    }, {
                        field: 'time',
                        title: '实验时间',
                        width: 100
                    }
                ]
            ],
            page: true,
            done: function(res, curr, count) {
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                console.log(res);

                //得到当前页码
                console.log(curr);

                //得到数据总量
                console.log(count);
            }
        });

    });
</script> 