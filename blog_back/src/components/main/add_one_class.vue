<template>
  <div>

    <el-form status-icon label-width="100px" class="demo-ruleForm">
      <h3>一级分类列表</h3>
      <el-form-item label="一级中文类名" >
        <el-input v-model="data.enname_one" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="一级英文类名" >
        <el-input v-model="data.cnname_one" style="width:200px"></el-input>
      </el-form-item>
      <h3>二级分类列表</h3>
      <el-form-item label="二级中文类名">
        <el-input v-model="data.enname_two" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="二级英文类名">
        <el-input v-model="data.cnname_two" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="get">提交</el-button>
        <el-button >重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "add_one_class",
  data() {
    return {
      data:{
        enname_one:'',
        cnname_one:'',
        enname_two:'',
        cnname_two:''
      }
    };
  },
  created() {
    
  },
  methods:{
    get(){
      let {enname_one,cnname_one,enname_two,cnname_two}=this.data;
      this.axios.post('/api/back/class/insertOneClass',{
        enname_one,
        cnname_one,
        enname_two,
        cnname_two
      }).then(data=>{
        console.log(data)
        switch(data.data.code){
						case "2001":{
							 this.$message({
								message: '恭喜你，添加成功',
								type: 'success'
							});
						} break;
						default:{
							this.$message({
								message: data.data.msg,
								type: 'error'
							});
						}
					}
      })
    }
  }
};
</script>

<style>
.el-form-item__label {
  text-align: center;
}
</style>
