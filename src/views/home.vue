<template>
    <div id="home">

    </div>
</template>

<script setup>
import Base3d from "../util/Base3d.js";
import { reactive, onMounted } from "vue";
const data = reactive({
    base3d: {},
});

onMounted(() => {
    data.base3d = new Base3d("#home");
});
</script>

<style lang="less" scoped>

</style>