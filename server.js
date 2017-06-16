const express = require('express');
const expressStatic = require('express-static');
const expressRoute = require('express-route');
const cookiePrser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerObj = multer({dest: './static/upload'});
const mysql = require('mysql');
const consolidate = require('consolidate');

var server = express();
server.listen(8080);

//1. 获取请求数据
// get用自带的
server.use(bodyParser.urlencoded({
    extended: false
}));
//接收文件
server.use(multerObj.any());

// 2.cookie、Session
server.use(cookiePrser());
//避免污染
(function () {
    var keys = [];
    for (var i = 0; i < 10000; i++) {
        keys[i] = 'a_' + Math.random();
    }
    server.use(cookieSession({
        name: 'sess_id',
        keys: keys,
        maxAge: 20 * 60 * 100

    }));
})();

// 3.模板
server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html');

// 4.route
server.use('/', require('./route/web/index')());
server.use('/admin/', require('./route/admin/index')());

// 5.default：static
server.use(expressStatic('./static'));