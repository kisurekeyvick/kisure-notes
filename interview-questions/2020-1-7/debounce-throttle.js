/** 
 * https://juejin.im/post/5b7b88d46fb9a019e9767405
 * 
 * 防抖和节流原理分析
 * 
 * 使用场景：
 *      窗口的resize、scroll、输入框内容校验等操作时，如果这些操作处理函数是较为复杂或页面频繁重渲染等操作时，
 *      在这种情况下如果事件触发的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。
 *      此时我们可以采用debounce（防抖）和throttle（节流）的方式来减少触发的频率，同时又不影响实际效果。
 */

/** 
 * 防抖动
 * 
 * 思想：当持续触发事件时，debounce 会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件。
 */

/** 
 * 防抖动 - 非立即执行版
 * 
 * 思想：触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
 */
const debounce = (func, time, ...res) => {
    let timer;
    return function() {
        const _this = this;
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            func.apply(_this, res);
        }, time);
    }
}

/** 
 * 防抖动- 立即执行版
 * 
 * 思想：触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
 */
const debounce_two = (func, time, ...res) => {
    let timer;
    return function() {
        const _this = this;
        if (timer) {
            clearTimeout(timer);
        }

        let callNow = !timer;
        timer = setTimeout(() => {
            timer = null;
        }, time);

        if (callNow) {
            func.apply(_this, res);
        }
    };
}

/** 
 * 节流
 * 
 * 思想：当持续触发事件时，保证隔间时间触发一次事件
 *          持续触发事件时，throttle 会合并一定时间内的事件，并在该时间结束时真正去触发一次事件
 */

/** 
 * 节流 - 时间戳版
 */
const thorttle = (func, time, ...res) => {
    let pre = 0;
    return function() {
        const _this = this;
        let now = Date.now();
        if (now - pre >= time) {
            func.apply(_this, res);
            pre = Date.now();
        }
    }
}

/** 
 * 节流 - 定时器版
 */
const throttle_timeout = (func, time, ...res) => {
    let timer;
    return function() {
        const _this = this;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                func.apply(_this, res);
            }, time);
        }
    }
} 