/**
 * constructor、_proto_、prototype之间的关系
 * https://www.cnblogs.com/MIse/p/7205516.html
 */

/**
 * prototype（原型）
 * (1) prototype的主要作用就是：将一些方法或不变的属性 写在prototype上面，从而由这个 
 *                          原型对象 所创造出来的 对象实例 可以 共享他所有的方法和属性。
 * (2)将不变的属性方法卸载prototype好处：不用在构造函数里面定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。
 *                          而且节省内存，把方法存在 堆内存 中，栈内存 只存放指向这个方法的指针。
 * 
 * 下面例子中：Person 就是 person1 的原型 ， person1 可以继承到 Person 上面 eat 的方法
 */
function Person(name,gender){  // 这个就是原型,也是一个构造函数,首字母大写
    this.name = name;
    this.gender = gender;
}

Person.prototype.eat = "哇,贼好吃.";   // 在prototype写的方法,继承他的都能使用到

var person1 = new Person("MIse","male");  // 这个就是 对象实例 他的原型就是 Person 这个构造函数

/**
 * __proto__（实例内部的属性）
 * 每一个 构造函数创建的 对象实例 都有一个[[Prototype]]属性。在JavaScript中，
 * 因为[[Prototype]]没有标准的访问方式，所以通常这个属性都是通过__proto__来代替访问。
 * 
 * 每个对象实例都有一个 __proto__ 属性，这属性也是一个指针，这个指针也是指向一个对象。
 * 这个对象就是创建它这对象实例本身的原型对象，这个就是存在于实例与构造函数的原型对象之间的连接。
 * 
 * 这也是为什么 person1 能够访问到 Person 的方法的原因。因为 person1（对象实例）是继承于 Person（原型对象）
 */
person1.__proto__ === Person.prototype; // true

/**
 * constructor（函数）
 * 每一个构造函数内部都会有一个 constructor 的属性，这个属性也是一个指针，指向该prototype属性所在函数的指针。
 */
Person.prototype.constructor === Person; // true

// 综上所述：
person1.__proto__ === Person.prototype;

person1.prototype.constructor; //会报错,因为person1是没有prototype的

Person.prototype.constructor === Person;

Person.__proto__ === Function.prototype;

Person.prototype.__proto__ === Object.prototype    // 因为所有函数都是由Object继承过来的

Function.__proto__ === Function.prototype;

Function.prototype.__proto__ === Object.prototype;

Object.__proto__ === Function.prototype;

Object.prototype.__proto__ === null;

Object.prototype.constructor === Object;

/**
 * 这是一个测试
 */
Array.constructor === Function.constructor    // true
Function.constructor === Object.constructor   // true
String.constructor === Number.constructor     // true

/**
 * Math和JSON不是构造函数
 * typeof Math // 'object'
 */
Math.constructor === Object
Math.__proto__.constructor === Object