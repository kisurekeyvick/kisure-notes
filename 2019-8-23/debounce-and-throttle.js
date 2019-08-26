/** 
 * https://segmentfault.com/a/1190000018428170?utm_source=tag-newest
 * 
 * 浅谈js防抖和节流
 */

/** 
 * 防抖(debounce)
 * 
 * 先提出第一种思路：在第一次触发事件时，不立即执行函数，而是给出一个期限值比如200ms，然后：
 *      如果在200ms内没有再次触发滚动事件，那么就执行函数
 *      如果在200ms内再次触发滚动事件，那么当前的计时取消，重新开始计时
 * 
 * 效果：如果短时间内大量触发同一事件，只会执行一次函数。
 * 
 * 实现：既然前面都提到了计时，那实现的关键就在于setTimeOut这个函数，
 *      由于还需要一个变量来保存计时，考虑维护全局纯净，可以借助闭包来实现：
 */
function debounce(fn,delay){
    let timer = null //借助闭包
    return function() {
        if(timer){
            clearTimeout(timer) 
        }
        timer = setTimeout(fn,delay) // 简化写法
    }
}
/** 
 * 到这里，已经把防抖实现了，现在给出定义：
 *      对于短时间内连续触发的事件（上面的滚动事件），防抖的含义就是让某个时间期限（如上面的1000毫秒）内，事件处理函数只执行一次。
 */


/** 
 * 节流(throttle)
 * 
 * 如果在限定时间段内，不断触发滚动事件（比如某个用户闲着无聊，按住滚动不断的拖来拖去），
 * 只要不停止触发，理论上就永远不会输出当前距离顶部的距离。
 * 
 * 效果：如果短时间内大量触发同一事件，那么在函数执行一次之后，
 *      该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。
 * 
 * 实现: 这里借助setTimeout来做一个简单的实现，加上一个状态位valid来表示当前函数是否处于工作状态：
 */
function throttle(fn,delay){
    let valid = true
    return function() {
       if(!valid){
           //休息时间 暂不接客
           return false 
       }
       // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}
/* 请注意，节流函数并不止上面这种实现方案,
   例如可以完全不借助setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定间隔时间来做判定。
   也可以直接将setTimeout的返回的标记当做判断条件-判断当前定时器是否存在，
        如果存在表示还在冷却，并且在执行fn之后消除定时器表示激活，原理都一样。
*/
/** 
 * 定义：在函数执行一次之后，该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。
 */
