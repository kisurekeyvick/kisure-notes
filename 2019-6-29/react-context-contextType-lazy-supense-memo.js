/** 
 * https://juejin.im/post/5d0043915188255e780b6309
 * 
 * React 新特性讲解及实例
 * 
 * 以下几个新的特性：
 *      Context
 *      ContextType
 *      lazy
 *      Suspense
 *      错误边界（Error boundaries）
 *      memo
 */

/** 
 * Context
 * 
 * Context 提供了一种方式，能够让数据在组件树中传递而不必一级一级手动传递。
 * 首先要有一个 Context 实例对象，这个对象可以派生出两个 React 组件，分别是 Provier 和 Consumer。
 * Provider 接收一个 value 属性，这个组件会让后代组件统一提供这个变量值。当然后代组件不能直接获取这个变量，因为没有途径。
 * 所以就衍生出 Consumer 组件，用来接收 Provier 提供的值。
 * 
 * 一个 Provider 可以和多个消费组件有对应关系。多个 Consumer 也可以嵌套使用，里层的会覆盖外层的数据。
 * 
 * 因此对于同一个 Context 对象而言，Consumer 一定是 Provier 后代元素。
 * 
 * 创建 Contect 方式如下：
 * const MyContext = React.createContext(defaultValue?);
 * 
 * 实例：
    import React, {createContext, Component} from 'react';

    const BatteryContext = createContext();

    class Leaf extends Component {
        render() {
            return (
                <BatteryContext.Consumer>
                    {
                        battery => <h1>Battery: {battery}</h1>
                    }
                </BatteryContext.Consumer>
            );
        }
    }

    // 为了体现层级多的关系，增加一层 Middle 组件
    class Middle extends Component {
        render() {
            return <Leaf />
        }
    }

    class App extends Component {
        render () {
            return (
                <BatteryContext.Provider value={60}>
                    <Middle />
                </BatteryContext.Provider>
            )
        }
    }

    export default App;

    当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。
    Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

    我们在看下 Consumer 里面的实现。由于 Consumer 特性，里面的 JSX 必须是该 Consumer 的回返值。
    我们希望在整个 JSX 渲染之前就能获取 battery 的值。所以 ContextType 就派上用场了。这是一个静态变量：

    class Leaf extends Component {
        static contextType = BatteryContext;

        render() {
            const battery = this.context;
            
            return (
                <h1>Battery: {battery}</h1>
            );
        }
    }

    挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。
    这能让你使用 this.context 来消费最近 Context 上的那个值。
    你可以在任何生命周期中访问到它，包括 render 函数中。
 */

/** 
 * https://juejin.im/post/5c60e1d2f265da2dd16843f6
 * 
 * React.lazy() 是什么？
 * 
 * 这项新功能使得可以不借助任何附加库就能通过代码分割（code splitting）延迟加载 react 组件。
 * 延迟加载是一种优先渲染必须或重要的用户界面项目，而将不重要的项目悄然载入的技术。这项技术已经被完全整合进了 react 自身的核心库中。
 * 之前我们要用 react-loadable 达到这一目的，但现在用 react.lazy() 就行了。
 */

/** 
 * Suspense 挂起组件
 * 
 * Suspense 是一个延迟函数所必须的组件，通常用来包裹住延迟加载组件。多个延迟加载的组件可被包在一个 suspense 组件中。
 * 它也提供了一个 fallback 属性，用来在组件的延迟加载过程中显式某些 react 元素。
 * 
    加载多个延迟组件：
    import React, { lazy, Suspense } from ‘react’;
    import ReactDOM from ‘react-dom’;
    import ‘./index.css’;
    const Artists = lazy(() => import(‘./Artists’));
    const Performers = lazy(() => import(‘./Performers’));

    class App extends React.Component {
        render(){
            return(
                <div className=”App”>
                    <Suspense fallback={<h1>Still Loading…</h1>}>
                    <Artists />
                    <Performers />
                    </Suspense>
                </div>
            );
        }
    }

    ReactDOM.render(<App />, document.getElementById(‘root’));
 */

/** 
 * 延迟和挂起为何重要？
 * 
 * 首先，打包工具将所有代码组件相继归纳到一个 javascript 块中，并将其传递给浏览器；
 * 但随着应用增长，我们注意到打包的体积也与日俱增。这会导致应用因为加载慢而难以使用。
 * 借助代码分割，代码包能被分割成更小的块，最重要的块先被加载，而其余次要的则延迟加载。
 * 同时，我们知道构建应用的一个最佳实践是：应该考虑到用户在使用移动互联网数据和其他慢速网络连接时的情况。
 * 作为开发者就应该在哪怕是在资源读取到 DOM 中的挂起阶段也能控制好用户体验。
 */

/** 
 * lazy 和 Supense 的使用
 * 
 * React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。
 * 
 * 例如： 首先声明一个 About 组件
    import React, {Component} from 'react'

    export default class About extends Component {
        render () {
            return <div>About</div>
        }
    }  

    、、、、然后在 APP 中使用 lazy 动态导入 About 组件：
    import React, {Component, lazy, Suspense} from 'react'

    const About = lazy(() => import('./About.jsx'))；

    class App extends Component {
        render() {
            return (
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <About></About>
                    </Suspense>
                </div>
            );
        }
    }

    、、、、这里需要注意的是，如果没有Suspense，那么在App 渲染完成后，包含 About 的模块还没有被加载完成。
           React 不知道当前的 About 该显示什么。于是就会报错
                解决的办法就是，我们可以使用加载指示器为此组件做优雅降级。这里我们使用 Suspense 组件来解决。 只需将异步组件 About 包裹起来即可
           fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。
           你甚至可以用一个 Suspense 组件包裹多个异步组件。

  
    export default App;
 */

/** 
 * 错误边界（Error boundaries）
 * 
 * 如果模块加载失败（如网络问题），它会触发一个错误。你可以通过错误边界技术来处理这些情况，以显示良好的用户体验并管理恢复事宜。
 * 
 * 如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。
 * 
 * 当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。
 * 
    class App extends Component {
        state = {
            hasError: false,
        }

        static getDerivedStateFromError(e) {
            return { hasError: true };
        }

        render() {
            if (this.state.hasError) {
                return <div>error</div>
            }

            return (
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                    <About></About>
                    </Suspense>
                </div>
            );
        }
    }
 */

/** 
 * PureComponent
 * 
 * PureComponent提供了现层的对比逻辑,但是只有传入属性本身的对比，属性的内部发生了变化，它就搞不定了
 */

/** 
 * React.memo 
 * 
 * React.memo 为高阶组件。它与 React.PureComponent 非常相似，但它适用于函数组件，但不适用于 class 组件。
 * 
    function Foo (props) {
        console.log('Foo render');
        return <div>{props.person.age}</div>;
    }

    使用memo：
    const Foo = memo(function Foo (props) {
        console.log('Foo render');
        return <div>{props.person.age}</div>;
    });

    这样，如果从外部传入进来的props没有发生变化，那么memo就能够避免函数式组件进行渲染。
 */
