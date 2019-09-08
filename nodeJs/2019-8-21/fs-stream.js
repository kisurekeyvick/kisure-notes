/** 
 * fs流
 * 
 * (1) 流的读取
 */
// 新建fs
const fs = require('fs');
// 流的方式读取文件
let fileReadStream = fs.createReadStream('./index.html');
// 读取次数
let count = 0;
// 保存数据
let str = '';
// 开始读取
fileReadStream.on('data', (chunk) => {
    console.log(`${++count} 接收到：${chunk.length}`);
    str += chunk;
});

// 完成读取
fileReadStream.on('end', () => {
    console.log('-结束-');
    console.log(count);
    console.log(str);
});

// 读取失败
fileReadStream.on('error', () => {
    console.log(error);
});

/** 
 * 在这里，我们通过 fs 模块的 createReadStream 创建了读取流，然后读取文件 index.html，从而最后在控制台输出
 */

/**
 * (2) 流的写入
 */
let data = 'console.log("nice fish")';

// 创建一个可以写入的流，写入到文件index.js中
let writeStream = fs.createWriteStream('./index.txt');
// 开始写入
writeStream.write(data, 'utf-8');
// 写入完成
writeStream.end();
writeStream.on('finish', () => {
    console.log('写入完成！');
});

// 原本是没有index.txt的，但是经过写入操作，会自动创建index.txt,然后将data内容写入
