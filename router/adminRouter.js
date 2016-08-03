'use strict';
var adminServer = require(`${rootPath}/service/adminService.js`);

let adminRouter = express.Router();
//后台登录
adminRouter.post("/login",adminServer.login);
//后台首页
adminRouter.get("/index",util.checkLogin,adminServer.index);
//退出登录
adminRouter.get("/logout",adminServer.logout);
//显示管理员列表
adminRouter.get("/admin",adminServer.adminlist);

module.exports = adminRouter;