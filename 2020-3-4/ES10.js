/** 
 * https://mp.weixin.qq.com/s/DGvbcdJ1oLQm6PDv5Be5rA
 * 
 * ES10相关特性 也就是ES2019
 */

/** 
 * (1) 稳定的 Array.prototype.sort()
 * 
 * V8的先前实现，对包含10个以上项的数组使用了不稳定的快速排序算法。
 * 一种稳定的排序算法是，当两个具有相同键的对象在排序输出中出现的顺序，与未排序输入中出现的顺序相同。
 * 查看[sort排序].jpg
 */

/** 
 * (2) 新版 Function.toString()
 * 
 * toString() 方法返回一个表示函数源代码的字符串。
 */
function run() {
    console.log('nice fish');
}
run.toString();
// "function run() {
//     console.log('nice fish');
// }"

/** 
 * (3) BigInt — 任意精度的整数
 * 
 * BigInt是第7个原始类型，它是一个任意精度的整数。而不仅仅是在9007199254740992处的最大值。
 */
let max = Number.MAX_SAFE_INTEGER;  // 9007199254740991
max + 1;    // 9007199254740992
// 在过去，不支持大于 9007199254740992 的整数值。如果超过，该值将锁定为 MAX_SAFE_INTEGER + 1:

const larger = 9007199254740991n;
const integer = BigInt(9007199254740991); // 使用数字初始化
const same = BigInt("9007199254740991");  // 使用字符串初始化

typeof 10;  // number
typeof 10n; // bigint

// 等于运算符可用于两种类型之间比较
10n === BigInt(10); // true
10n == 10;          // true

// 数学运算符只能在自己的类型中工作
200n / 10n;         // 20n
200n / 20;          // 报错

// －运算符可以操作， + 不可用
-100n;
+100n;              // 报错

/** 
 * (4) 动态引入
 * 
 * 现在可以将导入分配给变量
 */
element.addEventListener('click', async() => {
    const module = await import(`./api-scripts/button-click.js`);
    module.clickEvent();
});

/** 
 * (5) 标准 globalThis 对象
 * 
 * 全局 this 在ES10之前尚未标准化
 */
globalThis.val = { name: 'kisure' };
console.log(val);   // { name: 'kisure' }

/** 
 * (6) ES10 Class: private, static & public 成员变量，函数
 * 
 * 私有变量:# + 变量名
 */
class Counter extends HTMLElement {
    #xValue = 0

    get #x() { 
        return #xValue
    }

    set #x(value) {
          this.#xValue = value
          window.requestAnimationFrame(this.#render.bind(this))
    }

    #clicked() {
          this.#x++
    }

    constructor() {
          super();
          this.onclick = this.#clicked.bind(this)
    }

    connectedCallback() { 
            this.#render()
    }

    #render() {
          this.textContent = this.#x.toString()
    }
}
