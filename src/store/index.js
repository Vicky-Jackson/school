import { createStore } from "vuex";

const store = createStore({
    state:{
         userInfo: (sessionStorage.getItem('loginData') && JSON.parse(sessionStorage.getItem('loginData'))) || {},
         message: (sessionStorage.getItem('message') && JSON.parse(sessionStorage.getItem('message'))) || {},
         constRoutes: sessionStorage.getItem('routes') || [],
         signStudent:[]
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
        },
        setSignStudent(state, signStudent) {
            state.signStudent = signStudent
        }
    },
    actions:{},
    modules:{}
})

export default store