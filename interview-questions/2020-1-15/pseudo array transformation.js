/** 
 * https://mp.weixin.qq.com/s/uDbDxCa57r2PjnPi9PuOFw
 * 
 * 将类数组转化为数组
 */

/** 
 * (1) 什么是类数组
 * 一个简单的定义，如果一个对象有 length 属性值，则它就是类数组
 * 
 * (2) 有哪些是类数组
 * - 这在 DOM 中甚为常见，如各种元素检索 API 返回的都是类数组
 * - function中的arguments
 * - object中存在length属性
 */

/** 
 * 使用ES6方法将伪数组转化为数组
 */
Array.from({length: 3});    // [undefined, undefined, undefined]

/** 
 * 运算符 ... 扩展运算符，不过它只能作用于 iterable 对象，即拥有 Symbol(Symbol.iterator) 属性值
 * 
 * 拥有 Symbol(Symbol.iterator) 属性值，意味着可以使用 for of 来循环迭代
 */
// 适用于 iterable 对象
[...document.querySelectorAll('div')]


/** 
 * 使用ES5方法将伪数组转化为数组
 */
// 在 ES5 中可以借用 Array API 通过 call/apply 改变 this 或者 arguments 来完成转化。
Array.prototype.slice.call({length: 3})  // [empty × 3]

// 当然由于借用 Array API，一切以数组为输入，并以数组为输出的 API 都可以来做数组转换，如
const arrayLike = {
    0: 3,
    1: 4,
    2: 5,
    length: 3
}
Array.apply(null, arrayLike)
Array.prototype.concat.apply([], arrayLike)
Array.prototype.slice.call(arrayLike)
Array.prototype.map.call(arrayLike, x => x)
Array.prototype.filter.call(arrayLike, x => 1)

/**
 * 总结
 */
// 由上总结，把类数组转化成数组最靠谱的方式是以下三个
Array.from(arrayLike)
Array.apply(null, arrayLike)
Array.prototype.concat.apply([], arrayLike)

// 以下几种方法需要考虑稀疏数组的转化
Array.prototype.map.call(arrayLike, x => x)
Array.prototype.filter.call(arrayLike, x => x)

// 稀疏数组
Array(100); // 这个就是稀疏数组，稀疏数组内含非真实元素，在控制台上将以 empty 显示