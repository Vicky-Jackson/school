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
    DRACOLoader
} from "three/examples/jsm/loaders/DRACOLoader";
import {
    gsap
} from "gsap";

class test3d {
    constructor(selector, onFinish) {
        this.container = document.querySelector(selector);
        this.camera;
        this.group;
        this.scene;
        this.controls;
        this.dracoLoader;
        this.renderer;
        this.model;
        this.selectObject;
        this.animateAction;
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
        //灯光
        this.initLight();
        // 初始化渲染器
        this.initRenderer();
        // 控制器
        this.initControls();
        this.initDraco()
        // 添加物体
        this.addProgress();

        this.initGroup();

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
        let url = "./texture/25s.jpg";
        let envTexture = new THREE.TextureLoader().load(url);
        envTexture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.background = envTexture;
        this.scene.environment = envTexture;
        //this.scene.add(new THREE.AmbientLight(0x999999));
    }
    initLight() {
        let light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 0, 1);
        this.scene.add(light);
        let light2 = new THREE.DirectionalLight(0xffffff, 0.5);
        light2.position.set(0, 0, -1);
        this.scene.add(light2);
        let light3 = new THREE.AmbientLight(0xffffff, 0.5);
        light3.position.set(-1, 1, 1);
        this.scene.add(light3);
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            100000
        );
        this.camera.position.set(0, 0, 10);

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
        this.renderer.render(this.scene, this.camera);
    }
    animate() {
        this.renderer.setAnimationLoop(this.render.bind(this));
    }
    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
    }
    initDraco() {
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath("./draco/gltf/");
        this.dracoLoader.setDecoderConfig({
            type: "js"
        });
    }
    initGltf() {
        let loader = new GLTFLoader();
        loader.setDRACOLoader(this.dracoLoader);
        loader.load("./texture/timetable/timetable.gltf", (gltf) => {
            gltf.scene.position.set(3, 0, 0);
            console.log(gltf.scene);
            this.scene.add(gltf.scene);
        }, (e) => {
            
        });
    }
    addMesh() {
        return new Promise((resolve, reject) => {
            this.initGltf();
        })
    }
    addProgress() {
        let ans = this.addMesh();
        
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
export default test3d;