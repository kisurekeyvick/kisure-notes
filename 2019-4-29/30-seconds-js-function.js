/** 
 * bind
 */
const bind = (fn, context, ...boundArgs) => (...args) => {
    console.log([
        ...boundArgs, ...args
    ]);

    return fn.apply(context, [
        ...boundArgs, ...args
    ]);
};

function greet(greeting, punctuation, ...rest) {
    return `${greeting}${this.user}${punctuation}`;
}

const freddy = {user: 'fred'};
const freddyBound = bind(greet, freddy, 'wcg');
console.log(freddyBound('hi', '!'));

/** 
 * bindKey
 * 找到target中的特定属性，然后执行
 */
const bindKey = (context, fn, ...boundArgs) => (...args) => 
        context[fn].apply(context, [...boundArgs, ...args]);;

const freddy_two = {
    user: 'fred',
    greet: function(greeting, punctuation) {
      return greeting + ' ' + this.user + punctuation;
    }
};

const freddyBound_two = bindKey(freddy_two, 'greet');
console.log(freddyBound_two('hi', '!'));

/** 
 * chainAsync
 * 链式异步方法，通过调用next来实现异步
 */
const chainAsync = fns => {
    let curr = 0;
    const last = fns[fns.length -1];
    const next = () => {
        /** 
         * 这里需要注意：fns[curr++],分为两步
         * (1)当curr的值为0的时候，fns[curr++]等同于fns[0]
         * (2)curr++ => curr的值为1
         */
        const fn = fns[curr++];
        /**
         * fn中传入next的作用就是，因为数组方法中存在：setTimeout(next, 1000/2000)
         * 这样只有在过了1秒或者多秒以后，才会执行next()方法
         * 执行next()以后，就又可以执行数组中的下一个方法
         */
        fn === last ? fn() : fn(next);
    };
    next();
};

chainAsync([
    next => {
      console.log('0 seconds');
      setTimeout(next, 1000);
    },
    next => {
      console.log('1 second');
      setTimeout(next, 1000);
    },
    () => {
      console.log('2 second');
    }
]);

/** 
 * checkProp
 * 检测属性的值是否满足一个某个要求
 */
const checkProp = (predicate, prop) => obj => {
    try {
        return !!predicate(obj[props])
    } catch (error) {
        return error;
    }
};

const lengthIs4 = checkProp(l => l === 4, 'length');
lengthIs4([]);          // false
lengthIs4([1,2,3,4]);   // true
lengthIs4(new Set([1,2,3,4]));  // 报错,因为Set数据结构是没有length属性的，只有size

/** 
 * compose
 */
const compose = (...fns) => fns.reduce((pre,cur) => {
    return (...args) => pre(cur(...args));
    /** 
     * pre => add5
     * cur => multiply
     */
});

const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = compose(add5, multiply);
multiplyAndAdd5(5,2);   // 15

/** 
 * 关于reduce的问题我们需要注意点：
 * 如果我们指定了reduce的第二个参数值init，那么reduce内部function中pre代表的是init，第二个是操作数组的第一个值
 * 如果没有指定reduce的第二个参数值，那么reduc内部function中pre代表的是操作数组的第一个值，cur代表的是数组第二个值
 */
[1,2,3,4,5].reduce((pre, cur) => {
    console.log(`pre:${pre},cur:${cur}`);
}, 0);

/** 
 * converge
 * args对应的是：[1, 2, 3, 4, 5, 6, 7]
 * converger对应的是：(a, b) => a / b
 * fns对应的是：数组方法
 */
const converge = (converger, fns) => (...args) => converger(...fns.map(fn => fn.apply(null, args)));
const average = converge((a, b) => a / b, [
    arr => arr.reduce((pre, cur) => pre + cur, 0),
    arr => arr.length
]);
average([1, 2, 3, 4, 5, 6, 7]); // 4