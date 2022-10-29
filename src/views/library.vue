<template>
    <div id="library">

    </div>
</template>

<script setup>
import Library3d from '../util/Library3d'
import { reactive, onMounted } from 'vue'
const data = reactive({
    library3d: {}
})
onMounted(() => {
    data.library3d = new Library3d('#library')
})
</script>

<style lang="less" scoped>

</style>