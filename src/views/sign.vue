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
    <el-button type="primary" @click="clickAddress">
        签到
    </el-button>
</template>

<script setup>
import axios from "axios"
import { BaiduMap } from 'vue-baidu-map-3x'
import { onMounted } from "vue";

const data = reactive({
    address:[]
})

onMounted(() => {
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
                    lat = resPoint.points[0].lat-0.01;
                }
                const point = new BMap.Point(lng, lat);
                const geo = new BMap.Geocoder();
                geo.getLocation(point, (res) => {
                    console.log(res)
                });
            })
        }, 1000);

        // const convertor = new BMap.Convertor();
        // convertor.translate([pointBak], 1, 5, function (resPoint) {
        //     if (resPoint && resPoint.points && resPoint.points.length > 0) {
        //         lng = resPoint.points[0].lng;
        //         lat = resPoint.points[0].lat;
        //     }
        //     const point = new BMap.Point(lng, lat);
        //     const geo = new BMap.Geocoder();
        //     geo.getLocation(point, (res) => {
        //         alert(res.address)
        //     });
        // });
    });
    // geolocation.getCurrentPosition(function (r) {
    //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //         var mk = new BMap.Marker(r.point);
    //         //  map.addOverlay(mk);//标出所在地
    //         //  map.panTo(r.point);//地图中心移动
    //         alert('您的位置：'+r.point.lng+','+r.point.lat);
    //         var point = new BMap.Point(r.point.lng, r.point.lat);//用所定位的经纬度查找所在地省市街道等信息
    //         map.centerAndZoom(point, 15);
    //         var marker = new BMap.Marker(point);
    //         map.addOverlay(marker); 
    //         var gc = new BMap.Geocoder();
    //         gc.getLocation(point, function (rs) {
    //             var addComp = rs.addressComponents;
    //             alert(rs.address);//地址信息
    //         });
    //     } else {
    //         alert("failed" + this.getStatus());
    //     }
    // }, { enableHighAccuracy: true });

})
const clickAddress = ()=>{
    
}

</script>

<style lang="less" scoped>
.bmap {
    width: 100%;
    height: 500px;
}
</style>