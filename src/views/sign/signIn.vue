<template>
    <div id="sign">
        <div id="el-button">
            <span>历史签到</span>
            <el-button id="btn" color="#626aef" :dark="isDark" @click="dialogFormVisible = true" round>发布签到</el-button>
        </div>
        <div>
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
            <div id="card" v-for="o in data.msg" :key="o" @click="clickCard(o)">
                <el-card id="card-item">
                    <span>{{ o.type }}</span>
                    <div id="time">
                        <span id="time-child">{{ o.startTime }}-{{ o.endTime }}</span>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from "axios"
import store from '../../store/index.js'
import { useRouter } from 'vue-router'

const router = useRouter();
const dialogFormVisible = ref(false)
const value = ref('')
const radio = ref('验证码签到')

const data = reactive({
    pass: '',
    msg: [],
    format: [],
    tableName: '',
    message:[]
})

onMounted(() => {
    axios
        .get("/api/user/getSign", {
            params: {
                id: store.state.userInfo.no
            }
        })
        .then(res => {
            if (res.data.length > 0) {
                res.data.filter(item => {
                    item.startTime = getTime(item.startTime);
                    item.endTime = getTime(item.endTime);
                    data.msg.push(item);
                })
            }
        })
})
const defaultTime = new Date()
let getTime = (time) => {
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
const clickCard = (item) => {
    axios
        .get('/api/user/getSignStudent', {
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
    console.log(data.message)
    sessionStorage.setItem('sign', data.message)
    store.commit('setSignStudent', data.message);
    router.push({ 
        path: '/signDetail'
    });
}
const releaseSign = () => {
    if (radio.value == "验证码签到") {
        if (data.pass == '') {
            alert('请输入验证码');
            return;
        }
    }
    dialogFormVisible.value = false;
    data.format = [getTime(value.value[0]), getTime(value.value[1])];
    let dateTest = data.format[0].split(' ').join('').replace(/[\-/:]/g, "_")
    data.tableName = 'sign_' + radio.value + '_' + store.state.userInfo.username + '_' + dateTest;
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
    let message = {
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
        .then((res) => {
            if (res.status === 200) {
                console.log('添加成功')
            }
        })
    data.pass = '';
}
</script>

<style lang="less" scoped>
#sign {
    min-height: 100vh;
    width: 100%;
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
        color: rgb(107, 89, 89);
    }
}

#el-button {
    width: 100%;
    padding: 5px;

    #btn {
        position: relative;
        left: 82%;
        right: 0;
    }

    span {
        color: rgb(210, 201, 201);
        font-size: 30px;
    }
}
</style>