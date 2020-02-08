/** 
 * https://juejin.im/post/5e33fcd06fb9a02fc767c427#heading-40
 * 
 * 关于tsconfig.json的配置
 */

/**
 * (1) 三种 JSX 模式
 * 
 * - 在 TS 中想要使用 JSX 必须做两件事:
 *      给文件一个 .tsx 扩展名
 *      启用 jsx 选项
 * 
 * - TS 具有三种 JSX 模式：preserve，react 和 react-native，这些模式只在代码生成阶段起作用，类型检查并不受影响。
 *      preserve 模式下： 不会将 JSX 编译成 JS，生成代码中会保留 JSX，以供后续的转换操作使用（比如：Babel）。 另外，输出文件会带有 .jsx 扩展名。
 *      react 模式下： 直接将 JSX 编译成 JS，会生成 React.createElement 的形式，在使用前不需要再进行转换操作了，输出文件的扩展名为 .js。
 *      react-native 模式下： 相当于 preserve，它也保留了所有的 JSX，但是输出文件的扩展名是 .js。
 * 
        模式                输入                输出                            输出文件扩展名
        preserve            <div />             <div />                         .jsx
        react               <div />             React.createElement("div")      .js
        react-native        <div />             <div />                         .js
 */

/** 
 * (2) "lib" 配置项需要注意的问题
 * 
 * - 当你安装 TypeScript 时，会顺带安装 lib.d.ts 等声明文件，此文件包含了 JavaScript 运行时以及 DOM 中存在各种常见的环境声明。
 *      它自动包含在 TypeScript 项目的编译上下文中
 *      它能让你快速开始书写经过类型检查的 JavaScript 代码
 * 
 * - tsconfig.json 中的 lib 选项用来指定当前项目需要注入哪些声明库文件。如果没有指定，默认注入的库文件列表为：
 *      当 --target ES5：DOM,ES5,ScriptHost
 *      当 --target ES6：DOM,ES6,DOM.Iterable,ScriptHost
 * 
 * - 如果在 TS 中想要使用一些 ES6 以上版本或者特殊的语法，就需要引入相关的类库。如：ES7 、 DOM.Iterable
 */ 

/** 
 * (3) 指定 target 为 es6 时，tsc 就会默认使用 "classic" 模块解析策略，
 *      这个策略对于 import * as abc from "@babel/types" 这种非相对路径的导入，不能正确解析。
 *  
 * 解决方法：指定解析策略为 node => "moduleResolution": "node"。
 */

/** 
 * (4) "esModuleInterop" 具体作用是什么
 * 
 * - TypeScript 为了兼容，引入了 esModuleInterop 选项，设置 esModuleInterop 为 true ，
 *      在编译时自动给该模块添加 default 属性，就可以通过 import moduleName from 'xxx' 的形式导入 非 ES6 模块，
 *      不再需要使用 import moduleName = require('xxx') 的形式。
 * 
 * - 如果一个模块遵循 ES6 模块规范，当默认导出内容时（export default xxx），ES6 模块系统会自动给当前模块的顶层对象加上一个 default 属性，
 *      指向导出的内容。当一个 ES6 模块引入该模块时（import moduleName from 'xxx'），
 *      ES6 模块系统默认会自动去该模块中的顶层对象上查找 default 属性并将值赋值给 moduleName。
 *      而如果一个非 ES6 规范的模块引入 ES6 模块直接使用时（var moduleName = require('xxx')），就会报错，需要通过  moduleName.default 来使用。
 */ 

/** 
 * (5) "allowSyntheticDefaultImports" 具体作用是什么
 * 
 * - 允许 默认导入 没有设置默认导出（export default xxx）的模块，可以以 import xxx from 'xxx' 的形式来引入模块
 */
// 配置前
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// 配置后
import React from 'react';
import ReactDOM from 'react-dom';

/** 
 * (6) "paths" 配置路径映射集合时，需要注意的问题
 * 
 * - 
    {
        "paths": {
            // 这里的路径后面必须跟着 "/*"
            "@public/*": [
                // 这里的路径后面必须跟着 "/*"
                "public/*"
            ],
            "@src/*": [
                "src/*"
            ],
            "@assets/*":[
                "src/assets/*"
            ],
            "@components/*": [
                "src/components/*"
            ]
        }
    }
 */

/** 
 * (7) "allowJs" 时需要注意的问题
 * 
 * 设置 "allowJs": false ：在 .ts / .tsx 文件中引入 .js / .jsx 文件时，就不会有相关提示
 */
