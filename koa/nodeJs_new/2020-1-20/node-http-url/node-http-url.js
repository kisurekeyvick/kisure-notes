/** 
 * 安装node snippets
 */
const http = require('http');
const url = require('url');
http.createServer(function (request, response) {
  /** 
   * request 代表浏览器传递过来的信息
   * response 代表给页面响应的信息
   */
  if (request.url !== '/favicon.ico') {
    const urlInfo = url.parse(request.url, true).query;
    console.log('路由信息', urlInfo);
    /** 
     * cmd运行js，输入：http://127.0.0.1:8081/aaa?name=%27kisure%27
     * 路由信息 [Object: null prototype] { name: '\'kisure\'' }
     */
  }

  // 设置响应头
  response.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});

  /** 
   * 如果内容存在中文字，那么需要给head标签下的meta设置为UTF-8以防止乱码
   */
  response.write('<head><meta charset="UTF-8"></head>');
  response.write('你好 kisure~');

  // 表示给我们页面上输出一句话，并且结束响应
  response.end();
}).listen(8081);
// 8081表示网站的端口

/** 
 * (1) 如果我们打开： http://127.0.0.1:8081/book
 *    那么终端就会输出book，因为我们在代码中写了：console.log(request.url);
 */

/** 
 * (2) 打开node环境，运行url模块，如图：[打开node环境，运行url模块.jpg]
 * 
 * 如果我们在url.parse()的方法中传入第二个参数为true，它会将query属性的值拆分成对象
 */ 