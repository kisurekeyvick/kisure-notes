/** 
 * 泛型
 */
class Queue<T> {
    private data: T[] = [];
    push = (item: T) => this.data.push(item);
    pop = (): T|undefined => this.data.shift();
}

// 使用
const que = new Queue<number>();
que.push(1);
que.push('123');

/** 
 * 关于泛型的博客文：https://www.cnblogs.com/qqandfqr/p/6795292.html
 */
/** 
 * 给identify添加了类型变量T,用来捕获传入值的类型,然后将返回值的类型也设置为T,就实现了传入值和返回值为同一类型值的需求
 * 我们把identify这个函数叫做泛型，因为它适用于所有类型，并且不会有any类型存在的问题
 */
function identity_1<T>(arg: T): T {
    return arg;
}

/** 
 * 使用泛型的方法有两种
 */
// 传入所有的参数，包括类型参数
let output = identity_1<string>('qwe');
// 利用类型推论--即编译器会根据传入的参数自动地帮助我们确定T的类型
let output_2 = identity_1('qwe');

/** 
 * 泛型类型
 * 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样
 * 
    function identify<T>(arg: T): T {
        return arg;
    }

    let myIdentify: <U>(arg: U) => U = identify;


    当然也可以把泛型参数当做一个接口的参数，这样就可以知道这个接口具体用的是那种类型
    例如：
        interface GenericIdnetify<T>{
            (arg: T): T;
        }

        function identity<T>(arg: T): T{
            return arg;
        }

        let myGenericidentify: GenericIdnetify<string> = identity;
 */

/** 
 * 泛型类
 * 泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。
 */
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();

myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;

/** 
 * 泛型约束
 * 在前面的泛型变量中遇到了一个问题，就是在泛型中调用参数的length时，
 * 如果参数没有Length属性会报错，而使用泛型约束，就是只有满足一定的条件才可以使用这个泛型
 */
// 我们定义一个接口来描述约束条件。 
// 创建一个包含 .length属性的接口，使用这个接口和extends关键字还实现约束
interface lengthwise{
    length: number;
}

function identity_kisure<T extends lengthwise>(arg: T): T{
    console.log(arg.length);
    return arg;
}

identity_kisure('abc');
identity_kisure(123);   // 报错，因为该参数没有length属性，就报错