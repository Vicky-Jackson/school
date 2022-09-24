<template>
    <div>
        <div id="login"></div>
        <div class="page">
            <h2 class="title">欢迎智慧校园管理系统</h2>
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名">
                    <el-input v-model="input"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="pass" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script setup>
import Login3d from "../util/Login3d.js";
import { reactive, onMounted ,ref} from "vue";
const input=ref('');
const pass = ref('');
const data = reactive({
    login3d: {},
});
onMounted(() => {
    data.login3d = new Login3d("#login");
});
</script>

<style lang="less" scoped>
#login {
    width: 100vw;
    height: 100vh;
}

.page {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 30%;
    left: 15%;
    background-color: black;
    .title{
        color: aliceblue;
        font-size: 40px;
        margin-bottom: 50px;
    }
}
</style>