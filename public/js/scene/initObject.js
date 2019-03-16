// initObject.js
// TODO: 初始化场景物体的位置及属性

var unable_place_area = [
    [370, 700]
];

function drawLine(p1, p2) {
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({
        vertexColors: true
    });
    var color1 = new THREE.Color(0xFF0000);

    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push(color1, color1);

    var line = new THREE.Line(geometry, material);
    scene.add(line);
}

function showErrorArea() {
    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3(370, -60, 140);
    var p2 = new THREE.Vector3(370, -60, -330);
    var p3 = new THREE.Vector3(700, -60, 140);
    var p4 = new THREE.Vector3(700, -60, -330);

    drawLine(p1, p2);
    drawLine(p3, p4);
}

function initObjects() {

    global.object.allModels().forEach(function (model) {

        initModelAttribute(model);

    });

    initLocation();
    // showErrorArea();
}

// 初始化位置
function initLocation() {
    var model = global.object.model['experiment_table'].modelObject;
    model.scale.set(0.7, 0.5, 0.5);
    model.rotation.y = -Math.PI / 2;
    model.show(0, -150, -100);

    var model = global.object.model['agate_pestle'].modelObject;
    model.rotation.z = Math.PI / 2;
    model.show(-110, -80, -112);

    var model = global.object.model['empty-agate_mortar'].modelObject;
    model.show(-200, -75, -100);

    //press
    var model = global.object.model['press_body'].modelObject;
    model.show(200, -68, -100);

    var model = global.object.model['press_screw_top'].modelObject;
    model.show(200, -71, -100);

    var model = global.object.model['press_screw_front'].modelObject;
    model.show(200, -68, -100);

    var model = global.object.model['press_pointer'].modelObject;
    model.rotation.y = Math.PI / 2;
    model.scale.set(1.2, 1.2, 1.2);
    model.show(200, -42.5, -66.5);


    //stamper
    var model = global.object.model['stamper_top'].modelObject;
    model.children[0].material.color.setHex(0xcccccc);
    model.show(100, -85, -96);

    var model = global.object.model['empty-stamper_middle'].modelObject;
    model.children[0].material.color.setHex(0xcccccc);
    model.show(0, -83.5, -100);

    var model = global.object.model['stamper_bottom'].modelObject;
    model.children[0].material.color.setHex(0xcccccc);
    model.show(50, -79, -100);


    //infrared_analyzer
    var model = global.object.model['infrared_analyzer_body'].modelObject;
    model.scale.set(0.9, 0.9, 0.9);
    model.show(520, -24, 20);

    var model = global.object.model['infrared_analyzer_cover'].modelObject;
    model.scale.set(0.9, 0.9, 0.9);
    model.show(530, 29, -20);

    var model = global.object.model['infrared_analyzer_fix_frame'].modelObject;
    model.scale.set(0.9, 0.9, 0.9);
    model.show(520, -24, 20);

    //=============================================================================

    var model = global.object.model['KBr-beaker'].modelObject;
    model.scale.set(1.5, 1.2, 1.5);
    model.rotation.y = -Math.PI / 2;
    model.show(0, -70, 0);

    var KBr = global.object.model['KBr_on-beaker'].modelObject;
    KBr.scale.set(1.5, 1.2, 1.5);
    KBr.rotation.y = -Math.PI / 2;
    KBr.show(0, -70, 0);

    model.onShow = function () {
        KBr.show(this.position.x, this.position.y + this.currVal - this.initVal, this.position.z);
    }

    model.onHide = function () {
        KBr.hide();
    }

    model.sample = KBr;

    //=============================================================================

    var model = global.object.model['sample-beaker'].modelObject;
    model.scale.set(1.2, 1, 1.2);
    model.rotation.y = -Math.PI / 2;
    model.show(-200, -70, 0);

    var sample = global.object.model['sample_on-beaker'].modelObject;
    sample.scale.set(1.2, 1, 1.2);
    sample.rotation.y = -Math.PI / 2;
    sample.show(-200, -70, 0);

    model.onShow = function () {
        sample.show(this.position.x, this.position.y + this.currVal - this.initVal, this.position.z);
    }

    model.onHide = function () {
        sample.hide();
    }

    model.sample = sample;

    //=============================================================================

    var model = global.object.model['empty-spoon'].modelObject;
    model.show(-100, -82, 0);

    var model = global.object.model['computer_desk'].modelObject;
    model.rotation.y = Math.PI / 2;
    model.scale.set(1.2, 1.2, 1.2);
    model.show(1000, -520, 500);

    var model = global.object.model['computer'].modelObject;
    model.rotation.y = Math.PI * 5 / 4;
    model.scale.set(1.7, 1.7, 1.7);
    model.show(1110, -80, 600);
}

const TOTAL_TEXTURE_NUM = 4;

// 初始化天空盒
function initRoom() {

    document.getElementById('loadStatusListener').value -= TOTAL_TEXTURE_NUM;

    initWall();
    initDoor();
    initSkirting();
}

function initWall() {
    var geometry;
    var texture;
    var wallMaterial;
    var groundMaterial;

    texture = new THREE.TextureLoader().load('../../static/images/skybox/wall.jpg', function () {
        updateLoadStatus();
    });
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    wallMaterial = new THREE.MeshBasicMaterial({
        map: texture
    });

    texture = new THREE.TextureLoader().load('../../static/images/skybox/ground.jpg', function () {
        updateLoadStatus();
    });
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 4);
    groundMaterial = new THREE.MeshBasicMaterial({
        map: texture
    });

    // front & back
    geometry = new THREE.PlaneGeometry(global.skybox.length, global.skybox.height);

    var front = new THREE.Mesh(geometry, wallMaterial);
    front.position.set(global.skybox.origin.x + global.skybox.length / 2, global.skybox.origin.y + global.skybox.height / 2, global.skybox.origin.z);

    var back = front.clone();
    back.rotation.y = Math.PI;
    back.position.z += global.skybox.width;

    // left & right
    geometry = new THREE.PlaneGeometry(global.skybox.width, global.skybox.height);

    var left = new THREE.Mesh(geometry, wallMaterial);
    left.rotation.y = Math.PI / 2;
    left.position.set(global.skybox.origin.x, global.skybox.origin.y + global.skybox.height / 2, global.skybox.origin.z + global.skybox.width / 2);

    var right = left.clone();
    right.rotation.y = -Math.PI / 2;
    right.position.x += global.skybox.length;

    // top & bottom
    geometry = new THREE.PlaneGeometry(global.skybox.length, global.skybox.width);

    var top = new THREE.Mesh(geometry, wallMaterial);
    top.rotation.x = Math.PI / 2;
    top.position.set(global.skybox.origin.x + global.skybox.length / 2, global.skybox.origin.y + global.skybox.height, global.skybox.origin.z + global.skybox.width / 2);

    var bottom = new THREE.Mesh(geometry, groundMaterial);
    bottom.rotation.x = -Math.PI / 2;
    bottom.position.set(global.skybox.origin.x + global.skybox.length / 2, global.skybox.origin.y, global.skybox.origin.z + global.skybox.width / 2);

    // add
    scene.add(front);
    scene.add(back);
    scene.add(left);
    scene.add(right);
    scene.add(top);
    scene.add(bottom);
}

function initDoor() {
    var geometry = new THREE.PlaneGeometry(global.skybox.door.length, global.skybox.door.height);
    var texture = new THREE.TextureLoader().load('../../static/images/skybox/door.jpg', function () {
        updateLoadStatus();
    });
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });

    var door = new THREE.Mesh(geometry, material);
    door.rotation.y = Math.PI;
    door.position.set(global.skybox.origin.x + global.skybox.door.right, global.skybox.origin.y + global.skybox.door.height / 2, global.skybox.origin.z + global.skybox.width - 5);

    scene.add(door);
}

function initSkirting() {
    var geometry;
    var texture = new THREE.TextureLoader().load('../../static/images/skybox/skirting.jpg', function () {
        updateLoadStatus();
    });
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 1);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });

    // front
    geometry = new THREE.BoxGeometry(global.skybox.length, global.skybox.skirting.height, global.skybox.skirting.width);
    var front = new THREE.Mesh(geometry, material);
    front.position.set(global.skybox.origin.x + global.skybox.length / 2, global.skybox.origin.y + global.skybox.skirting.height / 2, global.skybox.origin.z + global.skybox.skirting.width / 2);

    // left & right
    geometry = new THREE.BoxGeometry(global.skybox.skirting.width, global.skybox.skirting.height, global.skybox.width);
    var left = new THREE.Mesh(geometry, material);
    left.position.set(global.skybox.origin.x + global.skybox.skirting.width / 2, global.skybox.origin.y + global.skybox.skirting.height / 2, global.skybox.origin.z + global.skybox.width / 2);
    var right = left.clone();
    right.position.x = global.skybox.origin.x + global.skybox.length;

    // beside door
    geometry = new THREE.BoxGeometry(global.skybox.length - global.skybox.door.right - global.skybox.door.length / 2, global.skybox.skirting.height, global.skybox.skirting.width);
    var doorLeft = new THREE.Mesh(geometry, material);
    doorLeft.position.set(global.skybox.origin.x - (global.skybox.length - global.skybox.door.right - global.skybox.door.length / 2) / 2 + global.skybox.length, global.skybox.origin.y + global.skybox.skirting.height / 2, global.skybox.origin.z - global.skybox.skirting.width / 2 + global.skybox.width);
    geometry = new THREE.BoxGeometry(global.skybox.door.right - global.skybox.door.length / 2, global.skybox.skirting.height, global.skybox.skirting.width);
    var doorRight = new THREE.Mesh(geometry, material);
    doorRight.position.set(global.skybox.origin.x + (global.skybox.door.right - global.skybox.door.length / 2) / 2, global.skybox.origin.y + global.skybox.skirting.height / 2, global.skybox.origin.z - global.skybox.skirting.width / 2 + global.skybox.width);

    // add
    scene.add(front);
    scene.add(left);
    scene.add(right);
    scene.add(doorLeft);
    scene.add(doorRight);
}



// 初始化物体属性和方法
// highlight: 物体高亮
// unHighlight: 物体不高亮
// show: 显示模型
// hide: 隐藏模型
// resetCoverBox: 重置模型的包围盒(根据当前位置)
function initModelAttribute(model) {

    model.children.forEach(function (child) {
        addHighlightBorder(child);
    });

    model.highlighted = false;
    model.onHighlight = function () {}
    model.onUnHighlight = function () {}

    model.highlight = function () {
        this.children.forEach(function (child) {
            child.highlight();
        });

        this.highlighted = true;

        this.onHighlight();
    }

    model.unHighlight = function () {
        this.children.forEach(function (child) {
            child.unHighlight();
        });

        this.highlighted = false;

        this.onUnHighlight();
    }

    model.addCoverBox = addCoverBox;
    model.removeCoverBox = removeCoverBox;
    model.resetCoverBox = function () {
        this.removeCoverBox();
        this.addCoverBox();
    }

    model.show = function (x, y, z) {

        if (this.origin == null) {
            this.origin = new THREE.Vector3(x, y, z);
        }

        if (this.originRotation == null) {
            this.originRotation = new THREE.Vector3(this.rotation.x, this.rotation.y, this.rotation.z);
        }

        this.rotation.setFromVector3(this.originRotation);
        this.position.set(x, y, z);
        this.visible = true;
        scene.add(this);

        this.addCoverBox();

        this.onShow();
    }

    model.hide = function () {
        this.unHighlight();
        this.removeCoverBox();
        this.visible = false;
        scene.remove(this);

        this.onHide();
    }

    model.reShow = function () {
        let pos = this.position;
        this.hide();
        this.show(pos.x, pos.y, pos.z);
    }

    model.copy = function (name) {
        let clone = this.clone();
        initModelAttribute(clone);
        clone.pickable = this.pickable;
        clone.origin = this.origin;
        clone.name = name;

        global.object.model[name] = {
            modelObject: clone
        }

        return clone;
    }

    model.onShow = function () {}
    model.onHide = function () {}
}

// 给物体添加高亮轮廓线
function addHighlightBorder(mesh) {
    var geometry = new THREE.EdgesGeometry(mesh.geometry, 25);
    var material = new THREE.LineBasicMaterial({
        color: 0x00eeff
    });
    var line = new THREE.LineSegments(geometry, material);
    mesh.line = line;

    mesh.highlight = function () {
        this.add(this.line);
    }

    mesh.unHighlight = function () {
        this.remove(this.line);
    }
}

// 给物体添加包围盒
function addCoverBox() {
    let material = new THREE.MeshDepthMaterial({
        opacity: 0,
        transparent: true
    });

    let box = new THREE.Box3().setFromObject(this);
    let geometry = new THREE.BoxGeometry(box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z);
    let coverBox = new THREE.Mesh(geometry, material);
    coverBox.position.set((box.max.x + box.min.x) / 2, (box.max.y + box.min.y) / 2, (box.max.z + box.min.z) / 2);

    this.coverBox = coverBox;
    this.coverBox.name = this.name + "_coverBox";
    this.coverBox.trueObject = this;

    scene.add(coverBox);
}

// 移除物体的包围盒
function removeCoverBox() {
    scene.remove(this.coverBox);
    delete this.coverBox;
}