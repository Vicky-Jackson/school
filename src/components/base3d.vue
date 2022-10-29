<template>
    <div id="base">
        <vue3dLoader :height="400" :width="500" :showFps="false" :filePath="['./texture/astronaut_rigged/scene.gltf']"  
    :scale="{ x: 100, y: 100, z: 100}" :backgroundAlpha="0" :cameraPosition="{ x: 0, y:-4, z:50 }" controlsOptions="{
      enablePan:false,
      enableZoom:false,
      enableRotate:false
    }" :lights="lights"></vue3dLoader>
    
    </div>
    
</template>

<script setup>
import { vue3dLoader } from "vue-3d-loader"
const lights = [
    {
        type: "AmbientLight",
        color: "0xffffff",
        position: { x: -1, y:1, z: 1 },
        intensity: 0.5,
    },
    {
        type: "DirectionalLight",
        position: { x: 0, y: 0, z: 1 },
        color: "0xffffff",
        intensity: 1,
    },
    {
        type: "DirectionalLight",
        position: { x: 0, y: 0, z: -1 },
        color: "0xffffff",
        intensity: 0.5,
    },
];
</script>

<style lang="less" scoped>
#base {
    position: absolute;
    top: 150px;
    left: 880px
}
</style>