/** 
 * Subject是允许值被多播到多个观察者的一种特殊的Observable
 * Subject就是一个可观察对象，只不过可以被多播至多个观察者。同时Subject 也类似于EventEmitter:维护者着众多事件监听器的注册表
 * 
 * 我们注意：纯粹的可观察对象是单播的(每一个订阅的观察者拥有单独的可观察对象的执行)
 */

/**
 * 在Subject的内部，subscribe并不调用一个新的发送值得执行。
 * 它仅仅在观察者注册表中注册给定的观察者，类似于其他库或者语言中的addlistener的工作方式。
 */

/** 
 * 每一个Subject都是一个Observer观察者对象。
 * 它是一个拥有 next()/error()/complete()方法的对象。
 * 要想Subject提供一个新的值，只需调用 next()，它将会被多播至用来监听Subject的观察者。
 */

/**
 * 由于Subject也是一个观察者，这就意味着你可以提供一个Subject当做 observable.subscribe()的参数
 */ 
const subject = new Rx.Subject(); 
subject.subscribe({ 
    next: (v) => console.log('observerA: ' + v) 
}); 
subject.subscribe({ next: (v) => console.log('observerB: ' + v) }); 
const observable = Rx.Observable.from([1, 2, 3]); 
observable.subscribe(subject);
/**
 * 输出如下： 
 * observerA: 1 
 * observerB: 1 
 * observerA: 2 
 * observerB: 2 
 * observerA: 3 
 * observerB: 3
 */
// 用上面的方式，我们本质上是通过将一个单播的可观察对象转化为多播。这个演示了Subjects是任何将可观察对象执行分享给多个观察者。


/**
 * 多播的可观察对象
 * 
 * 一个多播的可观察对象使用一个Subject，使得多个观察者可以看到同一个可观 察对象的执行
 */
/**
 * multicast
 * 
 * multicast返回一个ConnectableObservable，它只是一个具有connect（）方法的Observable。
 * connect（）返回一个 Subscription，你可以取消订阅，以取消共享的Observable执行
 */
var source = Rx.Observable.from([1,2,3]); 
var subject = new Rx.Subject(); 
var multicasted = source.multicast(subject); 
multicasted.subscribe({ 
    next:(v)=>console.log('observerA:' +v)
}); 
multicasted.subscribe({ 
    next: (v) => console.log('observerB: ' + v) 
});
multicasted.connect();


/**
 * refCount
 * 
 * 如果我们希望避免显式的调用connect()，我们可以使用ConnectableObservable对象的refCount()方法(引用计数)，
 * 它返回一个追踪它自身有多少个订阅者的可观察对 象。当订阅者的数量从0增加到1，它将会为我们调用connect()
 * 
 * 在当且仅在订阅者的数量降低到0的时候它将会完全取消订阅，停 掉更进一步的执行。
 * 
 * refCount使得多播可观察对象在其第一个观察者开始订阅时自动的开始执行， 在其最后一个订阅者取消的时候终止执行
 */
var source = Rx.Observable.intervale(500); 
var subject = new Rx.Subject(); 
var refCounted = source.multicast(subject).refCount();

var subscription1,subscription2,subscriptionConnect;

subscription1 = refCounted.subscribe({ 
    next: (v) => console.log('observerA: ' + v) 
});
subscription2 = refCounted.subscribe({ 
    next: (v) => console.log('observerB: ' + v) 
});

setTimeout(() => {
    subscription1.unsubscribe();
    subscription2.unsubscribe();
});
// 引用计数方法refCount()仅存在于ConnectableObservable，并且它返回一个 Obsevable,而不是另一个ConnectableObservable。


/** 
 * BehaviorSubject
 * 
 * Subjects的一个变体是BehaviorSubject,其有"当前值"的概念。
 * 它储存着要发射给消 费者的最新的值。
 * 无论何时一个新的观察者订阅它，都会立即接受到这个来自 BehaviorSubject的"当前值"。
 */

/**
 * 在下面的例子中，BehaviorSubject被数值0初始化，第一个观察者将会在订阅的时 候收到这个值。
 * 第二个观察者接收数值2，即使它是在数值2被发送之后订阅的。
 */
var subject = new Rx.BehaviorSubject(0);
subject.subscribe({ 
    next: (v) => console.log('observerA: ' + v) 
});

subject.next(1); 
subject.next(2);

subject.subscribe({ 
    next: (v) => console.log('observerB: ' + v) 
});

subject.next(3);
/**
 * observerA: 0 
 * observerA: 1 
 * observerA: 2 
 * observerB: 2 
 * observerA: 3 
 * observerB: 3
 */


/**
 * ReplaySubject
 * 
 * 一个ReplaySubject类似于一个BehaviorSubject，
 * 因为它可以发送一个过去的值(old values)给一个新的订阅者，但是它也可以记录可观察对象的一部分执行。
 * 
 * 一个ReplaySubject 从一个可观察对象的执行中记录多个值，并且可以重新发 送给新的订阅者
 */
// 可以缓存3个值
var subject = new Rx.ReplaySubject(3);
subject.subscribe({ 
    next: (v) => console.log('observerA: ' + v) 
});

subject.next(1); 
subject.next(2); 
subject.next(3); 
subject.next(4);

subject.subscribe({ 
    next: (v) => console.log('observerB: ' + v) 
});

subject.next(5);
/**
 * observerA: 1 
 * observerA: 2 
 * observerA: 3 
 * observerA: 4 
 * observerB: 2 
 * observerB: 3 
 * observerB: 4 
 * observerA: 5 
 * observerB: 5
 */

/**
 * 除了缓存值得个数之外，你也可以指定一个以毫秒为单位的时间，
 * 来决定过去多久 出现的值可以被重发。在下面的例子中指定一百个缓存值，但是时间参数仅为 500ms。
 */
new Rx.ReplaySubject(100, 500 /* windowTime */);


/**
 * AsyncSubject
 * 
 * AsyncSubject是另一个变体，它只发送给观察者可观察对象执行的最新值，并且仅 在执行结束时。
 */
var subject = new Rx.AsyncSubject();
subject.subscribe({ 
    next: (v) => console.log('observerA: ' + v) 
});

subject.next(1); 
subject.next(2); 
subject.next(3); 
subject.next(4);

subject.subscribe({ 
    next: (v) => console.log('observerB: ' + v) 
});

subject.next(5); 
subject.complete();
/**
 * observerA: 5 
 * observerB: 5
 */
