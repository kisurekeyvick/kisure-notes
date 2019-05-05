/** 
 * 数组的下标不一定是连续的，直接赋值还会影响它的长度
 */
let arr = [];
arr[3] = 3;
console.log(arr[0]);  // undefined
console.log(arr[1]);  // undefined
console.log(arr[2]);  // undefined
console.log(arr[3]);  // 3

/** 
 * 手写一个类似forEach的功能，内部能够实现异步操作
 */
Array.prototype.kisureForEach = async function(fn, context = null) {
    let index = 0;
    let arr = this;

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    while(index < arr.length) {
        if (index in arr) { // 数组的下标不一定是连续的
            await fn.call(context, arr[index], index, arr);
        }
        index ++;
    }
};

/** 
 * map内部实现
 * map 的实现大体和 forEach 类似，只是返回了一个新数组。
 */
Array.prototype.kisureMap = async function(fn, context = null) {
    let arr = this;
    let len = arr.length;
    let index = 0;
    let newArr = [];

    if (typeof fn === 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    while(index < len) {
        if (index in arr) {
            const result = fn.call(context, arr[index], index, arr);
            newArr[index] = result;
        }
        index ++;
    }

    return newArr;
};

/** 
 * reduce
 */
Array.prototype.kisureReduce = function(...args) {
    let arr = this;
    let len = arr.length;
    let index = 0;
    let fn = args[0];
    let result;

    if (args.length >= 2) {
        // 判断是否存在第二个参数，如果存在，那么它将作为fn运行的初始值
        result = args[1];
    } else {
        /** 
         * 如果reduce在没有第二个参数的时候，会把数组的第一项作为回调的初始值
         * 例如：第一项并不一定是a[0]
         */
        while(index < len && !(index in arr)) {
            index ++;
        }

        if (index >= len) {
            // 如果第一项 >= 数组的长度，那么说明是空数组
            throw new TypeError('空数组且没有初始值');
        }

        result = arr[index++];
        /** 
         * 给result赋值以后，index的值就会加上1
         */
    }

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    while(index < len) {
        if (index in arr) {
            // 每次回调的返回值，都会传入下次回调
            result = fn(result, arr[index], index, arr);
        }

        index ++;
    }

    return result;
};

console.log([1,2,3,4].kisureReduce((pre, cur, index, arr) => {
    pre += cur;
    return pre;
}, 100));
