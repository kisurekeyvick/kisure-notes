/**
 * 类型检测："instanceof"
 * 
 * instanceof 并不关心构造函数，它真正关心的是原型链。
 * 
 */
function A() {}
function B() {}
A.prototype = B.prototype = {};

let a = new A();
console.log(a instanceof B);    // true
/**
 * 原因：
 * instanceof 并不关心构造函数，它真正关心的是原型链。
 * 按照 instanceof 的逻辑，真正决定类型的是 prototype，而不是构造函数。
 * 而a.__proto__ == B.prototype 成立，所以 instanceof 返回了 true。
 */