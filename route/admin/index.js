const express = require('express');

module.exports = function () {
    var router = express.Router();

    //检查登陆状态，让用户必须登陆才能访问别的页面
    router.use((req, res, next) => {
        //防止没登录的情况下一不停的调转到这页面
        if (!req.session['admin_id'] && req.url !== '/login') {
            res.redirect('/admin/login');//重定向
        } else {
            next();
        }
    });
    router.get('/', (req, res) => {
        res.render('admin/index.ejs', {});
    });
    router.use('/login', require('./login')());
    router.use('/banners', require('./banners')());
    router.use('/custom', require('./custom')());

    return router;
};
