/** 
 * Object.create()
 * https://www.jianshu.com/p/28d85bebe599
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 * 
 * 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
 * 
 * 语法：Object.create(proto, propertiesObject)
 * 参数1: 新创建出来的对象的原型（新对象的__proto__属性指向的对象，值得注意的是如果为null,那么创建的则是一个完全为空的对象）
 * 参数2：
*/

const obj1 = Object.create(null);
console.log(obj1);  // 创建出来的obj1里面什么属性都没有，就是没有继承Object.prototype上的方法。（如hasOwnProperty() toString() 等）

/** 
 * new Object()
 * 
 * 使用new运算符会创建一个新的对象，它继承自构造函数的prototype,也就是说它的__proto__属性会指向构造函数的prototype
 * new Object() 也就是具有构造函数的内置Object的实例，新创建的对象的__proto__属性会指向Object的prototype
*/

/**
 * 总结：
 * 
 * Object.cerate() 必须接收一个对象参数，创建的新对象的原型指向接收的参数对象，
 * new Object() 创建的新对象的原型指向的是 Object.prototype. （表述有点啰嗦，简洁点说就是前者继承指定对象， 后者继承内置对象Object）
 * 可以通过Object.create(null) 创建一个干净的对象，也就是没有原型，
 * 而 new Object() 创建的对象是 Object的实例，原型永远指向Object.prototype
 */

