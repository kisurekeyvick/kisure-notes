/** 
 * 性能分析
 * 我们把要被测量的代码放到两个计时器调用之间，分别是内置console对象上的time和timeEnd
 * 这里定义定时器nice fish
 * 操作结束以后，用相同的计时器名字去调用console.timeEnd
 */

console.time('nice fish');
for(let i = 0; i < 1000; i++) {
    var a = i;
}
console.timeEnd('nice fish');

/** 
 * 生命周期概览
 * 
 * 当我们输入一个url的时候发生了一些事情：
 * (1)输入url以后，浏览器会生成请求，并发送至服务器
 * (2)服务器接收请求以后，执行某些动作或者获取某些资源，将响应发送给客户端
 * (3)浏览器接收到资源以后，通过html，css和js来进行构建页面
 * (4)监控事件队列，一次处理其中的一个事件
 * (5)用户进行点击页面进行交互的时候，会执行第四步
 * (6)关闭web页面，应用生命周期结束
 */

/** 
 * js中的全局对象
 * 浏览器暴露给js引擎的主要全局对象是window对象，它代表了包含着一个页面的窗口。
 * window对象是获取所有其他全局对象，全局变量，和浏览器API的访问途径。
 * 全局window对象最重要的属性是document，它代表了当前页面的dom。通过document，可以对document进行增删改
 */

/** 
 * HTML解析和DOM构建
 * 
 * (1)页面构建阶段始于浏览器接收HTML代码时，该阶段为浏览器构建页面UI的基础，通过解析收到的HTML代码，构建一个个HTML元素，构建DOM。
 * (2)DOM是根据HTML来创建的,你可以把HTML代码看作浏览器页面UI构建初始DOM的蓝图。
 *      为了正确构建每个DOM，浏览器还会修复它在蓝图中发现的问题。
 *      例如：错误的html：
 *              <html>
 *                  <head><p>test</p></head>
 *                  <body></body>
 *              </html>
 * 
 *          最终浏览器会将错误的html进行修改
 *              <html>
 *                  <head></head>
 *                  <body>
 *                      <p>test</p>
 *                  </body>
 *              </html>
 * (3)
 */

/** 
 * 在页面构建阶段执行js代码
 * 当浏览器在页面构建阶段，遇到了脚本节点，它会停止HTML到DOM的构建，转而开始执行js代码，也就是执行包含脚本元素的全局js代码。
 * 
 * 那么我们为什么要将js代码放在最后面？
 * 因为即使js能在任何程度上修改dom结构，它能够创建新的节点或者移除现有DOM节点，但它不能对未创建的节点进行选择和修改。
 * 如果我们把js代码放在最后，那么我们就不用担心某个HTML元素是否已经加载为DOM
 */

/** 
 * js代码分为两种不同的类型：全局代码和函数代码
 * 区别(1) 在于它们的位置：
 *      全局代码：包含在函数内的代码叫作函数代码
 *      函数代码：在所有函数以外的代码叫作全局代码
 * 区别(2) 执行不同：
 *      全局代码由js引擎,以一种直接的方式自动执行，每当遇到这样的代码就一行接一行地执行。
 *      执行函数代码,则必须被其他代码调用。既可以是全局代码，也可以是其他函数，还可以由浏览器调用
 */

/** 
 * js事件处理
 * (1) 浏览器执行环境的核心思想基于：同一时刻只能执行一个代码片段，即所谓的单线程执行模型。
 * (2) 当一个事件抵达后，浏览器需要执行相应的事件处理函数，但是如果单个任务执行时间很长，那么可能会造成后面的任务等待很长时间。
 *      所以浏览器使用了事件队列来跟踪已经发生但尚未处理的事件。
 * (3) 事件处理过程：
 *       I: 浏览器检查事件队列头
 *       II：如果浏览器没有在队列中检测到事件，则继续检查
 *       III:如果浏览器在队列头中检测到了事件，则取出该事件并执行相应的事件处理器（如果存在）。
 *              在这个过程中，余下的事件在事件队列中耐心等待，直到轮到它们被处理。
 * (4)事件处理器：当某个特定事件发生后我们希望执行的函数。
 */

/** 
 * 注册事件处理器
 * 两种方式注册事件：
 *  (1) 通过把函数赋给某个特殊属性
 *      将一个函数赋值给window对象上的某个特定属性onload：window.onload = function(){};
 *      通过这种方式，事件处理器就会注册到load事件上（当DOM已经就绪并全部构建完成，就会触发这个事件）
 * 
 *      注意！！：
 *      把函数赋值给特殊属性是一种简单而直接的注册事件处理器方式，但是并不推荐，缺点是只能对某个事件只能注册一个事件处理器
 * 
 *  (2) 通过使用内置addEventListener方法
 *      document.body.addEventListener('mousemove', () => {....})
 *      我们可以使用addEventListener对相同的事件注册多个事件处理器
 */

/** 
 * js忍者秘籍 - 第二章 - 页面构建过程 - 总结：
 * 
 * (1) 浏览器接收的HTML代码用作创建DOM的蓝图，它是客户端Web应用结构的内部展示阶段
 * (2) 客户端Web应用的执行分为两个阶段(客户端Web应用的两个生命周期阶段):
 *          I: 页面的构建——页面构建代码是用于创建DOM的，而全局JavaScript代码是遇到script节点时执行的。
 *              在这个执行过程中，JavaScript代码能够以任意程度改变当前的DOM，还能够注册事件处理器
 *              ——事件处理器是一种函数，当某个特定事件（例如，一次鼠标单击或键盘按压）发生后会被执行。
 *              注册事件处理器很容易：使用内置的addEventListener方法。
 *          II：事件处理——在同一时刻，只能处理多个不同事件中的一个，处理顺序是事件生成的顺序。
 *               事件处理阶段大量依赖事件队列，所有的事件都以其出现的顺序存储在事件队列中。
 *               事件循环会检查事件队列的队头，如果检测到了一个事件，那么相应的事件处理器就会被调用。
 */

