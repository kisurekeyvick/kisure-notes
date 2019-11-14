/**
 * https://mp.weixin.qq.com/s/O1OE07Av4HWlqoAzbgAXyw
 * 
 * 子元素数量和遍历子元素
 */

/**
 * (1) 如何得到一个子元素的数量？
 * 
 * 有基本 DOM API 常识的前端程序员可能第一时间想到 element.childNodes.length 。
 * 不过 childNodes 既包含元素节点也包含文本节点，所以你还需要遍历过滤，不太符合要求。
 * 
 * 两个符合要求的API：
 * - element.children.length
 * - element.childElementCount
 */

/**
 * 那么问题来了，为什么同一件事情需要两个API呢？
 * 跟 childElementCount 一起的 Element Traversal API还有一堆其他接口，包括 firstElementChild 、 lastElementChild 、 
 * previousElementSibling 、nextElementSibling 。这些接口是否多余的呢？在实践中和 children 相比，孰优孰劣？
 * 
 * 首先我们可以发现 previousElementSibling, nextElementSibling 并不是多余的，因为 children 接口做不到同样的事情。
 * 
 * 其次 firstElementChild, lastElementChild 虽然等价于 children[0] 和 children[children.length - 1] ，
 * 但是前者避免了先生成一个 children 对象，所以是更直接且性能更好的接口（尤其是对 lastElementChild 来说）。
 */
const ele = document.querySelector('.div');
for (let i = 0; i < ele.children.length; i++) {
    dosth(ele.children[i]);
}

for (let child = ele.firstElementChild; child != null; child = child.nextElementSibling) {
    dosth(child);
}

function dosth() {}

