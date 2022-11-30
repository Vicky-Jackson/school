<template>
    <el-card :body-style="{ padding: '0px' }" @click="clickCard">
        <img class='image' src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png">
        <div>
            <span>姓名：{{ message.message.s_name }}</span>
            <div>
                <span>性别：{{ message.message.sex }}</span>
            </div>
        </div>
    </el-card>
</template>

<script setup>
import { provide } from "@vue/runtime-core"
import { useRouter } from 'vue-router'
import store from '../store/index.js'
const message = defineProps({
    message: {}
})
const router = useRouter();
const clickCard = () => {
    store.commit('setMessage', message.message);
    router.push("/card");
}
</script>

<style lang="less" scoped>
.card-item {
    /* background: #fff; */
    width: 25%;
    transition: all 0.5s;
    height: 310px;
}

/* .image{
    width: 100%;
} */
.el-card {
    border: none;
}

span {
    text-align: center;
}
</style>