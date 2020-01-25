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


fs.writeFile('./css/move.css', 'a { color: red }', (err) => {
    if (err) {
        console.log('创建写入文件错误信息：', err);
    }

    // 创建成功
});

// fs.appendFile 追加文件
/** 
 * appendFile,如果文件不存在的话，就会先创建文件
 * 如果文件存在的话，会在文件内容的最后，追加要写入的内容
 */
fs.appendFile('./css/nice.fish.css', 'a { color: red }', (err) => {
    if (err) {
        console.log('追加文件文件错误信息：', err);
    }

    // 追加文件成功
});

// fs.readFile
fs.readFile('./css/nice.fish.css', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('读取数据', data);
    // 将buffer转化为string
    console.log(data.toString());
});

// fs.readdir 读取目录
/** 
 * readdir不仅可以读取文件目录下的文件名,也可以读取文件目录下的目录名
 */
fs.readdir('./css', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data.toString());  //  [ 'nice.fish.css' ]
});


// fs.rename
/** 
 * rename存在2个功能：(1)重命名 (2)移动文件
 */
fs.rename('./css/nice.fish.css', './css/kisure.nicefish.css', (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('重命名成功');
});

fs.rename('./css/move.css', './directory/index.css', (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('移动文件成功');
});


// fs.rmdir
/** 
 * 删除目录,但是需要注意，如果目录中存在文件的话，是不能直接删除目录的
 * 所以我们只有先删除目录中的文件，才能删除目录
 * 而要删除文件，我们是需要使用fs.unlink
 */
fs.rmdir('./css', (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('删除文件成功');
});


// fs.unlink
fs.unlink('./deleteD/deleteF.js', (err) => {
    if (err) {
        console.log(err);
        return;
    }

    fs.rmdir('./deleteD', (err1) => {
        if (err1) {
            console.log(err1);
            return;
        }

        console.log('全部删除成功');
    });
});