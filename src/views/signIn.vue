<template>
    <div id="sign">
        <el-button type="primary" @click="dialogFormVisible = true">发布签到</el-button>
        <el-divider />
        <el-dialog v-model="dialogFormVisible" title="发布签到" width="50%">
            <span>有效时间：</span>
            <el-date-picker v-model="value" type="datetimerange" start-placeholder="Start Date"
                end-placeholder="End Date" :default-time="defaultTime" offset="-100" />
            <div style="margin-top: 20px;margin-bottom: 20px">
                <el-radio-group v-model="radio">
                    <el-radio-button label="验证码签到" />
                    <el-radio-button label="位置签到" />
                    <el-radio-button label="照相签到" />
                    <el-radio-button label="普通签到" />
                </el-radio-group>
            </div>
            <div>
                <div v-if="radio == '验证码签到'">
                    <el-form label-width="100px" class="demo-ruleForm" :model="data">
                        <el-form-item label="请输入验证码">
                            <el-input v-model="data.pass"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="releaseSign">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <div id="card" v-for="o in data.msg" :key="o">
            <el-card shadow="hover">
                <span>{{o.type}}</span>
                <div id="time">
                    <span id="time-child">{{o.startTime}}-{{ o.endTime }}</span>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from "axios"
import store from '../store/index.js'

const dialogFormVisible = ref(false)
const value = ref('')
const radio = ref('验证码签到')

const data = reactive({
    pass: '',
    msg: [],
    format: [],
    tableName:''
})

onMounted(() => {
    axios
        .get("/api/user/getSign",{
            params:{
                id:store.state.userInfo.no
            }
        })
        .then(res =>{
            if(res.data.length>0){
                res.data.filter(item =>{
                    data.msg.push(item);
                })
            }
        })
})
const defaultTime = new Date()

const releaseSign = () => {
    if(radio.value=="验证码签到"){
        if(data.pass==''){
            alert('请输入验证码');
            return;
        }     
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
    let dateTest = data.format[0].split(' ').join('').replace(/[\-/:]/g,"_")
    data.tableName = 'sign_' + radio.value + '_' + store.state.userInfo.username + '_'+dateTest ;
    axios
        .post("/api/user/createSign", { name: data.tableName })
        .then((res) => {
            if (res.status === 200)
                alert('发布成功');
            else
                alert('错误！')
        })
        .catch(error => {
            alert(error);
        })
        let message={
            type: radio.value,
            t_id: store.state.userInfo.no,
            startTime: data.format[0],
            endTime: data.format[1],
            number: data.pass,
            tableName: data.tableName
        }
        data.msg.push(message)
    axios
        .post("/api/user/addSign", message)
        .then((res)=>{
            if (res.status === 200){
                console.log('添加成功')
            }
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