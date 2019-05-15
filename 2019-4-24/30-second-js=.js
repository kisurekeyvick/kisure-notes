/**
 * 关于 shift()和pop() , unshift()和push()
 */
const array = [1,2,3,4,5];
array.shift();   // 1
console.log(array); // [2,3,4,5]
array.pop();    // 5
console.log(array); //[2,3,4]
array.push(1);  // 返回数组的长度
console.log(array); // [2, 3, 4, 1]
array.unshift(5);   // 返回数组的长度
console.log(array); // [5, 2, 3, 4, 1]

const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);

/**
 * 定义一个值，在一个数组的元素中找出和这个值相同的值得下标
 * @param {*} arr 
 * @param {*} val 
 */
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]

/**
 * 创建一个多维数组
 * x代表第二次数组内部元素长度
 * y代表顶层数组内部元素长度
 * 
 * 其中:fill用于填充数组元素的值
 */
const initialize2DArray = (x, y, val = null) => 
    Array.from({length: y}).map(() =>Array.from({length: x}).fill(val));

initialize2DArray(2,5,'k'); // [Array(2), Array(2), Array(2), Array(2), Array(2)]

/**
 * array.fill(value, start, end)
 * 参数：
 * (1)value     填充的值
 * (2)start     开始填充位置
 * (3)end       停止填充位置 (默认为 array.length)
 */
[1,2,3,4,5].fill('hello', 1,3); //  [1, "hello", "hello", 4, 5]

/**
 * 创建一个n维数组
 */
const initializeNDArray = (val, ...args) => 
    args.length === 0 ? val : Array.from({ length: args[0] }).map(() => initializeNDArray(val, ...args.slice(1)));

initializeNDArray(1,3);     // [1,1,1]
initializeNDArray(5,2,2,2); // [ [ [ 5,5 ], [ 5,5 ] ], [ [ 5,5 ], [ 5,5 ] ] ]

/**
 * 传入一个function，找出两个数组中的成员的相同处
 */
const intersectionBy = (a, b, fn) => {
    const set = new Set(b.map(fn));
    return a.filter(item => set.has(fn(item)));
};

intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]

/**
 * Math.round(x)
 * 作用：把一个数字舍入为最接近的整数, 对于 0.5，该方法将进行上舍入
 * 注意的是x必须为数字
 */
Math.round(3.5);    //4
Math.round(3.4);    //3

/**
 * 
 */
