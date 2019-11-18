/**
 * TypeScript真香系列——接口篇
 */

/** 
 * (1) 接口的继承
 * 一个 interface 可以同时继承多个 interface ，实现多个接口成员的合并。用逗号隔开要继承的接口。
 */
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

/** 
 * 注意：
 * 需要注意的是，尽管支持继承多个接口，但是如果继承的接口中，定义的同名属性的类型不同的话，是不能编译通过的。
 */
interface Shape_1 {
    color: string;
    test: number;
}

// 这边会报错，因为Shape_1中的test是number类型，而此处是string类型
interface PenStroke_1 extends Shape_1{
    penWidth: number;
    test: string;
}

/**
 * (2) interface和type的区别
 */
/**
 * (2.1) type 可以而 interface 不行
 * type 可以声明基本类型别名，联合类型，元组等类型
 */
// 基本类型别名
 type Name = string;

// 联合类型
interface Dog {
    wong();
} 

interface Cat {
    miao();
}

type Pet = Dog | Cat;

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet];

/** 
 * (2.2) type 语句中还可以使用 typeof 获取实例的 类型进行赋值
 */
const div = document.createElement('div');
type divEle = typeof div;

/** 
 * (2.3) type 其他骚操作
 */
type StringOrNumber = string | number;
type Text = string | { text: string };
type NameLookup = Dictionary<string, Person>;
type Callback<T> = (data: T) => void;
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };


/** 
 * (3) interface 可以而 type 不行
 * 
 * interface 能够声明合并
 */
interface User {
    name: string
    age: number
  }
  
  interface User {
    sex: string
  }

/*
    User 接口为 {
        name: string
        age: number
        sex: string
    }
*/
