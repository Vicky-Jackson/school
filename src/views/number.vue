<template>
    <div>
        <div id="number" class="number"></div>
        <div id="tooltip" class="number"></div>
    </div>
</template>

<script>
import China3d from "../util/China3d.js";
export default {
    data() {
        return {
            china3d: {}
        }
    },
    mounted() {
        this.china3d = new China3d('#number');
    }
}
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