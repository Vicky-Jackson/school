<template>
    <div id="base">
        
    </div>
    
</template>

<script setup>
import Base3d from '../util/Base3d'
import { reactive, onMounted } from 'vue'
const data = reactive({
    base3d: {}
})
onMounted(() => {
    data.base3d = new Base3d('#base')
})

</script>

<style lang="less" scoped>
#base {
    position: absolute;
    top: 150px;
    left: 880px
}
</style>