/** 
 * Node.js 中的 fs 模块是文件操作的封装，
 * 它提供了文件读取、写入、更名、删除、遍历目录、链接等 POSIX 文件系统操作。
 * 与其它模块不同的是，fs 模块中所有的操作都提供了异步和同步的两个版本,
 * 具有 sync 后缀的方法为同步方法，不具有 sync 后缀的方法为异步方法
 */

/**
 * 灵魂一问：
 *  说几个 fs模块的常用函数？
 *  什么情况下使用 fs.open的方式读取文件？
 *  用 fs模块写一个大文件拷贝的例子(注意大文件)？
 */

/**
 * (1) 权限位 mode
 * 
 * 文件权限表：
 *      权限分配          文件所有者          文件所属组          其他用户
 *      权限项          读  写   执行       读  写   执行       读  写   执行
 *      字符表示        r   w    x          r   w    x         r   w    x 
 *      数字表示        4   2    1          4   2    1         4   2    1
 */

/**
 * (2) flag
 * 
 * Node.js 中，标识位代表着对文件的操作方式，如可读、可写、即可读又可写等等，如图【node.fs.flag.png】
 * 
 * 总结了一个加速记忆的方法：
 * r:读取
 * w:写入
 * s:同步
 * +:增加相反操作
 * x:排他方式
 * 
 * r+ 和 w+ 的区别：
 * 当文件不存在时，r+ 不会创建文件，而会抛出异常，但 w+ 会创建文件;
 * 如果文件存在，r+ 不会自动清空文件，但 w+ 会自动把已有文件的内容清空。
 */

/**
 * (3) 文件描述符 fs
 * 
 * 操作系统会为每个打开的文件分配一个名为文件描述符的数值标识，
 * 文件操作使用这些文件描述符来识别与追踪每个特定的文件，
 * Window 系统使用了一个不同但概念类似的机制来追踪资源，为方便用户，
 * NodeJS 抽象了不同操作系统间的差异，为所有打开的文件分配了数值的文件描述符。
 * 
 * 在 Node.js 中，每操作一个文件，文件描述符是递增的，文件描述符一般从 3 开始，
 * 因为前面有 0、1、2 三个比较特殊的描述符，分别代表 
 * process.stdin（标准输入）、 
 * process.stdout（标准输出）、
 * process.stderr（错误输出）。
 */

/**
 * (4) 文件读取-fs.readFile
 */
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'nice-fish.txt');
const filePath_2 = path.join(__dirname, 'nice-fish.txt');
const filePath_3 = path.join(__dirname, 'nice-fish_3.txt');
// 异步读取文件
fs.readFile(filePath, 'utf8', (err, data) => {
    console.log(data);
});
// 同步读取文件
const fileResult_2 = fs.readFileSync(filePath_2, 'utf8');
console.log('fileResult_2', fileResult_2);

/**
 * (5) 文件写入fs.writeFile
 */
// 写入文件内容(如果文件不存在会创建一个文件)
fs.writeFile(filePath, '写入时会先清空文件', (err) => {
    if (err) {
        throw err;
    }
    // 写入成功后读取测试
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('new data =>:', data);
});

// 通过文件写入并利用flag也可以实现文件追加
fs.writeFile(filePath, '这是追加的数据', {'flag': 'a'}, function(err) {
    if (err) {
        throw err;
    }
    console.log('success');
    const data_1 = fs.readFileSync(filePath, 'utf8');
    console.log('利用flag追加数据', data_1);
});

/**
 * (6) 文件追加-appendFile
 */
fs.appendFile(filePath, '通过使用fs.appendFile进行追加内容', (err) => {
    if (err) {
        throw err;
    }
    // 写入成功后读取测试
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('fs.appendFile以后的结果：', data);
});

/**
 * (7) 拷贝文件-copyFile
 */
fs.copyFileSync(filePath, filePath_3);
const filePath_3_Content = fs.readFileSync(filePath_3, 'utf8');
console.log('filePath_3_Content:', filePath_3_Content);

/**
 * (8) 删除文件-unlink
 */
// fs.unlink(fileName, callBack);
// fs.unlinkSync(fileName, callBack);

/**
 * (9) 指定位置读写文件操作(高级文件操作)
 * 
 * 接下来的高级文件操作会与上面有些不同，流程稍微复杂一些，要先用 fs.open来打开文件，
 * 然后才可以用 fs.read去读，或者用 fs.write去写文件，最后，你需要用 fs.close去关掉文件。
 * 
 * (特殊说明：read 方法与 readFile 不同，一般针对于文件太大，无法一次性读取全部内容到缓存中或文件大小未知的情况，都是多次读取到 Buffer 中。)
 * 
 * 
 */
/**
 * (9.1) 文件打开-fs.open
 * 
 * fs.open(filePath, flags, [[mode]文件权限,这个参数是可选的，默认值是0666], callback);
 */
const buf = Buffer.alloc(6); // 创建6字节长度的buf缓存对象
fs.open(filePath, 'r', '0666', (err, fd) => {
    /** 
     * - fd         文件描述符，需要先使用 open 打开，使用 fs.open打开成功后返回的文件描述符
     * - buffer     一个 Buffer 对象， v8引擎分配的一段内存，要将内容读取到的 Buffer
     * - offset     整数，向 Buffer 缓存区写入的初始位置，以字节为单位
     * - length     整数，读取文件的长度
     * - position   整数，读取文件初始位置；文件大小以字节为单位
     * - callback   回调函数，有三个参数 err（错误），bytesRead（实际读取的字节数），
     *                  buffer（被写入的缓存区对象），读取执行完成后执行。
     */
    // 文件读取-fs.read
    fs.read(fd, buf, 0, 3, 0, (err, bytesRead, buffer) => {

    });

    // 文件写入-fs.write
    // fs.write(fd, buffer, offset, length, position, callback);

    // 文件关闭-fs.close
    // fs.open(filePath, 'r', (err, fd) => {
    //     fs.close(fd, err => {
    //         console.log('关闭成功')
    //     });
    // });
});

/**
 * (10) fs.mkdir 创建目录
 * 
 * fs.mkdir(path, (err) => {})
 */

/**
 * (11) fs.rmdir删除目录
 * 
 * fs.rmdir(path, (err) => {});
 */

/**
 * (12) 小文件拷贝
 */
const fileName_1 = path.resolve(__dirname, 'data.txt');
fs.readFile(fileName_1, (err, data) => {
    if (err) {
        throw err;
    }
    // 得到文件内容
    const dataSrc = data.toString();
    // 写入文件
    const fileName_2 = path.resolve(__dirname, 'copyData.txt');
    fs.writeFile(fileName_2, dataSrc, (err) => {
        if (err) {
            throw err;
        }
    });
});

/**
 * (13) 大文件拷贝
 * 
 * 如果是一个大文件几百M一次性读取写入不现实，所以需要多次读取多次写入，
 * 接下来使用文件操作的高级方法对大文件和文件大小未知的情况实现一个 copy 函数。
 */
function copy(src, dest, size = 16 * 1024, callBack) {
    // 打开源文件
    fs.open(src, 'r', (err, readFd) => {
        // 打开目标文件
        fs.open(dest, 'w', (err, writeFd) => {
            let buf = Buffer.alloc(size);
            let readed = 0; // 下次读取文件的位置
            let writed = 0; // 下次写入文件的位置

            function next() {
                fs.read(readFd, buf, 0, size, readed, (err, bytesRead) => {
                    readed += bytesRead;
                    // 如果得不到内容，则关闭
                    if (!bytesRead) {
                        fs.close(readFd, closeErr => {
                            console.log('关闭源文件');
                        });
                    }
                    // 写入
                    fs.write(writeFd, buf, 0, bytesRead, writed, (err, bytesWrite) => {
                        // 如果没有内容可同步缓存，那么就关闭文件执行回调
                        if (!bytesWrite) {
                            fs.fsync(writeFd, err => {
                                fs.close(writeFd, err => {
                                    return !err && callBack();
                                });
                            });
                        }

                        writed += bytesWrite;

                        // 继续读取，写入
                        next();
                    });
                });
            }

            next();
        });
    });
}
