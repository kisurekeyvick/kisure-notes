/** 
 * https://juejin.im/post/5d0f3a726fb9a07ea4208766
 * 一次完整的web请求和渲染过程以及如何优化网页
 */

/**
    访问一个网站时的流程，页面渲染过程，包括其中涉及到的概念：
    (1)打开浏览器，输入URL
    (2)DNS解析
    (3)完成TCP握手
    (4)发送HTTP请求
    (5)接收HTTP响应结果
    (6)浏览器解析HTML，CSS
    (7)构建对象模型，DOM tree 和 CSSOM tree，组成render tree
    (8)浏览器渲染页面(布局)
 */

/** 
 * HTTP1.x和HTTP2
 * 
 * 关于HTTP1.x：
 * 在 HTTP/1.x 中，如果客户端要想发起多个并行请求以提升性能，则必须使用多个 TCP 连接。 
 * 这是 HTTP/1.x 交付模型的直接结果，该模型可以保证每个连接每次只交付一个响应（响应排队）。 
 * 更糟糕的是，这种模型也会导致队首阻塞，从而造成底层 TCP 连接的效率低下。
 * 也就是说在目前的HTTP1.X的协议下，浏览器对资源的并发请求个数是有限制的。
 * 
 * 关于HTTP2
 * 等到HTTP2到来的时候，通过二进制分帧层进行优化。 
 * HTTP/2 中新的二进制分帧层突破了这些限制，实现了完整的请求和响应复用：
 * 客户端和服务器可以将 HTTP 消息分解为互不依赖的帧，然后交错发送，最后再在另一端把它们重新组装起来。
 * 
 * HTTP2的优势：
 * 并行交错地发送多个请求，请求之间互不影响。
 * 并行交错地发送多个响应，响应之间互不干扰。
 * 使用一个连接并行发送多个请求和响应
 */

/** 
 * 浏览器是如何构建对象模型的？
 * 字节 → 字符 → 令牌 → 节点 → 对象模型。
 * HTML标记与CSS标记都会经历上述过程，HTML变为DOM，CSS变为CSSOM
 */

/** 
 * render tree构建，布局以及绘制
 * 
 * 构建好render tree之后，会过滤掉display:none 这种无需渲染的节点。将tree渲染到页面。
 * 
 * 值得注意的是，每一次的dom或者造成布局影响的变动，都会触发 reflow(回流/重排)，会消耗很大的页面资源。
 * 
 * reflow（回流）是由于dom或者布局的变动而触发，如修改了dom位置，或是宽高，margin, padding等。
 * repaint（重绘）是样式风格修改，不影响布局时触发，如改了颜色之类的
 * 提高网页渲染速度，主要可以减少 DOM, CSSOM处理， 合并render tree，以及 减少reflow的次数
 */

/** 
 * 对CSS的优化
 * 
 * 想要渲染页面必须有render tree，而render tree是由DOM tree以及CSSOM tree组成的。
 * (1)默认下，CSS会阻塞渲染页面
 * (2)我们通过@media等，可以让CSS标记为不阻塞渲染
 * (3)不论是否阻塞渲染，浏览器都会将CSS资源下载到客户端
 * 
 * 所以，为了让页面更快的渲染，*我们必须要尽早的将CSS资源下载到我们的客户端。*以及使用@media进行优化
 */

/** 
 * 对JS的优化
 * 
 * 
 */

/** 
 * 为什么css会阻塞页面渲染？
 * 
 * 前言：
 * 在渲染树构建中，我们看到关键渲染路径要求我们同时具有 DOM 和 CSSOM 才能构建渲染树。
 * 这会给性能造成严重影响：HTML 和 CSS 都是阻塞渲染的资源。 
 * HTML 显然是必需的，因为如果没有 DOM，我们就没有可渲染的内容，但 CSS 的必要性可能就不太明显。
 * 
 * 
 */
