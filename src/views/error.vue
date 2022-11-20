<template>
    <div id="error">

    </div>
</template>

<script setup>
import { onMounted,reactive } from "vue";
import Error3d from '../util/Error3d'
const data = reactive({
    error3d:{}
})
onMounted(()=>{
    data.error3d = new Error3d('#error');
})
</script>

<style lang="less" scoped>

</style>