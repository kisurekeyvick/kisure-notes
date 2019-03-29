/**
 * 浏览器环境，规格
 * https://zh.javascript.info/browser-environment
 * 
 * Web 浏览器提供了一种控制网页的手段。
 * 浏览器在JavaScript中运行时，有一个叫window的根对象，
 * window有两个角色：
 * (1) 它是 JavaScript 代码的全局对象
 * (2) 它代表“浏览器窗口”并提供控制它的方法
 * 
 * window对象分为三类：DOM,BOM,Js
 * (1)文档对象模型（DOM）
 *      document 对象可以访问页面内容。我们可以使用它在页面上更改或创建任何内容。
 *      DOM 规范解释了文档的结构并提供了对其进行操作的对象 
 * (2)BOM
 *      navigator,screen,location,frames,history,XMLHttpRequest
 * (3)
 */

/**
 * 节点属性：type、tag 和 contents
 */
// 查看 DOM 节点类名, 因为对象通常都拥有 constructor 属性。它引用类的构造函数，constructor.name 就是它的名称
const div = document.querySelector('.kisure-div');
console.log(dov.constructor.name);  // 'HTMLDivElement'

// 我们也可以使用instanceof来检查继承
console.log( document.body instanceof HTMLBodyElement ); // true
console.log( document.body instanceof HTMLElement ); // true
console.log( document.body instanceof Element ); // true
console.log( document.body instanceof Node ); // true
console.log( document.body instanceof EventTarget ); // true

/**
 * innerHTML
 * 改属性允许将元素中的 HTML 作为字符串来获取
 */
// 我们可以插入无效的 HTML，因为浏览器会为我们修复错误
var rightContent = document.querySelector('div#content_right');
rightContent.innerHTML = '<div>hello';  // 最终浏览器会帮你修复成: <div>hello</div>

/**
 * innerHTML+= 会完全重写
 * 我们可以通过使用 elem.innerHTML+="something" 来添加“更多的 HTML”
 * 需要注意的是：我们所做的不是附加内容，而且完整的重写
 * 换一句话说，innerHTML+=做了如下内容：
 * (1) 移除旧的内容
 * (2) 新的 innerHTML 被书写（旧的和新的相连接）
 * 
 * 因为重写，
 */
rightContent.innerHTML += '<div>kisure</div>';

/**
 * outerHTML
 * outerHTML 赋值时不会修改 DOM 元素。而是从外部上下文中提取它，并插入一个新的 HTML 片段来替代它
 * 请记住它不会改变我们所写的元素。它会在其位置上创建新内容
 */
let div = document.querySelector('div');    //<div>Hello, world!</div>

// replace div.outerHTML with <p>...</p>
div.outerHTML = '<p>A new element!</p>';

// Wow! The div is still the same!
alert(div.outerHTML); // <div>Hello, world!</div>

/**
 * textContent
 * 纯文本，它提供对元素的text的访问权限，也就是只提供文本，去掉所有的tags
 */
/*
    html:
    <div id="news">
        <h1 id='kisure'>Headline!</h1>
        <p>Martians attack people!</p>
    </div>
 */
const h1 = document.querySelector('#kisure');
console.log(h1.textContent);    // Headline!

/**
 * hidden属性
 * hidden与style='display:none'的运行方式相似，但是写法更加简洁
 */

/**
 * nodeType属性
 * nodeType 属性提供了一个获取 DOM 节点类型的旧方法。
 * elem.nodeType == 1 是元素节点
 * elem.nodeType == 3 是文本节点
 * elem.nodeType == 9 是 document 对象
 */
let elem = document.body;

// 让我们检查一下它是什么？
alert(elem.nodeType); // 1 => element

// 第一个子节点是
alert(elem.firstChild.nodeType); // 3 => text

// 对于文档对象，类型是 9
alert( document.nodeType ); // 9

/**
 * 获取标签名：nodeName 和 tagName
 */
console.log(document.body.nodeName);    // BODY
console.log(document.body.tagName);     // BODY
// tagName和nodeName之间的差别
/**
 * tagName 属性仅用于 Element 节点
 * nodeName 是为任意 Node 定义的:
 *      (1)对于元素，它的意义与 tagName 相同
 *      (2)对其他节点类型（text、comment 等），则是拥有一个字符串的节点类型
 *          comment类型是注释节点
 *          text类型是文本节点， 文本节点就是文本内容
 * 
 * 简单的说：tagName 只被元素节点支持（因为它起源于 Element 类），而 nodeName 则可以说明其他节点类型。
 */