/** 
 * 函数
 */

/** 
 * 参数注解
 * 这里我们使用了内联类型注解
 */
// variable annotation
let sampleVariable: { bar: number };
// function parameter annotation
function foo(sampleParameter: { bar: number }) {}

/** 
 * 返回类型注解
 */
interface Foo {
    foo: string;
}

function foo1(sample: Foo): Foo {
    return sample;
}

/** 
 * 书写完整函数类型
 * 函数类型包含两部分：参数类型和返回值类型。 当写出完整函数类型的时候，这两部分都是需要的。 
 * 我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。
 */
type func = (x: number, y: number)=> number;
let myAdd:func = (x: number, y: number): number => x + y;

/**
 * 函数重载
 */
interface Overloaded {
    (foo: string): string;
    (foo: number): number;
}

function stringOrNumber(foo: string):string;
function stringOrNumber(foo: number):number;
function stringOrNumber(foo: any):any {
    if (typeof foo === 'number') {
        return foo * foo;
    } else if (typeof foo === 'string') {
        return `hello ${foo}`;
    }
}

const overloaded:Overloaded = stringOrNumber;
console.log(overloaded('kisure'));
console.log(overloaded(12));

/** 
 * 箭头函数
 */
const simple: (foo: number) => string = foo => foo.toString();
