/** 
 * readonly
 */
function foo(config: { readonly bar: number, readonly bas: number }) {
    // 此处不能修改，因为bar属性是只读的
    config.bar = 666;
}

const config = { bar: 123, bas: 456 };

foo(config);

/** 
 * interface 和 type 里使用 readonly
 */
type Foo = {
    readonly bar: number;
    readonly bas: number;
};

// 初始化
const foo_2: Foo = { bar: 123, bas: 456 };
foo_2.bar = 666;    // 此处不能修改，因为bar属性是只读的

/** 
 * 你也能指定一个类的属性为只读，然后在声明时或者构造函数中初始化它们
 */
class Foo_class_2 {
    readonly bar = 1;
    readonly baz:string;
    constructor() {
        this.baz = '123';
    }
}

/** 
 * 这有一个 Readonly 的映射类型，它接收一个泛型 T，用来把它的所有属性标记为只读类型
 */
type Foo_type_2 = {
    bar: number;
    bas: number;
};

type FooReadonly = Readonly<Foo_type_2>;

const foo_3: Foo_type_2 = { bar: 123, bas: 456 };

/** 
 * 如果你想以不变的方式使用原生 JavaScript 数组，可以使用 TypeScript 提供的 ReadonlyArray<T> 接口
 */
let foo_arr_num: ReadonlyArray<number> = [1, 2, 3];
foo_arr_num.push(5);    // 这一步报错，因为ReadonlyArray 上不存在 `push`，因为他会改变数组
const concatArr = foo_arr_num.concat(4);    // [1,2,3,4]  

/** 
 * 自动推断
 * 在一些情况下，编译器能把一些特定的属性推断为 readonly，
 * 例如在一个 class 中，如果你有一个只含有 getter 但是没有 setter 的属性，他能被推断为只读
 */
class Person {
    firstName: string = 'John';
    lastName: string = 'Doe';
  
    get fullName() {
      return this.firstName + this.lastName;
    }
}

const person = new Person();
person.fullName = 'Dear Reader'; // Error, fullName 只读

/** 
 * const 和 readyonly
 * 
 * (1)const
 *      用于变量
 *      变量不能重新赋值给其他任何事物
 * 
 * (2)readonly
 *      用于属性
 *      用于别名，可以修改属性
 */
const foo_4 = 123;  // 变量
let bar : {
    readonly k: number; // 属性
};

const foo_5: {
    readonly k: number
} = {
    k: 123
};

function i(foo: {k: number}) {
    foo.k = 456;
}

i(foo_5);

console.log(foo_5.k);   // 456

/**
 * 根据上述：readonly 能确保“我”不能修改属性，但是当你把这个属性交给其他并没有这种保证的使用者
 *          （允许出于类型兼容性的原因），他们能改变它。
 *          当然，如果 i方法 明确的表示，他们的参数不可修改，那么编译器会发出错误警告：
 */
