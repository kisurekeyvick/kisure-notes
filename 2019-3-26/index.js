/**
 * 关于symbol
 * https://zh.javascript.info/symbol
 * 
 * (1)symbol类型
 * 根据规范，对象的属性键只能是 String 类型或者 Symbol 类型。不是 Number，也不是 Boolean，只有 String 或 Symbol 这两种类型
 * 
 * (2)symbol值表示唯一的标识符
 * 可以使用symbol()来创建symble值：let id = Symbol();
 * Symbol 保证是唯一的。即使我们创建了许多具有相同描述的 Symbol，它们的值也是不同。描述只是一个不影响任何东西的标签。
 */

 let id1 =  Symbol('id');
 let id2 = Symbol('id');
 console.log(id1 === id2);  // false

 
/**
 * (3)我们需要注意的是：JavaScript 中的大多数值都支持 string 的隐式转换。例如，我们可以 alert 任何值，这会起作用。
 * Symbol 是特别的，它无法自动转换。
 * 我们真的想显示一个 Symbol，我们需要在它上面调用 .toString()
 */

/**
 * (4)Symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能偶尔访问或重写这些属性
 * 在 string "id" 上使用 Symbol("id") 有什么好处？
 * 因为 Symbol 总是不同的，即使它们有相同的名称，也不会冲突。
 */

/**
 * (5)symbol在for...in中被跳过，Symbolic 属性不参与 for..in 循环
 */
const id = Symbol('id');
let user = {
    name: 'kisure',
    age: 30,
    [id]: 123
};

for(const key in user) {
    console.log(user[key]);
}

/**
 * (6)symbol可以被Object.assign进行复制字符串和符号属性
 */
let id3 = Symbol('id');
let user2 = {
    [id3]: 123
};
let clone = Object.assign({}, user2);
console.log(clone[id3]) // 123

/**
 * (7)全局symbol
 * 有时候想要同一个名字的symbol是相同的实体。
 * 比如，我们希望在应用程序的不同部分访问相同的 Symbol "id" 属性。
 * 
 * 全局注册：Symbol.for('id')
 * 再次读取：let againRead = Symbol.for('id');
 * 
 * 在js中建议使用全局的symbol
 */

/**
 * (8)Symbol.keyFor()
 * Symbol.for(key) 不仅按名称返回一个 symbol，而且还有一个反向调用：Symbol.keyFor(sym)，反过来：通过全局 symbol 返回一个名称
 */
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 从 symbol 中获取 name
console.log( Symbol.keyFor(sym) ); // name
console.log( Symbol.keyFor(sym2) ); // id

/**
 * 总结：
 * Symbol 是唯一标识符的基本类型
 * Symbol 使用 Symbol() 创建的，调用带有一个可选的描述
 * Symbol 总是不同的值，即使它们有相同的名称。如果我们希望同名 Symbol 相等，
 * 那么我们应该使用全局注册表：Symbol.for(key) 返回（如果需要的话创建）一个以 key 作为名称的全局 Symbol。
 * Symbol.for 的多次调用完全返回相同的 Symbol
 * 
 * Symbol 有两个主要的使用场景：
 * (1)“隐藏” object 属性。如果需要将属性添加到 “属于” 另一个脚本或库的对象中，则可以创建 Symbol 并将其用作属性键。
 * Symbol 属性不出现在 for..in中，因此不回偶尔列出。另外，它不会被直接访问，因为另一个脚本没有我们的符号，所以它不会偶尔干预它的操作。
 * 因此我们可以使用 Symbol 属性“秘密地”将一些东西隐藏到我们需要的 object 中，但其他人不应该看到。
 */