/**
 * https://mp.weixin.qq.com/s/wpTaaeltyItMPoMUfJ27fA
 * 
 * JavaScript 手写代码无敌秘籍
 */

/**
 * (1) 实现一个new操作符
 * 
 * new操作符做了这些事：
 * - 创建一个全新的对象
 * - 新创建的对象的proto被赋值为func的prototype
 * - 将this指向新创建的对象
 * - 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上
 * - 如果函数没有返回对象类型Object(包含：Function,Array,Date),那么new表达式中的函数调用将返回改对象的引用
 */
function newFunc(func) {
    // 创建一个全新的对象
    let res = {};
    if (func.prototype !== null) {
        // 新创建的对象的proto被赋值为func的prototype
        res.__proto__ = func.prototype;
    }
    // 将this指向新创建的对象
    // 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上
    let ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
    if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
        return ret;
    }
    // 如果函数没有返回对象类型Object(包含：Function,Array,Date),那么new表达式中的函数调用将返回改对象的引用
    return res;
}

/** 
 * (2) 实现一个JSON.stringify
 * 
 * - Boolean|Number|String 类型会自动转换成对应的原始值
 * - undefined、任意函数以及 symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）
 * - 不可枚举的属性会被忽略
 * - 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。
 */
function jsonStringify(obj) {
    let type = typeof obj;

    if (type !== 'object' || type === null) {
        if (/string|undefined|function/.test(type)) {
            obj = '"'+ obj + '"';
        }

        return String(obj);
    } else {
        let json = [];
        let isArr = obj && obj.constructor === Array;

        for (let k in obj) {
            let v = obj[k];
            let innerType = typeof v;

            if (/string|undefined|function/.test(innerType)) {
                v = '"'+ v + '"';
            } else if (innerType === 'object') {
                v = jsonStringify(v);
            }

            json.push((isArr ? '' : '"' + k + '":') + String(v));
        }

        return (isArr ? "[" : "{") + String(json) + (isArr ? "]" : "}");
    }
}

/** 
 * (3) 实现一个JSON.parse
 * 
 * 用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)。
 */
// 使用递归的方法
const jsonStr = '{ "age": 20, "name": "kisure" }';
const json = (new Function('return ' + jsonStr))();

/** 
 * (4) 实现一个call或者apply
 * 
 * call语法：
 * fun.call(替代执行的对象, arg1, arg2...)
 * 
 * apply语法：
 * func.apply(替代执行的对象, [argsArray])
 */
Function.prototype.call_2 = function(content = window) {
    // this指向的是调用call_2的function
    content.fn = this;
    let args = [...arguments].slice(1);
    // 指定 this到函数并传入给定参数执行函数，并赋值给result
    let result = content.fn(...args);
    // 执行&删除这个函数
    delete content.fn;
    return result;
}

const foo = {
    value: 1
}

function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

bar.call_2(foo, 'black', '18'); // balck 18 1

Function.prototype.apply_2 = function(context = window) {
    context.fn = this;
    let result;
    // 判断是否有第二个参数
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }

    delete context.fn;
    return result;
}

bar.apply_2(foo, ['black', '18']);

/**
 * (5) 实现一个Function.bind()
 * 
 * 会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
 * 之后的一序列参数将会在传递的实参前传入作为它的参数
 */
Function.prototype.bind_2 = function(context) {
    if (typeof this !== 'function') {
        throw Error('not a function');
    }

    // this指向调用bind_2的function
    let fn = this;
    // 传递的参数
    let args = [...arguments].slice(1);
    // 产生一个新的function
    let resFn = function() {
        /**
         * fn.apply的第一个参数是上下文内容
         * 因为考虑到用new的方式创建一个bind过的函数，所以需要判断this是不是来自于resFn的原型链
         * 如果是resFn的原型链，那么选择this，这个this指向的是resFn的上下文环境, 和调用bind_2的上下文环境没有关系了
         * 否则就是context
         */
        return fn.apply(this instanceof resFn ? this : context, args.concat(...arguments));
    }

    /**
     * 新产生的function的prototype指向的是调用bind方法的prototype
     */
    function tmp() {}
    tmp.prototype = this.prototype;
    resFn.prototype = new tmp();

    return resFn;
}

/**
 * (6) 实现一个继承
 * 
 * 寄生组合式继承
 */
function Parent(name) {
    this.name = name;
}

Parent.prototype.sayName = function() {
    console.log(this.name);
}

function Child(name, ParentName) {
    Parent.call(this, ParentName);
    this.name = name;
}

function empt() {}
empt.prototype = Parent.prototype;

Child.prototype = new empt();
Child.prototype.say = function() {
    console.log(this.name)
}
Child.prototype.constructor = Child;

/** 
 * https://juejin.im/post/5aa7868b6fb9a028dd4de672#heading-10
 * 
 * (7) 手写一个Promise
 */
const PENDING = 'pending';
const FULFILED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(excutor) {
    // 缓存当前promise实例对象
    let that = this;
    // 初始状态
    that.status = PENDING; 
    // fulfilled状态时 返回的信息
    that.value = undefined; 
    // rejected状态时 拒绝的原因
    that.reason = undefined; 
    // 存储fulfilled状态对应的onFulfilled函数
    that.onFulfilledCallbacks = []; 
    // 存储rejected状态对应的onRejected函数
    that.onRejectedCallbacks = []; 

    // value成功态时接收的终值
    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }

        // 为什么resolve 加setTimeout?
        // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
        /**
         * 这里的平台代码指的是引擎、环境以及 promise 的实施代码
         * 实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
         */
        setTimeout(() => {
            // 调用resolve 回调对应onFulfilled函数
            if (that.status === PENDING) {
                // 只能由pending状态 => fulfilled状态 (避免调用多次resolve reject)
                that.status = FULFILLED;
                that.value = value;
                that.onFulfilledCallbacks.forEach(cb => cb(that.value));
            }
        });
    }

    // reason失败态时接收的拒因
    function reject(reason) {
        setTimeout(() => {
            // 调用reject 回调对应onRejected函数
            if (that.status === PENDING) {
                // 只能由pending状态 => rejected状态 (避免调用多次resolve reject)
                that.status = REJECTED;
                that.reason = reason;
                that.onRejectedCallbacks.forEach(cb => cb(that.reason));
            }
        });
    }

    // 捕获在excutor执行器中抛出的异常
    // new Promise((resolve, reject) => {
    //     throw new Error('error in excutor')
    // })
    try {
        excutor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
        return reject(new TypeError('循环引用'));
    }

    let called = false; // 避免多次调用
    // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
    if (x instanceof Promise) {
        // 获得它的终值 继续resolve

        if (x.status === PENDING) {
            // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject);
            }, reason => {
                reject(reason);
            });
        } else {
            // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
            x.then(resolve, reject);
        }
    } else if (x !== null && ((typeof x === 'object') || (typeof x === 'function'))) {
        try {// 是否是thenable对象（具有then方法的对象/函数）
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if(called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, reason => {
                    if(called) return;
                    called = true;
                    reject(reason);
                });
            } else { // 说明是一个普通对象/函数
                resolve(x);
            }
        } catch(e) {
            if(called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    const that = this;
    let newPromise;
    // 处理参数默认值 保证参数后续能够继续执行
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected = typeof onRejected === "function" ? onRejected : reason => {
        throw reason;
    };

    // then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
    /**
     * 原因:
     * 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 
     *      所以要在resolve里加上setTimeout
     * 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 
     *      由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 
     *      也要异步执行onFulfilled/onRejected
     */
    if (that.status === FULFILLED) {
        // 成功状态
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(that.value);
                    // 新的promise resolve 上一个onFulfilled的返回值
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                    reject(e);
                }
            });
        });
    }

    if (that.status === REJECTED) {
        // 失败态
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        });
    }

    if (that.status === PENDING) {
        // 等待态
        return newPromise = new Promise((resolve, reject) => {
            that.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });

            that.onRejectedCallbacks.push((value) => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        });
    }
}
