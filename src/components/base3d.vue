<template>
    <div>
        <el-popover placement="bottom" :width="200" trigger="click" offset="-150"
            content="有什么可以帮到您？">
            <template #reference>
                <div id="base">
                </div>
            </template>
        </el-popover>
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

const clickModel = () => {

}
</script>

<style lang="less" scoped>
#base {

    position: absolute;
    top: 200px;
    left: 860px
}

</style>