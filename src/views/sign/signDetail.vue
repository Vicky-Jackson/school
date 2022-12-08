<template>
    <div id="sign_detail">
        <div v-if="data.empty === true">
            <em>还无人签到</em>
        </div>
        <div v-else >
        <el-space wrap>
            <el-card v-for="item in msg" :key="item" class="box-card" @click="clickCard(item)">
                <span>{{item.s_name}}</span>
                <span>{{item.time}}</span>
            </el-card>
        </el-space>
        </div>
        <el-dialog v-model="data.dialogFormVisible" title="签到详情" width="50%">
            <div>
                <img v-if="data.click.photo != '' " :src="data.click.photo">
                <div>{{data.click.s_name}}</div>
                <div v-if="data.click.adress != ''">{{data.click.address}}</div>
                <div>{{data.click.time}}</div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import store from '../../store/index'
import {onMounted,reactive,ref} from 'vue'


const currentDate = ref(new Date())
const msg = ref(store.state.signStudent)

const data = reactive({
    msg:[],
    empty:false,
    dialogFormVisible:false
})

onMounted(()=>{
})
const clickCard = (item)=>{
    data.click = item;
    data.dialogFormVisible = true
}
</script>

<style lang="less" scoped>
#sign_detail{
    width:100%;
    min-height:100vh;
    background-color: black;
}
em{
    color:rgb(109, 67, 67);
    font-size:32px;
    
}
.box-card{
    cursor: pointer;
}
</style>