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
// 源码
// interface RefObject<T> {
//     readonly current: T | null;
// }
const ref1:React.RefObject<HTMLDivElement> = React.createRef();
const inputRef = React.createRef<Comp>();

class EditScene extends React.Component<Props> {
    inputRef:React.RefObject<Comp>;
    
    constructor(props) {
        super(props);
      	this.inputRef = React.createRef<Comp>();
    }
}

/** 
 * (6) react + redux + react-redux 项目：使用 @connect 装饰器正常，但是一旦结合 TS 后，就会报错
 * 具体解决方案： https://segmentfault.com/a/1190000016047027
 */
/** 
 * 在3.0版本之前, 我们在开发 React 应用, 尤其是在配合 redux 一类 HOC 库的时候, 经常用到诸如 connect(TodoList), 
 *    withRouter(TodoList) 之类的封装. 而这些函数其实都可以用装饰器的方式来调用, 比如:
 */
export interface TodoListProps extends RouteComponentProps<{}> {
  todos: Todo[];
}

@withRouter
@connect(mapStateToProps)
export class TodoList extends PureComponent<TodoListProps, {}> {
  render() {
    return null
  }
}

/** 
 * 但是在结合 TypeScript 的时候, 这中间有个问题, 就是装饰器会自动注入一些 props 给组件, 这一部分属性不需要外部传入, 因此是可选的
 * 在strictNullCheck属性开启的时候, 就会出现属性冲突. 因为 TS 不允许装饰器修改被装饰的对象的类型, 因此在 props 定义中为required属性依然为required.
 * 
 * 比如对于上面的例子, 在实例化TodoList这个组件的时候, 必需要传入所有的TodoListProps所定义的属性, 否则会有TS2322错误.
 */

 /** 
  * 而在 TS 3.0 中, 可以声明defaultProps属性来表明某些属性对外部组件而言是可选的. 比如:
  */
@withRouter
@connect((state) => ({ todos: state.todos })
export class TodoList extends PureComponent<TodoListProps, {}> {
  static defaultProps: TodoListProps
  render() {
    return null
  }
}

/** 
 * 这里的static defaultProps: TodoListProps表明, 所有的TodoList的 props TodoListProps 对外部组件都是可选的. 
 * 这就意味着外部组件可以什么属性都不用传也不会有错误. 同时内部而言所有的属性都是NotNullable.
 */

/** 
 * 综上, 通常情况下, 我们的一个组件会有一部分属性由装饰器注入, 而另一部分则需要外部实例化时传入, 
 * 因此, 可以将一个组件的 props 接口声明成两层结构, 第一层为由装饰器注入的部分, 第二层则为完整的属性接口, 然后将defaultProps设置成为第一层接口即可
 */

/** 
 * 需要注意的是:
 * 
 * (1) TypeScript 要 3.0.1以上
 * (2) @types/react 要最新版
 * (3) withRouter, connect 等函数在 @types中, 签名有问题, 需要手动修改一下
 */ 
import { ComponentClass } from 'react'
import {
  connect as nativeConnect,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from 'react-redux'
import { withRouter as nativeWithRouter } from 'react-router'

export type ComponentDecorator<P = any> = <T extends ComponentClass<P>>(WrappedComponent: T) => T

export const connect: <P, S = Todo>(
  mapState: MapStateToPropsParam<Partial<P>, P, S>,
  mapDispatch?: MapDispatchToPropsParam<Partial<P>, P>
) => ComponentDecorator = nativeConnect as any

export const withRouter: ComponentDecorator = nativeWithRouter as any;

/**
 * (7) react + redux + react-redux 项目：在使用 mapStateToProps(state) 函数时，想要给仓库中的 state 声明类型
 * 
 * - 借助 ReturnType
 */
// rootReducer
let reducers = {
    common,
    work,
    setScene,
    evidenceEdit,
    router: connectRouter(history)
};

export type AppState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
};

function mapStateToProps(state: AppState) {
    return {
        work: state.work.id,
        currentScene: state.setScene.currentScene,
        scenes: state.work.scenes
    };
}

@connect(mapStateToProps, {
    // updateSceneData: ....
});

/** 
 * (8) react + redux + react-redux 项目：想要给 action creator 函数声明类型
 */
// 在 Mesh 组件中
import workActions from "@store/actions/work";

interface MeshProps {
    // 刚开始我是这样写的，每次都得在组件的 Props 里重新声明一下函数
    // updateSceneData?: (workId: string,data) => appEditAction;
    updateData?: typeof workActions.updateData;
}

@connect(null, {
  updateData: workActions.updateData,
})
class Mesh extends React.Component<MeshProps> {}

// store/actions/work.ts
import * as types from '../types/action-types';
import {appEditAction} from "@edit-store/actions/common";

export default {
    updateWorkData(workId: string, data: any): appEditAction {
        return {type: types.UPDATE_WORK_ASYNC, payload: {workId, data}}
    }
}

/** 
 * (9) react + redux + react-redux 项目：给 React 组件的 Props 声明类型（较为便捷的方法）
 */
import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {connect} from "@store/connect";
import {AppState} from "@store/reducers";
import commonActions from "@store/actions/commonActions";

// 组件可能有四个属性来源
// 1.mapStateToProps 的返回值
// 2.actions 对象类型
// 3.来自路由
// 4.父组件传进来的其它属性

// 原先的写法：一个个拼起来，mapStateToProps 返回的状态还得在 Props 接口里再声明一遍，比较混乱、麻烦
// interface Props {
//     loadProgress?: number;
//     markVisible?: boolean;
//     setMarkVisible?: typeof commonActions.setMarkVisible;
// }

function mapStateToProps(state: AppState) {
    const {markVisible,loadProgress} = state;
    return {
        markVisible,
        loadProgress,
    };
}

// 现在的写法：便捷
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof commonActions;
interface IParams {}
type RouteProps = RouteComponentProps<IParams>;
type Props = StateProps & RouteProps & DispatchProps & {};

@connect(mapStateToProps, {
    setMarkVisible: commonActions.setMarkVisible
})
export default class App extends React.PureComponent<Props, any> {
    render() {
        const {markVisible, loadProgress} = this.props;
        return (<div > {markVisible} {loadProgress} </div>);
    }
}

/** 
 * (10) react + redux + react-redux 项目：想要给 redux-thunk 声明类型
 * 
 * redux thunk 有一个内置类型 ThunkAction，我们可以这样使用
 */
import { Action } from 'redux'
import { sendMessage } from './store/chat/actions'
import { AppState } from './store'
import { ThunkAction } from 'redux-thunk'

export const thunkSendMessage = (
  message: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const asyncResp = await exampleAPI()
  dispatch(
    sendMessage({
      message,
      user: asyncResp,
      timestamp: new Date().getTime()
    })
  )
}

function exampleAPI() {
  return Promise.resolve('Async')
}

/** 
 * (11) tsconfig-paths-webpack-plugin 这个包会将 tsconfig.json 中的 path 配置项内容映射到 webpack 配置中去，
 *      这样就不需要在 webpack 中的 alias 配置项里配置路径映射
 */
// 查看图片 [tsconfig-paths-webpack-plugin.jpg]

/** 
 * (12) react 函数组件声明
 */
interface Greeting {
  name: string;
  age: number;
}

const Hello:React.FC<Greeting> = (props) => <h1>Hello {props.name}</h1>;
// 推荐使用第二种
const Hello2 = (props:Greeting) => <h1>Hello {props.name}</h1>;

/** 
 * (13) 如何编写 react + ts 版的 HOC
 */
import React, { Component } from 'react';
import HelloClass from './HelloClass';

interface Loading {
  loading: boolean;
}

// HOC 可以接收一个类组件，也可以接收一个函数组件，所以参数的类型是 React.ComponentType
// 源码：type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
function HelloHOC<P>(WrappedComponent: React.ComponentType<P>) {
  return class extends Component<P & Loading> {
      render() {
          const { loading, ...props } = this.props;
          return loading ? <div>Loading...</div> : <WrappedComponent { ...props as P } />;
      }
  }
}

export default HelloHOC(HelloClass);

/** 
 * (14) 快速获取事件处理函数的 event 参数类型
 */
class Login extends React.Component <Props>{
  handlerLinkBtnClick = (ev) => {
      console.log(ev);
      this.props.historyGo('./register');
  };
 
  handlerLinkBtnMouseMove = (ev) => {
     console.log(ev);
  };

  render() {
      return (
          <div>
              <header>
                  <p >This is Login Page </p>
                  <div className={styles.linkBtn}
                       onMouseMove={this.handlerLinkBtnMouseMove} 
                       onClick={this.handlerLinkBtnClick}>
                       Go to Register Page
                 </div>
              </header>
          </div>
      );
  }
}

/** 
 * 按住 Ctrl ，然后鼠标移动到事件名上就能获取当前事件处理函数的参数类型
 * 可以查看[event.jpg]
 */