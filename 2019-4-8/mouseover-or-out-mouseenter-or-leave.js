/** 
 * 移动：mouseover/out，mousemove ，mouseenter/leave
 * 
 * (1) Mouseover/mouseout
 * https://zh.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave
 * 
 * 当鼠标指针出现在一个元素上时，mouseover 事件就会发生，而 mouseout 事件则发生在鼠标指针离开时。
 * 这些事件很特别，因为它们有 relatedTarget
 * 
 * mouseover：
 * event.target —— 是鼠标经过的那个元素。
 * event.relatedTarget —— 是鼠标上一次经过的元素。
 * 
 * mouseout：
 * event.target —— 是鼠标离开的元素。
 * event.relatedTarget —— 是当前指针位置下的（鼠标进入的）元素。
 * 
 * relatedTarget 可以为 null
 * 这很正常，而且意味着鼠标不是来源于另一个元素，而是窗口以外。或者是离开了窗口。
 */
const target = document.getElementById('box');
target.onmouseover = target.onmouseout = handle;

function str(el) {
    if (!el) {
        return 'null';
    }

    return el.className || el.tagName;
}

function handle(event) {
    console.log(`当前事件类型：${event.type}，目标对象：${str(event.target)}，relatedTarget：${str(event.relatedTarget)}`);
    console.log(`----------------------分割线-------------------------`);
}

/**
 * 事件频率
 * 当有鼠标移动时，mousemove 事件就会被触发。但是这不意味着每个像素都会产生一个事件。
 * 浏览器会一直检查鼠标的位置。如果它注意到鼠标变化了，那么就会触发相应的事件。
 * 这意味着如果访问者非常快地移动鼠标，那么 DOM 元素就会被跳过。
 * 
 * 例如：鼠标从#FORM -> DIV -> DIV -> DIV -> #TO之间移动
 * 如果鼠标从上面的 #FROM 到 #TO 元素移动地非常快，那么中间的 <div>（或其中的一些）可能会被跳过。
 * mouseout 事件可能会在 #FROM 上被触发，然后立即在 #TO 上触发 mouseover。
 */

/** 
 * 进入子元素时的“额外” mouseout
 * 鼠标指针进入一个元素。mouseover 被触发。然后光标进入一个子元素,mouseout 会再次被触发。
*/
const target_two = document.getElementById('container-two');
target_two.onmouseover = target_two.onmouseout = target_two.onmouseenter = target_two.onmouseleave = mouselog;

function mouselog(event) {
    console.log(`当前事件类型：${event.type},目标对象：${str(event.target)}`);
}

/**
 * Mouseenter 和 mouseleave 事件
 * mouseenter/mouseleave 事件类似于 mouseover/mouseout。当鼠标指针移入/移出元素时，它们也会被触发。
 * 
 *  但有两个不同之处：
        (1)元素内部的转换不会有影响。
        (2)mouseenter/mouseleave 事件不会冒泡。

    当指针进入一个元素时 —— mouseenter 被触发，而它在元素内部的去向并不重要。只有当鼠标光标离开时，mouseleave 事件才会被触发。
    mouseenter/leave 事件非常简单，也非常容易使用。但它们不会冒泡。因此我们不能用它们来进行事件委托。
 */


/** 
 * 总结：
 * 鼠标的快速移动可以使 mouseover, mousemove, mouseout 跳过一些中间元素。
    mouseover/out 事件和 mouseenter/leave 事件有一个额外的目标：relatedTarget。这是作为起点/终点的元素，是对 target 的补充。
    即使从父元素转到子元素时，mouseover/out 也会被触发。它们假设鼠标一次只会移入一个元素 —— 最深的那个。
    mouseenter/leave 事件不会冒泡，而且当鼠标进入子元素时也不会被触发。它们只关注鼠标在整个元素的内部还是外部。

    mouseover/out和mouseenter/leave的执行顺序：
    mouseover -> mouseenter -> mouseout -> mouseleave
 */

