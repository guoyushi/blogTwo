var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require("body-parser")
var ueditor = require("ueditor")

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

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 后台接口


var apiBackUser=require("./api/back/user.js")
app.use('/api/back/user', apiBackUser);

var apiBackClass=require("./api/back/class.js")
app.use('/api/back/class', apiBackClass);

var apiBackArticle=require("./api/back/article.js")
app.use('/api/back/article', apiBackArticle);

var apiBackApiAdd=require("./api/back/api_add.js")
app.use('/api/back/add', apiBackApiAdd);

//前台接口
var apiFrontAll = require('./api/front/article.js')
app.use("/api/front/article",apiFrontAll);




app.use("/api/ue",ueditor(path.join(__dirname,'public'),function(req,res,next){
  if(req.query.action == "uploadimage"){
    var foo = req.ueditor;
    var imgname = req.ueditor.filename;
    var img_url = '/ueditor/images/';
    res.ue_up(img_url);
    res.setHeader('Content-Type','text/html');
  }
  else if(req.query.action === "listimage"){
    var dir_url = '/ueditor/images';
    res.ue_list(dir_url)
  }
  else{
    res.setHeader('Content-Type',"application/json")
    res.redirect("/ueditor/nodejs/config.js")
  }
}))

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
