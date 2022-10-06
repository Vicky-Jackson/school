<template>
    <div>
        <baidu-map class="map" v="3.0" type="API" :center="{lng: 116.404, lat: 39.915}" :zoom="15" ak="zXPdMGMbCX7lBKWXsxhzoU3iQ03ZdieV">

        </baidu-map>
    </div>
</template>

<script setup>
import axios from "axios"
import {BaiduMap} from 'vue-baidu-map-3x'
axios
    .get("/baidu/location/ip", {
        params: {
            ak: 'grEV7ojtYO5DR5ekD9sLD9bLWpCGU5Ej',
            coor: "bd09ll"
        }
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
</script>

<style lang="less" scoped>
.map{
    width:100%;
    height:500px;
}
</style>