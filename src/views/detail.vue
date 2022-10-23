<template>
    <div id="detail">

    </div>
</template>

<script setup>
import Card3d from '../util/Card3d'
import { reactive,onMounted } from "vue";
const data = reactive({
    card3d:{}
})
onMounted(()=>{
    data.card3d = new Card3d('#detail')
})
</script>

<style lang="less" scoped>

</style>