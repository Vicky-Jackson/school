<template>
    <div>
        <div id="number" class="number">
        </div>
        <div id="tooltip" class="number"></div>
    </div>
</template>

<script setup>
import Base3d from "../util/China3d.js";
import { reactive, onMounted } from "vue";
const data = reactive({
    base3d: {},
});

onMounted(() => {
    data.base3d = new Base3d(".number");
});
</script>

<style lang="less" scoped>
#tooltip {
    position: absolute;
    width: auto;
    height:auto;
    z-index: 2;
    background: white;
    padding: 10px;
    border-radius: 2px;
    visibility: hidden;
}
</style>