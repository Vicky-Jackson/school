<template>
    <div v-show="data.isLoading">
    <loading :progress="data.progress"></loading>
    </div>
    <div id="home" v-show="!data.isLoading">
        <router-link to="/number">新生数据</router-link>
    </div>
    
</template>

<script setup>
import Home3d from '../util/Home3d'
import Base3d from '../components/base3d.vue'
import{
    reactive,onMounted
} from 'vue'
import { RouterLink } from "vue-router";
import Loading from '../components/Loading.vue';
const data = reactive({
    home3d:{},
    progress:0,
    isLoading:true
})
function loadingFinish(){
    data.isLoading = false
}
onMounted(()=>{
    data.home3d = new Home3d('#home',loadingFinish);
    data.home3d.onProgress((e)=>{
        let progressNum = e.loaded / e.total;
        progressNum = progressNum.toFixed(2) * 100;
        data.progress = progressNum;
    })
})
</script>

<style lang="less" scoped>

</style>