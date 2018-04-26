var express = require('express');
var router = express.Router();
var hasOwnProperty = require('has-own-property-x'); //支持hasOwnProperty
var CreatTime = require("../common/creatTime")
var Unique=require("../common/Unique")
var {
  sqlHandle, //修改和增加操作
    readHandle, //读取操作
    searchHandle, //检测有无某条数据，有为false
    searchHandleNormal, //检测有无某条数据，有为true
    query // //基本操作
} = require("../../config/db_connect")
//增加接口列表
router.post("/api_add", (req, res, next) => {
    let { cnname, works, type_one, type_two, types, infos } = req.body
    if (cnname && works && type_one && type_two && types && infos) {
        //随机获取id
        let id=Unique()
       var insertType= `insert into api_add(cnname, work, type_one, type_two, types, info,time,id) values('${cnname}','${works}','${type_one}','${type_two}','${types}','${infos}','${CreatTime()}','${id}')`
    }
    async function sqlAllHandle() {
          let info = await query(insertType);
          return {
            code: "4001",
            msg: "添加数据成功",
            info
          }
    }
    sqlAllHandle().then((data) => {
        res.send(data)
    }).catch((err) => {readHandle
        res.send({
            code: "4002",
            msg: "添加数据失败"
        })
    })
})
//前台接口列表
router.get("/api_q",(req,res,next)=>{
 
      var geApi_q=`select * from api_add`
      async function sqlAllHandle() { 
          let data=await readHandle(geApi_q);
          console.log(data)
          return {
            code:"4011",
            msg:"获取数据成功",
            data
          }
       }
       sqlAllHandle().then((data)=>{
          res.send(data)
       }).catch((err)=>{
          res.send({
            code:"4012",
            msg:"获取数据失败"
          })
       })   
})
//修改接口列表
router.post('/notdify',(req,res,next)=>{
    let { cnname, works, type_one, type_two, types, infos,id } = req.body
    if(cnname && works && type_one && type_two && types && infos){
         var insertInfo= `update api_add  set cnname='${cnname}', work='${works}', type_one='${type_one}', type_two='${type_two}', types='${types}', info='${infos}' where id='${id}'`
        async function sqlAllHandle() { 
          await sqlHandle(insertInfo);
          return {
            code:"4071",
            msg:"修改数据成功",
          }
       }
       sqlAllHandle().then((data)=>{
          res.send(data)
       }).catch((err)=>{
          res.send({
            code:"4072",
            msg:"修改数据失败"
          })
       }) 
    }
})
//删除接口列表
router.post('/delList',(req,res,next)=>{
    let {id } = req.body
    console.log(id)
    if(id){
        let selectOneClass=`delete from api_add where id='${id}'`
        async function Delets() { 
              await query(selectOneClass)
              return {
                code:"6001",
                msg:"删除数据成功",
              }
           }
            Delets().then(data=>{
                res.send(data)
            }).catch(err=>{
                res.send({
                code:"6002",
                msg:"删除数据失败"
              })
            })
    }
   // res.send('ok')
})
module.exports = router