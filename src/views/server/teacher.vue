<template>
    <CommonMenu :message="data.msg" :keys="data.keys"></CommonMenu>
</template>

<script setup>
import CommonMenu from '../../components/serverMenu.vue'
import { reactive,onMounted } from 'vue';
import  axios  from 'axios';
const data = reactive({
    msg:[],
    keys:[]
})
onMounted(()=>{
    axios.get('/api/user/getTeachers').then(res => {
        if (res.data.length > 0) {
            res.data.filter(item => {
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