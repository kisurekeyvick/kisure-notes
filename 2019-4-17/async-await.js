/**
 * Async/await
 * 
 * 函数前的 “async” 意味着一件简单的事情：函数总是会返回 promise。
 * 如果代码中有 return <non-promise>，那么 JavaScript 就会自动将其封装到一个带有该值的 resolved promise 中。
 * 
 * 例如：
 *  async function f() {
        return Promise.resolve(1);
    }

    f().then(console.log);

    所以：async 确保函数返回一个 promise，并在其中封装非 promise
 */

/**
 * await
 * 语法：let value = await promise;
 * await 关键字使 JavaScript 等待，直到 promise 得到解决并返回其结果
 * 
 * await 字面上是让 JavaScript 等待 promise 完成，然后继续处理结果。
 * 这并不会消耗 CPU 资源，因为引擎可以同时处理其他任务：执行其他脚本，处理事件等
 */

/**
 * 以下为注意事项：
 * 
 * (1)不能在常规函数中使用 await
 *      例如：
        function f() {
            let promise = Promise.resolve(1);
            let result = await promise; // 语法错误
        }
    如果我们忘记将 async 放在函数前，我们就会得到这样的错误。如前面所说的，await 只在 async 函数 中工作。

    (2)await 在顶层代码中无效
        刚开始使用 await 的新手往往会忘记这一点，但我们不能在最顶层的代码中编写 await，因为它会无效
        例如：
        let response = await fetch('/article/promise-chaining/user.json');
        let user = await response.json();

        所以我们需要将 await 代码封装在一个async 函数中。

    (3)await 接受 thenables
        像 promise.then、await 允许使用 thenable 对象（那些具有可调用的 then 方法）。
        同样，我们的想法是，第三方对象可能不是 promise，
        而是与 promise 兼容：如果它支持 .then，那么就可以和 await 一起使用。
 */
class Thenable {
    constructor(num) {
      this.num = num;
    }

    then(resolve, reject) {
      console.log(resolve); // function() { native code }
      // 在 1000 ms 后将 this.num*2 作为 resolve 值返回
      setTimeout(() => resolve(this.num * 2), 1000); // (*)
    }
};

async function f() {
    // 等待 1 秒后，结果变成 2
    let result = await new Thenable(1);
    console.log(result);
}

f();

/**
 * 如果 await 获取了带有 .then 的非 promise 对象，它就会调用提供 resolve、reject 作为参数的原生函数。
 * await 等待，直到其中一个被调用（在上述示例中，发生在 (*) 行），然后继续处理结果。
 */

/**
 * (4) Async 方法，类方法也可以 async，只要把 async 放在类方法前即可
 */
class Waiter {
    async wait() {
      return await Promise.resolve(1);
    }
}
  
new Waiter().wait().then(console.log); // 1

/**
 * Error 处理
 * 如果一个 promise 正常 reslove，那么 await promise 就会返回结果。但在 reject 情况下，它会抛出 error。
 * 
    async function f() {
        await Promise.reject(new Error("Whoops!"));
    }
 */
// 在实际情况中，promise 可能需要一段时间才会变成 reject。因此 await 会等待，然后抛出 error。
async function f() {
    try {
      let response = await fetch('http://no-such-url');
    } catch(err) {
      alert(err); // 类型错误：获取失败
    }
}
  
f();

// 如果我们没有 try..catch，那么 async 函数 f() 调用所产生的 promise 就会变为 reject 状态。我们可以通过追加 .catch 来处理它：
async function f() {
    let response = await fetch('http://no-such-url');
}
  
// f() 变成一个 rejected 状态的 promise
f().catch(alert); // 类型错误：未能获取 // (*)

/**
 * 注意点：
 * 
    async/await 和 promise.then/catch
    我们使用 async/await 时，几乎不需要 .then，因为 await 为我们处理等待。
    我们也可以使用 try..catch 替代 .catch。但这通常（并不总是）更方便。
    但是在代码的顶层，当我们在 async 函数的外部时，我们在语法上是不能使用 await 的，所以通常添加 .then/catch 去处理最终结果或者 error。
 */
