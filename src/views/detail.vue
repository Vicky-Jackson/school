<template>
    <div id="detail">
        <el-card>
            <div>id：{{ data.message.id }}</div>
            <div>姓名：{{ data.message.name }}</div>
            <div>性别：{{ data.message.sex }}</div>
            <div>电话：{{ data.message.phone }}</div>
            <div>邮箱：{{ data.message.email }}</div>
            <div>地址：{{ data.message.address }}</div>
            <img :src="data.photo" id="img" />
        </el-card>
    </div>
</template>

<script setup>
import Card3d from '../util/Card3d'
import { reactive, onMounted, inject } from "vue";
import store from '../store/index.js';

const message = store.state.message;

const data = reactive({
    card3d: {},
    message: {},
    photo: ''
})
onMounted(() => {
    data.message = store.state.message;
    //data.card3d = new Card3d('#detail',message);
    if (data.message.photo)
        data.photo = data.message.photo
    else {
        data.photo = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    }
})
</script>

<style lang="less" scoped>
#detail {
    width: 100%;
    height: 100vh;
    color: white;
    font-size: 30px;

    background-color: black;

    .el-card {
        position: relative;
        top: 10px;
        left: 300px;
        width: 600px;
        height: 400px;
        border: 5px solid rgb(42, 42, 174);
        div{
            padding:5px;
        }
    }

    #img {
        position: relative;
        top: -250px;
        left: 69%;
    }
}
</style>