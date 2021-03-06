/**
 * 前端中的一些不可忽略的知识点
 */
/** 
 * (1) css禁用鼠标事件
 * 
    .disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.6;
    }
 */

/** 
 * (2) 实现条纹网格的方式
 * 
 *  odd表示基数，此时选中基数行的样式，even表示偶数行
    - nth-child(even/odd)
 */

/** 
 * (3) 什么是CDN和CDN的好处
 * 
 * CDN:CDN是将源站内容分发至最接近用户的节点，使用户可就近取得所需内容，提高用户访问的响应速度和成功率。
 * 解决因分布、带宽、服务器性能带来的访问延迟问题，适用于站点加速、点播、直播等场景。
 * 
 * 好处：
 * - 多域名加载资源 一般情况下，浏览器都会对单个域名下的并发请求数（文件加载）进行限制，
 * 通常最多有4个，那么第5个加载项将会被阻塞，直到前面的某一个文件加载完毕。 
 * 因为CDN文件是存放在不同区域（不同IP）的，所以对浏览器来说是可以同时加载页面所需的所有文件（远不止4个），从而提高页面加载速度。
 * 
 * - 文件可能已经被加载过并保存有缓存, 一些通用的js库或者是css样式库，如jQuery，在网络中的使用是非常普遍的。
 * 当一个用户在浏览你的某一个网页的时候，很有可能他已经通过你网站使用的CDN访问过了其他的某一个网站，
 * 恰巧这个网站同样也使用了jQuery，那么此时用户浏览器已经缓存有该jQuery文件（同IP的同名文件如果有缓存，
 * 浏览器会直接使用缓存文件，不会再进行加载），所以就不会再加载一次了，从而间接的提高了网站的访问速度。
 * 
 * - 分布式的数据中心 
 * 假如你的站点布置在北京，当一个香港或者更远的用户访问你的站点的时候，他的数据请求势必会很慢很慢。
 * 而CDNs则会让用户从离他最近的节点去加载所需的文件，所以加载速度提升就是理所当然的了。
 */

/** 
 * (4) 如何提高首频加载速度
 * - js外联文件放到body底部，css外联文件放到head内
 * - http静态资源尽量用多个子域名
 * - 服务器端提供html和http静态资源时最好开启gzip
 * - 在js,css,img等资源响应的http headers里设置expires,last-modified
 * - 尽量减少http requests的数量
 * - js/css/html/img资源压缩
 * - 使用css spirtes，可以减少img请求次数
 *      当在浏览器里输入一个URL地址的时候，你会感觉无数张图片“唰唰唰”的闪出来了。在这个过程中，
 *      浏览器会把这个网站的主资源（就是Html文件）拉取回来，然后开始分析网页中的Js，Img之类的标签，
 *      然后再去拉取这些图片和资源，这些后拉取的资源称为「子资源」。
 * 
 *      对于浏览器来说，他们的请求方式都是发起一个Http请求，经历三次握手，并把文件拉取回来，
 *      一般的浏览器内核只能同时并发4，5个网络请求，所以大量的小图片特别影响性能，不但网页加载完成时间慢，
 *      还可能影响一些重要的JS逻辑，使得网页响应也变慢，卡死等等，对于浏览器来说，发起一个Http请求，
 *      来回几百毫秒的耗时，已经是相当高的资源耗费。
 * 
 *      然后很多人就想到了一种办法，把网页中一些背景图片整合到一张图片文件中，再利用CSS的background属性进行定位图片
 * - 大图使用lazyload懒加载
 * - 减少cookie大小可以提高获得响应的时间
 *      由于cookie在访问对应域名下的资源时都会通过HTTP请求发送到服务器，因此，减小cookie的大小，
 *      能减小HTTP请求报文的大小，提高响应速度。
 * - 使用异步脚本，动态创建脚本
 */

/** 
 * (5) link和 @import 有什么区别
 * 
 * - link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；
 *      <link rel="value">
 *      rel 属性规定当前文档与被链接文档之间的关系。
 *          stylesheet -> 文档的外部样式表
 * - 而@import是CSS提供的，只能用于加载CSS;
 * - 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载 
 *      <style type="text/css" media="screen"> 
 *          @import url("CSS文件");  
 *      </style>
 * 
 *      导入式会在整个网页装载完后再装载CSS文件，因此这就导致了一个问题，如果网页比较大则会儿出现先显示无样式的页面，
 *      闪烁一下之后，再出现网页的样式。这是导入式固有的一个缺陷。
 * - import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题; 
 * - link支持使用js控制DOM去改变样式，而@import不支持;
 *      因为link也属于DOM元素，而@import是css样式表中支持的东东
 * - import规则一定要先于除了@charset的其他任何CSS规则
 * 
 *      写成如下，是不会生效的：
 *          <style>
 *              #bgc{background-color: green}
 *              @import "index.css";
 *          </style>
 * 
 *      只有写成这样，才会生效：
 *          <style>
 *              @import "index.css";
 *              #bgc{background-color: green}
 *          </style>
 */

/** 
 * https://my.oschina.net/u/2258555/blog/624557
 * 
 * 关于link和 @import 的案例
 * 
    <style type="text/css">
        @import url(extra.css);
    </style>
    <script type="text/javascript">
        document.write("<script src='extra.js'><\/script>");
    </script>
    <script src="jquery.js"></script>
    <link rel="stylesheet" type="text/css" href="test.css">
    <script type="text/javascript" src='test.js'></script>

    加载的顺序是jquery.js->test.css->test.js->extra.css->extra.js。
    其中extra.css和extra.js就是代码中引用文件的典型。

    注意：虽然extra.css在加载顺序上是在test.css后面，但是浏览器认为extr.css样式表的定义在test.css的前面，
    所以样式上浏览器会用test.css中的样式覆盖extra.css的样式。js脚本也是同理。

    这里有一个原则，脚本（无论是html中内嵌的还是外部脚本）的优先级顺序是其引用的顺序，而非加载的顺序，
    并且其中的执行代码执行的必要条件是其引用顺序在其前列的脚本已经加载完毕
    （实际上脚本中代码的执行都是在所有脚本加载完成之后才执行的，只是不同脚本中的代码执行的上下文环境是不同的）
 */

/** 
 * (6) 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？
 * 
 * - IE 盒子模型、W3C 盒子模型；
 * - 盒模型：
 *       内容(content)、填充(padding)、边界(margin)、 边框(border)；
 * 
 * - 区别：
 *      IE的content部分把 border 和 padding计算了进去;
 */

/** 
 * (7) position的值relative和absolute定位原点是?
 *  
 * - absolute 生成绝对定位的元素，相对于值不为 static的第一个父元素进行定位。
 *      也就是说，你只要设定了relative或者fixed,那么被absolute的元素就会进行相对于这个relative或者fixed进行定位
 * - relative 生成相对定位的元素，相对于其正常位置进行定位。
 * - fixed （老IE不支持） 生成绝对定位的元素，相对于浏览器窗口进行定位。
 * - static 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right z-index 声明)
 * - inherit 规定从父元素继承 position 属性的值。
 */

/** 
 * (8) CSS优化、提高性能的方法有哪些？
 * 
 * 关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）;
 * 如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）
 * 
 * 提取项目的通用公有样式，增强可复用性，按模块编写组件；
 * 
 * 使用预处理工具或构建工具（gulp对css进行语法检查、自动补前缀、打包压缩、自动优雅降级）；
 */

/** 
 * (9) 什么叫优雅降级和渐进增强？
 * 
 * - 优雅降级
 *      Web站点在所有新式浏览器中都能正常工作，如果用户使用的是老式浏览器，则代码会检查以确认它们是否能正常工作。
 *      由于IE独特的盒模型布局问题，针对不同版本的IE的hack实践过优雅降级了
 *      为那些无法支持功能的浏览器增加候选方案，使之在旧式浏览器上以某种形式降级体验却不至于完全失效.
 * 
 *      通俗一点就是说，高级的功能在低级浏览器上使用不了，那么就做个捞一点的功能来兼容老版本浏览器，在老版本浏览器
 *      上只要凑合使用，功能没有大碍就行
 * 
 * - 渐进增强
 *      从被所有浏览器支持的基本功能开始，逐步地添加那些只有新式浏览器才支持的功能,
 *      向页面增加无害于基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。
 */

/** 
 * (10) 如何修改chrome记住密码后自动填充表单的黄色背景?
 * 
 * input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
 *     background-color: rgb(250, 255, 189);
 *     background-image: none;
 *     color: rgb(0, 0, 0);
 * }
 */

/** 
 * (11) 如何将浮点数点左边的数每三位添加一个逗号，如12000000.11转化为『12,000,000.11』?
 */
function commafy(num) {
    return num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
        return $2 + ',';
    });
}

/** 
 * (12) ["1", "2", "3"].map(parseInt)   // [1, NaN, NaN]
 * 
 * parseIn接收两个参数：
 * - 参数1  数组的当前item值
 * - 参数2  取值范围是2~36，此参数省略或者为0时，以十进制方式解析
 *          所以parseInt("1", 0)解析出来的值为 1
 * 
 * 所以： parseInt("2", 1)”第二个参数为1，不在取值范围内，所以返回NaN
 *        parseInt("3", 2)”以二进制的方式解析字符串3，但是二进制中的有效数字只有0和1，所以返回NaN。
 */

/** 
 * (13) new一个对象的过程
 * 
 * - 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
 * - 属性和方法被加入到 this 引用的对象中。
 * - 新创建的对象由 this 所引用，并且最后隐式的返回 this。
 */

/** 
 * (14) Ajax 解决浏览器缓存问题
 * 
 * 现象：我们在做项目中，一般提交请求都会通过ajax来提交，但是测试的时候发现，每次提交后得到的数据都是一样的。
 *          每次清除缓存后，就会得到一个新的数据，所以归根到底就是浏览器缓存问题。
 * 
 * ajax能提高页面载入的速度主要的原因是通过ajax减少了重复数据的载入，也就是说在载入数据的同时将数据缓存到内存中，
 * 一旦数据被加载其中，只要我们没有刷新页面，这些数据就会一直被缓存在内存中，当我们提交 的URL与历史的URL一致时，
 * 就不需要提交给服务器，也就是不需要从服务器上面去获取数据，虽然这样降低了服务器的负载提高了用户的体验，
 * 但是我们不能获取最新的数据。为了保证我们读取的信息都是最新的，我们就需要禁止他的缓存功能。 
 * 
 * 解决方案有如下几种：
 * -    在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。
 * -    在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。
 * -    在URL后面加上一个随机数： "fresh=" + Math.random();。
 * -    在URL后面加上时间搓："nowtime=" + new Date().getTime();。
 */

/** 
 * (15) 如何判断当前脚本运行在浏览器还是node环境中？
 * 
 * this === window ? 'browser' : 'node';
 */

/** 
 * (16) 把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？
 * 
 * - 过时的解决方案：
 *      之前推荐的方法（已过时）：之前解决这个问题的方法是把script标签放到body标签之后 ，
 *      这确保了解析到</body>之前都不会被script终端。这个方法是有问题的: 浏览器在整个文档解析完成之前都不能下载script文件，
 *      如果文档很大的话，解析完HTML，用户依然要等待script文件下载并执行完成之后，才能操作这个网站。
 * 
 * - 现在推荐的解决方案：
 *      现在浏览器script标签支持 async 和 defer 属性。
 *      应用这些属性当script被下载时，浏览器更安全而且可以并行下载（下载script并不阻断HTML解析）。
 *      (1) defer标签的script顺序执行。
 *          这个属性的用途是表明脚本在执行时不会影响页面的构造。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。
 *          因此，在<script>元素中设置defer属性，相当于告诉浏览器立即下载，但延迟执行。
 *      (2) 同样与defer类似，async只适用于外部脚本文件，并告诉浏览器立即下载文件。但与defer不同的是，
 *          标记为async的脚本并不保证按照它们的先后顺序执行。第二个脚本文件可能会在第一个脚本文件之前执行。
 *          因此确保两者之间互不依赖非常重要。指定async属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容。
 */

/** 
 * (17) 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？
 * 
 * 而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、 
 * 到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；
 * 
 * 详细版：
    1、浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
    2、调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;
    3、通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;
    4、进行HTTP协议会话，客户端发送报头(请求报头);
    5、进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
    6、进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理;
    7、处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;
    8、浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;
    9、文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
    10、页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。
 */

/** 
 * (18) canvas和svg区别
 * 
 * - 从图像类别区分，Canvas是基于像素的位图，而SVG却是基于矢量图形。
 * - 从结构上说，Canvas没有图层的概念，所有的修改整个画布都要重新渲染，而SVG则可以对单独的标签进行修改。
 * - 从操作对象上说，Canvas是基于HTML canvas标签，通过宿主提供的Javascript API对整个画布进行操作的，
 *      而SVG则是基于XML元素的。
 * - 关于动画，Canvas更适合做基于位图的动画，而SVG则适合图表的展示。
 * - 从搜索引擎角度分析，由于svg是有大量标签组成，所以可以通过给标签添加属性，便于爬虫搜索
 */
