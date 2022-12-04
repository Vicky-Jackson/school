<template>
    <div id="work">
        <div id="card" v-for="o in data.msg" :key="o">
        <el-card id="card-item" @click="clickWork(o)">
            <span>{{ o.title }}-{{ o.t_id }}</span>
            <div id="time">
                <span id="time-child">{{ o.startTime }}-{{ o.endTime }}</span>
            </div>
        </el-card>
    </div>
    <el-dialog v-model="data.dialog" title="作业提交" width="800px">
        <span>{{data.click.detail}}</span>
        <commonEditor></commonEditor>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.dialog = false">Cancel</el-button>
                <el-button type="primary" @click="releaseWork">
                    提交
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
import commonEditor from '../components/editor.vue'
import store from '../store/index'
import { ElMessage } from 'element-plus'

const data = reactive({
    address: '',
    msg: [],
    type: '',
    detail:'',
    click: {},
    dialog: false,
    isTrue:false,
})

onMounted(() => {
    axios
        .get("/api/user/getWorkin",
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
const clickWork = (item) => {
    data.click = item;
    axios.get('/api/user/getWorkStudent', {
        params: {
            name: item.tableName,
            id: store.state.userInfo.no
        }
    }).then(res => {
        if (res.data.length > 0) {
            data.isTrue = true;
            ElMessage({
                message: 'Congrats, this is a success message.',
                type: 'success',
            })
        }
    })
    if(data.isTrue == false){
        data.dialog = true;
    }
}
const releaseWork = () => {
   data.dialog = false;
    const time = new Date();
    const endTime = new Date(data.msg.endTime)
    if (time > endTime) {
        alert('不在有效时间！');
        return;
    }
    const message = {
        tableName: data.click.tableName,
        s_id: data.click.s_id,
        s_name: store.state.message.name,
        time: new Date(),
        detail:data.detail
    }
    axios
        .post("/api/user/addWorkin", message)
        .then(res => {
            if (res.status === 200) {
                alert('提交成功')
            }
        })

}
</script>

<style lang="less" scoped>
#work{
    width:100%;
    min-height:100vh;
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