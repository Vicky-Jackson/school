<template>
    <div class="nav">
        <div id="input">
            <el-input v-model="data.input" placeholder="请输入姓名" clearable  @input="handleSelect" :suffix-icon="Search"></el-input>
        </div>
        <el-space wrap>
        <el-card v-for="(teacher, o) in data.input === '' ? data.message : data.results" :key="o" @click="clickCard(teacher)">
            <el-image style="width: 120px; height: 120px"
                :src="teacher.t_photo ? teacher.t_photo : 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'" />
            <div id="message">
                <div>
                    <span>姓名：{{ teacher.name }}</span>
                </div>
                <div>
                    <span>性别：{{ teacher.t_sex || teacher.sex}}</span>
                </div>
            </div>
        </el-card>
        </el-space>
        <el-dialog v-model="data.dialogForm">
            <div>
                <span v-if="data.click.phone || data.click.t_phone">电话：{{ data.click.phone || data.click.t_phone }}</span>
            </div>
            <div>
                <span v-if="data.click.course_name">课程：{{ data.click.course_name }}</span>
                
            </div>
            <div>
                <span v-if="data.click.email || data.click.t_email">邮箱：{{ data.click.email || data.click.t_email }}</span>
            </div>
            <div>
                <span v-if="data.click.address">住址：{{ data.click.address }}</span>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios'
import { reactive, onMounted } from 'vue';
import store from '../../store';
import { Search } from '@element-plus/icons-vue';
const data = reactive({
    message: [],
    click:{},
    dialogForm:false,
    photo:[],
    input:"",
    results:[]
})
onMounted(()=>{
    if (store.state.userInfo.role == 'admin') {
        axios.get('/api/user/getTeachers', {}).then(res => {
            if (res.data.length > 0) {
                res.data.filter(item=>{
                    data.message.push(item);
                })
            }
        })
    }
    else {
        axios.get('/api/user/getCourseStudent', {
            params: {
                role: 'student',
                id: store.state.userInfo.username
            }
        }).then(res => {
            if (res.data.length > 0) {
                res.data.filter(item => {
                    data.message.push(item);
                })
            }
        })
    }
})
const clickCard = (item) => { 
    data.click = item
    data.dialogForm = true;
}

const handleSelect = () => {
    data.results = data.message.filter(item => {
        return item.name.includes(data.input);
    })
}
</script>

<style lang="less" scoped>
.nav {
    // height: 60px;
    // line-height: 60px;
    width: 100%;
    min-height: 100vh;
    background-color: black;
    padding: 10px;

    >div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
}
.el-card {
    width: 300px;
    height: 200px;
    border: none;
    color: white;
    cursor: pointer;
    background-color: rgb(39, 42, 46);
}

#message {
    position: relative;
    top: -100px;
    left: 50%;

    div {
        padding: 5px;
    }
}
#input{
    width: 200px;
    margin-bottom: 10px;
    position: relative;
    left:80%;
}
</style>