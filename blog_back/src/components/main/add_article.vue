<template>
  <div>
      <el-form>
          <h2>增加文章</h2>
          <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="文章标题" :rules="[{ required: true, message: '标题不能为空'}]">
                    <el-input style="width:600px"></el-input>
                </el-form-item>
                <el-form-item label="一级类名" :rules="[{ required: true, message: '标题不能为空'}]">
                    <el-select  placeholder="请选择" style="width:200px">
                        <el-option ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级类名" :rules="[{ required: true, message: '标题不能为空'}]">
                    <el-select  placeholder="请选择" style="width:200px">
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
                <el-form-item label="作者" style="width:600px" :rules="[{ required: true, message: '作者不能为空'}]">
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
                <el-form-item label="缩略图">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">提交</el-button>
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
        numberValidateForm: {
          age: ''
        },
        radio: '1',
         textarea2: '',
      textarea3: ''
      };
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>
