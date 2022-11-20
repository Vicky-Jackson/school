<template>
    <!-- <div>
        <baidu-map class="map" v="3.0" type="API" center="漳州市" :zoom="15" ak="zXPdMGMbCX7lBKWXsxhzoU3iQ03ZdieV">
        </baidu-map>
    </div>
    <el-button type="primary" @click="clickAddress">
        签到
    </el-button> -->
    <div id="container" class="bmap">

    </div>
</template>

<script setup>
import axios from "axios"
import {BaiduMap} from 'vue-baidu-map-3x'
import { onMounted } from "vue";

onMounted(()=>{
    var map = new BMap.Map('container')
    // var geolocation = new BMap.Geolocation({
    //     maximumAge: 10  // 清除缓存
    // });
    map.addControl(new BMap.ScaleControl());
    map.enableScrollWheelZoom(true);
    // 开启SDK辅助定位
    //geolocation.enableSDKLocation();
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        const pointBak = new BMap.Point(lng, lat);
        const convertor = new BMap.Convertor();
        convertor.translate([pointBak], 1, 5, function (resPoint) {
            if (resPoint && resPoint.points && resPoint.points.length > 0) {
                lng = resPoint.points[0].lng;
                lat = resPoint.points[0].lat;
            }
            const point = new BMap.Point(lng, lat);
            console.log(point);
            const geo = new BMap.Geocoder();
            geo.getLocation(point, (res) => {
                const addComp = res.addressComponents;
                console.log(res);
            });
        });
    },undefined,{
        enableHighAccuracy: true,
    });
    // geolocation.getCurrentPosition(function (r) {
    //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //         var mk = new BMap.Marker(r.point);
    //         //  map.addOverlay(mk);//标出所在地
    //         //  map.panTo(r.point);//地图中心移动
    //         //alert('您的位置：'+r.point.lng+','+r.point.lat);
    //         var point = new BMap.Point(r.point.lng, r.point.lat);//用所定位的经纬度查找所在地省市街道等信息
    //         map.centerAndZoom(point, 15);
    //         var marker = new BMap.Marker(point);
    //         map.addOverlay(marker); 
    //         var gc = new BMap.Geocoder();
    //         gc.getLocation(point, function (rs) {
    //             var addComp = rs.addressComponents;
    //             console.log(rs.address);//地址信息
    //         });
    //     } else {
    //         alert("failed" + this.getStatus());
    //     }
    // }, { enableHighAccuracy: true });

})
// const clickAddress = ()=>{
//     axios
//         .get("/baidu/location/ip", {
//             params: {
//                 ak: 'grEV7ojtYO5DR5ekD9sLD9bLWpCGU5Ej',
//                 coor: "bd09ll"
//             }
//         })
//         .then(res => {
//             console.log(res)
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

</script>

<style lang="less" scoped>
.bmap {
    width: 100%;
    height: 500px;
}
</style>