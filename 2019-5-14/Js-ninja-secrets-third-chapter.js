/** 
 * js中最关键的概念是：函数是第一类对象（first-classobjects），或者说它们被称作一等公民（first-class citizens）。
 *     函数与对象共存，函数也可以被视为其他任意类型的JavaScript对象
 * 
 * 函数也是对象，唯一的特殊之处在于它是可调用的（invokable），即函数会被调用以便执行某项动作。
 * 第一类对象的特点之一是，它能够作为参数传入函数。
 */

/** 
 * 函数拥有对象的所有能力
 * 函数和那些更普通的JavaScript数据类型一样，它能被变量引用，能以字面量形式声明，甚至能被作为函数参数进行传递。
 * 
 * (1)通过字面量创建：
 *      function ninjaFunction() {}
 * (2)赋值给变量，数组项或其他对象的属性：
 *      var ninjaFunction = function() {};
 *      ninjaArray.push（function（）{}）;
 *      ninja.data = function（）{};
 * (3)作为函数的参数来传递
 *      function call（ninjaFunction）{
 *          ninjaFunction();
 *      }
 * (4)作为函数的返回值
 *      function returnNewNinjaFunction（） {
 *          return function（）{}; ⇽--- 返回一个新函数
 *      }
 */

/** 
 * 存储函数
 * 
 * 在add函数内，我们首先检查该函数是否已经存在id属性。如果当
 * 前的函数已经有id属性，我们则假设该函数已经被处理过了，从而忽略
 * 该函数，否则为该函数分配一个id（同时增加nextId）属性，并将该函
 * 数作为一个属性增加到cache上，id作为属性名。
 */
const store = {
    nextId: 1,
    cache: {},
    add: function() {
        if (!fn.id) {
            fn.id = this.nextId++;
            this.cache[fn.id] = fn;
            return true;
        }
    }
};

/** 
 * JavaScript提供了几种定义函数的方式，可以分为4类：
 * (1)  函数声明 和 函数表达式
 * (2)  箭头函数
 * (3)  函数构造函数
 * (4)  生成器函数
 *      ES6新增功能，能让我们创建不同于普通函数的函数，
 *      在应用程序执行过程中，这种函数能够退出再重新进入，
 *      在这些再进入之间保留函数内变量的值。我们可以定义生成器版本的函数声明、函数表达式、函数构造函数。
 * 
 *      例如：function* myGen(){ yield 1; }
 */

/** 
 * 回调函数在哪种情况下会同步调用，或者异步调用呢？
 * 箭头函数和函数表达式的区别是什么？
 * 你为什么需要在函数中使用默认参数？
 */
