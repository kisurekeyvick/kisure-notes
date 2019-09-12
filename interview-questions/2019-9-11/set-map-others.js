/** 
 * https://juejin.im/post/5acc57eff265da237f1e9f7c
 * 
 * - ES6的Set和Map数据结构
 * 
 * 作用：Set和Map主要的应用场景在于数组去重和数据存储
 * 
 * Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构
 */

/** 
 * ES6 Set
 * 
 * 集合是由一组无序且唯一(即不能重复)的项组成的，可以想象成集合是一个既没有重复元素，也没有顺序概念的数组。
 * ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值
 * Set 本身是一个构造函数，用来生成 Set 数据结构
 */
// 基础用法：
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for(let i of s) {
    console.log(i);
}

// 去除数组的重复成员
let arr = [1,2,1,4,5,3];
console.log([...new Set(arr)]);     // [1, 2, 4, 5, 3]

/** 
 * Set实例的属性和方法
 * 
    Set的属性：
        size：返回集合所包含元素的数量
    Set的方法：
        操作方法
            add(value)：向集合添加一个新的项
            delete(value)：从集合中移除一个值
            has(value)：如果值在集合中存在，返回true,否则false
            clear(): 移除集合里所有的项

        遍历方法
            keys()：返回一个包含集合中所有键的数组
            values()：返回一个包含集合中所有值的数组
            entries：返回一个包含集合中所有键值对的数组(感觉没什么用就不实现了)
            forEach()：用于对集合成员执行某种操作，没有返回值

    Set数据结构只有键值没有键名，类似数组
 */

/** 
 * ES6 Map
 * 
 * Map对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。构造函数Map可以接受一个数组作为参数。
 * 
 * Map和Object的区别：
 * (1) Map的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
 * 
        Map对象的属性:
            size：返回Map对象中所包含的键值对个数

        Map对象的方法:
            set(key, val): 向Map中添加新元素
            get(key): 通过键值查找特定的数值并返回
            has(key): 判断Map对象中是否有Key所对应的值，有返回true,否则返回false
            delete(key): 通过键值从Map中移除对应的数据
            clear(): 将这个Map中的所有元素删除

        遍历方法:
            keys()：返回键名的遍历器
            values()：返回键值的遍历器
            entries()：返回键值对的遍历器
            forEach()：使用回调函数遍历每个成员
 */

/** 
 * - Promise构造函数是同步执行还是异步执行，那么 then 方法呢?
 *      promise构造函数是同步执行的，then方法是异步执行的
 * 
 * - promise有几种状态，什么时候会进入catch?
 *      三个状态：pending、fulfilled、reject
 *      两个过程：padding -> fulfilled、
 *               padding -> rejected
 *      当pending为rejectd时，会进入catch
 * 
 * - Promise 中reject 和 catch 处理上有什么区别?
 *      reject 是用来抛出异常，catch 是用来处理异常
 *      reject 是 Promise 的方法，而 catch 是 Promise 实例的方法
 *      reject后的东西，一定会进入then中的第二个回调，如果then中没有写第二个回调，则进入catch
 *      网络异常（比如断网），会直接进入catch而不会进入then的第二个回调
 */

/** 
 * - JavaScript 的 4 种数组遍历方法： for VS forEach() VS for/in VS for/of
 * 
 * - (1) 使用for和for/in，我们可以访问数组的下标，而不是实际的数组元素值
        for (let i = 0; i < arr.length; ++i) {
            console.log(arr[i]);
        }

        for (let i in arr) {
            console.log(arr[i]);
        }

 * - (2) 使用for/of，则可以直接访问数组的元素值：
        for (const v of arr) {
            console.log(v);
        }

   - (3) 使用forEach()，则可以同时访问数组的下标与元素值
        arr.forEach((v, i) => console.log(v));

   - (4) 4 种循环语法，只有for/in不会忽略非数字属性
        const arr = ["a", "b", "c"];
        arr.test = "bad";

        for (let i in arr) {
            console.log(arr[i]); // 打印"a, b, c, bad"
        }

        所以for in 遍历数组不好

   - (5) 数组的空元素
         循环语句处理['a',, 'c']与['a', undefined, 'c']的方式并不相同

         对于['a',, 'c']，for/in与forEach会跳过空元素(非常重要！！！！！)
         而for与for/of则不会跳过

         // 打印"a, undefined, c"
        for (let i = 0; i < arr.length; ++i) {
            console.log(arr[i]);
        }

        // 打印"a, c"
        arr.forEach(v => console.log(v));

        // 打印"a, c"
        for (let i in arr) {
            console.log(arr[i]);
        }

        // 打印"a, undefined, c"
        for (const v of arr) {
            console.log(v);
        }

        对于['a', undefined, 'c']，4 种循环语法一致，打印的都是"a, undefined, c"。

   - (6) JSON 也不支持空元素
        JSON.parse('{"arr":["a","b","c"]}');
        // { arr: [ 'a', 'b', 'c' ] }

        JSON.parse('{"arr":["a",null,"c"]}');
        // { arr: [ 'a', null, 'c' ] }

        JSON.parse('{"arr":["a",,"c"]}');
        // SyntaxError: Unexpected token , in JSON at position 12

   - (7) forEach()不能与 Async/Await 及 Generators 很好的"合作"
        不能在forEach回调函数中使用 await(非常重要！！！)

		async function run() {
            const arr = ['a', 'b', 'c'];
            arr.forEach(el => {
                // SyntaxError
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log(el);
            });
        }

        function* run() {
            const arr = ['a', 'b', 'c'];
            arr.forEach(el => {
                // SyntaxError
                yield new Promise(resolve => setTimeout(resolve, 1000));
                console.log(el);
            });
        }

        对于for/of来说，则没有这个问题:
            async function asyncFn() {
                const arr = ["a", "b", "c"];
                for (const el of arr) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    console.log(el);
                }
            }

   - (8) 函数的 this
        for，for/in与for/of会保留外部作用域的this
        对于forEach， 除非使用箭头函数，它的回调函数的 this 将会变化

        结论：for/of是遍历数组最可靠的方式，它比for循环简洁，并且没有for/in和forEach()那么多奇怪的特例。
            for/of的缺点是我们取索引值不方便，

        使用for/of获取数组索引，可以这样写：

        for (const [i, v] of arr.entries()) {
            console.log(i, v);
        }
 */

/** 
 * https://juejin.im/post/5d02f267f265da1bb776648b
 * - ES6解构
 *  
 * (1) 为什么需要解构
 *      通过解构，可以使代码简洁。因为访问链变得更长，这意味着更多的输入， 而由于更多的输入，也就更有可能造成拼写的错误。
 * 
 * (2) 对象的解构赋值
 *      对象解构的语法形式是在一个赋值操作符左边放置一个对象字面量，例如:
        let details = {
            firstName:'Code',
            lastName:'Burst',
            age:22
        }
        const {firstName,age} = details;

        这段代码中 details.firstName 的值被存储在变量 firstName 中，details.age 的值被存储在变量 age 中。 这是对象解构的最基本形式。
        
 * (3) 非同名变量赋值
        我们也可以定义与属性名不同的变量名称

        const person = {
            name: 'jsPool',
            country: 'China'
        };

        const {name:fullname,country:place} = person;

        在这里，我们创建了两个局部变量：fullname , place，并将 fullname 映射到 name，place映射到 country。

    (4) 默认值
        使用解构赋值表达式时，如果指定的局部变量名称在对象中不存在，那么这个局部变量会被赋值为 undefined

        const person = {
            name: 'jsPool',
            country: 'China'
        };
        let {age} = person;
        console.log(age); // undefined

        这段代码额外定义了一个局部变量 age，然后尝试为它赋值，然而在 person 对象上，没有对应属性名称的属性值，
        所以它像预期中的那样赋值为 undefined。

        当指定的属性不存在时，可以定义一个默认值，在属性名称后添加一个等号（=）和相应的默认值
        let {age = 20,sexual:sex = 'male'} = person;

        在这个例子中，为变量 age 设置了默认值 20，为非同名变量 sex 设置了默认值 male。
        只有对象 person 上没有该属性或者属性值为 undefined 时该默认值才生效。
 */

/** 
    const person = {
        name: 'jsPool',
        country: 'China',
        age: undefined,
        sex: null
    };
    let {age = '12', sex = 'male'} = person;
    // age: '12'    sex: null    
 */
