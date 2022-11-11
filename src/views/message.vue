<template>
    <div class="nav">
        <div class="goods-box w">
            <card v-for="(student,o) in data.message" :key="o" :message="student">
            </card>
        </div>
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
.get('/api/user/getStudents', {})
.then((res) => { 
    data.message = res.data;
    });
</script>

<style lang="less" scoped>
.w {
    width: 1220px;
    margin: 0 auto;
}

.nav {
    height: 60px;
    line-height: 60px;

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
</style>