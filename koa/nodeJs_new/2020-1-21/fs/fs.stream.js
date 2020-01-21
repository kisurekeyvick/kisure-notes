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
