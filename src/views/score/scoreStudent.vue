<template>
    <div id="score">
        <div class="tableClass">
            <el-table :data="data.msg" border style="width: 90%; margin-left:50px" :row-style="rowState">
                <el-table-column prop="c_id" label="课程id" width="180" />
                <el-table-column prop="course_name" label="课程" width="180" />
                <el-table-column prop="name" label="任课老师" width="180" />
                <el-table-column prop="score" label="成绩" />
            </el-table>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, onMounted } from "vue";
import store from "../../store/index";
import commonEcharts from '../../components/echarts.vue'

const rowState = (arg) => {
    return {
        backgroundColor: 'rgba(36, 102, 208)',
        color: 'rgba(179, 223, 17)',
    }
}
const data = reactive({
    msg: [],
    
})
onMounted(() => {
    axios
        .get('/api/user/getScore', {
            params: {
                s_id: store.state.userInfo.username,
            }
        })
        .then(res=>{
            if(res.data.length>0)
                res.data.filter(item=>{
                    data.msg.push(item);
                })
        })
})
</script>

<style lang="less" scoped>
#score {
    width: 100%;
    min-height: 100vh;
    background-color: black;
}

.tableClass {
    padding:10px ;
}
</style>