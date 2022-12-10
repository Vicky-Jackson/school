<template>
    <div id="timetable">

    </div>
</template>

<script setup>
import test3d from '../../util/test3d'
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import store from '../../store'
const data = reactive({
    test3d: {},
    msg:[]
})

onMounted(() => {
    axios.get('/api/user/getCourseStudent', {
        params: {
            role: store.state.userInfo.role,
            id: store.state.userInfo.username
        }
    }).then(res => {
        if (res.data.length > 0) {
            data.test3d = new test3d('#timetable', res.data)
        }
    }) 
       
})
</script>

<style lang="less" scoped>
#timetable{
    width: 400px;
    height: 500px;
}
</style>