/**
 * fs.readFile  异步读取文件的全部内容
 * fs.readFileSync  同步读取文件的全部内容
 */
let fs = require("fs");
// let data = fs.readFileSync('nodejs-callback.txt');
// console.log('kisure', data.toString());
// console.log('执行完成');

fs.readFile('nodejs-callback.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log('执行完成');