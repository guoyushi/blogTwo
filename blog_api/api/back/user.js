var express = require('express');
var router = express.Router();
var hasOwnProperty=require('has-own-property-x');  //支持hasOwnProperty


var {
  sqlHandle,  //除查询外的其他操作
  readHandle,  //读取操作
  searchHandle,  //检测有无某条数据，有为false
  searchHandleNormal,  //检测有无某条数据，有为true
  query             // //基本操作
}=require("../../config/db_connect")


/* GET home page. */

router.post('/login', function(req, res, next) {
  let arg=req.body
  console.log(arg)
  if(hasOwnProperty(arg,"username")&&hasOwnProperty(arg,"password")){
    let {username,password}=arg
    var testUser=`select * from user where name='${username}'`
    console.log(testUser)
    readHandle(testUser).then((data)=>{
        console.log(data)
        if(data.length>0){
          if(data[0].password==password){
                  res.send({
                    code:"1001",
                    msg:"登录成功",
                    data:data[0]
                  })
          }else{
            res.send({
              code:"1002",
              msg:"密码错误"
            })
          }
        }else{
          res.send({
            code:"1003",
            msg:"用户名不存在"
          })
        }
    })
  }else{
    res.send({
      code:"1000",
      msg:"未输入用户名或密码"
    })
  }
});
module.exports = router;
