/**
 * 元素的尺寸与滚动
 */

/**
 * offsetParent, offsetLeft/Top
 * https://zh.javascript.info/size-and-scroll
 * 
 * 我们可以使用 offsetParent 来获得最近的 CSS 定位祖先
 * offsetLeft/offsetTop 提供相对于元素左上角的 x/y 坐标,
 * 参照的目标是offsetParent（最近的祖元素，它的属性为position:relative）
 */
const child = document.getElementById('child');
console.log(child.offsetTop);   // 200px
console.log(child.offsetLeft);  // 200px
console.log(child.offsetParent);    
/**
 * <div id='parent'>
        <div id='child'>content</div>
    </div>
 */ 

/**
 * 一下存在几种情况，offsetParent的值为null
 * (1)未显示的元素（display:none 或者不在文档中）
 * (2)<body>和<html>
 * (3)position:fixed元素
 */

/**
 * offsetWidth/Height
 * 提供目标元素的'外部'宽度/高度，也就是说，宽高包括了边框,还有滚动条宽度也会算进去。
 * dom.offsetWidth = 内容真实宽度 + border宽度 + padding
 */
console.log(`child宽度 ${child.offsetWidth}`);

/**
 * 未显示的几何元素的属性值为 0/null
 * 
 * 如果元素（或其任何祖先）在文档中显示为 display:none 或本身不在文档中，则所有几何属性都是 0 或者值为 null，这取决于它是什么。
 * 例如，offsetParent 为 null，并且 offsetWidth，offsetHeight 为 0
 * 我们可以用它来检查一个元素是否被隐藏
 */
function isHidden(ele) {
    return !ele.offsetWidth && !ele.offsetHeight;
}

/**
 * clientTop/Left
 * 
 * 我们一般理解的话会任务clientLeft、clientTop是border宽度，但其实也不是。
 * 它是目标元素的内侧和外侧的相对坐标。
 * 当文档是从右向左渲染时就会显现出来，此时滚动条不在右边，而是在左边。而clientLeft则包含了滚动条的宽度
 * 也就是：dom.clientLeft = border宽度 + 滚动条宽度(一般情况下宽度为16)
 */
console.log(`child元素的clientLeft属性值：${child.clientLeft}`);
console.log(`child元素的clientTop属性值：${child.clientTop}`);

/**
 * clientWidth/Height
 * 
 * 提供目标对象的内容宽度和内填充宽度，但是不包括滚动条宽度
 * dom.clientWidth = content宽度 + padding宽度
 */

/**
 * scrollWidth/Height
 * 
 * 提供目标的可见部分，其中包括了滚动条隐藏部分
 * dom.scrollWidth = 内容可见区域（包括滚动条肉眼看不到的内容）
 */

/**
 * scrollLeft/Top
 * 
 * 代表的是scroll滚动了多少的意思。
 * 大多数几何属性是只读的，但是scrollLeft/scrollTop 可以改变，浏览器将会直接滚动元素
 * 
 * 例如：dom.scrollTop = 500;   那么这个元素会向下滚动的
 */

/**
 * 不要从css中获取宽高
 * 
 * 为什么不像这样读取一个元素的高度呢？而是使用几何属性来获取元素的宽高等呢？
 * 例如：getComputedStyle(document.body).width
 * 
 * (1) 首先，CSS 宽度/高度取决于另一个属性：box-sizing，它定义了 “什么是” CSS 宽度和高度。
 *      用作 CSS 样式的 box-sizing 的更改可能会破坏这样的 JavaScript 定义
 * (2) 其次，CSS 的 width/height 可能是 auto，例如内联元素
 *      <span id="elem">Hello!</span>

        <script>
            alert( getComputedStyle(elem).width ); // auto
        </script>
    (3) 滚动条。有时，没有滚动条的代码工作得很好，因为它在一些浏览器中占据了内容的一部分空间。
        因此，内容的实际宽度比 CSS 宽度要小。而 clientWidth/clientHeight 考虑到这一点。
        但是，getComputedStyle(elem).width 的情况是不同的。一些浏览器（例如 Chrome）返回真正的内部宽度，
        这种情况不考虑滚动条，以及其中一些（例如Firefox）— CSS 宽度（忽略滚动条
 */
