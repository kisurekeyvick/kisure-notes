/**
 * https://juejin.im/post/58cd146a61ff4b0060277d32
 * 
 * 理解observable
 */

/**
 * 说一下你理解的数据流(observable)
 * 
 * 例如：数组里的每个元素 伴随时间流动 出现，也就是你不是马上拿到所有的元素，而是一次拿到一个。你可能在第一秒拿到第一个元素，第三秒拿到下一个
 * 如图[observable.jpg]，这就被称为数据流，或者说是observable
 * 一个 observable 就是一个伴随着时间流动的数据集合
 */

/**
 * rxjs的用武之地是什么
 * 
 * 就像对数组做的那些操作一样，你可以对这些数据进行 map、filter 或者做些其他的操作，来创建和组合新的 observable。
 * 最后，你还可以 subscribe（订阅）到这些 observable 上，来对最后的数据流进行你想要的任何操作。
 * 这些就是 RxJS 的用武之处。
 */

/** 如下有几个demo */
// 单个数据的创建
const meaningOfLife$ = Rx.Observable.just(42);

// 发送数组中的每个元素，然后完成
const myNumber$ = Rx.Observable.from([1, 2, 3, 4, 5]);

// 创建由promise转换而来的observable，并发出promise的结果
const myData$ = Rx.Observable.fromPromise(fetch('http://example.com/users'));

// 由一个事件创建，每一次触发，observable都会发送时间监听器上的事件
const mouseMove$ = Rx.Observable.fromEvent(document.documentElement, 'mousemove');

/** 
 * 这边需要注意的是$只是一个约定，用于表明这个变量是 observable 
 *  observable 可以被用于代表任何可以用伴随时间流动的数据流表示的东西，比如事件、Promise、定时执行函数、间隔执行函数和动画。
 */