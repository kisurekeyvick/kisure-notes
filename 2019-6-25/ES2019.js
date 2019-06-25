/**
 * ES10的一些特性：
 * 
 * 1. Object.fromEntries()
 * 在JavaScript中，将数据从一种格式转换为另一种格式非常常见。 
 * 为了便于将对象转换为数组，ES2017引入了Object.entrie()方法。 
 * 此方法将对象作为参数，并以[key，value]的形式返回对象自己的可枚举字符串键控属性对的数组。
 * 
 * const obj = {one: 1, two: 2, three: 3};
 * console.log(Object.entries(obj));        // [["one", 1], ["two", 2], ["three", 3]]
 * 
 * 
 * 但是如果我们想要做相反的事情并将键值对列表转换为对象呢？
 * ES2019引入Object.fromEntries()方法,可将键值对列表转换为对象
 * 
 * const myArray = [['one', 1], ['two', 2], ['three', 3]];
 * console.log(Object.fromEntries(myArray));        // {one: 1, two: 2, three: 3}
 */

/** 
 * 使用Object.fromEntries()的场景：
 * 
 * (1) 深拷贝一个简单的对象：
 * const obj = {a: 4, b: 9, c: 16};
 * 
 * // 将对象转换为数组
 * const arr = Object.entries(obj); 
 * 
 * // 将数组转换回对象
 * const obj2 = Object.fromEntries(arr);
 * 
 * (2) 处理URL的查询字符串：
 * const paramsString = 'param1=foo&param2=baz';
 * const searchParams = new URLSearchParams(paramsString);
 * Object.fromEntries(searchParams);                        // => {param1: "foo", param2: "baz"}
 */

/** 
 * 2. flat() and flatMap()
 * (1) flat() 方法可以将多维数组展平成一维数组
 * console.log(arr.flat())      // ["a", "b", "c", "d"]
 * 
 * 请注意，如果提供的数组中有空值，它们会被丢弃
 * const arr = ['a', , , 'b', ['c', 'd']];
 * const flattened = arr.flat();    // ["a", "b", "c", "d"]
 * 
 * flat() 还接受一个可选参数，该参数指定嵌套数组应该被展平的级别数。 如果未提供参数，则将使用默认值1：
 * const arr = [10, [20, [30]]];
 * 
 * console.log(arr.flat());     // => [10, 20, [30]]
 * console.log(arr.flat(1));    // => [10, 20, [30]]
 * console.log(arr.flat(2));    // => [10, 20, 30]
 * 
 * (2) flatMap() 方法将map()和flat()组合成一个方法。
 * const arr = [[7.1], [8.1], [9.1], [10.1], [11.1]];
 *  arr.flatMap(value => {
        if (value >= 10) {
            // 如果要从结果中删除项目，只需返回一个空数组
            return [];
        } else {
            return Math.round(value);
        }
    });

    // [7, 8, 9]
 */

/** 
 * 3. Symbol 对象的 description 属性
 * 
 * 在创建Symbol时，可以为调试目的向其添加description (描述)。
 * 有时候，能够直接访问代码中的description 是很有用的。
 * 
 * ES2019 中为Symbol对象添加了只读属性 description ，该对象返回包含Symbol描述的字符串。
 * 
 * let sym = Symbol('foo');
 * console.log(sym.description);    // foo
 */

/** 
 * 4. 可选的 catch
 * try catch 语句中的catch有时候并没有用
 *  try {
        // 使用浏览器可能尚未实现的功能
    } catch (unused) {
        // 这里回调函数中已经帮我们处理好的错误
    }

    此代码中的catch回调的信息并没有用处。 但这样写是为了避免SyntaxError错误。 ES2019可以省略catch周围的括号：
    try {
        // ...
    } catch {
        // ....
    }
 */
