/**
 * func.apply(context, [...])
 * func中的this指向context
 * 严格模式下 context为Null/undefined => window
 * 非严格模式                       null    =>  null 
 *                  undefined => window
 */

Function.prototype.call_2 = function(context) {
    const args = [...arguments].slice(1);
    const symbolFn = Symbol('fn'); 
    context[symbolFn] = this;
    const value = context[symbolFn](...args);
    delete context[symbolFn];

    return value;
} 

Function.prototype.apply_2 = function(context) {
    const args = [...arguments].slice(1);
    const symbolFn = Symbol('fn'); 
    context[symbolFn] = this;
    let value;

    if (args.length === 0) {
        value = context[symbolFn]();
    } else {
        value = context[symbolFn](...args);
    }

    delete context[symbolFn];

    return value;
}

Function.prototype.bind_2 = function(context) {
    if (typeof this !== 'function') {
        throw Error('error');
    }

    let fn = this;
    let args = [...arguments].slice(1);

    let newFunc = function() {
        return fn.apply(this instanceof newFunc ? this : context, args.concat([...arguments]));
    };

    function Temp() {}
    temp.prototype = this.prototype;
    newFunc.prototype = new Temp();

    return newFunc;
}

new Set()
/**
 * add
 * delete
 * has
 * size
 * clear
 */

new Map()
/**
 * set(key, value)
 * get(key)
 * delete
 * has
 * size
 * clear
 */

/**
 * for for in     可以访问arr的index
 * for of          直接访问arr的值
 */

 var person = {
     name: 'k',
     age: 27
 };

 var { sex = 'male' } = person
 // sex => male

 var person = {
    name: 'k',
    age: 27,
    sex: null
};
var { sex = 'male' } = person
// sex => null

var a = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

Array.from(a);
[...document.querySelectorAll('sss')];
Array.apply(null, a);
Array.prototype.slice
Array.prototype.map()
Array.prototype.concat([], a);
Array.prototype.filter


// 数组去重
function dist_1(arr) {
    let obj = {};
    return arr.filter(item => {
        if (obj[item]) {
            return false;
        }

        if (!obj[item]) {
            obj[item] = true;
            return true;
        }
    });
}

function dist_2(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    });
}

function dist_3(arr) {
    let result = [];
    let point = null;
    arr = arr.sort();

    for(let i = 0; i < arr.length; i++) {
        if (point !== arr[i] || i === 0) {
            result.push(arr[i]);
        }

        point = arr[i];
    }

    return result;
}

function throttle(fn, time) {
    let historyTime = 0;

    return function() {
        let now = Date.now();
        let context = this;
        let args = [...arguments];
        if (now - historyTime >= time) {
            fn.apply(context, args);

            historyTime = now;
        }
    }
}

function debounce(fn, time) {
    let timer = null;

    return function() {
        if (timer) {
            clearTimeout(timer);
        }

        let context = this;
        let args = [...arguments];
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, time);
    }
}

function aaa(fn, time) {
    let historyTime = 0;
    let timer = null;

    return function() {
        let context = this;
        let args = [...arguments];
        let now = Date.now();

        if (now - historyTime < time) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, time);
        } else {
            clearTimeout(timer);
            fn.apply(context, args);
            historyTime = now;
        }
    }
}

/**
 * 1.不可以被new
 * 2.解决了this指向，箭头函数的this是由外层第一个函数的this
 * 3.bind，apply，call都无法直接改变箭头函数的this指向
 * 4，如果箭头函数处于全局下，不管严格非严格模式下，this的指向都是window
 * 5.箭头函数this指向window的时候，其箭头函数中如果访问arguments会报错  this如果指向的是普通函数，那么argument继承与普通函数
 */
