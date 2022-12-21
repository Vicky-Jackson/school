<template>
<div id="home">
    <el-card :body-style="{ padding: '0px' }">
        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            class="image" />
        <div style="padding: 14px">
            <div >角色：admin</div>
            <div class="bottom">
                <time class="time">{{ currentDate }}</time>
            </div>
        </div>
    </el-card>  
    <div id="collapse">
        <strong style="padding:2px;font-size:20px">公告</strong>
        <el-collapse v-model="activeName" accordion="true" style="padding:5px">
            <el-collapse-item v-for="item in data.msg" :key="item.id" :title="item.title" :name="item.id">
                <div>{{item.detail}}</div>
                <div id="coltime">{{item.time.substr(0,10)}}</div>
            </el-collapse-item>
        </el-collapse>
    </div>
    <div id="line">
        <v-charts :option="option_line" style="height: 300px; width:100%;"></v-charts>
    </div>
</div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'

const currentDate = ref(new Date())
const activeName = ref('1')
const data = reactive({
    msg:[],
    keyData:[],
    valueData:[]
})
const option_line = {
    title: { text: "浏览量" },
    xAxis: {
        type: 'category',
        data: data.keyData.reverse()
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: data.valueData.reverse(),
            type: 'line'
        }
    ],
    tooltip: {
        trigger: 'axis'
    },
}
onMounted(()=>{
    axios.get('/api/user/getAnouncement').then(res=>{
        if(res.data.length>0){
            data.msg = res.data;
        }
    })
    axios.get('/api/user/getVisited').then(res => {
        if (res.data.length > 0) {
            let j = 0;
            for (let i = res.data.length - 1; i >= 0; i--) {
                if (j >= 7) {
                    break;
                }
                j++;
                let date = new Date(res.data[i].time);
                // let date1 = new Date(date.setDate(date.getDate() + 1));
                date = date.getFullYear() + "-" + (date.getMonth() + 1) + '-' + date.getDate()
                data.keyData.push(date);
                data.valueData.push(res.data[i].number)
            }
            data.keyData = data.keyData.reverse();
            data.valueData = data.valueData.reverse();
        }
    })
})
</script>

<style lang="less" scoped>
.el-card{
    width:600px;
    height:200px;
    .image {
            width: 200px;
            height:200px;
            float:left
        }
}
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#line{
    padding: 10px;
}
.button {
    padding: 0;
    min-height: auto;
}
#collapse{
    width: 400px;
    height:200px;
    position:absolute;
    top:80px;
    left:67%;
    border: 1px solid rgb(42, 41, 41);
    overflow: scroll;
}
#coltime{
    font-size: 12px;
    color: #999;
}
</style>