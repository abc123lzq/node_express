/***
 * lzq
 * 这是没有拆分之前的逻辑比较连贯，
 * 不过这种适合小项目，
 * 大项目还是要功能分开这样有利于团队合作！
 */

const express = require('express');
const common = require('../libs/common');
const mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'learn'
});

module.exports = function () {
    var router = express.Router();


    //检查登陆状态，让用户必须登陆才能访问别的页面
    router.use((req, res, next) => {
        //防止没登录的情况下一不停的调转到这页面
        if (!req.session['admin_id'] && req.url != '/login') {
            res.redirect('/admin/login');//重定向
        } else {
            next();
        }
    });
    //不能用use因为不知道用户是要干嘛的
    //来看页面的
    router.get('/login', (req, res) => {
        res.render('admin/login.ejs');
    });

    //来提交数据
    router.post('/login', (req, res) => {
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

    router.get('/', (req, res) => {
        res.render('admin/index.ejs', {});
    });

    router.get('/banners', (req, res) => {

        switch (req.query.act) {
            case 'mod':
                db.query(`SELECT * FROM banner_table WHERE id=${req.query.id}`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else if (data.length === 0) {
                        res.status(404).send('data not found').end();
                    } else {
                        db.query('SELECT * FROM banner_table', (err, banners) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send('database error').end();
                            } else {
                                res.render('admin/banners.ejs', {banners, mod_data: data[0]});
                            }
                        });
                    }
                });
                break;
            case 'del':
                db.query(`DELETE FROM banner_table WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        res.status(500).send('数据库读取错误').end();
                    } else {
                        res.redirect('/admin/banners')
                    }
                });

                break;
            default:
                db.query(`SELECT *FROM banner_table`, (err, banners) => {
                    if (err) {
                        res.status(500).send('数据库读取错误').end();
                    } else {
                        res.render('admin/banners.ejs', {banners})
                    }
                });
                break;
        }
    });
    //添加用
    router.post('/banners', (req, res) => {
        if (req.body.mod_id) { //来修改
            //为了好看我们用 \ 这个来折行
            console.log(req.body.description);
            db.query(`UPDATE banner_table SET \
                title='${req.body.title}',\
                description='${req.body.description}',\
                href='${req.body.href}'\
                WHERE ID=${req.body.mod_id}`, (err, data) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('数据库更新失败').end();
                } else {
                    res.redirect('/admin/banners');
                }
            })

        } else { //来添加
            var title = req.body.title,
                description = req.body.description,
                href = req.body.href;
            if (!title || !description || !href) {
                res.status(400).send('请填写完整').end();
            } else {
                db.query(`INSERT INTO banner_table(title,description,href)
             VALUE('${title}','${description}','${href}')`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('数据库设计错误').end();
                    } else {
                        res.redirect('/admin/banners');
                    }
                })
            }
        }


    });
    return router;
};
