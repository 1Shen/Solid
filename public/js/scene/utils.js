/**
 * utils.js
 * 所有工具类函数放这里
 * 索引:
 * 1. load3DModel           用于加载3d模型（obj + mtl + tga）
 * 2. hoverObject           获得当前鼠标经过的物体
 * 3. rotate                将物体绕过[任意点]的[任意轴]旋转[任意角度]
 */

//===============================================================================================

/**
 * @description 用于加载3d模型
 * @param {string} modelFilePath 模型文件路径
 * @param {boolean} hasTexture 是否有纹理
 * @param {double[]} location 初始位置
 */
function load3DModel(modelFilePath, hasTexture = false, objectName = '') {
    var modelFileName = modelFilePath.substr(modelFilePath.lastIndexOf('/') + 1);
    // mtl加载器
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath(modelFilePath + "/");
    mtlLoader.load(modelFileName + ".mtl", function (materials) {
        // 材质预加载
        materials.preload();
        // obj加载器
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(modelFilePath + "/");
        objLoader.load(modelFileName + ".obj", function (object) {

            // 命名
            object.name = objectName ? objectName : modelFileName;

            // 加入全局模型数组
            global.object.model[object.name] = {
                modelObject: object
            }

            // 触发模型加载进度的监听器
            updateLoadStatus();

            // 加载纹理贴图
            if (hasTexture) {
                var texture = new THREE.TGALoader().load(modelFilePath + "/" + modelFileName + ".tga");
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.map = texture;
                        child.material.needsUpdate = true;
                    }
                });
            }
        });
    });
}

function loadGLTFModel(modelFilePath, hasTexture = false, objectName = '') {
    var modelFileName = modelFilePath.substr(modelFilePath.lastIndexOf('/') + 1);
    var loader = new THREE.GLTFLoader();
    loader.setPath(modelFilePath + "/");

    loader.load(modelFileName + '.gltf', function (gltf) {
        var object = gltf.scene;

        // 命名
        object.name = objectName ? objectName : modelFileName;

        // 加入全局模型数组
        global.object.model[object.name] = {
            modelObject: object
        }

        // 触发模型加载进度的监听器
        updateLoadStatus();

        // 加载纹理贴图
        if (hasTexture) {
            var texture = new THREE.TGALoader().load(modelFilePath + "/" + modelFileName + ".tga");
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                    child.material.needsUpdate = true;
                }
            });
        }
    });
}

function updateLoadStatus() {
    document.getElementById('loadStatusListener').value++;
    document.getElementById('loadStatusListener').onchange();
}

//===============================================================================================

/**
 * @description 获得当前鼠标经过的物体
 * @param {MouseEvent} event 鼠标事件
 * @param {Object3D[]} objs 待检测对象数组
 * @return {Object3D} 当前鼠标经过的物体
 */
function hoverObject(event, objs) {
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = -(event.clientY / height) * 2 + 1;
    var ray = new THREE.Raycaster();
    ray.setFromCamera(mouse, camera);
    var intersects = ray.intersectObjects(objs, true);
    if (intersects.length > 0) return intersects[0];
    return null;
}

//===============================================================================================
// (碰撞检测)

/**
 * 碰撞检测函数
 * @param {Object3D} obj 本体对象
 * @param {Object3D[]} objArray 待碰撞对象数组
 * @return {Object3D} 返回相撞对象
 */
function collision(obj, objArray) {
    var originPoint = obj.position.clone();

    for (var vertexIndex = 0; vertexIndex < obj.geometry.vertices.length; vertexIndex++) {
        // 顶点原始坐标
        var localVertex = obj.geometry.vertices[vertexIndex].clone();
        // 顶点经过变换后的坐标
        var globalVertex = localVertex.applyMatrix4(obj.matrix);
        // 获得由中心指向顶点的向量
        var directionVector = globalVertex.sub(obj.position);
        // 将方向向量初始化
        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        // 检测射线与多个物体的相交情况
        var collisionResults = ray.intersectObjects(objArray);
        // 如果返回结果不为空，且交点与射线起点的距离小于物体中心至顶点的距离，则发生了碰撞
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            return collisionResults[0].object;
        }
    }

    return null;
}

//===============================================================================================
// (旋转)

/**
 * @description 将物体绕过[任意点]的[任意轴]旋转[任意角度]
 * @param {Object3D} obj 待旋转物体
 * @param {double[]} point 任意点
 * @param {double[]} pivot 过任意点的任意轴
 * @param {double} angle 任意角度
 */
function rotate(obj, point, pivot, angle) {
    if (obj.rotateCenter == null) {
        obj.rotateCenter = getRotateCenter(obj, point);
    }
    rotateAroundPivot(obj.rotateCenter, pivot, angle);
    scene.add(obj.rotateCenter);
}

// 获得过任意点的旋转中心
function getRotateCenter(obj, point) {
    var group = new THREE.Group();
    group.position.set(point[0], point[1], point[2]);
    group.add(obj);

    obj.position.set(obj.position.x - point[0], obj.position.y - point[1], obj.position.z - point[2]);

    return group;
}

// 绕过自身的任意轴旋转
function rotateAroundPivot(obj, pivot, angle) {
    var rotateMatrix = new THREE.Matrix4();
    var _pivot = new THREE.Vector3(pivot[0], pivot[1], pivot[2]);
    rotateMatrix.makeRotationAxis(_pivot.normalize(), angle * Math.PI / 180);
    rotateMatrix.multiply(obj.matrix);
    obj.matrix = rotateMatrix;
    obj.rotation.setFromRotationMatrix(obj.matrix);
    obj.updateMatrix();
}

//===============================================================================================
// (扩展原生js和jquery)

// 遍历打印FormData对象
function form_dump(form) {
    var ent = form.entries();
    var data = {};
    while (item = ent.next()) {
        if (item.done) break;
        data[item.value[0]] = item.value[1];
    }
    console.log(data);
}

// 返回数组中指定元素的下标
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.objIndexOf = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].name == obj.name) return i;
    }
    return -1;
};

// 删除数组中的指定元素(同时消除空位)
Array.prototype.remove = function (obj) {
    var index = this.indexOf(obj);
    if (index > -1) this.splice(index, 1);
    return this;
};

// 监听滚动停止事件
$.fn.scrollEnd = function (callback, timeout) {
    $(this).scroll(function () {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, 140));
    });
};

(function () {
    $.extend({
        getmouseEventType: function () {
            var type = '';
            if (document.mozHidden !== undefined) {
                type = "DOMMouseScroll";
            } else {
                type = "mousewheel"
            }
            return type;
        },
        mousewheelEvent: function (event) {
            var event = event || window.event,
                type = event.type;
            //jquery重写了event方法 找到原生方法
            //event.originalEvent.wheelDelta--ie,chrome,opera
            //event.originalEvent.detail--firefox
            // console.log(event)
            if (type == 'DOMMouseScroll') {
                event.delta = -(event.originalEvent.detail || 0) / 3;
            } else if (type == 'mousewheel') {
                event.delta = event.originalEvent.wheelDelta / 120;

            }
            return event;
        }
    });
})(jQuery);

$.fn.reShow = function (duration = 0) {
    this.hide().fadeIn(duration);
}
//===============================================================================================

// 小数转百分数
function toPercent(point) {
    var str = Number(point * 100).toFixed(1);
    str += "%";
    return str;
}

//===============================================================================================

function getPointerX(event) {
    return (window.innerWidth - event.pageX);
}

function getPointerY(event) {
    return (window.innerHeight - event.pageY);
}
