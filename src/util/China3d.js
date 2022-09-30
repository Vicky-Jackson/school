import * as THREE from "three";
import * as d3 from "d3";
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

class China3d {
    constructor(selector, onFinish) {
        this.container = document.querySelector(selector);
        this.camera;
        this.group;
        this.scene;
        this.raycaster;
        this.mouse;
        this.tooltip;
        this.controls;
        this.renderer;
        this.model;
        this.selectObject;
        this.animateAction;
        this.clock = new THREE.Clock();
        this.onFinish = onFinish;
        this.init();
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
        this.setRaycaster();
        this.animate();
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
        //this.scene.background = new THREE.Color("#D2B48C");
        this.scene.add(new THREE.AmbientLight(0x999999));
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 120);

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
    // animate() {
    //     this.renderer.setAnimationLoop(this.render.bind(this));
    // }
    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
    }
    addMesh() {
        return new Promise((resolve, reject) => {
            const loader = new THREE.FileLoader()
            loader.load('/texture/China/china.json', (data) => {
                const jsondata = JSON.parse(data);
                this.generateGeometry(jsondata)
            }, (e) => {
                this.progressFn(e);
            })
        })

    }
    addProgress() {
        let ans = this.addMesh();
        this.onFinish(ans);
    }
    generateGeometry(jsondata) {
        // 初始化一个地图对象
        this.map = new THREE.Object3D()
        // 墨卡托投影转换
        const projection = d3
            .geoMercator()
            .center([104.0, 37.5])
            .translate([0, 0])
        console.log(jsondata);
        jsondata.features.forEach((elem) => {
            // 定一个省份3D对象
            const province = new THREE.Object3D()
            // 每个的 坐标 数组
            const coordinates = elem.geometry.coordinates
            // 循环坐标数组
            coordinates.forEach((multiPolygon) => {
                multiPolygon.forEach((polygon) => {
                    const shape = new THREE.Shape()
                    const lineMaterial = new THREE.LineBasicMaterial({
                        color: 'white',
                    })
                    const points = [];
                    const lineGeometry = new THREE.BufferGeometry()

                    for (let i = 0; i < polygon.length; i++) {
                        const [x, y] = projection(polygon[i])
                        if (i === 0) {
                            shape.moveTo(x, -y)
                        }
                        shape.lineTo(x, -y)
                        points.push(new THREE.Vector3(x, -y, 5))
                    }
                    lineGeometry.setFromPoints(points)
                    const extrudeSettings = {
                        depth: 10,
                        bevelEnabled: false,
                    }

                    const geometry = new THREE.ExtrudeGeometry(
                        shape,
                        extrudeSettings
                    )
                    const material = new THREE.MeshBasicMaterial({
                        color: '#2defff',
                        transparent: true,
                        opacity: 0.6,
                    })
                    const material1 = new THREE.MeshBasicMaterial({
                        color: '#3480C4',
                        transparent: true,
                        opacity: 0.5,
                    })

                    const mesh = new THREE.Mesh(geometry, [material, material1])
                    const line = new THREE.Line(lineGeometry, lineMaterial)
                    // 将省份的属性 加进来
                    province.properties = elem.properties
                    province.add(mesh)
                    province.add(line)
                })
            })
            this.map.add(province)
        })
        this.scene.add(this.map)
    }
    setRaycaster() {
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        this.tooltip = document.getElementById('tooltip')
        //document.appendChild(this.tooltip);
        const onMouseMove = (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
            this.tooltip.style.left = event.clientX + 2 + 'px'
            this.tooltip.style.top = event.clientY + 2 + 'px'
        }

        window.addEventListener('mousemove', onMouseMove, false)
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this))
        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(this.mouse, this.camera)
        // 算出射线 与当场景相交的对象有那些
        const intersects = this.raycaster.intersectObjects(
            this.scene.children,
            true
        )
        // 恢复上一次清空的
        if (this.lastPick) {
            this.lastPick.object.material[0].color.set('#2defff')
            this.lastPick.object.material[1].color.set('#3480C4')
        }
        this.lastPick = null
        this.lastPick = intersects.find(
            (item) => item.object.material && item.object.material.length === 2
        )
        if (this.lastPick) {
            this.lastPick.object.material[0].color.set(0xff0000)
            this.lastPick.object.material[1].color.set(0xff0000)
        }
        this.showTip()
        this.render()
    }

    showTip() {
        // 显示省份的信息
        if (this.lastPick) {
            const properties = this.lastPick.object.parent.properties

            this.tooltip.textContent = properties.name

            this.tooltip.style.visibility = 'visible'
        } else {
            this.tooltip.style.visibility = 'hidden'
        }
        //document.appendChild(this.tooltip);
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

export default China3d;