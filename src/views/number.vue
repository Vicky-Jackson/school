<template>
    <div v-show="data.isLoading">
        <loading :progress="data.progress"></loading>
    </div>
    <div id = "number" v-show="!data.isLoading">
        <div id="number" class="number"></div>
        <div id="tooltip" class="number"></div>
    </div>
</template>

<script setup>
import Number3d from '../util/China3d'
import {
    reactive, onMounted
} from 'vue'
import Loading from "../components/Loading.vue";
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
</style>