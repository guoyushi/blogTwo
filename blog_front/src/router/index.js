import vueRouter from "vue-router"

import Vue from "vue"
Vue.use(vueRouter)
import loading from '../components/looging.vue'
import app from '../components/app.vue'
export default new vueRouter({
   routes:[
     {
       path:"/",
       redirect: "/loading"
     },
     {
      path:"/loading",
      component:loading
     },{
      path:"/app",
      component:app
     }
   ]
})