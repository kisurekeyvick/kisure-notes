/** 
 * 装逼又实用的js
 */

/** 
 * (1) 使用 ^ 切换变量 0 或 1
 * 注意：上面说了，只是变化0和1
 */
let toggle = 1;
// --- before ---
// if 判断
if (toggle) {
    toggle = 0;
} else {
    toggle = 1;
}
// 三目运算符
togle = toggle ? 0 : 1;

// --- after ---
toggle ^= 1;

/** 
 * (2) 使用 & 判断奇偶性
 * 
 * 偶数 & 1 = 0
 * 奇数 & 1 = 1
 */
console.log(7 & 1);    // 1
console.log(8 & 1) ;   // 0

/** 
 * (3) 使用 !! 将数字转为布尔值
 * 
 * 所有非0的值都是true，包括负数、浮点数
 */
console.log(!!7);       // true
console.log(!!0);       // false
console.log(!!-1);      // true
console.log(!!0.71);    // true

/** 
 * (4) 使用^来检查数字是否不相等
 */
// --- before ---
if (a !== 1171) {
    // ...
};
// --- after ---
if (a ^ 1171) {
    // 如果a于1171不相等，则.....
}

/** 
 * (5) 使用.link() 创建链接
 * 
 * 一个鲜为人知的方法，可以快速创建 a 标签
 */
// --- before ---
let b = `<a herf="www.google.com">google</a>`;
    
// --- after ---
let b = 'google'.link('www.google.com');

/** 
 * (6) 使用 1/0 来替代 Infinity
 */
// --- before ---
[Infinity, -Infinity]

// --- after ---
[1/0, -1/0]

/** 
 * (7) for 循环条件的简写
 */
// --- before ---
for(let i = 0; i < arr.length; i++) {
    // ...
}    
// --- after ---
for(let i = arr.length; i--;) {
    // ...
} // 注意 i-- 后面的分号别漏了
