import { createStore } from "vuex";

const store = createStore({
    state:{
         userInfo: (sessionStorage.getItem('loginData') && JSON.parse(sessionStorage.getItem('loginData'))) || {},
         message:{}
    },
    mutations:{
        setUserInfo(state, uInfo) {
            state.userInfo = uInfo
        },
        setMessage(state,msg){
            state.message = msg
        }
    },
    actions:{},
    modules:{}
})

export default store