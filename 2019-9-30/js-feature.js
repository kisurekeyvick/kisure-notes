/** 
 * https://juejin.im/post/5d914537f265da5bba416cae
 * 
 * 几个js常用的技巧和鲜为人知的特性
 */

/** 
 * (1) 获取查询字符串参数
 * 
 * URLSearchParams 是接口定义了一些实用的方法来处理 URL 的查询字符串
 */
const paramsString = "q=URLUtils.searchParams&topic=api";
const searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
    console.log(p);
}

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"

/** 
 * (2) 将原始值列表转换为另一种类型
 */
// 有时候，后台或 DOM 中处理过的数据不是咱们需要的类型，我在处理数据集的属性时看到过这种情况。假设有以下列表
let naiveList = ['1500', '1350', '4580'];
naiveList = naiveList.map(Number);
console.log(castedList) // [1500, 1350, 4580]

/** 
 * (3) 使用 object .freeze 避免对象被改变
 * 
 * 随着函数式x编程的兴起，数据不可变也越来越重要，咱们可以使用 Object.freeze 来防止对象被更改。
 */
const immutableObject = {
    name: 'nice fish',
    url: 'www.baidu.com'
};
Object.freeze(immutableObject);

immutableObject.wechat = '123'
immutableObject.name = 'kk' 
console.log(immutableObject); // {name: "nice fish", url: "www.baidu.com"}

/** 
 * (4) 使用 Object.seal 创建受控对象
 * 
 * Object.seal() 方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。
 * 当前属性的值只要可写就可以改变，Object.freeze 是啥都不能做，Object.seal() 可以改变属性的值。
 * 
 * 说的通俗一点，Object.seal能够修改原本已经存在的属性，但不能添加新的额属性
 */
const controlledObject = {
    name: 'nice fish'
};
Object.seal(controlledObject);

/** 
 * (5) 确保数组值
 * 
 * 创建数组的时候，为了确保不匹配行之间的长度相等，可以使用Array.fill方法。
 */
let array = Array(5).fill('');
console.log(array); // outputs (5) ["", "", "", "", ""]

/** 
 * (6) 数组 map 的方法 (不使用Array.Map)
 * 
 * Array.from 还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
 */
const cities = [
    { name: 'Paris', visited: 'no' },
    { name: 'Lyon', visited: 'no' },
    { name: 'Marseille', visited: 'yes' },
    { name: 'Rome', visited: 'yes' },
    { name: 'Milan', visited: 'no' },
    { name: 'Palermo', visited: 'yes' },
    { name: 'Genoa', visited: 'yes' },
    { name: 'Berlin', visited: 'no' },
    { name: 'Hamburg', visited: 'yes' },
    { name: 'New York', visited: 'yes' }
];

const cityNames = Array.from(cities, ({name}) => name);
console.log(cityNames);
// outputs ["Paris", "Lyon", "Marseille", 
// "Rome", "Milan", "Palermo", "Genoa", "Berlin", "Hamburg", "New York"]

/** 
 * (7) 动态属性名
 * 
 * 早期，如果属性名需要是动态的，我们首先必须声明一个对象，然后分配一个属性。这些日子已经过去了，有了ES6特性，我们可以做到这一点。
 */
const dynamic = 'email';
let user = {
    name: 'nice fish',
    [dynamic]: 'zttaijue@163.com'
}
console.log(user); // outputs { name: "nice fish", email: "zttaijue@163.com" }
