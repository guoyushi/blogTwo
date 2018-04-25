
// import aa from "./js/common.js"
// console.log(aa)
 import app from "./components/app.vue"
// import Vue from " vue/dist/vue.js ";
import Vue from "vue"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
new Vue({
  el:"#root",
  template:"<app />",
  components: {
      app
  }
})