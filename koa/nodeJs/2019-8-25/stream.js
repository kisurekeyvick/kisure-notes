/** 
 * https://www.jianshu.com/p/09368e2d8330
 * 
 * 深入理解nodejs Stream模块
 */

/** 
 * (1) 为什么应该使用流
 */
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/data.txt', function (err, data) {
        res.end(data);
    });
});
server.listen(8000);

/** 
 * 这段代码中，服务器每收到一次请求，就会先把data.txt读入到内存中，然后再从内存取出返回给客户端。
 * 尴尬的是，如果data.txt非常的大，而每次请求都需要先把它全部存到内存，再全部取出，
 * 不仅会消耗服务器的内存，也可能造成用户等待时间过长。
 */

// 然而 HTTP请求中的request对象和response对象都是流对象，于是我们可以换一种更好的方法：
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    let stream = fs.createReadStream(__dirname + '/data.txt');//创造可读流
    stream.pipe(res);//将可读流写入response
});
server.listen(8000);
// pipe方法如同stream和response之间的一个管道，将data.txt文件一小段一小段地发送到客户端，减小了服务器的内存压力。

/** 
 * 在node中，一共有五种类型的流：readable,writable,transform,duplex以及"classic"。其中最核心的是可读流和可写流
 */

/** 
 * (2) readableStream
 * 
 * 资源的数据流并不是直接流向消费者，而是先 push 到缓存池，缓存池有一个水位标记 highWatermark，超过这个标记阈值，
 * push 的时候会返回 false，从而控制读取数据流的速度，如同水管上的阀门，当水管面装满了水，就暂时关上阀门，不再从资源里“抽水”出来。
 * 
 * 可读流有两种模式，flowing和pause
 *  - flowing模式下 可读流可自动从资源读取数据 
 *  - pause模式下 需要显式调用stream.read()方法来读取数据
 * 
 * flowing模式: 缓存池就像一个空的水桶，消费者通过管口接水，同时，资源池就像一个水泵，不断地往水桶中泵水，
 *              而 highWaterMark 是水桶的浮标，达到阈值就停止蓄水。
 * 
 * pause模式: 
 *          资源池会不断地往缓存池输送数据，直到 highWaterMark 阈值，消费者需要主动调用 .read([size]) 函数才会从缓存池取出，
 *          并且可以带上 size 参数，用多少就取多少：
 * 
            const myReadable = new MyReadable(dataSource);
            myReadable.setEncoding('utf8');
            myReadable.on('data', (chunk) => {
                console.log(`Received ${chunk.length} bytes of data.`);
                myReadable.pause()
                console.log('pausing for 1 second')
                setTimeout(()=>{
                    console.log('now restart')
                    myReadable.resume()
                }, 1000)
            });             
 */

/** 
 * (3) readableStream一些需要注意的事件
 * 
 * - 'data' 事件会在流将数据传递给消费者时触发
 * - 'end' 事件将在流中再没有数据可供消费时触发
 * 'readable'  (从字面上看：“可以读的”) 事件将在流中有数据可供读取时触发。
 *  在某些情况下，为 'readable' 事件添加回调将会导致一些数据被读取到内部缓存中。
 * 'readable' 事件表明流有了新的动态：要么是有了新的数据，要么是到了流的尾部。 
 *  对于前者， stream.read() 将返回可用的数据。而对于后者， stream.read() 将返回 null。
 * 
 * 'setEncoding' 设置编码会使得该流数据返回指定编码的字符串而不是Buffer对象。
 */

/** 
 * (4) pipe
 * 
 * eadable.pipe(writable);
 */
