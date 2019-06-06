/**
 * Query Selector
 * 
 * 常用的 class、id、属性 选择器都可以使用 document.querySelector 或 document.querySelectorAll 替代。
 * (1) document.querySelector 返回第一个匹配的 Element。
 * (2) document.querySelectorAll 返回所有匹配的 Element 组成的 NodeList。
 *      它可以通过 [].slice.call() 把它转成 Array
 * (3) 如果匹配不到任何 Element，jQuery 返回空数组 []，但 document.querySelector 返回 null，注意空指针异常。
 *      当找不到时，也可以使用 || 设置默认的值，如 document.querySelectorAll(selector) || []
 * 
 * 注意：document.querySelector 和 document.querySelectorAll 性能很差。
 * 如果想提高性能，尽量使用 document.getElementById、document.getElementsByClassName 或 document.getElementsByTagName。
 * 
    属性查询：
    // jQuery
    $('a[target=_blank]');

    // Native
    document.querySelectorAll('a[target=_blank]');

    后代查询：
    // jQuery
    $el.find('li');

    // Native
    el.querySelectorAll('li');

    兄弟及上下元素：
        (1) 兄弟元素
            // jQuery
            $el.siblings();

            // Native - latest, Edge13+
            [...el.parentNode.children].filter((child) =>
                child !== el
            );

            // Native (alternative) - latest, Edge13+
            Array.from(el.parentNode.children).filter((child) =>
                child !== el
            );

            // Native - IE10+
            Array.prototype.filter.call(el.parentNode.children, (child) =>
                child !== el
            );

        (2) 上一个元素
            // jQuery
            $el.prev();

            // Native
            el.previousElementSibling;

        (3) 下一个元素
            // next
            $el.next();

            // Native
            el.nextElementSibling;

    Closest 获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。
        // jQuery
        $el.closest(queryString);

        // Native - Only latest, NO IE
        el.closest(selector);

        // Native - IE10+
        function closest(el, selector) {
            const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

            while (el) {
                if (matchesSelector.call(el, selector)) {
                return el;
                } else {
                el = el.parentElement;
                }
            }
            return null;
        }

    
 */
