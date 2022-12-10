<template>
    <div id="container">
        <div v-show="data.isLoading">
            <loading :progress="data.progress"></loading>
        </div>
        <div id="home" v-show="!data.isLoading">
            <div id="scroll">
                <h2>公告</h2>
            </div>
            <div id="line">
                <v-charts :option="data.option_line" style="height: 250px; width:300px;"></v-charts>
            </div>
        </div>
        <vue3-seamless-scroll :list="data.listData" class="warp" hover>
            <ul class="item">
                <li v-for="(item, index) in data.listData" :key="index" style="cursor: pointer;" @click="handleClick(item)">
                    <span class="title">{{ item.title }}</span>
                    <span class="date">{{ item.time.substr(0,10) }}</span>
                </li>
            </ul>
        </vue3-seamless-scroll>
        <el-dialog v-model="dialogForm">
            <div>{{data.click.detail}}</div>
        </el-dialog>
    </div>
</template>

<script setup>
import Home3d from '../util/Home3d'

import { Icon } from '@iconify/vue';
import {
    reactive, onMounted,ref
} from 'vue'
import { RouterLink } from "vue-router";
import Loading from '../components/Loading.vue';
import { Vue3SeamlessScroll } from "vue3-seamless-scroll"
import axios from 'axios';
import store from '../store';

const value = ref(new Date());
const dialogForm = ref(false)
const data = reactive({
    home3d: {},
    progress: 0,
    isLoading: true,
    move: false,
    course:[],
    click:[],
    option_line: {
        title: { text: "浏览量" },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    },
    listData: [],
})
function loadingFinish() {
    data.isLoading = false
}
onMounted(() => {
    data.home3d = new Home3d('#home', loadingFinish);
    data.home3d.onProgress((e) => {
        let progressNum = e.loaded / e.total;
        progressNum = progressNum.toFixed(2) * 100;
        data.progress = progressNum;
    })
    axios.get('/api/user/getAnouncement').then(res=>{
        if(res.data.length > 0){
            data.listData = res.data;
        }
    })
})
const handleClick = (item)=>{
    data.click=item;
    dialogForm.value = true;
}
</script>

<style lang="less" scoped>
#container{
    width: 100%;
    height:100vh;
    background-color: black;
   
}
 #scroll {
     position: absolute;
     top: 70px; 
 }
  h2 {
      color: white
  }
 #line{
    position: absolute;
    top: 60px;
    left:950px;
 }
.warp {
    height: 260px;
    width: 360px;
    overflow: hidden;
   color:white;
    position:absolute;
    top:110px;
    ul {
        list-style: none;
        padding: 0;
        margin: 0 auto;

        li,
        a {
            // color: white;
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