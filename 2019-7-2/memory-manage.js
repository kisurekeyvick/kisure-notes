/** 
 * https://github.com/qq449245884/xiaozhi/issues/3
 * 
 * JavaScript如何工作:内存管理+如何处理4个常见的内存泄漏
 */

/** 
 * 概述
 * 
 * 而JavaScript在创建对象(对象、字符串等)时会为它们分配内存，不再使用对时会“自动”释放内存，这个过程称为垃圾收集。
 * 这种看“自动”似释放资源的的特性是造成混乱的根源，因为这给JavaScript(和其他高级语言)开发人员带来一种错觉，
 * 以为他们可以不关心内存管理的错误印象，这是想法一个大错误。
 */

/** 
 * 内存的生命周期
 * 
 * 这里简单介绍一下内存生命周期中的每一个阶段:
 * (1) 分配内存 —
 *      内存是由操作系统分配的，它允许您的程序使用它。
 * 
 * (2) 使用内存 — 
 *      这是程序实际使用之前分配的内存，在代码中使用分配的变量时，就会发生读和写操作。
 * 
 * (3) 释放内存 —
 *      释放所有不再使用的内存,使之成为自由内存,并可以被重利用。
 */

/** 
 * 动态分配
 * 
 * 在编译时,编译器不知道数组需要使用多少内存,因为这是由用户提供的值决定的。
 * 因此，它不能为堆栈上的变量分配空间。
 * 相反，我们的程序需要在运行时显式地向操作系统请求适当的空间,这个内存是从堆空间分配的。
 * 
 * 静态内存分配和动态内存分配的区别总结如下表所示:
 * 静态内存分配           VS    动态内存分配
 * 大小必须在编译时知道          大小不需要在编译时知道
 * 在编译时执行                 在运行时执行
 * 分配给堆栈                   分配给堆
 * FILO (先进后出)              没有特定的分配顺序
 */

/** 
 * 在JavaScript中分配内存
 * 
 * (1) JavaScript为让开发人员免于手动处理内存分配的责任——JavaScript自己进行内存分配同时声明值。
 *
 * (2) 某些函数调用也会导致对象的内存分配
 * 
 * (3) 方法可以分配新的值或对象
 */

/** 
 * 当内存不再需要时进行释放
 * 
 * 大多数的内存管理问题都出现在这个阶段,最困难的地方是确定何时不再需要分配的内存，它通常要求开发人员确定程序中哪些地方不再需要内存的并释放它。
 * 
 * 高级语言嵌入了一种称为垃圾收集器的机制，它的工作是跟踪内存分配和使用，
 * 以便发现任何时候一块不再需要已分配的内存。在这种情况下，它将自动释放这块内存。
 * 
 * 大多数垃圾收集器通过收集不再被访问的内存来工作，例如，指向它的所有变量都超出了作用域。
 * 但是，这是可以收集的内存空间集合的一个不足估计值，因为在内存位置的任何一点上，
 * 仍然可能有一个变量在作用域中指向它，但是它将永远不会被再次访问。
 */

/** 
 * 内存引用
 * 
 * 垃圾收集算法主要依赖的是引用。
 * 
 * 在内存管理上下文中，如果对象具有对另一个对象的访问权(可以是隐式的，也可以是显式的)，则称对象引用另一个对象。
 * 例如，JavaScript对象具有对其原型(隐式引用)和属性值(显式引用)的引用。
 * 
 * 在此上下文中，“对象”的概念被扩展到比常规JavaScript对象更广泛的范围，并且还包含函数范围(或全局词法作用域)。
 * 
 * 词法作用域定义了如何在嵌套函数中解析变量名:即使父函数已经返回，内部函数也包含父函数的作用。
 */

/**
 * 循环会产生问题（！！！！注意这个是老版本的浏览器才会出现这样的问题）
 *  
 * 当涉及到循环时,会有一个限制。在下面的示例中,创建了两个对象,两个对象互相引用,从而创建了一个循环。
 * 在函数调用之后将超出作用域,因此它们实际上是无用的,可以被释放。
 * 然而,引用计数算法认为,由于每个对象至少被引用一次,所以它们都不能被垃圾收集。
 * 
    function f() {
        const o1 = {};
        const o2 = {};
        o1.p = o2;          // o1,o2之间相互引用，创建了循环，就算是函数执行完成，也不会释放
        o2.p = o1;          // 这是因为，如果一个对象呗引用一次的话，他们是不能被垃圾收集的
    }

    f();
 */

/** 
 * 标记-清除(Mark-and-sweep)算法
 * 
 * 该算法能够判断出某个对象是否可以访问,从而知道该对象是否有用，该算法由以下步骤组成:
 * (1) 垃圾收集器构建一个“根”列表,用于保存引用的全局变量。
 *      在JavaScript中,“window”对象是一个可作为根节点的全局变量。
 * (2) 然后，算法检查所有根及其子节点，并将它们标记为活动的(这意味着它们不是垃圾)。任何根不能到达的地方都将被标记为垃圾。
 * (3) 最后，垃圾收集器释放所有未标记为活动的内存块，并将该内存返回给操作系统。
 * 
 * 循环不再是问题(!!!!!!!!!!!新版本的浏览器通过算法解决了循环引用的问题)：
 * 在上面的第一个例子中，在函数调用返回后，这两个对象不再被从全局对象中可访问的对象引用。因此，垃圾收集器将发现它们不可访问。
 */

/** 
 * 内存泄漏是什么?
 * 
 * 内存泄漏可以定义为:不再被应用程序所需要的内存,出于某种原因,它不会返回到操作系统或空闲内存池中。
 */

/**
 * 四种常见的内存泄漏：
 * (1) 全局变量
 *      JavaScript以一种有趣的方式处理未声明的变量：对于未声明的变量,会在全局范围中创建一个新的变量来对其进行引用。
 * 
 *      例如：
 *      function foo(arg) {
            bar = "some text";
        }

        等同于：

        function foo(arg) {
            window.bar = "some text";
        }

        如果bar在foo函数的作用域内对一个变量进行引用,却忘记使用var来声明它,那么将创建一个意想不到的全局变量。（非严格模式下）

        II: 创建一个意料之外的全局变量的另一种方法是使用this
            function foo() {
                this.var1 = "potential accidental global";
            }
            // Foo自己调用，它指向全局对象(window)，而不是未定义。
            foo();
 * 
 * (2) 被遗忘的定时器和回调
 *      以setInterval为例，因为它在JavaScript中经常使用
 * 
        var serverData = loadData();
        setInterval(function() {
            var renderer = document.getElementById('renderer');
            if(renderer) {
                renderer.innerHTML = JSON.stringify(serverData);
            }
        }, 5000); //每五秒会执行一次

        上面的代码片段演示了使用定时器时引用不再需要的节点或数据。

        renderer表示的对象可能会在未来的某个时间点被删除,从而导致内部处理程序中的一整块代码都变得不再需要。
        但是,由于定时器仍然是活动的,所以,处理程序不能被收集,并且其依赖项也无法被收集。
        这意味着,存储着大量数据的serverData也不能被收集。

        在过去，一些浏览器无法处理这些情况(很好的IE6)。幸运的是，现在大多数现代浏览器会为帮你完成这项工作:
        一旦观察到的对象变得不可访问，即使忘记删除侦听器，它们也会自动收集观察者处理程序。
        然而,我们还是应该在对象被处理之前显式地删除这些观察者。例如

        const ele = document.getElementById('launch-button');
        let counter = 0;
        function onClick(e) {
            counter ++;
            ele.innerHTML = 'text' + counter;
        }

        ele.addEventListener('click', onClick);
        // 做一些其他的事
        ele.removeEventListener('click', onClick);
        ele.parentNode.removeChild(ele);

        如今，现在的浏览器（包括IE和Edge）使用现代的垃圾回收算法，可以立即发现并处理这些循环引用。
        换句话说，在一个节点删除之前也不是必须要调用removeEventListener。
 * 
 * (3) 闭包
 *      闭包是javascript开发的一个关键方面，一个内部函数使用了外部（封闭）函数的变量。
 * 
 * (4) 脱离DOM的引用
 *      将DOM节点存储在数据结构中可能会很有用。
 *      假设你希望快速地更新表中的几行内容,那么你可以在一个字典或数组中保存每个DOM行的引用。
 *      这样,同一个DOM元素就存在两个引用:一个在DOM树中,另一个则在字典中。
 *      如果在将来的某个时候你决定删除这些行,那么你需要将这两个引用都设置为不可访问。
 * 
        const ele = {
            button:document.getElementById('button'),
            image:document.getElementById('image')
        };

        function doStuff() {
            ele.image.src = '.....';
        }

        function removeImage() {
            document.body.removeChild()
        }
 * 
 *      在引用 DOM 树中的内部节点或叶节点时，还需要考虑另外一个问题。如果在代码中保留对表单元格的引用(标记)，
 *      并决定从 DOM 中删除表，同时保留对该特定单元格的引用，那么可能会出现内存泄漏。
 * 
 *      垃圾收集器并不会将释放除该单元格之外的所有内容。
 *      因为单元格是表的一个子节点，而子节点保存对父节点的引用，所以对表单元格的这个引用将使整个表保持在内存中，
 *      所以在移除有被引用的节点时候要移除其子节点。
 * 
 *      例如：
 *      <table>
 *          <thead>
 *              ....
 *          </thead>
 *          <tbody>
 *              <tr>
 *                  <td id='kisure'></td>
 *                  <td></td>
 *                  <td></td>
 *              </tr>
 *          </tbody>
 *      </table>
 * 
 *      我们想要删除这个table，但是同时还要引用id为kisure的td单元格，那么会出现内存泄漏
 *      因为单元格是table的一个子节点，而子节点保存对父节点的引用，所以对表单元格的这个引用将使整个表保持在内存中。
 *      所以在移除有被引用的节点时候要移除其子节点。
 */