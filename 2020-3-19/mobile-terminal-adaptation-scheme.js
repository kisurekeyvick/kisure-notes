/** 
 * https://mp.weixin.qq.com/s/xdE3VAmU9zia46Aq_dLv2w
 * 
 * 移动端适配方案
 */

/** 
 * 什么叫像素
 * 
 * 像素（Pel, pixel, pictureelement），为组成一幅图像的全部亮度和色度的最小图像单元
 */

/** 
 * 什么叫分辨率
 * 
 * 屏幕分辨率是指纵横向上的像素点数，单位是 px。
 * 屏幕分辨率确定计算机屏幕上显示多少信息的设置，以水平和垂直像素来衡量。就相同大小的屏幕而言，当屏幕分辨率低时（例如 640 x 480），
 * 在屏幕上显示的像素少，单个像素尺寸比较大。屏幕分辨率高时（例如 1600 x 1200），在屏幕上显示的像素多，单个像素尺寸比较小。
 */ 

/** 
 * 逻辑分辨率（设备独立像素）
 * 
 * 在 iPhone4 使用的视网膜屏幕中，把 2x2 个像素当 1 个像素使用，这样让屏幕看起来更精致，但是元素的大小却不会改变。从此以后高分辨率的设备，多了一个逻辑像素。
 * 这些设备逻辑像素的差别虽然不会跨度很大，但是仍然有点差别，于是便诞生了移动端页面需要适配这个问题，既然逻辑像素由物理像素得来，那他们就会有一个像素比值。
 */

/** 
 * 设备像素比
 * 
 * 设备像素比 device pixel ratio 简称 dpr，即物理像素和设备独立像素的比值。为什么要知道设备像素比呢？因为这个像素比会产生一个非常经典的问题，1 像素边框的问题。
 * 
 * 
 * 1px 边框问题:
 * 当我们 css 里写的 1px 的时候，由于它是逻辑像素，导致我们的逻辑像素根据这个设备像素比（dpr）去映射到设备上就为 2px，或者 3px，由于每个设备的屏幕尺寸不一样，
 * 就导致每个物理像素渲染出来的大小也不同（记得上面的知识点吗，设备的像素大小是不固定的），
 * 这样如果在尺寸比较大的设备上，1px 渲染出来的样子相当的粗矿，这就是经典的一像素边框问题。
 * 
 * 
 * 如何解决:
 * 核心思路，就是在 web 中，浏览器为我们提供了 window.devicePixelRatio 来帮助我们获取 dpr。
 * 在 css 中，可以使用媒体查询 min-device-pixel-ratio，区分 dpr：我们根据这个像素比，来算出他对应应该有的大小，但是暴露个非常大的兼容问题。
 * 
 * 我们查看【1px 边框问题.jpg】，可以看到：
 * 其中 Chrome 把 0.5px 四舍五入变成了 1px，而 firefox/safari 能够画出半个像素的边，并且 Chrome 会把小于 0.5px 的当成 0，
 * 而 Firefox 会把不小于 0.55px 当成 1px，Safari 是把不小于 0.75px 当成 1px，进一步在手机上观察 iOS 的 Chrome 会画出 0.5px 的边，
 * 而安卓(5.0)原生浏览器是不行的。所以直接设置 0.5px 不同浏览器的差异比较大，并且我们看到不同系统的不同浏览器对小数点的 px 有不同的处理。
 * 所以如果我们把单位设置成小数的 px 包括宽高等，其实不太可靠，因为不同浏览器表现不一样。
 */

/** 
 * 有效的解决方案：
 * transform: scale(0.5)
 * 
    div {
        height:1px;
        background:#000;
        -webkit-transform: scaleY(0.5);
        -webkit-transform-origin:0 0;
        overflow: hidden;
    }


 * 
 * css 根据设备像素比媒体查询后的解决方案
 * 
 * 2倍屏
 * @media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}
 * 
 * 
 * 3倍屏
 * @media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.33);
        transform: scaleY(0.33);
    }
}
 */ 

/** 
 * viewport
 * 
 * 视口(viewport)代表当前可见的计算机图形区域。在 Web 浏览器术语中，通常与浏览器窗口相同，
 * 但不包括浏览器的 UI， 菜单栏等——即指你正在浏览的文档的那一部分。
 * 
 * 动端如何配置视口：
 * <meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">
 * 分别代表的含义如图：【meta 对应属性的含义.jpg】
 * 
 * 其中 user-scalable 设置为 no 可以解决移动端点击事件延迟问题
 */ 


/** 
 * rem 适配
 * 
 * 举个例子:
 * //假设我给根元素的大小设置为14px
    html{
        font-size：14px
    }
    //那么我底下的p标签如果想要也是14像素
    p{
        font-size:1rem
    }

    rem 的布局，不得不提 flexible，flexible 方案是阿里早期开源的一个移动端适配解决方案，引用 flexible 后，我们在页面上统一使用 rem 来布局。
    他的原理非常简单：
    function setRemUnit () {
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }
    setRemUnit();

    rem 是相对于 html 节点的 font-size 来做计算的。所以在页面初始话的时候给根元素设置一个 font-size，接下来的元素就根据 rem 来布局，这样就可以保证在页面大小变化时，布局可以自适应。

    当然这个是一个过渡方案，因为当年 viewport 在低版本安卓设备上还有兼容问题，
    而 vw，vh 还没能实现所有浏览器兼容，所以 flexible 方案用 rem 来模拟 vmin 来实现在不同设备等比缩放的“过度”方案，
    之所以说是过度方案
 */ 

/** 
 * vw，vh 布局
 * 
 * vh、vw 方案即将视觉视口宽度 window.innerWidth 和视觉视口高度 window.innerHeight 等分为 100 份。
 * 
 */
