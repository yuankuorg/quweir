'use strict';
//系统模块引入
global.promise = require("bluebird");
global.co = require("co");
global.fs = promise.promisifyAll(require("fs"));
global.path = require("path");
global.express = require("express");
global.rootPath = __dirname;

//第三方模块引入
var bodyParser = require("body-parser");
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var ejs = require('ejs');
global.upload = require("multer")({dest: 'temp/'});
// var mditor = require("mditor");
// global.parser = new mditor.Parser();
global.mysql = require("mysql");

//自定义模块引入
global.util = require("./util/util.js");
global.config = util.loadConfig();
global.pool  = util.createPool();

//配置bodyparser中间件
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//配置session中间件
app.use(session({
    secret: '!@#$',
    resave: false,
    saveUninitialized: true
    // store: new RedisStore()
}));

//设置ejs模板
app.set("views","./views");
app.set('view engine', 'html');
app.engine('.html', ejs.__express);

//配置静态页面托管
app.use(express.static('public'));

//处理favicon.ico请求
app.use(/.*favicon.ico$/,util.icohandle);

//挂载admin路由
app.use("/admin",require(`${rootPath}/router/adminRouter.js`));

//404中间件
app.use(util.notfind);

//错误中间件
app.use(util.errorhandle);

//服务器错误守护
process.on('uncaughtException', (err) => {
    console.log(`uncaughtException: ${err.stack}`);
});

//服务器开启
var server = app.listen(80,()=>{
    console.log("服务器启动成",new Date().toString());
});