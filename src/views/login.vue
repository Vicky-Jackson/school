<template>
    <div v-show="data.isLoading">
        <loading :progress="data.progress"></loading>
    </div>
    <div v-show="!data.isLoading">
        <div id="login" class="login"></div>
        <div id="page" class="login">
            <h2 class="title">欢迎智慧校园管理系统</h2>
            <el-form label-width="100px" class="demo-ruleForm" :model="data">
                <el-form-item label="用户名">
                    <el-input v-model="data.loginData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="data.loginData.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">登录</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script setup>
import Login3d from '../util/Login3d'
import {useRouter} from 'vue-router'
import {
    reactive, onMounted
} from 'vue'
import axios from "axios"
import store from '../store/index.js'
import Loading from "../components/Loading.vue"
const data = reactive({
    login3d: {},
    isLoading:true,
    progress:0,
    loginData:{
        username:'',
        password:'',
    }
})
const router = useRouter();

function loadingFinish(){
    data.isLoading=false;
}
onMounted(() => {
    data.login3d = new Login3d('.login',loadingFinish);
    data.login3d.onProgress((e)=>{
        let progressNum = e.loaded / e.total;
        progressNum = progressNum.toFixed(2) * 100;
        data.progress = progressNum;
    })
})
const query = ()=>{
    axios
        .get("/api/user/getUser", 
        {params:{
            username: data.loginData.username,
            password: data.loginData.password
        }})
        .then((res) => {
            if (res.data.length > 0) {
                
                store.commit('setUserInfo', res.data[0])
                sessionStorage.setItem('loginData', JSON.stringify(res.data[0]))
                //跳转到  /index  页面
                console.log(store.state.userInfo.username);
                router.push({
                    path: '/'
                })
            }
            else{
                alert("用户名或密码错误！");
            }
        })
        .catch((error) => {
            alert(error);
        });
}
</script>

<style lang="less" scoped>
#login {
    width: 100vw;
    height: 100vh;
}

#page {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 30%;
    left: 15%;
    .title{
        color: aliceblue;
        font-size: 40px;
        margin-bottom: 50px;
    }
}
</style>