/** 
 * web worker
 * 
 * 作用：就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。
 * 
 * 在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。
 * 
 * 好处：一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。
 * 
 * Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。
 * 但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。
 */

/** 
 * 基本用法
 * 
 * 主线程采用new命令，调用Worker()构造函数，新建一个 Worker 线程。
 * var worker = new Worker('work.js');
 * 
 * Worker()构造函数的参数是一个脚本文件，该文件就是 Worker 线程所要执行的任务。
 * 由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。
 * 
 * 然后，主线程调用worker.postMessage()方法，向 Worker 发消息。
 * 例如：worker.postMessage({method: 'echo', args: ['Work']});
 * 
 * worker.postMessage()方法的参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。
 * 
 * 主线程通过worker.onmessage指定监听函数，接收子线程发回来的消息
 
    worker.onmessage = function (event) {
        console.log('Received message ' + event.data);
        doSomething();
    }

    function doSomething() {
        // 执行任务
        worker.postMessage('Work done!');
    }

    事件对象的data属性可以获取 Worker 发来的数据。
    Worker 完成任务以后，主线程就可以把它关掉。
    worker.terminate();
 */

/** 
 * Worker 线程
 * 
 * Worker 线程内部需要有一个监听函数，监听message事件。
 * 
    self.addEventListener('message', function (e) {
        self.postMessage('You said: ' + e.data);
    }, false);


 */