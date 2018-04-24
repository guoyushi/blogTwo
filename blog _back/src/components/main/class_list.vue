<template>
  <div id="class_list">
    <el-table
    :data="tableDate"
    style="width: 100%">
    <el-table-column type="expand">
            <template scope="props">
              <el-table
                :data="props.row.twoClass"
                style="width: 100%">
                <el-table-column
                  label="中文名称"
                  prop="enname">
                </el-table-column>
                <el-table-column
                  label="英文名称"
                  prop="cnname">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
    </el-table-column>
    <el-table-column
      label="中文名称"
      prop="one_Class.enname">
    </el-table-column>
    <el-table-column
      label="英文名称"
      prop="one_Class.cnname">
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row,'one')">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row,'one')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableDate: []
    };
  },
  methods: {
    initDate(data) {
      return data.oneData.map(i => {
        let obj = {
          one_Class: i,
          twoClass: []
        };
        data.twoData.forEach(j => {
          if (j.parent_id == i.id) {
            obj.twoClass.push(j);
          }
        });
        return obj;
      });
    },
    handleEdit(index, data, state) {
      //根据one判断是遍编辑一级还是二级
      if (state == "one") {
        sessionStorage.setItem("info", JSON.stringify(data.one_Class));
        this.$router.push({ path: "/back/amend_one_class", query: { state } });
      } else {
        sessionStorage.setItem("info", JSON.stringify(data));
        this.$router.push({ path: "/back/amend_one_class" });
      }
    },
    handleDelete(index, data, state) {
      if (state == "one") {
        let { enname, id } = data.one_Class;
        this.axios
          .post("/api/back/class/deleteClassOne", { id, enname_one: enname })
          .then(data => {
            switch (data.data.code) {
              case "2041":
                {
                  this.$message({
                    message: "恭喜你，删除成功",
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
            this.$router.go(0);
          });
      } else {
        //删除二级
        let { enname, id,parent_id } = data;
        this.axios.post("/api/back/class/deleteClassTwo", {
          oneId:parent_id,twoId:id,enname_one:enname
        }).then(data=>{
          console.log(data)
          this.$router.go(0);
        })
      }
    }
  },
  mounted() {},
  created() {
    this.axios.get("/api/back/class/Class").then(data => {
      this.tableDate = this.initDate(data.data.data);
    });
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
