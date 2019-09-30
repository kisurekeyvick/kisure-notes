/**
 * https://juejin.im/post/5d564f76f265da03a31d336c
 * 
 * 节流（throttle）与防抖（debounce）
 */

/** 
 * 节流（Throttle）
 * 
 * throttle 的中心思想在于：在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应。
 * 
 * 所谓的“节流”，是通过在一段时间内无视后来产生的回调请求来实现的。只要一位客人叫了车，
 * 司机就会为他开启计时器，一定的时间内，后面需要乘车的客人都得排队上这一辆车，谁也无法叫到更多的车。
 */
function throttle(fn, time) {
    // last是上次触发回调的时间
    let last = 0;

    // 将throttle处理结果当做函数返回
    return function() {
        // 保留调用时的this上下文
        let context = this;
        // 传入的参数
        let args = arguments;
        // 最新时间
        let now = Date.now();

        if (date - last >= time) {
            last = now;
            fn.apply(context, args);
        }
    };
}

/** 
 * 防抖动（Debounce）
 *  
 * 防抖的中心思想在于：我会等你到底。在某段时间内，不管你触发了多少次回调，我都只认最后一次。
 */
function debounce(fn, time) {
    // 定时器
    let timer = null;

    return function() {
        // 保留调用时的this上下文
        let context = this;
        // 传递的参数
        let args = arguments;

        // 每次事件被触发时候，都会清除定时器
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(function() {
            fn.apply(context, args);
        }, time);
    };
}

/** 
 * 两者结合
 */
function throttleDebounce(fn, time) {
    let last = 0;
    let timer = null;

    return function() {
        let context = this;
        let args = arguments;
        let now = Date.now();

        if (now - last < time) {
            // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, time);
        } else {
            // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
            last = now;
            fn.apply(context, args);
        }
    };
}

