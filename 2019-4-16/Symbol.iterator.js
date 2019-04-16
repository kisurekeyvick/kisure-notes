/**
 * Symbol.iterator的理解
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator
 * https://blog.csdn.net/margin_0px/article/details/82971545
 * https://juejin.im/post/5ad40023f265da238c3b20c4
 * https://www.cnblogs.com/zczhangcui/p/6502836.html    
 */

/**
 * 在Symbol.iterator出现后，JS可以定义自己的迭代器
 * 
 */

/**
 * Iterator的作用有三个：
 * 一是为各种数据结构，提供一个统一的、简便的访问接口；
 * 二是使得数据结构的成员能够按某种次序排列；
 * 三是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费
 * 
 * 在ES6中，有些数据结构原生具备Iterator接口（比如数组），即不用任何处理，
 * 就可以被for...of循环遍历，有些就不行（比如对象）。
 * 原因在于，这些数据结构原生部署了Symbol.iterator属性，另外一些数据结构没有。
 * 凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。
 * 调用这个接口，就会返回一个遍历器对象。
 * 
 * 在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。
 */
function argFunc() {
	console.log(arguments);
}
argFunc(1,2,3,4,5);
/**
 * {
        0: 1
        1: 2
        2: 3
        3: 4
        4: 5
        callee: ƒ a()
        length: 5
        Symbol(Symbol.iterator): ƒ values()
 * }
 */

/**
 * 一个为对象添加Iterator接口的例子
 */
let obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator]() {
      const self = this;
      let index = 0;
      return {
        next() {
          if (index < self.data.length) {
            return {
              value: self.data[index++],
              done: false
            };
          } else {
            return { value: undefined, done: true };
          }
        }
      };
    }
};