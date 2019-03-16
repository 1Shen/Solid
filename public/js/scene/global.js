var global = {

    // 系统参数
    system: {
        seconds: 0, // 游戏进行时间
        score: 100, // 当前得分
        pause: false, // 暂停按钮
        historyTopScore: 0, // 历史最高分
    },

    // 摄像机参数
    camera: {

        // 主摄像机
        camera: {},

        // 副摄像机
        t_camera: {
            enabled: false
        }
    },

    // 所有对象
    object: {
        
        // 所有模型
        model: {},

        // 返回所有模型对象
        allModels: function () {
            var models = [];
            for (var name in this.model) {
                if (this.model[name].modelObject) {
                    models.push(this.model[name].modelObject);
                }
            }
            return models;
        },

        // 返回所有模型的包围盒对象
        allModelCoverBoxs: function () {
            var coverBoxs = [];
            for (var name in this.model) {
                if (this.model[name].modelObject.coverBox) {
                    coverBoxs.push(this.model[name].modelObject.coverBox);
                }
            }
            return coverBoxs;
        }

        // TODO: other global objects
    },

    // 天空盒
    skybox: {
        length: 2400,
        width: 2000,
        height: 1200,
        origin: {
            x: -800,
            y: -530,
            z: -400
        },
        skirting: {
            height: 80,
            width: 16
        },
        door: {
            height: 800,
            length: 400,
            right: 1600
        }
    }
}