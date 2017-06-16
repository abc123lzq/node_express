const crypto = require('crypto');


module.exports = {
    //后面随便加个字符串防止md5解密,不过这串不能丢
    md5_SUFFIX: '^*ggg*&^g45JKH77jkkk8%^%%*(*HHJ8*(YH9(^6h886h78))阿士大夫士大夫解决)',
    md5: function (str) {
        var obj = crypto.createHash('md5');
        obj.update(str);
        return obj.digest('hex');
    }
};
