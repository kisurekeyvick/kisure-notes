/**
 * 类型兼容性
 */

/** 
 * 结构化
 * typeScript 对象是一种结构类型，这意味着只要结构匹配，名称也就无关紧要了
 * 这允许你动态创建对象，并且它如果能被推断，该对象仍然具有安全性。
 */
interface Point2D {
    x: number;
    y: number;
}
  
interface Point3D {
    x: number;
    y: number;
    z: number;
}

function iTakePoint2D(point: Point2D) {
    /* do something */
}

const point3D: Point3D = { x: 0, y: 10, z: 20 };

iTakePoint2D(point3D);

/** 
 * 泛型
 */
class List<T> {
    add(val: T) {}
}

class Animal {
    name: string;
}

class Cat extends Animal {
    meow() {}
}

const animals = new List<Animal>();
animals.add(new Animal());
animals.add(new Cat());
/** 
 * 之所以两个都能添加上去，是因为泛型中的T，我们传入的是Animal
 * 而Cat是Animal的子集，也属于Animal
 */

const cats = new List<Cat>();
cats.add(new Cat());
// cats.add(new Animal()); // 添加不成功，因为Animal是Cat类型的，所以Animal不能添加到cats上面去

class Animal_2 {
    constructor(public name: string) {}
}

class Cat_2 extends Animal_2 {
    // constructor(public name: string) {
    //     super(name);
    // }

    meow() {
        console.log('cat');
    }
}

console.log(new Cat_2('kisure'));

