<template>
<div id="home">
    <el-card :body-style="{ padding: '0px' }">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image" />
        <div style="padding: 14px">
            <div >角色：admin</div>
            <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button text class="button">Operating</el-button>
            </div>
        </div>
    </el-card>
</div>
</template>

<script setup>
import { ref } from 'vue'

const currentDate = ref(new Date())

</script>

<style lang="less" scoped>
.el-card{
    width:600px;
    height:200px;
    .image {
            width: 200px;
            height:200px;
            float:left
        }
}
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}
</style>