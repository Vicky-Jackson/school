<template>
    <div v-show="data.isLoading">
    <loading :progress="data.progress"></loading>
    </div>
    <div id="home" v-show="!data.isLoading">
        <router-link to="/number">新生数据</router-link>
    </div>
</template>

<script setup>
import Base3d from '../util/Base3d'
import{
    reactive,onMounted
} from 'vue'
import { RouterLink } from "vue-router";
import Loading from '../components/Loading.vue';
const data = reactive({
    base3d:{},
    progress:0,
    isLoading:true
})
function loadingFinish(){
    data.isLoading = false
}
onMounted(()=>{
    data.base3d = new Base3d('#home',loadingFinish);
    data.base3d.onProgress((e)=>{
        let progressNum = e.loaded / e.total;
        progressNum = progressNum.toFixed(2) * 100;
        data.progress = progressNum;
    })
})
</script>

<style lang="less" scoped>

</style>