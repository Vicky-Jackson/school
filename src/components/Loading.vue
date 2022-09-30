<template>
    <div>
        <h3>加载进度：{{progress}}%</h3>
    </div>
</template>

<script setup>

let props = defineProps({
    progress: Number,
});
</script>

<style lang="less" scoped>

</style>