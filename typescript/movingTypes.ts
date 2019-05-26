/** 
 * 流动的类型
 * typeScript 类型系统非常强大，它支持其他任何单一语言无法实现的类型流动和类型片段。
 */

/** 
 * 复制类型和值
 */
// 如果你想移动一个类，你可能会想要做以下事情：
class Foo {}
const Bar = Foo;
// let bar: Bar; // Error: 不能找到名称 'Bar'

// 这会得到一个错误，因为 const 仅仅是复制了 Foo 到一个变量声明空间，因此你无法把 Bar 当作一个类型声明使用。
// 正确的方式是使用 import 关键字，请注意，如果你在使用 namespace 或者 modules，使用 import 是你唯一能用的方式：
namespace importing {
    export class Foo {}
}

// 需要注意的是，这个 import 技巧，仅适合于类型和变量
// import Bar = importing.Foo;
// let bar: Bar;

/** 
 * 捕获变量的类型
 * 你可以通过 typeof 操作符在类型注解中使用变量。这允许你告诉编译器，一个变量的类型与其他类型相同
 */
let foo_2 = 123;
let bar_2: typeof foo_2;   // 'bar' 类型与 'foo' 类型相同（在这里是： 'number'）

bar_2 = 456; // ok
// bar_2 = '789'; // Error: 'string' 不能分配给 'number' 类型

/** 
 * 捕获键的名称
 * keyof 操作符能让你捕获一个类型的键
 * 如，你可以使用它来捕获变量的键名称，在通过使用 typeof 来获取类型之后：
 */
interface Person {
    name: string;
    age: number;
}

// 首先是 keyof T， 索引类型查询操作符。 对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合
let personProps: keyof Person; // 'name' | 'age'
personProps = 'name';

// keyof Person是完全可以与 'name' | 'age'互相替换的。 不同的是如果你添加了其它的属性到 Person，
// 例如 address: string，那么 keyof Person会自动变为 'name' | 'age' | 'address'。

/** 
 * typeof 和 keyof相结合
 */
const colors = {
    red: 'red',
    blue: 'blue'
};
type Colors = keyof typeof colors; // color 的类型是 'red' | 'blue'
let color: Colors; 
color = 'red';

/** 
 * 动态的 JSON 类型指定
 * 如果我们有一个JSON结构，而它的key是动态的，那么我们肯定不能将所有的key都写在代码中，我们只需要简单的指定一个通配符即可
 * 在新的版本中更推荐使用内置函数Record来实现
 * 如果我们想要将一个类型不统一的JSON修改为统一类型的JSON可以使用一下这种方式：
 */
const obj = {
    name: 'Niko',
    age: 18,
    birthday: new Date()
}

const infos: Record<keyof typeof obj, any> = {
    name: 'kisure',
    age: 25,
    birthday: new Date()
}

/** 
 * 获取函数的返回值类型
 * 又比如说我们有一个函数，函数会返回一个JSON，而我们需要这个JSON来作为类型。
 * 那么可以通过ReturnType<>来实现：
 */
function func () {
    return {
      name: 'Niko',
      age: 18
    }
}

type results = ReturnType<typeof func>;
const func_1:results = {
    name: 'kisure',
    age: 25
};

// 或者也可以拼接 keyof 获取所有的 key
type resultKeys = keyof ReturnType<typeof func>;
const func_2:resultKeys = 'name';

// 亦或者可以放在`Object`中作为动态的`key`存在
type infoJson = Record<keyof ReturnType<typeof func>, string>;
const func_3:infoJson = {
    name: 'kiusre',
    age: '25'
};


/** 
 * 关于ts的内置黑科技：https://www.cnblogs.com/jiasm/p/9789962.html
 */