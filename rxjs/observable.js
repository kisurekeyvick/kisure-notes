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
 * observable 可以被用于代表任何可以用伴随时间流动的数据流表示的东西，比如事件、Promise、定时执行函数、间隔执行函数和动画。
 */

/** 
 * 我们创建了observable以后，需要进行观察它。所以需要订阅(subscription)，使用.subscribe()来创建它
 */

/** 创建observable */
const observable = Rx.Observable.create(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
});

observable.subscribe({
    next: x => console.log('got value' + x),
    error: err => console.log('' + err),
    complete: () => console.log('complete')
});

/** 
 * producer 数据生产者
 * 只有当有消费者出现的时候，才会产生数据，但是会按照自己的节奏产生数据
 * 
 * consumer 数据消费者
 * 决定了何时请求数据，顺着数据生产者的节奏接收数据
 */

/** 
 * observable对象不像EventEmitters(事件驱动)，也不象 Promises因为它可以返回多个值。
 * 可观察对象可能会在某些情况下有点像 EventEmitters(事件驱动)，也即是当它们使用Subjects被多播时
 */
function foo() {
    console.log('hello');
    return 42;
}

const x = foo.call();
console.log(x);

/** 类似如下代码    同样输出：hello 42 */
const foo$ = Rx.Observable.create(observer => {
    console.log('hello');
    observer.next(42);
});

foo$.subscribe(x => {
    console.log(x);
});

/** 
 * 这种情况源自于函数和可观察对象均是惰性计算。如果不用call调用函数，那么console.log是不会发生
 * 同样的，可观察对象同样如此，如果不订阅，那么console.log()也不会发生
 * 
 * 同时我们需要注意，订阅是一个独立的操作，多个订阅之间不会相互影响。
 */

/** 
 * 执行可观察对象
 * 
 * 在Observable.create(observer => {})中,observer存在3个属性
 * next         发送值
 * error        发送异常
 * complete     代表不再发送值
 * 
 * 其中，error和complete通知可能仅在可观察对象执行期间仅发生一次，但仅会执行二者之中的一个。
 * 并且一旦调用了error或者complete，那么就不能再next数据了
 */

// 所以我们在可以使用try/catch的方式捕获错误
Rx.Observable.create(observer => {
    try {
        observer.next(1); 
        observer.next(2); 
        observer.next(3); 
        observer.complete();
    } catch (error) {
        observer.error(err);
    }
});
