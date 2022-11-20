<template>
    <div v-show="data.isLoading">
        <loading :progress="data.progress"></loading>
    </div>
    <div id="home" v-show="!data.isLoading">
        <CommonHeader />
    </div>

</template>

<script setup>
import Home3d from '../util/Home3d'
import Base3d from '../components/base3d.vue'
import { Icon } from '@iconify/vue';
import {
    reactive, onMounted
} from 'vue'
import { RouterLink } from "vue-router";
import Loading from '../components/Loading.vue';
import CommonHeader from '../components/Header.vue'
const data = reactive({
    home3d: {},
    progress: 0,
    isLoading: true,
    move: false
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
#teach,#library {
    width: 200px;
    height: 350px;
    p{
        padding:10px
    }
    .active{
        color:red
    }
    #other{
        padding:10px;
    }
}
</style>