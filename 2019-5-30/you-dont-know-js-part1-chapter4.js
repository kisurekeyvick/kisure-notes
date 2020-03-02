/** 
 * 变量的提升
 * 
    a = 2;
    var a;
    console.log( a );

    思想：
    (1) 变量和函数在内的所有声明都会在任何代码被执行前首先被处理。
    
    当你看到 var a = 2; 时，可能会认为这是一个声明。但 JavaScript 实际上会将其看成两个声明：var a; 和 a = 2;
    第一个定义声明是在编译阶段进行的。
    第二个赋值声明会被留在原地等待执行阶段。

    所以，上面的代码会变成：
    var a;
    a = 2;
    console.log( a );

    变量提升的宗旨：只有声明本身会被提升，而赋值或其他运行逻辑会留在原地。
 */

/** 
 * 函数提升
 * 
    foo();

    function foo() {
        console.log( a ); // undefined
        var a = 2;
    }

    foo 函数的声明被提升了，因此第一行中的调用可以正常执行，另外每个作用域都会进行提升操作，也就是说
    foo(..) 函数自身也会在内部对 var a 进行提升

    所以，提升完以后变成如下：

    function foo() {
        var a;
        console.log( a ); // undefined
        a = 2;
    }

    foo();
 */

/** 
 * 可以看到，函数声明会被提升，但是函数表达式却不会被提升。
 * 
    foo(); // 不是 ReferenceError, 而是 TypeError!
    var foo = function bar() {
        // ...
    };

    经过变量提升以后：
    var foo;
    foo();  // TypeError
    foo = function() {
        //
    }
 */

/** 
 * 函数优先
 * 
    函数声明和变量声明都会被提升。但是一个值得注意的细节（这个细节可以出现在有多个
    “重复”声明的代码中）是函数会首先被提升，然后才是变量。

    foo(); // 1

    var foo;

    function foo() {
        console.log( 1 );
    }

    foo = function() {
        console.log( 2 );
    };

    经过变量提升：

    function foo() {
        console.log( 1 );
    }

    foo(); // 1

    foo = function() {
        console.log( 2 );
    };

    这里需要注意的是：var foo 尽管出现在 function foo()... 的声明之前，但它是重复的声明（因此被忽
        略了），因为函数声明会被提升到普通变量之前。
 */