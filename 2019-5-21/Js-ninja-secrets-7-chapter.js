/** 
 * 理解原型
 * 原型的概念：每个对象都含有原型的引用，当查找属性时，若对象本身不具有该属性，则会查找原型上是否有该属性。
 */
function Ninja(){
	this.swung = false;
	this.swingSword = function(){
    	return !this.swung;
	};
}

Ninja.prototype.swingSword = function(){
	return this.swung;
};

const ninja = new Ninja();
ninja.swung;            // false
ninja.swingSword();     // true

/** 
 * 由此可见，实例ninja中，如果实例方法和原型方法重名，那么实例方法会覆盖同名的原型方法
 * 换句话说：如果实例中可以查找到的属性，将不会查找原型。
 * */

function Kisure(age){
	this.age = age;
}

const he = new Kisure(25);

Kisure.prototype.speak = function() {
    console.log('nice fish');
};

// 使用字面量对象完全重写Kisure的原型对象，
Kisure.prototype = {
    pk: function() {
        console.log('nice fish');
    }
};

const he_2 = new Kisure(26);

/** 
 * 尽管我们已经完全替换了Kisure的构造器原型，但是实例化后的he对象仍然具有speak方法，因为对象he仍然保持着对旧的kisure原型的引用
 * 注意，这是保持对旧的kisure原型引用！是引用！
 */

/**
 * 通过使用constructor属性，我们可以访问创建该对象时所用的函数。
 * 这个特性可以用于类型校验，例如上面：he instanceof Kisure。
 * 
 * 由于constructor属性仅仅是原始构造函数的引用，因此我们可以使用该属性创建新的对象。
 * 例如：new he.constructor(25);
 * 
 * 虽然对象的constructor属性有可能发生改变，改变constructor属性没有任何直接或明显的建设性目的（可能要考虑极端情况）。
 * constructor属性的存在仅仅是为了说明该对象是从哪儿创建出来的。
 * 如果重写了constructor属性，那么原始值就被丢失了。
 */

/** 
 * 重写constructor
 * 原因：如下代码中she的constructor应该是Her，但是却是Person,所以需要修改Her的构造函数指向
 */
function Person() {}
Person.prototype.dance = function() {console.log('dance');}

function Her(){}
Her.prototype = new Person();
const she = new Her();

console.log(she instanceof Person); // true     she.constructor就是Person

// 定义一个新的不可枚举的constructor属性，属性值为Her方法
Object.defineProperty(Her.prototype, "constructor", {
    enumerable: false,
    value: Her,
    writable: true
});

/**
 * ninja instanceof Ninja 
 * 操作符instanceof用于检测Ninja函数是否存在于ninja实例的原型链中。
 * 注意了，instanceof是用于检测原型链的！原型链！！
 *  */
// 如下案例：
function Per() {};
function Nj() {};
Nj.prototype = new Per();
const nj = new Nj();

console.log(nj instanceof Nj);
/**
 * 当执行 nj instanceof Nj 表达式时，JavaScript引擎检查 Nj 函数的原型——new Person()对象，是否存在于nj实例的原型链上。
 * new Person()对象是nj实例的原型，因此，表达式执行结果为true。
 */
console.log(nj instanceof Per);
/**
 * 当执行 nj instanceof Per 表达式时，js引擎查找Person函数的原型，检查它是否存在于在nj实例的原型链上。
 * 由于Person的原型的确存在于nj实例的原型链上，Per是new Per()对象的原型，所以Per也是nj实例的原型。
 */

/** 
 * 总结：
 * (1)Object.setPrototypeOf(obj, prototype) 用于设置一个对象的原型
 * (2)每个函数都具有prototype属性，该函数创建的对象的原型（__proto__），就是函数的原型。
 * (3)函数原型对象具有constructor属性，该属性指向函数本身。
 *      该函数创建的全部对象均访问该属性，constructor属性还可用于判断对象是否是由指定的函数创建的。
 * (4)在JavaScript中，原型具有属性（如configurable、enumerable、writable）。
 *      这些属性可通过内置的Object.defineProperty方法进行定义
 */