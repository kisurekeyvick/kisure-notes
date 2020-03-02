/**
 * https://juejin.im/post/5c2f87ce5188252593122c98
 * 
 * TypeScript 强大的类型别名
 */

/** -------------------- 关键字 ----------------------- */

/** 
 * (1)          
 * 
 * extends 可以用来继承一个类，也可以用来继承一个 interface，但还可以用来判断有条件类型
 * T extends U ? X : Y;
 * 
 * 上面的类型意思是，若 T 能够赋值给 U，那么类型是 X，否则为 Y
 */
// 下面举个栗子
type Words = 'a'|'b'|"c";
type W<T> = T extends Words ? true : false;
type WA = W<'a'>; // -> true
type WD = W<'d'>; // -> false

// a 可以赋值给 Words 类型，所以 WA 为 true，而 d 不能赋值给 Words 类型，所以 WD 为 false。


/** 
 * (2) typeof
 * 
 * 在 JS 中 typeof 可以判断一个变量的基础数据类型，在 TS 中，它还有一个作用，
 * 就是获取一个变量的声明类型，如果不存在，则获取该类型的推论类型
 */
// 下面举个栗子
interface Person {
    name: string;
    age: number;
    location?: string;
}

const jack: Person = { name: 'jack', age: 100 };
type IJack = typeof jack;
const jacp_copy: IJack = {
    name: '123',
    age: 22
}; 

function foo(x: number): Array<number> {
    return [x];
}
  
type F = typeof foo; // -> (x: number) => number[]


/** 
 * (3) keyof
 * 
 * keyof 可以用来取得一个对象接口的所有 key 值
 */
type K1 = keyof Person; // type K1 = "name" | "age" | "location"
type K2 = keyof Person[];
type K3 = keyof { [x: string]: Person }; // string | number


/** 
 * (4) in
 * 
 * in 可以遍历枚举类型
 */
// 上面 in 遍历 Keys，并为每个值赋予 any 类型。
type Keys = "a" | "b";
type Obj =  {
    [p in Keys]: any
} // -> { a: any, b: any }


/** 
 * (5) infer
 * 
 * 在条件类型语句中, 可以用 infer 声明一个类型变量并且对它进行使用
 */
// ReturnType的源码
// type ReturnType<T> = T extends (
//     ...args: any[]
//   ) => infer R
//     ? R
//     : any;

/** 
 * 上面 T extends U ? X : Y 的形式为条件类型（Conditional Types），即，如果类型 T 能够赋值给类型 U，
 * 那么该表达式返回类型 X，否则返回类型 Y。所以，考察 ReturnType的定义，
 * 
 * type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
 * 
 * 如果传入的类型 T 能够赋值给 (...args: any) => R 则返回类型 R
 * 但是这里类型 R 从何而来？讲道理，泛型中的变量需要外部指定，即 RetrunType<T,R>，但我们不是要得到 R 么，所以不能声明在这其中
 * 这里 infer 便解决了这个问题。
 * 
 * 表达式右边的类型中，加上 infer 前缀我们便得到了反解出的类型变量 R，配合 extends 条件类型，
 * 可得到这个反解出的类型 R。这里 R 即为函数 (...args: any) => R 的返回类型
 */

// 举个例子
type PromiseType<T> = (args: any[]) => Promise<T>;
type UnPromisify<T> = T extends PromiseType<infer U> ? U : never;


/** -------------------- 内置类型别名 ----------------------- */

/** 
 * (6) Partial
 * 
 * Partial 的作用就是可以将某个类型里的属性全部变为可选项"?"
 * 
 * 从源码可以看到 keyof T 拿到 T 所有属性名, 然后 in 进行遍历, 将值赋给 P, 
 * 最后 T[P] 取得相应属性的值. 结合中间的 ?，将所有属性变为可选.
 */
/** 
 * 源码：
    type Partial<T> = {
        [P in keyof T]?: T[P];
    };
 */


/** 
 * (7) Required
 * 
 * Required 的作用刚好跟 Partial 相反，Partial 是将所有属性改成可选项，Required 则是将所有类型改成必选项
 * 
 * 其中 -? 是代表移除 ? 这个 modifier 的标识
 * 与之对应的还有个 +? , 这个含义自然与 -? 之前相反, 它是用来把属性变成可选项的，+ 可省略，见 Partial。
 */
/** 
 * 源码：
    type Required<T> = {
        [P in keyof T]-?: T[P];
    };
 */


/** 
 * (8) Readonly
 * 
 * 这个类型的作用是将传入的属性变为只读选项。
 * 
 * 给子属性添加 readonly 的标识，如果将上面的 readonly 改成 -readonly， 就是移除子属性的 readonly 标识。
 */
/** 
 * 源码
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    };
 */  


/** 
 * (9) Pick
 * 
 * 这个类型则可以将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型
 */ 
/** 
 * 源码
    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };
 */
// 举个例子
type IMe = Pick<Person, 'name' | 'age'>;
const me: IMe = {
    name: 'kisure',
    age: 27
};


/** 
 * (10) Record
 * 
 * 该类型可以将 K 中所有的属性的值转化为 T 类型
 */
/** 
 * 源码
    type Record<K extends keyof any, T> = {
        [P in K]: T;
    };
 */
// 举个例子
type IRecord = Record<'name' | 'age', string>;
const curRecord: IRecord = {
    name: 'kisure',
    age:'123'
};
type T11 = Record<'a' | 'b' | 'c', Person>; // { a: Person; b: Person; c: Person; }


/** 
 * (11) Exclude
 * 
 * 将某个类型中属于另一个的类型移除掉
 * 
 * 如果 T 能赋值给 U 类型的话，那么就会返回 never 类型，否则返回 T，最终结果是将 T 中的某些属于 U 的类型移除掉
 */
/** 
 * 源码
    type Exclude<T, U> = T extends U ? never : T;
 */
// 举个例子
type T00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; //  // -> 'b' | 'd'


/** 
 * (12) Extract
 * 
 * Extract 的作用是从 T 中提取出 U
 */
/**
 * 源码
    type Extract<T, U> = T extends U ? T : never;
 */
type T01 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;  // -> 'a' | 'c'


/** 
 * (13) ReturnType
 * 
 * 该类型的作用是获取函数的返回类型
 */
// type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;
// 实际使用的话，就可以通过 ReturnType 拿到函数的返回类型
function foo_2(x: number): Array<number> {
    return [x];
}

type IFunc = ReturnType<typeof foo_2>;  // number[]


/** 
 * (14) ThisType
 * 
 * 这个类型是用于指定上下文对象类型的
 */
/** 
 * 源码
 * interface ThisType<T> { }
 */
// 举个例子
// 这样的话，就可以指定 obj 里的所有方法里的上下文对象改成 Person 这个类型了
interface Person_K {
    name: string;
    age: number;
}

const obj: ThisType<Person_K> = {
    say(){
        console.log(this.name)
    }
};


/** 
 * (15) InstanceType
 * 
 * 该类型的作用是获取构造函数类型的实例类型
 */
/** 
 * 源码:
 *  type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;
 */
// 举个例子
class C {
    constructor(public x: number, public y: string) {

    }
}

type T20 = InstanceType<typeof C>;  //C
const T20_fields: T20 = {
    x: 1,
    y: '123'
};

type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // any
// type T23 = InstanceType<string>;  // Error
// type T24 = InstanceType<Function>;  // Error


/** 
 * (16) NonNullable
 * 
 * 这个类型可以用来过滤类型中的 null 及 undefined 类型
 */
/** 
 * 源码：
 *      type NonNullable<T> = T extends null | undefined ? never : T;
 */
// 举个例子
type T222 = string | number | null;
type T232 = NonNullable<T222>; // -> string | number;


/** 
 * (17) Parameters
 * 
 * 该类型可以获得函数的参数类型组成的元组类型
 */
/** 
 * 源码:
 *      type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;
 */
// 举个例子
function foo_3(x: number): Array<number> {
    return [x];
  }
  
type P = Parameters<typeof foo_3>; // -> [number]
  

/** 
 * (18) ConstructorParameters
 * 
 * 该类型的作用是获得类的参数类型组成的元组类型
 */
/**
 * 源码:
 *      type ConstructorParameters<T extends (...args: any[]) => any> = T extends new (...args: infer P) => any ? P: never;
 */


// 举个栗子
class Person_2 {
  private firstName: string;
  private lastName: string;
  
  constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
  }
}

type P_2 = ConstructorParameters<typeof Person_2>; // -> [string, string]


/** -------------------- 自定义类型别名 ----------------------- */
/** 
 * (19) Omit
 * 
 * 有时候我们想要继承某个接口，但是又需要在新接口中将某个属性给 overwrite 掉，
 * 这时候通过 Pick 和 Exclude 就可以组合出来 Omit，用来忽略对象某些属性功能
 */
type Omit_demo<T, K> = Pick<T , Exclude<keyof T, K>>;

// 使用
type Foo = Omit<{name: string, age: number}, 'name'>; // -> { age: number }


/** 
 * (20) Mutable
 * 
 * 将 T 的所有属性的 readonly 移除
 */
type Mutable<T> = {
    -readonly [P in keyof T]: T[P]
}


/** 
 * (21) PowerPartial
 * 
 * 内置的 Partial 有个局限性，就是只支持处理第一层的属性，如果是嵌套多层的就没有效果了，不过可以如下自定义
 */
type PowerPartial<T> = {
    [U in keyof T]?: T[U] extends object ? PowerPartial<T[U]> : T[U]
}


/** 
 * (22) Proxify
 * 
 * 为 T 的属性添加代理
 */
type Proxify<T> = {
    [P in keyof T]: {
        get(): T[P];
        set(v: T[P]): void;
    }
};
