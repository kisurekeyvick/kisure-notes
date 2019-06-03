/**
 * https://github.com/JTangming/tm/issues/14
 * 
 * JavaScript 中的私有变量
 * 
 * Javascript 并没有所谓的公共、私有属性的概念。
 */
const map = new WeakMap();
const internal = obj => {
  if (!map.has(obj)) {
    map.set(obj, {});
  }
  return map.get(obj);
}

class Shape {
  constructor(width, height) {
    internal(this).width = width;
    internal(this).height = height;
  }
  get area() {
    return internal(this).width * internal(this).height;
  }
}

const square = new Shape(10, 10);
console.log(square.area);
console.log(map.get(square));

/** 
 * Symbol
 * 
 * Symbol 的实现方式与 WeakMap 类似，不过这种实现方式需要为每个私有属性创建一个 Symbol，
 * 但是在类外还是可以访问该 Symbol，即还是可以拿到这个私有属性。
 */
const widthSymbol = Symbol('width');
const heightSymbol = Symbol('height');
class Shape_2 {
  constructor(width, height) {
    this[widthSymbol] = width;
    this[heightSymbol] = height;
  }
  get area() {
    return this[widthSymbol] * this[heightSymbol];
  }
}
const square_2 = new Shape_2(10, 10);
console.log(square_2.area);         // 100
console.log(square_2.widthSymbol);  // undefined
console.log(square_2[widthSymbol]); // 10

/** 
 * 使用闭包的方式实现私有变量
 */

/**
 * Proxy
 * 
 * 
 */
