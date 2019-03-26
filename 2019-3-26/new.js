/**
 * 构造函数和操作符new
 * https://zh.javascript.info/constructor-new
 */

/**
 * 构造函数：
 * (1) 用大写字母命名
 * (2) 它们只能用‘new’操作符来执行
 * (3) 构造函数的主要目的：实现可重用的对象创建代码
 */
function User(name) {
    this.name = name;
}

let user = new User('kisure');

/** 
 * new 这一步做了什么？
 * (1) 一个新的空对象被创建并分配给 this
 * (2) 函数体执行。通常它会修改this，为其添加新的属性。
 * (3) 返回this的值
*/
function newUser(name) {
    // this = {};   // 隐式创建
    // 添加属性到this上
    this.name = name;
    // .....
    return this;    // 隐式返回
}

/**
 * 双语法构造函数：new.target
 * 在一个函数内部，我们可以使用 new.target 属性来检查它是用 new 还是不用它来调用。
 * 常规调用为空，如果通过 new 调用
 */
function Users(name) {
    if (!new.target) {  // 如果你没有运行 new
        return new Users(name);
    }

    this.name = name;
}

let john = Users('kisure');

/**
 * 原生js实现一个new的实现
 * @param {*} fun   构造函数
 * https://juejin.im/post/5bde7c926fb9a049f66b8b52
 */
function newOperator(fun) {
    if (typeof fun !== 'function') {
        throw 'newOperator function the first param must be a function';
    }
    
    /**
     * Object.create()E5中提出的一种新的对象创建方式
     * 第一个参数是要继承的原型，如果不是一个子函数，可以传一个null
     * 第二个参数是对象的属性描述符，这个参数是可选的
     * https://www.cnblogs.com/yupeng/p/3478069.html
     * 
     * 创建一个全新的对象
     * 执行[[Prototype]]链接
     *      所谓的链接：newObj.constructor = fun
     *                fun.prototype.constructor = fun;
     * 通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数fun的`prototype`对象上。
     */
    const newObj = Object.create(fun.constructor);
    /**
     * 获取剩余参数
     * ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
     */
    const args = [].slice.call(arguments, 1);
    /**
     * result是fun构造函数返回的结果
     * fun.apply(newObj, args); newObj对象会绑定到函数调用的`this`
     */
    const result = fun.apply(newObj, args);

    if (typeof result === 'object' && result !== null || typeof result === 'function')
        return result;

    /** 
     * 如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，
     * 那么`new`表达式中的函数调用会自动返回这个新的对象。
    */
    return newObj;
}
