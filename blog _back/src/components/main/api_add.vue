<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name">
            <el-input style="width:400px" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="接口地址" prop="region">
            <el-input style="width:400px" v-model="ruleForm.region"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="date1">
            <el-select  placeholder="请选择" style="width:200px" v-model='ruleForm.date1'>
                <el-option label="前台接口" value="前台接口"></el-option>
                <el-option label="后台接口" value="后台接口"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="请求类型" prop="date2">
            <el-select  placeholder="请选择" style="width:200px" v-model='ruleForm.date2'>
                <el-option label="post" value="post"></el-option>
                <el-option label="get" value="get"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="请求参数" prop="resource">
            <el-input style='width:400px' type="textarea" placeholder="请输入内容" v-model="ruleForm.resource"></el-input>
        </el-form-item>
        <el-form-item label="相应数据" prop="desc">
            <el-input style='width:400px' type="textarea" placeholder="请输入内容" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data(){
            return{
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请输入接口地址', trigger: 'change' }
                    ],
                    date1: [
                        {  required: true, message: '请选择类型', trigger: 'change' }
                    ],
                    date2: [
                        {  required: true, message: '请选择类型', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请输入参数', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写数据', trigger: 'blur' }
                    ]
                }
            }
        },
         methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post('/api/back/add/api_add',{
                        cnname: this.ruleForm.name,
                        works:this.ruleForm.region,
                        type_one:this.ruleForm.date1,
                        type_two:this.ruleForm.date2,
                        types:this.ruleForm.resource,
                        infos:this.ruleForm.desc
                    }).then(data=>{
                        switch (data.data.code) {
                            case "4001":
                                {
                                this.$message({
                                    message: "恭喜你，添加成功",
                                    type: "success"
                                });
                                }
                                break;
                            default: {
                                this.$message({
                                message: data.data.msg,
                                type: "error"
                                });
                            }
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>
    
</style>