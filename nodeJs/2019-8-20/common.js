/** 
 * (1)  什么是 CommonJS？
 * 
 * CommonJS 就是为 JS 的表现来制定规范，因为 JS 没有模块系统、标准库较少、缺乏包管理工具，
 * 所以 CommonJS 应运而生，它希望 JS 可以在任何地方运行，而不只是在浏览器中，
 * 从而达到 Java、C#、PHP 这些后端语言具备开发大型应用的能力。
 * 
 * (2)  CommonJS 的应用？
 *      (1) 服务器端 JavaScript 应用程序。（Node.js）
 *      (2) 命令行工具
 * 
 * (3)  CommonJS 与 Node.js 的关系？
 *      CommonJS 就是模块化的标准，Node.js 就是 CommonJS（模块化）的实现。
 * 
 * (4)  Node.js 中的模块化？
 *      在 Node 中，模块分为两类：一是 Node 提供的模块，称为核心模块；二是用户编写的模块，成为文件模块。
 *      核心模块在 Node 源代码的编译过程中，编译进了二进制执行文件，所以它的加载速度是最快的，例如：HTTP 模块、URL 模块、FS 模块；
 *      文件模块是在运行时动态加载的，需要完整的路劲分析、文件定位、编译执行过程等……所以它的速度相对核心模块来说会更慢一些。
 * 
 *      我们可以将公共的功能抽离出一个单独的 JS 文件存放，然后在需要的情况下，通过 exports 或者 module.exports 将模块导出，
 *      并通过 require 引入这些模块
 */

/** 
 * (2) 定义好自己的工具库
 *  首先需要npm init --yes
 */
// 我们应该定义个自己的模块：jsliang-module，然后将我们的 tools.js 存放在该目录中：
// jsliang-module/tools.js
var tools = {
    add: (...numbers) => {
      let sum = 0;
      for (let number in numbers) {
        sum += numbers[number];
      }
      return sum;
    },
    multiply: (...numbers) => {
      let sum = numbers[0];
      for (let number in numbers) {
        sum = sum * numbers[number];
      }
      return sum;
    }
};
  
module.exports = tools;

/**
 * 但是，如果我们通过 var tools3 = require('jsliang-module'); 去导入，会发现它报 error 了，
 * 所以，我们应该在 jsliang-module 目录下，通过下面命令行生成一个 package.json
 */

var http = require("http");
var tools1 = require('./03_tool-add');
// 如果 Node 在当前目录没找到 tool.js 文件，则会去 node_modules 里面去查找
var tools2 = require('03_tool-multiply');

/**
 * 通过 package.json 来引用文件
 * 1. 通过在 jsliang-module 中 npm init --yes 来生成 package.json 文件
 * 2. package.json 文件中告诉了程序入口文件为 ："main": "tools.js",
 * 3. Node 通过 require 查找 jsliang-module，发现它有个 package.json
 * 4. Node 执行 tools.js 文件
 */
var tools3 = require('jsliang-module');

http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });

  res.write('<h1 style="text-align:center">Hello NodeJS</h1>');
  
  console.log(tools1.add(1, 2, 3));
  console.log(tools2.multiply(1, 2, 3, 4));
  console.log(tools3.add(4, 5, 6));
  /**
   * Console：
   * 6
   * 24
   * 15
   * 6
   * 24
   * 15
   * 这里要记得 Node 运行过程中，它请求了两次，
   * http://localhost:3000/ 为一次，
   * http://localhost:3000/favicon.ico 为第二次
   */
  
  res.end();
}).listen(3000);
