/** 
 * innerHTML和outerHTML的区别
 * innerHTML 设置或获取位于对象起始和结束标签内的HTML
 * outerHTML 设置或获取对象及其内容的HTML形式
 * 
 * 例如：
    <body>
		<p>你好</p>
		<div id="test"><h5>就是喜欢你</h5></div>
		<script type="text/javascript">
			var ih=document.getElementById("test").innerHTML;
            console.log(ih);    // <h5>就是喜欢你</h5>
            
            var oh=document.getElementById("test").outerHTML;
            console.log(oh);    // <div id="test"><h5>就是喜欢你</h5></div>
		</script> 
    </body>
*/
console.log('innerHTML:'+test1.innerHTML);
console.log('outerHTML:'+test1.outerHTML);
console.log('innerText:'+test1.innerText);
console.log('outerText:'+test1.outerText);

// test1.outerHTML = '<div>hello outerHTML</div>';

/**
 * innerText 和 outerText 的区别
 * 返回值差不多，但是赋值是有区别的
 * innerText赋值，是直接在对应的dom中添加对应的html内容
 * outerText赋值，是直接将对应的dom替换成文本
 */
document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        const dom_inner = document.getElementById('innerText');
        dom_inner.innerText = '<div>innerText</div>';
        const dom_outer = document.getElementById('outerText');
        dom_outer.outerText = '<div>outerText</div>';
    }
}

/**
 * 窗口坐标：getBoundingClientRect
 * https://zh.javascript.info/coordinates
 * 
 * 窗口的坐标是从窗口的左上角开始计算的
 * elem.getBoundingClientRect() 方法返回一个 elem 的窗口坐标对象，这个对象有以下这些属性：
    top — 元素顶部边缘的 Y 坐标
    left — 元素左边边缘的 X 坐标
    right — 元素右边边缘的 X 坐标
    bottom — 元素底部边缘的 Y 坐标

    换句话说，当我们滚动这个页面，这个元素就会上升或者下降，它的窗口坐标改变了（top,left,right,bottom都会发生改变）
    
    这里额外说明以下：
    (1)坐标可以是十进制的分数。这很正常，浏览器内部也是使用十进制分数来计算坐标。
        当设置元素的 style.position.left/top 时我们不需要舍入它们，浏览器可以支持十进制分数。
    (2)坐标也可以是负数的。
        例如当我们滚动页面向下在 elem 的顶部超过窗口的时候，这时候我们调用 elem.getBoundingClientRect().top 返回的就是负数。
    (3)一些浏览器（像 Chrome）还会在 getBoundingClientRect 的返回中增加 width 和 height 属性。
        如果没有的话，我们可以通过减法计算 height=bottom-top，width=right-left 来得到这两个属性
*/

/**
 * 原生js设置元素样式
 */
const dom = document.getElementById('styleDiv');
dom.style.cssText = 'color: red';
dom.style.fontSize = '15px';

/**
 * getElement* 和 querySelector*
 * https://zh.javascript.info/searching-elements-dom
 * 
 * (1)document.getElementById
 * (2)elem.getElementsByTagName(tag)    在ele下用给定的标签来查找元素，并返回它们的集合。tag 参数也可以是“任何标签”的 "*"
 * (3)elem.getElementsByClassName(className)    返回具有给定 CSS 类的元素
 * (4)document.getElementsByName(name)          返回具有给定 name 属性的元素，文档范围。因为历史原因而很少使用。在这里提出，只是考虑到了完整性。
 * 
 * (1)elem.querySelectorAll(css)        返回与给定 CSS 选择器匹配 elem 中的所有元素
 * (2)elem.querySelector(css)           返回给定 CSS 选择器的第一个元素
 */

/**
 * matches
 * https://zh.javascript.info/searching-elements-dom
 * 语法：elem.matches(css)
 * 它只会检查 elem 是否匹配给定的 CSS 选择器，它返回 true 或者 false。
 * 使用场景：当我们迭代元素（例如数组或者一些其他内容）并试图过滤那些我们感兴趣的元素时，这个方法会很方便。

    <a href="http://example.com/file.zip">...</a>
    <a href="http://ya.ru">...</a>

    <script>
        // 不一定是 document.body.children，也可以是任何集合
        for (let elem of document.body.children) {
            if (elem.matches('a[href$="zip"]')) {
                alert("The archive reference: " + elem.href );
            } 
        }
    </script>
 */

/**
 * closest
 * elem.closest(css) 方法会查找与 CSS 选择器匹配的最接近的祖先。elem 自己也会被搜索。
 * 例如：
 *  <h1>Contents</h1>
    <div class="contents">
        <ul class="book">
            <li class="chapter">Chapter 1</li>
            <li class="chapter">Chapter 1</li>
        </ul>
    </div>

    <script>
        let chapter = document.querySelector('.chapter'); // LI
        alert(chapter.closest('.book')); // UL
        alert(chapter.closest('.contents')); // DIV
        alert(chapter.closest('h1')); // null（因为 h1 不是祖先）
    </script>
 */

/**
 * 除了closest，contains也可以检测父子元素关系
 * 如果 elemB 在 elemA（elemA 的后代）中或者当 elemA==elemB 时 elemA.contains(elemB) 将返回 true。
 */

/**
 * getElementsBy*和querySelectorAll的区别
 * 
 * 所有的 "getElementsBy*" 方法都会返回 live 集合。这类集合总是可以反映出文档的当前状态而且在文档变化时，可以自动更新。
 * querySelectorAll 会返回一个static集合。就像一个固定的元素数字。
 * 
   getElementsBy* 的例子：
        <div>First div</div>
        
        <script>
            let divs = document.getElementsByTagName('div');
            console.log(divs.length); // 1
        </script>

        <div>Second div</div>

        <script>
            console.log(divs.length); // 2  这里会实时更新变量的值
        </script>

    querySelectorAll的例子：
        <div>First div</div>

        <script>
            let divs = document.querySelectorAll('div');
            console.log(divs.length); // 1
        </script>

        <div>Second div</div>

        <script>
            console.log(divs.length); // 1 无论访问顺序，一开始定下来的值，是不会再改变的
        </script>
 */