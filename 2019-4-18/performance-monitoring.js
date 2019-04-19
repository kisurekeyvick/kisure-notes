/**
 * 深入理解前端性能监控
 * https://mp.weixin.qq.com/s/F26CbJSGyLXNu2URhgcIjA
 * https://segmentfault.com/a/1190000014479800#articleHeader0
 * 
 * W3C性能小组引入的新的API window.performance，目前IE9以上的浏览器都支持。
 * 它是一个浏览器中用于记录页面加载和解析过程中关键时间点的对象。
 * 放置在global环境下，通过JavaScript可以访问到它。
 */

/**
 * (1)使用性能API
 * 可以通过以下方法来探测和兼容performance：
 */
var performance = window.performance || 
    window.msPerformance || 
    window.webkitPerformance;
if (performance) {
    // 你的代码
}

/**
 * (2)performance的结构
 * 
 *  memory          内存相关
 *  navigation      来源相关
 *  onresourcetimingbufferfull      缓冲区满后回调函数
 *      例如：
 *      performance.onresourcetimingbufferfull = buffer_full;
 * 
 *      function buffer_full(event) {
            console.log("WARNING: Resource Timing Buffer is FULL!");
            performance.setResourceTimingBufferSize(200);
        }

        当缓冲区满了以后，就会触发，执行buffer_full方法
 * 
 * 
 *  timeOrigin      表示performance性能测试开始的时间。是一个高精度时间戳（千分之一毫秒）
 *  timing          各种与浏览器处理相关的时间数据  
 */

/**
 * performance.memory是显示此刻内存占用情况，它是一个动态值:
 * usedJSHeapSize表示：JS 对象（包括V8引擎内部对象）占用的内存数
 * totalJSHeapSize表示：可使用的内存
 * jsHeapSizeLimit表示：内存大小限制
 * 通常，usedJSHeapSize不能大于totalJSHeapSize，如果大于，有可能出现了内存泄漏。
 */

/**
 * performance.navigation显示页面的来源信息
 * redirectCount表示：如果有重定向的话，页面通过几次重定向跳转而来，默认为0
 * type表示页面打开的方式，
 * 0 表示 TYPE_NAVIGATENEXT 正常进入的页面（非刷新、非重定向等）
 * 1 表示 TYPE_RELOAD 通过 window.location.reload() 刷新的页面
 * 2 表示 TYPE_BACK_FORWARD 通过浏览器的前进后退按钮进入的页面（历史记录）
 * 255 表示 TYPE_UNDEFINED 非以上方式进入的页面
 */

/**
    timing: {
        // 同一个浏览器上一个页面卸载(unload)结束时的时间戳。如果没有上一个页面，这个值会和fetchStart相同。
        navigationStart: 1543806782096,

        // 上一个页面unload事件抛出时的时间戳。如果没有上一个页面，这个值会返回0。
        unloadEventStart: 1543806782523,

        // 和 unloadEventStart 相对应，unload事件处理完成时的时间戳。如果没有上一个页面,这个值会返回0。
        unloadEventEnd: 1543806782523,

        // 第一个HTTP重定向开始时的时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0。
        redirectStart: 0,

        // 最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的时间戳。
        // 如果没有重定向，或者重定向中的一个不同源，这个值会返回0. 
        redirectEnd: 0,

        // 浏览器准备好使用HTTP请求来获取(fetch)文档的时间戳。这个时间点会在检查任何应用缓存之前。
        fetchStart: 1543806782096,

        // DNS 域名查询开始的UNIX时间戳。
            //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和fetchStart一致。
        domainLookupStart: 1543806782096,

        // DNS 域名查询完成的时间.
        //如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
        domainLookupEnd: 1543806782096,

        // HTTP（TCP） 域名查询结束的时间戳。
            //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 fetchStart一致。
        connectStart: 1543806782099,

        // HTTP（TCP） 返回浏览器与服务器之间的连接建立时的时间戳。
            // 如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
        connectEnd: 1543806782227,

        // HTTPS 返回浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，则返回0。
        secureConnectionStart: 1543806782162,

        // 返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间戳。
        requestStart: 1543806782241,

        // 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间戳。
            //如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。
        responseStart: 1543806782516,

        // 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时
            //（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳。
        responseEnd: 1543806782537,

        // 当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的 readystatechange事件触发时）的时间戳。
        domLoading: 1543806782573,

        // 当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的时间戳。
        domInteractive: 1543806783203,

        // 当解析器发送DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的时间戳。
        domContentLoadedEventStart: 1543806783203,

        // 当所有需要立即执行的脚本已经被执行（不论执行顺序）时的时间戳。
        domContentLoadedEventEnd: 1543806783216,

        // 当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange 被触发时的时间戳
        domComplete: 1543806783796,

        // load事件被发送时的时间戳。如果这个事件还未被发送，它的值将会是0。
        loadEventStart: 1543806783796,

        // 当load事件结束，即加载事件完成时的时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0.
        loadEventEnd: 1543806783802
    }
 */

/**
 * 这些参数非常有用，可以帮助我们获取页面的Domready时间、onload时间、白屏时间等，
 * 以及单个页面资源在从发送请求到获取到rsponse各阶段的性能参数:

    重定向耗时：redirectEnd - redirectStart
    DNS查询耗时 ：domainLookupEnd - domainLookupStart
    TCP链接耗时 ：connectEnd - connectStart
    HTTP请求耗时 ：responseEnd - responseStart
    解析dom树耗时 ： domComplete - domInteractive
    白屏时间 ：responseStart - navigationStart
    DOMready时间 ：domContentLoadedEventEnd - navigationStart
    onload时间：loadEventEnd - navigationStart，也即是onload回调函数执行的时间。
 */

/**
 * 优化
 * 
 * (1)重定向优化：
 *      重定向的类型分三种，301（永久重定向），302（临时重定向），304（Not Modified）。
 *      304是用来优化缓存，非常有用，而前两种应该尽可能的避免，凡是遇到需要重定向跳转代码的代码，
 *      可以把重定向之后的地址直接写到前端的html或JS中，可以减少客户端与服务端的通信过程，节省重定向耗时。
 * 
 * (2)DNS优化：
 *      一般来说，在前端优化中与 DNS 有关的有两点： 
 *      一个是减少DNS的请求次数，另一个就是进行DNS预获取（Prefetching ） 。
 *      典型的一次DNS解析需要耗费 20-120 毫秒（移动端会更慢），减少DNS解析的次数是个很好的优化方式，
 *      尽量把各种资源放在一个cdn域名上。DNS Prefetching 是让具有此属性的域名不需要用户点击链接就在后台解析，
 *      而域名解析和内容载入是串行的网络操作，所以这个方式能减少用户的等待时间，提升用户体验 。
 *      新版的浏览器会对页面中和当前域名（正在浏览网页的域名）不在同一个域的域名进行预获取，并且缓存结果，
 *      这就是隐式的 DNS Prefetch。如果想对页面中没有出现的域进行预获取，那么就要使用显示的 DNS Prefetch 了
 * 
 *      案例：
            <html>
                <head>
                    <title>腾讯网</title>
                    <link rel="dns-prefetch" href="//mat1.gtimg.com"  />
                    <link rel="dns-prefetch" href="//inews.gtimg.com"  />
                    <link rel="dns-prefetch" href="//wx.qlogo.cn"  />
                    <link rel="dns-prefetch" href="//coral.qq.com" />
                    <link rel="dns-prefetch" href="//pingjs.qq.com"  />
                </head>
            </html>

 * (3)TCP请求优化：
        TCP的优化大都在服务器端，前端能做的就是尽量减少TCP的请求数，也就是减少HTTP的请求数量。
        http 1.0 默认使用短连接，也是TCP的短连接，也就是客户端和服务端每进行一次http操作，就建立一次连接，任务结束就中断连接。
        这个过程中有3次TCP请求握手和4次TCP请求释放。
        减少TCP请求的方式有两种，一种是资源合并，对于页面内的图片、css和js进行合并，减少请求量。
        另一种使用长链接，使用http1.1，在HTTP的响应头会加上 Connection:keep-alive，
        当一个网页打开完成之后，连接不会马上关闭，再次访问这个服务时，会继续使用这个长连接。
        这样就大大减少了TCP的握手次数和释放次数。
        或者使用Websocket进行通信，全程只需要建立一次TCP链接。

    (4)HTTP请求优化：
        使用内容分发网络（CDN）和减少请求。使用CDN可以减少网络的请求时延，CDN的域名不要和主站的域名一样，
        这样会防止访问CDN时还携带主站cookie的问题，对于网络请求，可以使用fetch发送无cookie的请求，
        减少http包的大小。也可以使用本地缓存策略，尽量减少对服务器数据的重复获取。

    (5)
 */