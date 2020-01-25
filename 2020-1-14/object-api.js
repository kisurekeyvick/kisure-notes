/** 
 * 近日发现有挺多人对对象基础API不熟悉，举个开发中常见的需求，经常会有类似的封装http到原型Vue.prototype，
 * 一般人是这样封装的，但容易被篡改.
 */
function Vue(){
    console.log('test vue');
}
function http(){
    console.log('我是调用接口的http');
}
Vue.prototype.$http = http;
var vm = new Vue();
vm.$http()
vm.$http = 1; // 一旦被修改，虽然一般正常情况下不会被修改
vm.$http(); // 再次调用报错

/** 
 * 熟悉Object.defineProperty或者说熟悉对象API的人，一般是如下代码写的，则不会出现被修改的问题
 */
function Vue(){
    console.log('test vue');
};
function http(){
    console.log('我是调用接口的http');
};
Object.defineProperty(Vue.prototype, '$http', {
    get(){
    return http;
    }
});
var vm = new Vue();
vm.$http();
vm.$http = 1; // 这里无法修改
vm.$http(); // 调用正常

/** 
 * vue-router 源码里就是类似这样写的[1]，this.$router，this.$route无法修改。
 */
Object.defineProperty(Vue.prototype, '$router', {
	get () { return this._routerRoot._router }
});
Object.defineProperty(Vue.prototype, '$route', {
	get () { return this._routerRoot._route }
});

/** 
 * (1) 创建对象的两种方式：
 */
var o = new Object();
var o = {}; // 推荐

/** 
 * (2) 该构造器可以接受任何类型的参数，并且会自动识别参数的类型，并选择更合适的构造器来完成相关操作。比如：
 */
var o = new Object('something');
o.constructor; // ƒ String() { [native code] }
var n = new Object(123);
n.constructor; // ƒ Number() { [native code] }

/** 
 * 一、Object 构造器的成员
 * 
 * 该属性是所有对象的原型（包括 Object对象本身），语言中的其他对象正是通过对该属性上添加东西来实现它们之间的继承关系的。
 * 所以要小心使用。
 */
var s = new String('若川');
Object.prototype.custom = 1;
console.log(s.custom); // 1

/** 
 * Object.prototype.isPrototypeOf(obj)
 * 
 * 如果目标对象是当前对象的原型，该方法就会返回true，而且，当前对象所在原型上的所有对象都能通过该测试，并不局限与它的直系关系。
 */
var s = new String('');
Object.prototype.isPrototypeOf(s); // true
String.prototype.isPrototypeOf(s); // true
Array.prototype.isPrototypeOf(s); // false

// 又或者
function P() {}
const newP = new P();
P.prototype.isPrototypeOf(newP);    // true 其中目标对象是newP，当前对象的原型是：P.prototype

/** 
 * Object.prototype.propertyIsEnumerable(prop)
 * 
 * 如果目标属性能在for in循环中被显示出来，该方法就返回true
 */
var a = [1,2,3];
a.propertyIsEnumerable('length'); // false
a.propertyIsEnumerable(0); // true


/** --------- 在ES5中附加的Object属性 --------- */
// ES3风格的属性定义方式:
var person = {};
person.legs = 2;

// ES5 通过数据描述符定义属性的方式：
var person = {};
Object.defineProperty(person, 'legs', {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
});
/** 
 * 其中， 除了 value 的默认值为undefined以外，其他的默认值都为false。
 * 这就意味着，如果想要通过这一方式定义一个可写的属性，必须显示将它们设为true。
 */

// 我们也可以通过ES5的存储描述符来定义
var person = {};
Object.defineProperty(person, 'legs', {
    set:function(v) {
        return this.value = v;
    },
    get: function(v) {
        return this.value;
    },
    configurable: true,
    enumerable: true
});
person.legs = 2; 

/** 
 * Object.getPrototypeOf(obj) 
 * 
 * 在ES3中，我们往往需要通过Object.prototype.isPrototypeOf()去猜测某个给定的对象的原型是什么，
 * 如今在ES5中，我们可以直接询问改对象“你的原型是什么？
 */
Object.getPrototypeOf([]) === Array.prototype; // true
Object.getPrototypeOf(Array.prototype) === Object.prototype; // true
Object.getPrototypeOf(Object.prototype) === null; // true

/** 
 * Object.create(obj, descr)
 * 
 * 该方法主要用于创建一个新对象，并为其设置原型，用（上述）属性描述符来定义对象的原型属性。
 */
var parent = {hi: 'Hello'};
var o = Object.create(parent, {
    prop: {
        value: 1
    }
});
o.hi; // 'Hello'
// 获得它的原型
Object.getPrototypeOf(parent) === Object.prototype; // true 说明parent的原型是Object.prototype
Object.getPrototypeOf(o); // {hi: "Hello"} // 说明o的原型是{hi: "Hello"}
o.hasOwnProperty('hi'); // false 说明hi是原型上的
o.hasOwnProperty('prop'); // true 说明prop是原型上的自身上的属性。

/** 
 * Object.getOwnPropertyDesciptor(obj, property) 
 * 
 * 该方法可以让我们详细查看一个属性的定义。甚至可以通过它一窥那些内置的，之前不可见的隐藏属性。
 */
Object.getOwnPropertyDescriptor(Object.prototype, 'toString');
// {writable: true, enumerable: false, configurable: true, value: ƒ toString()}

/** 
 * Object.getOwnPropertyNames(obj)
 * 
 * 该方法返回一个数组，其中包含了当前对象所有属性的名称（字符串），不论它们是否可枚举。
 * 当然，也可以用Object.keys()来单独返回可枚举的属性。
 */
Object.getOwnPropertyNames(Object.prototype);
// ["__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "constructor", "toLocaleString", "isPrototypeOf"]
Object.keys(Object.prototype);
// []
Object.getOwnPropertyNames(Object);
// ["length", "name", "arguments", "caller", "prototype", "assign", "getOwnPropertyDescriptor", "getOwnPropertyDescriptors", "getOwnPropertyNames", "getOwnPropertySymbols", "is", "preventExtensions", "seal", "create", "defineProperties", "defineProperty", "freeze", "getPrototypeOf", "setPrototypeOf", "isExtensible", "isFrozen", "isSealed", "keys", "entries", "values"]
Object.keys(Object);
// []


/** 
 * Object.preventExtensions(obj)
 * Object.isExtensible(obj)
 * 
 * preventExtensions()方法用于禁止向某一对象添加更多属性，
 * 而isExtensible()方法则用于检查某对象是否还可以被添加属性。
 */
var deadline = {};
Object.isExtensible(deadline); // true
deadline.date = 'yesterday'; // 'yesterday'
Object.preventExtensions(deadline);
Object.isExtensible(deadline); // false
deadline.date = 'today';
deadline.date; // 'today'
// 尽管向某个不可扩展的对象中添加属性不算是一个错误操作，但它没有任何作用。
deadline.report = true;
deadline.report; // undefined


/** 
 * Object.seal(obj)
 * Object.isSeal(obj)
 * 
 * seal()方法可以让一个对象密封，并返回被密封后的对象。
 * seal()方法的作用与preventExtensions()基本相同，但除此之外，它还会将现有属性 设置成不可配置。
 * 也就是说，在这种情况下，我们只能变更现有属性的值，但不能删除或（用defineProperty()）重新配置这些属性，
 * 例如不能将一个可枚举的属性改成不可枚举。
 */
var person = {legs:2};
// person === Object.seal(person); // true
Object.seal(person);
Object.isSealed(person); // true
Object.getOwnPropertyDescriptor(person, 'legs');
// {value: 2, writable: true, enumerable: true, configurable: false}
delete person.legs; // false (不可删除，不可配置)
Object.defineProperty(person, 'legs',{value:2});
person.legs; // 2
person.legs = 1;
person.legs; // 1 (可写)
Object.defineProperty(person, "legs", { get: function() { return"legs"; } });


/** 
 * Object.freeze(obj)
 * Object.isFrozen(obj)
 * 
 * freeze()方法用于执行一切不受seal()方法限制的属性值变更。
 * 
 * Object.freeze() 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，
 * 以及不能修改该对象已有属性的可枚举性、可配置性、可写性。
 * 
 * 也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。
 */
var deadline = Object.freeze({date: 'yesterday'});
deadline.date = 'tomorrow';
deadline.excuse = 'lame';
deadline.date; // 'yesterday'
deadline.excuse; // undefined
Object.isSealed(deadline); // true;
Object.isFrozen(deadline); // true

Object.getOwnPropertyDescriptor(deadline, 'date');
// {value: "yesterday", writable: false, enumerable: true, configurable: false} (不可配置，不可写)
Object.keys(deadline); // ['date'] (可枚举)


/** 
 * Object.keys(obj)
 * 
 * 该方法是一种特殊的for-in循环。它只返回当前对象的属性（不像for-in），
 * 而且这些属性也必须是可枚举的（这点和Object.getOwnPropertyNames()不同，不论是否可以枚举）。返回值是一个字符串数组。
 */
Object.prototype.customProto = 101;
Object.getOwnPropertyNames(Object.prototype);
// [..., "constructor", "toLocaleString", "isPrototypeOf", "customProto"]
Object.keys(Object.prototype); // ['customProto']
var o = {own: 202};
o.customProto; // 101
Object.keys(o); // ['own']

/** --------- 在ES6中附加的Object属性 --------- */
/** 
 * Object.is(value1, value2)
 * 
 * 该方法用来比较两个值是否严格相等。它与严格比较运算符（===）的行为基本一致。
 * 不同之处只有两个：一是+0不等于-0，而是NaN等于自身。
 */
Object.is('若川', '若川'); // true
Object.is({},{}); // false
Object.is(+0, -0); // false
+0 === -0; // true
Object.is(NaN, NaN); // true
NaN === NaN; // false

// ES5可以通过以下代码部署Object.is
Object.defineProperty(Object, 'is', {
    value: function(x, y) {
        if (x === y) {
           // 针对+0不等于-0的情况
           return x !== 0 || 1 / x === 1 / y;
        }
        // 针对 NaN的情况
        return x !== x && y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
});


/** 
 * Object.assign(target, ...sources)
 * 
 * 该方法用来源对象（source）的所有可枚举的属性复制到目标对象（target）。
 * 它至少需要两个对象作为参数，第一个参数是目标对象target，后面的参数都是源对象（source）。
 */
// 对于数组，Object.assign()把数组视为属性名为 0、1、2 的对象。
Object.assign([1,2,3], [4,5]);  // [4, 5, 3]


/** 
 * Object.assign只复制自身属性，不可枚举的属性（enumerable为false）和继承的属性不会被复制。
 */
Object.assign({b: 'c'}, Object.defineProperty({}, 'invisible', {
        enumerable: false,
        value: 'hello'
    })
);


/** --------- 在ES8中附加的Object属性 --------- */
/** 
 * Object.getOwnPropertySymbols(obj)
 * 
 * 该方法会返回一个数组，该数组包含了指定对象自身的（非继承的）所有 symbol 属性键。
 * 该方法和 Object.getOwnPropertyNames() 类似，但后者(Object.getOwnPropertyNames)返回的结果只会包含字符串类型的属性键，也就是传统的属性名。
 */
Object.getOwnPropertySymbols({a: 'b', [Symbol('c')]: 'd'});
// [Symbol(c)]


/** 
 * Object.setPrototypeOf(obj, prototype)
 * 
 * 该方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或 null。
 * __proto__属性用来读取或设置当前对象的prototype对象。
 */
const target = {}
const obj = {
    method: function(){
        // code ...
    }
};
Object.setPrototypeOf(target, obj);


/** 
 * Object.getOwnPropertyDescriptors(obj)
 * 
 * 该方法基本与Object.getOwnPropertyDescriptor(obj, property)用法一致，只不过它可以用来获取一个对象的所有自身属性的描述符。
 */
Object.getOwnPropertyDescriptor(Object.prototype, 'toString');
// {writable: true, enumerable: false, configurable: true, value: ƒ toString()}
Object.getOwnPropertyDescriptors(Object.prototype); // 可以自行在浏览器控制台查看效果。


/** 
 * Object.values(obj)
 * 
 * Object.values() 方法与Object.keys类似。返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 
 * ( 区别在于for-in循环枚举原型链中的属性 )。
 */
var obj = {a:1,b:2,c:3};
Object.keys(obj); // ['a','b','c']
Object.values(obj); // [1,2,3]


/** 
 * Object.entries(obj)
 * 
 * Object.entries() 方法返回一个给定对象自己的可枚举属性[key，value]对的数组，
 * 数组中键值对的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致（区别在于一个for-in循环也枚举原型链中的属性）。
 */
var obj = {a:1,b:2,c:3};
Object.keys(obj); // ['a','b','c']
Object.values(obj); // [1,2,3]
Object.entries(obj); // [['a',1],['b',2],['c',3]]


/** --------- 在ES10中附加的Object属性 --------- */
/** 
 * Object.fromEntries(iterable)
 * 
 * Object.fromEntries()方法返回一个给定可迭代对象（类似Array、Map或其他可迭代对象）对应属性的新对象。
 * Object.fromEntries() 是 Object.entries()的逆操作。
 */
var arr = [['a',1],['b',2],['c',3]];
Object.fromEntries(arr); // {a: 1, b: 2, c: 3}
var entries = new Map([
    ['name', '若川'],
    ['age', 18]
]);
Object.fromEntries(entries);
