<template>
<div id="avatar">
    <el-dropdown>
        <el-avatar :size="50">admin</el-avatar>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="clickQuit">退出</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</div>
</template>

<script>

</script>

<style lang="less" scoped>
#avatar {
    padding: 5px;
    position: relative;
    left: 970px;

    .el-avatar {
        background-color: rgba(0, 13, 255, 0.669);
        cursor: pointer;
    }
}
</style>