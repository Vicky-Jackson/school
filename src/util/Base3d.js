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

class Base3d {
    constructor(selector, onFinish) {
        this.container = document.querySelector(selector);
        this.camera;
        this.scene;
        this.controls;
        this.renderer;
        this.model;
        this.panzi;
        this.animateAction;
        this.clock = new THREE.Clock();
        this.onFinish = onFinish;
        this.init();
        this.animate();
        this.progressFn;
    }
    onprogress(fn) {
        fn.progressFn = progressFn;
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
        this.addMesh();

        // 监听场景大小改变，调整渲染尺寸
        window.addEventListener("resize", this.onWindowResize.bind(this));

        // 监听滚轮事件
        //window.addEventListener("mousewheel", this.onMouseWheel.bind(this));
    }
    initScene() {
        this.scene = new THREE.Scene();
        // this.scene.setEnvMap('000');
        this.scene.background = new THREE.Color("#D2B48C")
        
        
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(-1.8,0.6,2.7);
        
    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        //屏幕像素比
        this.renderer.setPixelRatio(window.devicePixelRatio);
        //渲染的尺寸大小
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        //色调映射
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 3;
        this.container.appendChild(this.renderer.domElement);
    }
    render() {
        var delta = this.clock.getDelta();
        this.mixer && this.mixer.update(delta);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
     animate() {
         this.renderer.setAnimationLoop(this.render.bind(this));
     }
     initControls() {
         this.controls = new OrbitControls(this.camera, this.renderer.domElement);
         this.controls.enableDamping = true;
     }
     addMesh(){
       const loader = new GLTFLoader();
       loader.load('/texture/scene.gltf', (gltf) => {
            //gltf.scene.position.set(-80,-50,-80)
           this.scene.add(gltf.scene);
            console.log(gltf);
       }, undefined, function (error) {
           console.error(error);
       });
       this.scene.add(new THREE.AmbientLight(0x999999));
     }
     onWindowResize() {
         this.camera.aspect = window.innerWidth / window.innerHeight;
         this.camera.updateProjectionMatrix();
         this.renderer.setSize(window.innerWidth, window.innerHeight);
         // this.render();
     }
    //  onMouseWheel(e) {
    //       console.log(this.animateAction);
    //      let timeScale = e.deltaY > 0 ? 1 : -1;
    //      this.animateAction.setEffectiveTimeScale(timeScale);
    //      this.animateAction.paused = false;
    //      this.animateAction.play();
    //      if (this.timeoutid) {
    //          clearTimeout(this.timeoutid);
    //      }
    //      this.timeoutid = setTimeout(() => {
    //          this.animateAction.halt(0.5);
    //      }, 300);
    //  }
}

export default Base3d;