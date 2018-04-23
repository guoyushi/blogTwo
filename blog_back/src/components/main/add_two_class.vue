<template>
  <div>

    <el-form status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <h3>一级分类列表</h3>
      <el-form-item label="一级中文类名">
      <el-select v-model="value" placeholder="请选择" style="width:200px">
        <el-option v-for="item in data" :key="item.id" :label="item.enname" :value="item.enname"></el-option>
      </el-select>
  </el-form-item>
      <h3>二级分类列表</h3>
      <el-form-item label="二级中文类名">
        <el-input v-model="enname_two" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="二级英文类名">
        <el-input v-model="cnname_two" style="width:200px"></el-input>
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
  data() {
    return {
      value: "",
      data: null,
      enname_two: "",
      cnname_two: ""
    };
  },
  created() {
    this.axios.get("/api/back/class/getOneClass").then(data => {
      this.data = data.data.data;
    });
  },
  methods: {
    get() {
      //获取select值
      let val = this.value;
      //遍历data
      this.data.forEach(item => {
        if (item.enname == val) {
          //找到当前选中的id
          let oneId = item.id;
          //请求
          this.axios
            .post("/api/back/class/insertTwoClass", {
              oneId,
              enname_two: this.enname_two,
              cnname_two: this.cnname_two
            })
            .then(data => {
              switch (data.data.code) {
                case "2011":
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
            });
        }
      });
    }
  }
};
</script>

<style>

</style>
