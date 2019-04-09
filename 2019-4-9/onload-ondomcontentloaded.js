/**
 * 页面生命周期：DOMContentLoaded、load、beforeunload 和 unload
 * https://zh.javascript.info/onload-ondomcontentloaded
 */

/** 
 * HTML 页面的生命周期有三个重要事件：
 * DOMContentLoaded     —— 浏览器加载 HTML，并构建 DOM 树，但像 <img> 和样式这样的资源可能还没有加载。
 * load                 —— 浏览器加载所有资源（图像，样式等）。
 * beforeunload/unload  —— 当用户离开页面时。
 * 
 * 每个事件都是有用的：
 * DOMContentLoaded事件     —— DOM已经准备好，因此处理器可以查找 DOM 节点，并初始化接口。
 * load 事件                —— 额外资源被加载后，我们可以获取图像大小（如果在 HTML/CSS 中没有指定）等
 * beforeunload/unload事件  —— 用户即将离开：我们可以检查用户是否保存了修改，并在询问他是否真的要离开
 */

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('dom is ready');
});

/** 
 * DOMContentLoaded和脚本
 * 当浏览器开始加载 HTML 并在文本中遇到 <script>...</script> 时，就会停止构建 DOM。它必须立即执行脚本。
 * 因此 DOMContentLoaded 只有在所有此类脚本被执行后才会发生。
 * 
 * 额外的脚本（带有 src）也会促使 DOM 构建在加载和执行过程时暂停。因此 DOMContentLoaded 也会等待外部脚本。
 * 
 * 唯一的例外是具有 async 和 defer 属性的外部脚本。它们告诉浏览器可以继续解析文档而不必等待脚本解析和执行。
 * 因此用户可以在脚本完成加载之前就看到页面，这对性能来说是有好处的。
 * 
 * 关于async和defer：
 * 属性 async和defer 仅适用于外部脚本。如果没有 src，它们就会被忽略。
 * 这两种方法告诉浏览器，它可以继续解析页面，并“在后台”继续加载脚本，然后在外部脚本加载完成后执行它。
 * 因此脚本不会阻塞 DOM 的构建和页面的渲染。
 * 
 * async和defer之间的区别：
 * 具有 async 的脚本以第一顺序被加载。它们的文档顺序并不重要 —— 先加载先运行。
 * 具有 async 的脚本可以在文档尚未完全下载时加载和执行。如果脚本较小或被缓存，而且文档足够长，就会发生这种情况。
 * 具有 defer 的脚本总是按照文档顺序来执行（就像它们在文档中那样）
 * 在 DOMContentLoaded 之前，具有 defer 的脚本会在文档被加载并解析后执行（如果需要，它们会等待）
 * 
 * async用于完全独立的脚本。
*/

/** 
 * DOMContentLoaded和样式
 * 外部样式不会影响 DOM，因此 DOMContentLoaded 无需等待它们。
 * 但有一个陷阱：如果在样式之后有一个脚本，那么该脚本必须等待样式被执行：
 * 
 *  <link type="text/css" rel="stylesheet" href="style.css">
    <script>
        // the script doesn't not execute until the stylesheet is loaded
        alert(getComputedStyle(document.body).marginTop);
    </script>

    原因是脚本可能希望获取如上述示例所描述的元素坐标和其他与样式相关的属性。当然，它必须等待样式被加载。
    当 DOMContentLoaded 等待脚本时，它也在等待它们之前的样式。
 */

/** 
 * css阻塞和js阻塞
 * 
 * (1)js阻塞
 * 所有浏览器在下载 JS 的时候，会阻止一切其他活动，比如其他资源的下载，内容的呈现等等。
 * 直到 JS 下载、解析、执行完毕后才开始继续并行下载其他资源并呈现内容。
 * 为了提高用户体验，新一代浏览器都支持并行下载 JS，但是 JS 下载仍然会阻塞其它资源的下载（例如.图片，css文件等）。
 * 
 * 由于浏览器为了防止出现 JS 修改 DOM 树，需要重新构建 DOM 树的情况，所以就会阻塞其他的下载和呈现。
 * 嵌入 JS 会阻塞所有内容的呈现，而外部 JS 只会阻塞其后内容的显示，2 种方式都会阻塞其后资源的下载。
 * 也就是说外部样式不会阻塞外部脚本的加载，但会阻塞外部脚本的执行。
 * 
 * (2)css阻塞
 * CSS 本来是可以并行下载的，在什么情况下会出现阻塞加载了，当 CSS 后面跟着嵌入的 JS 的时候，
 * 该 CSS 就会出现阻塞后面资源下载的情况。而当把嵌入 JS 放到 CSS 前面，就不会出现阻塞的情况了。
 * 
 * 根本原因：因为浏览器会维持 html 中 css 和 js 的顺序，样式表必须在嵌入的 JS 执行前先加载、解析完。
 * 而嵌入的 JS 会阻塞后面的资源加载，所以就会出现上面 CSS 阻塞下载的情况。
 */

/**
 * window.onload
 * 当包括样式、图像和其他资源的页面被全部加载时，load 事件就会在 window 对象上被触发
 */

/** 
 * window.onunload
 * 当访问者离开页面时，unload 事件会在 window 上被触发。
 * 我们可以在那里做一些不涉及延迟的事件，比如关闭相关的弹出窗口。但我们不能取消跳转到另一个页面的事件。
 */

/** 
 * window.onbeforeunload
 * 如果访问中启动了离开页面的导航或试图关闭窗口，beforeunload 处理器将要求提供更多的确认。
 */
window.onbeforeunload = () => {
    return 'are you sure?';
}

/** 
 * readyState
 * 
 * 在某些情况下，我们不确定文档是否已经准备就绪，比如一个具有 async 属性的脚本加载并异步运行。
 * 取决于网络，它可能在文档完成之前加载和执行，或者在此之后，我们无法确定。
 * 因此，我们应该能够知道文件的当前状态。
 * 
 * document.readyState 属性为我们提供了一些关于它的信息。有三个可能的值：
 * (1)"loading"     —— 文档正在被加载
 * (2)"interactive" —— 文档被全部读取，大概是与 DOMContentLoaded 同时发生，而不是在它之前发生
 * (3)"complete"    —— 文档被全部读取，所有的资源（图像之类的）都被加载，与 window.onload 同时发生
 * 
 * 因此我们检查 document.readyState 并设置一个处理器，或在代码准备就绪时立即执行它
 */
function run() {
    document.onreadystatechange = () => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('say hello');
            });
        }
    }
}

run();

/**
 * window.onload 和 document.onDOMContentLoaded 有什么区别？
 * window.onload 当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。
 * document.onDOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash
 */

/**
 * 总结：
 * 当所有资源（iframe 和 img）都被加载后，document.readyState 变成了 complete。
 * 这里我们可以发现，它大约发生在 img.onload (img 是最后的资源) 和 window.onload 之间。
 * 转换到 complete 状态的意义与 window.onload 一致。区别在于 window.onload 在所有其他 load 处理器之后一直有效。
 */