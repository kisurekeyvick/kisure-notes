/**
 * https://juejin.im/post/5e33fcd06fb9a02fc767c427
 *
 * TS 常见问题整理
 */
/**
 * (1) null 和 undefined 是其它类型（包括 void）的子类型，
 *      可以赋值给其它类型（如：数字类型），赋值后的类型会变成 null 或 undefined
 */
var a = 1;
a = null;
/**
 * - 默认情况下，编译器会提示错误，这是因为 tsconfig.json 里面有一个配置项是默认开启的。
 * - tsconfig.json中有一个参数：strictNullChecks ，该参数用于新的严格空检查模式，在严格空检查模式下，
 *          null 和 undefined 值都不属于任何一个类型，它们只能赋值给自己这种类型或者 any
 */
/**
 * (2) never 和 void 的区别
 *
 * - void 表示没有任何类型（可以被赋值为 null 和 undefined）
 * - never 表示一个不包含值的类型，即表示永远不存在的值。
 * - 拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。
 */
/**
 * (3) 元祖越界问题
 */
var aaa = ['aaa', 5];
// 添加时不会报错
aaa.push(6);
// 打印整个元祖不会报错
console.log(aaa); // ['aaa',5,6];
// 打印添加的元素时会报错
// console.log(aaa[2]); // error
/**
 * (4) 枚举成员的特点
 *
 * - 是只读属性，无法修改
 * - 枚举成员值默认从 0 开始递增，可以自定义设置初始值
 */
var Gender;
(function (Gender) {
    Gender[Gender["BOY"] = 1] = "BOY";
    Gender[Gender["GRIL"] = 2] = "GRIL";
})(Gender || (Gender = {}));
console.log(Gender.BOY); // 1
console.log(Gender); // { '1': 'BOY', '2': 'GRIL', BOY: 1, GRIL: 2 }
/**
 * 枚举成员值
 *
 * - 可以没有初始值
 * - 可以是一个对常量成员的引用
 * - 可以是一个常量表达式
 * - 也可以是一个非常量表达式
 */
var Char;
(function (Char) {
    // const member 常量成员：在编译阶段被计算出结果
    Char[Char["a"] = 0] = "a";
    Char[Char["b"] = 0] = "b";
    Char[Char["c"] = 4] = "c";
    // computed member 计算成员：表达式保留到程序的执行阶段
    Char[Char["d"] = Math.random()] = "d";
    Char[Char["e"] = '123'.length] = "e";
    // 紧跟在计算成员后面的枚举成员必须有初始值!!!
    Char[Char["f"] = 6] = "f";
    Char[Char["g"] = 7] = "g";
})(Char || (Char = {}));
console.log('nice fish', Char.g);
