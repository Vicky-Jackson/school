import { createStore } from "vuex";

const store = createStore({
    state:{
         userInfo: (sessionStorage.getItem('loginData') && JSON.parse(sessionStorage.getItem('loginData'))) || {}
    },
    mutations:{
        setUserInfo(state, uInfo) {
            state.userInfo = uInfo
        }

    },
    actions:{},
    modules:{}
})

export default store