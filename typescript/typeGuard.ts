/** 
 * 类型保护
 */

/** 
 * typeof
 * TypeScript 熟知 JavaScript 中 instanceof 和 typeof 运算符的用法
 */
function doSome(x: number | string) {
    if (typeof x === 'string') {
        // 在这个块中，TypeScript 知道 `x` 的类型必须是 `string`
    }

    x.substr(1); // Error: 无法保证 `x` 是 `string` 类型
}

/** 
 * instanceof
 */
class Foo {
    foo = 123;
    common = '123';
}
  
class Bar {
    bar = 123;
    common = '123';
}

function doStuff(arg: Foo | Bar) {
    if (arg instanceof Foo) {
        //
    }

    if (arg instanceof Bar) {
        //
    }
}

doStuff(new Foo());
doStuff(new Bar());

// ts甚至能够理解 else。当你使用if来缩小类型时，TypeScript 知道在其他块中的类型并不是if中的类型
function doStuff_2(arg: Foo | Bar) {
    if (arg instanceof Foo) {
        //
    } else {
        //
    }
}

/** 
 * in
 * in 操作符可以安全的检查一个对象上是否存在一个属性，它通常也被做为类型保护使用
 */
interface A {
    x: number;
}
  
interface B {
    y: string;
}
  
function doStuff_3(q: A | B) {
    if ('x' in q) {
      // q: A
    } else {
      // q: B
    }
}
