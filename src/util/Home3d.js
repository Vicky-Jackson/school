import * as THREE from "three";
import {
    RGBELoader
} from "three/examples/jsm/loaders/RGBELoader";
// 导入控制器，轨道控制器
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
// 导入模型解析器
import {
    GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader";
import {
    GUI
}
from 'three/examples/jsm/libs/lil-gui.module.min.js';

class Home3d {
    constructor(selector, onFinish) {
        this.container = document.querySelector(selector);
        this.camera;
        this.group;
        this.actions;
        this.activeAction;
        this.mixer;
        this.gui;
        this.model = null;
        this.scene;
        this.controls;
        this.renderer;
        this.time = 0;
        this.model;
        this.selectObject;
        this.animateAction;
        this.progress = 0;
        this.clock = new THREE.Clock();
        this.onFinish = onFinish;
        this.init();
        this.animate();
        this.progressFn;
    }
    onProgress(fn) {
        this.progressFn = fn;
    }
    //初始化
    init() {
        //   初始化场景
        this.initScene();
        // 初始化相机
        this.initCamera();

        // 初始化渲染器
        this.initRenderer();
        // 控制器
        this.initControls();
        // 添加物体
        this.addProgress();

        this.initGroup();
        this.makeCurve();
        // 监听场景大小改变，调整渲染尺寸
        window.addEventListener("resize", this.onWindowResize.bind(this));

        // 监听滚轮事件
        window.addEventListener("mousewheel", this.onMouseWheel.bind(this), {
            passive: false
        });

        //监听鼠标点击事件
        //window.addEventListener("click", this.onMouseClick.bind(this))
    }
    initScene() {
        this.scene = new THREE.Scene();
        // this.scene.setEnvMap('000');
        this.scene.background = new THREE.Color("#D2B48C");
        this.scene.add(new THREE.AmbientLight(0x999999));
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(-1.8, 0.6, 2.7);

    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        //屏幕像素比
        this.renderer.setPixelRatio(window.devicePixelRatio);
        //渲染的尺寸大小
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        //色调映射
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 3;
        this.container.appendChild(this.renderer.domElement);
    }
    initGroup() {
        this.group = new THREE.Group();
    }
    render() {
        var delta = this.clock.getDelta();
        this.mixer && this.mixer.update(delta);
        //this.moveOnCurve();
        this.renderer.render(this.scene, this.camera);
    }
    animate() {
        //requestAnimationFrame(animate);

        this.renderer.setAnimationLoop(this.render.bind(this));
    }
    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
    }
    initSprite() {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        //canvas 实体
        context.fillStyle = "rgba(0,0,0,0.5)"; //填充带透明颜色
        context.fillRect(0, 0, 140, 50); //x,y,width,height
        //canvas 边框
        context.lineJoin = "round";
        context.lineCap = 'round';
        context.miterLimit = 0;
        context.lineWidth = 5; //borderWidth
        context.strokeStyle = "#17fe6d";
        context.strokeRect(0, 0, 140, 50);
        //canvas 文字
        context.fillStyle = "#fff";
        context.font = "24px bold Arial";
        context.fillText("教学楼", 30, 30);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        var material = new THREE.SpriteMaterial({
            map: texture
        });
        var mesh = new THREE.Sprite(material);
        /*4、放大图片，每个精灵有自己的大小，默认情况下都是很小的，如果你不放大，基本是看不到的*/
        mesh.scale.set(20, 20, 1);

        return mesh;
    }
    initBuilding() {
        const loader = new GLTFLoader();
        loader.load('/texture/building/scene.gltf', (gltf) => {
            var box = new THREE.Box3().setFromObject(gltf.scene);
            let model = gltf.scene;
            box.getCenter(gltf.scene.position);
            gltf.scene.position.multiplyScalar(-1);
            //this.group = new THREE.Group();

            //console.log(gltf.scene);
            var mesh = this.initSprite();
            mesh.position.set(80, 25, -320);
            //console.log(mesh)
            model.add(mesh);
            this.scene.add(gltf.scene);
            //this.group.add(gltf.scene);

        }, (e) => {
            this.progressFn(e);
        }, function (error) {
            console.error(error);
        });
    }
    initRobot() {
        const loader = new GLTFLoader();
        loader.load('/texture/RobotExpressive/RobotExpressive.glb', (gltf) => {
                gltf.scene.position.y = -19;
                gltf.scene.rotation.set(0, -Math.PI, 0);
                gltf.scene.scale.set(2, 2, 2);
                //console.log(gltf.animations);
                this.scene.add(gltf.scene);
                this.model = gltf.scene;
                this.createGUI(gltf.scene, gltf.animations);
                //this.group.add(gltf.scene);
                //console.log(this.group);
                //console.log(gltf.scene);

            }, (e) => {
                this.progressFn(e);
            },
            function (error) {
                console.error(error);
            });
    }

    createGUI(model, animations) {
        const states = ['Idle', 'Walking', 'Running', 'Dance'];

        this.gui = new GUI();

        this.mixer = new THREE.AnimationMixer(model);

        this.actions = {};

        for (let i = 0; i < animations.length; i++) {
            const clip = animations[i];
            const action = this.mixer.clipAction(clip);
            this.actions[clip.name] = action;
        }

        const statesFolder = this.gui.addFolder('States');
        const api = {
            state: 'Running'
        };
        const clipCtrl = statesFolder.add(api, 'state').options(states);

        clipCtrl.onChange(() => {

            this.fadeToAction(api.state, 0.5);

        });

        statesFolder.open();

        this.activeAction = this.actions['Running'];
        //console.log(this.activeAction);
        this.activeAction.play();
    }

    fadeToAction(name, duration) {

        let previousAction = this.activeAction;
        this.activeAction = this.actions[name];

        if (previousAction !== this.activeAction) {

            previousAction.fadeOut(duration);

        }

        this.activeAction
            .reset()
            .setEffectiveTimeScale(1)
            .setEffectiveWeight(1)
            .fadeIn(duration)
            .play();

    }
    makeCurve() {
        //Create a closed wavey loop
        this.curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, -19, 0),
            new THREE.Vector3(0, -19, -65),
            new THREE.Vector3(70, -19, -65),
            new THREE.Vector3(70, -19, -100),
            new THREE.Vector3(-25, -19, -100),
            new THREE.Vector3(-25, -19, -76),
            new THREE.Vector3(-68, -19, -76),
            new THREE.Vector3(-68, -19, 20),
            new THREE.Vector3(-10, -19, 20),
        ]);
        this.curve.curveType = "catmullrom";
        this.curve.closed = true; //设置是否闭环
        this.curve.tension = 0.5; //设置线的张力，0为无弧度折线

        // 为曲线添加材质在场景中显示出来，不显示也不会影响运动轨迹，相当于一个Helper
        const points = this.curve.getPoints(3000);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0x000000
        });

        // Create the final object to add to the scene
        const curveObject = new THREE.Line(geometry, material);
        this.scene.add(curveObject)
    }
    moveOnCurve() {
        if (this.curve == null || this.model == null) {
            console.log('Loading')
        } else {
            // 把曲线分割成2999段， 可以得到3000个点
            let points = this.curve.getPoints(3000);
            // 更新取点索引
            this.time += 3;
            // 相机所在点索引
            const index1 = this.time % 3000;
            // 前方机器人所在位置点的索引
            const index2 = (this.time + 70) % 3000;
            // 根据索引取点
            let point = points[index1];
            let point1 = points[index2];
            // 修改相机和模型位置
            //this.model.rotateZ = Math.PI / 2;
            if (point && point.x) {
                if (this.model) {
                    this.model.position.set(point1.x, point1.y, point1.z);
                    //this.model.lookAt(point.x, point.y, point.z);

                }
                this.camera.position.set(point.x, -10, point.z);
                this.camera.lookAt(point1.x, -10, point1.z);
                var targetPos = point //目标位置点
                var offsetAngle = 0 //目标移动时的朝向偏移

                // //以下代码在多段路径时可重复执行
                var mtx = new THREE.Matrix4() //创建一个4维矩阵
                // .lookAt ( eye : Vector3, target : Vector3, up : Vector3 ) : this,构造一个旋转矩阵，从eye 指向 target，由向量 up 定向。
                mtx.lookAt(this.model.position, targetPos, this.model.up) //设置朝向
                mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, offsetAngle, 0)))
                var toRot = new THREE.Quaternion().setFromRotationMatrix(mtx) //计算出需要进行旋转的四元数值
                this.model.quaternion.slerp(toRot, 0.2)
            }
        }
    }
    addMesh() {
        return new Promise((resolve, reject) => {
            this.initBuilding();
            this.initRobot();
        })

    }
    addProgress() {
        let ans = this.addMesh();
        this.onFinish(ans);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.render();
    }
    onMouseWheel(e) {
        var fov = this.camera.fov;
        var near = this.camera.near;
        var far = this.camera.far;
        e.preventDefault();
        //e.stopPropagation();
        if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                fov -= (near < fov ? 1 : 0);
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                fov += (fov < far ? 1 : 0);
            }
        } else if (e.detail) { //Firefox滑轮事件
            if (e.detail > 0) { //当滑轮向上滚动时
                fov -= 1;
            }
            if (e.detail < 0) { //当滑轮向下滚动时
                fov += 1;
            }
        }
        this.camera.fov = fov;
        this.camera.updateProjectionMatrix();
    }


}

export default Home3d;