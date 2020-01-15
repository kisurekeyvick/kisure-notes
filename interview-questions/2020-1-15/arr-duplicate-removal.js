/** 
 * https://mp.weixin.qq.com/s/ipxCQRZ1rj6VJXIP659IBg
 * 前言：
 * 
 * 数组去重应该是面试必考问题之一。
 * 
 * 虽然它是一道并不复杂的问题，但是也能看出面试者的广度和深度，还有考虑问题的全面性。
 * 
 * 实际开发中我们应该选择哪种方式数组去重，本文告诉你。
 * 
 * 你以为的不一定你以为，面试官不只是让你去重一个数组，他想知道的有点多，包括你的思想
 */

/**  
 * 双层 for 循环
 */
function distinct_1(arr) {
    for (let i=0, len=arr.length; i<len; i++) {
        for (let j=i+1; j<len; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                // splice 会改变数组长度，所以要将数组长度 len 和下标 j 减一
                len--;
                j--;
            }
        }
    }

    return arr;
};

/**
 * Array.filter() 加 indexOf
 * @param {*} a 
 * @param {*} b 
 */
function distinct_2(a, b) {
    let arr = a.concat(b);
    return arr.filter((item, index)=> {
        return arr.indexOf(item) === index;
    });
}

/** 
 * Array.sort() 加一行遍历冒泡(相邻元素去重)
 * 
 * 思想： 调用了数组的排序方法 sort()，V8引擎 的 sort() 方法在数组长度小于等于10的情况下，
 * 会使用插入排序，大于10的情况下会使用快速排序。然后根据排序后的结果进行遍历及相邻元素比对(其实就是一行冒泡排序比较)，
 * 如果相等则跳过该元素，直到遍历结束
 */
function distinct_3(array) {
    const res = [];
    const sortedArray = array.concat().sort();
    let seen;

    for (var i = 0, len = sortedArray.length; i < len; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }

        seen = sortedArray[i];
    }

    return res;
}


/**
 * ES6 set去重
 * @param {*} array 
 */
function distinct_4(array) {
    return Array.from(new Set(array));
}


/**
 * @param {*} array 
 * 
 * 思路： 这种方法是利用一个空的 Object 对象，我们把数组的值存成 Object 的 key 值，
 * 比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的,
 * 但是最后请注意这里obj[typeof item + item] = true没有直接使用obj[item],是因为 123 和 '123' 是不同的，
 * 直接使用前面的方法会判断为同一个值，因为对象的键值只能是字符串，所以我们可以使用 typeof item + item 拼成字符串作为 key 值来避免这个问题。
 */
function distinct_5(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    });
}


/** 
 * 上面的多种数组去后，计算耗费时间
 * 双重 for 循环 >  Array.filter()加 indexOf  > Array.sort() 加一行遍历冒泡 > ES6中的Set去重 > Object 键值对去重复
 */


/** 
 * indexOf 与 Set 的一点说明
 * 
 * 上面代码中console.log(NaN === NaN); // false, indexOf 底层使用的是 === 进行判断，所以使用 indexOf 查找不到 NaN 元素
 */
// 如下：
const arr = [1, 2, NaN];
arr.indexOf(NaN); // -1

// Set可以去重NaN类型， Set内部认为尽管 NaN === NaN 为 false，但是这两个元素是重复的
[...new Set([NaN, NaN, 1,2,3,NaN])] // [NaN, 1, 2, 3]


/** 
 * 内存考虑
 * 
 * 虽然说对于 V8 引擎，内存考虑已经显得不那么重要了，而且真的数据量很大的时候，一般去重在后台处理了。
 * 
 * 以上的所有数组去重方式，应该 Object 对象去重复的方式是时间复杂度是最低的，除了一次遍历时间复杂度为O(n) 后，
 *      查找到重复数据的时间复杂度是O(1)，类似散列表，大家也可以使用 ES6 中的 Map 尝试实现一下。
 * 
 * 但是对象去重复的空间复杂度是最高的，因为开辟了一个对象，其他的几种方式都没有开辟新的空间，
 * 从外表看来，更深入的源码有待探究，这里只是要说明大家在回答的时候也可以考虑到时间复杂度还有空间复杂度。
 */

