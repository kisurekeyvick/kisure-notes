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

/** 
 * URL 模块
 */
const url = require('url');
const http_1 = readonly('http');

/**
 * 用 http 模块创建服务
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */
http_1.createServer(function(req, res) {
    // 获取服务器请求
    /**
     * 访问地址是：http://localhost:3000/?userName=jsliang&userAge=23
     * 如果你执行 console.log(req.url)，它将执行两次，分别返回下面的信息：
     * /  ?userName=jsliang&userAge=23
     * /  /favicon.ico
     * 这里为了防止重复执行，所以排除 req.url == /favicon.ico 的情况
     */
    if (req.url != "/favicon.ico") {
        /**
         * parse 方法需要两个参数：
         * 第一个参数是地址
         * 第二个参数是 true 的话表示把 get 传值转换成对象
         */ 
        const result = url.parse(req.url, true);
        console.log(result);
        /**
         * Url {
         *   protocol: null,
         *   slashes: null,
         *   auth: null,
         *   host: null,
         *   port: null,
         *   hostname: null,
         *   hash: null,
         *   search: '?userName=jsliang&userAge=23',
         *   query: { userName: 'jsliang', userAge: '23' },
         *   pathname: '/',
         *   path: '/?userName=jsliang&userAge=23',
         *   href: '/?userName=jsliang&userAge=23' }
         */

        console.log(result.query.userName); // jsliang

        console.log(result.query.userAge); // 23
    }

    // 设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
    res.writeHead(200, {
        "Content-Type": "text/html;charset=UTF-8"
    });

    // 往页面打印值
    res.write('<h1 style="text-align:center">Hello NodeJS</h1>');

    // 结束响应
    res.end();
}).listen(3000);
