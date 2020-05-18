/** 
 * https://mp.weixin.qq.com/s/_lO3cd0FcF0Dg3TRnHPdwg
 * 
 * TypeScript进阶 之 重难点梳理
 */


 /** 
 * interface 和 type都可以被继承
 * 但是语法上表现是不同的
 */ 
// interface extends interface
interface PartialPointX {x:number;};
interface Point extends PartialPointX {
    y:number;
};

// type extends type
type PartialPointX_1 = {x:number;};
type Point_1 = PartialPointX_1 & {y:number;};

// type extends interface
interface ParticalPointX_2 {x:number;};
type Point_2 = ParticalPointX_2 & {y:number};

// interface extends type
type PartialPointX_3 = {x:number;};
interface Point extends PartialPointX_3 {
    y:number;
};


/** 
 * implements
 * 
 * 一个类，可以以完全相同的形式去实现interface 或者 type。但是，类和接口都被视为静态蓝图（static blueprints），
 * 因此，他们不能实现/继承 联合类型的 type
 */
interface Point {
    x: number;
    y: number;
}
  
class SomePoint implements Point {
    x: 1;
    y: 2;
}
  
type Point2 = {
    x: number;
    y: number;
};
  
class SomePoint2 implements Point2 {
    x: 1;
    y: 2;
}

type PartialPoint = { x: number; } | { y: number; };


/** 
 * 声明合并
 * 
 * 和 type 不同，interface 可以被重复定义，并且会被自动聚合
 */
interface Point {x:number;};
interface Point {y:number;};
const point:Point = {x:1,y:2};


/** 
 * only interface can
 * 
 * 在实际开发中，有的时候也会遇到 interface 能够表达，但是 type 做不到的情况：「给函数挂载属性」
 */
interface FuncWithAttachment {
    (param: string): boolean;
    someProperty: number;
}

const testFunc: FuncWithAttachment = function(param: string) {
    return param.indexOf("Neal") > -1;
};
testFunc.someProperty = 4;


/** 
 * & 和 | 操作符
 * 
 * 这里我们需要区分，| 和 & 并非位运算符。我们可以理解为&表示必须同时满足所有的契约。|表示可以只满足一个契约。
 */
interface TA {
    a:string;
    b:string;
}

type TB = {
    b:number;
    c:number [];
}
  
type TC = TA | TB;// TC 的 key，包含 ab 或者 bc 即可，当然，包含 bac 也可以
type TD = TA & TB;// TD 的 可以,必须包含 abc


/** 
 * 交叉类型
 * 
 * 交叉类型，我们可以理解为合并。其实就是「将多个类型合并为一个类型」
 * 
 * Man & WoMan
 * - 同时是 Man 和 Woman
 * - 同时拥有 Man 和 Woman 这两种类型的成员
 */
interface ObjectConstructor{
    assign<T,U>(target:T,source:U):T & U;
}


/** 
 * 泛型
 * 泛型可以应用于 function、interface、type 或者 class 中。但是注意，「泛型不能应用于类的静态成员」
 */
function log<T>(value: T): T {
    return value;
}

/** 泛型类型、泛型接口 */
type Log = <T>(value: T) => T;
let myLog: Log = log;
interface Log_2<T> {
    (value: T): T
}
let myLog_2: Log_2<number> = log // 泛型约束了整个接口，实现的时候必须指定类型。如果不指定类型，就在定义的之后指定一个默认的类型
myLog(1);


/** 
 * 我们也可以把泛型变量理解为函数的参数，只不过是另一个维度的参数，是代表类型而不是代表值的参数。
 */
// 泛型不能应用于类的静态成员
class Log_3<T> {
    run(value: T) {
        console.log(value)
        return value
    }
}

// 实例化的时候可以显示的传入泛型的类型
let log1 = new Log_3<number>();
log1.run(1);

// 也可以不传入类型参数，当不指定的时候，value 的值就可以是任意的值
let log2 = new Log_3();
log2.run({ a: 1 })

/**
 * 类型约束，需预定义一个接口
 */
interface Length {
    length: number
}

function logAdvance<T extends Length>(value: T): T {
    console.log(value, value.length);
    return value;
}

// 输入的参数不管是什么类型，都必须具有 length 属性
logAdvance([1])
logAdvance('123')
logAdvance({ length: 3 })

// 泛型，在 ts 内部也都是非常常用的，尤其是对于容器类非常常用。