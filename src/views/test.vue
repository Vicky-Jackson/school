<template>
  <div id="course">
    <div id="card" v-for="(item) in data.courses" :key="item">
      <el-card>
        <span>{{ item.course_name }}-{{ item.time }}</span>
        <el-popconfirm title="确定选择这门课吗？选课后不可更改！" @confirm="handleComfirm(item)">
          <template #reference>
            <el-button type="danger">选课</el-button>
          </template>
        </el-popconfirm>
        
      </el-card>
    </div>
    <div @click="drawer = true" id="right">
      <span v-if="drawer === false">已有课程信息</span>
      <el-icon :size="18">
        <Back />
      </el-icon>
    </div>
    
    <el-drawer v-model="drawer" title="已有课程信息">
      <el-table id="exportTab" :data="data.msg" stripe style="width: 100%" height="450">
        <el-table-column prop="course_name" label="课程名称"></el-table-column>
        <el-table-column prop="time" label="上课时间"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
      </el-table>
    </el-drawer>
  </div>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Back } from '@element-plus/icons-vue';
import axios from 'axios';
import store from '../store';
// import { ElMessage } from 'element-plus';
const drawer = ref(false)
const clickDrawer = ref(false)
const data = reactive({
  msg: [],
  courses:[],
  message:[],
})
onMounted(() => {

  axios.get('/api/user/getCourseStudent', {
    params: {
      role: store.state.userInfo.role,
      id: store.state.userInfo.username
    }
  }).then(res => {
    if (res.data.length > 0) {
      res.data.filter(item=>{
        let time = item.time.split('');
        item.time = "周"+time[0]+"("+time[1]+")"
        data.msg.push({
          course_name:item.course_name,
          time:item.time,
          type:item.type
        });
      })
    }
  })

  axios.get('/api/user/getCourse', {
    params: {
      system: store.state.message.system,
      id: store.state.userInfo.username
    }
  }).then(res => {
    if (res.data.length > 0) {
      res.data.filter(item => {
        let time = item.time.split('');
        item.time = "周" + time[0] + "(" + time[1] + ")"
         data.courses.push(item);
      })
    }
  })
})
const handleComfirm = (item)=>{
  var really = false;
  data.msg.filter(index=>{
    if(index.time === item.time){
      really = true;
      ElMessage.error("与已有课程时间撞上！")
    }
  })
  if(really === false){
    axios.post('/api/user/addScore',{
      s_id:store.state.userInfo.username,
      c_id:item.c_id
    }).then(res=>{
      if(res.status === 200){
        data.msg.push({
          course_name: item.course_name,
          time: item.time,
          type: item.type
        });
        data.courses.map((item1,index)=>{
          if(item.course_name === item1.course_name){
            data.courses.splice(index,1);
          }
        })
        ElMessage.success("选择成功！")
      }
    })
  }
}
</script>


<style lang="less" scoped>
#course {
  width: 100%;
  min-height: 100vh;
  background-color: black;
}
#card{
  padding:10px;

  .el-button{
    position: relative;
    left:85%
  }
}
#right {
  color: white;
  width: 20px;
  height: 150px;
  background-color: blue;
  cursor: pointer;
  position: fixed;
  top: 200px;
  left: 98.5%
}
</style>