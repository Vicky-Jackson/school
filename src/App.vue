<script setup>
import {RouterView} from 'vue-router'
import Base3d from './components/base3d.vue'
import commonHeader from './components/Header.vue'
</script>

<template>
    <!-- <Base3d></Base3d> -->
    <div id="header" v-if="$route.meta.keepAlive">
        <common-header></common-header>
    </div>
    <router-view></router-view>
</template>

<style lang="less" scoped>

</style>
