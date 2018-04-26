var express = require('express');
var router = express.Router();
var hasOwnProperty=require('has-own-property-x');  //支持hasOwnProperty
var Unique=require("../common/Unique")
var CreatTime=require("../common/creatTime")
var {
  sqlHandle,  //修改和增加操作
  readHandle,  //读取操作
  searchHandle,  //检测有无某条数据，有为false
  searchHandleNormal,  //检测有无某条数据，有为true
  query             // //基本操作
}=require("../../config/db_connect")
//获取
//获取header
router.get('/getHead',(req,res,next)=>{
      var getOneClass=`select * from one_class`
      var getTwoClass=`select * from two_class`
      async function sqlAllHandle() { 
          let oneData=await readHandle(getOneClass);
          let twoData=await readHandle(getTwoClass);
          let data={oneData,twoData}
          return {
            code:"2031",
            msg:"获取数据成功",
            data
          }
       }
       sqlAllHandle().then((data)=>{
          res.send(data)
       }).catch((err)=>{
          res.send({
            code:"2032",
            msg:"获取数据失败"
          })
       })   
})
// //读取文章
router.get('/getAll',(req,res,next)=>{
  var getOneClass=`select * from one_class`
  async function sqlAllHandle() { 
          let oneData=await readHandle(getOneClass);
          oneData.forEach(i=>{
            console.log(i.enname)
          })
          let data=oneData
          return {
            code:"2031",
            msg:"获取数据成功",
            data
          }
       }
        sqlAllHandle()
      //   sqlAllHandle().then((data)=>{
      //     res.send(data)
      //  }).catch((err)=>{
      //     res.send({
      //       code:"2032",
      //       msg:"获取数据失败"
      //     })
      //  })   
})
module.exports=router