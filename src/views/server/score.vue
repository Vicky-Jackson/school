<template>
    <CommonMenu :message="data.msg" :keys="data.keys" :remove="data.remove" :add="data.add" :edit="data.edit"
        :table="data.table" />
</template>

<script setup>
import CommonMenu from '../../components/serverMenu.vue'
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
let msg = ref([])
const data = reactive({
    msg: [],
    keys: [],
    remove: '',
    add: '',
    edit: '',
    table: 'score'
})
onMounted(() => {
    data.remove = '/api/user/removeScore'
    data.add = '/api/user/addScore'
    data.edit = '/api/user/updateScore'
    axios.get('/api/user/getScore').then(res => {
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