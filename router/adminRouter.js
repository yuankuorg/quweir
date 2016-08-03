'use strict';
var adminService = require(`${rootPath}/service/adminService.js`);

let adminRouter = express.Router();
//后台登录
adminRouter.post("/login",adminService.login);
//后台首页
adminRouter.get("/index",util.checkLogin,adminService.index);
//退出登录
adminRouter.get("/logout",adminService.logout);
//显示管理员列表
adminRouter.get("/admin",util.checkLogin,adminService.adminlist);
//进入增加管理员
adminRouter.put("/admin",util.checkLogin,adminService.goadminadd);
//增加操作
adminRouter.post("/admin",util.checkLogin,adminService.adminadd);
//删除管理员
adminRouter.delete("/admin",util.checkLogin,adminService.admindel);

module.exports = adminRouter;