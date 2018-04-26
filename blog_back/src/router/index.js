import vueRouter from "vue-router"

import Vue from "vue"
Vue.use(vueRouter)


let Login=resolve => require(['@/components/login.vue'], resolve)
let backMain=resolve => require(['@/components/main/main.vue'], resolve)
let back=resolve => require(['@/components/main/index.vue'], resolve)
let add_one_class=resolve => require(['@/components/main/add_one_class.vue'], resolve)
let add_two_class=resolve => require(['@/components/main/add_two_class.vue'], resolve)
let class_list=resolve => require(['@/components/main/class_list.vue'], resolve)
let add_article=resolve => require(['@/components/main/add_article.vue'], resolve)
let amend_one_class=resolve => require(['@/components/main/amend_one_class.vue'], resolve)
let api_add=resolve => require(['@/components/main/api_add.vue'], resolve)
let api_list=resolve => require(['@/components/main/api_list.vue'], resolve)
let api_list1=resolve => require(['@/components/main/api_list1.vue'], resolve)
let detail_add=resolve => require(['@/components/main/detail_add.vue'], resolve)
let article_list=resolve => require(['@/components/main/article_list.vue'], resolve)
export default new vueRouter({
   routes:[
     {
       path:"/",
       component:Login,
       redirect: "/login"
     },
     {
      path:"/login",
      component:Login
     },
     {
      path:"/back",
      component:back,
      children:[
        {
          path:"main",
          component:backMain
        },{
          path:"add_one_class",
          component:add_one_class
        },{
          path:"add_two_class",
          component:add_two_class
        },{
          path:"class_list",
          component:class_list
        },{
          path:"add_article",
          component:add_article
        },{
          path:"amend_one_class",
          component:amend_one_class
        },{
          path:"api_add",
          component:api_add
        },{
          path:"api_list",
          component:api_list
        },{
          path:"api_list1",
          component:api_list1
        },{
          path:"detail_add",
          component:detail_add
        },{
          path:"article_list",
          component:article_list
        }
      ]
     }
   ]
})