/** 
 * 代码风格
 */

/** 1、变量 */
/** 1.1用有意义且常用的单词命名 */
// Bad:
const yyyymmdstr = moment().format('YYYY/MM/DD');
// Good:
const currentDate = moment().format('YYYY/MM/DD');


/** 1.2每个常量(全大写)都该命名 */
// Bad:
// 其他人知道 86400000 的意思吗？
setTimeout( blastOff, 86400000 );
// Good:
const MILLISECOND_IN_A_DAY = 86400000;
setTimeout( blastOff, MILLISECOND_IN_A_DAY );


/** 1.3避免无意义的命名
 * 创建了一个 car 对象，就没有必要把它的颜色命名为 carColor
 */
// Bad:
const car = {
    carMake: 'Honda',
    carModel: 'Accord',
    carColor: 'Blue'
};
function paintCar( car ) {
    car.carColor = 'Red';
}
// Good:
const car = {
    make: 'Honda',
    model: 'Accord',
    color: 'Blue'
};
function paintCar( car ) {
    car.color = 'Red';
}


/** 1.4传参使用默认值 */
// Bad:
function createMicrobrewery( name ) {
    const breweryName = name || 'Hipster Brew Co.';
    // ...
}
// Good:
function createMicrobrewery( name = 'Hipster Brew Co.' ) {
    // ...
}


/** 2.函数 */
/** 
 * 2.1 函数参数( 最好 2 个或更少 ) 
 * 如果参数超过两个，建议使用 ES6 的解构语法，不用考虑参数的顺序
 * */
// Bad:
function createMenu( title, body, buttonText, cancellable ) {
    // ...
}
// Good:
function createMenu( { title, body, buttonText, cancellable } ) {
    // ...
}
createMenu({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
});


/** 
 * 2.2 一个方法只做一件事情 
 * 这是一条在软件工程领域流传久远的规则。严格遵守这条规则会让你的代码可读性更好，也更容易重构。
 * 如果违反这个规则，那么代码会很难被测试或者重用
 * */

/** 2.3 函数名上体现它的作用 */

/** 
 * 2.4 使用 Object.assign 设置默认属性 */
// Bad:
const menuConfig = {
    title: null,
    body: 'Bar',
    buttonText: null,
    cancellable: true
};

function createMenu(config) {
    config.title = config.title || 'Foo';
    config.body = config.body || 'Bar';
    config.buttonText = config.buttonText || 'Baz';
    config.cancellable = config.cancellable !== undefined ? config.cancellable : true;
}

createMenu(menuConfig);

// Good:
const menuConfig = {
    title: 'Order',
    // 不包含 body
    buttonText: 'Send',
    cancellable: true
};

function createMenu(config) {
    config = Object.assign({
        title: 'Foo',
        body: 'Bar',
        buttonText: 'Baz',
        cancellable: true
    }, config);
    // config : {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
    // ...
}

createMenu(menuConfig);

/** 
 * 2.5 不要过度优化 
 * 现代浏览器已经在底层做了很多优化，过去的很多优化方案都是无效的，会浪费你的时间
 * */
// Bad:
// 现代浏览器已对此( 缓存 list.length )做了优化。
for (let i = 0, len = list.length; i < len; i++) {
    // ...
}
// Good:
for (let i = 0; i < list.length; i++) {
// ...
}
  

/** 3.类 */
/** 3.1 使用链式调用 */
// Good: 
class Car {
    constructor(make, model, color) {
      this.make = make;
      this.model = model;
      this.color = color;
    }
  
    setMake(make) {
      this.make = make;
      // NOTE: Returning this for chaining
      return this;
    }
  
    setModel(model) {
      this.model = model;
      // NOTE: Returning this for chaining
      return this;
    }
  
    setColor(color) {
      this.color = color;
      // NOTE: Returning this for chaining
      return this;
    }
  
    save() {
      console.log(this.make, this.model, this.color);
      // NOTE: Returning this for chaining
      return this;
    }
}
  
const car = new Car("Ford", "F-150", "red").setColor("pink").save();
