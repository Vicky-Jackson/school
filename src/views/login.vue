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
import { useRouter } from 'vue-router'
import {
    reactive, onMounted
} from 'vue'
import axios from "axios"
import store from '../store/index.js'
import Loading from "../components/Loading.vue"
const data = reactive({
    login3d: {},
    isLoading: true,
    progress: 0,
    loginData: {
        username: '',
        password: '',
    },
    tableData: []
})
const router = useRouter();

function loadingFinish() {
    data.isLoading = false;
}
onMounted(() => {
    data.login3d = new Login3d('.login', loadingFinish);
    data.login3d.onProgress((e) => {
        let progressNum = e.loaded / e.total;
        progressNum = progressNum.toFixed(2) * 100;
        data.progress = progressNum;
    })
    axios.get('/api/user/getVisited').then(res => {
        console.log(res);
        if (res.data.length > 0) {
            store.commit('setVisited', res.data)
            localStorage.setItem('visited', res.data);
            let params = new Date();
            let params1 = new Date(params.setDate(params.getDate() - 1));
            let isTrue = false;
            params1 = params1.getFullYear() + "-" + (params1.getMonth() + 1) + "-" + (params1.getDate());
            params = params.getFullYear() + "-" + (params.getMonth() + 1) + "-" + params.getDate();
            res.data.filter(item => {
                if (item.time.substr(0, 10) === params1) {
                    isTrue = true;
                    axios.get('/api/user/updateVisited').then(res1 => {
                        console.log(res1);
                    })
                }
            })
            if (isTrue == false) {
                axios.get('/api/user/addVisited').then(res2 => {
                    console.log(res2);
                })
            }
        }
    })
})
const query = () => {
    axios
        .post("/api/user/getUser", data.loginData)
        .then((res) => {
            console.log(res);
            if (res.data.length > 0) {
                store.commit('setUserInfo', res.data[0])
                sessionStorage.setItem('loginData', JSON.stringify(res.data[0]))
                axios
                    .get('/api/user/getMessage', {
                        params: {
                            id: store.state.userInfo.username
                        }
                    })
                    .then(res => {
                        if (res.data.length > 0) {
                            store.commit('setMessage', res.data[0]);
                            sessionStorage.setItem('message', JSON.stringify(res.data[0]))
                            console.log(res.data);
                        }
                    })
                if (res.data[0].role === 'admin') {
                    router.push('/serverhome')
                }
                else {
                    router.push({
                        path: '/'
                    })
                }


            }
            else {
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

    .title {
        color: aliceblue;
        font-size: 40px;
        margin-bottom: 50px;
    }
}
</style>