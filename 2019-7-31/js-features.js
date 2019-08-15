/** 
 * https://juejin.im/post/5d1716e4f265da1bbc6fea1e
 * 
 * 3 个实用有趣的 JS 特性
 */

/** 
 * 利用 a 标签解析 URL
 * 
 * 需求：有的时候我们需要从一个 URL 中提取域名，查询关键字，变量参数值等，
 *          一般我们会自己去解析 URL 来获取这些内容。
 * 
 * 操作：即创建一个 a 标签将需要解析的 URL 赋值给 a 的 href 属性，然后我们就能很方便的拿到这些内容。
 */
function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        hash: a.hash.replace('#','')
    };
}

/** 
 * 标记语句（label）
 * 
 * 有的时候我们会写双重 for 循环做一些数据处理，我们有的时候希望满足条件的时候就直接跳出循环。以免浪费不必要资源。
 * 
 * 这个时候我们就可以用 label 和 continue/break 配合使用:
 */
firstLoop: 
for (let i = 0; i < 3; i++) { 
   for (let j = 0; j < 3; j++) {
      if (i === j) {
         continue firstLoop; // 继续 firstLoop 循环
         // break firstLoop; // 中止 firstLoop 循环
      }
      console.log(`i = ${i}, j = ${j}`);
   }
}
// 输出
// i = 1, j = 0
// i = 2, j = 0
// i = 2, j = 1
 
for (let i = 0; i < 3; i++) { 
   for (let j = 0; j < 3; j++) {
      if (i === j) {
         continue 
      }
      console.log(`i = ${i}, j = ${j}`);
   }
}
// 输出
// i = 0, j = 1
// i = 0, j = 2
// i = 1, j = 0
// i = 1, j = 2
// i = 2, j = 0
// i = 2, j = 1

/** 
 * IntersectionObserver 是什么？
 * 
 * IntersectionObserver 可以用来监听元素是否进入了设备的可视区域之内，而不需要频繁的计算来做这个判断。
 * 
 * 所以我们可以用这个特性来处理曝光埋点，而不是用 getBoundingClientRect().top 这种更加损耗性能的方式来处理。
 */
// 当然你也可以用这个 API 来优化滚动吸顶,代码如下：
function IntersectionObserverFun() {
    let self = this;
    let ele = self.$refs;       // 这个是获取先关的ele元素
    if(!!IntersectionObserver) {
        /**
         * 创建一个新的IntersectionObserver对象，当其监听到目标元素的可见部分穿过了一个或多个阈(thresholds)时，会执行指定的回调函数。
         */
        let observer = new IntersectionObserver(function(){
            let offsetTop = ele.getBoundingClientRect().top;
            self.titleFixed = offsetTop < 0;
        }, {
            threshold: [1]
        });

        // 使IntersectionObserver开始监听一个目标元素
        observer.observe(document.getElementsByClassName('title_box')[0]);
    } else {
        window.addEventListener('scroll', _.throttle(function(){
            let offsetTop = ele.getBoundingClientRect().top;
            self.titleFixed = offsetTop < 0;
        }, 50));
    }
}

/** 
 * https://www.jianshu.com/p/84a86e41eb2b
 * 
 * 谈谈IntersectionObserver懒加载
 * 
 * API: var io = new IntersectionObserver(callback, options)
 * 以上代码会返回一个IntersectionObserver实例，callback是当元素的可见性变化时候的回调函数，options是一些配置项（可选）。
 */
// 我们使用返回的这个实例来进行一些操作:
io.observe(document.querySelector('img'))  // 开始观察，接受一个DOM节点对象
io.unobserve(element)   // 停止观察 接受一个element元素
io.disconnect() // 关闭观察器

/** 
 * options
 * 
 * (1) { root: null }   
 *      用于观察的根元素，默认是浏览器的视口，也可以指定具体元素，指定元素的时候用于观察的元素必须是指定元素的子元素 
 * 
 * (2) threshold
 *      用来指定交叉比例，决定什么时候触发回调函数，是一个数组，默认是[0]
        const options = {
            root: null,
            threshold: [0, 0.5, 1]
        }

        var io = new IntersectionObserver(callback, options)
        io.observe(document.querySelector('img'))

        上面代码，我们指定了交叉比例为0，0.5，1，当观察元素img0%、50%、100%时候就会触发回调函数
 * 
 * (3) rootMargin
        const options = {
            root: document.querySelector('.box'),
            threshold: [0, 0.5, 1],
            rootMargin: '30px 100px 20px'
        }
 *      
 *      我们添加了rootMargin属性，将视窗的增大了 
 */

/** 
 * callback
 * 
 * 上面我们说到，当元素的可见性变化时，就会触发callback函数。
 * callback函数会触发两次，元素进入视窗（开始可见时）和元素离开视窗（开始不可见时）都会触发
 */
