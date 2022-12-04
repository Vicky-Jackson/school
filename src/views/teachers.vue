<template>
    <div class="nav">
        <el-space wrap>
            <card v-for="(teacher, o) in data.message" :key="o" :message="teacher">
            </card>
        </el-space>
    </div>
</template>

<script setup>
import Card from '../components/card.vue'
import axios from 'axios'
import { reactive, onMounted } from 'vue';

const data = reactive({
    message: {}
})
axios
    .get('/api/user/getTeachers', {})
    .then((res) => {
        data.message = res.data;
    });
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
</style>