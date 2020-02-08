/**
 * https://juejin.im/post/5e33fcd06fb9a02fc767c427#heading-42
 * 
 * React + TS 项目问题
 */

/** 
 * (1) 使用 import 引入非 JS 模块会报错，而使用 require 则没有问题
 */
import styles from './login.less';
import logo from '@assets/images/logo.svg';

const logo2 = require('@assets/images/logo.svg');
console.log(logo2);// path

/** 
 * 解决办法： 给这些非 JS 模块添加申明
 */
/**
 * style
 */
declare module '*.css';
declare module '*.less';
// declare module "*.less" {
//     const styles: { [className: string]: string };
//     export default styles
// }
declare module '*.scss';


/**
 * 图片
 */
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';

/** 
 * (2)  import * as React from 'react' 和 import React from 'react' 有什么区别
 * 
 * 第一种写法是将所有用 export 导出的成员赋值给 React ，导入后用 React.xxx 访问
 * 第二种写法仅是将默认导出（export default）的内容赋值给 React
 */

/** 
 * (3) 解决 import * as xxx from 'xxx' 这种奇怪的引入方式
 * 
 * - 配置 tsconfig.json
        {
            // 允许 默认导入 没有设置默认导出（export default xxx）的模块
            // 可以以 import xxx from 'xxx' 的形式来引入模块
                "allowSyntheticDefaultImports":true
        }
 *       
    // 配置前
    import * as React from 'react';
    import * as ReactDOM from 'react-dom';

    // 配置后
    import React from 'react';
    import ReactDOM from 'react-dom';
 */

/** 
 * (4) 对 antd 组件库进行按需加载
 * 
 * - 这里使用的是 ts-loader 转译 TS 方案
 */
// .babelrc 
{
    "presets": [
      "@babel/preset-react",
      "@babel/preset-env"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css"
          /* `style: true` 会加载 less 文件*/
        }
      ]
    ]
}
  
// tsconfig.json
{
    "compilerOptions": {
      "target": "es5",
      "jsx": "preserve",// 保留 jsx
       ...
}

// webpack.config.js
{
    test: /\.tsx?$/,
      use: [
        'babel-loader',
        'ts-loader'
      ]
}

/** 
 * (5) 声明通过 React.createRef（）创建的 ref 类型
 */
const ref1:React.RefObject<HTMLDivElement> = React.createRef();
const inputRef = React.createRef<Comp>();

class EditScene extends React.Component<Props> {
	inputRef:React.RefObject<Comp> 
    constructor(props) {
        super(props);
      	this.inputRef = React.createRef<Comp>();
    }
}

/** 
 * (6) 
 */