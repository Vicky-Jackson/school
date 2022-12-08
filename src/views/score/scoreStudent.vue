<template>
    <div id="score">
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
    axios
        .get('/api/user/getScore', {
            params: {
                s_id:store.state.userInfo.no,
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