/** 
 * https://mp.weixin.qq.com/s/DlUJq0JJzHjnPwCI_SAI5Q
 * 
 * call,apply,bind的理解
 */

/** 
 * - call,apply,bind的基本介绍
 * 
 * 语法：
 *      fun.call(thisArg, param1, param2, ...)
 *      fun.apply(thisArg, [param1,param2,...])
 *      fun.bind(thisArg, param1, param2, ...)
 * 
 * 返回值：
 *      call/apply：fun执行的结果
 *      bind：返回fun的拷贝，并拥有指定的this值和初始参数
 * 
 * 参数：
 *      (1)fun的this指向thisArg对象
 *      (2)非严格模式下：thisArg指定为null，undefined，fun中的this指向window对象
 *      (3)严格模式下：fun的this为undefined
 *      (4)值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象，如 String、Number、Boolean
 * 
 * 调用call/apply/bind的必须是个函数：
 *      call、apply和bind是挂在Function对象上的三个方法,只有函数才有这些方法
 *      
 *      只要是函数就可以，比如: Object.prototype.toString就是个函数，我们经常看到这样的用法：Object.prototype.toString.call(data)
 * 
 * 作用：
 *      改变函数执行时的this指向，目前所有关于它们的运用，都是基于这一点来进行的
 * 
 * 如何不弄混call和apply:
 *      apply是以a开头，它传给fun的参数是Array，也是以a开头的。
 */

/** 
 * - 核心理念
 * 
 * A对象有个方法，B对象因为某种原因也需要用到同样的方法，那么这时候我们是单独为 B 对象扩展一个方法呢，还是借用一下 A 对象的方法呢？
 * 
 * 当然是借用 A 对象的方法啦，既达到了目的，又节省了内存。
 * 
 * 这就是call/apply/bind的核心理念：借用方法。
 * 
 * 借助已实现的方法，改变方法中数据的this指向，减少重复代码，节省内存。
 */

/** 
 * - call和apply的应用场景
 * 
 * (1) 判断数据类型
 *      Object.prototype.toString.call(data)
 * 
 * (2) 类数组借用数组的方法
 *      类数组因为不是真正的数组所有没有数组类型上自带的种种方法，所以我们需要去借用数组的方法。
 * 
 *      var arrayLike = {
            0: 'OB',
            1: 'Koro1',
            length: 2
        }
        Array.prototype.push.call(arrayLike, '添加元素1', '添加元素2');
        console.log(arrayLike) // {"0":"OB","1":"Koro1","2":"添加元素1","3":"添加元素2","length":4}
 * 
 * (3) apply获取数组最大值最小值
 *      apply直接传递数组做要调用方法的参数，也省一步展开数组，比如使用Math.max、Math.min来获取数组的最大值/最小值:
 * 
 * (4) 继承
 *      ES5的继承也都是通过借用父类的构造方法来实现父类方法/属性的继承
 * 
 *      // 父类
        function supFather(name) {
            this.name = name;
            this.colors = ['red', 'blue', 'green']; // 复杂类型
        }

        supFather.prototype.sayName = function (age) {
            console.log(this.name, 'age');
        };

        // 子类
        function sub(name, age) {
            // 借用父类的方法：修改它的this指向,赋值父类的构造函数里面方法、属性到子类上
            supFather.call(this, name);
            this.age = age;
        }
 */     

/** 
 * - bind的应用场景
 * 
 * (1) 保存函数参数
 */
for (var i = 1; i <= 5; i++) {
    setTimeout(function test() {
         console.log(i) // 依次输出：6 6 6 6 6
     }, i * 1000);
}
// 造成这个现象的原因是等到setTimeout异步执行时,i已经变成6了

// 解决方法1：闭包, 保存变量
for (var i = 1; i <= 5; i++) {
    (function (i) {
        setTimeout(function () {
            console.log('闭包:', i); // 依次输出：1 2 3 4 5
        }, i * 1000);
    }(i));
}

// 解决方法2：bind
for (var i = 1; i <= 5; i++) {
    // 缓存参数
    setTimeout(function (i) {
        console.log('bind', i) // 依次输出：1 2 3 4 5
    }.bind(null, i), i * 1000);
}
/** 
 * 实际上这里也用了闭包，我们知道bind会返回一个函数，这个函数也是闭包。
 * 它保存了函数的this指向、初始参数，每次i的变更都会被bind的闭包存起来，所以输出1-5
 */


 