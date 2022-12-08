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
        <vue3-seamless-scroll :list="data.listData" class="warp">
            <ul class="item">
                <li v-for="(item, index) in data.listData" :key="index">
                    <span class="title">{{ item.title }}</span>
                    <span class="date">{{ item.date }}</span>
                </li>
            </ul>
        </vue3-seamless-scroll>
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

const data = reactive({
    home3d: {},
    progress: 0,
    isLoading: true,
    move: false,
    course:[],
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
    // axios.get('/api/user/getCourseStudent',{
    //     params:{
    //         role:store.state.userInfo.role,
    //         id:store.state.userInfo.no
    //     }
    // }).then(res=>{
    //     if(res.data.length > 0){
    //         data.course = res.data;
    //     }
    // })
})
const btn = () => {
    document.getElementById("teach").close();

}
const btn1 = () => {

    document.getElementById("library").close();
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