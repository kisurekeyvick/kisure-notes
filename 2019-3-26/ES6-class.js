/**
 * 类继承和super
 * https://zh.javascript.info/class-inheritance
 * 
 * (1) extend关键字实际上是给Rabbit.prototype添加了一个属性[[prototype]]
 *      并且它会指向Animal.prototype
 * (2) 我们也可以在子类中重写父类的方法。
 * (3) 但是通常来说，我们不希望完全替换父类的方法，而是希望基于它做一些调整或者扩展。
 *     类提供了 "super" 关键字：
 *     执行 super.method(...) 来调用一个父类的方法。
 *     执行 super(...) 调用父类的构造函数 (只能在子类的构造函数中执行)。
 */
class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }

    run(speed) {
        this.speed += speed;
        alert(`${this.name} runs with speed ${this.speed}.`);
    }

    stop() {
        this.speed = 0;
        alert(`${this.name} stopped.`);
    }
}
  
// 从 Animal 继承
class Rabbit extends Animal {
    hide() {
        alert(`${this.name} hides!`);
    }

    stop() {
        super.stop(); // 调用父类的 stop 函数
        this.hide(); // 并且在那之后隐藏
    }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // 白色兔子会以速度 5 奔跑。
rabbit.hide(); // 白色兔子藏了起来！

/**
 * 为什么继承类的构造函数必须要调用super(...)，并且一定要在使用this之前调用？
 * 
 *  当一个普通构造函数执行时，它会创建一个空对象作为 this 并继续执行。
    但是当派生的构造函数执行时，它并不会做这件事。它期望父类的构造函数来完成这项工作。
 */
