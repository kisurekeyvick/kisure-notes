/** 
 * https://juejin.im/post/5d89798d6fb9a06b102769b1
 * 
 * 浏览器原理
 */

/** 
 * (1) 常见的浏览器内核有哪些?
 * 
 * 浏览器/RunTime       内核（渲染引擎）                    JavaScript 引擎
 * Chrome               Blink（28~）Webkit（Chrome 27）      v8
 * FireFox              Gecko                               SpiderMonkey
 * Safari               Webkit                              JavaScriptCore
 * IE                   Trident                             Chakra(for JScript)
 */

/** 
 * (2) 浏览器的主要组成部分是什么？
 * 
 * - 用户界面
 *      除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。
 * 
 * - 浏览器引擎
 *      用户界面和呈现引擎之间传送指令 
 * 
 * - 呈现引擎
 *      负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上
 * 
 * - 网络
 *      用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
 * 
 * - 用户界面后端
 *      用于绘制基本的窗口小部件，比如组合框和窗口。
 * 
 * - JavaScript 解释器
 *      用于解析和执行 JavaScript 代码
 * 
 * - 数据存储
 *      这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。
 * 
 * 值得注意的是，和大多数浏览器不同，Chrome 浏览器的每个标签页都分别对应一个呈现引擎实例。
 * 每个标签页都是一个独立的进程。
 */

/** 
 * (3) 浏览器是如何渲染UI的？
 * 
 * - 浏览器获取HTML文件，然后对文件进行解析，形成DOM Tree
 * - 与此同时，进行CSS解析，生成Style Rules
 * - 接着将DOM Tree与Style Rules合成为 Render Tree
 * - 接着进入布局（Layout）阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标
 * - 随后调用GPU进行绘制（Paint），遍历Render Tree的节点，并将元素呈现出来
 */

/** 
 * (4) 浏览器如何解析css选择器？
 * 
 * 浏览器会『从右往左』解析CSS选择器。
 * 我们知道DOM Tree与Style Rules合成为 Render Tree，实际上是需要将Style Rules附着到DOM Tree上，
 * 因此需要根据选择器提供的信息对DOM Tree进行遍历，才能将样式附着到对应的DOM元素上。
 * 
 * 例如： .mod-nav h3 span {font-size: 16px;}
 *          先找到所有的最右节点 span，对于每一个 span，向上寻找节点 h3
 *          由 h3再向上寻找 class=mod-nav 的节点
 *          最后找到根元素 html 则结束这个分支的遍历
 * 
 * 如果从左往右的匹配，那么性能都浪费在了失败的查找上面
 */

/** 
 * (5) DOM Tree是如何构建的？
 * 
 * - 转码: 浏览器将接收到的二进制数据按照指定编码格式转化为HTML字符串
 * - 生成Tokens: 之后开始parser，浏览器会将HTML字符串解析成Tokens(节点令牌)
 * - 构建Nodes: 对Node添加特定的属性，通过指针确定 Node 的父、子、兄弟关系和所属 treeScope
 * - 生成DOM Tree: 通过node包含的指针确定的关系构建出DOM Tree
 */

/** 
 * (6) 浏览器重绘与重排的区别？
 * 
 * 重排: 部分渲染树（或者整个渲染树）需要重新分析并且节点尺寸需要重新计算，表现为重新生成布局，重新排列元素
 * 重绘: 由于节点的几何属性发生改变或者由于样式发生改变，例如改变元素背景色时，屏幕上的部分内容需要更新，
 *      表现为某些元素的外观被改变
 * 
 * 重排和重绘代价是高昂的，它们会破坏用户体验，并且让UI展示非常迟缓，而相比之下重排的性能影响更大，
 * 在两者无法避免的情况下，一般我们宁可选择代价更小的重绘。
 * 
 * 『重绘』不一定会出现『重排』，『重排』必然会出现『重绘』。
 */

/** 
 * (7) 如何触发重排和重绘？
 * 
 * 任何改变用来构建渲染树的信息都会导致一次重排或重绘：
 * - 添加、删除、更新DOM节点
 * - 通过display: none隐藏一个DOM节点-触发重排和重绘
 * - 通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化
 * - 移动或者给页面中的DOM节点添加动画
 * - 添加一个样式表，调整样式属性
 * - 用户行为，例如调整窗口大小，改变字号，或者滚动。
 */

/** 
 * (8) 如何避免重绘或者重排？
 * 
 * - 集中改变样式:
 *      我们往往通过改变class的方式来集中改变样式
 *      
 * - DocumentFragment:
 *      我们可以通过createDocumentFragment创建一个游离于DOM树之外的节点，然后在此节点上批量操作，
 *      最后插入DOM树中，因此只触发一次重排
 * 
 * - 提升为合成层
 *      合成层的位图，会交由 GPU 合成，比 CPU 处理要快
 *      当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
 *      对于 transform 和 opacity 效果，不会触发 layout 和 paint
 */
var fragment = document.createDocumentFragment();

for (let i = 0;i<10;i++){
  let node = document.createElement("p");
  node.innerHTML = i;
  fragment.appendChild(node);
}

document.body.appendChild(fragment);

/** 
 * (9) 前端如何实现即时通讯？
 * 
 * - 短轮询
 *      短轮询的原理很简单，每隔一段时间客户端就发出一个请求，去获取服务器最新的数据，一定程度上模拟实现了即时通讯
 *      优点：兼容性强，实现非常简单
 *      缺点：延迟性高，非常消耗请求资源，影响性能
 * 
 * - comet
 *      comet有两种主要实现手段，一种是基于 AJAX 的长轮询（long-polling）方式，另一种是基于 Iframe 及 htmlfile 的流（streaming）方式，
 *      通常被叫做长连接。
 * 
 *      长轮询优缺点:
 *          (1) 优点：兼容性好，资源浪费较小
 *          (2) 缺点：服务器hold连接会消耗资源，返回数据顺序无保证，难于管理维护
 * 
 *      长连接优缺点：
 *          (1) 优点：兼容性好，消息即时到达，不发无用请求
 *          (2) 缺点：服务器维护长连接消耗资源
 * 
 * - SSE
 *      SSE是一种允许服务端向客户端推送新数据的HTML5技术。
 *      优点：基于HTTP而生，因此不需要太多改造就能使用，使用方便，而websocket非常复杂，必须借助成熟的库或框架
 *      缺点：基于文本传输效率没有websocket高，不是严格的双向通信，
 *              客户端向服务端发送请求无法复用之前的连接，需要重新发出独立的请求
 * 
 * - Websocket
 *      Websocket是一个全新的、独立的协议，基于TCP协议，与http协议兼容、却不会融入http协议，
 *      仅仅作为html5的一部分，其作用就是在服务器和客户端之间建立实时的双向通信。
 * 
 *      (1) 优点：真正意义上的实时双向通信，性能好，低延迟
 *      (2) 缺点：独立与http的协议，因此需要额外的项目改造，使用复杂度高，必须引入成熟的库，无法兼容低版本浏览器
 * 
 * - Web Worker
 *      Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行
 * 
 * - Service workers
 *      Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，
 *      也可以在网络可用时作为浏览器和网络间的代理，创建有效的离线体验。
 */

/** 
 * (10) 什么是浏览器同源策略？
 * 
 * 同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。
 * 这是一个用于隔离潜在恶意文件的重要安全机制。
 * 
 * 同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。
 * 浏览器中的大部分内容都是受同源策略限制的，但是以下三个标签可以不受限制：
 * - <img src=XXX>
 * - <link href=XXX>
 * - <script src=XXX>
 */

/** 
 * (11) 如何实现跨域？
 * 
 * - jsonp
 * 利用<script>标签不受同源策略限制的特性进行跨域操作
 * 
 * jsonp的缺点：
 *      只支持get请求（因为<script>标签只能get）
 *      有安全性问题，容易遭受xss攻击
 *      需要服务端配合jsonp进行一定程度的改造
 * 
 * - 最流行的跨域方案cors？
 * cors是目前主流的跨域解决方案，跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器
 * 让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。
 * 当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。
 * 
 * 如果你用express，可以这样在后端设置：
 */
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

//...
app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'cool beans' }));
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});


