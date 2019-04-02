/**
 * 扁平化n维数组
 */
// 方式1：Array.flat(n)是ES10扁平数组的api， n表示维度， n值为 Infinity时维度为无限大。
[1, [2,3]].flat(2);  // [1,2,3]
[1, [2,3,[4,5]]].flat(3);   // [1,2,3,4,5]
// [1, [2,3,[4,5[...]]]].flat(Infinity);    // [1,2,3,4,5...]

// 方式2
/** 
 * 使用while循环判断，判断条件是只要arr中存在一个熟悉是Array类型的，那么就会指向[].concat(...arr);
 * ...arr就是讲数组打散，例如：[1,[2,3]] 经过...的改造，就会变成：1,[2,3]
 * 也就是说 [].concat(...[1,[2,3]])等同于[].concat(1,[2,3])
*/
function flatten(arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr;
}
flatten([1,[2,3]]); // [1,2,3]
flatten([1,[2,3, [4,5]]]);  // [1,2,3,4,5]

/**
 * 数组去重
 */
/** 
 * 方法1：set是ES6新出来的一种一种定义不重复数组的数据类型
 * Array.from是将类数组转化为数组
 * */
//  Array.from(new Set([1,2,2,3,4,4]));
// [...new Set([1,2,2,3,4,4])];

/**
 * 方法2：
 */
Array.prototype.distinct = function() {
    let arr = this;
    let result = [];
    let i, j, len = arr.length;

    for(i = 0; i < len; i++) {
        for(j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
                j = ++i;
                /** 
                 * 重点在这里，如果相同，那么++i,于是下一次i的值就会加上1
                 * 不管是什么数，第几个数，只要是相同，那么就会设置i的值和j的值
                 * 一旦j的值改变，如果原先j=5的，后来变成2，那么下一次循环，j处遍历又从2开始遍历
                 * */
            }
        }
        result.push(arr[i]);
    }

    return result;
};
console.log([1,2,2,3,4,3,4,3,1].distinct());    //1,2,3,4

/**
 * 排序
 */
// 方法1：
[1,2,3,3,4].sort(); //默认是升序
[1,2,3,3,4].sort((a, b) => b - a);  //降序

// 冒泡排序（这里就不赘述了，过一段时间整理一下所有的排序）

/**
 * 最大值
 */
// 终极方法：
Math.max(...[1,2,3,4]);
Math.max.apply(this, [1,2,3,4]);    // 这两个方法是同一个意思，目的都是
// 前两个等同于
Math.max(1,2,3,4);
[1,2,3,4].reduce((pre, cur, curIndex, arr) => {
    /**
     * pre          初始值, 或者计算结束后的返回值
     * cur          当前元素
     * curIndex     当前元素的索引
     * arr          当前元素所属的数组对象
     */
    return Math.max(pre, cur);
}, 0);

/**
 * 求和
 */
[1,2,3,4].arr.reduce((pre, cur) => {
    return pre + cur;
}, 0);


/**
 * 判断是否包含某个值
 */
[1,2,3,4].includes(4);    // false
[1,2,3,4].indexOf(2);   // 1, 如果返回-1代表不存在
[1,2,3,4].find(item => item === 2);
[1,2,3,4].findIndex(item => item === 2);


/**
 * 每一项设置值
 */
/**
 * fill 是ES6方法
 * 语法：array.fill(value, start, end)sss
 */
 [1,2,3,4].fill(true);   // [true, true, true, true]
 [1,2,3,4].fill(true, 2,4); // [1, 2, true, true]
