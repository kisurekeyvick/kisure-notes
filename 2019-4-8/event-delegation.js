/**
 * 事件委托
 * 事件委托就是利用冒泡的原理，把事件加到父元素或祖先元素上，触发执行效果
 */

// 该表有 9 个单元格，但可能有 99 个或者 9999 个单元,单击时高亮显示一个 <td> 单元格
const table = document.getElementsByTagName('table')[0];
table.onclick = function(event) {
    // 这一步target是因为，如果td里面存在其他的子元素，那么点击的时候需要寻找被点击元素的父元素
    // 这里用closest('td')进行查找离触发元素最近的td元素
    let target = event.target.closest('td');

    if (!target) {
        return;
    }

    if (!table.contains(target)) {
        return;
    }

    highLight(target);
}

let selectedTd;
function highLight(td) {
    if (selectedTd) {
        selectedTd.classList.remove('highlight');
    }

    selectedTd = td;
    selectedTd.classList.add('highlight');
}

/**
 * 总结：
 * 事件委托通常用于为许多相似的元素添加相同的处理，但不仅仅只是这样。
 * 
 * 算法：
        在容器上设置一个处理器。
        在处理器中 —— 检查源元素的 event.target。
        如果事件发生在我们感兴趣的元素中，那么处理该事件。

    好处：
        简化初始化并节省内存：不需要添加许多处理器。
        更少的代码：添加或移除元素时，不需要添加/移除处理器。
        DOM 修改 ：我们可以使用 innerHTML 等来大量添加/移除元素。

    委托处理方式也有局限性：
        首先，事件必须冒泡。而有些事件不会冒泡。此外，低级别的处理器不应该使用 event.stopPropagation()。
        其次，委托会增加 CPU 负载，因为容器等级的处理器对容器中任何位置的事件做出反应，不管它们是否会引起我们的兴趣。
        但是通常负载是可以忽略不计的，所以我们不考虑它。
*/

/** 
 * 目前不支持冒泡的事件有哪些呢？
 * blur、focus、load、unload 、以及自定义的事件。
 * 原因是在于：这些事件仅发生于自身上，而它的任何父节点上的事件都不会产生，所有不会冒泡。
 */
