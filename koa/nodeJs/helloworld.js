let http = require('http');

/**
 * 用 http 模块提供的函数： createServer 。这个函数会返回 一个对象，
 * 这个对象有一个叫做 listen 的方法，这个方法有一个数值参数， 指定这个 HTTP 服务器监听的端口号
 * 
 * 使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 
 * 函数通过 request, response 参数来接收和响应数据。
 */

http.createServer(function(request, response) {
    /**
     * 发送 HTTP 头部 
     * HTTP 状态值: 200 : OK
     * 内容类型: text/plain
     */
    response.writeHead(200, {
        'content-type': 'text/plain'
    });

    // 发送响应数据 "kisure hello world"
    response.end('kisure hello world');
}).listen(8888);
/**
 * 你可以使用localhost:8888打开端口
 */