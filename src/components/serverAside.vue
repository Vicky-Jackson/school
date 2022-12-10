<template>
    <div>
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="/serverhome"
            text-color="#fff" router>
            <span id="title">学校后台管理系统</span>
            <el-menu-item index="/">
                <el-icon>
                    <location />
                </el-icon>
                <span>前台</span>
            </el-menu-item>
            <el-menu-item index="/serverhome">
                <el-icon>
                    <location />
                </el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/serverstudent">
                <el-icon>
                    <icon-menu />
                </el-icon>
                <span>学生信息管理</span>
            </el-menu-item>
            <el-menu-item index="/serverteacher">
                <el-icon>
                    <document />
                </el-icon>
                <span>老师信息管理</span>
            </el-menu-item>
            <el-menu-item index="/servercourse">
                <el-icon>
                    <document />
                </el-icon>
                <span>课程信息管理</span>
            </el-menu-item>
            <el-menu-item index="/serverscore">
                <el-icon>
                    <setting />
                </el-icon>
                <span>成绩信息管理</span>
            </el-menu-item>
            <el-menu-item index="/serveruser">
                <el-icon>
                    <setting />
                </el-icon>
                <span>登录信息管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup>
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


</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 110vh;
}

.el-menu {
    border: none;
    height: 100vh;

    #title {
        color: rgb(0, 0, 0);
        text-align: center;
        font-size:23px;
        font-weight: 900;
        line-height: 50px;
        margin-bottom: 20px
    }
}
</style>