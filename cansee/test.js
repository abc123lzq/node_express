/***
 * node api之path
 * 这个可以用来切割字符串返回json
 * 我们知道上文件req中的flies会自动生成字符串
 * 所以我们切割他的时候可以得到更好的命名与路径
 * 在配合node api之fs进行改名！
 */
const pathLib = require('path');

var obj = pathLib.parse('/root/aaa/bb/1.txt');
console.log(obj);

// { root: '/',
//     dir: '/root/aaa/bb',
//     base: '1.txt',
//     ext: '.txt',
//     name: '1' }


