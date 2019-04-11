/** 
 * 解构赋值
 * 解构赋值是一种特殊的语法，它让我们可以将数组或对象进行“拆包”，存放到一系列的变量中，因为有时候使用变量更加方便。
 * 
 * 对象的解构赋值特点
 * (1)数组的元素是按次序排列的，变量的取值由它的位置决定。
 * (2)而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
 * 
 * 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者
*/
var { a, b } = { a: "111", z: "222" };
console.log(a, b);  //  111   undefined

// 上面的例子中，变量名与属性名不一致，可以改写成下面这样
var { a, z:b } = { a: "111", z: "222" };
console.log(a, b);  // 111  222

/** 
 * 可以对任意深度的嵌套对象进行解构
 */
let itemObj = {
    arr: [
       "aaa",
       { secondLevel: "bbb" }
    ]
};

let { arr: [firstLevel, { secondLevel }] } = itemObj;

console.log(firstLevel); // "aaa"
console.log(secondLevel); // "bbb"

/** 
 * 可以自定义属性名称
 */
// 注意的是被赋值的只是我们自定义的属性名称，匹配的模式（项）并未被赋值
var {name, id: ID} = { name: 'jack', id: 1 };

/**
 * 字符串的解构
 * 字符串也可以解构赋值，字符串被转换成了一个类似数组的对象。模式能够匹配起来
 */
const [a, b, c, d, e] = 'hello';
console.log(a, b, c, d, e);
let { length:len } = 'hello';
console.log(len);  //5 (长度为5)

/**
 * 数值和布尔值的解构赋值
 * 解构赋值的规则是：只要等号右边的值不是对象或数组，就先将其转为对象。
 * 如果转换之后的对象或原对象拥有Iterator接口，则可以进行解构赋值，否则会报错。
 * 
 * null或undefined却不能转换成对象，所以会报错
 */
let {toString: str} = 111;
console.log(str === Number.prototype.toString);     // true

let {toString: str} = true;
console.log(str === Boolean.prototype.toString);    // true

// let { prop: x } = undefined;    // TypeError    找不到对应的prop属性

/**
 * 圆括号的用法
 * 
 * 如果在解构之前就已经定义了对象：
 * 
 * let obj;
 * {obj}={obj:'James'};     // 报错
 * 
 * 原因：大括号{位于行首，匹配了}之后 JS引擎 就会认为 { obj } 是一个代码块，所以等号就出问题了，
 *      解决方式是在行首放个括号(，即外包裹一层括号（）。
 *      括号的出现，让整个解构赋值的结构被看做一个代码块，而内部的 { obj } 模式则可以正常匹配到。
 */

/**
 * 解构赋值的用途
 * 
 * (1)交换变量的值
 *      let x = 1;
        let y = 2;
        [x, y] = [y, x];
 * 
 * (2)函数参数定义
 *      function foo({width,height,left,right}){
            // ...
        }

        foo([left:300, width:100, right:300, height:200,])
 * 
 * (3)配置对象参数
 *      function run({
            async = true,
            beforeSend = noop,
            cache = true,
            complete = noop,
            crossDomain = false,
            global = true,
            // ... 更多配置 
        }) { }
 * 
 * (4)从函数返回多个值
 *      function foo() {
 *          return [1, 2, 3];
 *      }
 * 
 *      let [a, b, c] = foo();
 * 
 * (5)引入模块的指定方法
 *      加载模块时，往往需要指定输入那些方法。解构赋值使得输入语句非常清晰。
 *      如果项目中只用到了element-ui中的Loading模块，可以这么写：
 *          import { Loading} from 'element-ui';
 */

/**
 * 用途：忽略第一个元素
 * 数组中不想要的元素也可以通过添加额外的逗号来把它丢弃：
 */
let [, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
console.log(title);     // 'Consul'

/**
 * 用途：用于等号右侧的任何可迭代对象
 * 事实上我们也可以在任何可迭代对象中使用，不仅仅是数组：
 */
let [a1, b2, c3] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

