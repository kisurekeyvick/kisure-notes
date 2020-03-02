/** 
 * https://juejin.im/post/5b2f02cd5188252b937548ab
 * 
 * 手写一个Promise
 */

/**
 * @desc one
 * 由于new Promise((resolve, reject)=>{})，所以传入一个参数（函数），秘籍里叫他executor，传入就执行。
 * executor里面有两个参数，一个叫resolve（成功），一个叫reject（失败）。
 * 由于resolve和reject可执行，所以都是函数，我们用let声明
 */ 

/**
 * @desc two
 * Promise有一个叫做then的方法，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因
 * 当状态state为fulfilled，则执行onFulfilled，传入this.value。当状态state为rejected，则执行onRejected，传入this.reason
 * onFulfilled,onRejected如果他们是函数，则必须分别在fulfilled，rejected后被调用，value或reason依次作为他们的第一个参数
 */

/**
 * @desc three
 * 但是当resolve在setTomeout内执行，then时state还是pending等待状态 我们就需要在then调用的时候，
 * 将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们
 * 
 * 类似于发布订阅，先将then里面的两个函数储存起来，由于一个promise可以有多个then，所以存在同一个数组内。
 */ 

/**
 * @desc four
 * 我门常常用到new Promise().then().then(),这就是链式调用，用来解决回调地狱
 * 
 * (1) 为了达成链式，我们默认在第一个then里返回一个promise,就是在then里面返回一个新的promise,称为promise2：promise2 = new Promise((resolve, reject)=>{})
 * 将这个promise2返回的值传递到下一个then中
 * 如果返回一个普通的值，则将普通的值传递给下一个then中
 * 
 * (2) 当我们在第一个then中return了一个参数（参数未知，需判断）。这个return出来的新的promise就是onFulfilled()或onRejected()的值
 * onFulfilled()或onRejected()的值，即第一个then返回的值，叫做x，判断x的函数叫做resolvePromise
 * 
 * 首先，要看x是不是promise。
 * 如果是promise，则取它的结果，作为新的promise2成功的结果
 * 如果是普通值，直接作为promise2成功的结果
 * 所以要比较x和promise2
 * resolvePromise的参数有promise2（默认返回的promise）、x（我们自己return的对象）、resolve、reject
 * resolve和reject是promise2的
 */

/**
 * @desc five
 * (1) 一段代码，让不同的promise代码互相套用，叫做resolvePromise
 * 如果 x === promise2，则是会造成循环引用，自己等待自己完成，则报“循环引用”错误
    let p = new Promise(resolve => {
        resolve(0);
    });
    var p2 = p.then(data => {
        // 循环引用，自己等待自己完成，一辈子完不成
        return p2;
    })

    (2) 判断x
    - x 不能是null
    - x 是普通值 直接resolve(x)
    - x 是对象或者函数（包括promise），let then = x.then
    - 如果取then报错，则走reject()
    - 如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调
    - 如果成功的回调还是pormise，就递归继续解析
    - 成功和失败只能调用一个 所以设定一个called来防止多次调用 
 */

/**
 * @desc six
 * onFulfilled,onRejected都是可选参数，如果他们不是函数，必须被忽略
 * 
 * onFulfilled返回一个普通的值，成功时直接等于 value => value
 * onRejected返回一个普通的值，失败时如果直接等于 value => value，则会跑到下一个then中的onFulfilled中，所以直接扔出一个错误reason => throw err
 * onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
 * 如果onFulfilled或onRejected报错，则直接返回reject()
 */ 

class Promise {
    /** @desc one */
    constructor(executor){
        this.state = 'pending';
        /** 成功的值 */
        this.value = undefined;
        /** 失败的原因 */
        this.reason = undefined;
        /** 成功存放的数组 */
        this.onResolvedCallbacks = [];
        /** 失败存放法数组 */
        this.onRejectedCallbacks = [];

        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                /** @desc four */
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };

        let reject = reason => { 
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                /** @desc four */
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };

        try {
            executor(resolve. reject);
        } catch(err) {
            reject(err);
        }
    }

    /** @desc two */
    then(onFulfilled,onRejected) {
        /** @desc four */
        /** 要声明返回的promise2 */
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                /** @desc six */
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        /** resolvePromise函数，处理自己return的promise和默认的promise2的关系 */
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                }, 0);
            }
    
            if (this.state === 'rejected') {
                /** @desc six */
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        /** resolvePromise函数，处理自己return的promise和默认的promise2的关系 */
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                }, 0);
            }
    
            if (this.state === 'pending') {
                /** 将onFulfilled传入到成功的数组中 */
                /** @desc three */
                this.onResolvedCallbacks.push(() => {
                    /** @desc six */
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            /** resolvePromise函数，处理自己return的promise和默认的promise2的关系 */
                            resolvePromise(promise2, x, resolve, reject);
                        } catch(e) {
                            reject(e);
                        }
                    }, 0);
                });
    
                /** 将onRejected传入到失败的数组中 */
                this.onRejectedCallbacks.push(() => {
                    /** @desc six */
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            /** resolvePromise函数，处理自己return的promise和默认的promise2的关系 */
                            resolvePromise(promise2, x, resolve, reject);
                        } catch(e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });

        return promise2;
    }
}

/** @desc five */
function resolvePromise(promise2, x, resolve, reject) {
    /** 循环引用报错 */
    if (x === promise2) {
        // reject
        return reject(new TypeError('循环引用报错'));
    }

    /** 防止多次调用 */
    let called;

    /** x不是null 且x是对象或者函数 */
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            /** 如果then是函数，就默认是promise了 */
            if (typeof then === 'function') {
                /** 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调 */
                then.call(x, success => {
                    /** 成功和失败只能调用一次 */
                    if (called) return;
                    called = true;
                    /** resolve的结果依旧是promise 那就继续解析 */
                    resolvePromise(promise2, success, resolve, reject);
                }, err => {
                    /** 成功和失败只能调用一次 */
                    if (called) return;
                    called = true;
                    reject(err);
                });
            } else {
                /** 直接成功即可 */
                resolve(x);
            }
        } catch(err) {
            /** 属于失败 */
            if (called) return;
            called = true;
            /** 取then出错了那就不要在继续执行了 */
            reject(err);
        }
    } else {
        resolve(x);
    }
}

//resolve方法
Promise.resolve = function(val){
    return new Promise((resolve,reject)=>{
      resolve(val)
    });
  }
  //reject方法
Promise.reject = function(val){
    return new Promise((resolve,reject)=>{
        reject(val)
    });
}
//race方法 
Promise.race = function(promises){
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
        promises[i].then(resolve,reject)
        };
    })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function(promises){
    let arr = [];
    let i = 0;
    
    function processData(index,data){
        arr[index] = data;
        i++;

        if(i == promises.length){
            resolve(arr);
        };
    };

    return new Promise((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
            promises[i].then(data=>{
                processData(i,data);
            },reject);
        };
    });
}