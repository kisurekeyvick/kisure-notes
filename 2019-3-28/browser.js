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