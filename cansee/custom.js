/***
 * 这不是给人看各种重复操作，各种回调地狱
 * 没关系，就当做熟悉express,多打了几遍
 * 当然后面我们肯定会进行优化的
 */
const express = require('express');
const common = require('../../libs/common');
const mysql = require('mysql');
const fs = require('fs');

const pathLib = require('path');

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'learn'
});


module.exports = function () {
    var router = express.Router();

    router.get('/', function (req, res) {
        switch (req.query.act) {
            case 'mod':
                db.query(`SELECT *FROM custom_evaluation_table WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        console.error(err);
                        req.status(500).send('数据库查询失败').end()
                    } else if (data.length === 0) {
                        res.status(500).send('no this evaluation ').end()
                    } else {
                        db.query(`SELECT *FROM custom_evaluation_table`, (err, evaluations) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send('数据库查询失败').end()
                            } else {
                                res.render('admin/custom.ejs', {evaluations, mod_data: data[0]})
                            }

                        })

                    }
                });
                break;
            case 'del':
                db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.query.id} `, (err, data) => {
                    if (err) {
                        console.error(err);//打出错的地方省的自己瞎找，必写省心啊
                        res.status(500).send('database error1').end();
                    } else {
                        if (data.length === 0) {
                            res.status(404).send('database error').end();
                        } else {
                            //node api之fs删除文件
                            fs.unlink('static/upload/' + data[0].src, (err) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).send('file opration error').end();
                                } else {
                                    db.query(`DELETE FROM  custom_evaluation_table WHERE ID=${req.query.id}`, (err, data) => {
                                        if (err) {
                                            console.error(err);
                                            res.status(500).send('database error2').end();
                                        } else {
                                            res.redirect('/admin/custom')
                                        }

                                    });
                                }

                            })
                        }
                    }

                });
                break;
            default:
                db.query(`SELECT *FROM custom_evaluation_table`, (err, evaluations) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('数据库查询失败').end()
                    } else {
                        res.render('admin/custom.ejs', {evaluations})
                    }

                })
        }


    });
    router.post('/', function (req, res) {
        var title = req.body.title;
        var description = req.body.description;

        if (req.files[0]) {
            var ext = pathLib.parse(req.files[0].originalname).ext;

            var oldPath = req.files[0].path;
            var newPath = req.files[0].path + ext;

            var newFileName = req.files[0].filename + ext;
        } else {
            var newFileName = null;
        }

        if (newFileName) {
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('file opration error').end();
                } else {
                    if (req.body.mod_id) {  //修改
                        //先删除老的
                        db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.body.mod_id}`, (err, data) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send('database error').end();
                            } else if (data.length == 0) {
                                res.status(404).send('old file not found').end();
                            } else {
                                fs.unlink('static/upload/' + data[0].src, (err) => {
                                    if (err) {
                                        console.error(err);
                                        res.status(500).send('file opration error').end();
                                    } else {
                                        db.query(`UPDATE custom_evaluation_table SET \
                      title='${title}', description='${description}', \
                      src='${newFileName}' \
                      WHERE ID=${req.body.mod_id}`, (err) => {
                                            if (err) {
                                                console.error(err);
                                                res.status(500).send('database error').end();
                                            } else {
                                                res.redirect('/admin/custom');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else {                //添加
                        db.query(`INSERT INTO custom_evaluation_table \
            (title, description, src)
            VALUES('${title}', '${description}', '${newFileName}')`, (err, data) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send('database error').end();
                            } else {
                                res.redirect('/admin/custom');
                            }
                        });
                    }
                }
            });
        } else {
            if (req.body.mod_id) {  //修改
                //直接改
                db.query(`UPDATE custom_evaluation_table SET \
          title='${title}', description='${description}' \
          WHERE ID=${req.body.mod_id}`, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/custom');
                    }
                });
            } else {                //添加
                db.query(`INSERT INTO custom_evaluation_table \
        (title, description, src)
        VALUES('${title}', '${description}', '${newFileName}')`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/custom');
                    }
                });
            }
        }
    });


    return router;
};