<template>
    <div id="sign"> 
        <div id="card" v-for="o in data.msg" :key="o">
        <el-card id="card-item" @click="clickSign(o)">
            <span>{{ o.type }}-{{ o.t_id }}</span>
            <div id="time">
                <span id="time-child">{{ o.startTime }}-{{ o.endTime }}</span>
            </div>
        </el-card>
    </div>
    <el-dialog v-model="data.dialog[0]" title="签到">
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.dialog[0] = false">Cancel</el-button>
                <el-button type="primary" @click="releaseSign">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="data.dialog[1]" title="位置签到">
        <common-map @on-address="getAddress" style="width:600px;height:400px"></common-map>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.dialog[1] = false">Cancel</el-button>
                <el-button type="primary" @click="releaseSign">
                    签到
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="data.dialog[2]" title="照相签到">
        <photo @on-photo="getPhoto"></photo>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.dialog[2] = false">Cancel</el-button>
                <el-button type="primary" @click="releaseSign">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="data.dialog[3]" title="验证码签到">
        <el-form label-width="100px" class="demo-ruleForm" :model="data">
            <el-form-item label="请输入验证码">
                <el-input v-model="data.pass"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.dialog[3] = false">Cancel</el-button>
                <el-button type="primary" @click="releaseSign">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>

    </div>
    
</template>

<script setup>
import axios from "axios"
import { BaiduMap } from 'vue-baidu-map-3x'
import { onMounted, ref, reactive } from "vue";
import Photo from '../components/photo.vue'
import commonMap from '../components/map.vue'
import store from '../store/index'
import { ElMessage } from 'element-plus'

const data = reactive({
    address: '',
    msg: [],
    type: '',
    pass: '',
    image: '',
    click: {},
    dialog: [false, false, false, false, false]
})

onMounted(() => {
    axios
        .get("/api/user/getSignin",
            {
                params: {
                    id: store.state.userInfo.no,
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
const clickSign = (item) => {
    data.click = item;
    axios.get('/api/user/getSignStudent', {
        params: {
            tableName: item.tableName,
            id: store.state.userInfo.no
        }
    }).then(res => {
        if (res.data.length > 0) {
            data.dialog[4] = true
            ElMessage({
                message: 'Congrats, this is a success message.',
                type: 'success',
            })
        }
    })

    if (item.type == '普通签到') {
        data.dialog[0] = true
    }
    else if (item.type == '位置签到') {
        data.dialog[1] = true
    }
    else if (item.type == '照相签到') {
        data.dialog[2] = true
    }
    else if (item.type == '验证码签到') {
        data.dialog[3] = true
    }

}

const getAddress = (res) => {
    data.address = res.address;
}

const getPhoto = (image) => {
    data.image = image;
}
const releaseSign = () => {
    if(data.dialog[3] === true){
        if(data.pass !== data.click.number){
            alert('验证码错误');
            return;
        }
    }
    data.dialog.filter(item => item = false);
    const time = new Date();
    const endTime = new Date(data.msg.endTime)
    if (time > endTime) {
        alert('不在有效时间！');
        return;
    }
    const message = {
        tableName: data.click.tableName,
        s_id: data.click.s_id,
        s_name:store.state.message.name,
        time: new Date(),
        address: data.address,
        photo: data.image
    }
    axios
        .post("/api/user/addSignin", message)
        .then(res => {
            if (res.status === 200) {
                alert('签到成功')
            }
        })

}
</script>

<style lang="less" scoped>
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
#sign{
    width:100%;
    height: 100vh;
    background-color: black;
}
</style>