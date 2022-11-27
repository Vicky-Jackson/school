import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from "vue-router";
import store from '../store/index.js';

const routes = [{
        path: "/",
        name: "home",
        component: () => import("../views/home.vue")

    },
    {
        path: "/number",
        name: "number",
        component: () => import("../views/number.vue")

    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue")

    },
    {
        path: "/sign",
        name: "sign",
        component: () => import("../views/sign.vue"),
        meta: {
            role: ['student', 'admin']
        }

    },
    {
        path: "/students",
        name: "students",
        component: () => import("../views/message.vue")

    },
    {
        path: "/timetable",
        name: "timetable",
        component: () => import("../views/timetable.vue")

    },
    {
        path: "/card",
        name: "card",
        component: () => import("../views/detail.vue")


    },
    {
        path: "/library",
        name: "library",
        component: () => import("../views/library.vue"),

    },
    {
        path: "/photo",
        name: "photo",
        component: () => import("../views/photo.vue"),

    },
    {
        path: "/test",
        name: "test",
        component: () => import("../views/test.vue"),
        meta: {
            role: ['student','admin']
        }
    },
    {
        path: "/signin",
        name: "signin",
        component: () => import("../views/signIn.vue"),
        meta: {
            role: ['teacher', 'admin']
        }
    }, 
    {
        path: "/work",
        name: "work",
        component: () => import("../views/work.vue"),
    },
    {
        path: "/404",
        name: "error",
        component: () => import("../views/error.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // to: 从哪个页面
    // from: 到哪个页面
    // next: 只有执行next()页面
    //判断用户是否登录
    
    if (!store.state.userInfo.username) {
        // 未登录，跳转到login页面
        if (to.path === '/login') {
            next();
            return
        }
        next('/login')
    } else {
        // 已登录
        const role = store.state.userInfo.role;
        const constRoutes = routes.filter(item => {
            return item.meta?.role?.includes(role) || !item.meta || !item.meta?.role;
        })
        store.commit('setRoutes', constRoutes);
        sessionStorage.setItem('routes', constRoutes);
        console.log(store.state.constRoutes)
        if ((to.meta.role && to.meta.role.includes(role)) || !to.meta.role) {
            next();
        } else {
            next('/404')
        }
    }
})

export default router