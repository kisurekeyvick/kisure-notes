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

        关于declare的作用！！！！：
        例如，有一个js库，不是用ts编写的，于是它没有typescript编译器可以检查的类型声明。
              当我运行我的代码时，module来自这个js库，的确存在，同时也可以是console.log它。
              该module对象也有键，例如'module.hot'，
              键可以有值但是VSCode中的TypeScript设计时编译器至少在它下面画出一个红色的波浪形 property 'hot' does not exist

              但它确实存在，要使TypeScript编译器同意，请声明它，就像：declare let module: any

              如果您删除关键字declare，只是写let module: any，它将不会编译说'module' already exists。
 * 
 * (2) 变量
 *      
 */

