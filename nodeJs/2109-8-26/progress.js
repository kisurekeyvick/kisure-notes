/** 
 * https://juejin.im/post/5ad4d5066fb9a028e25e0a8a
 * 
 * nodejs progress 进程
 */

/** 
 * (1) process
 * process 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，
 * 以及控制当前 Node.js 进程。因为是全局变量，所以无需使用 require()。
 * 在Node.js中每个应用程序都是一个进程类的实例对象。
 */

/** 
 * (2) 进程对象属性
 * - env 操作系统环境信息
 * - platform 运行平台。 如 darwin、freebsd、linux、sunos、win32
 * - stdin 标准输入流可读流，默认暂停状态
 * - stdout 标准输出可写流，同步操作
 * - argv 属性值为数组
 * - title 窗口标题
 */

/** 
 * (3) 方法
 * - memoryUsage 内存占用情况
 *      process.memoryUsage()  会返回如下数据：
 * 
 *      rss（resident set size）：所有内存占用，包括指令区和堆栈。
 *      heapTotal："堆"占用的内存，包括用到的和没用到的。
 *      heapUsed：用到的堆的部分。
 *      external： V8 引擎内部的 C++ 对象占用的内存。
 * 
 * - nextTick
 *      process.nextTick(callBackFunc);
 * 
 *      将 callback 添加到下一个时间点的队列。 
 *      一旦当轮的事件循环全部完成，则调用下一个时间点的队列中的所有回调。
 *      这不是 setTimeout(fn, 0) 的简单别名。 它的效率更高。 
 *      它会在事件循环的下一个时间点中触发任何其他 I/O 事件（包括定时器）之前运行。
 *           
 * - chdir     
 *      process.chdir(directory);
 * 
 *      变更Node.js进程的当前工作目录
 * 
 * - cwd
 *      process.cwd();  返回当前的目录
 * 
 * - exit 
 *      process.exit(); 退出运行nodejs应用程序的进程
 * 
 * - stdin  信号事件
 *      process.stdin.resume();
        process.on('SIGINT',function(){
            console.log('接收到SIGINT信号');
        });
 */

 /** 
 * (5) process进程
 * 
 * // 直接在终端输入
 * process.stdout.write("请输入用户名:");
 * 
 * // 终端接收到输入，触发
 * process.stdin.on('data',(input)=>{})
 * 
 * // process.nextTick() 方法将 callback 添加到下一个时间点的队列。 
 * 一旦当轮的事件循环全部完成，则调用下一个时间点的队列中的所有回调。
 * 这不是 setTimeout(fn, 0) 的简单别名。 它的效率更高。 
 * 它会在事件循环的下一个时间点中触发任何其他 I/O 事件（包括定时器）之前运行。
 * process.nextTick(callBackFunc)
 */

process.stdout.write("请输入用户名:");
process.stdin.on('data', input => {
    input=input.toString().trim();
    console.log(`你输入的用户名是：${input}`);
});

console.log(process.memoryUsage());

console.log(`开始目录: ${process.cwd()}`);

try {
    process.chdir('../../../kisure-nodejs');
    console.log(`新的工作目录: ${process.cwd()}`);
} catch (err) {
    console.error(`chdir: ${err}`);
}
