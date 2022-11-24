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
        <div>

        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const dialogFormVisible = ref(false)
const value = ref('')
const radio = ref('验证码签到')

const data = reactive({
    pass: '',
    msg: [],
    index: 1,
    format:[]
})
const defaultTime = new Date()

const releaseSign = () => {
    dialogFormVisible.value = false;
    if (radio.value == '验证码签到') {
        data.index = 1;
    }
    else if (radio.value == '位置签到') {
        data.index = 2;
    }
    else if (radio.value == '照相签到') {
        data.index = 3;
    }
    else if (radio.value == '普通签到') {
        data.index = 4;
    }
    data.msg.push({
        title: radio.value,
        time: value.value,
    })
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
        time='YYYY-MM-DD hh:mm:ss';
    }
}
</script>

<style lang="less" scoped>

</style>