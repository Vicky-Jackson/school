import {
    createRouter,
     createWebHashHistory,
     createWebHistory
} from "vue-router";
import Home from "../views/home.vue";
import Number from "../views/number.vue";
import Login from "../views/login.vue";
import Map from "../views/map.vue";
import Students from "../views/message.vue";

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
];

const router = createRouter
    ({
    history: createWebHistory(),
    routes,
});

export default router
