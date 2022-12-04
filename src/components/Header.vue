<template>
    <div id="header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="black"
            text-color="#fff" active-text-color="#ffd04b" @select="handleSelect" router>
            <el-icon :size="60" id="icon" color="white">
                <ArrowLeftBold />
                <ArrowRightBold />
            </el-icon>
            <h1>教学管理系统</h1>
            <el-menu-item index="/">首页</el-menu-item>
            <el-sub-menu index="2">
                <template #title>签到</template>
                <el-menu-item v-for="o in sign" :key="o" :index="o.path">
                    {{ o.meta.title }}
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>作业</template>
                <el-menu-item v-for="o in work" :key="o" :index="o.path">
                    {{ o.meta.title }}
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
                <template #title>成绩</template>
                <el-menu-item v-for="o in score" :key="o" :index="o.path">
                    {{ o.meta.title }}
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="5">
                <template #title>信息</template>
                <el-menu-item v-for="o in message" :key="o" :index="o.path">
                    {{ o.meta.title }}
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/number">
                新生数据
            </el-menu-item>
            <div id="avatar">
                <el-dropdown>
                    <el-avatar :size="50">{{ imgText }}</el-avatar>
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
const activeIndex = ref('/')
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}
const imgText = store.state.message?.name || store.state.userInfo.username;
const role = store.state.userInfo.role
const Roleroutes = store.state.constRoutes;

const sign = [];
const work = [];
const score = [];
const message = [];
Roleroutes.filter(item => {
    if (item.meta?.title == '签到')
        item.children.filter(res => {
            if (res.meta?.title)
                sign.push(res);
        })
    else if (item.meta?.title == '作业')
        item.children.filter(res => {
            if (res.meta?.title)
                work.push(res);
        })
    else if (item.meta?.title == '成绩')
        item.children.filter(res => {
            if (res.meta?.title)
                score.push(res);
        })
    else if (item.meta?.title == '信息')
        item.children.filter(res => {
            if (res.meta?.title)
                message.push(res);
        })
})
console.log(sign)
const myMessage = () => {
    router.push('/detail')
}
const clickQuit = () => {
    store.commit('setUserInfo', {});
    store.commit('setMessage', {});
    router.push('/login')
}
</script>

<style lang="less" scoped>
#header {
    width: 100%;

    h1 {
        color: white;
        padding: 10px;
        // display: inline;
    }

    .el-menu-demo {
        width: 100%;
        height: 60px;

    }

    #avatar {
        padding: 5px;
        position: relative;
        left: 400px;
        .el-avatar {
            background-color: rgba(0, 13, 255, 0.669);
            cursor: pointer;
        }
    }
}
</style>