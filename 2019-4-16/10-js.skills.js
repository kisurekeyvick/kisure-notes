/**
 * 1. 过滤唯一值
 * ES6 引入了 Set 对象和延展（spread）语法...，我们可以用它们来创建一个只包含唯一值的数组。
 * 这个技巧可以支持包含原始类型的数组：undefined、null、boolean、string 和 number。
 * 但如果你的数组包含了对象、函数或其他嵌套数组，就不能使用这种方法了。
 */
const array = [1, 1, 2, 3, 5, 5, 1];
const uniqueArray = [...new Set(array)];
console.log(uniqueArray);   // Result: [1, 2, 3, 5]

/** 
 * 2. 在循环中缓存数组长度
 * 在我们学习使用 for 循环时，一般建议使用这种结构:
    for (let i = 0; i < array.length; i++){
        console.log(i);
    }

    造成影响：在使用这种方式时，for 循环的每次迭代都会重复计算数组长度。
    有时候这个会很有用，但在大多数情况下，如果能够缓存数组的长度会更好，这样只需要计算一次就够了。
 */
// 优化
for (let i = 0, length = array.length; i < length; i++){
    console.log(i);
}
// 这段代码和上面的差不多，但从性能方面来看，即使数组变得很大，也不需要花费额外的运行时重复计算 array.length。

/**
 * 3. 短路求值
 * 使用三元运算符可以很快地写出条件语句，例如：
    x > 100 ? 'Above 100' : 'Below 100';
    x > 100 ? (x > 200 ? 'Above 200' : 'Between 100-200') : 'Below 100';

    但有时候三元运算符仍然很复杂，我们可以使用逻辑运算符 && 和||来替代，让代码更简洁一些。
    这种技巧通常被称为“短路求值”。
 */
/** 
 * 假设我们想要返回两个或多个选项中的一个，使用 && 可以返回第一个 false。
    如果所有操作数的值都是 true，将返回最后一个表达式的值。
*/
let one = 1, two = 2, three = 3;
console.log(one && two && three);       // Result: 3
console.log(0 && null);                 // Result: 0

/**
 * 使用||可以返回第一个 true。如果所有操作数的值都是 false，将返回最后一个表达式的值。
 */
let one = 1, two = 2, three = 3;
console.log(one || two || three); // Result: 1
console.log(0 || null); // Result: null

/**
 * 假设我们想要返回一个变量的 length，但又不知道变量的类型。
    我们可以使用 if/else 来检查 foo 是否是一个可接受的类型，但这样会让代码变得很长。这个时候可以使用短路求值：
 */
function run(foo) {
    return (foo || []).length;
}

/**
 * 你是否曾经在访问嵌套对象属性时遇到过问题？
 * 你可能不知道对象或某个子属性是否存在，所以经常会碰到让你头疼的错误。
 */
// 优化前
function test(state) {
    if (state.data) {
        return state.data;
    } else {
        return 'Fetching Data';
    }
}

// 优化后
function test(state) {
    return (state.data || 'Fetching Data');
}

/**
 * 4. 转换成布尔值
 * 除了标准的布尔值 true 和 false，在 JavaScript 中，所有的值要么是“真值”要么是“假值”。
 * 在 JavaScript 中，除了 0、“”、null、undefined、NaN 和 false 是假值之外，其他的都是真值。
 * 我们可以使用! 云算法来切换 true 和 false。
 */
const item = !!'';  // false
const item = !!null;    // false

/**
 * 5. 转换成字符串
 * 要快速将数字转换成字符串，我们可以使用 + 运算符，然后在后面跟上一个空字符串。
 */
const val = 1 + "";
console.log(val); // Result: "1"

/**
 * 6. 转换成数字
 * 要把字符串转成数字，也可以使用 + 运算符。
 */
let int = "15";
int = +int;
console.log(int); // Result: 15
console.log(typeof int);    //Result: "number"

// 也可以使用这种方式将布尔值转成数字，例如：
console.log(+true);  // Return: 1
console.log(+false); // Return: 0

/**
 * 在某些情况下，+ 运算符会被解析成连接操作，而不是加法操作。对于这种情况，可以使用两个波浪号：~~。
 * 一个波浪号表示按位取反操作，例如，~15 等于 -16。
 */
const int = ~~"15"
console.log(int); // Result: 15
console.log(typeof int); // Result: "number"
// 使用两个波浪号可以再次取反，因为 -(-n-1)=n+1-1=n，所以~-16 等于 15。

/**
 * 7. 快速幂运算
 * 从 ES7 开始，可以使用 ** 进行幂运算，比使用 Math.power(2,3) 要快得多。
 */
console.log(2 ** 3); // Result: 8

// 在 ES7 之前，可以使用位左移运算符<<来表示以 2 为底的幂运算
// 以下表达式是等效的:
function demo(n) {
    Math.pow(2, n);
    2 << (n - 1);
    2**n;
}
// 例如，2 << 3 = 16 等同于 2 ** 4 = 16。

/**
 * 8. 快速取整
 * 我们可以使用 Math.floor()、Math.ceil() 或 Math.round() 将浮点数转换成整数，但有另一种更快的方式，即使用位或运算符 |。
 */
console.log(23.9 | 0);  // Result: 23
console.log(-23.9 | 0); // Result: -23
/**
 * | 的实际行为取决于操作数是正数还是负数，所以在使用这个运算符时要确保你知道操作数是正是负。
 * 如果 n 是正数，那么 n|0 向下取整，否则就是向上取整。它会移除小数部分，也可以使用~~ 达到同样的效果。
 */

/**
 * 移除整数尾部数字
 * | 运算符也可以用来移除整数的尾部数字，这样就不需要像下面这样：
 *  let str = "1553";
 *  Number(str.substring(0, str.length - 1));
 * 
 * 相反，我们可以这样：
 * console.log(1553 / 10   | 0)  // Result: 155
 * console.log(1553 / 100  | 0)  // Result: 15
 * console.log(1553 / 1000 | 0)  // Result: 1
 */

/**
 * 9. 获取数组最后的元素
 * 数组的 slice() 方法可以接受负整数，并从数组的尾部开始获取元素。
 */
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(array.slice(-1)); // Result: [9]
console.log(array.slice(-2)); // Result: [8, 9]
console.log(array.slice(-3)); // Result: [7, 8, 9]

/**
 * 10. 格式化 JSON
 * 你之前可能使用过 JSON.stringify，但你是否知道它还可以用来给 JSON 添加缩进？
 * 
 * stringify() 方法可以接受两个额外的参数，一个是函数（形参为 replacer），用于过滤要显示的 JSON，另一个是空格个数（形参为 space）。
 * space 可以是一个整数，表示空格的个数，也可以是一个字符串（比如'\t'表示制表符），这样得到的 JSON 更容易阅读。
 */
console.log(JSON.stringify({ alpha: 'A', beta: 'B' }, null, '\t'));
/**
    {
        "alpha": "A",
        "beta": "B"
    }
 */