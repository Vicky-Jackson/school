<template>
    <h1 id="title" align="center">新生数据可视化</h1>
    <div v-show="data.isLoading">
        <loading :progress="data.progress"></loading>
    </div>
    <div id = "number" v-show="!data.isLoading">
        <div id="number"></div>
        <div id="tooltip"></div>
        
    </div>
    <div id="echarts">
        <echarts></echarts>
    </div>
    <div>
        <h1 id="number-title">总人数：1112人</h1>
    </div>
</template>

<script setup>
import Number3d from '../util/China3d'
import {
    reactive, onMounted
} from 'vue'
import Loading from "../components/Loading.vue";
import Echarts from '../components/echarts.vue'
const data = reactive({
    number3d: {},
    progress:0,
    isLoading:true
})
function loadingFinish(){
    data.isLoading = false;
}
onMounted(() => {
    data.number3d = new Number3d('#number',loadingFinish);
    data.number3d.onProgress((e) => {
        let progressNum = e.loaded / e.total;
        progressNum = progressNum.toFixed(2) * 100;
        data.progress = progressNum;
    })
})
</script>

<style lang="less" scoped>
#title{
    background-color: black;
    color: white;
    
}
#tooltip {
    position: absolute;
    width: auto;
    height:auto;
    z-index: 2;
    background: white;
    padding: 10px;
    border-radius: 2px;
    visibility: hidden;
}
#echarts{
    position:absolute; 
    top:60px;
}
#number-title{
    color:rgb(15, 49, 110);
    position:absolute;
    top:190px;
    left:500px
}
</style>