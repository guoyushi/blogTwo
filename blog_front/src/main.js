
// import aa from "./js/common.js"
// console.log(aa)
 import app from "./components/app.vue"
// import Vue from " vue/dist/vue.js ";
import Vue from "vue"
import router from "./router"
import store from "./store"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import vueAxios from "vue-axios"
import axios from "axios"

//路由拦截
// router.beforeEach((to,from,next)=>{
//   if(to.path=="/login"){
//     next()
//   }else{
//     if(sessionStorage.getItem("userId")){
//       next()
//     }else{
//       next("/login")
//     }
//   }
// })
Vue.use(vueAxios,axios)
Vue.use(ElementUI);
new Vue({
  el:"#root",
  template:"<app />",
  router,
  store,
  components: {
      app
  }
})