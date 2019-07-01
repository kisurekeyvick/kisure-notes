/** 
 * https://juejin.im/post/5d1948915188256d16329d44#heading-1
 * 
 * JS引擎:它们是如何工作的?从调用堆栈到Promise，需要知道的所有内容
 */

/** 
 * 编译性语言和解释性语言的区别
 * 
 * (1) 编译性语言
 *  只须编译一次就可以把源代码编译成机器语言，后面的执行无须重新编译，直接使用之前的编译结果就可以；因此其执行的效率比较高；
 *  编译性语言代表：C、C++、Pascal/Object Pascal（Delphi）
 *  程序执行效率比较高，但比较依赖编译器，因此跨平台性差一些
 * 
 * (2) 解释性语言
 *  源代码不能直接翻译成机器语言，而是先翻译成中间代码，再由解释器对中间代码进行解释运行
 *  程序不需要编译，程序在运行时才翻译成机器语言，每执行一次都要翻译一次
 *  解释性语言代表：Python、JavaScript、Shell、Ruby、MATLAB等
 *  运行效率一般相对比较低，依赖解释器，跨平台性好；
 */

/** 
 * Js 引擎和全局内存(Global Memory)
 * 
 * JavaScript 是编译语言同时也是解释语言。JS 引擎在执行代码之前只需要几微秒就能编译代码。
 * 
 * 如何在浏览器中处理js代码 ？例如如下的代码：
    var num = 2;
    function pow(num) {
        return num * num;
    }   

 * 首先，读取这段代码的不是浏览器，是JS引擎。JS引擎读取代码，一旦遇到第一行，就会将几个引用放入全局内存。
 * 全局内存(也称为堆) JS引擎保存变量和函数声明的地方。
 * 因此，回到上面示例，当 JS引擎读取上面的代码时，全局内存中放入了两个绑定。
 * 
 * 即使示例只有变量和函数，也要考虑你的JS代码在更大的环境中运行：在浏览器中或在Node.js中。 
 * 在这些环境中，有许多预定义的函数和变量，称为全局变量。 全球记忆将比num和pow更多。
 * 
 * 但是如果我们像这样运行函数：pow(num)，当函数被调用时，JavaScript引擎会为全局执行上下文和调用栈腾出空间。
 * 
 * 总结：JS引擎如何读取变量和函数声明？
 *       - JS 引擎在执行代码之前只需要几微秒就能编译代码,然后会将相关的代码放到全局对象中(也就是堆中) 
 */

/** 
 * JS引擎:它们是如何工作的? 全局执行上下文和调用堆栈
 * 
 * JS引擎中都有一个基本组件，叫调用堆栈。
 * 调用堆栈是一个堆栈数据结构：这意味着元素可以从顶部进入，但如果它们上面有一些元素，它们就不能离开，JS 函数就是这样的。
 * 一旦执行，如果其他函数仍然被阻塞，它们就不能离开调用堆栈(因为js是单线程的)
 * 
 * 当函数被运行的时候，JS引擎将该函数推入调用堆栈，同时，JS 引擎还分配了一个全局执行上下文，这是运行JS代码的全局环境。
 * 对于嵌套函数的每个嵌套函数，引擎都会创建更多的本地执行上下文。
 */

/** 
 * JavaScript 是单线程和其他有趣的故事
 * 
 * JavaScript是单线程的，因为只有一个调用堆栈处理我们的函数。也就是说，如果有其他函数等待执行，函数就不能离开调用堆栈。
 * 当浏览器加载某些JS代码时，JS引擎会逐行读取并执行以下步骤：
 * (1) 将变量和函数的声明放入全局内存(堆)中
 * (2) 将函数的调用放入调用堆栈
 * (3) 创建全局执行上下文，在其中执行全局函数
 * (4) 创建多个本地执行上下文(如果有内部变量或嵌套函数)
 */

/** 
 * 异步JS，回调队列和事件循环
 * 
 * 全局内存(堆)，执行上下文和调用堆栈解释了同步 JS 代码在浏览器中的运行方式。
 * 
 * 然而，我们遗漏了一些东西，当有一些异步函数运行时会发生什么？
 * 
 * 案例：
        setTimeout(callback, 10000);
        function callback(){
            console.log('hello timer!');
        }   

    setTimeout不是内置的JS函数，setTimeout浏览器API( Browser API)的一部分，它是浏览器免费提供给我们的一组方便的工具。
    JS内置函数不从属于任何对象，在JS语句的任何地方都可以直接使用这些函数。
    由于setTimeout是一个浏览器的一个Api，函数由浏览器直接运行(它会在调用堆栈中出现一会儿，但会立即删除)

    var num = 2;

    function pow(num) {
        return num * num;
    }

    pow(num);

    setTimeout(callback, 10000);
    
    function callback(){
        console.log('hello timer!');
    }

    setTimeout在浏览器上下文中运行。 10秒后，计时器被触发，回调函数准备运行。 
    但首先它必须通过回调队列(Callback Queue)。 回调队列是一个队列数据结构，回调队列是一个有序的函数队列。
    每个异步函数在被放入调用堆栈之前必须通过回调队列，但这个工作是谁做的呢，那就是事件循环(Event Loop)。
    事件循环只有一个任务:它检查调用堆栈是否为空。
    如果回调队列中(Callback Queue)有某个函数，并且调用堆栈是空闲的，那么就将其放入调用堆栈中。
    完成后，执行该函数。

    想象一下，callback() 已准备好执行，当 pow() 完成时，调用堆栈(Call Stack) 为空，事件循环(Event Look) 将 callback() 放入调用堆中。
 */

/** 
 * 回调地狱和 ES6 中的Promises
 * 
 * JS的 Promise是未来事件的表示。 Promise 可以以成功结束：用行话说我们已经解决了resolved(fulfilled)。 
 * 但如果 Promise 出错，我们会说它处于**拒绝(rejected )状态。 
 * Promise 也有一个默认状态：每个新的 Promise 都以挂起(pending)**状态开始。
 */

/** 
    async function getData() {
        try {
            if (true) {
                throw Error("Catch me if you can");
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    getData()
        .then(() => console.log("I will run no matter what!"))
        .catch(() => console.log("Catching err"));

    // Catch me if you can
    // I will run no matter what!

    try/catch 是一个同步构造，但我们的异步函数产生一个Promise。 他们在两条不同的轨道上行驶，比如两列火车。
    但他们永远不会见面， 也就是说，throw 抛出的错误永远不会触发**getData()**的catch方法。


    !!!!!实战中，我们不希望throw触then的处理程序。 一种的解决方案是从函数返回Promise.reject()：
    async function getData() {
        try {
            if (true) {
                return Promise.reject("Catch me if you can");
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    getData()
    .then(() => console.log("I will NOT run no matter what!"))
    .catch(() => console.log("Catching err"));
    // Catching err
 */

