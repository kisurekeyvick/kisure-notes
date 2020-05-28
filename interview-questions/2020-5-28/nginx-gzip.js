/**
 * https://juejin.im/post/5c85a64d6fb9a04a0e2e038c#heading-13
 * 
 * 配置gzip
 */

/**
 * 并不是每个浏览器都支持gzip的，如何知道客户端是否支持gzip呢，请求头中的Accept-Encoding来标识对压缩的支持。
 * [gzip-http-request-headers.jpg]
 * 
 * 下面的respone中content-encoding:gzip，指服务端开启了gzip的压缩方式。
 * [gzip-http-response-headers.jpg]
 */

/**
 * 这里为什么开启gzip默认版本是1.1而不是1.0呢？
 * 
 * HTTP/1.0 也可以通过显式指定 Connection: keep-alive 来启用持久连接。
 * 
 * 对于TCP持久连接上的HTTP 报文，客户端需要一种机制来准确判断结束位置，
 * 而在 HTTP/1.0中，这种机制只有Content-Length。
 * 而在HTTP/1.1中新增的 Transfer-Encoding: chunked 所对应的分块传输机制可以完美解决这类问题。
 * 
 * Nginx在启用了GZip的情况下，不会等文件 GZip 完成再返回响应，而是边压缩边响应，这样可以显著提高 TTFB(Time To First Byte，首字节时间，WEB 性能优化重要指标)。
 * 这样唯一的问题是，Nginx 开始返回响应时，它无法知道将要传输的文件最终有多大，也就是无法给出Content-Length这个响应头部。
 * 所以，在HTTP1.0中如果利用Nginx启用了GZip，是无法获得Content-Length的，
 * 这导致HTTP1.0中开启持久链接和使用GZip只能二选一，所以在这里gzip_http_version默认设置为1.1。
 */ 

/**
 * 如何配置？
 * 
 *  gzip                    on;
    gzip_http_version       1.1;        
    gzip_comp_level         5;
    gzip_min_length         1000;
    gzip_types text/csv text/xml text/css text/plain text/javascript application/javascript application/x-javascript application/json application/xml;

    (1) gzip
            开启或者关闭gzip模块
            默认值为off
            可配置为on / off

    (2) gzip_http_version
            启用 GZip 所需的HTTP 最低版本
            默认值为HTTP/1.1

    (3) gzip_comp_level
            压缩级别，级别越高压缩率越大，当然压缩时间也就越长（传输快但比较消耗cpu）。
            默认值为 1
            压缩级别取值为1-9

    (4) gzip_min_length
            设置允许压缩的页面最小字节数，Content-Length小于该值的请求将不会被压缩
            默认值:0
            当设置的值较小时，压缩后的长度可能比原文件大，建议设置1000以上

    (5) gzip_types
            要采用gzip压缩的文件类型(MIME类型)
            默认值:text/html(默认不压缩js/css)
 */ 