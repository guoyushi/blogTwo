<template>
  <div>
     <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">个人博客</el-menu-item>
      <el-submenu index="2" v-for="(i,index) in datas" :key='i.id'>
        <template slot="title">{{i[0].enname}}</template>
        <el-menu-item v-for="(j,indes) in i.twoData" :index='j.id' :key='j.id'>{{j.enname}}</el-menu-item> 
      </el-submenu> 
    </el-menu> 
     <!-- <ul v-for="i in datas">
      <li>{{i[0].enname}}</li>
      <p v-for="j in i">
        {{j.enname}}
      </p>
    </ul>  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex2: '1',
      datas:[]
    };
  },
  created(){
    this.axios.get('/api/front/all/getHead').then(data=>{
      this.datas=data.data.data
      console.log(this.datas)
      for(let i in this.datas){
        console.log(this.datas.oneData)
      }
      
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>

</style>
