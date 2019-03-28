/**
 * Object.assign()
 * 将所有可枚举属性的值从一个或多个源对象复制到目标对象。它会返回目标对象。
 */

/** 以下是mdn对Object.assign的polyfill */
function ObjectAssignPolyfill() {
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
                'use strict';
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }
            
                var to = Object(target);
            
                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];
            
                    if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                        }
                    }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }
}

/**
 * Object.assign 就是将所传参数当中的对象的可枚举属性的值覆盖到第一个对象上，
 * 那么由于js当中的object，array是引用类型，所以对与对象，数组的覆盖其实只是覆盖了对数组，对象的引用，也即 浅copy
 * 当然我们也可以使用Object.assign进行深拷贝：Object.assign({}, source1, source2);
 */
const defaultOpt = {
    title: {
        text: 'hello world',
        subtext: 'It\'s my world.'
    }
};
 
const opt = Object.assign({}, defaultOpt, {
    title: {
        subtext: 'Yes, your world.'
    }
});

console.log(opt);
/** 
    实际结果：
    {
        title: {
            subtext: 'Yes, your world.'
        }
    }

    预期结果：
    {
        title: {
            text: 'hello world',
            subtext: 'Yes, your world.'
        }
    }
*/

/**
 * Object.assign({}, source1, source2);
 * 它直接覆盖了整个title ，它只merge根属性，
 */


/**
 * 我们可以实现一个js的深拷贝
 * https://segmentfault.com/a/1190000013202537
 */
function detectType(source) {
    // 这里面我们直接运用split配合正则，将数据类型字符串进行分割，最终返回小写的数据类型
    return Object.prototype.toString
        .call(source)
        .split(/[\[,\s,\]]/)[2]
        .toLowerCase();
}

function deepCopy(source, copyDeep) {
    var type = detectType(source);
    if (!(type === 'object' || type === 'array')) {
        return source;
    }
    var newObject = type === 'array' ? source.slice() :Object.assign({}, source);
    if (!copyDeep) {
        return newObject;
    }
    Object.keys(newObject).forEach(function (key) {
        newObject[key] = deepCopy(newObject[key], true);
    });
    return newObject;
}
