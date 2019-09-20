/** 
 * https://mp.weixin.qq.com/s/VYnoKSENiRTTVU5PH5AeEQ
 * 
 * 一个 TCP 连接可以发多少个 HTTP 请求？
 */

/** 
 * 收到的 HTML 如果包含几十个图片标签，这些图片是以什么方式、什么顺序、建立了多少连接、使用什么协议被下载下来的呢？
 * 
 * 要搞懂这个问题，我们需要先解决下面五个问题:
 * (1) 现代浏览器在与服务器建立了一个 TCP 连接后是否会在一个 HTTP 请求完成后断开？什么情况下会断开？
 * (2) 一个 TCP 连接可以对应几个 HTTP 请求？
 * (3) 一个 TCP 连接中 HTTP 请求发送可以一起发送么（比如一起发三个请求，再三个响应一起接收）？
 * (4) 为什么有的时候刷新页面不需要重新建立 SSL 连接？
 * (5) 浏览器对同一 Host 建立 TCP 连接到数量有没有限制？
 */

/** 
 * - 现代浏览器在与服务器建立了一个 TCP 连接后是否会在一个 HTTP 请求完成后断开？什么情况下会断开？
 * 
 * 在 HTTP/1.0 中，一个服务器在发送完一个 HTTP 响应后，会断开 TCP 链接。
 * 是这样每次请求都会重新建立和断开 TCP 连接，代价过大。
 * 所以虽然标准中没有设定，某些服务器对 Connection: keep-alive 的 Header 进行了支持。
 * 
 * 意思是说，完成这个 HTTP 请求之后，不要断开 HTTP 请求使用的 TCP 连接。
 * 这样的好处是连接可以被重新使用，之后发送 HTTP 请求的时候不需要重新建立 TCP 连接，
 * 以及如果维持连接，那么 SSL 的开销也可以避免。
 * 
 * 持久连接：既然维持 TCP 连接好处这么多，HTTP/1.1 就把 Connection 头写进标准，并且默认开启持久连接，
 * 除非请求中写明 Connection: close，那么浏览器和服务器之间是会维持一段时间的 TCP 连接，不会一个请求结束就断掉。
 */

/** 
 * - 一个 TCP 连接可以对应几个 HTTP 请求？
 * 如果维持连接，一个 TCP 连接是可以发送多个 HTTP 请求的。
 */

/** 
 * - 一个 TCP 连接中 HTTP 请求发送可以一起发送么（比如一起发三个请求，再三个响应一起接收）？
 * HTTP/1.1 存在一个问题，单个 TCP 连接在同一时刻只能处理一个请求，
 * 意思是说：两个请求的生命周期不能重叠，任意两个 HTTP 请求从开始到结束的时间在同一个 TCP 连接里不能重叠。
 * 
 * 至于标准为什么这么设定:
 * 由于 HTTP/1.1 是个文本协议，同时返回的内容也并不能区分对应于哪个发送的请求，所以顺序必须维持一致。
 * 比如你向服务器发送了两个请求 GET /query?q=A 和 GET /query?q=B，服务器返回了两个结果，
 * 浏览器是没有办法根据响应结果来判断响应对应于哪一个请求的。
 */

/** 
 * - 为什么有的时候刷新页面不需要重新建立 SSL 连接？
 * TCP 连接有的时候会被浏览器和服务端维持一段时间。TCP 不需要重新建立，SSL 自然也会用之前的。
 */

/** 
 * - 浏览器对同一 Host 建立 TCP 连接到数量有没有限制？
 * 假设我们还处在 HTTP/1.1 时代，那个时候没有多路传输，当浏览器拿到一个有几十张图片的网页该怎么办呢？
 * 肯定不能只开一个 TCP 连接顺序下载，那样用户肯定等的很难受，但是如果每个图片都开一个 TCP 连接发 HTTP 请求，
 * 那电脑或者服务器都可能受不了，要是有 1000 张图片的话总不能开 1000 个TCP 连接吧，你的电脑同意 NAT 也不一定会同意。
 * 
 * 所以答案是：有。Chrome 最多允许对同一个 Host 建立六个 TCP 连接。不同的浏览器有一些区别。
 */

/** 
 * - 那么回到最开始的问题，收到的 HTML 如果包含几十个图片标签，这些图片是以什么方式、
 *      什么顺序、建立了多少连接、使用什么协议被下载下来的呢？
 * 
 * 如果图片都是 HTTPS 连接并且在同一个域名下，那么浏览器在 SSL 握手之后会和服务器商量能不能用 HTTP2，
 * 如果能的话就使用 Multiplexing 功能在这个连接上进行多路传输。
 * 不过也未必会所有挂在这个域名的资源都会使用一个 TCP 连接去获取，但是可以确定的是 Multiplexing 很可能会被用到。
 * 如果发现用不了 HTTP2 呢？或者用不了 HTTPS（现实中的 HTTP2 都是在 HTTPS 上实现的，所以也就是只能使用 HTTP/1.1）。
 * 那浏览器就会在一个 HOST 上建立多个 TCP 连接，连接数量的最大限制取决于浏览器设置，
 * 这些连接会在空闲的时候被浏览器用来发送新的请求，如果所有的连接都正在发送请求呢？那其他的请求就只能等等了。
 */
