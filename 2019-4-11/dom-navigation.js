/**
 * 遍历 DOM
 * https://zh.javascript.info/dom-navigation
 * 
 * DOM 让我们可以对元素和它们其中的内容做任何事，但是首先我们需要获取到对应的 DOM 对象，
 * 把这个对象赋予一个变量，然后我们才能修改这个对象。
 * 对 DOM 的所有操作都是从 document 对象开始的。从这个对象我们可以到达任何节点。
 */

/**
 * 在最顶上的：documentElement 和 body
 * 
 * 最上面的树节点可以直接通过 document 属性来使用
 * <html> = document.documentElement
 * 最上面的 document 节点是 document.documentElement。这是对应 <html> 标签的 DOM 节点
 * 
 * <body> = document.body
 * 另一个被广泛使用的 DOM 节点是 <body> 元素 — document.body。
 * 
 * <head> = document.head
 * <head> 标签可以通过 document.head 访问
 */

/**
 * 这里有个问题：document.body 的值可能是 null
 * 
 * 如果一个脚本是在 <head> 标签中，那么脚本中是访问不到 document.body 元素的，因为浏览器还没有读到其中的内容。
 * 
 *  <html>
        <head>
            <script>
                console.log( "From HEAD: " + document.body ); // null
            </script>
        </head>
        <body>
            <script>
                console.log( "From BODY: " + document.body ); // HTMLBodyElement
            </script>
        </body>
    </html>
 */

/**
 * 子元素：childNodes, firstChild, lastChild
 * 
 * 子节点   —— 对应的是直系的子元素。换句话说它们会完全嵌套在指定的一个元素中。
 *          举个例子，<head> 和 <body> 就是 <html> 元素的子元素。
 * 
 * 子系元素 —— 对应的是所有嵌套在一个指定元素中的元素，包括这些元素的子元素，以此类推得到的所有元素。
 * 
 * childNodes 集合提供了对所有子节点包括其中文本节点的访问
 * firstChild 和 lastChild 属性是访问第一个和最后一个子元素的快捷方式
 */

 console.log(document.body.childNodes); // NodeList(11) [text, form, text, form#form, text, text, div#content-box, text, script, text, script]
 console.log(document.body.firstChild);
 console.log(document.body.lastChild);

/**
 * document.body.childNodes返回的是一个DOM的集合
 * 
 * (1)DOM集合是只读的
 * 我们不能通过类似 childNodes[i] = ... 的操作来替换一个子节点
 * 
 * (2)DOM 集合是实时的
 * 除小部分例外之外几乎所有的 DOM 集合都是实时的。换句话说，它们都反映的是 DOM 的实时状态。
 * 如果我们保留一个对 elem.childNodes 的引用，然后在 DOM 中添加/移除节点，那么这些新加的节点就会自动出现在这个集合中。
 * 
 * (3)不要使用 for...in 来循环遍历集合，应该使用 for...of
 * for...in 循环遍历的是所有列举的属性，会把集合对应的方法也会遍历出来
 */

/**
 * 兄弟节点和父节点
 * 
 * const childNodes = document.body.childNodes;
 * const dom = childNodes.Form;
 * 
 * dom.previousElementSibling   兄弟元素(上一个)
 * dom.nextElementSibling       兄弟元素(下一个)
 * dom.parentElement            父元素
 * dom.children                 只获取类型为元素节点的子节点
 * 
 * (1) 为什么是 parentElement? 父节点可以不是一个元素吗？
 *      parentElement 属性返回的是“元素”父节点，而 parentNode 返回的是“任何类型”的父节点。
 *      这些属性通常来说是一样的：它们都获取父节点。
 * 
 *      除了有一个例外就是 document.documentElement:
 *          console.log(document.documentElement.parentNode)        // document
 *          console.log(document.documentElement.parentElement)     // null
 * 
 *      出现的原因：
 *          documentElement（对应 <html> 标签）是根节点。形式上来讲，它有 document 作为它的父节点。
 *          但是 document 并不是一个元素节点，所以 parentNode 返回了 document 而 parentElement 却没有。
 *          有时候，当我们要遍历父节点并且在每个遍历的节点调用方法时这很重要，
 *          但是 document 并没有父元素节点，所以我们要将它排除在外。
 */

/**
 * (1)<table> 元素支持 (除了上面给出的之外) 以下这些属性:
        table.rows — 用于表示表中 <tr> 元素的集合。
        table.caption/tHead/tFoot — 用于访问元素 <caption>、<thead>、<tfoot>。
        table.tBodies — <tbody> 元素的集合（根据标准该元素数量可以很多）。

    (2)<thead>、<tfoot>、<tbody> 元素提供了 rows 属性
        tbody.rows — 表内部 <tr> 元素的集合。

    (3)<tr>:
        tr.cells — 在给定 <tr> 元素下 <td> 和 <th> 单元格的集合
        tr.sectionRowIndex — 在封闭的 <thead>/<tbody> 中 <tr> 的编号。
        tr.rowIndex — 在表中 <tr> 元素的编号
 */
const table = document.body.children['table_kisure'];
console.log(table.rows);    // 返回table中所有的tr
const tbody = table.tBodies[0];
console.log(tbody.rows);    // 返回的是tbody中所有的tr
const tr = tbody.firstElementChild;
console.log(tr.cells);      // 返回的是tr中所有的td
console.log(tr.rowIndex);   // 返回的是table中所有tr中的index
console.log(tr.sectionRowIndex);    // 返回的是封闭的<thead>/<tbody> 中 <tr> 的编号

/**
 * 总结：
 * 对于所有的节点：parentNode、childNodes、firstChild、lastChild、previousSibling 和 nextSibling
 * 仅用于元素节点：parentElement、children、firstElementChild、lastElementChild、previousElementSibling 和 nextElementSibling
 * 某些类型的 DOM 元素，比如说像 tables，提供了额外的属性和集合用于访问其内容。
 */