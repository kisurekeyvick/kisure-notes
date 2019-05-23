/** 
  * 2.1 接口
  */
/** 第一个使用内联注解 */
declare let myPoint1: { x: number; y: number };
myPoint1= {
    x: 1,
    y: 2
};

/** 第二个使用接口 */
interface Point {
  x: number;
  y: number;
}

declare const myPoint2: Point;

/** 
 * 使用接口方式定义类型的好处在于：如果有人创建了一个基于 myPoint 的库来添加新成员, 
 *      他们可以轻松将此成员添加到 myPoint 的现有声明中。
 * 
 * 因为 TypeScript 接口是开放式的，这是 TypeScript 的一个重要原则，它允许你使用接口模仿 JavaScript 的可扩展性。
 */
interface Point {
    x: number,
    y: number
}

declare const myPoint3: Point;

interface Point {
    z: number
}

myPoint3.z

/** 
 * 2.2 类也可以实现接口
 * 如果你希望在类中使用必须遵循的接口（类）或是别人定义的对象结构，可以使用 implements 关键字来确保兼容性。
 * implements 限制了类实例的结构。
 *  类似：let foo: Person = new Me();
 */
interface Person {
    age: number;
    weight: number;
}

class Me implements Person {
    age: number;
    weight: number;
}