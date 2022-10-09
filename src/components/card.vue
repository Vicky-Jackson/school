<template>
    <el-row class="card-item">
        <el-col >
            <el-card :body-style="{ padding: '0px' }">
                <img class='image' src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png">
                <div>
                    <span>姓名：aaaa</span>
                    <div>
                        <span>年龄：13</span>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>

<style lang="less" scoped>
.card-item {
    /* background: #fff; */
    width: 25%;
    transition: all 0.5s;
    height: 310px;
}

/* .image{
    width: 100%;
} */
.el-card {
    border: none;
}

span{
    text-align: center;
}
</style>