/** 
 * NodeJS提供了基本的文件操作API，但是像文件拷贝这种高级功能就没有提供，因此我们先拿文件拷贝程序练手。
 * 与copy命令类似，我们的程序需要能接受源文件路径与目标文件路径两个参数。
 */

/** 
 *（1）小文件拷贝
 */
const fs = require('fs');

function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
    // 使用fs.readFileSync从源路径读取文件内容，并使用fs.writeFileSync将文件内容写入目标路径
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));

// process是一个全局变量，可通过process.argv获得命令行参数
// 由于argv[0]固定等于nodejs执行程序的绝对路径，argv[1]固定等于主模块的绝对路径，因此第一个命令行参数从argv[2]这个位置开始。

/** 
 * (2) nodejs 动态接收和处理命令行参数
 * 当我们在当前目录运行js代码的时候：node file.js nice fish
 * 那么就会打印出：
        [ 
            '/usr/local/bin/node',
            '/Users/kisure/Documents/GitHub/kisure-notes/nodeJs/2019-8-17/demo.js',
            'nice',
            'fish' 
        ]
 * 
 */
const { node, path, ...args } = process.argv;
console.log(process.argv);
console.log("node=" + node);    // 节点
console.log("path=" + path);    // 路径
console.log("args=" + args);    // ['nice', 'fish']

/** 
 * (3) 大文件的拷贝
 * 上边的程序拷贝一些小文件没啥问题，但这种一次性把所有文件内容都读取到内存中后再一次性写入磁盘的方式不适合拷贝大文件，内存会爆仓。
 * 对于大文件，我们只能读一点写一点，直到完成拷贝。
 * 因此上边的程序需要改造如下。
 */
const fs = require('fs');

function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));

/** 
 * 以上程序使用fs.createReadStream创建了一个源文件的只读数据流，并使用fs.createWriteStream创建了一个目标文件的只写数据流，
 * 并且用pipe方法把两个数据流连接了起来。
 * 连接起来后发生的事情，说得抽象点的话，水顺着水管从一个桶流到了另一个桶。
 */

/** 
 * (4) Buffer
 * JS语言自身只有字符串数据类型，没有二进制数据类型，因此NodeJS提供了一个与String对等的全局构造函数Buffer来提供对二进制数据的操作。
 * 除了可以读取文件得到Buffer的实例外，还能够直接构造
 * 总之，Buffer将JS的数据处理能力从字符串扩展到了任意二进制数据。
 */
const bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);

// Buffer与字符串类似，除了可以用.length属性得到字节长度外，还可以用[index]方式读取指定位置的字节，例如：
bin[0]; // => 0x68;

// Buffer与字符串能够互相转化，例如可以使用指定编码将二进制数据转化为字符串：
const str = bin.toString('utf-8'); // => "hello"

/** 
 * Buffer与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。
 * 至于Buffer，更像是可以做指针操作的C语言数组。例如，可以用[index]方式直接修改某个位置的字节。
 * 
 * bin[0] = 0x48;
 */

// 而.slice方法也不是返回一个新的Buffer，而更像是返回了指向原Buffer中间的某个位置的指针，如下所示:
// [ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]
//     ^           ^
//     |           |
//    bin     bin.slice(2)

/** 
 * 因此对.slice方法返回的Buffer的修改会作用于原Buffer，例如：
 */
const bin_1 = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
const sub_1 = bin_1.slice(2);

sub_1[0] = 0x65;
console.log(bin_1); // => <Buffer 68 65 65 6c 6f>

/** 
 * 如果想要拷贝一份Buffer，得首先创建一个新的Buffer，并通过.copy方法把原Buffer中的数据复制过去。
 * 这个类似于申请一块新的内存，并把已有内存中的数据复制过去。
 */
const bin_2 = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
const dup_2 = new Buffer(bin_2.length);

bin_2.copy(dup_2);

/** 
 * (5) stream流
 * 当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流。
 * NodeJS中通过各种Stream来提供对数据流的操作。
 * 
 * 以上边的大文件拷贝程序为例，我们可以为数据来源创建一个只读数据流，示例如下：
 */
const rs = fs.createReadStream(pathname);

rs.on('data', function(chunk) {
    // do smth
});

rs.on('end', function() {
    cleanup();
});

/** 
 * Stream基于事件机制工作，所有Stream的实例都继承于NodeJS提供的EventEmitter。
 */
const fs_1 = fs.createReadStream(src);
const ws = fs.createWriteStream(dst);

fs_1.on('data', function(chunk) {
    // .pause()方法将使流动模式的流停止发射'data'事件，切换出流动模式。任何可用的数据都将保留在内部缓冲区中。
    // .pause()如果存在'readable' 事件侦听器，则该方法无效。
    // fs_1.pause();
    // doSomething(chunk, function () {
    //     // .resume()方法使得显式暂停的Readable流恢复发送'data'事件，将流切换到流动模式
    //     rs.resume();
    // });

    /** 
     * 如果写入速度跟不上读取速度的话，只写数据流内部的缓存会爆仓。
     * 我们可以根据.write方法的返回值来判断传入的数据是写入目标了，还是临时放在了缓存了，
     * 并根据drain事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据了。
     */
    if (ws.write(thunk) === false) {
        rs.pause();
    }
});

rs.on('end', function () {
    // 表示写入的流结束
    ws.end();
});

ws.on('drain', function() {
    // drain 代表的意思是内存里面的东西用完了，于是内存空了
    rs.resume();
});

/** 
 * 以上代码实现了数据从只读数据流到只写数据流的搬运，并包括了防爆仓控制。
 * 因为这种使用场景很多，例如上边的大文件拷贝程序，NodeJS直接提供了.pipe方法来做这件事情，其内部实现方式与上边的代码类似
 */

/** 
 * (6) NodeJS通过fs内置模块提供对文件的操作。fs模块提供的API基本上可以分为以下三类：
 * 一：文件属性读写。
 *          其中常用的有fs.stat、fs.chmod、fs.chown等等。
 * 
 * 二：文件内容读写。
 *          其中常用的有fs.readFile、fs.readdir、fs.writeFile、fs.mkdir等等
 * 
 * 三：底层文件操作。
 *          其中常用的有fs.open、fs.read、fs.write、fs.close等等。
 */

// 基本上所有fs模块API的回调参数都有两个。第一个参数在有错误发生时等于异常对象，第二个参数始终用于返回API方法执行结果
fs.readFileSync(pathname, function(err, data) {

});

// 同步API除了方法名的末尾多了一个Sync之外，异常对象与执行结果的传递方式也有相应变化。同样以fs.readFileSync为例：
try {
    var data = fs.readFileSync(pathname);
    // Deal with data.
} catch (err) {
    // Deal with error.
}

/** 
 * (7) path 路径
 * 操作文件时难免不与文件路径打交道。NodeJS提供了path内置模块来简化路径相关操作，并提升代码可读性。
 */

/** 
 * path.normalize
 * 
 * 将传入的路径转换为标准路径，具体讲的话，除了解析路径中的.与..外，还能去掉多余的斜杠。
 * 如果有程序需要使用路径作为某些数据的索引，但又允许用户随意输入路径时，就需要使用该方法保证路径的唯一性。
 */
var cache = {};

function store(key, value) {
    cache[path.normalize(key)] = value;
}

store('foo/bar', 1);
store('foo//baz//../bar', 2);
console.log(cache);  // => { "foo/bar": 2 }

// 标准化之后的路径里的斜杠在Windows系统下是\，而在Linux系统下是/。
// 如果想保证任何系统下都使用/作为路径分隔符的话，需要用.replace(/\\/g, '/')再替换一下标准路径。

/** 
 * path.join
 * 
 * 将传入的多个路径拼接为标准路径。该方法可避免手工拼接路径字符串的繁琐，并且能在不同系统下正确使用相应的路径分隔符。
 * 
 * path.join('foo/', 'baz/', '../bar'); // => "foo/bar"
 */

/** 
 * path.extname
 * 
 * 当我们需要根据不同文件扩展名做不同操作时，该方法就显得很好用。
 */
path.extname('foo/bar.js'); // => ".js"
