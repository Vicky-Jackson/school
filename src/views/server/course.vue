<template>
    <CommonMenu :message="data.msg" :keys="data.keys" :remove="data.remove" :add="data.add" :edit="data.edit"
        :table="data.table"></CommonMenu>
</template>

<script setup>
import CommonMenu from '../../components/serverMenu.vue'
import { reactive, onMounted } from 'vue';
import axios from 'axios';
const data = reactive({
    msg: [],
    keys: [],
    add: '',
    edit: '',
    table: 'course'
})
onMounted(() => {
    data.remove = '/api/user/removeCourse'
    data.add = '/api/user/addCourse'
    data.edit = '/api/user/editCourse'
    axios.get('/api/user/getCourse').then(res => {
        if (res.data.length > 0) {
            res.data.filter(item => {
                item.time = item.time.split('');
                item.time = "周" + item.time[0] + "(" + item.time[1] + ")"
                data.msg.push(item)
                if (data.keys.length == 0) {
                    Object.keys(item).forEach(key => {
                        data.keys.push(key)
                    })
                }
            })
        }
    })
})
</script>

<style lang="less" scoped>

</style>