/**
 * https://juejin.im/post/5d75c116f265da03d9255dd1#heading-54
 * 
 * http缓存
 */

/**
 * 虽然 HTTP 缓存不是必须的，但重用缓存的资源通常是必要的。
 * 然而常见的 HTTP 缓存只能存储 GET 响应，对于其他类型的响应则无能为力。
 * 缓存的关键主要包括 request method 和目标 URI（一般只有 GET 请求才会被缓存）。
 */ 

/**
 * 浏览器读取缓存先后顺序：
 * 
 * - Service Worker
 * - Memory Cache
 * - Disk Cache
 * - 网络请求
 */ 

/**
 * (1) Service Worker
 * 
 * 查看[service-worker.js]
 */

/**
 * (2) Cache-Control
 * 
 * HTTP/1.1定义的 Cache-Control 头用来区分对缓存机制的支持情况， 请求头和响应头都支持这个属性。
 * 通过它提供的不同的值来定义缓存策略。需要注意的是，数据变化频率很快的场景并不适合开启 Cache-Control。
 * 
 * 缓存表
    指令                作用
    public              公共缓存：表示该响应可以被任何中间人（比如中间代理、CDN等）缓存
    private             私有缓存：表示该响应是专用于某单个用户的，中间人不能缓存此响应，该响应只能应用于浏览器私有缓存中
    max-age             设置缓存的过期时间，过期需要重新请求，否则就读取本地缓存，并不实际发送请求
    no-store            禁止进行缓存
    s-maxage            （单位/秒）覆盖 max-age，作用一样，只在代理服务器中生效
    no-cache            强制确认缓存：即每次使用本地缓存之前，需要请求服务器，查看缓存是否失效，若未过期（注：实际就是返回304），则缓存才使用本地缓存副本。
    must-revalidate     缓存验证确认：意味着缓存在考虑使用一个陈旧的资源时，必须先验证它的状态，已过期的缓存将不被使用
 */ 

/**
 * (3) 缓存校验
 * 
 * 在浏览器使用缓存的过程中，为了配合 Cache-Control 中 no-cache ，我们还需要一个机制来验证缓存是否有效。
 * 比如服务器的资源更新了，客户端需要及时刷新缓存；
 * 又或者客户端的资源过了有效期，但服务器上的资源还是旧的，此时并不需要重新发送。
 * 
 * 缓存校验就是用来解决这些问题的，在http 1.1 中，我们主要关注下 Last-Modified 和 ETag 这两个字段。
 */ 

/**
 * (3.1) Last-Modified
 * 
 * 代表资源的最新一次修改时间，当客户端访问服务端的资源，服务端会将这个 Last-Modified 值返回给客户端，客户端收到之后，
 * 下次发送请求就会将服务端返回回来的 Last-Modified 值装在 If-Modified-Since 或者 If-Unmodified-Since 里，
 * 发送给服务端进行缓存校验。
 * 
 * 服务器就可以通过读取 If-Modified-Since （较常用）或 If-UnModified-Since 的值，和本地的 Last-Modified 值做对比校验。
 * 如果校验发现这两个值是一样的，就代表本次请求的资源文件没有被修改过，那么服务器就会告诉浏览器，资源有效，
 * 可以继续使用，否则就需要使用最新的资源。
 * 
 * 当请求服务端的 script.js 的脚本资源时，可以看到服务端返回了 Last-Modified，里面记录了该资源最后一次的修改时间：
 * 如图【Last-Modified-response.jpg】
 * 
 * 当客户端下次再次发起请求，会携带上这个过期时间给服务端进行验证：
 * 如图【Last-Modified-request.jpg】
 */

/**
 * HTTP 性能优化方案
 * 
 * 合理使用 HTTP 的缓存策略，避免同一资源多次请求服务端而导致的额外性能开销
 * 尽量使用 HTTP 长连接，避免每次重建 TCP 连接带来的时间损耗
 * 尽量使用 HTTPS 来保证网络传输的安全性。
 * 可以使用 HTTP2 来大幅提高数据传输的效率，使用 server push 开启 HTTP2 的服务端推送功能
 * 客户端开启 Accept-Encoding 压缩方式的支持，服务端传输压缩后的文件，减少传输数据的大小
 *      查看[Accept-Encoding.js]
 */ 