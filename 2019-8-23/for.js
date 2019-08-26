/** 
 * 为什么普通 for 循环的性能远远高于 forEach 的性能，请解释其中的原因。
 */
let arrs = new Array(100000);

console.time('for');
for (let i = 0; i < arrs.length; i++) {

};
console.timeEnd('for');

console.time('forEach');
	
arrs.forEach((arr) => {
 
});
console.timeEnd('forEach');

// for: 2.263ms
// forEach: 0.254ms

/** 
 * 总结：
 * (1) 在10万这个级别下， forEach 的性能是 for的十倍
 *  for: 2.263ms
 *  forEach: 0.254ms
 * 
 * (2) 在100万这个量级下， forEach 的性能是和for的一致
 *  for: 2.844ms
 *  forEach: 2.652ms
 * 
 * (3) 在1000万级以上的量级上 ， forEach 的性能远远低于for的性能
 *  for: 8.422ms
 *  forEach: 30.328m
 */