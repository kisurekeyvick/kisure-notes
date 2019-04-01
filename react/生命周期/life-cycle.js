/**
 * 生命周期
 */

/**
 * componentWillMount和componentWillUpdate两个生命周期方法在新版本的React中已经不推荐使用了
 * https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes
 */

/**
 * 为什么不推荐在 componentwillmount 里最获取数据的操作呢？
 * https://www.colabug.com/5397403.html
 * 
 * 因为是可能会调用多次，这涉及到React 的核心概念： React Fiber。
 * 
 * 首先我们需要理解一下：同步渲染 和 异步渲染
 * (1)同步渲染
 *      组件树也是非常庞大， 假设有一千个组件要渲染， 每个耗费1ms, 一千个就是1000ms, 由于javascript 是单线程的， 
 *      这 1000ms 里 CPU 都在努力的干活， 一旦开始，中间就不会停。 如果这时候用户去操作， 
 *      比如输入， 点击按钮， 此时页面是没有响应的。 等更新完了， 你之前的那些输入就会啪啪啪一下子出来了。
 *      这就是我们说的 页面卡顿 , 用起来很不爽，体验不好。
 *      这个问题和设备性能没有多大关系，归根结底还是同步渲染机制的问题
 * 
 * (2)异步渲染
 *      https://www.jianshu.com/p/bf824722b496
 * 
 *      react v16的fiber架构就是为了解决同步渲染出现层级很深的组件，react渲染它需要几十甚至几百毫秒，在这期间，
 *          react会一直占用浏览器主线程，任何其他的操作（包括用户的点击，鼠标移动等操作）都无法执行。
 * 
 *      Fiber 的做法是：分片,把一个很耗时的任务分成很多小片。
 *      所以完全有可能一个更新任务还没有完成，就被另一个更高优先级的更新过程打断，这时候优先级高的更新任务会优先处理完，
 *      而低优先级更新任务所做的工作则会完全作废，然后等待机会重头再来，注意是重头再来。
 *      因为一个更新过程可能被打断，所以React Fiber一个更新过程被分为两个阶段： render phase and commit phase。
 * 
 *      这两个阶段的分界点是render函数，而且， render 函数 也是属于 第一阶段 render phase 的。
 * 
 *      render phase :
            componentWillMount
            componentWillReceiveProps
            shouldComponentUpdate
            componentWillUpdate

        commit phase :
            componentDidMount
            componentDidUpdate
            componentWillUnmount

        在现有的React中，每个生命周期函数在一个加载或者更新过程中绝对只会被调用一次； 
        在React Fiber中，不再是这样了，第一阶段中的生命周期函数在一次加载和更新过程中可能会被多次调用！

        react会放弃当前组件所有干到一半的事情，去做更高优先级更重要的任务（当然，也可能是用户鼠标移动，或者其他react监听之外的任务），
        当所有高优先级任务执行完之后，react通过callback回到之前渲染到一半的组件，从头开始渲染。（看起来放弃已经渲染完的生命周期，
        会有点不合理，反而会增加渲染时长，但是react确实是这么干的）
 */

 /**
  * react v17 版本将会 componentWillMount，componentWillReceiveProps和componentWillUpdate
  */

/** 
 * 新的生命周期
 * 
 * 生命周期执行顺序：
 *      挂载：
 *          constructor
 *          static getDerivedStateFromProps
 *          render
 *          componentDidMount
 * 
 *      更新：
 *          static getDerivedStateFromProps
 *          shouldComponentUpdate
 *          render
 *          getSnapshotBeforeUpdate
 *          componentDidUpdate
 * 
 *      卸载：
 *          componentWillUnmount
 * 
 *      异常：
 *          componentDidCatch
*/

/**
 * getDerivedStateFromProps
 * 这个生命周期的功能实际上就是将传入的props映射到state上面。
 * 意味着即使你的props没有任何变化，而是state发生了变化，导致组件发生了re-render，这个生命周期函数依然会被调用。
 * 这是一个静态的方法，是拿不到实例this的，也并不推荐直接访问属性。而是应该通过参数提供的nextProps以及prevState来进行判断，
 * 根据新传入的props来映射到state,所以开发者应该将该函数设计成纯函数。
 * 
 * (1)需要注意的是，如果props传入的内容不需要影响到你的state，那么就需要返回一个null。
 *      这个返回值是必须的，所以尽量将其写到函数的末尾。
 * (2)
 * 
 * 组件挂载状态下，三种情况会调用该生命周期：
 * (1)组件实例化
 * (2)组件的props发生变化
 * (3)父组件重新渲染
 * this.setState()不会触发getDerivedStateFromProps()，但是this.forceUpdate()会。
 * 
 * 组件更新状态下，两种情况会调用该生命周期：
 * (1)组件的props发生改变
 * (2)父组件发生重新渲染
 */
class PotentialError extends React.Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        const {type} = nextProps;
        // 当传入的type发生变化的时候，更新state
        if (type !== prevState.type) {
            return {
                type,
            };
        }
        // 否则，对于state不进行任何操作
        return null;
    }

    render() {
        // ....
    }
}


/**
 * componentDidCatch
 * 这样，Demo 组件即使直接使用对象作为子组件也不会报错了，因为被 PotentialError 接收了。
 */
class PotentialError extends React.Component {
    constructor() {
        super(props);
        
        this.state = {
            error: false,
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            error
        });
    }

    render() {
        if (this.state.error) {
            return <h1>出错了，请打卡控制台查看详细错误！</h1>;
        }

        return this.props.children;   
    } 
}