/** 
 * 网络操作
 * 
 * 不了解网络编程的程序员不是好前端，而NodeJS恰好提供了一扇了解网络编程的窗口。
 * 通过NodeJS，除了可以编写一些服务端程序来协助前端开发和测试外，还能够学习一些HTTP协议与Socket协议的相关知识，
 * 这些知识在优化前端性能和排查前端故障时说不定能派上用场。
 */

/** 
 * NodeJS本来的用途是编写高性能Web服务器。
 */
const http = require('http');
http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
}).listen(8014);

/** 
 * 'http'模块提供两种使用方式：
 * (1) 作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应。
 * (2) 作为客户端使用时，发起一个HTTP客户端请求，获取服务端响应。
 * 
 * HTTP请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。例如以下是一个完整的HTTP请求数据内容：
    POST / HTTP/1.1
    User-Agent: curl/7.26.0
    Host: localhost
    Accept: * / *
    Content-Length: 11
    Content-Type: application/x-www-form-urlencoded

    Hello World
 * 
    可以看到，空行之上是请求头，之下是请求体。HTTP请求在发送给服务器时，
    可以认为是按照从头到尾的顺序一个字节一个字节地以数据流方式发送的。
    而http模块创建的HTTP服务器在接收到完整的请求头后，就会调用回调函数。
    在回调函数中，除了可以使用request对象访问请求头数据外，还能把request对象当作一个只读数据流来访问请求体数据。
 */
const http_2 = require('http');
http_2.createServer(function(request, response) {
    const body = [];
    
    request.on('data', function(chunk) {
        body.push(chunk);
    });

    request.on('end', function() {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
}).listen(80);

/** 
 * HTTP响应本质上也是一个数据流，同样由响应头（headers）和响应体（body）组成。
 * 例如以下是一个完整的HTTP请求数据内容。
 * 
    HTTP/1.1 200 OK
    Content-Type: text/plain
    Content-Length: 11
    Date: Tue, 05 Nov 2013 05:31:38 GMT
    Connection: keep-alive

    Hello World
 * 
    在回调函数中，除了可以使用response对象来写入响应头数据外，还能把response对象当作一个只写数据流来写入响应体数据。
    例如在以下例子中，服务端原样将客户端请求的请求体数据返回给客户端。
 */

/** 
 * 为了发起一个客户端HTTP请求，我们需要指定目标服务器的位置并发送请求头和请求体:
 */
const http_3 = require('http');
var options = {
    hostname: 'www.example.com',
    port: 80,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

var request = http_3.request(options, function (response) {});
request.write('Hello World');
request.end();
/** 
 * 可以看到，.request方法创建了一个客户端，并指定请求目标和请求头数据。
 * 之后，就可以把request对象当作一个只写数据流来写入请求体数据和结束请求。
 * 另外，由于HTTP请求中GET请求是最常见的一种，并且不需要请求体，因此http模块也提供了以下便捷API。
 */
http_3.get('http://www.example.com/', function (response) {});

/** 
 * 当客户端发送请求并接收到完整的服务端响应头时，就会调用回调函数。
 * 在回调函数中，除了可以使用response对象访问响应头数据外，还能把response对象当作一个只读数据流来访问响应体数据。
 */

/** 
 * (2) URL
 * 
 * 处理HTTP请求时url模块使用率超高，因为该模块允许解析URL、生成URL，以及拼接URL。
 * 首先我们来看看一个完整的URL的各组成部分。
 * 
                    href
    -----------------------------------------------------------------
                                host              path
                        --------------- ----------------------------
    http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
    -----    ---------   --------   ---- -------- ------------- -----
    protocol     auth     hostname   port pathname     search     hash
                                                    ------------
                                                    query
 * 
 * 我们可以使用.parse方法来将一个URL字符串转换为URL对象
 */
const url = require('url');
console.log(url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash'));
/** 
    { 
        protocol: 'http:',
        auth: 'user:pass',
        host: 'host.com:8080',
        port: '8080',
        hostname: 'host.com',
        hash: '#hash',
        search: '?query=string',
        query: 'query=string',
        pathname: '/p/a/t/h',
        path: '/p/a/t/h?query=string',
        href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' 
    }
 */

/** 
 * 传给.parse方法的不一定要是一个完整的URL，例如在HTTP服务器回调函数中，request.url不包含协议头和域名，但同样可以用.parse方法解析
 */
http.createServer(function (request, response) {
    var tmp = request.url; // => "/foo/bar?a=b"
    url.parse(tmp);
    /* =>
    { protocol: null,
      slashes: null,
      auth: null,
      host: null,
      port: null,
      hostname: null,
      hash: null,
      search: '?a=b',
      query: 'a=b',
      pathname: '/foo/bar',
      path: '/foo/bar?a=b',
      href: '/foo/bar?a=b' }
    */
}).listen(80);

/** 
 * .parse方法还支持第二个和第三个布尔类型可选参数。第二个参数等于true时，该方法返回的URL对象中，query字段不再是一个字符串，
 * 而是一个经过querystring模块转换后的参数对象。第三个参数等于true时，该方法可以正确解析不带协议头的URL，
 * 例如//www.example.com/foo/bar。
 */

/** 
 * 反过来，format方法允许将一个URL对象转换为URL字符串，示例如下。
 */
url.format({
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
});
/*
    'http://www.example.com/p/a/t/h?query=string'
*/

/** 
 * (3) querystring
 * querystring模块用于实现URL参数字符串与参数对象的互相转换
 */
const querystring = require('querystring');
console.log(querystring.parse('foo=bar&baz=qux&baz=quux&corge'));
/* 
    { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
*/

console.log(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }));
/* 
    'foo=bar&baz=qux&baz=quux&corge='
*/

/** 
 * (4) Zlib
 * zlib模块提供了数据压缩和解压的功能。当我们处理HTTP请求和响应时，可能需要用到这个模块。
 * 
 * 首先我们看一个使用zlib模块压缩HTTP响应体数据的例子。
 * 这个例子中，判断了客户端是否支持gzip，并在支持的情况下使用zlib模块返回gzip之后的响应体数据。
 */
const zlib = require('zlib');
http.createServer(function (request, response) {
    const i = 1024;
        data = '';

    while(i --) {
        data += '.';
    }

    if ((request.headers['accept-encoding'] | '').indexOf('gzip') !== -1) {
        zlib.gzip(data, function(err, data) {
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip'
            });
            response.end(data);
        });
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end(data);
    }
}).listen(80);

/** 
 * 接着我们看一个使用zlib模块解压HTTP响应体数据的例子。
 * 这个例子中，判断了服务端响应是否使用gzip压缩，并在压缩的情况下使用zlib模块解压响应体数据。
 */
const http_4 = require('http');
const Buffer = require('Buffer');
const options = {
    hostname: 'www.example.com',
    port: 80,
    path: '/',
    method: 'GET',
    headers: {
        'Accept-Encoding': 'gzip, deflate'
    }
};

http_4.request(options, function (response) {
    const body = [];

    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);

        if (response.headers['content-encoding'] === 'gzip') {
            // zlib.gunzip 是解压gzip流
            zlib.gunzip(body, function(err, data) {
                console.log(data.toString());
            });
        } else {
            console.log(data.toString());
        }
    });
}).end();

/** 
 * (5) net
 * 
 * net模块可用于创建Socket服务器或Socket客户端。
 * 由于Socket在前端领域的使用范围还不是很广，这里先不涉及到WebSocket的介绍，仅仅简单演示一下如何从Socket层面来实现HTTP请求和响应。
 * 来看一个使用Socket搭建一个很不严谨的HTTP服务器的例子:
 */
// 这个HTTP服务器不管收到啥请求，都固定返回相同的响应。
const net = require('Net');
net.createServer(function (conn) {
    conn.on('data', function(data) {
        conn.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World'
        ]).join('\n');
    });
}).listen(80);

/** 
 * 接着我们来看一个使用Socket发起HTTP客户端请求的例子。
 * 这个例子中，Socket客户端在建立连接后发送了一个HTTP GET请求，并通过data事件监听函数来获取服务器响应。
 */
const options = {
    port: 80,
    host: 'www.example.com'
};

const client = net.connect(options, function() {
    client.write([
        'GET / HTTP/1.1',
        'User-Agent: curl/7.26.0',
        'Host: www.baidu.com',
        'Accept: */*',
        '',
        ''
    ].join('\n'));
});

client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});

/** 
 *  总结：
    http和https模块支持服务端模式和客户端模式两种使用方式。
    request和response对象除了用于读写头数据外，都可以当作数据流来操作。
    url.parse方法加上request.url属性是处理HTTP请求时的固定搭配。
    使用zlib模块可以减少使用HTTP协议时的数据传输量。
    通过net模块的Socket服务器与客户端可对HTTP协议做底层操作。
 */
