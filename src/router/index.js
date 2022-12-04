import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from "vue-router";
import store from '../store/index.js';

const routes = [{
        path: "/",
        name: "home",
        component: () => import("../views/home.vue"),
        meta: {
            title: '首页',
            keepAlive: true
        }

    },
    {
        path: "/number",
        name: "number",
        component: () => import("../views/number.vue"),
        meta: {
            title: '新生数据',
            keepAlive: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue"),
        meta: {
            keepAlive: false
        }
    },
    {
        path: "/sign",
        name: "sign",
        meta: {
            title: '签到',
        },
        children: [{
                path: "/signin",
                name: "signin",
                component: () => import("../views/signIn.vue"),
                meta: {
                    title: '发布签到',
                    role: ['teacher', 'admin'],
                    keepAlive: true
                }
            },
            {
                path: "/signstudent",
                name: "signstudent",
                component: () => import("../views/sign.vue"),
                meta: {
                    title: '签到',
                    role: ['student', 'admin'],
                    keepAlive: true
                }
            },
            {
                path: "/signDetail",
                name: "signsdetail",
                component: () => import("../views/signDetail.vue"),
                meta: {
                    role: ['teacher', 'admin'],
                    keepAlive: true
                }
            },
        ]

    },
    {
        path: "/message",
        name: "message",
        meta: {
            title: '信息',
        },
        children: [{
                path: "/students",
                name: "students",
                component: () => import("../views/message.vue"),
                meta: {
                    title: '学生信息',
                    keepAlive: true
                }
            },
            {
                path: "/teachers",
                name: "teachers",
                component: () => import("../views/teachers.vue"),
                meta: {
                    title: '老师信息',
                    keepAlive: true
                }
            },
            {
                path: "/detail",
                name: "detail",
                component: () => import("../views/detail.vue"),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: "/timetable",
                name: "timetable",
                component: () => import("../views/timetable.vue"),
                meta: {
                    title: "课程表",
                    keepAlive: true
                }
            },
        ]
    },
    {
        path: "/score",
        name: "score",
        meta: {
            title: "成绩",
        },
        children: [{
                path: "/scoreTeacher",
                name: "scoreTeacher",
                component: () => import("../views/score.vue"),
                meta: {
                    title: '学生成绩',
                    keepAlive: true
                }
            },
            {
                path: "/scorestudent",
                name: "scorestudent",
                component: () => import("../views/scoreStudent.vue"),
                meta: {
                    title: '成绩分析',
                    keepAlive: true
                }
            },
        ]

    },
    {
        path: "/test",
        name: "test",
        component: () => import("../views/test.vue"),
        meta: {
            keepAlive: true
        }
    },
    {
        path: "/work",
        name: "work",
         meta: {
             title: '作业',
         },
        children: [{
                path: "/workstudent",
                name: "workstudent",
                component: () => import("../views/work.vue"),
                meta: {
                    title: '作业',
                    role: ['student', 'admin'],
                    keepAlive: true
                }
            },
            {
                path: "/releasework",
                name: "releasework",
                component: () => import("../views/releaseWork.vue"),
                meta: {
                    title: '发布作业',
                    role: ['teacher', 'admin'],
                    keepAlive: true
                }
            },
            {
                path: "/workDetail",
                name: "workDetail",
                component: () => import("../views/workDetail.vue"),
                meta: {
                    role: ['teacher', 'admin'],
                    keepAlive: true
                }
            },
        ]
    },
    {
        path: "/404",
        name: "error",
        component: () => import("../views/error.vue"),
        meta: {
            keepAlive: true
        }
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
        //next();
        // 已登录
        const role = store.state.userInfo.role;
        const constRoutes = []
        routes.filter(item => {
            let child = []
            if (item.children){
                    item.children.filter(res => {
                        if (res.meta?.role?.includes(role) || !res.meta?.role) {
                                child.push(res);
                    }
                })
                item.children = child;
                constRoutes.push(item);
            }
                
            else {
                if (item.meta?.role?.includes(role) || !item.meta?.role) {
                    constRoutes.push(item);
                }
            }
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