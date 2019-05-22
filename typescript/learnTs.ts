/**
 * 使用TS，在编辑器中就会明确的提醒我们 dom_Div 的值可能为 null
 * 
 * 解决：我们并不一定要处理值 null 的情况，使用 const a = document.getElementById(‘id’)! 
 * 可以明确告诉 TS ，它不会是 null，不过至少，这时候我们清楚的知道自己想做什么
 */
const dom_Div: HTMLElement = document.getElementById("#Div")!

/** 
 * @types
 * 
 * (1) 全局 @types
 *      默认情况下，TypeScript 会自动包含支持全局使用的任何定义。例如，对于 jquery，你应该能够在项目中开始全局使用 $。
 * 
 * (2) 模块 @types
 *      安装完之后，不需要特别的配置，你就可以像使用模块一样使用它：
 *      import * as $ from 'jquery';
 * 
 * (3) 控制全局
 *      对于某些团队而言，拥有允许全局泄漏的定义可能是一个问题。
 *      因此，你可以通过配置 tsconfig.json 的 compilerOptions.types 选项，引入有意义的类型。
 * 
        {
            "compilerOptions": {
                "types" : [
                "jquery"
                ]
            }
        }

        通过配置 compilerOptions.types: [ "jquery" ] 后，只允许使用 jquery 的 @types 包，即使这个人安装了另一个声明文件，
        比如 npm install @types/node，它的全局变量（例如 process）也不会泄漏到你的代码中，直到你将它们添加到 tsconfig.json 类型选项。
 */

/** 
 * 环境声明
 * 
 * (1) 声明文件
 *      你可以通过 declare 关键字，来告诉 TypeScript，你正在试图表述一个其他地方已经存在的代码。
 *      例如：写在 JavaScript、CoffeeScript 或者是像浏览器和 Node.js 运行环境里的代码

        declare var foo: any;
        foo = 123; // allow

        你可以选择把这些声明放入 .ts 或者 .d.ts 里。在你实际的项目里，我们强烈建议你应该把声明放入 .d.ts 里。
        如果一个文件有扩展名 .d.ts，这意味着每个顶级的声明都必须以 declare 关键字作为前缀。
        这有利于向作者说明，在这里 TypeScript 将不会把它编译成任何代码，同时他需要确保这些在编译时存在。
 * 
 * (2) 变量
 *      
 */

 /** 
  * 2.1 接口
  */
/** 第一个使用内联注解 */
declare const myPoint1: { x: number; y: number };

/** 第二个使用接口 */
interface Point {
  x: number;
  y: number;
}

declare const myPoint2: Point;

/** 
 * 使用接口方式定义类型的好处在于：如果有人创建了一个基于 myPoint 的库来添加新成员, 
 *      他们可以轻松将此成员添加到 myPoint 的现有声明中。
 * 
 * 因为 TypeScript 接口是开放式的，这是 TypeScript 的一个重要原则，它允许你使用接口模仿 JavaScript 的可扩展性。
 */
interface Point {
    x: number,
    y: number
}

declare const myPoint3: Point;

interface Point {
    z: number
}

myPoint3.z

/** 
 * 2.2 类也可以实现接口
 * 如果你希望在类中使用必须遵循的接口（类）或是别人定义的对象结构，可以使用 implements 关键字来确保兼容性。
 * implements 限制了类实例的结构。
 *  类似：let foo: Person = new Me();
 */
interface Person {
    age: number;
    weight: number;
}

class Me implements Person {
    age: number;
    weight: number;
}
