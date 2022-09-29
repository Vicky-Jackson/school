<template>
    <div id="home">
        <router-link to="/number">新生数据</router-link>
    </div>
</template>

<script setup>
import Base3d from '../util/Base3d'
import{
    reactive,onMounted
} from 'vue'
import { RouterLink } from "vue-router";
const data = reactive({
    base3d:{},
})
onMounted(()=>{
    data.base3d = new Base3d('#home')
})
</script>

<style lang="less" scoped>

</style>