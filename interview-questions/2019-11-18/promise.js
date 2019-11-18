/**
 * Promise 必知必会
 */

/**
 * (1)
 */
function promise_1() {
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('success')
        }, 1000)
    })

    const promise2 = promise1.then(() => {
        throw new Error('error!!!')
    })
    
    console.log('promise1：', promise1)
    console.log('promise2：', promise2)
    
    setTimeout(() => {
        console.log('promise1：', promise1)
        console.log('promise2：', promise2)
    }, 2000)
}

/**
 * 结果：
 *      promise1： Promise {<pending>}
 *      promise2： Promise {<pending>}
 *      VM187:9 Uncaught (in promise) Error: error!!!
 *      promise1： Promise {<resolved>: "success"}
 *      promise2： Promise {<rejected>: Error: error!!!
 * 
 *      上面 promise2 并不是 promise1，而是返回的一个新的 Promise 实例。
 */

/** 
 * (2) 
 */
function Promise_2() {
    const promise = newPromise((resolve, reject) => {
        resolve('success1')
        reject('error')
        resolve('success2')
    })
      
    promise.then((res) => {
          console.log('then: ', res)
        })
        .catch((err) => {
          console.log('catch: ', err)
        })
}

/** 
 * 结果：then:  success1
 *      
 *      构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用。
 *      `promise 状态一旦改变则不能再变`
 */

/**
 * (3) 
 */
function Promise_3() {
    Promise.resolve(1)
    .then((res) => {
        console.log(res)
        return 2
    })
    .catch((err) => {
        return 3
    })
    .then((res) => {
        console.log(res)
    })
}

/**
 * 结果：1 2
 * 
 *      promise 可以链式调用，promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用。
 *      return 3等同于 return resolve(3);
 */

/**
 * (4) 
 */
function Promise_4() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('once')
            resolve('success')
        }, 1000)
    })
      
    const start = Date.now()

    promise.then((res) => {
        console.log(res, Date.now() - start)
    })

    promise.then((res) => {
        console.log(res, Date.now() - start)
    })
}

/**
 * 结果：once
 *      success 1005
 *      success 1007
 * 
 *      promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。
 *      或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值。
 */

/**
 * (5)
 */
function Promise_5() {
    Promise.resolve()
    .then(() => {
        return new Error('error!!!')
    })
    .then((res) => {
        console.log('then: ', res)
    })
    .catch((err) => {
        console.log('catch: ', err)
    })
}

/**
 * 结果：then: Error: error!!!
 * 
 *      .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获
 *      因为 return new Error('error!!!')等同于return Promise.reject(newError('error!!!')) 或者 throw new Error('error!!!')
 *      因为返回任意一个非 promise 的值都会被包裹成 promise 对象，
 *      即 return new Error('error!!!') 等价于 return Promise.resolve(new Error('error!!!'))
 */

/**
 * (6)
 */
function Promise_6() {
    const promise = Promise.resolve().then(() => {
      return promise
    });

    promise.catch(console.error)
}

/**
 * 结果：TypeError: Chaining cycle detected for promise #<Promise>
 *      
 *      因为.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环
 */

/** 
 * (7)
 */
function Promise_7() {
    Promise.resolve(1)
      .then(2)
      .then(Promise.resolve(3))
      .then(console.log)
}

/**
 * 结果：1
 *      
 *      因为：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透
 */

/**
 * (8)
 */
function Promise_8() {
    Promise.resolve()
        .then(function success (res) {
            throw new Error('error')
        }, function fail1 (e) {
            console.error('fail1: ', e)
        })
        .catch(function fail2 (e) {
            console.error('fail2: ', e)
        })
}

/**
 * 结果：
 *      .then 可以接收两个参数，第一个是处理成功的函数，第二个是处理错误的函数。
 *      .catch 是 .then 第二个参数的简便写法，
 *      但是它们用法上有一点需要注意：
 *          .then 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，
 *          而后续的 .catch 可以捕获之前的错误
 */
