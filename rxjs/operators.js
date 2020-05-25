/**
 * Operators操作符
 * 
 * 每一个操作符都是基于当前可观察对象创建一个新的可观察对象的函数。
 * 这是 一个单纯无害的操作:之前的可观察对象仍然保持不变
 */
function multiplyByTen(input) { 
    return Rx.Observable.create(function(observer){ 
        input.subscribe({ 
            next: (v) => observer.next(10*v), 
            error: (err) => observer.error(err), 
            complete: () => observer.complete() 
        }); 
    });
}

var input = Rx.Observable.from([1,2,3,4]); 
var output = multiplyByTen(input); 
output.subscribe(x=>console.log(x));
/**
 * 10
 * 20
 * 30
 * 40
 */

/**
 * 静态操作符
 * 
 * 静态操作符是定义在类上的函数，通常被用于从头重新创建一个可观察对象
 * 例如：
 *      构造操作符：interval,create
 *      合并操作符：merge,combineLatest,concat
 * 
 * 这些操作符声明为静态的是 有意义的，因为他们接收多个可观察对象作为参数，而不是一个
 */
var observable = Rx.Observable.intervable(1000);

