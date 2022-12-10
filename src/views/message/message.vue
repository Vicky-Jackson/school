<template>
    <div class="nav">
            <el-space wrap :size="10" >
                <el-card v-for="(student, o) in data.message" :key="o" @click="clickCard(student)">
                    <img class='image' src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png">
                    <div id="message">
                        <div>
                            <span>姓名：{{student.s_name}}</span>
                        </div>
                        <div>
                            <span>性别：{{ student.sex}}</span>
                        </div>
                    </div>
                </el-card>
            </el-space>
            <el-dialog v-model="dialogForm">
                <div>
                    <span v-if="data.click.class">班级：{{ data.click.class }}</span>
                    <span v-else>住址：{{ data.click.address }}</span>
                </div>
                <div>
                    <span v-if="data.click.course_name">课程：{{ data.click.course_name }}</span>
                </div>
                <div>
                    <span>电话：{{ data.click.phone }}</span>
                </div>
                <div>
                    <span>邮箱：{{ data.click.email }}</span>
                </div>
            </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios'
import { reactive, onMounted } from 'vue';
import store from '../../store';

const data = reactive({
    message: [],
    dialogForm:false,
    click:{}
})
onMounted(()=>{
    if(store.state.userInfo.role == 'admin'){
        axios.get('/api/user/getStudents',{}).then(res=>{
            if(res.data.length > 0){
                data.message = res.data;
            }
        })
    }
    else{
        axios.get('/api/user/getCourseStudent',{
            params:{
                role:'teacher',
                id: store.state.userInfo.username
            }
        }).then(res => {
            if (res.data.length > 0) {
                data.message = res.data;
            }
        })
    }
})
const clickCard = (item) => {
    data.click = item
    data.dialogForm=true;
    
}
</script>

<style lang="less" scoped>
// .w {
//     width: 1220px;
//     margin: 0 auto;
// }

.nav {
    // height: 60px;
    // line-height: 60px;
    width:100%;
    min-height:100vh;
    background-color: black;
    padding:10px;
    >div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .goods-box {
        overflow: hidden;

        >div {
            float: left;

        }
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
</style>