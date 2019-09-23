/** 
 * https://www.cnblogs.com/leiting/p/8081413.html
 * 
 * js中的值类型和引用类型的区别
 */

/** 
 * (1) js中的变量类型有哪些？
 *      - 值类型（基本类型）：string, number, boolean, undefined, null, symbol
 *      - 引用类型：object, array, function
 */

/** 
 * (2) 值类型和引用类型的区别
 *      - 值类型：
 *              ① 占用空间固定，保存在栈中（当一个方法执行时，每个方法都会建立自己的内存栈，
 *                  在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。
 *                  因此，所有在方法中定义的变量都是放在栈内存中的；栈中存储的是基础变量以及一些对象的引用变量，
 *                  基础变量的值是存储在栈中，而引用变量存储在栈中的是指向堆中的数组或者对象的地址，
 *                  这就是为何修改引用类型总会影响到其他指向这个地址的引用变量）
 *              ② 保存与复制的是值本身
 *              ③ 使用typeof检测数据的类型
 *              ④ 基本类型数据是值类型
 * 
 *      - 引用类型：
 *              ① 占用空间不固定，保存在堆中
 *              ② 保存与复制的是指向对象的一个指针
 *              ③ 使用instanceof检测数据类型
 *              ④ 使用new()方法构造出的对象是引用型
 */

// 基础数据使用typeof 来区分
typeof undefined // undefined
typeof 'abc' // string
typeof 123 // number
typeof true // boolean
typeof Symbol(1) // symbol
typeof null // object

// 引用类型使用 instanceof来区分，不能使用typeof来区分
typeof {} // object
typeof [] // object
typeof null // objec

['1'] instanceof Array // true;
var a = {'name': '12'}
a instanceof Object    // true

/** 
 * 几方面的区别举例两者之间的区别：
 * (1) 动态的属性
 *      对于引用类型的值，我们可以为其添加属性和方法，也可以改变和删除其属性和方法，
 *      但是，我们不能给基本类型的值添加属性，只能给引用类型值动态地添加属性，以便将来使用
 * 
 *      var person = new Object(); 
 *      person.name = "Nicholas";
 *      alert(person.name); //"Nicholas" 
 * 
 * (2) 复制变量值
 *      如果从一个变量向另一个变量复制基本类型值，会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上。
 * 
 *      var num1 = 5;
 *      var num2 = num1;
 * 
 *      num1保存的值是5，当使用 num1 的值来初始化 num2 时，num2 中也保存了值 5。
 *      但 num2中的 5 与 num1 中的 5 是完全独立的，该值只是 num1 中 5 的一个副本。
 *      此后，这两个变量可以参与任何操作而不会相互影响。
 * 
 * 
 *      当从一个变量向另一个变量复制引用类型的值时，同样也会将存储在变量对象中的值复制一份放到为新变量分配的空间中。
 *      不同的是，这个值的副本实际上是一个指针，而这个指针指向存储在堆中的一个对象。
 *      复制操作结束后，两个变量实际上引用同一个对象。因此，改变其中一个变量，就会影响另外一个变量：例
 *      var obj1 = new Object(); 
 *      var obj2 = obj1; 
 *      obj1.name = "Nicholas";
 *      alert(obj2.name); //"Nicholas"
 */
