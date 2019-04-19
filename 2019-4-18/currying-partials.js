/**
 * 柯里化和偏函数
 * 
 * https://zh.javascript.info/currying-partials
 * https://segmentfault.com/q/1010000008626058
 */
function mul(a, b) {
    return a * b;
}

/**
 * mul.bind(null, 2) 创造了一个新函数 double，
 * 传递调用到 mul 函数，以 null 为上下文，2 为第一个参数。之后的参数等待传入。
 */
let double = mul.bind(null, 2);

// 偏函数应用 —— 我们创造了一个新函数，同时将部分参数替换成特定值。
console.log(double(3));

/**
 * 为什么我们经常会创建一个偏函数？
 * 
 * 我们从中受益的是我们创建了一个独立的非匿名函数（double，triple）。
 * 我们可以使用它，而不需要每次都传入第一个参数，因为 bind 帮我们搞定了。
 * 在其他的场景中，当我们有一个非常通用的函数，并且想要方便地获取它的特定变体，偏函数也是非常有用。
 * 
 * 举个例子，我们拥有函数 send(from, to, text)。然后，在 user 对象中，
 * 我们想要使用它的偏函数变体：sendTo(to, text)，该函数表明发送自一个当前的用户。
 */

/** 
 * 无上下文使用偏函数？
 * 如果我们想要输入一些参数，但是不想绑定 this，该怎么做？
 * 原生的 bind 不允许这样。我们不能忽略上下文，直接跳到参数。
 * 幸运的是，一个只绑定参数的 偏函数 很容易实现。
*/
let user = {
    firstName: "John",
    say(time, phrase) {
      alert(`[${time}] ${this.firstName}: ${phrase}!`);
    }
};

function partial(func, ...argsBound) {
    return function(...args) {
      return func.call(this, ...argsBound, ...args);
    }
}

// user对象中添加一个sayNow属性，值为一个偏函数
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");

/**
 * 实现对有特定参数个数的函数柯里化
 */
var curry = function(func){

    var length = func.length,
    args = Array.prototype.slice.call(arguments, 1)||[];
    return function(){
        var newArgs = args.concat([].slice.call(arguments));
        if(newArgs.length < length){
            return curry.call(this,func,...newArgs);
        }else{
            return func.apply(this,newArgs);
        }
    }

};

var addCurry=curry(function (a,b,c){
    return a+b+c;
});

console.log(addCurry(2)(3)(5))  //10
console.log(addCurry(2,3)(5))   //10
console.log(addCurry(2,3,5))    //10

/** 
 * 柯里化和偏函数之间的区别
 * 函数柯里化：将多个入参的函数转化为一个入参的函数
 * 偏函数，固定了你函数的某一个或几个参数，返回一个新的函数，接收剩下的参数, 参数个数可能是1个，也可能是2个，甚至更多。
 * 例如：
 *      const add = a => b => c => a + b + c
 *      add(1)(2)(3)
 * 
 * 偏函数: 将多个入参的函数转化成两部分
 * 例如：
 *      const add = a => (b, c) => a + b + c
 *      add(1)(2, 3)
*/

/**
 * 柯里化或偏函数有什么用？
 * 
 * 柯里化或偏函数主要是对于参数进行一些操作，将多个参数转换为单一参数或者减少参数个数的过程。
 * 如果参数不足的话它们就会处在一种中间状态，我们可以利用这种中间状态做任何事！！！
 * 而传统函数调用则需要预先确定所有实参。如果你在代码某一处只获取了部分实参，
 * 然后在另一处确定另一部分实参，这个时候柯里化和偏应用就能派上用场。
 * 
 * 归纳下来，主要为以下常见的三个用途：
 * (1)动态生成函数
 * (2)减少参数
 * (3)延迟计算
 */