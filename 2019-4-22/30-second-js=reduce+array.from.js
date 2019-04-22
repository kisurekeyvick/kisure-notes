/**
 * Array.prototype.reduce
 * 
 * reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数:
 * (1)初始值（或者上一次回调函数的返回值），
 * (2)当前元素值，
 * (3)当前索引，
 * (4)调用 reduce 的数组。
 */

let bifurcate = (arr, filter) => 
    arr.reduce((acc, val, i) => 
            (acc[filter[i] ? 0 : 1].push(val), acc), 
        [[], []]);

// 等同于

bifurcate = (arr, filter) => 
    arr.reduce((acc, val, i) => {
        acc[filter[i] ? 0 : 1].push(val);
        return acc;
    }, [[], []]);

bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]);

/**
 * 这里我们在最后return时候((acc[filter[i] ? 0 : 1].push(val), acc), [[], []])
 * 先运算acc[filter[i] ? 0 : 1].push(val)，然后在返回acc
 */

const bifurcateBy = (arr, fn) =>
    arr.reduce((acc, val) => 
        (acc[fn(val) ? 0 : 1].push(val), acc), 
    [[], []]);

bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b');
// [ ['beep', 'boop', 'bar'], ['foo'] ]


/**
 * Array.from
 * 
 * Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组
 * 语法：Array.from(arrayLike[, mapFn[, thisArg]])
 * 接收三个参数：
 * (1)arrayLike    想要转换成数组的伪数组对象或可迭代对象
 * (2)mapFn        如果指定了该参数，新数组中的每个元素会执行该回调函数
 * (3)thisArg      执行回调函数 mapFn 时 this 对象
 * 
 * Array.from()返回值是一个新的数组实例（真正的数组）
 * 
 * chunk功能：
 * 通过Array.from的第一个参数进行改造数组，生成新的数组。
 * 循环调用每一个新数组成员（根据父级传入进来的arr数组参数），通过function返回值进行数组子元素的重新修改。
 */
const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]

Array.from({ length: Math.ceil([1, 2, 3, 4, 5].length / 2) }, () => {
    return 'hello';
});

/**
 * Array.from({ length: Math.ceil([1, 2, 3, 4, 5].length / 2) })
 * ['undefined', 'undefined', 'undefined']
 * 
 * 第二个参数mapFn存在，如果mapFn返回对应的结果，那么这些结果就会填充到数组中
 * ['undefined', 'undefined', 'undefined'] => ['hello', 'hello', 'hello']
 * 
 * countBy功能：
 * 将数组元素，根据传入的方法或者属性修改数组元素，并且返回修改后的数组元素其重复的次数
 */

const countBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
/**
 * [6.1, 4.2, 6.3].map(Math.floor)  => [6, 4, 6]
 * [6, 4, 6].reduce((acc, val) => (acc[val] = (acc[val] || 0) + 1, acc), {}) => {4: 1, 6: 2}
 *      执行顺序结果：{ 6:1 }
 *                   { 4:1 }
 *                  { 6:2 }
 *      结果：{4: 1, 6: 2}
 */

countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1}
/**
 * ['one', 'two', 'three'].map(val => val['length']); // [3, 3, 5]
 * [3, 3, 5].reduce((acc, val) => (acc[val] = (acc[val] || 0) + 1, acc), {}) => 
 *      执行顺序结果： { 3:1 }
 *                    { 3:2 }
 *                    { 5:1 }
 */

/**
 * 统计一个数组中某个值出现了多少次
 * @param {*} arr 
 * @param {*} val 
 */
const countOccurrences = (arr, val) => arr.reduce((preVal, curVal, index, source) => {
    return (preVal = curVal === val ? (preVal + 1) : preVal, preVal);
}, 0);

/**
 * 将多维数组打平
 */
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]