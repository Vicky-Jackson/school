<template>
    <CommonMenu :message="data.msg" :keys="data.keys" :remove="data.remove" :add="data.add" :edit="data.edit"
        :table="data.table"></CommonMenu>
</template>

<script setup>
import CommonMenu from '../../components/serverMenu.vue'
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { Delete } from '@element-plus/icons-vue';
const data = reactive({
    msg: [],
    keys: [],
    add: '',
    edit: '',
    table: 'users'
})
onMounted(() => {
    data.remove = '/api/user/removeUser'
    data.add = '/api/user/addUser'
    data.edit = '/api/user/editUser'
    axios.get('/api/user/getUserall').then(res => {
        if (res.data.length > 0) {
            res.data.filter(item => {
                delete(item['id'])
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