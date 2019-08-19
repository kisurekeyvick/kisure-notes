/** 
 * 起步
 */
const http = require('http');

http.createServer(function(req, res) {
    // 设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=UTF-8'
    });

    // 往页面打印内容
    res.write('<h1 style="text-align:center">Hello NodeJS</h1>');

    // 响应结束
    res.end();
}).listen(3000);    // 监听端口号