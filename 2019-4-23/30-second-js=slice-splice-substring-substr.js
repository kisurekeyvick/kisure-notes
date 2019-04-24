/**
 * slice
 * 语法：arrayObject.slice(start,end)
 * 参数：
 * (1)start 规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。
 *          也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
 * (2)end   规定从何处结束选取。该参数是数组片断结束处的数组下标。
 *          如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。
 * 
 * 返回值：
 * 返回一个新的数组（字符串）注意是数组！！！，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
 */
// 传入数组和一个方法，如果方法返回值为false并且arr的长度>0，那么就会截取数组，并将截取的结果返回
let dropWhile = (arr, func) => {
    while(arr.length > 0 && !func(arr)) {
        arr = arr.slice(1);
    }

    return arr;
};
dropWhile([1, 2, 3, 4, 2], n => n >= 3); // [3,4, 2]

// 上面那个方法很扯淡，自己重写的一个dropWhile过滤fn中的条件
dropWhile = (arr, func) => {
    return arr.map((item, index) => func(item)&&item).filter(item => item);
};
dropWhile([1, 2, 3, 4, 2], n => n >= 3); // [3,4]

/**
 * 使用slice将伪数组转化为数组
 */
[].slice.call(arg = {length: 3, '1': 'one'});   // [empty, "one", empty]
Array.prototype.slice.call({length: 3, '1': 'one'});    // [empty, "one", empty]
// 其他方式
Array.from(arg = {length: 3, '1': 'one'});   // [undefined, "one", undefined]

/**
 * splice
 * 语法：arrayObject.splice(index,howmany,item1,.....,itemX)
 * 参数：
 * (1)index     规定添加/删除项目的位置，使用负数可从数组结尾处规定位置
 * (2)howmany   要删除的项目数量。如果设置为 0，则不会删除项目
 * (3)item1, ..., itemX     向数组添加的新项目
 * 
 * 作用：splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
 * 
 * 返回值：如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。
 */
const arrSplice = ['George', 'John', 'James'];
arrSplice.splice(1, 1, 'kisure');   // ['John']
console.log(arrSplice);             // ['George', 'kisure', 'James']

/**
 * substring()
 * 语法：stringObject.substring(start, end)
 * 参数：
 * (1)start     一个非负的正数，规定要提取的子串的第一个字符在stringObject中的位置
 * (2)end      一个非负的正数，比要提取的子串的最后一个字符在stringObject中的位置多1。
 *              如果省略该参数，那么返回的子串会一直到字符串的结尾。
 * 
 * 作用：substring()方法返回的子串包括start处的字符，但不包括end处的字符。
 *      如果end和start相等，返回的是一个空串。如果start比end大，那么该方法在提取子串之前会先交换这两个参数。
 * 
 * 返回值：一个新的字符串，该字符串值包含stringObject的一个子字符串，其内容是从start处到end-1处的所有字符
 * 
 * 区别：slice和substring之间的区别在于，substring是不接受负参数的
 */

/**
 * substr()
 * 语法：stringObject.substr(start, length)
 * 参数：
 * (1)start     要抽取的子串的其实下表。必需是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。
 *              也就是说，-1指字符串中最后一个字符，-2指倒数第二个字符，以此类推。
 * (2)length    字串中的字符数，必须是数值，如果省略了该参数，那么返回从stringObject的开始位置到结束的字符串。
 * 
 * 返回值：一个新的字符串，包含从stringObject的start处开始的length个字符。
 * 
 * 提示：
 *      substr()的参数指定的是子串的开始位置和长度，因此它可以替代substring()和slice()来使用。
 *      ES中没有对该方法进行标准化，因此反对使用。
 */


