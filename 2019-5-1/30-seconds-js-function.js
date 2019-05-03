/**
 * partial
 */
const partial = (fn, ...args) => (...srcondArgs) => fn(args, srcondArgs);
const greet = (greeting, name) => greeting + ' ' + name + '!';
const greetHello = partial(greet, 'Hello');
greetHello('John'); // 'Hello John!'

/** 
 * runPromisesInSeries
 */
const runPromisesInSeries = arr => arr.reduce((pre,cur) => {
    return pre.then(cur);
}, Promise.resolve()); 
const delay = time => new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log(`success 花费时间 ${time}`);
        resolve('success', time);
    }, time);
});
runPromisesInSeries([() => delay(1000), () => delay(2000)]);

/**
 * throttle
 * 去抖动
 */
const throttle = (fn, wait) => {
    let inThrottle, lastFn, lastTime;
    return () => {
        const context = this;
        args = arguments;

        if(!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.time() - lastTime >= time) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};

window.addEventListener(
    'resize',
    throttle(function(evt) {
      console.log(window.innerWidth);
      console.log(window.innerHeight);
    }, 250)
);

/** 
 * times
 * 限制次数的循环
 */
const times = (n, fn, context = undefined) => {
    let i = 0;
    while(fn.call(context, i) !== false && ++i < n) {}
};

var output = '';
times(5, i => (output += i));
console.log(output); 

/** 
 * 
 */
const uncurry = (fn, n = 1) => (...args) => {
    const next = acc => args => args.reduce((pre, cur) => {
        return pre(cur);
    }, acc);

    if (n - args.length > 0) {
        return false;
    }
    
    return next(fn)(args.slice(0, n));
};

const add = x => y => z => x + y + z;
const uncurriedAdd = uncurry(add, 3);
uncurriedAdd(1, 2, 3); 
