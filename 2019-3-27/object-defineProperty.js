/**
 * 对象的定义与赋值
 * 经常使用的定义与赋值方法obj.prop =value或者obj['prop']=value
 */

/**
 * Object.defineProperty() 和 Object.defineProperties()
 * https://segmentfault.com/a/1190000007434923
 * https://segmentfault.com/a/1190000011294519
 * 这个方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象
 * 
 * Object.defineProperty()的作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性
 * 语法：Object.defineProperty(obj, prop, desc);
 * (1) obj 需要定义属性的当前对象
 * (2) prop 当前需要定义的属性名
 * (3) desc 属性描述符
 * 
 * 一般通过为对象的属性赋值的情况下，对象的属性可以修改也可以删除，
 * 但是通过Object.defineProperty()定义属性，通过描述符的设置可以进行更精准的控制对象属性
 */
let obj = {
    test:"hello"
};

Object.defineProperty(obj, 'test', {
    configurable: false,    // 是否可以删除目标属性或是否可以再次修改属性的特性（writable, configurable, enumerable）
    /**
     * configurable存在两个作用：
     * (1) 目标属性是否可以使用delete删除
     * (2) 目标属性是否可以再次设置特性
     */
    writable: true,         // 属性的值是否可以被重写。设置为true可以被重写；设置为false，不能被重写。默认为false。
    enumerable: true,       // 此属性是否可以被枚举（使用for...in或Object.keys()）。设置为true可以被枚举；设置为false，不能被枚举。默认为false
    value: '任意值'         // 属性对应的值,可以使任意类型的值，默认为undefined
});

/**
 * Object.defineProperties()
 * 方法直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象
 */

/**
 * js存在三种类型的属性：
 * (1)命名数据属性：拥有一个确定的值的属性。这也是最常见的属性
 * (2)命名访问器属性：通过getter和setter进行读取和赋值的属性
 * (3)内部属性：由JavaScript引擎内部使用的属性，不能通过JavaScript代码直接访问到
 */

/**
 * Object.setPrototypeOf()
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
 * 用来设置一个对象的prototype对象。它是 ES6 正式推荐的设置原型对象的方法。
 * 语法：Object.setPrototypeOf(obj, prototype)
 * 参数1：对其设置原型的对象
 * 参数2：新的原型对象
 */
// 注意：setPrototypeOf仅适用于chrome和firefox,在IE11以下是不工作的,这里做一个兼容。
Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
    obj._proto_ = proto;
    return obj; 
}

/**
 * Object.setPrototypeOf方法是针对对象实例的，而不是构造函数(类)。
 * 此方法修改的是对象实例的内部属性[[Prototype]]，也就是__proto__属性所指向的对象，它只是修改了特定对象上的原型对象。
 * 对于构造函数的prototype指向的原型对象没有影响。
 * 那是不是此方法就不能针对构造函数了，那也不是，因为构造函数本身也是Function（类）的实例。
 */
function Antzone(){
    this.webName="蚂蚁部落";
    this.age=4;
}

let proto = {
    url:"https://github.com/kisurekeyvick/kisure-notes"
};

Antzone.prototype.address="青岛市南区";
let one=new Antzone();
let two=new Antzone();
Object.setPrototypeOf(one, proto);
/**
 * 这里我们new了2个Antzone的实例
 * 然后我们对one的原型进行改造，改造成ptoto，也就是说one._proto_（也就是one对象的原型对象）指向的是proto变量。
 */

/**
 * Object.getPrototypeOf()
 * 用于读取某个对象的propotype对象
 */
function A(name) {
    this.name = name;
}

const target = new A('kisure');

Object.getPrototypeOf(target) === A.prototype;

/**
 * ES6中的_proto_属性
 */