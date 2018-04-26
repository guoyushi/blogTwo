import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

export default new Vuex.Store({
   state:{

   },
   actions:{
    getList({commit},data)
   },
   mutations:{
     getList(state,data){
        return data
     }
   }
})