/**
 * https://mp.weixin.qq.com/s/wpTaaeltyItMPoMUfJ27fA
 * 
 * JavaScript 手写代码无敌秘籍
 */

/**
 * (1) 实现一个new操作符
 * 
 * new操作符做了这些事：
 * - 创建一个全新的对象
 * - 新创建的对象的proto被赋值为func的prototype
 * - 将this指向新创建的对象
 * - 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上
 * - 如果函数没有返回对象类型Object(包含：Function,Array,Date),那么new表达式中的函数调用将返回改对象的引用
 */
function newFunc(func) {
    // 创建一个全新的对象
    let res = {};
    if (func.prototype !== null) {
        // 新创建的对象的proto被赋值为func的prototype
        res.__proto__ = func.prototype;
    }
    // 将this指向新创建的对象
    // 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上
    let ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
    if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
        return ret;
    }
    // 如果函数没有返回对象类型Object(包含：Function,Array,Date),那么new表达式中的函数调用将返回改对象的引用
    return res;
}

/** 
 * (2) 实现一个JSON.stringify
 * 
 * - Boolean|Number|String 类型会自动转换成对应的原始值
 * - undefined、任意函数以及 symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）
 * - 不可枚举的属性会被忽略
 * - 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。
 */
function jsonStringify(obj) {
    let type = typeof obj;

    if (type !== 'object' || type === null) {
        if (/string|undefined|function/.test(type)) {
            obj = '"'+ obj + '"';
        }

        return String(obj);
    } else {
        let json = [];
        let isArr = obj && obj.constructor === Array;

        for (let k in obj) {
            let v = obj[k];
            let innerType = typeof v;

            if (/string|undefined|function/.test(innerType)) {
                v = '"'+ v + '"';
            } else if (innerType === 'object') {
                v = jsonStringify(v);
            }

            json.push((isArr ? '' : '"' + k + '":') + String(v));
        }

        return (isArr ? "[" : "{") + String(json) + (isArr ? "]" : "}");
    }
}

/** 
 * (3) 实现一个JSON.parse
 * 
 * 用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)。
 */
// 使用递归的方法
const jsonStr = '{ "age": 20, "name": "kisure" }';
const json = (new Function('return ' + jsonStr))();

/** 
 * (4) 实现一个call或者apply
 * 
 * call语法：
 * fun.call(替代执行的对象, arg1, arg2...)
 * 
 * apply语法：
 * func.apply(替代执行的对象, [argsArray])
 */
Function.prototype.call_2 = function(content = window) {
    content.fn = this;
    let args = [...arguments].slice(1);
    let result = content.fn(...args);
    delete content.fn;
    return result;
}

const foo = {
    value: 1
}

function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

bar.call_2(foo, 'black', '18'); // balck 18 1
