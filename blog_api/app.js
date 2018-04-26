var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require("body-parser")
//加载ueditor 模块
var ueditor = require("ueditor");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));


// 页面渲染
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//使用模块


app.use('/', indexRouter);
app.use('/users', usersRouter);

// 接口


var apiBackUser=require("./api/back/user.js")
app.use('/api/back/user', apiBackUser);


var apiBackClass=require("./api/back/class.js")
app.use('/api/back/class', apiBackClass);


var apiBackArticle=require("./api/back/article.js")
app.use('/api/back/article', apiBackArticle);


var apiBackApiAdd=require("./api/back/api_add.js")
app.use('/api/back/add', apiBackApiAdd);


var apiBackAll=require("./api/fornt/all.js")
app.use('/api/front/all', apiBackAll);


app.use("/api/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;

        var imgname = req.ueditor.filename;

        var img_url = '/ueditor/images/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html'); //IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/ueditor/images/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        console.log('config.json')

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.js');
       // res.send('ok')
    }
}));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
