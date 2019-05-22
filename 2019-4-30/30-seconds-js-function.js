/**
 * curry
 * 如果传递的arity足够多，那么就会运行fn方法，否则只会返回curry方法
 */
const curry = (fn, arity = fn.length, ...args) => {
    if (arity <= args.length) {
        return fn(...args);
    } else {
        return curry.bind(null, fn, arity, ...args)
    }
};

curry(Math.pow)(2)(10); // 1024
curry(Math.min, 3)(10)(50)(2); // 2

/**
 * debounce
 */
const debounce = (fn, ms = 0) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

window.addEventListener(
    'resize',
    debounce(() => {
      console.log(window.innerWidth);
      console.log(window.innerHeight);
    }, 250)
);

/**
 * delay
 */
const delay = (fn, wait, ...args) => {
    return setTimeout(fn, wait, ...args);
};

delay(
    function(text) {
      console.log(text);
    },
    1000,
    'later'
);

/**
 * setTimeout
 * 语法：setTimeout(function, milliseconds, param1, param2, ...)
 * (1)function
 * (2)延迟时间
 * (3)传给执行函数的其他参数
 */
setTimeout((...args) => {
    console.log(
        `${args.reduce((pre,cur) => {
            return pre+= ' ' + cur;
        }, '')}`
    );
}, 1000, ['hello', 'kisure']);

/**
 * negate
 */
const negate = func => (...args) =>!func(...args);

[1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0)); // [ 1, 3, 5 ]