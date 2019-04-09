/** 
 * Node.js 事件循环
 * http://www.runoob.com/nodejs/nodejs-event-loop.html
 * 
 * (1)Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回调接口，
 * 通过这些接口可以处理大量的并发，所以性能非常高。
 * (2)Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。
 * (3)Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，
 * 每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数。
*/

/**
 * Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件。
 */
let events = require('events');
// 创建一个eventEmitter对象
let eventEmitter = new events.EventEmitter();

// 创建事件处理程序
let connectHandler = function() {
    console.log('连接成功');

    // 触发resolve_event事件
    eventEmitter.emit('resolve_event');
};

// 绑定connect事件处理程序
eventEmitter.on('connect', connectHandler);

// 使用匿名函数绑定 resolve_event 事件
eventEmitter.on('resolve_event', function() {
    console.log('数据接受成功');
});

// 触发connect事件
eventEmitter.emit('connect');

console.log(eventEmitter.listeners('connect'));

console.log('程序执行完毕');

/**
 * EventEmitter类
 * events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
 * 
 * 方法：
 * (1)addListener(event, listener)  为指定事件添加一个监听器到监听器数组的尾部
 *      例如：eventEmitter.addListener('connection', listener1);
 * 
 * (2)on(event, listener)   为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数
 *      例如：eventEmitter.on('connection', function (stream) {
                                console.log('someone connected!');
                            });
        addListener 和 on之间的关系：addListener... 是eventEmitter.on(eventName, listener) 的别名
 * 
 * (3)once(event, listener)
 *      为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
 *      例如：
 *          server.once('connection', function (stream) {
                console.log('Ah, we have our first user!');
            });
 * 
 * (4)removeListener(event, listener)
 *      移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。
 *      它接受两个参数，第一个是事件名称，第二个是回调函数名称。
 *      let callback = function(stream) {
            console.log('someone connected!');
        };

        server.on('connection', callback);

        server.removeListener('connection', callback);

        removeListener() 最多只会从监听器数组中移除一个监听器。 
        如果监听器被多次添加到指定 eventName 的监听器数组中，则必须多次调用 removeListener() 才能移除所有实例。
 * 
 * (5)removeAllListeners(事件名)    移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器
 * 
 * (6)setMaxListeners(n)
 *      默认情况下，每个事件可以注册最多 10 个监听器。 
 *      可以使用 emitter.setMaxListeners(n) 方法改变单个 EventEmitter 实例的限制
 *      setMaxListeners 函数用于提高监听器的默认限制的数量。
 * 
 *      案例：emitter.setMaxListeners(emitter.getMaxListeners() + 1);
 * 
 * (7)getMaxListeners
 *      返回 EventEmitter 当前的监听器最大限制数的值，
 *      该值可以使用 emitter.setMaxListeners(n) 设置或默认为 EventEmitter.defaultMaxListeners。
 *      
 * (8)listeners(事件名)
 *      返回指定事件的监听器数组
 */
