/** 
 * Web前端性能优化
 */

/** 
 * (1)理解减少http请求数量和减少请求资源大小两个优化要点
 * 
 * CS架构：本地开发代码 -> 发布到应用平台 -> ios或者安卓系统用户下载应用，部署代码于手机中运行
 * BS架构：本地开发代码 -> 发布到CDN或者远程服务器(webserver) -> 用户打开浏览器，输入相应的网址，
 *                                                            这个时候浏览器才会向远程服务器发出请求，动态的增量式的去加载静态资源
 * 所谓增量式：就是一点点加载资源，资源逐渐增多的过程
 * 
 * - http://mail.163.com/index.html这段url的解释：
 *      http://             这个是协议，也就是HTTP超文本传输协议，也就是网页在网上传输的协议
 *      mail                这个是服务器名
 *      163.com             这个是域名，是用来定位网站的独一无二的名字
 *      mail.163.com        这个是网站名，由服务器名+域名组成
 *      /                   这个是根目录，也就是说，通过网站名找到服务器，然后在服务器存放网页的根目录
 *      index.html          这个是根目录下的默认网页
 * 
 * - DNS
 *      DNS是进行域名和与之对应的IP地址转换的服务器。
 *      DNS中保存了一张域名和与之相对应的IP地址的表，以解析消息的域名。
 *      域名是Internet上某一台计算机或计算机组的名称，用于在数据传输时标识计算机的电子方位（有时也指地理位置）
 * 
 * - 浏览器的一个请求，从发送到返回都经历了什么？
 *   用户输入url，浏览器的核心代码会将url进行拆封解析，最终将domain发送到dns服务器上(domain就是域的意思)。
 *   dns服务器会根据domain查询相关主机(host)对应的IP地址，从而将ip传递给浏览器。
 *   浏览器拿到ip地址以后，就会知道会将请求发送到某个位置。于是跟随协议，将ip地址打在协议中，请求的相关参数都会在协议中存在
 *   然后发送到网络中去，经过局域网 -> 交换机 -> 路由器 -> 传递到主干网络 -> 然后到达服务端
 *   服务端是mvc架构的，请求先到controller中进行相关的逻辑处理，然后去调用我们的module层，module层是进行数据交互的
 *         然后再读取redis+db，获取到数据以后，最终将渲染好的view层返回给我们的网络
 * 
 * - CDN：https://www.jianshu.com/p/57433bc34659
 *      CDN，中文名称是内容分发网络，可以用来分发直播、点播、网页静态文件、小文件等等，
 *      几乎我们日常用到的互联网产品都是有CDN在背后提供支持。
 * 
 * - 可存在的优化：
 *      (1) 可以在浏览器层面将dns相关的信息进行一个缓存，这样返回dns的时间会减少很多（）
 *      (2) 网络请求的过程，选择使用cdn能够解决网络静态资源，但是对于一些接口是没法用cdn的（网络请求的过程走最近的网络环境）
 *      (3) 在服务端进行html的渲染，从而将html直接输出到浏览器中，而不是在浏览器中渲染（服务端渲染）
 *      (4) 减少http请求
 *      (5) 相同的静态资源缓存
 */


/** 
 * (2)掌握压缩与合并的原理
 * 
 * - 可存在的优化：
 *      减少http请求数量
 *      减少请求资源的大小
 * 
 * html压缩
 *      HTML代码压缩就是压缩这些在文本文件中有意义，但是在HTML中不显示的字符
 *      包括：空格，换行符等。还有其他一些意义字符如：HTML注释也可以被压缩
 * 
 * css压缩
 * js的压缩和混乱
 * 文件合并
 * 开启gzip 来更程度的减少http请求资源的大小
 */

/** 
 * (3) 资源嗅探
 * 
 * 对于现代浏览器来说，可以给link标签添加preload,prefetch,dns-prefetch属性。
 * 对于SPA应用来说,当浏览器解析完script脚本才会生成DOM节点,
 * 如果你的项目中没有使用服务端渲染的话且需要加载一个比较耗时的首屏图片时,
 * 可以考虑将这个首屏图片放在preload标签中让浏览器预先请求并加载执行,
 * 这样当script脚本执行完毕后就会瞬间加载图片(否则需要等脚本执行完毕后再向后台请求图片)
 * 
 * 通过 【preload-prefetch.png】 我们可以看到
 * webp图片需要等到脚本加载完之后才回去请求,如果这个图片比较大就会浪费不必要的时间
 * 
 * - prefetch
 * prefetch可以让浏览器提前加载下个页面可能会需要的资源,
 * vue-cli3默认会给所有懒加载的路由添加prefetch属性，这样可以在你访问使用到懒加载的路由页面时能够获得更快的加载速度
 * 
 * - preload和prefetch的区别：
 * preload的资源会和页面需要的静态资源并行加载
 * 而prefetch则会等到浏览器加载完必要的资源后，在空闲时间加载被标记为prefetch的资源
 * 
 * - dns-prefetch
 * dns-prefetch可以让浏览器提前对域名进行解析，减少DNS查找的开销,
 * 如果你的静态资源和后端接口不是同一个服务器的话，可以将考虑你后端的域名放入link标签加入dns-prefetch属性
 */

/** 
 * (4) http2
 * 
 * 浏览器对同一域名的tcp连接数量是有限制的（chrome为6个）超过规定数量的tcp连接
 * 而http2则可以在一个tcp连接中并发多个请求没有限制，在一些网络较差的环境开启http2性能提升尤为明显
 * 
 * 在network中通过protocol可以查看到当前的资源是通过哪个版本的http协议传输的h2代表http2
 * 
 * 可查看：【http2.png】
 */

/** 
 * (5) 路由懒加载   【路由懒加载.png】
 * 
 * 传统的路由组件是通过import静态的打包到项目中，这样做的缺点是因为所有的页面组件都打包在同一个脚本文件中，
 * 导致生产环境下首屏因为加载的代码量太多会有明显的卡顿（白屏）
 * 
 * 通过import()使得ES6的模块有了动态加载的能力，让url匹配到相应的路径时，会动态加载页面组件，
 * 这样首屏的代码量会大幅减少，webpack会把动态加载的页面组件分离成单独的一个chunk.js文件
 * 
 * 当然懒加载也有缺点，就是会额外的增加一个http请求，如果项目非常小的话可以考虑不使用路由懒加载
 */

/** 
 * https://www.jianshu.com/p/ec86c9e64560
 * (6) DllPlugin
 * 
 * DllPlugin提升webpack打包速度
 * 主要思想在于，将一些不做修改的依赖文件，提前打包，这样我们开发代码发布的时候就不需要再对这部分代码进行打包。从而节省了打包时间。
 * 
 * 当没有一个稳定的CDN时，使用DllPlugin这个webpack插件同样可以将类库从业务代码中分离出去。
 * 其原理是：
 *      预先将类库文件打包，随后创建一个关联表，在业务代码依赖第三方类库时，会直接去关联表中获取已经打包好的类库文件。
 * 好处：
 *      因为业务代码会常常需要打包上线，而第三方类库基本不会改变，所以每次打包可以跳过这些类库文件，减少不必要的重复打包
 * 
 * DllPlugin是一个webpack内置的插件，无需安装，但是要让打包后的index.html注入这些打包后第三方类库，
 * 需要额外安装add-asset-html-webpack-plugin插件
 * 
 * 当你需要在index.html中注入多个类库时，需要实例化多次add-asset-html-webpack-plugin，这里我们可以利用nodejs的fs模块，
 * 遍历DllPlugin打包后的目录，根据类库的数量决定需要生成多少个实例，非常的灵活。
 */

/** 
 * (7) 合理使用第三方库
 * 
 * 如果项目中有一些日期操作的需求，不妨将目光从moment转移到day，相对于笨重的moment，
 * 它只有2kb，day和moment的api完全一样，并且中文文档也比较友好
 * 
 * 对于lodash这类的库如果只需要部分功能，则只要引入其中一部分，这样webpack在treeshaking后在生产环境也只会引入这一部分的代码
 * 
 * 对于UI库（element-ui）打包后的体积也会非常大，尽量使用按需加载
 */

/** 
 * (8) 常用的路径创建文件别名
 * 
 * 给常用的模块路径创建一个别名是一个不错的选择，可以减少模块查找时耗费的时间，项目越大收益也就越明显
 */

/** 
 * https://www.jianshu.com/p/eadd2fb68d48
 * 
 * (9) webpack-bundle-analyzer
 * 
 * 在webpack.prod.conf.js中增加以下配置：    
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
}
/** 
 * 在 项目的 package.json 文件中注入如下命令，以方便运行她(npm run analyz)，
 * 默认会打开http://127.0.0.1:8888作为展示：
 * “analyz”: “NODE_ENV=production npm_config_report=true npm run build”
 * 
 * 这样运行npm run build后浏览器会自动打开127.0.0.1:8888 展示如下页面：【webpack-bundle-analyzer.png】
 */

/** 
 * (10) 图片懒加载
 * 
 * 不在用户视野中的图片是没有必要加载的，图片懒加载通过让图片先加载成一张统一的图片，
 * 再给进入用户视野的图片替换真正的图片地址，可以同一时间减少http请求开销，
 * 避免显示图片导致的画面抖动，提高用户体验
 * 
 * 2种图片懒加载的思路:
 * - getBoundingClientRect
 *      DOM元素包含一个getBoundingClientRect方法，执行该方法返回当前DOM节点相关的CSS边框集合
 *      
 *      其中有一个top属性代表当前DOM节点距离浏览器窗口顶部的高度，只需判断top值是否小于当前浏览器窗口的高度（window.innerHeight），
 *      若小于说明已经进入用户视野，然后替换为真正的图片即可
 * 
 *      另外使用getBoundingClientRect作图片懒加载需要注意3点:
 *          (1) 因为需要监听scroll事件，不停的判断top的值和浏览器高度的关系，请对监听事件进行函数节流
 *          (2) 当屏幕首次渲染时，不会触发scroll事件，请主动调用一次事件处理程序，
 *                  否则若用户不滚动则首屏的图片会一直使用懒加载的默认图片
 *          (3) 当所有需要懒加载的图片都被加载完，需要移除事件监听，避免不必要的内存占用
 * 
 * - IntersectionObserver
 *      IntersectionObserver作为一个构造函数，传入一个回调函数作为参数，生成一个实例observer，
 *          这个实例有一个observe方法用来观察指定元素是否进入了用户的可视范围，随即触发传入构造函数中的回调函数
 * 
 *      同时给回调函数传入一个entries的参数，记录着这个实例观察的所有元素的一些阈值信息（对象），
 *          其中intersectionRatio属性表示图片进入可视范围的百分比，大于0表示已经有部分进入了用户视野
 */
let imgs = [...document.querySelectorAll('img')];

function preloadImg(img) {
    img.src = img.dataset.src;
}

let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            preloadImg(entry.target);   // 替换真实图片
            observer.unobserve(entry.target);   // 加载真实的图片以后解除observer实例对当前img元素的观察
        }
    });
});

// 让observer实例观察所有img元素
imgs.forEach(img => {
    observer.observe(img);
});

/** 
 * 这2种的区别在于监听的方式，我个人更推荐使用Intersection Observer，因为通过监听scroll事件开销比较大，
 * 而让将这个工作交给另一个线程异步的去监听开销会小很多，但是它的缺点是一些老版本的浏览器可能支持率不高，
 * 好在社区有polyfill的方案或者可以直接使用第三方的组件库vue-lazyload
 */

/** 
 * https://segmentfault.com/a/1190000015746485?utm_source=tag-newest
 * https://www.cnblogs.com/a-cat/p/9473301.html
 * 
 * (11) 使用svg图标
 * 
 * 相对于用一张图片来表示图标，svg拥有更好的图片质量，体积更小，并且不需要开启额外的http请求，
 * svg是一个未来的趋势，阿里的图标库iconfont支持导出svg格式的图标
 * 
 * 好处：
 *      一：完全离线化使用，不需要从cdn下载字体文件，图标不会因为网络问题出现方块，也无需字体文件本地部署
 *      二：低端设备上svg有更好的清晰度
 *      三：支持多色图标
 * 
 * 分析：
 * antd 的图标使用体验一直很好，<Icon type="home" />，只需要指定 type = "home" 就可以使用。 
 * 但是 antd 没有解决一个问题，那就是如何做到图标的按需引用?
 */
/** 
 * 以下是在react中使用svg
 * 
 * - npm install glamorous(glamorous是我们调用svg并改变path的属性时比较重要的插件了)
 */
// 创建 BaseIcon.js
import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

class BaseIcon extends React.PureComponent {
    static propTypes = {
        SvgIcon: PropTypes.func.isRequired,
        color: PropTypes.string,
        circleColor: PropTypes.string,
        fontSize: PropTypes.string,
    };

    static defaultProps = {
        color: '', //字体颜色
        circleColor: '#76829E', //多层path时背景颜色
    };

    render() {
        const { color, SvgIcon, circleColor, fontSize } = this.props;

        if (color === '' && circleColor === '') {
            return (<SvgIcon {...this.props} />);
        }

        const WrappedSvgIcon = glamorous(SvgIcon)({
            '> path': {
              fill: color,
              width: fontSize, //设置fontSize来改变svg的大小
              height: fontSize, //设置fontSize来改变svg的大小
            },
            '> circle': {
              fill: circleColor, //设置带圆背景的icon 圆的颜色，下面会给您截图介绍
            },
        });
       
        return (<WrappedSvgIcon {...this.props} />);
    }
}

export default BaseIcon;

// 新建单色icon的js
import React from 'react';
import { Svg, Path } from 'glamorous';
import BaseIcon from './BaseIcon'; 

const BaseSvg = props => (
    <Svg width="1em" height="1em" viewBox="0 0 20 20" {...props}>
      <Path fillRule="evenodd" d="M7.288 14.022L3.34 10.074 2 11.414l5.288 5.288L18.65 5.34 17.31 4z" />
    </Svg>
);

export default props => (
    <BaseIcon {...props} SvgIcon={BaseSvg} />
);

<svg t="1572947028152" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1578" width="200" height="200">
    <path d="M957.2 571.1l-77.8 292.5c-12.8 55.6-62.3 94.4-119.3 94.4H333.7V421.9l77-277.3c9-59 70.2-98.6 132.3-74.7 37.1 14.3 59.3 52.9 59.3 92.7v214.6c0 24.7 20 43.8 44.8 43.8H838c78.6-0.1 136.9 73.4 119.2 150.1zM65.1 511.4v358.1c0 49.4 40.1 88.6 89.5 88.6h89.5V420.9h-89.5c-49.4 0-89.5 41-89.5 90.5z" p-id="1579"></path>
</svg>
