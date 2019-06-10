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
  * https://juejin.im/post/5ab7b3a2f265da2378403e57#heading-1
  * 
  * (1)卡顿的原因
  * v15 Stack reconciler的工作流程很像函数的调用过程。父组件里调子组件，可以类比为函数的递归。
  * 在setState后，react会立即开始reconciliation过程，从父节点（Virtual DOM）开始遍历，以找出不同。
  * 将所有的Virtual DOM遍历完成后，reconciler才能给出当前需要修改真实DOM的信息，并传递给renderer，进行渲染，
  * 然后屏幕上才会显示此次更新内容。对于特别庞大的vDOM树来说，reconciliation过程会很长(x00ms)，
  * 在这期间，主线程是被js占用的，因此任何交互、布局、渲染都会停止，给用户的感觉就是页面被卡住了。
  * 
  * (2)任务拆分 fiber-tree & fiber
  * v15 stack-reconciler react会根据这些元素创建（或更新）Virtual DOM，然后react根据更新前后virtual DOM的区别，去修改真正的DOM。
  * 在stack reconciler下，DOM的更新是同步的，也就是说，在virtual DOM的比对过程中，发现一个instance有更新，会立即执行DOM操作。
  * 
  * 而v16 fiber-conciler,操作是可以分成很多小部分，并且可以被中断的，所以同步操作DOM可能会导致fiber-tree与实际DOM的不同步。
  * 对于每个节点来说，其不光存储了对应元素的基本信息，还要保存一些用于任务调度的信息。
  * 因此！！！！fiber仅仅是一个对象，表征reconciliation阶段所能拆分的最小工作单元，和上图中的react instance一一对应。
  * 通过 stateNode 属性管理Instance自身的特性。
  * 
  * (3)案例
  * 当前页面包含一个列表，通过该列表渲染出一个button和一组Item，Item中包含一个div，其中的内容为数字。
  * 通过点击button，可以使列表中的所有数字进行平方。另外有一个按钮，点击可以调节字体大小。
  * 
  * 页面渲染完成后，就会初始化生成一个fiber-tree。
  * 
  * 用户点击平方按钮后，利用各个元素平方后的list调用setState，react会把当前的更新送入list组件对应的update queue中。
  * 但是react并不会立即执行对比并修改DOM的操作。而是交给scheduler去处理。
  * 
  * scheduler会根据当前主线程的使用情况去处理这次update。为了实现这种特性，使用了requestIdelCallbackAPI。
  * 对于不支持这个API的浏览器，react会加上pollyfill。
  * 
  * 一旦reconciliation过程得到时间片，就开始进入work loop。work loop机制可以让react在计算状态和等待状态之间进行切换。
  * 为了达到这个目的，对于每个loop而言，需要追踪两个东西：下一个工作单元（下一个待处理的fiber）;当前还能占用主线程的时间。
  * 第一个loop，下一个待处理单元为根节点。
  * 
  * 
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

    新版的Fiber解决思路：
    Fiber实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。
    实现方式是使用了浏览器的requestIdleCallback这一 API。
    window.requestIdleCallback()会在浏览器空闲时期依次调用函数，这就可以让开发者在主事件循环中执行后台或低优先级的任务，
    而且不会对像动画和用户交互这些延迟触发但关键的事件产生影响。
    函数一般会按先进先调用的顺序执行，除非函数在浏览器调用它之前就到了它的超时时间。

    新版的Fiber Reconciler在执行的过程中，可以将执行权交给浏览器，例如：
        优先级高的任务（如键盘输入）可以打断优先级低的任务（如Diff）的执行，从而更快的生效。
        (1)阶段一，componentWillMount,componentWillReceiveProps,shouldComponentUpdate,componentWillUpdate
            生成 Fiber 树，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断。
        (2)阶段二，componentDidMount,componentDidUpdate,componentWillUnmount
            将需要更新的节点一次过批量更新，这个过程不能被打断。

    Fiber 树在首次渲染的时候会一次过生成。在后续需要 Diff 的时候，会根据已有树和最新 Virtual DOM 的信息，生成一棵新的树。
    这颗新树每生成一个新的节点，都会将控制权交回给主线程，去检查有没有优先级更高的任务需要执行。
    如果没有，则继续构建树的过程，如果过程中有优先级更高的任务需要进行，则 Fiber Reconciler 会丢弃正在生成的树，在空闲的时候再重新执行一遍。

    对于UI来说还需要考虑以下问题：
    (1)并不是所有的state更新都需要立即显示出来，比如屏幕之外的部分的更新
    (2)并不是所有的更新优先级都是一样的，比如用户输入的响应优先级要比通过请求填充内容的响应优先级更高
    (3)理想情况下，对于某些高优先级的操作，应该是可以打断低优先级的操作执行的，
        比如用户输入时，页面的某个评论还在reconciliation，应该优先响应用户输入
 */