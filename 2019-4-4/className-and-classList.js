document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        /**
         * 样式和类
         * className and classList
         */
        const target = document.getElementById('className-classList');
        console.log(target.className);  // className-classList kisure demo test
        console.log(target.classList);  
        /** 
            [
                0: "className-classList"
                1: "kisure"
                2: "demo"
                3: "test"
                length: 4
                value: "className-classList kisure demo test"
            ]
        */ 

       /**
        * 我们既可以使用 className 对完整的类字符串进行操作，也可以使用使用 classList 对单个类进行操作
        * 
        * 针对于classList，它是一个特殊的对象，拥有 add/remove/toggle 的类方法。
        * elem.classList.add/remove("class") —— 添加/移除类。
        * elem.classList.toggle("class") —— 如果类存在就移除，否则添加。
        * elem.classList.contains("class") —— 返回 true/false，检查给定类。
        */

        /**
         * dom.style style属性是一个对象，它对应于 "style" 特性中所写的内容。
         */

        /**
         * 重置样式属性
         * 有时我们想要分配一个样式属性，然后移除它。
         * 例如，为了隐藏一个元素，我们可以设置 elem.style.display = "none"。
         * 
         * 我们可能要移除 style.display，就像它没有被设置一样。
         * 这里不应该使用 delete elem.style.display，而应该使用 elem.style.display = "" 将其赋值为空。
         */

        /**
         * 需要注意的是，dom.style返回的是一个字符串，我们不能通过div.style来直接设置样式
         * 因为 div.style 是一个对象，而且它是只读的。
         * 如果想以字符串的形式设置样式，可以使用特殊属性style.cssText
         * 不过，我们很少使用style.cssText，因为这样的赋值会删除所有现有样式：它不会添加，而是替换它们。偶尔会移出所需的东西。
         * 但是当我们知道我们不移出一些重要的内容时，仍然可以对新元素进行处理。
         * 通过设置属性：div.setAttribute('style', 'color: red...') 也可以实现同样的目的。
         */

        /**
         * 我们使用ele.style访问的只是对元素的style属性进行读取操作，而不是任何css级联。
         * 我们可以使用getComputedStyle(element[, pseudo])进行读取目标元素的所有样式值。
         * 
         * element：用来读取样式值的的元素
         * pseudo：假如给定一个伪元素，例如：::before
         */
        const target_compoted = document.getElementById('className-classList');
        const value = getComputedStyle(target_compoted);
        console.log(value.color);
        console.log(value.fontSize);
        console.log(value.fontFamily);

        
    }
}
