<template>
    <div id="work">
        <el-button type="primary" @click="dialogFormVisible = true">发布作业</el-button>
        <el-dialog v-model="dialogFormVisible" title="发布作业" width="50%">
            <span>有效时间：</span>
            <el-date-picker v-model="value" type="datetimerange" start-placeholder="Start Date"
                end-placeholder="End Date" :default-time="defaultTime" offset="-100"/>
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
            <el-card id="card-item" @click="workDetail(o)">
                <span>{{o.title}}</span>
                <div id="time">
                    <span id="time-child">{{ o.startTime}}-{{o.endTime}}</span>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { reactive, ref, onMounted } from 'vue'
import store from '../../store'
import { useRouter } from 'vue-router';
const dialogFormVisible = ref(false)
const value = ref('')
const router = useRouter();
const data = reactive({
    workMsg: '',
    msg: [],
    title: '',
    format: [],
    message:[]
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
                    item.startTime = getTime(item.startTime);
                    item.endTime = getTime(item.endTime);
                    data.msg.push(item);
                    
                })
        })
})
let getTime = (time)=>{
    time = new Date(time);
    let commonTime = 'YYYY-MM-DD hh:mm:ss'
    var objs = [
        {
            YYYY: time.getFullYear(),
            MM: time.getMonth() + 1,
            DD: time.getDate(),
            hh: time.getHours(),
            mm: time.getMinutes(),
            ss: time.getSeconds(),
        }
    ]
    // 定义改变后的格式
    for (let obj of objs) {
        for (let x in obj) {
            // 遍历对象 x为key
            if (obj[x] < 10) {
                // 当获取的值小于10 加一个0在前面
                obj[x] = '0' + obj[x]
            }
            commonTime = commonTime.replace([x], obj[x])
            // x 为键 replace[x]值，replace[x]替换成obj[x]
        }
    }
    return commonTime;
}
const workDetail = (item) => {
    axios
        .get('/api/user/getWorkStudent', {
            params: {
                name: item.tableName
            }
        })
        .then(res => {
            if (res.data.length > 0) {
                res.data.filter(item => {
                    item.time = getTime(item.time)
                    data.message.push(item);
                })
            }
        })
    sessionStorage.setItem('work',data.message)
    store.commit('setWorkStudent', data.message);
    router.push({
        name:'workDetail',
    });
}

const release = () => {
    if(data.title==''||data.workMsg==''){
        alert('信息未填写完整')
        return;
    }
    dialogFormVisible.value = false;
    data.format = [getTime(value.value[0]), getTime(value.value[1])];
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
        .post('/api/user/addWork',message)
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
#work {
    width: 100%;
    min-height: 100vh;
    background-color: black;
}
#card {
    // background-color: rgb(40, 36, 36);
    padding: 10px;

    cursor: pointer;

    #card-item {
        background-color: rgb(40, 36, 36);
        color: white;
        border: 2px solid rgb(72, 90, 114);
    }

    #card-item:hover {
        border: 2px solid rgb(132, 132, 132);
    }
}


#time {
    float: right;

    #time-child {
        font-size: 12px;
        color: #999;
    }
}
</style>