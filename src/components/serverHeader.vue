<template>
    <div style="padding:10px" @click="data.dialog = true">
        <el-button type="primary" >发布公告</el-button>
    </div>
    
<div id="avatar">
    <el-dropdown>
        <el-avatar :size="50">admin</el-avatar>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="clickQuit">退出</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</div>

<el-dialog v-model="data.dialog" title="发布公告">
    <el-form label-width="100px" class="demo-ruleForm" :model="data">
        <el-form-item label="公告题目">
            <el-input v-model="data.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
            <el-input type="textarea" v-model="data.detail"></el-input>
        </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="data.dialog[1] = false">Cancel</el-button>
            <el-button type="primary" @click="handleAnounce">
                发布
            </el-button>
        </span>
    </template>
</el-dialog>
</template>

<script setup>
import axios from 'axios'
import {reactive} from 'vue'
import store from '../store'
import { useRouter } from 'vue-router';
const router = useRouter();
const data = reactive({
    title:'',
    detail:'',
    dialog:false
})
const handleAnounce = ()=>{
    axios.post('/api/user/addAnouncement',{title:data.title,detail:data.detail})
    .then(res=>{
        if(res.status === 200){
            alert('发布成功')
        }
    })
}
const clickQuit = () => {
    store.commit('setUserInfo', {});
    store.commit('setMessage', {});
    router.push('/login')
}
</script>

<style lang="less" scoped>
#avatar {
    position: absolute;
    top:2px;
    left: 93%;

    .el-avatar {
        background-color: rgba(0, 13, 255, 0.669);
        cursor: pointer;
    }
}
</style>