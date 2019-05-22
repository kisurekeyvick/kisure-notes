/**
 * 控制对象的访问
 */
const shogun = {
    name: "Yoshiaki",
    clan: "Ashikaga",
    /** 当访问fullTitle属性时调用get方法计算该属性值，并连接name与clan属性的值。 */
    get fullTitle() {
        return this.name + " " + this.clan;
    },
    /** 设置 fullTitle属性值时修改属性值的构成属性的属性值。 */
    set fullTitle(value) {
        const segments = value.split(" ");
        this.name = segments[0];
        this.clan = segments[1];
    }
};

/**
 * js不支持数组负索引，但是我们可以使用代理进行模拟
 */
function createNegativeArrayProxy(array) {
    if (!Array.isArray(array)) {
        throw new TypeError('Expected an array');
    }

    return new Proxy(array, {
        get: (target, index) => {
            index = +index;
            return target[index < 0 ? target.length + index : index];
        },
        set: (target, index, val) => {
            index = +index;
            return target[index < 0 ? target.length + index : index] = val;
        }
    });
};

const ninjas = ["Yoshi", "Kuma", "Hattori"];
const proxiedNinjas = createNegativeArrayProxy(ninjas);
console.log('负索引：', proxiedNinjas[-1]);

/** 
 * 总结：
 * (1) 使用访问器方法（getter和setter），我们可以对对象属性的访问进行控制。
 *      I: 通过内置的Object.defineProperty方法定义访问属性，或在对象字面量中使用get和set语法或ES6的class。
 *      II：当读取对象属性时会隐式调用get方法，当写入对象属性时隐式调用set方法。
 *      III: 使用getter方法可以定义计算属性，在每次读取对象属性时计算属性值；同理，setter方法可用于实现数据验证与日志记录
 * 
 * (2) 代理是JavaScript ES6 中引入的，可用于控制对象。
 *      代理可以定制对象交互时行为（例如，当读取属性或调用方法时）。
 *      所有的交互行为都必须通过代理，指定的行为发生时会调用代理方法。
 * 
 * (3) 代理效率不高，所以在需要执行多次的代码中需要谨慎使用。
 *      建议进行性能测试。
 */


/** 
 * 处理集合
 * 数组
 * (1) 手动修改数组的length属性为更小数值，将会删除多余的元素
 * (2) 对超出数组边界的索引写入元素将扩充数组：ninjasr[4] => 于是数组变成：["Kuma", "Hattori", "Yagyu", 'undefinded']
 */
const ninjasr = ["Kuma", "Hattori", "Yagyu"];
ninjasr[4] = 'kisure';
console.log(ninjasr);   // ["Kuma", "Hattori", "Yagyu", undefined, "kisure"]

/**
 * 代码模块化
 * 
 * (1)ES6之前，使用闭包，对象和立即执行函数
 *      例如：MouseCounterModule
 * (2)ES6使用 export import
 */
const MouseCounterModule = function() { 
    // 创建一个全局模块变量，赋值为立即实行函数的执行结果
    let numClicks = 0; // 创建模块私有变量
    const handleClick = () => {
        alert(++numClicks);
    };// 创建模块私有函数
    return {
        countClicks: () => {
            document.addEventListener("click", handleClick);
        } // 返回一个对象，代表模块的接口。通过闭包，可以访问模块私有变量和方法
    };
}();

