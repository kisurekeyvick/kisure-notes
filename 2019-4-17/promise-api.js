/**
 * Promise API
 * Promise 类有 4 中静态方法：
    Promise.resolve(value) —— 根据给定值返回 resolved promise，
    Promise.reject(error) —— 根据给定错误返回 rejected promise，
    Promise.all(promises) —— 等待所有的 promise 为 resolve 时返回存放它们结果的数组。
                            如果任意给定的 promise 为 reject，那么它就会变成 Promise.all 的错误结果，
                            所以所有的其他结果都会被忽略。
    Promise.race(promises) —— 等待第一个 promise 被解决，其结果/错误即为结果。
 */

/**
 * 注意点：
 * 容错机制 Promise.all
 */
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
];
  
Promise.all(urls.map(url => fetch(url)))
.then(responses => { // (*)
    for(let response of responses) {
        console.log(`${response.url}: ${response.status}`);
    }
});

// 问题是如果任何请求都失败了，那么 Promise.all 就会 reject error，而且所有的其他请求结果都会丢失。

// 解决方案：
Promise.all(
    fetch('https://api.github.com/users/iliakan').catch(err => err),
    fetch('https://api.github.com/users/remy').catch(err => err),
    fetch('http://no-such-url').catch(err => err)
)
/**
 * 思路：
 * 我们不能改变 Promise.all 的工作方式：如果它检测到 error，就会 reject 它。
 * 因此我们需要避免任何 error 发生。相反，如果 fetch 发生 error，我们需要将其视为“正常”结果。
 * 
 * .catch 会对所有的 promise 产生 error，然后正常返回。根据 promise 的工作原理，
 * 只要 .then/catch 处理器返回值（无论是 error 对象或其他内容），执行流程就会“正常”进行。
 */

/**
 * 注意点：
 * 用 JSON fetch 的容错处理
 */
let urls = [
    'https://api.github.com/users/iliakan',
    '/',
    'http://no-such-url'
];

Promise.all(
    urls.map(url => fetch(url).catch(err => err))
)
.then(responses => Promise.all(
    // if it's an error then pass on
    // otherwise response.json() and catch errors as results
    responses.map(r => r instanceof Error ? r : r.json().catch(err => err))
))
.then(results => {
    alert(results[0].name); // Ilya Kantor
    alert(results[1]); // SyntaxError: Unexpected token < in JSON at position 0
    alert(results[2]); // TypeError: failed to fetch (text may vary)
});
/**
 * 思路：
 * 如果任意请求都失败了，也就是说urls.map(url => fetch(url).catch(err => err))  这一步请求url不符合要求，失败了
 * 那么 Promise.all 就会 reject error，而且会丢失其他所有请求的结果。
 * 错误可能同时发生在 fetch（如果请求失败）和 response.json()（如果响应的是无效 JSON）中。
 * 在这两种情况下，错误都会成为结果对象的成员。
 * 
 * 我们使用response.json().catch进行捕获错误作为结果
 */

/**
 * 注意点
 * 对 resolve 的第二次调用会被忽略，因为只有对 reject/resolve 的第一次调用会被处理。更深层的调用都会被忽略。
 */
let promise = new Promise(function(resolve, reject) {
    resolve(1);
  
    setTimeout(() => resolve(2), 1000);
  });
  
promise.then(alert);    // alert 1;