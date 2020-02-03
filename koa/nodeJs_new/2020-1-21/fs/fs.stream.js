/** 
 * 以流的方式
 */
const fs = require('fs');
/** 
 * fs.createReadStream
 * 从文件流中读取数据
 */
const readStream = fs.createReadStream('./demo.txt');

/**
 * 如果监听到data，那么代表的是已经读取到数据了
 */
let count = 0;
let str = '';
readStream.on('data', (data) => {
    str += data;
    count++;
});

/** 
 * 监听到读取完的状态
 */
readStream.on('end', () => {
    console.log(str);
    console.log(count);
});

/** 
 * 监听到错误信息
 */
readStream.on('error', (err) => {
    console.log(err);
});

let writeStr = '';
for(let i = 0; i< 500; i++) {
    str += 'nice fish';
}

let writeStream = fs.createWriteStream('./demo.txt');
writeStream.write(str);

writeStream.end();
/** 
 * 事件finish，用来监听写入完成事件
 * 但是需要注意，我们需要使用writeStream.end(); 这样才会触发finish事件
 */
writeStream.on('finish', () => {

});


/** 
 * 流的管道
 */
let readStream_1 = fs.createReadStream('./pipe.stream.txt');
let writeStream_1 = fs.createWriteStream('../../2020-1-21/pipe.stream.txt');
readStream_1.pipe(writeStream_1);

/*
    我们在使用pipe管道流以后，还可以通过on进行监听事件的状态来做出回调函数方法
*/
var crypto = require("crypto");//用来加密
var fs = require("fs");
var zlib = require("zlib");//用来压缩

var password = new Buffer(process.env.PASS || "password");
var encryptStream = crypto.createCipher('aes-256-cbc',password);

var gzip = zlib.createGzip();
var readStream = fs.createReadStream(__dirname+"/readMe.txt");
var writeStream = fs.createWriteStream(__dirname+"/out.gz");

readStream//读取
    .pipe(encryptStream)//加密
    .pipe(gzip)//压缩
    .pipe(writeStream)//写入
    .on("finish",function(){//写入结束的回调
        console.log("done");
    })