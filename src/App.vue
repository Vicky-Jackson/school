<script setup>
import {RouterView} from 'vue-router'
import Base3d from './components/base3d.vue'

</script>

<template>
    <!-- <Base3d></Base3d> -->
   
    <router-view></router-view>
</template>

<style lang="less" scoped>
#icon{
    position:absolute;
    top:0;
    left:0;
    cursor: pointer;
}
</style>
