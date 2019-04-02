/**
 * 这里我们先看一个例子：class状态组件和函数组件带hooks
 */

class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
  
    render() {
      return (
        <div>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
          </button>
        </div>
      );
    }
}

import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

/**
 * react为什么要搞一个hooks？hooks的思想/作用，以及hooks用于解决了什么问题？
 * 
 * (1)  react都核心思想就是，将一个页面拆成一堆独立的，可复用的组件，并且用自上而下的单向数据流的形式将这些组件串联起来。
 *      但假如你在大型的工作项目中用react，你会发现你的项目中实际上很多react组件冗长且难以复用。尤其是那些写成class的组件，
 *      它们本身包含了状态（state），所以复用这类组件就变得很麻烦。
 * 
 * (2)  hooks的作用：
 *      · Hooks本质上就是一类特殊的函数，它们可以为你的函数型组件（function component）注入一些特殊的功能。
 *      · hooks的目标就是让你不再写class，让function一统江湖。
 *      · hooks是不能再class中使用的
 *      · 让函数组件具有类组件的功能。
 * 
 * (3)  寻常情况下使用class或者函数式组件存在的问题：
 *      · 用class来创建react组件时,需要处理this指向问题，为了保证this的指向正确，我们要经常写这样的代码：this.handleClick = this.handleClick.bind(this)，
 *        或者是这样的代码：<button onClick={() => this.handleClick(e)}>。一旦我们不小心忘了绑定this，各种bug就随之而来。
 *      · 我们用function写了一个简洁完美的无状态组件，后来因为需求变动这个组件必须得有自己的state，我们又得很麻烦的把function改成class。
 */

/**
 *  一些关于hooks的问题：
 * (1)hooks是如何记住状态的？
 *    直接跳转到最后，hooks源码分析
 * (2)为什么useState无论调用多少次，相互之间是独立的？/ react是怎么保证多个useState的相互独立的？
 *    直接跳转到最后，hooks源码分析（主要是useState运行时候，会创建对应的fiber对象，其中存在一个next,
 *    指向的是下一个useState对应的hook对象）
 * 
 *    function ExampleWithManyStates() {
        const [age, setAge] = useState(42);
        const [fruit, setFruit] = useState('banana');
        const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
        ...
      }
 * 
 *    react是根据useState出现的顺序来定的。
 *    react规定我们必须把hooks写在函数的最外层，不能写在ifelse等条件语句当中，来确保hooks的执行顺序一致。
 *    一需要注意的点是，之前我们的this.setState做的是合并状态后返回一个新状态，而useState是直接替换老状态后返回新状态。
 * (3)为什么官方文档说hooks不能再类中运行？
 *    就是专门给函数式组件设计的
 * (4)钩子的使用规则有哪些？
 *    · 只能在function的顶部使用钩子，不要在循环，控制流和嵌套的函数中调用钩子
 *    · 只能从React的函数式组件中调用钩子。不要在常规的JavaScript函数中调用钩子
 */

/** 
 * react hook相关的一些api
 * https://blog.csdn.net/weixin_44282875/article/details/85277868
 * 
 * 
 * (1) useState
 * useState是react自带的一个hook函数，它的作用就是用来声明状态变量。useState这个函数接收的参数是我们的状态初始值（initial state），
 * 它返回了一个数组，这个数组的第[0]项是当前当前的状态值，第[1]项是可以改变状态值的方法函数。
 * 
 *    · const [count, setCount] = useState(0);
 *      count 相当于 之前的 state.count
 *      setCount 相当于 this.setState(count)
 *      useState(0) 相当于 状态以 { count: 0 } 开始
 * 
 *    · 使用多个 state(状态) 变量
 *      例如： 
 *          const [age, setAge] = useState(42);
            const [fruit, setFruit] = useState('banana');
            const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
    
  (2) useEffect 参考useEffect/useEffect.tsx
      · 可以将 useEffect Hook 视为 componentDidMount，componentDidUpdate 和 componentWillUnmount的组合。
        当你调用useEffect,就是告诉React在刷新DOM之后运行你的副作用函数。副作用函数在组件中声明，所以可以使用组件的状态（state）和属性（props）。
        React默认在每一次渲染后运行副作用函数——包括第一次渲染（因为hooks包含了3种生命周期）。
      · 如果useEffect回调函数中如果返回的是闭包，这个返回的闭包函数将会在组件重新渲染前执行，
        所以你可以在这个位置做一些清理操作，从而实现componentWillUnmount的功能。
      · 也可以像使用useState一样,你可以在一个组件中使用多个副作用
      · useEffect方法需要传入两个参数：
          第一个参数是回调函数：这个回调函数会在每次组件渲染后执行，包括初始化渲染以及每次更新时。
          第二个参数则是状态依赖项(数组形式)，一旦检测到依赖项数据变动，组件会更新，并且回调函数都会被再次执行一遍，从而实现componentDidUpdate的功能。
          如果你传入一个空依赖，就能实现原来componentDidMount的效果，即只会执行一次。
          useEffect 可以传入第二个操作来避免性能的损耗

  (3)自定义的钩子  参考custom-hooks-demo
      https://www.jianshu.com/p/ecc6280f31b9  //也可以参考一下这个封装自定义hook
      · 自定义钩子更多的是一个约定而不是特性。如果一个函数的名字以 ”use” 开头并且调用了其他的钩子，
        我们就称它为自定义钩子
      · 我们在两个组件中的状态使用同一个自定义钩子，但是两个组件中的状态是完全独立的。
        钩子只复用状态逻辑而不是状态本身。
        事实上，每一次调用钩子都会得到一个完全孤立的状态——所以你甚至可以在同一个组件中使用两次相同的自定义钩子。

  (4) useContext 和 useReducer  参考use-context
      · 使用useContext可以订阅React context而不用引入嵌套
        例如：function Example() {
          const locale = useContext(LocaleContext);
          const theme = useContext(ThemeContext);
          // ...
        }

      · useReducer则允许你使用一个reducer来管理一个复杂组件的局部状态
        例如：function Todos() {
          const [todos, dispatch] = useReducer(todosReducer);
          // ...
        }
*/

/**
 * hooks源码分析
 * https://juejin.im/post/5bdfc1c4e51d4539f4178e1f
 * 
 * (1) hooks设计出来主要解决的问题：
 *     · 很难复用逻辑（只能用高阶组件，或者纯函数组件（props）），会导致组件树层级很深。
 *     · 类组件很难理解，比如方法需要bind，this指向不明确
 *     · 解决很多代码必须写在类里面
 * 
 *     例如：
 *        export default withStyle(style)(connect(...)(withRouter(MyComponent)))  这是一个嵌套4层的高阶组件
 *        
 *     另外：
 *        还有就是class代码对于打包工具来说，很难被压缩，比如方法名称
 * 
 * (2) 关于useState
 *     useState本身只是一个方法，无法存储状态，它只接收一个参数initial value。
 *     
 *     前提我们需要了解：
 *      (1)JSX翻译过来之后是React.createElement，他最终返回的是一个ReactElement对象。
    *      const element = {
              $$typeof: REACT_ELEMENT_TYPE, // 是否是普通Element_Type

              // Built-in properties that belong on the element
              type: type,  // 我们的组件，比如`class MyComponent`
              key: key,
              ref: ref,
              props: props,

              // Record the component responsible for creating this element.
              _owner: owner,
            };
            其中需要注意的是type，在我们写<MyClassComponent {...props} />的时候，
            他的值就是MyClassComponent这个class，而不是他的实例，实例是在后续渲染的过程中创建的。

        (2)而每个节点都会有对应的fiber对象。
            function FiberNode(
              tag: WorkTag,
              pendingProps: mixed,
              key: null | string,
              mode: TypeOfMode,
            ) {
              // Instance
              this.tag = tag;
              this.key = key;
              this.elementType = null;  // 就是ReactElement的`$$typeof`
              this.type = null;         // 就是ReactElement的type
              this.stateNode = null;

              this.memoizedState = null;
              // ...others
            }

            这里我们注意到，this.memoizedState，这个key用于存储上次渲染过程中最终获得的节点的state的。
            每次执行render方法之前，React会计算出当前组件最新的state然后赋值给class的实例，再调用render。

        (3)hooks原理：
            如下一段代码：
              function FunctionalComponent () {
                const [state1, setState1] = useState(1)
                const [state2, setState2] = useState(2)
                const [state3, setState3] = useState(3)
              }

            在我们执行functionalComponent的时候，在第一次执行到useState的时候，
            他会对应Fiber对象上的memoizedState，这个属性原来设计来是用来存储ClassComponent的state的，
            因为在ClassComponent中state是一整个对象，所以可以和memoizedState一一对应。

            但是在Hooks中，React并不知道我们调用了几次useState，所以在保存state这件事情上
            React想出了一个比较有意思的方案，那就是调用useState后设置在memoizedState上的对象长这样：
                {
                  baseState,
                  next,
                  baseUpdate,
                  queue,
                  memoizedState
                }
            其中：memoizedState是用来记录这个useState应该返回的结果的，
                而next指向的是下一次useState对应的`Hook对象。

                hook1 => Fiber.memoizedState
                state1 === hook1.memoizedState
                hook1.next => hook2
                state2 === hook2.memoizedState
                hook2.next => hook3
                state3 === hook3.memoizedState

            每个在FunctionalComponent中调用的useState都会有一个对应的Hook对象，
            他们按照执行的顺序以类似链表的数据格式存放在Fiber.memoizedState上

          重点来了：就是因为是以这种方式进行state的存储，所以useState（包括其他的Hooks）
                    都必须在FunctionalComponent的根作用域中声明，也就是不能在if或者循环中声明

          因为一下案例：
            if (something) {
              const [state1] = useState(1)
            }

            // or

            for (something) {
              const [state2] = useState(2)
            }

            最主要的原因就是你不能确保这些条件语句每次执行的次数是一样的，也就是说如果第一次我们创建了
            state1 => hook1, state2 => hook2, state3 => hook3这样的对应关系之后，
            下一次执行因为something条件没达成，导致useState(1)没有执行，那么运行useState(2)的时候，
            拿到的hook对象是state1的，那么整个逻辑就乱套了，所以这个条件是必须要遵守的！
      
      (4) setState
          上面讲了Hooks中state是如何保存的，那么接下去来讲讲如何更新state。

          当我们调用的调用useState以后，会返回的如下的方法：
          var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
          return [workInProgressHook.memoizedState, dispatch];

          调用这个方法会创建一个update。
          var update = {
            expirationTime: _expirationTime,
            action: action,
            callback: callback !== undefined ? callback : null,
            next: null
          }

          这里的action是我们调用setState1传入的值，而这个update会被加入到queue上，因为可能存在一次性调用多次setState1的清空。
          
          在收集完这所有update之后，会调度一次React的更新，在更新的过程中，肯定会执行到我们的FunctionalComponent，
          那么就会执行到对应的useState，然后我们就拿到了Hook对象，他保存了queue对象表示有哪些更新存在，
          然后依次进行更新，拿到最新的state保存在memoizedState上，并且返回，最终达到了setState的效果。

      (5) 总结：
          其实本质上跟ClassComponent是差不多的，只不过因为useState拆分了单一对象state，
          所以要用一个相对独特的方式进行数据保存，而且会存在一定的规则限制
 */

 // https://juejin.im/post/5bd68bc5518825287847a860
