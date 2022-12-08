<template>
    <el-card  @click="clickCard">
        <img class='image' src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png">
        <div id="message">
            <div>
                <span>姓名：{{ message.message.s_name || message.message.name }}</span>
            </div>
            <div>
                <span>性别：{{ message.message.sex }}</span>
            </div>
        </div>
    </el-card>
    <el-dialog v-model="dialogForm">
        <div>
            <span>班级：{{ message.message.class }}</span>
        </div>
        <div>
            <span>课程：{{ message.message.course_name }}</span>
        </div>
        <div>
            <span>电话：{{ message.message.phone }}</span>
        </div>
        <div>
            <span>邮箱：{{ message.message.phone }}</span>
        </div>
    </el-dialog>
</template>

<script setup>
import { provide, ref } from "@vue/runtime-core"
import { useRouter } from 'vue-router'
import store from '../store/index.js'
const message = defineProps({
    message: {}
})
let dialogTitle = ref(false)
const router = useRouter();
const clickCard = () => {
    dialogTitle.value = true
}
</script>

<style lang="less" scoped>
/* .image{
    width: 100%;
} */
.el-card {
    width:300px;
    height:200px;
    border: none;
    color:white;
    cursor: pointer;
    background-color: rgb(39, 42, 46);
}
#message{
    position: relative;
    top:-100px;
    left:50%;

    div{
        padding: 5px;
    }
}
</style>