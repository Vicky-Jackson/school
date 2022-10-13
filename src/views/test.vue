<template>
    <div id="test">

    </div>
</template>

<script setup>
import test3d from '../util/test3d'
import { reactive, onMounted } from 'vue'
const data = reactive({
    test3d:{}
})
onMounted(()=>{
    data.test3d = new test3d('#test')
})
</script>

<style lang="less" scoped>

</style>