var express = require('express');
var router = express.Router();
var hasOwnProperty = require('has-own-property-x'); //支持hasOwnProperty
var Unique = require("../common/Unique")
var CreatTime = require("../common/creatTime")
var {
  sqlHandle, //修改和增加操作
  readHandle, //读取操作
  searchHandle, //检测有无某条数据，有为false
  searchHandleNormal, //检测有无某条数据，有为true
  query // //基本操作
} = require("../../config/db_connect")

//获取一二级类名

router.get("/Class", (req, res, next) => {

    var getOneClass = `select * from one_class`
    var getTwoClass = `select * from two_class`
  
    async function sqlAllHandle() {
      let oneData = await readHandle(getOneClass);
      let twoData = await readHandle(getTwoClass);
      let data = {oneData,twoData}
      return {
        code: "3001",
        msg: "获取数据成功",
        data
      }
    }
    sqlAllHandle().then((data) => {
      res.send(data)
    }).catch((err) => {
      res.send({
        code: "3002",
        msg: "获取数据失败"
      })
    })
  })
 //插入文章
 router.post('/insert',(req,res,next)=>{
  console.log(req.body.enname_one)
 var sql = `insert into ${req.body.enname_one}(id,oneId,twoId,article_name,editer,content,time,visitors,daodu,imgsrc,recommend,art_show) values('${Unique()}','${req.body.oneId}','${req.body.twoId}','${req.body.article_name}','${req.body.editer}','${req.body.content}','${req.body.time}',0,'${req.body.daodu}','${req.body.imgsrc}','${req.body.recommend}','${req.body.art_show}')`
 var updataArticalNum = `updata two_class set article_num=article_num+1 where id='${req.body.twoId}'`

 const asyncInsertArticle = async function(){
   await query(sql)
   await query(updataArticalNum)
   return
 }
 asyncInsertArticle().then((data)=>{
   res.send({
     code:'3011',
     msg:"插入文章成功"
   })
 }).catch((err)=>{
   res.send({
     code:'3012',
     msg:'插入文章失败'
   })
 })
})
 //获取所有文章列表
 router.get('/getArticleList',(req,res,next)=>{
   var sqlone = `select * from one_class)`
   var sqltwo = `select * from two_class)`
   
   //拼接查询文章的sql
   const connectsql = (oneClass)=>{
     //根据一级类名拼接sql
     var selectArtSql = `select * from (`
     oneClass.forEach(function(i,index){
       if(index <(oneClass.length - 1)){
         selectArtSql += `select * from ${i.enname} UNION ALL`
       }else{
         selectArtSql += `select * from ${i.enname})as table_all by time desc `
       }
     },this);
     return selectArtSql
   }
   //将一二级类名的中英文标识添加入文章列表
   const connectArticle=(data)=>{
     const {articleData,oneClass,twoClass} = data
     return articleData.map(function(i){
       oneClass.forEach(function(j){
         if(j.id == i.oneId){
           i.ennmae_one = j.enname
           i.cnname_one = j.cnname
         }
       })
       twoClass.forEach(function(j){
        if(j.id == i.twoId){
          i.ennmae_two = j.enname
          i.cnname_two = j.cnname
        }
      })
      return i
     });
   }

   const asyncGetArticle = async function(){
     let oneClass = await readHandle(sqlone)
     let twoClass = await readHandle(sqltwo)

     let articleData = await readHandle(connectSql(oneClass))
     return connectArticle({articleData,oneClass,twoClass})
   }

   asyncGetArticle().then((data)=>{
     res.send({
       code:"3021",
       msg:'读取文章成功',
       data
     })
   }).catch((err)=>{
     res.send({
       code:"3022",
       msg:"读取文章失败"
     })
   })
 })


 //修改文章
 router.post("/updataArticle",(req,res,next)=>{
   var sql = `updata ${req.body.ennmae_one} set 
   article_name='${req.body.article_name}',
   editer='${req.body.editer}',
   content='${req.body.content}',
   time='${req.body.time}',
   visitors='${req.body.visitors}',
   daodu='${req.body.daodu}',
   imgsrc='${req.body.imgsrc}',
   recommend='${req.body.recommend}',
   art_show='${req.body.art_show}'
    where id='${req.body.id}'`
   sqlHandle(sql).then((data)=>{
     res.send({
       code:"3031",
       msg:"修改文章成功"
     })
   }).catch((err)=>{
     res.send({
       code:'3032',
       msg:"修改文章失败"
     })
   })
  })
  //删除文章
  router.post("/deleteArticle",(req,res,next)=>{
    let deleteSql = `delete from ${req.body.ennmae_one} where id='${req.body.id}'`
    let updataArticalNum=`updata two_class set article_num=article_num-1 where id='${req.body.twoId}'`

    const asyncDeleteArticle = async function(){
      await sqlHandle(deleteSql)
      await sqlHandle(updataArticalNum)
      return
    }
    asyncDeleteArticle().then((data)=>{
      res.send({
        code:'3041',
        msg:"删除文章成功"
      })
    }).catch((err)=>{
      res.send({
        code:'3042',
        msg:"删除文章失败"
      })
    })
  })
  //根据id获取文章
  router.get("/getArticleDetail",(req,res,next)=>{
    var sqlone = `select * from one_class`
    
    const connectSql = (oneClass) =>{
      var selectArtSql = `select * from (`
      oneClass.forEach(function(i,index){
        if(index < (oneClass.length - 1)){
          selectArtSql += `select * from ${i.enname} UNION ALL`
        }else{
          selectArtSql += `select * from ${i.enname}) as table_all where id='${req.query.id}' order by time desc`
        }
      },this)
      return selectArtSql
    }
    //将一级类名的中英文标识添加入文章列表
    const connectArticle = (data) =>{
      const {articleData,oneClass} = data
      return articleData.map(function(i){
        oneClass.forEach(function(j){
          if(j.id == i.oneId){
            i.ennmae_one = j.enname
            i.cnname_one = j.cnname
          }
        })
        return i
      })
    }
    const asyncGetArticle = async function(){
      let oneClass = await readHandle(sqlone)
      let articleData = await readHandle(connectSql(oneClass))
      return connectArticle({articleData,oneClass})
    }
    asyncGetArticle().then((data)=>{
      res.send({
        code:'3051',
        msg:"查询成功"
      })
    }).catch((err)=>{
      res.send({
        code:"3052",
        msg:"查询失败"
      })
    })
  })
  module.exports = router