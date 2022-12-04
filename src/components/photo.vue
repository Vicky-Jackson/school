<template>
    <div class="camera_outer">
        <div id="icon" @click="getCompetence" v-if="data.dialogFormVisible==false">
            <el-icon :size="50" id="cameraIcon">
                <CameraFilled />
            </el-icon>
        </div>
        <video id="videoCamera" :width="data.videoWidth" :height="data.videoHeight" autoplay></video>
        <canvas style="display: none;" id="canvasCamera" :width="data.videoWidth" :height="data.videoHeight"></canvas>
        <img :src="data.imgSrc" alt class="tx_img" />
        <div>
            <el-button @click="setImage" type="success" v-if="data.dialogFormVisible == true">拍照
            </el-button>
        </div>

    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { CameraFilled } from '@element-plus/icons-vue'

const emit = defineEmits(['on-photo'])

const data = reactive({
    videoWidth: 200,
    videoHeight: 200,
    imgSrc: "",
    thisCancas: null,
    thisContext: null,
    thisVideo: null,
    openVideo: false,
    dialogFormVisible: false
})
onMounted(() => {

})
const getCompetence = () => {
    data.dialogFormVisible = true
    data.thisCancas = document.getElementById('canvasCamera');
    data.thisContext = data.thisCancas.getContext("2d");
    data.thisVideo = document.getElementById('videoCamera');
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
    // 使用getUserMedia，因为它会覆盖现有的属性。
    // 这里，如果缺少getUserMedia属性，就添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            var getUserMedia =
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.getUserMedia;
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
                //不存在则报错
                return Promise.reject(
                    new Error("getUserMedia is not implemented in this browser")
                );
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        };
    }
    var constraints = {
        audio: false,
        video: {
            width: data.videoWidth,
            height: data.videoHeight,
            transform: "scaleX(-1)",
        },
    };
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            // 旧的浏览器可能没有srcObject
            if ("srcObject" in data.thisVideo) {
                data.thisVideo.srcObject = stream;
            } else {
                // 避免在新的浏览器中使用它，因为它正在被弃用。
                data.thisVideo.src = window.URL.createObjectURL(stream);
            }
            data.thisVideo.onloadedmetadata = function (e) {
                data.thisVideo.play();
            };
        })
        .catch((err) => {
            console.log(err);
        });
}
const setImage = () => {
    // canvas画图
    data.thisContext.drawImage(
        data.thisVideo,
        0,
        0,
        data.videoWidth,
        data.videoHeight
    );
    // 获取图片base64链接
    var image = data.thisCancas.toDataURL("image/png");
    data.imgSrc = image; //赋值并预览图片
    emit('on-photo',image);
}

// const dataURLtoFile = (dataurl, filename) =>{
//     var arr = dataurl.split(",");
//     var mime = arr[0].match(/:(.*?);/)[1];
//     var bstr = atob(arr[1]);
//     var n = bstr.length;
//     var u8arr = new Uint8Array(n);
//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, { type: mime });
// }
</script>

<style lang="less" scoped>
#icon {
    width: 200px;
    height: 200px;
    border: 1px solid black;
    cursor: pointer;
    background-color: #F5F5F5;

    #cameraIcon {
        margin-left: 70px;
        margin-top: 70px
    }
}

#icon:hover {
    background-color: #D3D3D3;
}

#videoCamera {
    margin-right: 10px;
}
</style>