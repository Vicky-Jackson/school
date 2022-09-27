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
        this.group;
        this.scene;
        this.controls;
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

        this.initGroup();

        // 监听场景大小改变，调整渲染尺寸
        window.addEventListener("resize", this.onWindowResize.bind(this));

        // 监听滚轮事件
        window.addEventListener("mousewheel", this.onMouseWheel.bind(this), {
            passive: false
        });

        //监听鼠标点击事件
        window.addEventListener("click", this.onMouseClick.bind(this))
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
        this.renderer.render(this.scene, this.camera);
    }
    animate() {
        this.renderer.setAnimationLoop(this.render.bind(this));
    }
    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
    }
    initSprite(){
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
            mesh.position.set(80, 25, -300);
            console.log(mesh)
            model.add(mesh);
            this.scene.add(this.group);
            this.group.add(gltf.scene);

        }, undefined, function (error) {
            console.error(error);
        });
    }
    initRobot() {
        const loader = new GLTFLoader();
        loader.load('/texture/RobotExpressive/RobotExpressive.glb', (gltf) => {
            gltf.scene.position.y = -19;
            gltf.scene.scale.set(2, 2, 2)
            this.scene.add(this.group);
            this.group.add(gltf.scene);
            console.log(this.group);
            //console.log(gltf.scene);

        }, undefined, function (error) {
            console.error(error);
        });
    }
    addMesh() {
        this.initBuilding();
        this.initRobot();
    }
    getIntersects(event) {
        event.preventDefault(); // 阻止默认的点击事件执行
        //console.log("event.clientX:" + event.clientX);
        //console.log("event.clientY:" + event.clientY);

        //声明 rayCaster 和 mouse 变量
        let rayCaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();

        //通过鼠标点击位置，计算出raycaster所需点的位置，以屏幕为中心点，范围-1到1
        mouse.x = ((event.clientX - this.container.getBoundingClientRect().left) / this.container.offsetWidth) * 2 - 1;
        mouse.y = -((event.clientY - this.container.getBoundingClientRect().top) / this.container.offsetHeight) * 2 + 1; //这里为什么是-号，没有就无法点中

        //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
        rayCaster.setFromCamera(mouse, this.camera);

        //获取与射线相交的对象数组， 其中的元素按照距离排序，越近的越靠前。
        //+true，是对其后代进行查找，这个在这里必须加，因为模型是由很多部分组成的，后代非常多。
        let intersects = rayCaster.intersectObjects(this.group.children, true);

        //返回选中的对象
        return intersects;
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

    onMouseClick(e) {
        //获取raycaster和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
        let intersects = this.getIntersects(e);
        //console.log(intersects[0].point);
        //获取选中最近的Mesh对象
        //instance坐标是对象，右边是类，判断对象是不是属于这个类的
        if (intersects.length !== 0 && intersects[0].object.type == 'Mesh') {
            var selectObject = intersects[0].point;
            console.log(selectObject);
            this.changeMaterial(selectObject)
        } else {
            console.log('未选中 Mesh!');
        }
    }
    changeMaterial(selectObject){

    }
}

export default Base3d;