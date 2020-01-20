/** 
 * (1) fs

    fs.stat         检测是文件还是目录
    fs.mkdir        创建目录
    fs.writeFile    创建写入文件
    fs.appendFile   追加文件
    fs.readFile     读取文件
    fs.readdir      读取目录
    fs.rename       重命名
    fs.rmdir        删除目录
    fs.unlink       删除文件
 */
// fs.stat 用于判断路径下的东西是文件还是目录
const fs = require('fs');
fs.stat('./directory', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`是文件：${data.isFile()}`);
    console.log(`是目录：${data.isDirectory()}`);
});

// fs.mkdir 创建目录
/** 
 * 这边需要注意的是，如果已经存在css目录了，那么就不会创建css文件目录，而是报错
 */
fs.mkdir('./css', (err) => {
    if (err) {
        console.log('创建失败错误信息：', err);
    }

    // 创建成功
});

// fs.writeFile 创建写入文件
/** 
 * 如果当前写入的文件不存在，那么就会创建改文件，然后写入内容
 * 如果文件存在，就会将文件内容重新覆盖
 */
fs.writeFile('./directory/css.css', 'a { color: red }', (err) => {
    if (err) {
        console.log('创建写入文件错误信息：', err);
    }

    // 创建成功
});
