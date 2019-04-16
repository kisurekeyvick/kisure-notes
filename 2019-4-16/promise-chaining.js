/**
 * 该fetch规范不同于jQuery.ajax()在两个主要方面
 * 
 * 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 
 * 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），  
 * 仅当网络故障时或请求被阻止时，才会标记为 reject。
 * 默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，
 * 则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）。
 */

/**
 * fetch搭配async/await将会让我们的异步代码更加优雅
 */
async function load(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}

/**
 * 当然fetch是比较底层的API，很多情况下都需要我们再次封装
    
    // jquery ajax
    $.post(url, {name: 'test'})
    // fetch
    fetch(url, {
        method: 'POST',
        body: Object.keys({name: 'test'}).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&')
    });
 */

/**
    fetch('/article/promise-chaining/user.json')
        // 当远程服务器开始响应时，下面的 .then 执行
    .then(function(response) {
        // 当结束下载时，response.text() 会返回一个新的 resolved promise，该 promise 拥有全部响应文字
        // 其实还有一个方法，response.json() 会读取远程数据并把它解析成 JSON。
        return response.text();
    })
    .then(function(text) {
        // ...这是远程文件内容
        alert(text); // {"name": "iliakan", isAdmin: true}
    });
 */

/**
 * 错误处理
 * 
 * 异步动作可能会失败：如果出现错误，相应的 promise 会变成 rejected。
 * 我们可以使用 .catch 来处理错误（rejections）
 * 
 * 例如：
    fetch('https://no-such-server.blabla') // rejects
    .then(response => response.json())
    .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)

    或者服务器的一切都很好，但响应不是有效的 JSON

    fetch('/') // fetch 现在运行良好，服务器成功响应
    .then(response => response.json()) // rejects：页面是 HTML，而不是有效的 json
    .catch(err => alert(err)) // SyntaxError: Unexpected token < in JSON at position 0
 */

/**
 * 隐式的try...catch
 * 
 * executor 和 promise 处理程序代码周围有一个 “隐藏的 try..catch”。如果错误发生，它会捕捉异常并当做一个 rejection 来对待。
 
    new Promise(function(resolve, reject) {
        throw new Error("Whoops!");
    }).catch(alert); // Error: Whoops!

    执行代码周围“隐藏的 try..catch”自动捕获错误并把它作为一个 rejection 对待。
    这不仅适用于 throw，而且适用于任何错误，包括编程错误

    例如：
    new Promise(function(resolve, reject) {
        resolve("ok");
    }).then(function(result) {
        blabla(); // 没有此方法
    }).catch(alert); // ReferenceError: blabla is not defined

    作为一个副作用，最终 .catch 不仅会捕获明确的 rejections，也会捕获在上面的处理程序中偶尔出现的错误
 */

/**
 * 重新抛出
 * 
 * 在常规 try..catch 中我们可以分析错误，如果无法处理，可能会重新抛出错误。promise 也是一样的。
 * 如果我们在 .catch 里面 throw，那么控制流程将转到下一个最接近的错误处理程序。
 * 如果我们处理错误并正常结束，那么它将继续执行最接近的 .then 成功处理程序。
 */
new Promise(function(resolve, reject) {
    throw new Error("Whoops!");
}).catch(function(error) {
    console.log("The error is handled, continue normally");
}).then(() => console.log("Next successful handler runs"));

/**
 * 我们使用fetch的时候，可以根据fetch的response来判断加载是否成功
 * 
    function loadJson(url) { // (2)
        return fetch(url)
                .then(response => {
                    if (response.status == 200) {
                        return response.json();
                    } else {
                        throw new HttpError(response);
                    }
                })
    }
 */

/**
 * 未处理的 rejections
 * 
 * 在这种情况下，大多数 JavaScript 引擎会跟踪此类情况并生成全局错误。我们可以在控制台中看到它。
 * 在浏览器中，我们可以使用 unhandledrejection 事件捕获它：
 */
