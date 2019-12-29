/** 
 * 7 个令人兴奋的 JavaScript 新特性
 */

/** 
 * (1) 类的私有变量
 * 我们可以使用#来表示类的私有变量
 */
class Demo {
    #x = 0;

    #increment() {
        this.#x++;
    }

    onClick() {
        this.#increment()
    }
}

const c = new Counter();
c.onClick(); // 正常
c.#increment(); // 报错

/** 
 * (2) 可选链操作符
 * 
 * 当需要访问嵌套在对象内部好几层的属性时，会得到臭名昭著的错误Cannot read property 'stop' of undefined,
 * 然后你就要修改你的代码来处理来处理属性链中每一个可能的undefined对象，
 */
let nestedProp = obj && obj.first && obj.first.second;
// 有了可选链式调用 ，你只要这样写就可以做同样的事情
let nestedProp1 = obj?.first?.second;

/** 
 * (3) 空位合并操作符
 * 
 * 我们在开发过程中，经常会遇到这样场景：变量如果是空值，则就使用默认值，我们是这样实现的:
 */
let c1 = a ? a : b // 方式1
let c2 = a || b // 方式2
// 这两种方式有个明显的弊端，它都会覆盖所有的假值，如(0, '', false)，这些值可能是在某些情况下有效的输入。

/** 
 * 为了解决这个问题，有人提议创建一个“nullish”合并运算符，用 ?? 表示。
 * 有了它，我们仅在第一项为 null 或 undefined 时设置默认值。
 */
let c3 = a ?? b;
// 等同于：let c3 = a !== undefined && a !== null ? a : b;

// 如下案例：
const x = null;
const y = x ?? 500;
console.log(y); // 500
const n = 0
const m = n ?? 9000;
console.log(m) // 0

/** 
 * (4) BigInt
 * 
 * JS在Math上一直很糟糕的原因之一是，无法精确表示大于的数字2 ^ 53，这使得处理相当大的数字变得非常困难。
 */
1234567890123456789 * 123;
// -> 151851850485185200000 // 计算结果丢失精度

/** 
 * BigInt（大整数）就是来解决这个问题。你可以在BigInt上使用与普通数字相同的运算符，例如 +, -, /, *, %等等。
 * 创建 BigInt 类型的值也非常简单，只需要在数字后面加上 n 即可。例如，123 变为 123n。
 */
const aNumber = 111;
const aBigInt = BigInt(aNumber);
aBigInt === 111n // true
typeof aBigInt === 'bigint' // true
typeof 111 // "number"
typeof 111n // "bigint"

// 只要在数字末尾加上 n，就可以正确计算大数了：
// 不过有一个问题，在大多数操作中，不能将 BigInt与Number混合使用。比较Number和 BigInt是可以的，但是不能把它们相加。

/** 
 * (5) static 字段
 * 
 * 它允许类拥有静态字段，类似于大多数OOP语言。静态字段可以用来代替枚举，也可以用于私有字段。
 */
class Colors {
    // public static 字段
    static red = '#ff0000';
    static green = '#00ff00';
  
    // private static 字段
    static #secretColor = '#f0f0f0';
}

font.color = Colors.red;
font.color = Colors.#secretColor; // 出错


/** 
 * (6) Top-level await
 * 
 * ES2017（ES8）中的 async/await 特性仅仅允许在 async 函数内使用 await 关键字，
 * 新的提案旨在允许 await 关键字在顶层内容中的使用，例如可以简化动态模块加载的过程：
 */
const strings = await import(`/i18n/${navigator.language}`);

// 这个特性在浏览器控制台中调试异步内容（如 fetch）非常有用，而无需将其包装到异步函数中。


/** 
 * (7) WeakRef
 * 
 * 一般来说，在 JavaScript 中，对象的引用是强保留的，这意味着只要持有对象的引用，它就不会被垃圾回收。
 */
const ref = { x: 42, y: 51 };
// 只要我们访问 ref 对象（或者任何其他引用指向该对象），这个对象就不会被垃圾回收

/** 
 * 目前在 Javascript 中，WeakMap 和 WeakSet 是弱引用对象的唯一方法：
 * 将对象作为键添加到 WeakMap 或 WeakSet 中，是不会阻止它被垃圾回收的
 */
const wm = new WeakMap();
{
  const ref = {};
  const metaData = 'foo';
  wm.set(ref, metaData);
  wm.get(ref);
  // 返回 metaData
}
// 在这个块范围内，我们已经没有对 ref 对象的引用。
// 因此，虽然它是 wm 中的键，我们仍然可以访问，但是它能够被垃圾回收。

const ws = new WeakSet();
ws.add(ref);
ws.has(ref);// 返回 true

/** 
 * WeakRef 是一个更高级的 API，它提供了真正的弱引用，Weakref 实例具有一个方法 deref，
 * 该方法返回被引用的原始对象，如果原始对象已被收集，则返回undefined对象。
 */
const cache = new Map();
const setValue =  (key, obj) => {
  cache.set(key, new WeakRef(obj));
};

const getValue = (key) => {
  const ref = cache.get(key);
  if (ref) {
    return ref.deref();
  }
};

/** 
 * 总而言之，JavaScript 中对象的引用是强引用，WeakMap 和 WeakSet 可以提供部分的弱引用功能，
 * 若想在 JavaScript 中实现真正的弱引用，可以通过配合使用 WeakRef 和终结器（Finalizer）来实现。
 */