import {
    createRouter,
     createWebHashHistory,
     createWebHistory
} from "vue-router";
import Home from "../views/home.vue";
import Number from "../views/number.vue";
import Login from "../views/login.vue";
//import Test from "../views/test.vue";


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
];

const router = createRouter
    ({
    history: createWebHistory(),
    routes,
});

export default router
