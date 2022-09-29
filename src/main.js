import { createApp } from 'vue'
import './assets/base.css'
import App from './App.vue'
import ElementPlus from "element-plus";
import router from "./router/index.js";
const app = createApp(App);

app.use(ElementPlus)
app.use(router)
app.mount('#app')
