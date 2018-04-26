<template>
  <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
       <el-form-item label="文章标题" prop="article_name">
  <el-input type="text" v-model="ruleForm.article_name"></el-input>
  </el-form-item>
  <el-form-item label="一级类名" prop="oneId">
    <el-select v-model="ruleForm.oneId" placeholder="请选择"  @change="changeClassOne"> 
    
      <el-option
      v-for="itme in oneClass"
      :key="itme.id"
      :label="itme.enname"
      :value="itme.id"
       ></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="二级类名" prop="twoId">
    <el-select v-model="ruleForm.twoId" placeholder="请选择" :clearavle="true">
       <el-option
        v-for="itme in twoClass"
        :key="itme.id"
        :label="itme.cnname"
        :value="itme.id"
        ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="是否显示" prop="art_show">
      <el-radio v-model="ruleForm.art_show" label="1">是</el-radio>
      <el-radio v-model="ruleForm.art_show" label="2">否</el-radio>
  </el-form-item>
   <el-form-item label="是否推荐" prop="recommend">
      <el-radio v-model="ruleForm.recommend" label="1">是</el-radio>
      <el-radio v-model="ruleForm.recommend" label="2">否</el-radio>
  </el-form-item>
   <el-form-item label="作者" prop="editer">
  <el-input type="text" v-model="ruleForm.editer" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="导读" prop="daodu">
    <el-input 
    type="textarea"
     v-model="ruleForm.daodu"
     :rows="2"
     placeholder="请输入内容"
     :autosize='{minRows:2,maxRows:10}'
     ></el-input>
  </el-form-item>
  
<!-- <div class="block">
  <el-from-itme label="时间" prop="time">
    <el-data-picker
      v-model="ruleForm.time"
      type="datetime"
      placeholder="选择日期时间" format='yyyy-MM-dd HH:mm:ss' value-format="yyyy-MM-dd HH:mm:ss"
      @change="cahngefn">
    </el-data-picker>
</el-form-itme>
</div> -->



   <el-form-item label="内容">
        <!-- editor的div为富文本的承载容器 -->
         <div id="editor"></div>  
   </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit('ruleForm')">提交</el-button>
    <el-button @click="resetFrom()">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
export default {
  data() {
      var validatetime = (rule,value,callback)=>{
        if(this.timedata === ''){
          callback(new Error('请选择时间'));
        }else{
          callback();
        }
      }
    return {
      oneClass: [],
      twoClass: [],
      olddata: [],
      editer: null,
      ruleForm: {
        article_name: "",
        oneId: "",
        twoId: "",
        editer: "",
        content: "",
        time: "2018-12-24 8:30:05",
        daodu: "",
        recommend: "0",
        art_show: "0",
        enname_one: ""
      }
    };
  },
  created() {
    this.axios.get("/api/back/article/Class").then(data => {
      console.log(data)
      this.olddata = data.data.data;
      this.oneClass = data.data.data.oneData
      this.ruleForm.oneId = this.oneClass[0].oneId
      this.ruleForm.enname_one=this.oneClass[1].enname
      console.log(this.oneClass[1].enname)
      // this.twoClass = data.data.data[1]
      this.selectClassTwo()
    });
  },
  mounted() {
    // 实例化editor编辑器
    this.editor = UE.getEditor("editor");
    // console.log(this.editor.setContent("1223"))
  },
  methods: {
    selectClassTwo(){
      this.twoClass=[]
      this.olddata.twoData.forEach((i)=>{
        if(i.parent_id == this.ruleForm.oneId ){
          this.twoClass.push(i)
        }
      })
    },
    changeClassOne(itme){
      this.olddata.oneData.forEach((i)=>{
        if(i.id==this.ruleForm.oneId){
          this.ruleForm.enname_one=i.enname
        }
      })
      this.selectClassTwo()
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid)=>{
        if(valid && this.editor.getContent() != ""){
          this.ruleForm.content = this.editor.getContent()
          console.log(this.ruleForm)
          this.axios.post('/api/back/article/insert',this.ruleForm).then((data)=>{
            if(data.data.code=="3011"){
              this.$message({
								message: '恭喜你，添加成功',
								type: 'success'
              })
              // setTimeout(()=>{
              //   this.$router.go(0)
              // },1000)
            }else{
               this.$message({
								message: '添加失败',
								type: 'error'
              })
            }
          })
        }else{
          console.log('error submit!!')
        }
      })
    },
    destroyed() {
      // 将editor进行销毁
      this.editor.destroy();
    }
  }
};
</script>
<style>
.demonstration {
  margin-left: 40px;
}
</style>