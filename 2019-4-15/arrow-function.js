/**
 * 普通函数和箭头函数的区别
 */

/**
 * (2)箭头函数的this指向在定义的时候继承自外层第一个普通函数的this。
 *      箭头函数的this指向定义时所在的外层第一个普通函数，跟使用位置没有关系
 *      被继承的普通函数的this指向改变，箭头函数的this指向会跟着改变
 */
let a;
let barObj = { msg: 'bar的this指向'};
let fooObj = { msg: 'foo的this指向'};

bar.call(barObj);
foo.call(fooObj);

function foo() {
    a();
}

function bar() {
    a = () => {
        console.log(this, 'this指向定义的时候外层第一个普通函数');
    };
}

/**
 * (3)不能直接修改箭头函数的this指向
 *      很明显，call显示绑定this指向失败了，包括aaply、bind都一样
 */
let fnObj = { msg: '尝试直接修改箭头函数的this指向' };
function fooChange() {
    a.call(fnObj);   // 结果：{ msg: 'bar的this指向' }
}

/**
 * (4)箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)
 *    这里需要注意：严格模式在中途声明无效，必须在全局/函数的开头声明才会生效。
 *      例如：
            a = 1;
            'use strict'; // 严格模式无效 必须在一开始就声明严格模式
            b = 2; // 不报错
 */

/**
 * (5)箭头函数的this指向全局，使用arguments会报未声明的错误
 *    箭头函数的this指向普通函数时,它的argumens继承于该普通函数
 * 
 *  那么应该如何来获取箭头函数不定数量的参数呢？
 *  答案是：ES6的rest参数（...扩展符）
 */
let gbfunc = () => {
    console.log(arguments);
};
gbfunc(1,2,3,4);    // ReferenceError: arguments is not defined 引用错误，没有找到argument这个变量

/** 
 * rest参数的用法相对于arguments的优点
 *      ①箭头函数和普通函数都可以使用
 *      ②更加灵活，接收参数的数量完全自定义
 *      ③可读性更好，参数都是在函数括号中定义的
 *      ④rest是一个真正的数组，可以使用数组的API。因为arguments是一个类数组的对象
 * 
 *    使用rest的注意点：
 *      ①rest必须是函数的最后一位参数
 *          let a = (first, ...rest, three) => {}   // 这是错误的
 * 
 *      ②函数的length属性，不包括 rest 参数
 *          (function (...res) {}).lengtn         // 0
 *          (function(a, ...b) {}).length         // 1
*/

/**
 * (6)使用new调用箭头函数会报错
 *      无论箭头函数的this指向哪里，使用new调用箭头函数都会报错，因为箭头函数没有constructor
 *      箭头函数不支持new.target
 *      普通函数如果通过new调用，new.target会返回该函数的引用
 * 
 *      new.target
 *      new.target属性用于确定构造函数是否为new调用的
 *      ①箭头函数的this指向全局对象，在箭头函数中使用new.target会报错
 *      ②箭头函数的this指向普通函数，它的new.target就是指向该普通函数的引用
 */
let func2 = () => {};
new func2();    // 报错，func2 is not a constructor

let test6 = () => {
    console.log(new.target); // 报错：new.target 不允许在这里使用
    // SyntaxError: new.target expression is not allowed here
};
test6();

function test6_2() {
  let test_a = () => {
    console.log(new.target); // 指向函数test6_2：function test6_2(){...}
  };
  test_a();
}

new test6_2();

/**
 * (7)箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名
 *      普通函数的函数参数支持重命名，后面出现的会覆盖前面的，箭头函数会抛出错误
 */
function func7(a, a) {
    console.log(a, arguments); // 2 [1,2]
}
func7(1, 2);

const func7_2 = (a, a) => {
    console.log(a); // 报错：在此上下文中不允许重复参数名称
};

/***************使用箭头函数时候的注意事项******************/
/**
    (1)箭头函数在参数和箭头之间不能换行！
        var func = ()
            => 1; // 报错： Unexpected token =>

    (2)一条语句返回对象字面量，需要加括号，或者直接写成多条语句的return形式，
        否则像func中演示的一样，花括号会被解析为多条语句的花括号，不能正确解析

        var func1 = () => { foo: 1 }; // 想返回一个对象,花括号被当成多条语句来解析，执行后返回undefined
        var func2 = () => ({foo: 1}); // 用圆括号是正确的写法
        var func2 = () => {
            return {
                foo: 1 // 更推荐直接当成多条语句的形式来写，可读性高
            };
        };
 */

/**
 * 总结：
 *      普通函数和箭头函数的区别：
            箭头函数的this在定义的时候继承自外层第一个普通函数的this。
            如果箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)
            箭头函数本身的this指向不能改变，但可以修改它要继承的对象的this。
            箭头函数的this指向全局，使用arguments会报未声明的错误。
            箭头函数的this指向普通函数时,它的argumens继承于该普通函数
            使用new调用箭头函数会报错，因为箭头函数没有constructor
            箭头函数不支持new.target
            箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名
            箭头函数相对于普通函数语法更简洁优雅

        箭头函数的注意事项：
            箭头函数一条语句返回对象字面量，需要加括号
            箭头函数在参数和箭头之间不能换行
 */