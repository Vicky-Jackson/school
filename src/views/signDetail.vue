<template>
    <div id="sign_detail">
        <div v-if="data.empty === true">
            <em>还无人签到</em>
        </div>
        <div v-else style="padding:10px;margin-left:100px">
        <el-space wrap>
            <el-card v-for="item in data.msg" :key="item" class="box-card">
                <img v-if="data.msg.photo" :src="data.msg.photo">
                <span>{{data.msg.s_name}}</span>
                <span>{{data.msg.time}}</span>
            </el-card>
        </el-space>
        </div>
    </div>
</template>

<script setup>
import store from '../store/index'
import {onMounted,reactive,ref} from 'vue'


const currentDate = ref(new Date())
const data = reactive({
    msg:[],
    empty:false
})

onMounted(()=>{
    data.msg = store.state.signStudent;
    if(data.msg.length === 0)
        data.empty = true
})
</script>

<style lang="less" scoped>
#sign_detail{
    width:100%;
    height:100vh;
    background-color: black;
}
em{
    color:rgb(109, 67, 67);
    font-size:32px;
    
}
</style>