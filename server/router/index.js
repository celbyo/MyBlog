const router = require('koa-router')();
const userctrl = require('../controllers/users');

router
    //  用户模块api
    .post('/api/v1/user/login', userctrl.login)         // 用户登录
    .post('/api/v1/user/register', userctrl.register)   // 用户注册      
    .get('/api/v1/user/logout', userctrl.logout)     // 用户退出      
    .put('/api/v1/user/put', userctrl.put)               // 更改用户资料
    .put('/api/v1/user/resetpwd', userctrl.resetpwd)        // 重置用户密码
    .delete('/api/v1/user/deluser', resetpwd.deluser)   // 删除用户

module.exports = router;