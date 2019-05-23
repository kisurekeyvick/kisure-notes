/** 
 * 类型断言
 * 
 * TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。
 * TypeScript 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误。
 */

// 类型断言的一个常见用例是当你从 JavaScript 迁移到 TypeScript 时
interface Foo {
    bar: number;
    bas: string;
}

const foo = {} as Foo;
foo.bar = 1;
foo.bas = 'kisure';

/** 
 * 最初的断言语法如下所示：
    let foo: any;
    let bar = <string>foo;    

    但是当你在 JSX 中使用 <foo> 的断言语法时，这会与 JSX 的语法存在歧义
    let foo = <string>bar;</string>;
 */

/** 
 * 双重断言
 */
function handler(event: Event) {
    // 报错了，因为'Event' 和 'HTMLElement' 中的任何一个都不能赋值给另外一个
    // const element = event as HTMLElement;
    const element = (event as any) as HTMLElement;
    console.log(element);
}

/** 
 * ts是怎么确定单个断言是否足够？
 * 当S类型是T类型的子集，或者T类型是S类型的子集时，S 能被成功断言成 T。
 */
