/**
 * https://juejin.im/post/5cb1d5a3f265da03587bed99
 * 为啥 await 在 forEach 中不生效？
 */

function test() {
    let arr = [3, 2, 1]
    arr.forEach(async item => {
      const res = await fetch(item)
      console.log(res)
    })
    console.log('end')
}
  
function fetch(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(x)
        }, 500 * x)
    })
}

test()

// 结果：1 2 3

/**
 * 原因：forEach只支持同步代码
 * 
 * Polyfill 版本的 forEach，简化以后类似就是这样的伪代码：

    while (index < arr.length) {
        // 也就是我们传入的回调函数
        callback(item, index)
    }

    从上述代码中我们可以发现，forEach 只是简单的执行了下回调函数而已，并不会去处理异步的情况。
    并且你在 callback 中即使使用 break 也并不能结束遍历。
 */
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback/*, thisArg*/) {
    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this);
    var len = O.length >>> 0;

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    if (arguments.length > 1) {
      T = arguments[1];
    }

    k = 0;

    while (k < len) {
      var kValue;

      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}

/**
 * 在for...of中使用
 */
async function test() {
    let arr = [3, 2, 1]
    for (const item of arr) {
      const res = await fetch(item)
      console.log(res)
    }

    console.log('end')
}

/**
 * 为啥 for...of 内部就能让 await 生效呢?
 * 因为 for...of 内部处理的机制和 forEach 不同，forEach 是直接调用回调函数，for...of 是通过迭代器的方式去遍历。
 */
async function test() {
    let arr = [3, 2, 1]
    const iterator = arr[Symbol.iterator]()
    let res = iterator.next()
    while (!res.done) {
        const value = res.value
        const res1 = await fetch(value)
        console.log(res1)
        res = iterator.next()
    }
    console.log('end');
}
// 以上代码等价于 for...of，可以看成 for...of 是以上代码的语法糖
