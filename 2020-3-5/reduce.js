/** 
 * https://mp.weixin.qq.com/s/PYQBGHWYXAx0ryXARwFKQA
 * 
 * 数组reduce高级用法
 */

/**
 * (1) 代替map和filter
 */
const arr = [0, 1, 2, 3];
// 代替map：[0, 2, 4, 6]
const a = arr.map(v => v * 2);
const b = arr.reduce((t, v) => [...t, v * 2], []);

// 代替filter：[2, 3]
const c = arr.filter(v => v > 1);
const d = arr.reduce((t, v) => v > 1 ? [...t, v] : t, []);

// 代替map和filter：[4, 6]
const e = arr.map(v => v * 2).filter(v => v > 2);
const f = arr.reduce((t, v) => v * 2 > 2 ? [...t, v * 2] : t, []);


/** 
 * (2) 数组分割
 */
function Chunk(arr = [], size = 1) {
    return arr.length ? arr.reduce((t, v) => {
        if (t[t.length - 1].length === size) {
            t.push([v]);
        } else {
            t[t.length - 1].push(v);
        }

        return t;

        // return (t[t.length - 1].length === size ? t.push([v]) : t[t.length - 1].push(v), t)
    }, [[]]) : [];
}

const arr = [1, 2, 3, 4, 5];
Chunk(arr, 2); // [[1, 2], [3, 4], [5]]


/** 
 * (3) 数组的差集
 */
function Difference(arr = [], oarr = []) {
    return arr.reduce((t, v) => {
        if (!oarr.includes(v)) {
            t.push(v)
        }

        return t;
    }, []);
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 6]
Difference(arr1, arr2);


/** 
 * (4) 数组最大最小值
 */
function Max(arr = []) {
    return arr.reduce((pre, cur) => pre > cur ? pre : cur);
}

function Min(arr = []) {
    return arr.reduce((pre, cur) => pre < cur ? pre : cur);
}


/** 
 * (5) 数组扁平
 */ 
function Flat(arr = []) {
    return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), [])
}

/** 
 * (6) 字符串翻转
 */
function ReverseStr(str = "") {
    return str.split("").reduceRight((t, v) => t + v);
}

ReverseStr('hello kisure'); // erusik olleh


/**
 * (7) 斐波那契数列
 */
function Fibonacci(len = 2) {
    const arr = [...new Array(len).keys()];
    return arr.reduce((t, v, i) => (i > 1 && t.push(t[i - 1] + t[i - 2]), t), [0, 1]);
}

Fibonacci(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

/** 
 * (8) reduce的性能
 */
// 创建一个长度为100000的数组
const list = [...new Array(100000).keys()];

// for-in
console.time("for-in");
let result1 = 0;
for (let i = 0; i < list.length; i++) {
    result1 += i + 1;
}
console.log(result1);
console.timeEnd("for-in");

// forEach
console.time("forEach");
let result2 = 0;
list.forEach(v => (result2 += v + 1));
console.log(result2);
console.timeEnd("forEach");

// map
console.time("map");
let result3 = 0;
list.map(v => (result3 += v + 1, v));
console.log(result3);
console.timeEnd("map");

// reduce
console.time("reduce");
const result4 = list.reduce((t, v) => t + v + 1, 0);
console.log(result4);
console.timeEnd("reduce");

//总结： reduce > map > forEach > for in

