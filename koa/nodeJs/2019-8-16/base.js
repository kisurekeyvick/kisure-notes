/** 
 * (1) 什么是NodeJS
 * 
 * JS是脚本语言，脚本语言都需要一个解析器才能运行。
 * 对于写在HTML页面里的JS，浏览器充当了解析器的角色。
 * 而对于需要独立运行的JS，NodeJS就是一个解析器。
 * 
 * 每一种解析器都是一个运行环境，不但允许JS定义各种数据结构，进行各种计算，
 * 还允许JS使用运行环境提供的内置对象和方法做一些事情。
 * 
 * 例如运行在浏览器中的JS的用途是操作DOM，浏览器就提供了document之类的内置对象。
 * 而运行在NodeJS中的JS的用途是操作磁盘文件或搭建HTTP服务器，NodeJS就相应提供了fs、http等内置对象。
 */

/**
 * 有啥用处
 * 
 * 创造NodeJS的目的是为了实现高性能Web服务器，他首先看重的是事件机制和异步IO模型的优越性，而不是JS。
 * 但是他需要选择一种编程语言实现他的想法，这种编程语言不能自带IO功能，并且需要能良好支持事件机制。
 * JS没有自带IO功能，天生就用于处理浏览器中的DOM事件。
 */

/** 
 * (2) require
 * 
 * require函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。
 * 模块名可使用相对路径（以./开头），或者是绝对路径（以/或C:之类的盘符开头）。
 * 另外，模块名中的.js扩展名可以省略。
 */
const foo1 = require('./foo.js');
const foo2 = require('./foo');      // js后缀可以去除

// 另外，可以使用以下方式加载和使用一个JSON文件。
const data = require('./data.json');

/** 
 * (3) exports
 * 
 * exports对象是当前模块的导出对象，用于导出模块公有方法和属性。
 * 别的模块通过require函数使用当前模块时得到的就是当前模块的exports对象
 */
exports.hello = function () {
    console.log('Hello World!');
};

/** 
 * (4) module
 * 
 * 通过module对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。
 * 例如模块导出对象默认是一个普通对象，如果想改成一个函数的话，可以使用以下方式。
 */
module.exports = function () {
    console.log('Hello World!');
};

/** 
 * (5) exports和module的区别
 * 
 * Module.exports才是真正的接口，exports只不过是它的一个辅助工具。
 * 最终返回给调用的是Module.exports而不是exports。
 * 所有的exports收集到的属性和方法，都赋值给了Module.exports。
 * 当然，这有个前提，就是Module.exports本身不具备任何属性和方法。
 * 如果，Module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。
 */
// rocker.js
module.exports = 'ROCK IT!';
exports.name = function() {
    console.log('My name is Lemmy Kilmister');
};

// 再次引用执行rocker.js
var rocker = require('./rocker.js');
rocker.name(); // TypeError: Object ROCK IT! has no method 'name'

/** 
 * rocker模块忽略了exports收集的name方法，返回了一个字符串“ROCK IT!”。
 * 由此可知，你的模块并不一定非得返回“实例化对象”。
 * 你的模块可以是任何合法的javascript对象--boolean, number, date, JSON, string, function, array等等。
 */

/** 
 * (6) 总结
 * 
 * NodeJS是一个JS脚本解析器，任何操作系统下安装NodeJS本质上做的事情都是把NodeJS执行程序复制到一个目录，
 *      然后保证这个目录在系统PATH环境变量下，以便终端下可以使用node命令。
 * 终端下直接输入node命令可进入命令交互模式，很适合用来测试一些JS代码片段，比如正则表达式。
 * NodeJS使用CMD模块系统，主模块作为程序入口点，所有模块在执行过程中只初始化一次。
 */
