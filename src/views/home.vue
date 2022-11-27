<template>
    <div id="container">
        <div v-show="data.isLoading">
            <loading :progress="data.progress"></loading>
        </div>
        <div id="home" v-show="!data.isLoading">
            <CommonHeader />
            <div id="scroll">
                <h2>公告</h2>
                <common-scroll></common-scroll>
            </div>
            <div id="line">
                <v-charts :option="data.option_line" style="height: 250px; width:300px;"></v-charts>
            </div>
        </div>
    </div>
</template>

<script setup>
import Home3d from '../util/Home3d'
import Base3d from '../components/base3d.vue'
import commonScroll from '../components/scroll.vue'
import { Icon } from '@iconify/vue';
import {
    reactive, onMounted,ref
} from 'vue'
import { RouterLink } from "vue-router";
import Loading from '../components/Loading.vue';
import CommonHeader from '../components/Header.vue'

const value = ref(new Date());

const data = reactive({
    home3d: {},
    progress: 0,
    isLoading: true,
    move: false,
    option_line: {
        title: { text: "浏览量" },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    }
})
function loadingFinish() {
    data.isLoading = false
}
onMounted(() => {
    data.home3d = new Home3d('#home', loadingFinish);
    data.home3d.onProgress((e) => {
        let progressNum = e.loaded / e.total;
        progressNum = progressNum.toFixed(2) * 100;
        data.progress = progressNum;
    })
})
const btn = () => {
    document.getElementById("teach").close();

}
const btn1 = () => {

    document.getElementById("library").close();
}
</script>

<style lang="less" scoped>
#container{
    width: 100%;
    height:100vh;
    background-color: black;
   
}
 #scroll {
     position: absolute;
     top: 70px;
    
 }
  h2 {
      color: white
  }
 #line{
    position: absolute;
    top: 60px;
    left:950px;
 }
</style>