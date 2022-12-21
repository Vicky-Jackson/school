<template>
    <div id="container">

    </div>
</template>

<script setup>
import axios from "axios"
import { BaiduMap } from 'vue-baidu-map-3x'
import { onMounted, ref, reactive } from "vue";

const emit = defineEmits(['on-address'])
onMounted(()=>{
    var map = new BMap.Map('container')
    //var geolocation = new BMap.Geolocation()
    const oldPoint = new BMap.Point(117.653591, 24.512634);//用所定位的经纬度查找所在地省市街道等信息
    map.centerAndZoom(oldPoint, 15);
    map.enableScrollWheelZoom(true);
    // 开启SDK辅助定位
    //geolocation.enableSDKLocation();
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        const pointBak = new BMap.Point(lng, lat);
        setTimeout(function () {
            var convertor = new BMap.Convertor();
            var pointArr = [];
            pointArr.push(pointBak);
            convertor.translate(pointArr, 1, 5, function (resPoint) {
                if (resPoint && resPoint.points && resPoint.points.length > 0) {
                    lng = resPoint.points[0].lng;
                    lat = resPoint.points[0].lat-0.0113;
                }
                const point = new BMap.Point(lng, lat);
                const geo = new BMap.Geocoder();
                geo.getLocation(point, (res) => {
                    console.log(res);
                    const newPoint = res.point;
                    map.centerAndZoom(newPoint, 15);
                    var marker = new BMap.Marker(newPoint);        // 创建标注   
                    map.addOverlay(marker);      
                    emit('on-address', res.surroundingPois[0].title);
                });
            })
        }, 1000);
    });
})
</script>

<style lang="less" scoped>

</style>