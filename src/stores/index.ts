// import Vue, {h} from 'vue'
// import Vuex from 'vuex'
// import {state} from "vue-tsc/out/shared";
// import {defineStore} from "pinia";
// import {request} from "~/utils/request";
// import {ElNotification} from "element-plus";
//
// Vue.use(Vuex)
//
// export const useUserInfoStore = defineStore('store', {
//     state: () => {
//         return {
//             rigthList:JSON.parse(sessionStorage.getItem('rightList')||'[]'),
//             username: sessionStorage.getItem('username')
//         }
//     },
//     actions: {
//         setRightList(state, data){
//             state.rigthList=data
//             sessionStorage.setItem('rightList',JSON.stringify(data))
//         },
//         setUsername(state, data){
//             state.username=data
//             sessionStorage.setItem('username',data)
//         }
//     }
// })

// new Vue({
//     store,
//     // ...
// }).$mount('#app');