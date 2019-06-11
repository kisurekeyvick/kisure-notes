/** 
 * https://segmentfault.com/a/1190000014457824
 * 
 * requestIdleCallback
 * 
 * window.requestIdleCallback()会在浏览器空闲时期依次调用函数
 * 这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这样延迟敏感的事件产生影响。
 * 函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。
 */

/** 
 * 什么是requestIdleCallback?
 * 
 * 当关注用户体验，不希望因为一些不重要的任务（如统计上报）导致用户感觉到卡顿的话，就应该考虑使用requestIdleCallback。
 * 因为requestIdleCallback回调的执行的前提条件是当前浏览器处于空闲状态。
 * 
 * 用法示例：
    requestIdelCallback(myNonEssentialWork);

    function myNonEssentialWork (deadline){
        // deadline.timeRemaining()可以获取到当前帧剩余时间
        while (deadline.timeRemaining() > 0 && tasks.length > 0) {
            doWorkIfNeeded();
        }
        if (tasks.length > 0){
            requestIdleCallback(myNonEssentialWork);
        }
    }
 */

/**
 * requestIdleCallback和requestAnimationFrame有什么区别？
 * 
 * requestAnimationFrame的回调会在每一帧确定执行，属于高优先级任务，而requestIdleCallback的回调则不一定，属于低优先级任务。
 * 我们所看到的网页，都是浏览器一帧一帧绘制出来的，通常认为FPS为60的时候是比较流畅的，
 * 而FPS为个位数的时候就属于用户可以感知到的卡顿了
 * 
 * 一帧包含了用户的交互、js的执行、以及requestAnimationFrame的调用，布局计算以及页面的重绘等工作。
 * 假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，
 * 那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调
 * 
 * 由于requestIdleCallback利用的是帧的空闲时间，所以就有可能出现浏览器一直处于繁忙状态，导致回调一直无法执行，
 * 这其实也并不是我们期望的结果（如上报丢失），那么这种情况我们就需要在调用requestIdleCallback的时候传入第二个配置参数timeout了。
 * 
    requestIdleCallback(myNonEssentialWork, { timeout: 2000 });   

    function myNonEssentialWork (deadline) {
        // 当回调函数是由于超时才得以执行的话，deadline.didTimeout为true
        while ((deadline.timeRemaining() > 0 || deadline.didTimeout) &&
                tasks.length > 0) {
                doWorkIfNeeded();
            }
        if (tasks.length > 0) {
            requestIdleCallback(myNonEssentialWork);
        }
    }
 */

/** 
 * requestIdleCallback 里面可以执行DOM修改操作吗？
 * 
 * 强烈建议不要，从上面一帧的构成里面可以看到，requestIdleCallback回调的执行说明前面的工作（包括样式变更以及布局计算）都已完成。
 * 如果我们在callback里面做DOM修改的话，之前所做的布局计算都会失效，
 * 而且如果下一帧里有获取布局（如getBoundingClientRect、clientWidth）等操作的话，
 * 浏览器就不得不执行强制重排工作,这会极大的影响性能，另外由于修改dom操作的时间是不可预测的，
 * 因此很容易超出当前帧空闲时间的阈值，故而不推荐这么做。
 * 
 * 推荐的做法是在requestAnimationFrame里面做dom的修改，可以在requestIdleCallback里面构建Document Fragment，
 * 然后在下一帧的requestAnimationFrame里面应用Fragment。
 */

/**
 * https://www.cnblogs.com/MuYunyun/p/10585501.html
 * 
 * myNonEssentialWork方法中的deadline参数
 * deadline存在两个参数：
 * (1)timeRemaining() 当前帧还剩下多少时间
 * (2)didTimeout 是否超时
 * 
 * requestIdleCallback如果跟上第二个参数{timeout: ...}，则会强制浏览器在当前帧执行完后执行
 */

