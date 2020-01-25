/** 
 * __dirname 和 ./ 的区别
 * 
 * Node.js 中，__dirname 总是指向被执行 js 文件的绝对路径。
 * ./ 会返回你执行 node 命令的路径，例如你的工作路径
 * 有一个特殊情况是在 require() 中使用 ./ 时，这时的路径就会是含有 require() 的脚本文件的相对路径。
 * 
 * 假设有如下目录结构:
 * /dir1
 *      /dir2
 *          pathtest.js
 * 
 * var path = require("path");
 * console.log(". = %s", path.resolve("."));                            // . = /dir1/dir2
 * console.log("__dirname = %s", path.resolve(__dirname));              // __dirname = /dir1/dir2
 * . 是你的当前工作目录，在这个例子中就是 /dir1/dir2 ，__dirname 是 pathtest.js 的文件路径，在这个例子中就是 /dir1/dir2 。
 * 
 * 
 * 如果当前的目录是：/dir1
 * . = /dir1
 * __dirname = /dir1/dir2
 * . 指向我们的工作目录，即 /dir1， __dirname 还是指向 /dir1/dir2
 * 
 * 
 * 在 require 中使用 .:
 * 如果在 dir2/pathtest.js 中调用了 require 方法，去引入位于 dir1 目录的 js 文件，你需要写成：require('../thefile')
 * 因为 require 中的路径总是相对于包含它的文件，跟你的工作目录没有关系。
 */
console.log(__dirname);


/** 
 * __filename
 * 
 * 使用__filename变量获取当前模块文件的带有完整绝对路径的文件名
 */
console.log(__filename);    // /Users/kisure/Documents/GitHub/kisure-notes/nodeJs/2019-8-25/app.js
