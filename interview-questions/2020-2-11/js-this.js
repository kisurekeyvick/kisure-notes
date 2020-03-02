/**
 * https://mp.weixin.qq.com/s/k3jOyIeJKLGrA5zzx1_gIQ
 * 
 * 理解Javascript中的this
 */
/** 
 * JavaScript中的this格外的不一样，比如Java语言中的this是在代码的执行阶段是不可更改，而JavaScript的this是在调用阶段进行绑定。
 * 但其在严格模式和非严格模式下又有些不一样，在函数的不同调用方式也导致this有些区别。
 */

/** 
 * this的定义
 * 
 * this是在执行上下文创建时确定的一个在执行过程中不可更改的变量
 * 所谓执行上下文，就是JavaScript引擎在执行一段代码之前将代码内部会用到的一些变量、函数、this提前声明然后保存在变量对象中的过程
 * 这个'代码片段'包括：全局代码(script标签内部的代码)、函数内部代码、eval内部代码。
 * 而我们所熟知的作用域链也会在保存在这里，以一个类数组的形式存储在对应函数的[[Scopes]]属性中。
 */

/** 
 * this只在函数调用阶段确定，也就是执行上下文创建的阶段进行赋值，保存在变量对象中。
 * 这个特性也导致了this的多变性:🙂即当函数在不同的调用方式下都可能会导致this的值不同。 
 */
// 严格模式下，this指向undefined!!!
var a = 1;
function fun() {
   'use strict';
    var a = 2;
    return this.a;
}
fun();//😨报错 Cannot read property 'a' of undefined


// 非严格模式下this指向window;

var a = 1;
function fun() {
    var a = 2;
    return this.a;
}
fun();//1

/**
 * 结论：
 * 当函数独立调用的时候，在严格模式下它的this指向undefined，在非严格模式下，当this指向undefined的时候，自动指向全局对象(浏览器中就是window)	
 */


// 在全局环境下，this就是指向自己，再看
 this.a = 1;
 var b = 1;
 c = 1;
 console.log(this === window)//true
 //这三种都能得到想要的结果，全局上下文的变量对象中存在这三个变量


// 当this不在函数中用的时候会怎样
var a = 1000;
var obj = {
    a: 1,
    b: this.a + 1
}

function fun() {
    var obj = {
        a: 1,
        c: this.a + 2 //严格模式下这块报错 Cannot read property 'a' of undefined
    }

    return obj.c;
}

console.log(fun());//1002
console.log(obj.b);//1001

/** 
 * 单独下个结论：
 * 当obj在全局声明的时候，obj内部属性中的this指向全局对象，当obj在一个函数中声明的时候，严格模式下this会指向undefined，非严格模式自动转为指向全局对象
 */


/**
 * this在function中的4种调用方式
 * 
 * 在全局环境或是普通函数中直接调用；
 * 作为对象的方法；
 * 使用apply和call；
 * 作为构造函数；
 */
// (1) 直接调用
var a = 1;
var obj  =  {
    a: 2,
    b: function () {
        function fun() {
            return this.a
        }

        console.log(fun());
    }
} 
obj.b();//1

// fun函数虽然在obj.b方法中定义，但它还是一个普通函数，直接调用在非严格模式下指向undefined，又自动指向了全局对象，正如预料，严格模式会报错undefined.a不成立，a未定义。


/**
 * 重要的事情再说一遍：
 *      当函数独立调用的时候，
 *      在严格模式下它的this指向undefined，
 *      在非严格模式下，当this指向undefined的时候，自动指向全局对象(浏览器中就是window)
 */


// (2) 作为对象的方法
var a = 1;
var obj = {
    a: 2,
    b: function() {
        return this.a;
    }
}
console.log(obj.b())//2

var a = 1;
var obj = {
    a: 2,
    b: function() {
        return this.a;
    }
}
var t = obj.b;
console.log(t());//1
/** t()运行以后，值为1，这是为什么？
 * 
 * 涉及Javascript的内存空间了，就是说，obj对象的b属性存储的是对该匿名函数的一个引用，可以理解为一个指针。
 * 当赋值给t的时候，并没有单独开辟内存空间存储新的函数，而是让t存储了一个指针，该指针指向这个函数。相当于执行了这么一段伪代码：
 */
var a = 1;
function fun() {//此函数存储在堆中
    return this.a;
}
var obj = {
    a: 2,
    b: fun //b指向fun函数
}
var t = fun;//变量t指向fun函数
console.log(t());//1

// 此时的t就是一个指向fun函数的指针，调用t，相当于直接调用fun，套用以上规则，打印出来1自然很好理解了。


/** 
 * (3) 使用apply,call
 */
function fun() {
    return this.a;
}
fun();//1
//严格模式
fun.call(undefined)
//非严格模式
fun.call(window);
/** 
 * 在非严格模式下，当调用fun.call(undefined)的时候打印出来的依旧是1
 * 这就可以解释了，为啥说在非严格模式下，当函数this指向undefined的时候，会自动指向全局对象
 */


/** 
 * (4) 构造函数
 * 
 * 所谓构造函数就是用来new对象的函数，像Function、Object、Array、Date等都是全局定义的构造函数
 * 
 * new做了下面这些事:
 *      - 创建一个临时对象
 *      - 给临时对象绑定原型
 *      - 给临时对象对应属性赋值
 *      - 将临时对象return
 */ 
function Fun() {
    this.name = 'Damonre';
    this.age = 21;
    this.sex = 'man';
    this.run = function () {
      return this.name + '正在跑步';
    }
}
Fun();
console.log(window);


/** 
 * 箭头函数
 */
var a = 1;
var obj = {
    a: 2
};
var fun = () => console.log(this.a);
fun();//1
fun.call(obj)//1

/** 
 * 那么箭头函数的this是怎么确定的呢？
 * 箭头函数会捕获其所在上下文的  this 值，作为自己的 this 值，也就是说箭头函数的this在词法层面就完成了绑定。
 * apply，call方法只是传入参数，却改不了this。
 */


var a = 1;
var obj = {
  a: 2
};
function fun() {
    var a = 3;
  let f = () => console.log(this.a);
    f();
};
fun();//1
fun.call(obj);//2
/** 
 * 如上，fun直接调用，fun的上下文中的this值为window
 * fun的上下文就是此箭头函数所在的上下文，因此此时f的this为fun的this也就是window。
 * 当fun.call(obj)再次调用的时候，新的上下文创建，fun此时的this为obj，也就是箭头函数的this值。
 */


 
function Fun() {
    this.name = 'Damonare';
}
Fun.prototype.say = () => {
    console.log(this);
}
var f = new Fun();
f.say();//window
/** 
 * 此时的箭头函数所在的上下文是__proto__所在的上下文也就是Object函数的上下文，而Object的this值就是全局对象。
 */


function Fun() {
    this.name = 'Damonare';
    this.say = () => {
        console.log(this);
    }
}
var f = new Fun();
f.say();//Fun的实例对象
/** 
 * this.say所在的上下文，此时箭头函数所在的上下文就变成了Fun的上下文环境，
 * 而因为上面说过当函数作为构造函数调用的时候(也就是new的作用)上下文环境的this指向实例对象。
 */
