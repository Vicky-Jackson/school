<template>
    <div id="home">

    </div>
</template>

<script>
import Base3d from "../util/Base3d.js";
export default{
    data() {
        return {
            base3d:{}
        }
    },
    mounted(){
        this.base3d = new Base3d('#home');
    }
}
</script>

<style lang="less" scoped>

</style>