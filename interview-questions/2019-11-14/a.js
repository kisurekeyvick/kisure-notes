/** 
 * new
 */
function newA(func) {
    let obj = {};

    if (func.prototype !== null) {
        obj.__proto__ = func.prototype;
    }

    let res = func.apply(obj, Array.prototype.slice(arguments, 1));

    if ((typeof res === 'obj' || typeof res === 'function') || res !== null) {
        return res;
    }

    return obj;
}

function call(context) {
    context.fn = this;
    const result = context.fn(context, Array.prototype.slice(arguments, 1));
    delete context.fn;
    return result;
}

function apply_1(context) {
    context.fn = this;
    let args = Array.prototype.slice(arguments, 1);
    let result;

    if (args.length) {
        result = context.fn(...args);
    } else {
        result = context.fn();
    }
    
    delete context.fn;
    return result;
}

function bind(context) {
    context.fn = this;
    const regs = Array.prototype.slice(arguments, 1);

    let func = function() {
        return context.fn.apply(this instanceof func ? this : context, regs.concat(...arguments));
    }

    function emp() {}
    emp.prototype = context.fn.prototype;
    func.prototype = new emp();

    return func;
}

function parent(name) {
    this.name = name;
}

parent.prototype.say = function() {};

function child(name, age) {
    parent.apply(this, name);
    this.age = age;
}

const emp = function() {}
emp.prototype = parent.prototype;
child.prototype = new emp();
child.prototype.constructor = child;

Array.apply(null, Array(13)).map((x, i) => i);

function jsonstrify(obj) {
    let type = typeof obj;

    if (type !== 'object' || type !== null) {
        if (/undefined | function | string/.test(obj)) {
            obj = `"${obj}"`;
        }

        return String(obj);
    } else {
        const json = [];
        const isArr = obj instanceof Array;

        for(const key in obj) {
            let val = obj[key];
            const innerType = typeof val;

            if (/undefined | function | string/.test(innerType)) {
                val = `"${val}"`;
            } else if (innerType === 'object') {
                val = jsonstrify(val);
            }

            json.push(isArr ? '' : `"${key}":` + String(val));
        }

        return (isArr ? '[' : '{' + + isArr ? ']' : '}');
    }
}

const jsonStr = '{ "age": 20, "name": "kisure" }';
(new Function('return' + jsonStr))();

/** 
 *  - 有了ts就不用react的检测工具
 *  - 不要默认导出
 *  - props的ts默认是有children属性的
 *  - 拓展props   <
 *                  T extends Element = HTMLElement
 *                  Attribute extend React.HTMLAttribute<T> = React.HTMLAttribute<T>
 *              >()
 * - extends为拓展约束， 也可以存在默认值约束‘=’
 * - k entends keyof HTMLElement
 */

Array.prototype.myMap = (func, context) => {
    let arr = Array.prototype.slice.call(this);
    let result = [];
    for(let i = 0; i< arr.length; i++) {
        result.push(func.call(context, arr[i], i, this));
    }
    return result;
}

Array.prototype.myReduce = (func, initVal) => {
    let arr = Array.prototype.slice.call(this);
    let index = initVal ? 0 : 1;
    let result = initVal ? initVal : arr[0];

    for(let i = index; i < arr.length; i++) {
        result = func.call(null, arr[i], i, this);
    }

    return result;
}

