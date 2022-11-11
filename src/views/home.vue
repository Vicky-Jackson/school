<template>
    <div v-show="data.isLoading">
        <loading :progress="data.progress"></loading>
    </div>
    <div id="home" v-show="!data.isLoading">
        <dialog id="teach" >
            <h3 id="title">教学楼简介</h3>
            <p>教学楼里主要有机房，教室以及实验室，保证学生在机房上课时电脑每人一台，并且教室分为大，中，小间，对于老师多个班级教学也提供了便利，实验室器材丰富，保证学生在做实验时设备先进，更能吸收知识</p>
            <div id="other">
                <router-link to="/number" style="text-decoration:none; margin-right:10px;">新生数据</router-link>
                <router-link to="/students" style="text-decoration:none;">学生信息</router-link>
                <tr></tr>
                <router-link to="/map" style="text-decoration:none;margin-right:20px;margin-left:10px">签到</router-link>
                <router-link to="/timetable" style="text-decoration:none;">课程表</router-link>
            </div>

            <el-button type="primary" @click="btn" id="btn">
                关闭
            </el-button>
        </dialog>
        <dialog id="library">
            <h3 id="title">图书馆简介</h3>
            <p>教学楼里主要有机房，教室以及实验室，保证学生在机房上课时电脑每人一台，并且教室分为大，中，小间，对于老师多个班级教学也提供了便利，实验室器材丰富，保证学生在做实验时设备先进，更能吸收知识</p>
            <div id="other">
                <router-link to="/library" style="text-decoration:none;">图书馆导航</router-link>
            </div>
            <el-button type="primary" @click="btn1" >
                关闭
            </el-button>
        </dialog>
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