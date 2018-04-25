<template>
  <div>
      <el-form>
          <h2>增加文章</h2>
          <el-form :model="numberValidateForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="文章标题" prop="name">
                    <el-input style="width:600px" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="一级类名" >
                    <el-select  placeholder="请选择" style="width:200px">
                        <el-option ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级类名" >
                    <el-select placeholder="请选择" style="width:200px">
                        <el-option ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否显示">
                    <el-radio v-model="radio" label="1">备选项</el-radio>
                    <el-radio v-model="radio" label="2">备选项</el-radio>
                </el-form-item>
                <el-form-item label="是否推荐">
                    <el-radio v-model="radio" label="1">备选项</el-radio>
                    <el-radio v-model="radio" label="2">备选项</el-radio>
                </el-form-item>
                <el-form-item  label="作者" style="width:600px" >
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="导读">
                    
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="textarea3">
                    </el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <div class="block">
                        <el-date-picker
                        v-model="value1"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <!--富文本编辑器-->
                <div>
                    <!--editor的div为富文本的承载容器-->
                    <div id="editor"></div>  
                    <!--<button type="" @click="gettext">点击</button>-->
                </div>
                <el-form-item>
                    <el-button type="primary" @click='gettext'>提交</el-button>
                    <el-button @click="resetForm('numberValidateForm')">重置</el-button>
                </el-form-item>
         </el-form>
      </el-form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        value1:'',
        editor: null,
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ]
        },
        numberValidateForm: {
          age: ''
        },
        radio: '1',
         textarea2: '',
      textarea3: ''
      };
    },
    created(){
        this.axios.get('/api/back/article/Class').then(data=>{
            console.log(data)
        })
    },
     mounted() {
        // 实例化editor编辑器
        this.editor = UE.getEditor('editor');
         // console.log(this.editor.setContent("1223"))
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      gettext() {
                // 获取editor中的文本
                console.log(this.editor.getContent())
            }

    },
    destroyed() {
            // 将editor进行销毁
            this.editor.destroy();
        }

    

  }
</script>

<style>

</style>
