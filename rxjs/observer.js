/**
 * observer 观察者
 * 
 * 观察者是可观察对象所发送数据的消费者
 * 简单而言，观察者是一组 回调函数 ， 分别对应一种被可观察对象发送的通知的类型:next, error和 complete
 */

// 一个典型的观察者对象
const observer = { 
    next: x=>console.log('Observer got a next value: ' + x), 
    error: err => console.error('Observer got an error: ' + err), 
    complete: () => console.log('Observer got a complete notificatio n') 
};

// 使用观察者，需要订阅可观察对象
observable.subscribe(observer)
 
/** 
 * 观察者不过是三个回调函数组成的对象，每个回调函数分别对应可观察对象的通知类型
 */

/** 
 * 当然，在rxjs中，观察者的属性是可选的，也就是说可以只存在next，error属性，可能只存在next属性
 * 当订阅一个可观察对象，你仅仅提供回调来作为参数就够了，并不需要完整的观察者对象
 */
// 如下：
observable.subscribe(x => console.log('Observer got a next value : ' + x));

/** 
 * 在在observable.subscribe内部，它将使用第一个回调参数作为next的处理句柄创建一 个观察者对象。
 * 也可以通过将三个函数作为参数提供三种回调：
 */
observable.subscribe(
    x => console.log('Observer got a next value: ' + x), 
    err => console.error('Observer got an error: ' + err), 
    () => console.log('Observer got a complete notification')
);
