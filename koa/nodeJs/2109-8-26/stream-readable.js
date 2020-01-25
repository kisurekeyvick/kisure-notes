/** 
 * https://juejin.im/post/5ac1a4665188255c4c106cb1
 * 
 * nodejs流：readable
 */

/** 
 * (1) 什么是可读流
 * 可读流是生产数据用来供程序消费的流。我们常见的数据生产方式有读取磁盘文件、读取网络请求内容等。
 * 
 * const rs = fs.createReadStream(filePath);
 * 
 * rs 就是一个可读流，其生产数据的方式是读取磁盘的文件，我们常见的控制台 process.stdin 也是一个可读流：
 * process.stdin.pipe(process.stdout);
 */

/** 
 * (2) 为什么要用流
 * 读取一个文件，使用 fs.readFileSync 同步读取一个文件，程序会被阻塞，所有的数据都会被读取到内存中。
 * 换用 fs.readFile 读取文件，程序不会被阻塞，但是所有的数据依旧会被一次性全部被读取到内存中。
 * 当处理大文件压缩、归档、媒体文件和巨大的日志文件的时候，内存使用就成了问题，
 * 现在大家一般家用机内存大多数都是8G、16G，软件包还在日益增大，在这种情况下，流的优势就体现出来了。
 */

/** 
 * (3) 流的类型
 * 
 * Node.js 中有四种基本的流类型：
 * -    Readable - 可读的流 (例如 fs.createReadStream()).
 * -    Writable - 可写的流 (例如 fs.createWriteStream()).
 * -    Duplex - 可读写的流 (例如 net.Socket).
 * -    Transform - 在读写过程中可以修改和变换数据的 Duplex 流 (例如 zlib.createDeflate()).
 */

/** 
 * (4) 可读流（Readable Stream）
 * 
 * 可读流有两种模式：
 * - 流动模式(flowing)：可读流自动读取数据，通过EventEmitter接口的事件尽快将数据提供给应用。
 * - 暂停模式(paused)：必须显式调用stream.read()方法来从流中读取数据片段。
 * 
 * 可以通过三种途径切换到流动模式:
 * - 监听 'data' 事件
 * - 调用 stream.resume() 方法
 * - 调用 stream.pipe() 方法将数据发送到 Writable
 * 
 * 流动模式切换到暂停模式的api有：
 * - 如果不存在管道目标，调用stream.pause()方法
 * - 如果存在管道目标，调用 stream.unpipe()并取消'data'事件监听
 * 
 * 可读流事件：'data','readable','error','close','end'
 */

/** 
 * (5) flowing模式
 */
const fs = require('fs')
const path = require('path')
const rs = fs.createReadStream(path.join(__dirname, './readme.txt'))

// rs.setEncoding('utf8')

// rs.on('data', (data) => {
//     console.log(data)
// });

/** 
 * (6) paused模式
 */
rs.setEncoding('utf8')

rs.on('readable', () => {
    let d = rs.read();
    console.log(d)
})

