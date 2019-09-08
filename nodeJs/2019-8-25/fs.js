/** 
 * fs 文件
 */
const fs = require('fs');

fs.unlink('./nice-fish.txt', err => {
    if (err) {
        console.log(err);
    }

    console.log('nice-fish.txt 已经被删除');
});

fs.mkdir('nice-fish', function() {
    console.log('完成创建文件：nice-fish');

    setTimeout(() => {
        fs.rmdir('nice-fish', function() {
            console.log('完成删除文件： nice-fish')
        });
    }, 3000);
});

/** 
 * fs.mkdir 创建文件夹
 * fs.writeFile 创建文件，如果文件已经存在，那么就会修改这个文件
 * fs.unlink 删除文件或者符号链接
 * fs.rmdir 删除文件夹
 */
fs.mkdir('./demo-file', function() {
    const content = 'console.log("file is created js")';
    fs.writeFile('./demo-file/demo.js', content, 'utf8', error => {
        if (error) {
            console.log(error);
        }

        fs.readFile('./demo-file/demo.js', 'utf8', (err, data) => {
            fs.mkdir('./demo-file/copy', () => {
                fs.writeFile('./demo-file/copy/copy.js', data, () => {
                    console.log('拷贝成功！！');
                });
            })
        });
    });
});

/** 
 * fs.createReadStream 文件读取的流
 * fs.createWriteStream 文件写入的流
 */
const myReadStream = fs.createReadStream('./readme.txt');
const myWriteStream = fs.createWriteStream('./writeme.txt');
const myWriteStream_2 = fs.createWriteStream('./writeme_2.txt');
myReadStream.setEncoding('utf8');

/**
 * 这里我们需要注意的是：
 * 如果不加上utf8，那么文件读取出来的是Buffer
 * 
 * 读取文件格式，然后以utf8格式输出的方式可以有两种：
 * (1) fs.createReadStream('./readme.txt', 'utf8');
 * (2) myReadStream.setEncoding('utf8');
 */

// let data = '';
myReadStream.on('data', (chunk) => {
    // data += chunk;
    // myWriteStream.write(chunk);
});

myReadStream.on('end', () => {
    // console.log(data);
});

const writeData = 'nice fish kisure';
myWriteStream.write(writeData);
myWriteStream.end();
myWriteStream.on('finish', () => {
    console.log('finish');
});

myReadStream.pipe(myWriteStream_2);

/** 
 * readable 通过 pipe（管道）传输给 writable
 * 
 * emit(pipe)，通知写入
 * .write()，新数据过来，写入
 * .pause()，消费者消费速度慢，暂停写入
 * .resume()，消费者完成消费，继续写入
 * return writable，支持链式调用
 */
Readable.prototype.pipe = function(writable, options) {
    this.on('data', (chunk) => {
      let ok = writable.write(chunk);
      if(!ok) this.pause();// 背压，暂停
      
    });
    writable.on('drain', () => {
      // 恢复
      this.resume();
    });
    // 告诉 writable 有流要导入
    writable.emit('pipe', this);
    // 支持链式调用
    return writable;
};
