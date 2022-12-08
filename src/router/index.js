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
            header: true,
                server: false
        }

    },
    {
        path: "/number",
        name: "number",
        component: () => import("../views/number.vue"),
        meta: {
            title: '新生数据',
             header: true,
                server: false,

        }
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue"),
        meta: {
             header: false,
                server: false
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
                component: () => import("../views/sign/signIn.vue"),
                meta: {
                    title: '发布签到',
                    role: ['teacher', 'admin'],
                    header: true,
                        server: false
                }
            },
            {
                path: "/signstudent",
                name: "signstudent",
                component: () => import("../views/sign/sign.vue"),
                meta: {
                    title: '签到',
                    role: ['student', 'admin'],
                     header: true,
                    server: false
                }
            },
            {
                path: "/signDetail",
                name: "signsdetail",
                component: () => import("../views/sign/signDetail.vue"),
                meta: {
                    role: ['teacher', 'admin'],
                     header: true,
                        server: false
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
                component: () => import("../views/message/message.vue"),
                meta: {
                    role: ['teacher', 'admin'],
                    title: '学生信息',
                     header: true,
                        server: false
                }
            },
            {
                path: "/teachers",
                name: "teachers",
                component: () => import("../views/message/teachers.vue"),
                meta: {
                    role: ['student', 'admin'],
                    title: '任课老师信息',
                     header: true,
                        server: false
                }
            },
            {
                path: "/detail",
                name: "detail",
                component: () => import("../views/message/detail.vue"),
                meta: {
                     header: true,
                        server: false
                }
            },
            {
                path: "/timetable",
                name: "timetable",
                component: () => import("../views/message/timetable.vue"),
                meta: {
                    role: ['student', 'teacher'],
                    title: "课程表",
                     header: true,
                        server: false
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
                component: () => import("../views/score/score.vue"),
                meta: {
                    role: ['teacher', 'admin'],
                    title: '学生成绩',
                    header: true,
                    server: false
                }
            },
            {
                path: "/scorestudent",
                name: "scorestudent",
                component: () => import("../views/score/scoreStudent.vue"),
                meta: {
                    role: ['student', 'admin'],
                    title: '成绩详情',
                    header: true,
                    server: false
                }
            },
            {
                path: "/scoresadd",
                name: "scoreadd",
                component: () => import("../views/score/scoreAdd.vue"),
                meta: {
                    role: ['teacher'],
                    title: '成绩录入',
                    header: true,
                    server: false
                }
            },
        ]

    },
    {
        path: "/test",
        name: "test",
        component: () => import("../views/test.vue"),
        meta: {
            header: true,
            server: false
        }
    },
    {
        path: "/server",
        name: "server",
        meta: {
            title: '后台',
        },
        children: [{
                    path: "/serverhome",
                    name: "serverhome",
                    component: () => import("../views/server/home.vue"),
                    meta: {
                        role: ['admin'],
                        header: false,
                        server: true
                    }
                },
            {
                path: "/serverStudent",
                name: "serverStudent",
                component: () => import("../views/server/student.vue"),
                meta: {
                    role: ['admin'],
                    header: false,
                    server: true
                }
            },
            {
                path: "/serverTeacher",
                name: "serverTeacher",
                component: () => import("../views/server/teacher.vue"),
                meta: {
                    role: ['admin'],
                    header: false,
                    server: true
                }
            },
            {
                path: "/serverscore",
                name: "serverScore",
                component: () => import("../views/server/score.vue"),
                meta: {
                    role: ['admin'],
                    header: false,
                    server: true
                }
            },
            {
                path: "/serveruser",
                name: "serverUser",
                component: () => import("../views/server/user.vue"),
                meta: {
                    role: ['admin'],
                    header: false,
                    server: true
                }
            },
            {
                path: "/servercourse",
                name: "serverCourse",
                component: () => import("../views/server/course.vue"),
                meta: {
                    role: ['admin'],
                    keepAlive: false,
                    server: true
                }
            },
        ]
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
                component: () => import("../views/work/work.vue"),
                meta: {
                    title: '作业',
                    role: ['student', 'admin'],
                    keepAlive: true
                }
            },
            {
                path: "/releasework",
                name: "releasework",
                component: () => import("../views/work/releaseWork.vue"),
                meta: {
                    title: '发布作业',
                    role: ['teacher', 'admin'],
                    keepAlive: true
                }
            },
            {
                path: "/workDetail",
                name: "workDetail",
                component: () => import("../views/work/workDetail.vue"),
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
            if (item.meta?.role?.includes(role) || !item.meta?.role){
                if (item.children){
                    item.children.filter(res => {
                        if (res.meta?.role?.includes(role) || !res.meta?.role) {
                                child.push(res);
                        }
                    })
                    item.children = child;
                    constRoutes.push(item);
                }
                else{
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