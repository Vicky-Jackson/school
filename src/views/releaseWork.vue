<template>
    <div id="sign">
        <el-button type="primary" @click="dialogFormVisible = true">发布作业</el-button>
        <el-divider />
        <el-dialog v-model="dialogFormVisible" title="发布作业" width="50%">
            <span>有效时间：</span>
            <el-date-picker v-model="data.value" type="datetimerange" start-placeholder="Start Date"
                end-placeholder="End Date" :default-time="defaultTime" />
            <div style="margin-top: 20px;margin-bottom: 20px">
                <el-form label-width="100px" class="demo-ruleForm" :model="data">
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
        <div id="card" v-for="o in 2" :key="o">
            <el-card shadow="hover">
                <span>11.25验证码签到</span>
                <div id="time">
                    <span id="time-child">2022.11.25 12:00:00-2022.11.25 12:03:00</span>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const dialogFormVisible = ref(false)
const radio = ref('验证码签到')

const data = reactive({
    workMsg: '',
    msg: {},
    value: ''
})
const defaultTime = new Date()

const release = () => {
    dialogFormVisible.value = false;
    
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