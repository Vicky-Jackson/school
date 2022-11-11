<template>
    <div>
        <baidu-map class="map" v="3.0" type="API" center="漳州市" :zoom="15" ak="zXPdMGMbCX7lBKWXsxhzoU3iQ03ZdieV">
        </baidu-map>
    </div>
    <el-button type="primary" @click="clickAddress">
        签到
    </el-button>
</template>

<script setup>
import axios from "axios"
import {BaiduMap} from 'vue-baidu-map-3x'

const clickAddress = ()=>{
    axios
        .get("/baidu/location/ip", {
            params: {
                ak: 'grEV7ojtYO5DR5ekD9sLD9bLWpCGU5Ej',
                coor: "bd09ll"
            }
        })
        .then(res => {
            alert(res.data.content.address);
        })
        .catch(err => {
            console.log(err);
        });
}

</script>

<style lang="less" scoped>
.map{
    width:100%;
    height:500px;
}
</style>