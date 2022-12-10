<template>
    <div id="score">
        <div style="padding:10px">
            <v-charts :option="option_pie" style="height: 300px; width:400px;float:left"></v-charts>
            <v-charts :option="option_bar" style="height: 250px; width:400px;float:right"></v-charts>
        </div>
        <div class="tableClass"> 
            <el-table :data="data.msg" height="250" border style="width: 90%; margin-left:50px" :row-style="rowState">
                <el-table-column prop="c_id" label="课程id" width="180" />
                <el-table-column prop="course_name" label="课程名" width="180" />
                <el-table-column prop="s_id" label="学生id" width="180" />、
                <el-table-column prop="s_name" label="学生姓名" width="180" />
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

const data = reactive({
    msg: [],
    pieData: [
        {
            value: 0,
            name: "及格"
        },
        {
            value: 0,
            name: "不及格"
        }
    ],
    barData:[0,0,0,0,0]
})
const option_pie = {
    title: { text: "及格率" },
    tooltip: {},
    series: [
        {
            type: 'pie',
            data: data.pieData
        },
    ],
}
const option_bar = {
    title: { text: "各分数段学生" },
    tooltip: {},
    xAxis: {
        data: [">90", "80-90", "70-80", "60-70", "<60"],
    },
    yAxis: {},
    series: [
        {
            name: "人数",
            type: "bar",
            data: data.barData
        },
    ],
}
const rowState = (arg) => {
    return {
        backgroundColor: 'rgba(36, 102, 208)',
        color: 'rgba(179, 223, 17)',
    }
}

onMounted(() => {
    axios
        .get('/api/user/getScore', {
            params: {
                t_id: store.state.userInfo.username,
            }
        })
        .then(res=>{
            if(res.data.length>0)
                res.data.filter(item=>{
                    if(item.score > 90){
                        data.barData[0]++;
                        data.pieData[0].value++;
                    }
                    else if(item.score <=90 && item.score >80){
                        data.barData[1]++;
                        data.pieData[0].value++;
                    }
                    else if (item.score <= 80 && item.score > 70) {
                        data.barData[2]++;
                        data.pieData[0].value++;
                    }
                    else if (item.score > 60 && item.score <= 70){
                        data.barData[3]++;
                        data.pieData[0].value++;
                    }
                    else{
                        data.barData[4]++;
                        data.pieData[1].value++;
                    }
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
.tableClass{
   
}

</style>