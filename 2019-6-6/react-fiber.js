/**
 * react fiber架构
 * React 发布了最新版 16.8.0
 * 
 * React 框架内部的运作可以分为 3 层：
 * (1)Virtual DOM 层，描述页面长什么样
 * (2)Reconciler 层，负责调用组件生命周期方法，进行 Diff 运算等。
 * (3)Renderer 层，根据不同的平台，渲染出相应的页面，比较常见的是 ReactDOM 和 ReactNative。
 * 
 * 这次改动最大的当属 Reconciler 层了，React 团队也给它起了个新的名字，叫Fiber Reconciler。
 * 这就引入另一个关键词：Fiber。
 */

/**
 * https://segmentfault.com/a/1190000018250127?utm_source=tag-newest
 * 
 * Fiber 其实指的是一种数据结构，它可以用一个纯 JS 对象来表示：
    
    const fiber = {
        stateNode,    // 节点实例
        child,        // 子节点
        sibling,      // 兄弟节点
        return,       // 父节点
    }

    过去的Reconciler层，运作的过程是不能被打断的，必须一条道走到黑。也就是说：
        React 会遍历应用的所有节点，计算出差异，然后再更新 UI。整个过程是一气呵成，不能被打断的。
        如果页面元素很多，整个过程占用的时机就可能超过 16 毫秒，就容易出现掉帧的现象。

    新版的Fiber Reconciler在执行的过程中，可以将执行权交给浏览器，例如：
        优先级高的任务（如键盘输入）可以打断优先级低的任务（如Diff）的执行，从而更快的生效。
        (1)阶段一，componentWillMount,componentWillReceiveProps,shouldComponentUpdate,componentWillUpdate
            生成 Fiber 树，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断。
        (2)阶段二，componentDidMount,componentDidUpdate,componentWillUnmount
            将需要更新的节点一次过批量更新，这个过程不能被打断。
 */