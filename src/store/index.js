import { createStore } from "vuex";

const store = createStore({
    state:{
         userInfo: (sessionStorage.getItem('loginData') && JSON.parse(sessionStorage.getItem('loginData'))) || {},
         message: (sessionStorage.getItem('message') && JSON.parse(sessionStorage.getItem('message'))) || {},
         constRoutes: sessionStorage.getItem('routes') || [],
         signStudent: sessionStorage.getItem('sign') || [],
         workStudent: sessionStorage.getItem('work') || [],
         course: sessionStorage.getItem('course') || [],
         valueHtml:'',
         visited:localStorage.getItem('visited') || []
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
        },
        setWorkStudent(state, workStudent) {
            state.workStudent = workStudent
        },
        setCourse(state, course) {
            state.course = course
        },
        setValueHtml(state, valueHtml) {
            state.valueHtml = valueHtml
        },
        setVisited(state,visited){
            state.visited = visited
        }
    },
    actions:{},
    modules:{}
})

export default store