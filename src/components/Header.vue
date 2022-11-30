<template>
    <div id="header">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="black"
            text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
            <el-icon :size="60" id="icon" color="white">
                <ArrowLeftBold />
                <ArrowRightBold />
            </el-icon>
            <h1>教学管理系统</h1>
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3" disabled>Info</el-menu-item>
            <el-menu-item index="4">Orders</el-menu-item>
            <div id="avatar">
                <el-dropdown>
                    <el-avatar :size="50">{{imgText}}</el-avatar>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="myMessage" v-if="role !== 'admin'">个人资料</el-dropdown-item>
                            <el-dropdown-item @click="clickQuit">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                 
            </div>
           
        </el-menu>
            
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import store from '../store'
import { useRouter } from "vue-router";
const router = useRouter();
const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}
const imgText = store.state.message?.name || store.state.userInfo.username;
const role = store.state.userInfo.role
const myMessage = ()=>{
    router.push('/detail')
}
const clickQuit = () => {
    store.commit('setUserInfo',{});
    store.commit('setMessage',{});
    router.push('/login')
}
</script>

<style lang="less" scoped>
#header{
    width: 100%;
    h1{
        color:white;
        padding:10px;
        // display: inline;
    }
    .el-menu-demo{
        width:100%;
        height:60px;

    }
    #avatar{
        padding:5px;
        position: relative;
        left:480px;

        .el-avatar{
            background-color: rgba(0, 13, 255, 0.669);
            cursor: pointer;
        }
    }
}
</style>