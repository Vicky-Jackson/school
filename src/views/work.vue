<template>
    <div id="work">
        <div>
            <h1>作业描述</h1>
        </div>
        <div>{{data.msg}}</div>
        <el-divider />
        <editor></editor>
        <div style="margin-left:10px">
            <el-button type="primary" @click="commitWork" id="btn">提交作业</el-button>
        </div>
        
    </div>
</template>

<script setup>
import { reactive,onMounted } from 'vue';
import Editor from '../components/editor.vue' 
const data = reactive({
    msg:'aaaa'
})
const commitWork = ()=>{

}
</script>

<style lang="less" scoped>

</style>