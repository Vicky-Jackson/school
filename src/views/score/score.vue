<template>
    <div id="score">
        <div style="padding:10px">
            <v-charts :option="option_pie" style="height: 300px; width:400px;float:left"></v-charts>
            <v-charts :option="option_bar" style="height: 250px; width:400px;float:right"></v-charts>
        </div>
        <div class="tableClass"> 
            <el-table :data="tableData" height="250" border style="width: 90%; margin-left:50px" :row-style="rowState">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
            </el-table>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, onMounted } from "vue";
import store from "../../store/index";
import commonEcharts from '../../components/echarts.vue'
const option_pie = {
    title: { text: "Pie Chart" },
    tooltip: {},
    series: [
        {
            type: 'pie',
            data: [
                {
                    value: 335,
                    name: '男'
                },
                {
                    value: 234,
                    name: '女'
                },
            ]
        },
    ],
}
const option_bar = {
    title: { text: "Column Chart" },
    tooltip: {},
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
        {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
        },
    ],
}
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
const rowState = (arg) => {
    return {
        backgroundColor: 'rgba(36, 102, 208)',
        color: 'rgba(179, 223, 17)',
    }
}
const data = reactive({
    msg: []
})
onMounted(() => {
    // axios
    //     .get('/api/user/getScore', {
    //         params: {
    //             t_id:store.state.userInfo.no,
    //         }
    //     })
    //     .then(res=>{
    //         if(res.data.length>0)
    //             res.data.filter(item=>{
    //                 data.msg.push(item);
    //             })
    //     })

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