import {
    createRouter,
     createWebHashHistory,
     createWebHistory
} from "vue-router";
import store from '../store/index.js'
import Home from "../views/home.vue";
import Number from "../views/number.vue";
import Login from "../views/login.vue";
import Map from "../views/map.vue";
import Students from "../views/message.vue";
import Timetable from "../views/timetable.vue";
import Test from "../views/test.vue";
import Card from "../views/detail.vue";
import Library from "../views/library.vue";
const routes = [{
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/number",
        name: "number",
        component: Number
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/map",
        name: "map",
        component: Map
    },
    {
        path: "/students",
        name: "students",
        component: Students
    },
    {
        path: "/timetable",
        name: "timetable",
        component: Timetable
    },
    {
        path: "/test",
        name: "test",
        component: Test
    },
    {
        path: "/card",
        name: "card",
        component: Card
    },
    {
        path: "/library",
        name: "library",
        component: Library
    },
];

const router = createRouter
    ({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // to: 从哪个页面
    // from: 到哪个页面
    // next: 只有执行next()页面

    //判断用户是否登录
    console.log('store', store.state)
    if (!store.state.userInfo.username) {
        // 未登录，跳转到login页面
        if (to.path === '/login') {
            next()
            return
        }
        next('/login')
    } else {
        // 已登录
        next()
    }
})

export default router
