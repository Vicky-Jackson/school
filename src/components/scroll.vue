<template>
    <vue3-seamless-scroll v-model="value" :list="data.listData" class="warp" step="1">
        <ul class="item">
            <li v-for="(item, index) in data.listData" :key="index">
                <span class="title">{{ item.title }}</span>
                <span class="date">{{ item.date }}</span>
            </li>
        </ul>
    </vue3-seamless-scroll>
</template>

<script setup>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll"
import { onMounted, ref, reactive } from 'vue'

const value=ref(true);

const data = reactive({
    listData: [{
        'title': '无缝滚动第一行无缝滚动第一行',
        'date': '2017-12-16'
    }, {
        'title': '无缝滚动第二行无缝滚动第二行',
        'date': '2017-12-16'
    }, {
        'title': '无缝滚动第三行无缝滚动第三行',
        'date': '2017-12-16'
    }, {
        'title': '无缝滚动第四行无缝滚动第四行',
        'date': '2017-12-16'
    }, {
        'title': '无缝滚动第五行无缝滚动第五行',
        'date': '2017-12-16'
    }, {
        'title': '无缝滚动第六行无缝滚动第六行',
        'date': '2017-12-16'
    }, {
        'title': '无缝滚动第七行无缝滚动第七行',
        'date': '2017-12-16'
    }, {
        'title': '无缝滚动第八行无缝滚动第八行',
        'date': '2017-12-16'
    }, {
        'title': '无缝滚动第九行无缝滚动第九行',
        'date': '2017-12-16'
    }],
})
</script>

<style lang="less" scoped>
.warp {
    height: 260px;
    width: 360px;
    margin: 0 auto;
    overflow: hidden;
    ul {
        list-style: none;
        padding: 0;
        margin: 0 auto;
        li,
        a {
            color: white;
            display: block;
            height: 30px;
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            font-size: 15px;
        }
    }
}
</style>