/** 
 * Subscription订阅
 * 
 * 订阅是一个表示一次性资源的对象，通常是一个可观察对象的执行。 
 * 订阅对象有一个重要的方法:unsubscribe，该方法不需要参数，仅仅去废弃掉可观察对象所持有的资源
 */
const subscription = Rx.Observable.interval(1000).subscribe(x => console.log(x));
subscription.unsubscribe();

/**
 * 订阅对象也可以被放置在一起，因此对一个订阅对象的unsubscribe()进行调用，可以对多个订阅进行取消。
 * 做法是:把一个订阅"加"进另一个订阅。
 */
const observable1 = Rx.Observable.interval(400); 
const observable2 = Rx.Observable.interval(300);

const subscription = observable1.subscribe(x => console.log('first : ' + x)); 
const childSubscription = observable2.subscribe(x => console.log(' second: ' + x));

subscription.add(childSubscription);

/**
 * 订阅也有一个remove(otherSubscription)方法,用于解除被add添加的子订阅
 */