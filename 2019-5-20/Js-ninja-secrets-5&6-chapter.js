/**
 * (1)当调用函数时，除了传入在函数定义中显式声明的参数之外，
 *      同时还传入两个隐式参数：arguments与this。
 *      I: this表示函数上下文，即与函数调用相关联的对象。
 *          函数的定义方式和调用方式决定了this的取值。
 *      II：通过arguments参数还可获取那些与函数形参不匹配的参数。在非严格模式下，arguments对象是函
 *          数参数的别名，修改arguments对象会修改函数实参。
 *          如果我们想不允许让arguments赋值，那么可以使用严格模式
 *          同时，在严格模式下arguments是不会追踪参数的变化的
 * 
 * (2)函数的调用方式影响this的取值
 *      I：如果作为函数调用（window.函数名(...)），在非严格模式下，this指向全局window对象；在严格模式下，this指向undefined。
 *      II：作为方法调用（obj.函数名(...)）,this通常指向新创建的对象
 *      III：通过call或apply调用，this指向call或apply的第一个参数
 */
"use strict";

function argsTest(a) {
    a = 2;
    console.log(a, arguments[0]);   // 2 1
    // 所以在严格模式下arguments是不会追踪参数的变化的
}

argsTest(1,2);

function knowThis() {
    console.log('这是一个测试，测试this的指向问题', this);
    // 在严格模式下this指向undefined，非严格模式下this指向的是window对象
}

knowThis();

var button = {
    clicked: false,
    click: function(){
        this.clicked = true;
        console.log(button.clicked,"The button has been clicked");
    }
};

document.addEventListener('click', button.click.bind(button));

/** 
 * https://juejin.im/post/5bae050ee51d450e827b55f1
 * https://segmentfault.com/a/1190000018779762
 * 
 * generator
 * 什么是generator:
 * Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，
 * 也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，
 * 可以依次遍历 Generator 函数内部的每一个状态。
 */

/**
 * (1)generator语法
 * function * generator () {}
 * function* generator () {}
 * function *generator () {}
 * let generator = function * () {}
 * let generator = function* () {}
 * let generator = function *() {}
 * 
 * class MyClass {
 *  *generator() {}
 *  * generator() {}
 * }
 * 
 * const obj = {
 *  *generator() {}
 *  * generator() {}
 * }
 */

/**
 * (2)yield
 * 让我们来看看新的关键字 yield。它有点像 return，但不是。
 * return 只在函数调用之后返回值，return 语句之后不允许你执行任何其他操作。
 * 
 * yield 只返回一次值，下次调用 next() 时，它将执行到下一个 yield 语句。
 * 在 generator 中我们通常都会获得一个对象作为输出。它有两个属性 value 和 done。
 * value 表示返回的值，done 告诉我们 generator 是否完成了它的工作
 * 
 * 主要注意的是：
 * 在 generator 中不仅可以使用 yield，return 语句也会返回相同的对象，
 * 但是当执行完第一个 retrurn 语句时，迭代就会停止了。
 
    案例：
    function* Gen(val) {
        val = yield val * 2;
        console.log('内部运行val', val);
        yield val;
    }

    let generator = Gen(2);
    generator.next(666);        // {value: 4, done: false}
    generator.next();           // 内部运行val undefined    {value: undefined, done: false}

    解释：
        I:  yield表达式本身没有返回值(就是说let a=yield ;会返回undefined)，或者说总是返回undefined
            案例中val = yield val * 2; val始终是undefined
        II: next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
            注意，是整个表达式的返回值而不只是yield 后方的值。
            例如 let a=yield.......... 参数会是a 的值并且会覆盖表达式之前的值
        III: 由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。
             V8 引擎直接忽略第一次使用next方法时的参数，
             只有从第二次使用next方法开始，参数才是有效的。
             从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。
 */

// 针对于在generator中执行return
function * kisGenerator() {
    yield 1;
    return 2;
    yield 3; // 注意了这个yield永远都不会执行
}

const kisG = kisGenerator();
kisG.next();    // {value: 1, done: false}
kisG.next();    // {value: 2, done: true}
kisG.next();    // {value: undefined, done: true}

function* WeaponGenerator() {
    yield "Katana";
    yield "Wakizashi";
}

/** 调用生成器得到一个迭代器，从而我们能够控制生成器的执行 */
const weaponsIterator = WeaponGenerator();
// console.log(weaponsIterator.next());    // {value: "Katana", done: false}
// console.log(weaponsIterator.next());    // {value: "Wakizashi", done: false}
// console.log(weaponsIterator.next());    // {value: undefined, done: true}
let item;
while(!(item = weaponsIterator.next()).done) {
    console.log(item);
}

// 上面的案例，就是for...of循环的原理，for...of循环不过是对迭代器进行迭代的语法糖。

/** 
 * 使用生成器生成ID序列
 */
function* IdGenerator() {
    let id = 0;
    while (true) {
        yield ++id;
    }
};
const idIterator = IdGenerator();
const ninja1 = { id: idIterator.next().value };
const ninja2 = { id: idIterator.next().value };
const ninja3 = { id: idIterator.next().value };

/**
 * 作为生成器函数参数发送值
 */
// 生成器可以像其他函数一样接收标准参数
function* NinjaGenerator(action) {
    /**
     * 产生一个值的同时，生成器会返回一个中间计算结果。
     * 通过带有参数的调用迭代器的next方法，我们可以将数据传递回生成器
     */
    const imposter = yield ("Hattori " + action);
    // 传递回的值将成为yield表达式的返回值，因此impostrer的值是Hanzo
    yield(`Yoshi(${imposter})${action}`);
}

const ninjaIterator = NinjaGenerator("skulk");
const result1 = ninjaIterator.next();
console.log(result1);
const result2 = ninjaIterator.next("Hanzo");
console.log(result2);

/**
 * (3)generator 方法和初始化
 *  3.1 generator 是可重用的，但是你需要初始化它们
 * 
 *  function * generator(arg = 'Nothing') {
        yield arg;
    }

    const gen0 = generator(); // OK
    const gen1 = generator('Hello'); // OK
    const gen2 = new generator(); // Not OK,也就是说generator是不需要new的

    generator().next(); // 这样也可以，但是会每一次从都头开始

    3.2 同时，generator还提供了2个方法：next()和return()
    3.2.1 next()
            当所有的 yield 表达式被执行完之后，next() 会把属性 done 设置为 true，将属性 value 设置为 undfined
            当然我们也可以用for of 循环来一次得到生成器生成的值

            function * generator(arr) {
                for (const el in arr)
                    yield el;
                }
                const gen = generator([0, 1, 2]);
                for (const g of gen) {
                    console.log(g); // 0 -> 1 -> 2
                }
            }

            但这不适用于for...in循环，也不能直接用数字下标来访问属性：generator[0] = undefined。
    3.2.2 return()
            function * generator() {
                yield 1;
                yield 2;
                yield 3;
            }
            const gen = generator();    
            gen.return();           // {value: undefined, done: true}
            gen.return('Heeyyaa');  // {value: "Heeyyaa", done: true}
            gen.next();             // {value: undefined, done: true} - 在 return() 之后的所有 next() 调用都会返回相同的输出

            return() 将会忽略生成器中的任何代码。
            它会根据传值设定 value，并将 done 设为 true。
            任何在 return() 之后进行的 next() 调用都会返回 done 属性为 true 的对象。
    3.2.3 throw()
            throw() 做的事情非常简单 — 就是抛出错误。我们可以用 try-catch 来处理。

            function * generator() {
                yield 1;
                yield 2;
                yield 3;
            }
            const gen = generator();
            gen.throw('Something bad'); // Error Uncaught Something bad
            gen.next(); // {value: undefined, done: true}
 */
