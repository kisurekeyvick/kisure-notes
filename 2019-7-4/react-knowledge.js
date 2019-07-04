/** 
 * https://juejin.im/post/5cef9e63e51d4555e372a590#heading-12
 * 
 * 声明式编程 vs 命令式编程
 * 
 * (1) 声明式编程
 *    声明式编程是一种编程范式，它关注的是你要做什么，而不是如何做。它表达逻辑而不显式地定义步骤。
 *    这意味着我们需要根据逻辑的计算来声明要显示的组件。它没有描述控制流步骤。典型的是html，sql
 * 
 *    例如：
        <div>
            <p>Declarative Programming</p>
        </div>
 * 
 * (2) 命令式编程
 *     声明式编程的编写方式描述了应该做什么，而命令式编程描述了如何做，
 * 
    案例：
    const numbers = [1,2,3,4,5];

    // 声明式           使用声明式map函数，让编译器来完成其余的工作
    const doubleWithDec = numbers.map(number => number * 2);

    // 命令式           使用命令式，需要编写所有的流程步骤
    const doubleWithImp = [];
    for(let i=0; i<numbers.length; i++) {
        const numberdouble = numbers[i] * 2;
        doubleWithImp.push(numberdouble)
    }
 */

/** 
 * 函数式编程
 * 
 * 函数式编程是声明式编程的一部分。javascript中的函数是第一类公民，
 * 这意味着函数是数据，你可以像保存变量一样在应用程序中保存、检索和传递这些函数。
 * 
 * 函数式编程有些核心的概念，如下：
 * (1) 不可变性
 *      不可变性意味着不可改变。 在函数式编程中，你无法更改数据，也不能更改。 
 *      如果要改变或更改数据，则必须复制数据副本来更改。
 * 
        例如：
            let student = {
                firstName: "testing",
                lastName: "testing",
                marks: 500
            }

            function changeName(student) {
                // student.firstName = "testing11" //should not do it
                let copiedStudent = Object.assign({}, student);
                copiedStudent.firstName = "testing11";
                return copiedStudent;
            }

            console.log(changeName(student));

            console.log(student);

 * (2) 纯函数
 *      纯函数是始终接受一个或多个参数并计算参数并返回数据或函数的函数，它没有副作用。
 *      使用纯函数，它接受参数，基于参数计算，返回一个新对象而不修改参数。
 * 
        let student = {
            firstName: "testing",
            lastName: "testing",
            marks: 500
        }

        // 纯函数
        function appendAddress(student) {
            let copystudent = Object.assign({}, student);
            copystudent.address = {streetNumber:"0000", streetName: "first", city:"somecity"};
            return copystudent;
        }

        console.log(appendAddress(student));
        console.log(student);
 * 
 * (3) 数据转换
 *      let cities = ["irving", "lowell", "houston"];
 * 
 *      I:使用join('a').split('a')的方式，将数组clone出来
 *          例如：var a = cities.join('a').split('a');
 *                a === cities  // false
 * 
 *      II:使用filter
 *          const citiesI = cities.filter(city => city[0] === "i");
 * 
 *      III:使用map
 *          const citiesC = cities.map(city => city.toUpperCase());
 * 
 * (4) 高阶函数
 *      Array.map，Array.filter和Array.reduce是高阶函数，因为它们将函数作为参数。
 * 
 * (5) 递归
 *      递归是一种函数在满足一定条件之前调用自身的技术。只要可能，最好使用递归而不是循环。
 *      你必须注意这一点，浏览器不能处理太多递归和抛出错误。
 * 
 * (6) 组合
 *      在React中，我们将功能划分为小型可重用的纯函数，我们必须将所有这些可重用的函数放在一起，最终使其成为产品。 
 *      将所有较小的函数组合成更大的函数，最终，得到一个应用程序，这称为组合。
 */

/** 
 * 什么是Virtual DOM及其工作原理
 * 
 * React 使用 Virtual DOM 来更新真正的 DOM，从而提高效率和速度。
 * 
 * (1) 什么是虚拟dom
 *      虚拟DOM只不过是真实 DOM 的 javascript对象表示。
 * 
 *      当涉及到SPA应用程序时，首次加载index.html，并在index.html本身中加载更新后的数据或另一个html。
 *      当用户浏览站点时，我们使用新内容更新相同的index.html。
 *      每当DOM发生更改时，浏览器都需要重新计算CSS、进行布局并重新绘制web页面。
 * 
 * (2) 虚拟dom是如何工作的
 *      React将整个DOM副本保存为虚拟DOM
 *      每当有更新时，它都会维护两个虚拟DOM，以比较之前的状态和当前状态，并确定哪些对象已被更改。 例如，段落文本更改为更改。
 *      它通过比较两个虚拟DOM 差异，并将这些变化更新到实际DOM
 *      一旦真正的DOM更新，web的UI也会更新
 */

/** 
 * 组件和不同类型
 * 
 * (1) 受控组件
 *  受控组件是在 React 中处理输入表单的一种技术。
 *  表单元素通常维护它们自己的状态，而react则在组件的状态属性中维护状态。
 *  我们可以将两者结合起来控制输入表单。这称为受控组件。因此，在受控组件表单中，数据由React组件处理。
 * 
 *  也就是说：有一个输入项，每一次输入都会调用change方法，这个change方法会捕捉到输入的数据并将其放入状态，然后
 *  就能够在handleSubmit（提交的方法）中提交数据。
 * 
 * (2) 非受控组件
 *  大多数情况下，建议使用受控组件。有一种称为非受控组件的方法可以通过使用Ref来处理表单数据。
 *  在非受控组件中，Ref用于直接从DOM访问表单值，而不是事件处理程序。
 * 
    例如：
    export class ToDoForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {value: ''};
            this.input = React.createRef();
        
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        handleSubmit(event) {
            alert('A name was submitted: ' + this.input.current.value);
            event.preventDefault();
        }

        render() {
            return (
                <div>
                    <input ref={this.input}>
                    <button onClick={this.handleSubmit}></button>
                </div>
            )
        }
    }

 *  (3) 容器组件
  * 容器组件是处理获取数据、订阅 redux 存储等的组件。它们包含展示组件和其他容器组件，但是里面从来没有html。
  *   
  * (4) 高阶组件
  * 高阶组件是将组件作为参数并生成另一个组件的组件。 Redux connect是高阶组件的示例。 这是一种用于生成可重用组件的强大技术。
  * 
  * (5) 什么是PropTypes
  *     PropTypes为组件提供类型检查
 */

/** 
 * https://segmentfault.com/a/1190000016617400#articleHeader2
 * https://juejin.im/post/5ae6cd96f265da0b9c106931
 * 
 * react的生命周期
 * 
 * Mounting（加载阶段：涉及4个钩子函数）
        constructor()
            加载的时候调用一次，可以初始化state

        static getDerivedStateFromProps(props, state)
            组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；
            每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state；
            配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法

            重点：返回null则不更新state,如果props满足相应的条件,则可以返回对应的state

            新版本案例：
            static getDerivedStateFromProps(nextProps, prevState) {
                if (nextProps.translateX !== prevState.translateX) {
                    return {
                        translateX: nextProps.translateX,
                    };
                }
                return null;
            }

            旧版本的案例(componentWillReceiveProps):
            componentWillReceiveProps(nextProps) {	
                if (nextProps.translateX !== this.props.translateX) {
                    this.setState({	
                        translateX: nextProps.translateX,	
                    });	
                }	
            }

            关于react官方将 componentWillReceiveProps 丢弃的原因：
                在老版本的 React 中，如果组件自身的某个 state 跟其 props 密切相关的话，一直都没有一种很优雅的处理方式去更新 state，
            而是需要在 componentWillReceiveProps 中判断前后两个 props 是否相同，如果不同再将新的 props 更新到相应的 state 上去。
            这样做一来会破坏 state 数据的单一数据源，导致组件状态变得不可预测，另一方面也会增加组件的重绘次数。
                在 componentWillReceiveProps 中，我们一般会做以下两件事，一是根据 props 来更新 state，二是触发一些回调，
            如动画或页面跳转等。在老版本的 React 中，这两件事我们都需要在 componentWillReceiveProps 中去做。而在新版本中，
            官方将更新 state 与触发回调重新分配到了 getDerivedStateFromProps 与 componentDidUpdate 中，使得组件整体的更新逻辑更为清晰。
                而且在 getDerivedStateFromProps 中还禁止了组件去访问 this.props，强制让开发者去比较 nextProps 与 prevState 中的值，
            以确保当开发者用到 getDerivedStateFromProps 这个生命周期函数时，就是在根据当前的 props 来更新组件的 state，
            而不是去做其他一些让组件自身状态变得更加不可预测的事情。

            // 老版本componentWillReceiveProps的方式
            componentWillReceiveProps(nextProps) {
                if (nextProps.isLogin !== this.props.isLogin) {
                    this.setState({	
                        isLogin: nextProps.isLogin,	
                    });
                }
                if (nextProps.isLogin) {
                    this.handleClose();
                }
            }

            // 新版本的方式：getDerivedStateFromProps和componentDidUpdate组合达到componentWillReceiveProps
            static getDerivedStateFromProps(nextProps, prevState) {
                if (nextProps.isLogin !== prevState.isLogin) {
                    return {
                        isLogin: nextProps.isLogin,
                    };
                }
                return null;
            }

            componentDidUpdate(prevProps, prevState) {
                if (!prevState.isLogin && this.props.isLogin) {
                    this.handleClose();
                }
            }

        render()
            react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行

        componentDidMount()
            组件渲染之后调用，只调用一次
 * 
 * 
 * Updating（更新阶段：涉及5个钩子函数)
 *      static getDerivedStateFromProps(props, state)
 * 
 *      shouldComponentUpdate(nextProps, nextState)
 *          组件接收到新的props或者state时调用，return true就会更新dom（使用diff算法更新），return false能阻止更新（不调用render）
 * 
 *      render()
 * 
 *      getSnapshotBeforeUpdate(prevProps, prevState)
 *          触发时间: update发生的时候，在render之后，在组件dom渲染之前；
 *          返回一个值，作为componentDidUpdate的第三个参数；配合componentDidUpdate, 可以覆盖componentWillUpdate的所有用法
 * 
 *      componentDidUpdate()
 *          组件加载时不调用，组件更新完成后调用
 * 
 * Error Handling(错误处理)
 *      componentDidCatch(error，info)
 */

import React, { Component } from 'react'

export default class NewReactComponent extends Component {
    constructor(props) {
        super(props)
        // getDefaultProps：接收初始props
        // getInitialState：初始化state
    }
    state = {

    }
    static getDerivedStateFromProps(props, state) { 
        // 组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；;
        // 每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state
        return state
    }
    componentDidCatch(error, info) { // 获取到javascript错误

    }
    render() {
        return (
            <h2>New React.Component</h2>
        )
    }
    componentDidMount() { // 挂载后
        
    }   
    shouldComponentUpdate(nextProps, nextState) { // 组件Props或者state改变时触发，true：更新，false：不更新
        return true
    }
    getSnapshotBeforeUpdate(prevProps, prevState) { // 组件更新前触发

    }
    componentDidUpdate() { // 组件更新后触发

    }
    componentWillUnmount() { // 组件卸载时触发

    }
}

/** 
 * 什么是错误边界
 * 
 * 在 React 中，我们通常有一个组件树。如果任何一个组件发生错误，它将破坏整个组件树。
 * 没有办法捕捉这些错误，我们可以用错误边界优雅地处理这些错误。
 * 
 * 错误边界有两个作用：
 * (1) 如果发生错误，显示回退UI
 * (2) 记录错误
 * 
 * 如果类实现了 getDerivedStateFromError或componentDidCatch 这两个生命周期方法的任何一下，那么这个类就会成为ErrorBoundary。
 * 前者返回{hasError: true}来呈现回退UI，后者用于记录错误。
 */
import React from 'react'

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      // You can also log the error to an error reporting service
      console.log('Error::::', error);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>OOPS!. WE ARE LOOKING INTO IT.</h1>;
      }
  
      return this.props.children; 
    }
}

// 使用错误边界
export class Dashboard extends React.Component {
    render() {
      return (
        <div className="dashboard"> 
          <ErrorBoundary>
            <ToDoForm />
            <ToDolist />
          </ErrorBoundary>
        </div>
      );
    }
}

/** 
 * 什么是 Fragments
 * 
 * 在React中，我们需要有一个父元素，同时从组件返回React元素。有时在DOM中添加额外的节点会很烦人。
 * 使用 Fragments，我们不需要在DOM中添加额外的节点。
 * 我们只需要用 React.Fragment 或才简写 <> 来包裹内容就行了。
 */
class A extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CompoentA />
                <CompoentB />
                <CompoentC />
            </React.Fragment>
        )
    }
}

// 或者
class B extends React.Component {
    render() {
        return (
            <>
                <CompoentA />
                <CompoentB />
                <CompoentC />
            </>
        )
    }
}


