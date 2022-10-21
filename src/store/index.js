import { createStore } from "vuex";

const store = createStore({
    state:{
         userInfo: (localStorage.getItem('loginData') && JSON.parse(localStorage.getItem('loginData'))) || {}
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