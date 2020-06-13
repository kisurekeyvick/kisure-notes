/**
 * https://juejin.im/post/5c10e5a9f265da611c26d634
 * 
 * Web Worker
 */

/**
 * 简介：
 * 
 * Web Worker是HTML5中提出的概念，分为两种类型，专用线程和共享线程
 * 专用线程：仅能被创建它的脚本所使用（一个专用线程对应一个主线程）
 * 共享线程：共享线程能够在不同的脚本中使用（一个共享线程对应多个主线程）
 */

/**
 * web worker的用途：
 * 
 * 可以将一些耗时的数据处理操作从主线程中剥离，使主线程更加专注于页面渲染和交互。
 * 例如： 懒加载，文本分析，流媒体数据处理，canvas 图形绘制，图像处理
 * 
 * 注意点：
 * (1) 有同源限制
 * (2) 无法访问 DOM 节点
 * (3) 运行在另一个上下文中，无法使用Window对象
 * (4) Web Worker 的运行不会影响主线程，但与主线程交互时仍受到主线程单线程的瓶颈制约。
 *      换言之，如果 Worker 线程频繁与主线程进行交互，主线程由于需要处理交互，仍有可能使页面发生阻塞
 * (5) 共享线程可以被多个浏览上下文（Browsing context）调用，但所有这些浏览上下文必须同源（相同的协议，主机和端口号）
 */ 
 
/**
 * 由于专用线程和共享线程的构造方法都包含在 window 对象中，我们在使用两者之前可以对浏览器的支持性进行判断。
 */
if (window.Worker) {
    // ...
}

if (window.SharedWorker) {
    // ...
}

/**
 * 线程创建：
 * 
 * 专用线程由 Worker()方法创建，可以接收两个参数，
 * 第一个参数是必填的脚本的位置，
 * 第二个参数是可选的配置对象，可以指定 type、credentials、name 三个属性。
 * 
 * 共享线程使用 Shared Worker() 方法创建，同样支持两个参数，用法与 Worker() 一致。
 */
var worker = new Worker('worker.js');
var sharedWorker = new SharedWorker('shared-worker.js');

/**
 * 数据的传递：
 * 
 * Worker 线程和主线程都通过 postMessage() 方法发送消息，通过 onmessage 事件接收消息。
 * 在这个过程中数据并不是被共享的，而是被复制的。
 * postMessage() 一次只能发送一个对象， 如果需要发送多个参数可以将参数包装为数组或对象再进行传递。
 */
// 主线程
var worker = new Worker('worker.js')
worker.postMessage([10, 24])
worker.onmessage = function(e) {
    console.log(e.data)
}

// Worker 线程
onmessage = function (e) {
    if (e.data.length > 1) {
        postMessage(e.data[1] - e.data[0])
    }
}


