// https://zh.javascript.info/dom-attributes-and-properties

function getDomId() {
    const dom = document.getElementsByTagName('div')[0];
    const domId = dom.id;   // 获取元素id
    const tagName = dom.tagName;    // 获取元素标签名
    console.log(domId);
}

document.onreadystatechange = function() {
    if(document.readyState=="complete") {
        getDomId();
    }
}

/**
 * 如果一个特性不是标准化的，DOM 属性就不存在这个特性,于是我们可以通过以下几个方法是针对元素特性的操作：
 *  elem.hasAttribute(name) —— 检验是否拥这个特性。
    elem.getAttribute(name) —— 获取到这个特性值。
    elem.setAttribute(name, value) —— 设置这个特性值。
    elem.removeAttribute(name) —— 移除这个特性。
 */

/**
 * 我们可以通过 elem.attributes 读取到该元素的所有特性：这些特性都被一个名为 Attr 的内置类以 name 和 value 这样的键-值对收集起来。
 */

/**
    <body>
        <div id="elem" about="Elephant"></div>

        <script>
            alert( elem.getAttribute('About') ); // (1) 'Elephant', reading

            elem.setAttribute('Test', 123); // (2), writing

            alert( elem.outerHTML ); // (3), see it's there

            for (let attr of elem.attributes) { // (4) list all
            alert( `${attr.name} = ${attr.value}` );
            }
        </script>
    </body>

    注意点：
    getAttribute('About') —— 这里的第一个字母是大写的，但是在 HTML 里是全小写表示。这也就说明：特性的键名是大小写不敏感的。
    我们可以赋予它任何值，这里我们把 "123" 作为它的值。
    所有 attributes 都有一个 outerHTML 给我们设置它在页面上的展示内容。
    attributes 以 name 和 value 这样的键—值对收集在一个可迭代对象里。
 */

/** 
 * 属性—特性的同步
 * 当一个标准化的特性被改变，相应的属性随之改变（有极个别除外），反之亦然。
 * 
 * 例如：
    <input>
    <script>
        let input = document.querySelector('input');

        // 特性 => 属性
        input.setAttribute('id', 'id');
        alert(input.id); // id（更新了）

        // 属性 => 特性
        input.id = 'newId';
        alert(input.getAttribute('id')); // newId（更新了）
    </script>

    特例(input.value 只能从特性同步到属性，反过来则不行)：

    let input = document.querySelector('input');

    // 特性 => 属性
    input.setAttribute('value', 'text');
    alert(input.value); // text

    // 这操作无效 属性 => 特性
    input.value = 'newValue';
    alert(input.getAttribute('value')); // text（没有更新！）
*/

/**
 * DOM 属性的类型:
 * DOM 并不总是字符串。例如 input.checked 属性（多选框）是一个布尔类型的值
 * style 特性值是一个字符串，但 style 属性是一个对象
 * 
 * DOM 属性的字符串可能跟特性值的字符串所表示的不是同一个东西
 * 例如：href DOM 属性总是一个绝对路径的，而特性值只包含相对路径或者只包含 #hash 这一部分
    <a id="a" href="#hello">link</a>
    <script>
        // 特性
        alert(a.getAttribute('href')); // #hello

        // 属性
        alert(a.href ); // 绝对路径 http://site.com/page#hello
    </script>
 */

/** 
 * 非标准化的特性，dataset
 * 当我们编写 HTML，会用到很多标准特性。但是哪些是标准化的哪些不是，怎么区分它们？首先，看看它们是否起作用？
 * 
 * 有时候非标准化特性常常用于在 HTML 中定义一些 JavaScript 数据，或者是给 HTML 元素打上“标记”
*/