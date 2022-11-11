<template>
    <div id="library">
        <div id="aside">
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
            text-color="#fff" @open="handleOpen" @close="handleClose">
            <h3>图书馆文学分类</h3>
            <el-menu-item index="1">
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>文学类</span>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon>
                    <icon-menu />
                </el-icon>
                <span>历史类</span>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon>
                    <document />
                </el-icon>
                <span>工科类</span>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <setting />
                </el-icon>
                <span>环境科学类</span>
            </el-menu-item>
        </el-menu>
        </div>
        
    </div>
</template>

<script setup>
import Library3d from '../util/Library3d'
import { reactive, onMounted } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
const data = reactive({
    library3d: {}
})
onMounted(() => {
    data.library3d = new Library3d('#library')
})
</script>

<style lang="less" scoped>
#aside{
    position:absolute;

}
</style>