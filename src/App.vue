<script setup>
import { RouterView } from 'vue-router'
import commonHeader from './components/Header.vue'
import CommonAside from './components/serverAside.vue';
import CommonServerHeader from './components/serverHeader.vue';
</script>

<template>
    <div v-if="$route.meta.server">
        <el-container>
            <el-aside width="200px" class="aside">
                <common-aside></common-aside>
            </el-aside>
            <el-container>
                <el-header class="header">
                    <common-server-header></common-server-header>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
    <div v-else>
        <div id="header" v-if="($route.meta.header && !$route.meta.server)">
            <common-header></common-header>
        </div>
        <router-view></router-view>
    </div>
</template>

<style lang="less" scoped>
.header {
    min-width: 200vh;
    background-color: #545c64;
    overflow: hidden;
}
.aside{
    overflow: hidden;
}
</style>
