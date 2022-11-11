<template>
    <div id="detail">

    </div>
</template>

<script setup>
import Card3d from '../util/Card3d'
import { reactive,onMounted, inject } from "vue";
import store from '../store/index.js';

const message = store.state.message;

const data = reactive({
    card3d:{}
})
onMounted(()=>{
    data.card3d = new Card3d('#detail',message);
})
</script>

<style lang="less" scoped>

</style>