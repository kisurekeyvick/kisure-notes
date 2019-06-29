/** 
 * 什么是hooks
 */

/** 
 * 类组件的不足
 * 
 *  状态逻辑复用难
        缺少复用机制
        渲染属性和高阶组件导致层级冗余

    趋向复杂难以维护
        生命周期函数混杂不相干逻辑
        相干逻辑分散在不同生命周期

    this 指向困扰
        内联函数过度创建新句柄
        类成员函数不能保证 this
 */

/** 
 * hooks优势
 * 
 * 优化类组件的三大问题：
 * (1) 函数组件无 this 问题
 * (2) 自定义 Hook 方便复用状态逻辑
 * (3) 副作用的关注点分离
 */

/** 
 * 使用 State Hook
 * 
    import React, {useState} from 'react'

    function App () {
        const [count, setCount] = useState(0);

        return (
            <button type="button"
            onClick={() => {setCount(count +&emsp;1) }}
            >Click({count})</button>
        )
    }

    在这里，useState 就是一个 Hook。通过在函数组件里调用它来给组件添加一些内部 state
    React 会在重复渲染时保留这个 state

    useState 会返回一对值**：当前状态**和一个让你更新它的函数。
    你可以在事件处理函数中或其他一些地方调用这个函数。
    它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。
    useState 唯一的参数就是初始 state。
 */

/** 
 * seState 怎么知道要返回当前组件的 state?
 * 
 * 因为 JavaScript 是单线程的。在 useState 被调用时，它只能在唯一一个组件的上下文中。
 */

/** 
 * 如果组件内有多个 usreState，那 useState 怎么知道哪一次调用返回哪一个 state 呢？
 * 
    const [count, setScount] = useState(0);
    const [name, setName] = useState('小智');

    当组件在渲染的时候，useState 第一次调用一定是返回 count，第二次调用一定是返回 name。
 */

/** 
 * react hooks 优化点
 * 
 * 通过上述我们知道 useState 有个默认值，因为是默认值，所以在不同的渲染周期去传入不同的值是没有意义的，只有第一次传入的才有效。如下所示：
    const defaultCount = props.defaultCount || 0
    const [count, setCount] = useState(defaultCount)

    state 的默认值是基于 props,在 APP 组件每次渲染的时候 const defaultCount = props.defaultCount || 0 都会运行一次
 */

/** 
 * react hooks的useState
 * 
 * useState 支持传入函数，来延迟初始化：
 * const [count, setCount] = useState(() => {
 *      return props.defaultCount || 0;
 * });
 */

/** 
 * 使用Effect Hook
 * 
 * Effect Hook 可以让你在函数组件中执行副作用操作。数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。
 * 记住了，使用范围一般是：数据获取，设置订阅以及手动更改 React 组件中的 DOM！！！！！！！
 * 
 * 副作用的时机：
 * (1) Mount 之后 对应 componentDidMount
 * (2) Update 之后 对应 componentDidUpdate
 * (3) Unmount 之前 对应 componentWillUnmount
 * 
 * 现在使用 useEffect 就可以覆盖上述的情况, 为什么一个 useEffect 就能涵盖 Mount，Update，Unmount 等场景呢?
 * useEffect 标准上是在组件每次渲染之后调用，并且会根据自定义状态来决定是否调用还是不调用。
 * 
 * 第一次调用就相当于componentDidMount，后面的调用相当于 componentDidUpdate。
 * useEffect 还可以返回另一个回调函数，这个函数的执行时机很重要。作用是清除上一次副作用遗留下来的状态。
 * 
 * 比如一个组件在第三次，第五次，第七次渲染后执行了 useEffect 逻辑，那么回调函数就会在第四次，第六次和第八次渲染之前执行。
 * 严格来讲，是在前一次的渲染视图清除之前。如果 useEffect 是在第一次调用的，那么它返回的回调函数就只会在组件卸载之前调用了，
 * 也就是componentWillUnmount 。
 * 
 * 如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
 * 
 * useEffect存在2个参数，
 * 参数1为function，主要写入的是一些获取数据，监听之类的，如果是监听订阅之类的代码，那么需要你在这个function中返回一个function
 *                 这个返回的function中写的是一些解绑的东西，这种返回的一个function的方式，其作用就是相当于在class中的componentWillMount中进行解绑
 * 参数2为数组，数组中传入的是useState中的状态数据。
 *              只有数组的每一项都不变的情况下，useEffect 才不会执行。
 *              第一次渲染之后,useEffect 肯定会执行。
 *              如果我们传入的空数组，空数组与空数组是相同的，因此 useEffect 只会在第一次执行一次。
 */

