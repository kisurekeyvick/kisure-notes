/**
 * (1) JavaScript 解析
 * 
 * 解析有两个阶段:
 *  - Eager（全解析）- 立即解析所有的代码
 *  - Lazy（预解析）- 按需做最少的解析，剩下的留到后面
 */
// 变量声明会被立即解析
const a = 1;
const b = 2;

// 目前不需要的暂时不解析
function add(a, b) {
  return a + b;
}

// add 方法被执行到了，所以需要返回解析该方法
add(a, b);

/** 
 * 变量声明会被立即解析，函数则会被懒解析，但上述代码里紧接着就执行了 add(a, b)，
 * 说明 add 方法是马上就需要用到的，所以这种情况下，把 add 函数进行即时解析会更高效。
 */

/**
 * 函数声明也会被立即解析
 */
var add = (function(a, b) {
    return a + b;
})();
  
/**
 * (2) 解析相关的建议: 不要让函数嵌套
 */
// 糟糕的方式
function sumOfSquares(a, b) {
    // 这里将被反复懒解析
    function square(num) {
      return num * num;
    }
  
    return square(a) + square(b);
}

// 好的处理方式
function square(num) {
    return num * num;
}
  
// 好的方式
function sumOfSquares(a, b) {
    return square(a) + square(b);
}
  
sumOfSquares(a, b);


/** 
 * (3) 内联函数
 */
const square = (x) => { return x * x }

const callFunction100Times = (func) => {
    for(let i = 100; i < 100; i++) {
      // func 参数会被调用100次
      func(2)
    }
}

callFunction100Times(square)

/**
 * 上述代码会被优化为：
 */
const square = (x) => { return x * x }

const callFunction100Times = (func) => {
  for(let i = 100; i < 100; i++) {
    // 函数被内联后就不会被持续调用了
    return x * x
  }
}

callFunction100Times(square)

/** 
 * 从上面可以看出，V8 实际上会把 square 函数体内联，以消除调用函数的步骤。这对提高代码的性能是很有用处的。
 */

/** 
 * (4) v8引擎优化对象
 * 
 * 首先声明一个对象
 * const obj = { name: 'John'};
 * 
 * V8 会为这个对象声明一个 classId
 * const objClassId = ['name', 1];
 * 
 * 然后对象会按如下方式被创建
 * const obj = {...objClassId, 'John'};
 * 
 * 然后当我们获取对象里的 name 属性时：obj.name
 * 
 * v8会做如下查找：obj[getProp(obj[0], name)]
 * 
    const obj = { a: 1 } // 隐藏的 classId 被创建
    obj.b = 3

    const obj2 = { b: 3 } // 另一个隐藏的 classId 被创建
    obj2.a = 1

    // 这样会更好
    const obj = { a: 1 } // 隐藏的 classId 被创建
    obj.b = 3

    const obj2 = { a: 1 } // 隐藏的 classId 被复用
    obj2.b = 3
 */

/**
 * (5) 创建对象的建议
 * 
 * 应该尽量将属性放在构造器中声明，以保证对象的结构不变，从而让 V8 可以优化对象。
 */
class Point {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
}

const p1 = new Point(11, 22) // 隐藏的 classId 被创建
const p2 = new Point(33, 44) // 隐藏的 classId 被复用

/**
 * (6) 修正函数参数类型
 * 
 * 当参数被传进函数中时，保证参数的类型一致是很重要的。
 * 如果参数的类型不同，Turbofan 在尝试优化 4 次之后就会放弃
 */
function add(x, y) {
    return x + y;
}

add(1,2) // 单态
add('a', 'b') // 多态
add(true, false)    // 1
add({},{})  // "[object Object][object Object]"
add([], []) // 复杂态 - 在这个阶段, 已经尝试了4+次, 不会再做优化了

/**
 * (7) 保证在全局作用域下声明类
 */
// 不要这样做
function createPoint(x, y) {
    class Point {
      constructor(x,y) {
        this.x = x
        this.y = y
      }
    }
  
    // 每次都会重新创建一个 point 对象
    return new Point(x,y)
}