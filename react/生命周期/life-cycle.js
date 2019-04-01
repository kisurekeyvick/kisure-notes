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
 *      
 */