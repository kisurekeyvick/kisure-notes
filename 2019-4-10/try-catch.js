/**
 * 异常处理，"try..catch...finally"
 * https://zh.javascript.info/try-catch
 * 作用：捕捉到异常的同时不会使得代码停止执行而是可以做一些更为合理的操作。
 * 
 * 语法：
 *      try {
 *          // 代码
 *      } catch() {
 *          // 异常处理
 *      } finally {
 *          // 无论是否出错，肯定都要执行的代码
 *      }
 * 
 * 执行步骤：
 *      (1)首先，执行 try {...} 里面的代码。
 *      (2)如果执行过程中没有异常，那么忽略 catch(err) 里面的代码，try 里面的代码执行完之后跳出该代码块。
 *      (3)如果执行过程中发生异常，控制流就到了 catch(err) 的开头。变量 err（可以取其他任何的名称）是一个包含了异常信息的对象。
 */

/**
 * try...catch存在几个不能工作的地方：
 * 
 * (1)要使得 try..catch 能工作，代码必须是可执行的，换句话说，它必须是有效的 JavaScript 代码。
 * 如果代码包含语法错误，那么 try..catch 不能正常工作。
 * 
 *  例如：
 *  try {
        {{{{{{{{{{{{
    } catch(e) {
        alert("The engine can't understand this code, it's invalid");
    }

    JavaScript 引擎读取然后执行代码。代码在读取阶段，发生了异常。
    它们不会被 try..catch 覆盖到（包括那之间的代码）。这是因为引擎读不懂这段代码。
    所以，try..catch 只能处理有效代码之中的异常。这类异常被称为 “runtime errors”，有时候也称为 “exceptions”。

    (2)如果一个异常是发生在计划中将要执行的代码中，例如在 setTimeout 中，那么 try..catch 不能捕捉到：
    例如：
    try {
        setTimeout(function() {
            noSuchVariable; // 代码在这里停止执行
        }, 1000);
    } catch (e) {
        alert( "won't work" );
    }

    因为 try..catch 包裹了计划要执行的 setTimeout 函数。但是函数本身要稍后才能执行，这时引擎已经离开了 try..catch 结构。
    要捕捉到计划中将要执行的函数中的异常，那么 try..catch 必须在这个函数之中。
 */

/** 
 * Error对象
 * 当一个异常发生之后，JavaScript 生成一个包含异常细节的对象。这个对象会作为一个参数传递给 catch。
 * 对于所有内置的异常，catch 代码块捕捉到的相应的异常的对象都有一下几个属性：
 * (1)name  异常名称，对于一个未定义的变量，名称是 "ReferenceError"
 * (2)message   异常详情的文字描述
 * (3)stack     当前的调用栈：用于调试的,一个包含引发异常的嵌套调用序列的字符串
 */
function tryCatchRun() {
    try {
        kisure
    } catch(err) {
        console.log(`${err.name}....${err.message}....${err.stack}`);
                // ReferenceError....kisure is not defined....ReferenceError: kisure is not defined
    }
}

tryCatchRun();

/**
 * JavaScript 支持 JSON.parse(str) 方法来解析 JSON 编码的值
 * 如果 json 格式错误，JSON.parse 就会报错，代码就会停止执行。
 * 我们可以使用try catch处理错误
 */
function tryCatchJson() {
    let json = "{ bad json }";
    try {
        JSON.parse(json);
    } catch(err) {
        console.log(`${err.name}....${err.message}....${err.stack}`);
                // SyntaxError....Unexpected token b in JSON at position 2....SyntaxError: Unexpected token b in JSON at position 2
    }
}

tryCatchJson();

/**
 * 自定义抛出异常
 * 以下有7种方式抛出异常以及区别：
 * https://www.cnblogs.com/neil080320/p/6259980.html
 * https://blog.csdn.net/u011435776/article/details/80938130
 * 
 * (1)new Error(...);
 * (2)new SyntaxError(...);         SyntaxError是解析代码时发生的语法错误
 *      console.log 'hello');       缺少括号，语法错误。
 * 
 * (3)new ReferenceError(...);      引用错误，即在作用域中没有找到该变量
 *      console.log(a);     变量a没有声明     
 * 
 * (4)new TypeError(...);           类型错误，在作用域中已经声明变量并且找到，但是没有找到确切定义或者引用
 *      foo(); // TypeError                 foo() 由于对undefined 值进行函数调用而导致非法操作，因此抛出TypeError 异常
 *      bar();  // ReferenceError           bar() 名称标识符在赋值之前也无法在所在作用域中使用
 *      var foo = function bar() {...}
 * 
 * (5)new RangeError(...);          是当一个值超出有效范围时发生的错误
 *      出现的可能，主要有几种情况，一是数组长度为负数，二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。
 *      例如：new Array(-1)               
 * 
 * (6)new URIError(...)         URIError是URI相关函数的参数不正确时抛出的错误，主要涉及：
 *                              encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。
 *      例如：decodeURI('%2')         URIError: URI malformed   URI错误
 * 
 * (7)new EvalError(...)        eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再在ES5中出现了，
 *                              只是为了保证与以前代码兼容，才继续保留。
 * 
 * 注意！！！可以通过使用 throw 运算符来生成自定义的异常。
 */
function tryCatchJsonError() {
    let json = '{ "age": 30 }'; // 不完整的数据

    try {
        let user = JSON.parse(json); // <-- 没有异常
        if (!user.name) {
            throw new SyntaxError("name属性不存在");
        }
    } catch(e) {
        console.log( "JSON Error: " + e.message ); // JSON Error: name属性不存在
    }
}

tryCatchJsonError();

/**
 * window.onerror
 * window.onerror目的不是去处理整个代码的执行中的所有异常，而是为了给开发者提供异常信息。
 * 
 * 例如：window.onerror = function(message, url, line, col, error) {
                            // ...
                        };
        message     异常信息
        url         发生异常的代码的 URL
        line, col   错误发生的代码的行号和列号
        error       异常对象
 */
window.onerror = function(message, url, line, col, error) {
    // console.log(`${message, url, line, col, error}`);
}