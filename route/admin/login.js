const express = require('express');
const common = require('../../libs/common');
const mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'learn'
});

module.exports = function () {
    var router = express.Router();

    //不能用use因为不知道用户是要干嘛的
    //来看页面的
    router.get('/', (req, res) => {
        res.render('admin/login.ejs');
    });
    //来提交数据
    router.post('/', (req, res) => {
        var username = req.body.username,
            password = common.md5(req.body.password + common.md5_SUFFIX);

        db.query(`SELECT*FROM admin_table WHERE username='${username}'`,
            (err, data) => {
                if (err) {
                    res.status(500).send('数据库设计错误').end();
                } else {
                    if (data.length === 0) {
                        res.status(400).send('无此用户').end();
                    } else {
                        if (data[0].password === password) {
                            req.session['admin_id'] = data[0].ID;
                            res.redirect('/admin/')
                        } else {
                            res.status(400).send('密码错误').end();
                        }
                    }
                }
            }
        );
    });

    return router;
};

