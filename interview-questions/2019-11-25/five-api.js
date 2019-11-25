/**
 * https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247484624&idx=1&sn=3b8b7937f28fecd07e51a0399091f1d1&chksm=fa2be439cd5c6d2ffb97f10abbc61341940c0f5e374ef13f1a4a656a2b559ba854bbc44a304c&scene=0&xtrack=1&key=0cc571d8ae6d55114f2aae1269b2f9df5903281e96dc390531306e624bc4f6ec1c1c8c5e82080920e27b13cd7bc843f62562690eded3d4d4c40c90b2fb1118e24e2667d825daa60fe1207bd64c7c04a9&ascene=1&uin=MTI4MDEwODkwNg%3D%3D&devicetype=Windows+10&version=62070158&lang=zh_CN&pass_ticket=GmGKJgLwWsG8ArMxstkfrNZB4wNZmTA8Pn2QgTS%2F%2BSd6jafNaewhCYioejm8VS%2BV
 * 
 * 
 */

/** 
 * (1) 使用ES5实现数组map
 */
Array.prototype.myMap = function(fn, context) {
    const arr = Array.prototype.slice.call(this);
    const mapArr = [];
    for (let i = 0; i<arr.length; i++) {
        mapArr.push(fn.call(context, arr[i], i, this));
    }
    return mapArr;
}

/**
 * map有两个参数选项，第一个参数是function，第二个是上下文环境
 * 如果第二个参数省略，或者传入null,undefined，那么回调函数的this为全局函数
 */

/**
 * (2) 用ES5实现数组的reduce方法
 */
Array.prototype.myReduce = function(fn, initVal) {
    const arr = Array.prototype.slice.call(this);
    let res = initVal ? initVal : arr[0];
    let startIndex = initVal ? 0 : 1;

    for(let i = startIndex; i<arr.length; i++) {
        res = fn.call(null, res, arr[i], i, this);
    }

    return res;
}

/**
 * (3) Object.create
 * 
 * 语法：Object.create(proto, [propertiesObject])
 * 作用：创建一个新对象，使用现有的对象来提供新创建的对象的proto
 * 
 * propertiesObject：可选。 添加到新创建对象的可枚举属性
 * （即其自身的属性，而不是原型链上的枚举属性）对象的属性描述符以及相应的属性名称。
 * 
 * 案例：
 * 创建一个以另一个空对象为原型,且拥有一个属性p的对象
 * let k = Object.create({}, { p: { value: 42 } })
 */
function create(proto) {
    function Fn();
    Fn.prototype = proto;
    Fn.prototype.constructor = fn;
    return new Fn();
}

/**
 * (4) 实现一个单例模式
 * 
 * 核心要点: 用闭包和Proxy属性拦截
 */
function Proxy(func) {
    let instance;
    let handler = {
        constructor(target, args) {
            if (!instance) {
                instance = Reflect.constructor(func, args)
            }
            return instance;
        }
    };
    return new Proxy(func, handler);
}

/**
 * (5) 实现深拷贝
 */
const clone = parent => {
    // 判断类型
    const isType = (target, type) => `[object ${type}]` === Object.prototype.toString.call(target);
    // 处理正则
    const getRegExp = re => {
        let flags = '';
        
        if (re.global) {
            flags += "g";
        }

        if (re.ignoreCase) {
            flags += "i";
        }

        if (re.multiline) {
            flags += "m";
        }

        return flags;
    };

    const _clone = parent => {
        if (typeof parent !== 'object' || parent === null) {
            return parent;
        }

        let child, proto;

        if (isType(parent, "Array")) {
            // 对数组做特殊处理
            child = [];
        } else if (isType(parent, "RegExp")) {
            // 对正则对象做特殊处理
            child = new RegExp(parent.source, getRegExp(parent));
            if (parent.lastIndex) {
                child.lastIndex = parent.lastIndex;
            }
        } else if (isType(parent, "Date")) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime());
        } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            // 利用Object.create切断原型链
            child = Object.create(proto);
        }

        for (let i in parent) {
            // 递归
            child[i] = _clone(parent[i]);
        }

        return child;
    };

    return _clone(parent);
};
