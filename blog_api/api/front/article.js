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


router.get("/getArticleAll",(res,req,next)=>{
//     var sql = `updata ${req.body.ennmae_one} set 
//    article_name='${req.body.article_name}',
//    editer='${req.body.editer}',
//    content='${req.body.content}',
//    time='${req.body.time}',
//    visitors='${req.body.visitors}',
//    daodu='${req.body.daodu}',
//    imgsrc='${req.body.imgsrc}',
//    recommend='${req.body.recommend}',
//    art_show='${req.body.art_show}'
//     where id='${req.body.id}'`
})

module.exports = router