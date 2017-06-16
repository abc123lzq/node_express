/**
 * 这只是node加密api之crypto里面的md5加密方法，
 * 还有很多种加密可以看org !
 */

const common = require('../libs/common');

var str = '123456';
str = common.md5(str + common.md5_SUFFIX);
console.log(str);


