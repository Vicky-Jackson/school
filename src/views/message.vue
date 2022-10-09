<template>
    <div class="nav">
        <div class="goods-box w">
            <card v-for="o in 6" :key="o">
            </card>
        </div>
    </div>



</template>

<script setup>
import Card from '../components/card.vue'
</script>

<style lang="less" scoped>
.w {
    width: 1220px;
    margin: 0 auto;
}
.nav {
    height: 60px;
    line-height: 60px;
    >div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .goods-box {
        overflow: hidden;

        >div {
            float: left;
            
        }
    }
}
</style>