<template>
  <div>
    <el-form v-if="state" status-icon label-width="100px" class="demo-ruleForm">
      <h3>一级分类列表</h3>
      <el-form-item label="一级中文类名" >
        <el-input style="width:200px"  v-model="ruleForm.enname"></el-input>
      </el-form-item>
      <el-form-item  label="一级英文类名" >
        <el-input style="width:200px" v-model="ruleForm.cnname"></el-input>
      </el-form-item>
       <el-form-item>
        <template>
          <el-button size="mini" @click="handleEdit">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-form-item>
    </el-form>
    <el-form v-else status-icon label-width="100px" class="demo-ruleForm">
      <h3>二级分类列表</h3>
      <el-form-item label="二级中文类名" >
        <el-input style="width:200px"  v-model="ruleForm.enname"></el-input>
      </el-form-item>
      <el-form-item  label="二级英文类名" >
        <el-input style="width:200px" v-model="ruleForm.cnname"></el-input>
      </el-form-item>
       <el-form-item>
        <template>
          <el-button size="mini" @click="handleEdit">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cnname: "",
      enname: "",
      state: true,
      oldenname: "",
      ruleForm:{

      }
    };
  },
  mounted() {
    let state = this.$route.query.state;
    //one判断是一级还是二级
    if (state == "one") {
      this.state = true;
      const data=JSON.parse(sessionStorage.getItem("info"));
      console.log(data)
      Object.entries(data).forEach(function(i){
       this.$set(this.ruleForm,i[0],i[1])
     },this)
     this.ruleForm.id=data.id;
    }else{
     this.state=false;
      const data=JSON.parse(sessionStorage.getItem("info"));
      Object.entries(data).forEach(function(i){
       this.$set(this.ruleForm,i[0],i[1])
     },this)
     this.ruleForm.id=data.id;
    }
  },
  methods: {
    handleEdit() {
      let state = this.$route.query.state;
      //根据one判断是遍编辑一级还是二级
      if (state == "one") {
        this.axios
          .post("/api/back/class/amendClass", this.ruleForm)
          .then(data => {
            console.log(data);
          });
      }else{
        this.state=false;
        this.axios
          .post("/api/back/class/amendClassTwo", this.ruleForm)
          .then(data => {
            console.log(data);
          });
      }
    }
  }
};
</script>

<style>

</style>
