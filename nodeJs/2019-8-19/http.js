/** 
 * 起步
 */
// const http = require('http');

// http.createServer(function(req, res) {
//     // 设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
//     res.writeHead(200, {
//         'Content-Type': 'text/html;charset=UTF-8'
//     });

//     // 往页面打印内容
//     res.write('<h1 style="text-align:center">Hello NodeJS</h1>');

//     // 响应结束
//     res.end();
// }).listen(3000);    // 监听端口号

/** 
 * url
 */
const url = require('url');
const http_1 = require('http');

/** 
 * (1) 用 http 模块创建服务
 */
http_1.createServer(function(req, res) {
    if (req.url !== '/favicon.ico') {
        const result = url.parse(req.url, true);
        console.log(result);
        /** 
            {
                protocol: null,
                slashes: null,
                auth: null,
                host: null,
                port: null,
                hostname: null,
                hash: null,
                search: '?userName=jsliang&userAge=23',
                query:
                [Object: null prototype] { userName: 'jsliang', userAge: '23' },
                pathname: '/',
                path: '/?userName=jsliang&userAge=23',
                href: '/?userName=jsliang&userAge=23' 
            }
         */
    }

    /** 
     * req 获取 url 信息 (request)
     * res 浏览器返回响应信息 (response)
     */
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=UTF-8'
    });

    // 往页面打印值
    res.write('<h1 style="text-align:center">Hello NodeJS</h1>');

    //响应结束
    res.end();
}).listen(3000);

/**
 * (2) parse 如何使用
    console.log(url.parse("http://www.baidu.com"));

    Console：
        Url {
            protocol: 'http:',
            slashes: true,
            auth: null,
            host: 'www.baidu.com',
            port: null,
            hostname: 'www.baidu.com',
            hash: null,
            search: null,
            query: null,
            pathname: '/',
            path: '/',
            href: 'http://www.baidu.com/' 
        }
 */

/** 
    (3) parse 带参数：
    console.log(url.parse("http://www.baidu.com/new?name=zhangsan"));

    Console：
        Url {
            protocol: 'http:',
            slashes: true,
            auth: null,
            host: 'www.baidu.com',
            port: null,
            hostname: 'www.baidu.com',
            hash: null,
            search: '?name=zhangsan',
            query: 'name=zhangsan',
            pathname: '/new',
            path: '/new?name=zhangsan',
            href: 'http://www.baidu.com/new?name=zhangsan' 
        }
 */

/** 
    (4) format 的使用：
    console.log(url.format({
        protocol: 'http:',
        slashes: true,
        auth: null,
        host: 'www.baidu.com',
        port: null,
        hostname: 'www.baidu.com',
        hash: null,
        search: '?name=zhangsan',
        query: 'name=zhangsan',
        pathname: '/new',
        path: '/new?name=zhangsan',
        href: 'http://www.baidu.com/new?name=zhangsan' 
    }))

    console：
    // http://www.baidu.com/new?name=zhangsan

    url.format() 方法返回一个从 urlObject 格式化后的 URL 字符串。
 */

/** 
    (5) resolve 的使用
    console.log(url.resolve("http://www.baidu.com/jsliang", "梁峻荣"));

    from <string> 解析时相对的基本 URL。
    to <string> 要解析的超链接 URL。

    url.resolve() 方法会以一种 Web 浏览器解析超链接的方式把一个目标 URL 解析成相对于一个基础 URL
 */



