<template>
    <div id="sign">
        <el-button type="primary" @click="dialogFormVisible = true">发布作业</el-button>
        <el-dialog v-model="dialogFormVisible" title="发布作业" width="50%">
            <span>有效时间：</span>
            <el-date-picker v-model="value" type="datetimerange" start-placeholder="Start Date"
                end-placeholder="End Date" :default-time="defaultTime" />
            <div style="margin-top: 20px;margin-bottom: 20px">
                <el-form label-width="100px" class="demo-ruleForm" :model="data">
                    <el-form-item label="作业题目">
                        <el-input v-model="data.title"></el-input>
                    </el-form-item>
                    <el-form-item label="作业描述">
                        <el-input v-model="data.workMsg"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="release">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <div id="card" v-for="o in data.msg" :key="o">
            <el-card shadow="hover">
                <span>{{o.title}}</span>
                <div id="time">
                    <span id="time-child">{{o.startTime}}-{{o.endTime}}</span>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { reactive, ref, onMounted } from 'vue'
import store from '../store'

const dialogFormVisible = ref(false)
const value = ref('')

const data = reactive({
    workMsg: '',
    msg: [],
    title: '',
    format: []
})
const defaultTime = new Date()
onMounted(() => {
    axios
        .get('/api/user/getWork',{
            params:{
                id:store.state.userInfo.no
            }
        })
        .then(res=>{
            if(res.data.length>0)
                res.data.filter(item=>{
                    data.msg.push(item)
                })
        })
})
const release = () => {
    if(data.title==''||data.workMsg==''){
        alert('信息未填写完整')
        return;
    }
    dialogFormVisible.value = false;
    const date = [new Date(value.value[0]), new Date(value.value[1])];
    data.format = [];
    let time = 'YYYY-MM-DD hh:mm:ss'
    var objs = [
        {
            YYYY: date[0].getFullYear(),
            MM: date[0].getMonth() + 1,
            DD: date[0].getDate(),
            hh: date[0].getHours(),
            mm: date[0].getMinutes(),
            ss: date[0].getSeconds(),
        },
        {
            YYYY: date[1].getFullYear(),
            MM: date[1].getMonth() + 1,
            DD: date[1].getDate(),
            hh: date[1].getHours(),
            mm: date[1].getMinutes(),
            ss: date[1].getSeconds(),
        },
    ]
    // 定义改变后的格式
    for (let obj of objs) {
        for (let x in obj) {
            // 遍历对象 x为key
            if (obj[x] < 10) {
                // 当获取的值小于10 加一个0在前面
                obj[x] = '0' + obj[x]
            }
            time = time.replace([x], obj[x])
            // x 为键 replace[x]值，replace[x]替换成obj[x]
        }
        data.format.push(time);
        time = 'YYYY-MM-DD hh:mm:ss';
    }
    let dateTest = data.format[0].split(' ').join('').replace(/[\-/:]/g, "_")
    data.tableName = 'work_' + data.title + '_' + store.state.userInfo.username + '_' + dateTest;
    axios
        .post("/api/user/createWork", { name: data.tableName })
        .then((res) => {
            if (res.status === 200)
                alert('发布成功');
            else
                alert('错误！')
        })
        .catch(error => {
            alert(error);
        })
    let message = {
        t_id: store.state.userInfo.no,
        title:data.title,
        startTime: data.format[0],
        endTime: data.format[1],
        detail: data.workMsg,
        tableName: data.tableName
    }
    data.msg.push(message)
    axios
        .post('/api/user/addeWork',message)
        .then(res=>{
            if(res.status === 200)
                alert('success')
        })
        .catch(error => {
            alert(error);
        })
}
</script>

<style lang="less" scoped>
#card {
    padding: 10px;
    cursor: pointer;
}

#time {
    float: right;

    #time-child {
        font-size: 12px;
        color: #999;
    }
}
</style>