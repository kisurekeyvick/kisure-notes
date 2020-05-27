/** ----------------------- 创建数据流 ---------------------- */

/**
 * combineLatest
 * 
 * 组合多个Observable产生一个新的Observable，其发射的值根据其每个输入 Observable的最新值计算
 * 可以查看[combineLatest.jpg]
 * 
 * 语法：ObservableInput.combineLatest(ObservableInput, (...) => {...})
 */

// 注意，是取其每个输入的最新值
var weight = Rx.Observable.of(70, 72, 76, 79, 75); 
var height = Rx.Observable.of(1.76, 1.77, 1.78);
var bmi = weight.combineLatest(height, (w, h) => `w: ${w}, h:${h}`);

bmi.subscribe(x => console.log('BMI is ' + x));
/**
 * BMI is w: 75, h:1.76
 * BMI is w: 75, h:1.77
 * BMI is w: 75, h:1.78
 */


/** 
 * concat
 * 
 * 连接多个可观察对象，并顺序发出他们的值，一个可观察对象跟在另一个的后面
 * 可以查看[concat.jpg]
 * 
 * 
 */
var timer = Rx.Observable.interval(1000).take(4); 
var sequence = Rx.Observable.range(1, 10); 
var result = Rx.Observable.concat(timer, sequence); 
result.subscribe(x => console.log(x));
/**
 * 0
 1
 2
 3              0~3是每个1秒中输出的
                后续的1~10是一下子输出的
 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 */


/**
 * create
 * 
 * 创建一个新的数据流observable
 */ 
var result = Rx.Observable.create(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
});
result.subscribe(x => console.log(x));


/**
 * defer
 * 
 * 以惰性的方式产生一个Observable,也就是说，当被订阅的时候才会产生
 * 
 * defer允许在Observer订阅时创建Observable，并为每个Observer创建一个新的Observable。
 * 它为每个用户分别产生一个Observable，所以虽然 每个用户可能认为它们是订阅的同一个Observable，事实上每个订阅者都有自己的单独的Observable。
 */
var clicksOrInterval = Rx.Observable.defer(function () { 
    if (Math.random() > 0.5) { 
        return Rx.Observable.fromEvent(document, 'click'); 
    } else { 
        return Rx.Observable.interval(1000); 
    } 
}); 
clicksOrInterval.subscribe(x => console.log(x));


/**
 * empty
 * 
 * 创建一个不发射任何值的Observable,它只会发射一个complate通知。
 * 
 * 该操作符创建一个仅发射‘complete’的通知。通常用于和其他操作符一起组合使用
 */
var result = Rx.Observable.empty().startWith(7); 
result.subscribe(x => console.log(x));


/**
 * forkJoin
 * 
 * 并行运行所有可观察序列并收集其最后的元素
 */
var source = Rx.Observable.forkJoin( 
    Rx.Observable.range(0, 10), 
    Rx.Observable.of([1,2,3])
);
var subscription = source.subscribe(res => console.log(res));
/**
 * [9, 4]
 */


/**
 * from
 * 
 * 将一个数组、类数组(字符串也可以)，Promise、可迭代对象，类可观察 对象、转化为一个Observable
 */
var result = Rx.Observable.from([10, 20, 30]);
result.subscribe(res => console.log(res));

// 将一个无限的迭代器(来自于 generator)转化为 Observable。
function* generateDoubles(seed) {
    var i = seed;
    while (true) {
      yield i;
      i = 2 * i; // double it
    }
}
var iterator = generateDoubles(3);
var result = Rx.Observable.from(iterator).take(10);
result.subscribe(x => console.log(x));
// 3 6 12 24 48 96 192 384 768 1536


/**
 * fromEvent
 * 
 * Rx.Observable.fromEvent(element, eventName, [selector])
 * 将一个元素上的事件转化为一个Observable
 */
var clicks = Rx.Observable.fromEvent(document, 'click');
clicks.subscribe(x => console.log(x));


/**
 * fromEventPattern
 * 
 * Rx.Observable.fromEventPattern(addHandler, [removeHandler], [sel ector])
 * 
 * 通过使用addHandler和removeHandler函数添加和删除处理程序。
 * 当输 出Observable被订阅时，addHandler被调用，并且当订阅被取消订阅时调用 removeHandler。
 */
function addClickHandler(handler) { 
    document.addEventListener('click', handler); 
}
function removeClickHandler(handler) { 
    document.removeEventListener('click', handler); 
}

var clicks = Rx.Observable.fromEventPattern(addClickHandler, removeClickHandler);
clicks.subscribe(x => console.log('hello kisure', x));

// 所以我们每一次点击的时候，都会console出：hello kisure + 与之对应的click点击信息event


/**
 * fromPromise
 * 
 * 转化一个Promise为一个Obseervable。将ES2015 Promise转换为Observable。 
 * 
 * 如果Promise为成功状态，则Observable 会将成功的值作为next发出，然后complate。 
 * 如果Promise被失败，则输出 Observable发出相应的错误。
 */
var result = Rx.Observable.fromPromise(
    Promise.resolve('nice fish')
); 
result.subscribe(
    x => console.log(x), 
    e => console.error(e)
);


/**
 * merge
 * 
 * 创建一个发射所有被合并的observable所发射的值
 * 
 * 输出Observable只有在所有输入Observable完成后才会完成。
 * 由输入Observable 传递的任何错误将立即在输出Observable上发出。
 */
var clicks = Rx.Observable.fromEvent(document, 'click'); 
var timer = Rx.Observable.interval(1000);
var clicksOrTimer = Rx.Observable.merge(clicks, timer);
clicksOrTimer.subscribe(x => console.log(x));


/** 
 * of
 * 
 * 创建一个Observable，发射指定参数的值，一个接一个，最后发出 complate。
 * 它可以用于与其他Observable组合，如concat。
 */
var numbers = Rx.Observable.of(1, 2, 3); 
var letters = Rx.Observable.of('a', 'b', 'c'); 
var interval = Rx.Observable.interval(1000); 
var result = numbers.concat(letters).concat(interval); 
result.subscribe(x => console.log(x));
/**
 * 1
 * 2
 * 3
 * a
 * b
 * c
 * 0
 * 1
 * 2
 * 3
 * ...
 */


/**
 * range
 * 
 * 创建发射一个数字序列的observable
 * range按顺序发出一系列连续整数，参数分别为起点和长度(注意不是终点,是长度)
 */
var numbers = Rx.Observable.range(1, 10); 
numbers.subscribe(x => console.log(x));
/**
 * 1
 * 2
 * 3
 * 4
 * 5
 * 6
 * 7
 * 8
 * 9
 * 10
 */


/**
 * throw
 * 
 * 创建一个只发出error通知的Observable
 * throw操作符对于创建一个只发出error通知的Observable非常有用。它可以用 于与其他Observable合并，如在mergeMap中。
 */
var result = Rx.Observable.throw(new Error('oops!')).startWith(7 );
result.subscribe(
    x => console.log('nice fish:', x), 
    e => console.error(e)
);
/**
 * nice fish: 7
 * ErrorL oops!
 */

var interval = Rx.Observable.interval(1000);
var result = interval.mergeMap(
    (x) => {
        return x === 13 ? Rx.Observable.throw('123') : Rx.Observable.of('a', 'b', 'c')
    }
);
result.subscribe(
    x => console.log(x),
    error => console.error(error)
);


/**
 * timer
 * 
 * 类似于interval,但是第一个参数用来设置发射第一个值得延迟时间
 * 第二个参数为时间的间 隔。 第一次发射发生在指定的延迟之后。 初始延迟可以是日期
 * 如果第二个参数未指定，则输出Observable仅发出一个值0
 */
var numbers = Rx.Observable.timer(3000, 1000); 
numbers.subscribe(x => console.log(x));
/**
 * 间隔3秒以后
 * 0
 * 1
 * 2
 * 3
 * 4
 * 5
 * ...
 */


/**
 * buffer
 * 
 *  缓存原始observable发射的值，直到作为参数的另一个observable发射了值。之后返回一个由这些缓存值组成的数组。
 */
var clicks = Rx.Observable.fromEvent(document, 'click'); 
var interval = Rx.Observable.interval(1000); 
var buffered = interval.buffer(clicks);
buffered.subscribe(x => console.log(x));
/**
 * 只有我们每一次点击的时候，才会将interval出来的值吐出来
 * [1,2,3,4]
 * [5,6]
 * [....]
 */


/**
 * bufferCount
 * 
 * 缓存原始observable发射的值，直到达到bufferSize给定的上限
 * 
 * bufferCount(bufferSize: number, startBufferEvery: number)
 * bufferSize：缓存区的最大长度
 * startBufferEvery：确定何时启用新的缓冲区
 * 
 * 查看[bufferCount.jpg]
 */
var clicks = Rx.Observable.fromEvent(document, 'click'); 
var buffered = clicks.bufferCount(2); 
buffered.subscribe(x => console.log(x));
/** 
 * 每点击2次，发射一次由之前点击事件组成的数组
 * 
 * [MouseEvent, MouseEvent]
 * [MouseEvent, MouseEvent]
 */
 
/**
 * bufferCount第二参数的作用：
 * 首次点击3次，发射一次由之前三次点击事件组成的数组。
 * 之后，每点击两次发射一 次重置产生新数组，新数组的长度为3，第一个元素为上次发射数组的最后一个元素，后两个元素为本次2次点击事件。
 */


/**
 * bufferTime
 * 
 * 把过去的值放入一个缓存区，并且按时间定期发射这些数组
 * 
 * 语法：bufferTime(发射时间间隔, 开启新缓冲区的时间间隔, 缓冲区的最大容量)
 */
// 每一秒都发出最新点击事件的数组
var clicks = Rx.Observable.fromEvent(document, 'click');
var buffered = clicks.bufferTime(1000);
buffered.subscribe(x => console.log(x));

// 每5秒钟，发出接下来2秒内的点击事件(译者注：后3秒内的点击会被忽略)
var clicks = Rx.Observable.fromEvent(document, 'click');
var buffered = clicks.bufferTime(2000, 5000);
buffered.subscribe(x => console.log(x));


/**
 * catch
 * 
 * catch(selector:function):Observable
 * 
 * 它接受作为参数err，这是错误，并捕获。 需要注意的是，如果使用了该操作符，observer的error方法将不会被执行，
 * 因为错误已经被catch操作符捕获。 此外，不可以使用try...catch，因为此代码块是同步执行的
 */
Observable.of(1, 2, 3, 4, 5)
  .map(n => {
	   if (n == 4) {
	     throw 'four!';
    }
   return n;
}).catch(err => Observable.of('I', 'II', 'III'))
.subscribe(x => console.log(x));


/**
 * combineAll
 * 
 * 接受一个返回 Observables 的 Observable, 并从中收集所有的 Observables 。 
 * 一旦最外部的 Observable 完成, 会订阅所有收集的 Observables 然后通过combineLatest合并值
 */
// 将两个点击事件映射为有限的 interval Observable，然后应用 combineAll
var clicks = Rx.Observable.fromEvent(document, 'click');
var higherOrder = clicks.map(ev =>
  Rx.Observable.interval(Math.random()*2000).take(3)
).take(2);
var result = higherOrder.combineAll();
result.subscribe(x => console.log(x));
