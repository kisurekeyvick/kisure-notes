/** 
 * https://juejin.im/post/5e33fcd06fb9a02fc767c427
 * 
 * TS 常见问题整理
 */

/** 
 * (1) null 和 undefined 是其它类型（包括 void）的子类型，
 *      可以赋值给其它类型（如：数字类型），赋值后的类型会变成 null 或 undefined
 */
let a: number = 1;
a = null;

/** 
 * - 默认情况下，编译器会提示错误，这是因为 tsconfig.json 里面有一个配置项是默认开启的。
 * - tsconfig.json中有一个参数：strictNullChecks ，该参数用于新的严格空检查模式，在严格空检查模式下，
 *          null 和 undefined 值都不属于任何一个类型，它们只能赋值给自己这种类型或者 any
 */

/** 
 * (2) never 和 void 的区别
 * 
 * - void 表示没有任何类型（可以被赋值为 null 和 undefined）
 * - never 表示一个不包含值的类型，即表示永远不存在的值。
 * - 拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。
 */ 

/** 
 * (3) 元祖越界问题
 */
let aaa: [string, number] = ['aaa', 5];
// 添加时不会报错
aaa.push(6);
// 打印整个元祖不会报错
console.log(aaa); // ['aaa',5,6];
// 打印添加的元素时会报错
// console.log(aaa[2]); // error

/** 
 * (4) 枚举成员的特点
 * 
 * - 是只读属性，无法修改
 * - 枚举成员值默认从 0 开始递增，可以自定义设置初始值
 */
enum Gender {
    BOY = 1,
    GRIL
}

console.log(Gender.BOY);    // 1
console.log(Gender);        // { '1': 'BOY', '2': 'GRIL', BOY: 1, GRIL: 2 }

/** 
 * 枚举成员值
 * 
 * - 可以没有初始值
 * - 可以是一个对常量成员的引用
 * - 可以是一个常量表达式
 * - 也可以是一个非常量表达式
 */
enum Char {
    // const member 常量成员：在编译阶段被计算出结果
    a,				 // 没有初始值
    b = Char.a,// 对常量成员的引用
    c = 1 + 3, // 常量表达式
  
    // computed member 计算成员：表达式保留到程序的执行阶段
    d = Math.random(),// 非常量表达式
    e = '123'.length,
    // 紧跟在计算成员后面的枚举成员必须有初始值!!!
    f = 6,
    g   // 默认的为7
}

/** 
 * (5) 常量枚举与普通枚举的区别
 * 
 * - 常量枚举会在编译阶段被删除
 * - 枚举成员只能是常量成员
 */
const enum Colors {
    Red,
    Yellow,
    Blue
}
// 常量枚举会在编译阶段被删除
let myColors = [Colors.Red, Colors.Yellow, Colors.Blue];
/** 
 * 编译成 JS
 * var myColors = [0, 1, 2];
 * 常量枚举不能包含计算成员，如果包含了计算成员，则会在编译阶段报错
 * 
 * 报错
 * const enum Color {Red, Yellow, Blue = "blue".length};
 * console.log(Colors.RED);
 */

/** 
 * (6) 枚举的使用场景,为什么使用枚举
 * 
 * 不使用枚举，存在如下问题：
 *                          - 可读性差：很难记住数字的含义
 *                          - 可维护性差：硬编码，后续修改的话牵一发动全身
 */
// 不使用枚举的情况：
 function initByRole(role) {
    if (role === 1 || role == 2) {
        console.log("1,2")
    } else if (role == 3 || role == 4) {
        console.log('3,4')
    } else if (role === 5) {
        console.log('5')
    } else {
        console.log('')
    }
}

// 使用枚举的情况下：
enum Role {
    Reporter,
    Developer,
    Maintainer,
    Owner,
    Guest
}
  
function init(role: number) {
    switch (role) {
        case Role.Reporter:
        console.log("Reporter:1");
        break;
        case Role.Developer:
        console.log("Developer:2");
        break;
        case Role.Maintainer:
        console.log("Maintainer:3");
        break;
        case Role.Owner:
        console.log("Owner:4");
        break;
        default:
        console.log("Guest:5");
        break;
    }
}
  
init(Role.Developer);
  
/** 
 * (7) 什么是可索引类型接口
 * 
 * - 一般用来约束数组和对象
 */

/** 
 * (8) 什么是函数类型接口
 * 
 * - 对方法传入的参数和返回值进行约束
 */ 
// 注意区别

// 普通的接口
interface discount1{
    getNum : (price:number) => number
}
  
  // 函数类型接口
interface discount2{
    // 注意:
    // “:” 前面的是函数的签名，用来约束函数的参数
    // ":" 后面的用来约束函数的返回值
    (price:number):number
}
let cost:discount2 = function(price:number):number{
    return price * .8;
}

// 也可以使用类型别名
type Add = (x: number, y: number) => number
let add: Add = (a: number, b: number) => a + b
  
/** 
 * (9)  什么是类类型接口
 * 
 * - 如果接口用于一个类的话，那么接口会表示“行为的抽象”
 * - 对类的约束，让类去实现接口，类可以实现多个接口
 * - 接口只能约束类的公有成员（实例属性/方法），无法约束私有成员、构造函数、静态属性/方法
 */
// 接口可以在面向对象编程中表示为行为的抽象
interface Speakable {
    name: string;
  
 		// ":" 前面的是函数签名，用来约束函数的参数
    // ":" 后面的用来约束函数的返回值
    speak(words: string): void
}

interface Speakable2 {
    age: number;
}

class Dog implements Speakable, Speakable2 {
    name!: string;
    age = 18;

    speak(words: string) {
        console.log(words);
    }
}

let dog = new Dog();
dog.speak('汪汪汪');

/** 
 * (10) 什么是混合类型接口
 * 
 * - 一个对象可以同时做为函数和对象使用
 */
interface FnType {
    (getName:string):string;
}

interface MixedType extends FnType{
    name:string;
    age:number;
}

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

/** 
 * (11) 什么是函数重载
 * 
 * - 在 TypeScript 中，表现为给同一个函数提供多个函数类型定义，适用于接收不同的参数和返回不同结果的情况。
 * - TS 实现函数重载的时候，要求定义一系列的函数声明，在类型最宽泛的版本中实现重载
 *      （前面的是函数声明，目的是约束参数类型和个数，最后的函数实现是重载，表示要遵循前面的函数声明。一般在最后的函数实现时用 any 类型）
 * - 函数重载在实际应用中使用的比较少，一般会用联合类型或泛型代替
 * - 函数重载的声明只用于类型检查阶段，在编译后会被删除
 * - TS 编译器在处理重载的时候，会去查询函数申明列表，从上至下直到匹配成功为止，所以要把最容易匹配的类型写到最前面
 */
function attr(val: string): string;
function attr(val: number): number;
// 前面两行是函数申明，这一行是实现函数重载
function attr(val: any): any {
    if (typeof val === 'string') {
        return val;
    } else if (typeof val === 'number') {
        return val;
    } 
}

attr('aaa');
attr(666);

/** 
 * (12) 什么是访问控制修饰符
 * 
 * - 默认就是 public, 在定义的类中、类的实例、子类、子类实例都可以访问
 * - protected, 只能在定义的类和子类中访问，不允许通过实例（定义的类的实例和子类实例）访问
 * - private, 只能在定义的类中访问，类的实例、子类、子类实例都不可以访问
 */

/** 
 * (13) 重写(override) vs 重载(overload)
 * 
 * - 重写是指子类重写“继承”自父类中的方法 。TS 中的继承本质上还是 JS 的“继承”机制—原型链机制
 * - 重载是指为同一个函数提供多个类型定义
 */ 
// 重写
class Animal {
    speak(word: string): string {
        return '动作叫:' + word;
    }
}

class Cat extends Animal {
    speak(word: string): string {
        return '猫叫:' + word;
    }
}

let cat = new Cat();
console.log(cat.speak('hello'));

/** 
 * (14) 继承 vs 多态
 * 
 * - 继承：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
 * - 多态：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应
 */
class Animal_1 {
    speak(word: string): string {
        return 'Animal: ' + word;
    }
}

class Cat_1 extends Animal_1 {
    speak(word: string): string {
        return 'Cat:' + word;
    }
}

class Dog_1 extends Animal_1 {
    speak(word: string): string {
        return 'Dog:' + word;
    }
}

let cat_1 = new Cat_1();
console.log(cat.speak('hello'));
let dog_1 = new Dog_1();
console.log(dog.speak('hello'));

/** 
 * (15) 什么是泛型
 * 
 * - 泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，使用时再去指定类型的一种特性。
 * - 可以把泛型理解为代表类型的参数
 */
// 有关联的地方都改成 <T>
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

// 使用的时候再指定类型
let result = createArray<string>(3, 'x');

// 也可以不指定类型，TS 会自动类型推导
let result2 = createArray(3, 'x');
console.log(result);

/** 
 * (16) 什么是类型谓词
 * 
 * - 类型保护函数：要自定义一个类型保护，只需要简单地为这个类型保护定义一个函数即可，这个函数的返回值是一个类型谓词
 * - 类型谓词的语法为 parameterName is Type 这种形式，其中 parameterName 必须是当前函数签名里的一个参数名
 */
interface Bird {
    fly()
    layEggs()
}
interface Fish {
    swim()
    layEggs()
}

function getSmallPet():Fish | Bird{
    return ;
}
let pet = getSmallPet();

pet.layEggs();
// 当使用联合类型时，如果不用类型断言，默认只会从中获取共有的部分
(pet as Fish).swim();

/** 
 * (17) 可选链运算符的使用
 * 
 * - 可选链运算符是一种先检查属性是否存在，再尝试访问该属性的运算符，其符号为 ?
 *      TS 3.7版本正式支持使用，以前的版本会报错
 */
/** 
 * a?.b;
 * 相当于 a == null ? undefined : a.b;
 * 
 * a?.[x];
 * 相当于 a == null ? undefined : a[x];
 * 
 * a?.b();
 * 相当于a == null ? undefined : a.b();
 */

/** 
 * (18) 非空断言符的使用
 * 
 * TS 3.7版本正式支持使用
 */ 
let root2: (HTMLElement | null) = document.getElementById('root');
root2!.style.color = 'red';

/** 
 * (19) 空值合并运算符的使用
 * 
 * TS 3.7版本正式支持使用
 * 
 * - || 运算符的缺点： 当左侧表达式的结果是数字 0 或空字符串时，会被视为 false。
 * - 空值合并运算符：只有左侧表达式结果为 null 或 undefined 时，才会返回右侧表达式的结果。
 *      通过这种方式可以明确地区分 undefined、null 与 false 的值。
 */
const data = {
    str:'',
    num:0,
    flag:false
};

// data.str 为 "" 时
let str1 = data.str || '空' // '空'
// data.num 为 0 时
let num1 =  data.num || 666 // 666
// data.flag 为 false 时
let status1 =  data.flag || true  // true

/** 
 * // data.str 为 "" 时，可以通过。仅在 str 为 undefined 或者 null 时，不可以通过
 * let st2r = data.str ?? '空';  
 * 
 * // data.num 为 0 时，可以通过。仅在 num 为 undefined 或者 null 时，不可以通过
 * let num2 = data.num ?? 666; 
 * 
 * // data.flag 为 false 时，可以通过。仅在 flag 为 undefined 或者 null 时，不可以通过
 * let status2 = data.flag ?? true;
 */

/** 
 * (20) typeof class 和直接用 class 作为类型有什么区别
 */
class Greeter {
    static message = 'hello';

    greet(){
        return Greeter.message;
    }
}

// 获取的是实例的类型，该类型可以获取实例对象上的属性/方法
let greeter1:Greeter = new Greeter();
console.log(greeter1.greet());// 'hello'


// 获取的是类的类型，该类型可以获取类上面的静态属性/方法
let greeterTwo:typeof Greeter = Greeter;
greeterTwo.message = 'hey';

let greeter2:Greeter = new greeterTwo();
console.log(greeter2.greet());// 'hey'

/** 
 * (21) 当使用联合类型时，在类型未确定的情况下，默认只会从中获取共有的部分
 * 
 * - 使用类型断言
 * - 可区分的联合类型（借助 never ）
 */
enum KindType{
    square = 'square',
    rectangle = 'rectangle',
    circle = 'circle',
}

interface Square {
    kind: KindType.square;
    size: number;
}

interface Rectangle {
    kind: KindType.rectangle;
    width: number;
    height: number;
}

interface Circle {
    kind: KindType.circle;
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area1(s: Shape) {
    // 如果联合类型中的多个类型，拥有共有的属性，那么就可以凭借这个属性来创建不同的类型保护区块
    // 这里 kind 是共有的属性
    switch (s.kind) {
        case KindType.square:
            return s.size * s.size;
        case KindType.rectangle:
            return s.height * s.width;
        default:
            return;
    }
}

/** 
 * (22) 在全局环境中，不能给某些变量声明类型
 */
let name_12: string;

// 加了 export 后就不会报错
// export {} 

/** 
 * (23) 扩展全局变量的类型
 */
interface String {
    // 这里是扩展，不是覆盖，所以放心使用
    double(): string;
}

String.prototype.double = function () {
    return this + '+' + this;
};
console.log('hello'.double());

// 如果加了这个export {}，就会报错
// export {}

interface Window {
    myname: string
}

// 注意：这里的 window 要小写
console.log(window);

/** 
 * 如果加了export {}，当前模块就会变成局部的
 * 然后定义的类型 Window 就是局部的变量，不再是一个全局变量
 * 所以上面给 Window 扩展属性/方法就失效了
 */

/** 
 * (24) export = xxx 和 import xxx = require('xxx')
 */
/** 
 * exports === module.exports // 即：这两个变量共用一个内存地址
 * 
 * 整体导出
 * module.exports = {}
 * 
 * 导出多个变量
 * exports.c = 3;
 * exports.d = 4;
 */

// 一个 es6 模块默认导出，被一个 node 模块导入使用
/** 
 * 兼容性写法只在 TS 中有效 ！！！！！！
 * 
 * // a.es6.ts
 * // 这里只能导出一个
 * export = function () {
 *     console.log("I'm default")
 * }
 * 
 * // b.node.ts
 * import fn = require('./a.es6.ts');
 * fn();
 */

/** 
 * (25)  如何在 Node 中使用 TS
 * 
 * - 安装相关声明文件，如：@types/node；
 * - 因为 node 模块遵循 CommonJS 规范，一些 node 模块（如：express）的声明文件
 *      用 export = xxx 导出模块声明。TS 进行类型推导时，会无法推断导致报错。
 *      所以需要使用 import xxx from "xxx" 或者 import xxx = "xxx" 导入 node 模块；
 */ 

/** 
 * (26) 使用 as 替代尖括号表示类型断言
 * 
 * - 在 TS 可以使用尖括号来表示类型断言，但是在结合 JSX 的语法时将带来解析上的困难。因此，TS 在 .tsx 文件里禁用了使用尖括号的类型断言
 * - as 操作符在 .ts 文件和 .tsx 文件里都可用
 */ 
interface Person {
    name: string;
    age: number
}

let p1 = {age: 18} as Person;
console.log(p1.name);

// 这种写法在 .tsx 文件中会报错
let p2 = <Person>{age: 18};
console.log(p2.name);

/** 
 * (27) 如何对 JS 文件进行类型检查
 */
/** 
 *  - 在 tsconfig.json 中可以设置 checkJs:true，对 .js 文件进行类型检查和错误提示。
        通过在 .js 文件顶部添加 // @ts-nocheck 注释，让编译器忽略当前文件的类型检查。
        相反，你可以通过不设置 checkJs:true 并在 .js 文件顶部添加一个 // @ts-check 注释，让编译器检查当前文件。
        也可以在 tsconfig.json 中配置 include/exclude，选择/排除对某些文件进行类型检查 。
        你还可以使用 // @ts-ignore 来忽略本行的错误。

    - 在 .js 文件里，类型可以和在 .ts 文件里一样被推断出来。当类型不能被推断时，可以通过 JSDoc 来指定类型。
 */

/** 
 * (28) 不要使用如下类型 Number，String，Boolean、Object，应该使用类型number、string、boolean、object
 */ 
/* 错误 */
function reverse_1(s: String): String {
    return '';
};

/* OK */
function reverse_2(s: string): string {
    return '';
};

/** 
 * (29) 如何在解构一个函数 function fn({ x: number }) { } 时，即能给变量声明类型，又能给变量设置默认值
 */
// error
function f({ x: number }) {
    console.log(x);
}

// ok
function f_2({x}: { x: number } = {x: 0}) {
    console.log(x);
}

/** 
 * (30) Pick 摘取返回的结果是一个对象（或者说新的接口），里面包含摘取到的属性
 * 
 * 从 T 中取出 一系列 K 的属性
 * type Pick<T, K extends keyof T> = { [P in K]: T[P] };
 */
interface Test {
    arr: string[],
    age: number[]
}
// pick 摘取返回的结果 => {arr: string[]}
let aaa_1: Pick<Test, 'arr'> = {arr: ['1']};
let arr_2: Pick<Test, 'age'> = {age: [1]}

/** 
 * (31) 有时候我们需要复用一个类型，但是又不需要此类型内的全部属性，因此需要剔除某些属性
 * 
 * - TypeScript 3.5中,定义了新版本的“Omit”
 * 
 * - 这个方法在 React 中经常用到，当父组件通过 props 向下传递数据的时候，通常需要复用父组件的 props 类型，但是又需要剔除一些无用的类型。
 */
interface User {
    username: string
    id: number
    token: string
    avatar: string
    role: string
}
type UserWithoutToken = Omit<User, 'token'>;

/** 
 * (32) 为什么在 exclude 列表里的模块还会被编译器使用
 * 
 * - 有时候是被 tsconfig.json 自动加入的如果编译器识别出一个文件是模块导入目标，
 *      它就会加到编译列表里，不管它是否被排除了。因此，要从编译列表中排除一个文件，
 *      你需要在排除它的同时，还要排除所有对它进行 import 或使用了 
 */ 