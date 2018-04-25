<template>
    <div class="api_table">
        <el-table
            :data="q.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            style="width: 100%">
            <el-table-column
            label="标题"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.cnname }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="前后端分类"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">back</span>
            </template>
            </el-table-column>
            <el-table-column
            label="时间">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1,5, 10,15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="q.length">
            </el-pagination>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                data:'',
                q:[],
                 currentPage:1,
                pageSize:5,
                id:''
            }
        },
        mounted(){
            console.log(this.$route.query)
            this.axios.get('/api/back/add/api_q').then(data=>{
                this.data=data.data.data
                const ts='后台接口'
                this.data.forEach(i=>{
                    if(i.type_one==ts){
                        this.q.push(i)
                    }
                })
            })
        },
         methods:{
            handleEdit(index,row){
                console.log(row)
                sessionStorage.setItem('info',JSON.stringify(row))
                this.$router.push({path:'detail_add'})
            },
            handleDelete(index,row){//delList
                this.id=row.id
                console.log(row.id)
                this.axios.post('/api/back/add/delList',{id:this.id}).then(data=>{
                     switch (data.data.code) {
                            case "6001":
                                {
                                this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                this.$router.go(0)
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
            },
            handleSizeChange(val) {
                this.pageSize=val
            console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage=val
            }   
        }
    }
</script>
<style>
    .right{
        float:right;
    }
</style>