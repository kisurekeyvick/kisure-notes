/**
 * 资源加载：onload 和 onerror
 * 浏览器允许跟踪外部资源的加载 —— 脚本、iframes、图像等
 * 有两个事件:
 *      (1)onload —— 成功加载
 *      (2)onerror —— 发生异常
 */

/**
 * 动态加载脚本
 */
function loadScript(src) {
    let script = document.createElement('script');
    script.src = src;
    document.head.append(script);
    script.onload = function() {
        console.log('加载成功');
    };

    script.onerror = function() {
        // 请注意，我们无法再这获取错误的更多细节。我们不知道错误是 404 还是 500 或者其他情况，只知道是加载失败了。
        console.log('加载失败');
    };
}

/** 
 * 其他资源
 * load 和 error 事件也适用于其他资源。但是也存在细微的差别。
 * 
 * 特殊的：iframe
 * 只有当 iframe 加载完成时会发生 load 事件。在成功或失败的情况下，都会触发它。这是历史原因。
 */

/**
 * 总结
 * <img> 图像、外部样式表、脚本和其他资源都提供了 load 和 error 事件来追踪它们的加载：
 *  load 在成功加载时被触发。
 *  error 在加载失败时被触发。
 */
