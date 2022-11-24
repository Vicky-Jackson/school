import { createStore } from "vuex";

const store = createStore({
    state:{
         userInfo: (sessionStorage.getItem('loginData') && JSON.parse(sessionStorage.getItem('loginData'))) || {},
         message:{},
         constRoutes: sessionStorage.getItem('routes') || [],
         sign:[],
         work:[]
    },
    mutations:{
        setUserInfo(state, uInfo) {
            state.userInfo = uInfo
        },
        setMessage(state,msg){
            state.message = msg
        },
        setRoutes(state, constRoutes) {
            state.constRoutes = constRoutes
        }
    },
    actions:{},
    modules:{}
})

export default store