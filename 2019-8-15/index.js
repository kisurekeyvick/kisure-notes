/** 
 *（1）关于spread/rest的特性
 */
Object.defineProperty(Object.prototype, 'a', {
    set(value) {
        console.log('nice fish');
    }
});

const obj = { a: 10 };

console.log({...obj});  // { a:10 }

console.log(Object.assign({}, obj));
// nice fish
// {}

/** 
 * 总结：
 * Object.assign()方法继承了setter属性；而spread操作忽略了setter。
 * spread只复制枚举属性。
 */

// type属性不会出现在复制对象中，因为它的枚举属性被设置为false
const car = {
    color: 'blue'
};

Object.defineProperty(car, 'type', {
    value: 'coupe',
    enumerable: false
});

// 继承的属性即使是可枚举的也会被忽略
const car = {
    color: 'blue'
};
  
const car2 = Object.create(car, {
    type: {
        value: 'coupe',
        enumerable: true,
    }
});

console.log(car2.color);                        // blue
console.log(car2.hasOwnProperty('color'));      // false
console.log(car2.type);                         // coupe
console.log(car2.hasOwnProperty('type'));       // true
console.log({...car2});                         // {type: "coupe"}

/** 
 * 在上述代码中，car2继承了car中的color属性。因为spread操作只会复制对象自身的属性，color并没有出现在新的对象中。
 * 注意，spread只会复制对象的自身属性！
 */

/** 
 * spread只会进行浅拷贝，如果属性的值是一个对象的话，只有对象的引用会被拷贝
 * copy1.x 和 copy2.x 指向同一个对象的引用，所以他们严格相等。
 */
const obj = {x: {y: 10}};
const copy1 = {...obj};    
const copy2 = {...obj}; 
console.log(copy1.x === copy2.x);


/** 
 *（2）异步迭代
 * 遍历是编程的一个重要部分。JS提供了for、for…in和while以及map()、filter()和forEach()等遍历数据的方法。
 * 在ES2015则引入了迭代器接口。
 * 
 * 包含Symbol.iterator属性的对象是可迭代对象，如字符串和集合对象(如Set、Map和Array)
 */
const arr = [10, 20, 30];
const iterator = arr[Symbol.iterator]();
console.log(iterator.next());   // {value: 10, done: false}
console.log(iterator.next());   // {value: 20, done: false}
console.log(iterator.next());   // {value: 30, done: false}
console.log(iterator.next());   // {value: undefined, done: true}


/** 
 * 普通对象进行迭代需要定义Symbol.iterator属性:
 */
const collection = {
    a: 10,
    b: 20,
    c: 30,
    [Symbol.iterator]() {
      const values = Object.keys(this);
      let i = 0;
      return {
        next: () => {
          return {
            value: this[values[i++]],
            done: i > values.length
          }
        }
      };
    }
};

const iterator1 = collection[Symbol.iterator]();

console.log(iterator.next());    // → {value: 10, done: false}
console.log(iterator.next());    // → {value: 20, done: false}
console.log(iterator.next());    // → {value: 30, done: false}
console.log(iterator.next());    // → {value: undefined, done: true}

//  简化一下
const collection1 = {
    a: 10,
    b: 20,
    c: 30,
    [Symbol.iterator]: function * () {
      for (let key in this) {
        yield this[key];
      }
    }
}; 


