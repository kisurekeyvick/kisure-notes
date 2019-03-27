/** 
 * 属性getter 和 setter
 * https://zh.javascript.info/property-accessors
 * 有两种类型的属性：
 * 第一种是数据属性。
 * 第二种类型的属性，它们本质上是获取和设置值的函数，但从外部代码来看像常规属性。
*/

/**
 * 访问器属性由 “getter” 和 “setter” 方法表示。在对象字面量中，它们用 get 和 set 表示
 * fullName是一个虚拟的属性，它是可读写的，但实际上并不存在。
 * 一旦使用 get prop() 或 set prop() 定义了一个属性，它就是一个访问器属性。
 * 所以必须有一个getter来读取它，如果我们对它赋值，它必须是一个 setter。
 */
let obj = {
    name: "John",
    surname: "Smith",
    get fullName() {
        return `${this.name} ${this.surname}`;
    },
    set fullName(value) {
        [this.name, this.surname] = value.split(' ');
    }
};

/**
 * 访问器属性的描述符与数据属性相比是不同的。
    对于访问器属性，没有 value 和 writable，但是有 get 和 set 函数。
    所以访问器描述符可能有：
    get —— 一个没有参数的函数，在读取属性时工作，
    set —— 带有一个参数的函数，当属性被设置时调用，
    enumerable —— 与数据属性相同，
    configurable —— 与数据属性相同。
 */

/**
 * 我们需要注意：属性可以要么是访问器，要么是数据属性，而不能两者都是
 */

/**
 * Getter/setter 可以用作“真实”属性值的包装器，以便对它们进行更多的控制
 */
let user = {
    get name() {
        return this._name;
    },
    set name(value) {
        if (value.length < 4) {
            throw Error('名字太短，请输入4位以上长度的字符');
            return;
        }

        this._name = value;
    }
};
