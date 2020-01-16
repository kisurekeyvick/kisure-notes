/** 
 * https://mp.weixin.qq.com/s/7uOFssj9FXInuZN-4HVqTg
 * 
 * 深入浅出 JavaScript 模块化
 */

/** 
 * 随着项目复杂度的增加，开发者必然需要模拟类的功能，来隔离、封装、组织复杂的 JavaScript 代码，而这种封装和隔离，也被被我们称之为模块化。
 * 
 * CommonJS 是 JavaScript 的一个模块化规范，主要用于服务端Nodejs 中，当然，通过转换打包，也可以运行在浏览器端。
 * 
 * 根据规范，每一个文件既是一个模块，其内部定义的变量是属于这个模块的，不会污染全局变量。
 * 
 * CommonJS 的核心思想是通过 require 方法来同步加载所依赖的模块，然后通过 exports 或者 module.exprots 来导出对外暴露的接口。
 */ 

/** 
 * 模块定义
 * 
 * CommonJS 的规范说明，一个单独的文件就是一个模块，也就是一个单独的作用域。并且模块只有一个出口，module.exports/exports.xxx
 */
// 案例：lib/math.js
const NAME='Kisure';
module.exports.author = NAME;
module.exports.add = (a,b)=> a+b;

/** 
 * 加载模块
 * 
 * 加载模块使用 require 方法，该方法读取文件并且执行，返回文件中 module.exports 对象
 */
// main.js
const mathLib = require('./lib/math');
console.log(mathLib.author);
console.log(mathLib.add(1,2));


/** 
 * 在浏览器中使用 CommonJS
 * 
 * 浏览器不支持 CommonJS 规范，因为其根本没有 module、exports、require 等变量，如果要使用，则必须转换格式。
 * 
 * Browserify是目前最常用的CommonJS格式转换的工具,我们可以通过安装browserify来对其进行转换.但是我们仍然需要注意，
 * 由于 CommonJS 的规范是阻塞式加载，并且模块文件存放在服务器端，可能会出现假死的等待状态
 */
/** 
 * 步骤：
 *      (1) npm i browserify -g
 *      (2) browserify main.js -o js/bundle/main.js
 *      (3) 然后在 HTML 中引入使用即可
 */
/** 
 * 特点：
 *      (1) 以文件为一个单元模块，代码运行在模块作用域内，不会污染全局变量
 *      (2) 同步加载模块，在服务端直接读取本地磁盘没问题，不太适用于浏览器
 *      (3) 模块可以加载多次，但是只会在第一次加载时运行，然后在加载，就是读取的缓存文件。需清理缓存后才可再次读取文件内容
 *      (4) 模块加载的顺序，按照其在代码中出现的顺序
 */
// 补充知识点
/**
 * 其实在 nodejs 中模块的实现并非完全按照 CommonJS 的规范来的，而是进行了取舍。
 * Node 中，一个文件是一个模块->module
 */
// 源码定义如下：
function Module(id = '', parent) {
    this.id = id;
    this.path = path.dirname(id);
    this.exports = {};
    this.parent = parent;
    updateChildren(parent, this, false);
    this.filename = null;
    this.loaded = false;
    this.children = [];
}
//实例化一个模块
varmodule = new Module(filename, parent);

// CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。
/**
    {
        id: '...',
        exports: { ... },
        loaded: true,
        ...
    }
 */

/** 
 * 上面代码就是 Node 内部加载模块后生成的一个对象。该对象的id属性是模块名，exports属性是模块输出的各个接口，
 * loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。其他还有很多属性，这里都省略不介绍了。
 * 
 * 以后需要用到这个模块的时候，就会到exports属性上面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。
 * 也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。 
 */

/** 
 * AMD 异步模块定义
 * 
 * 也就是解决我们上面说的 CommonJS 在浏览器端致命的问题：假死。
 * 
 * CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是异步加载模块，允许指定回调函数。
 * 由于其并非原生 js 所支持的那种写法。所以使用 AMD 规范开发的时候就需要大名鼎鼎的函数库 require.js 的支持了。
 * 
 * require.js 主要解决两个问题：
 *      异步加载模块
 *      模块之间依赖模糊
 */ 
/** 
 * 定义模块
 * 
 * define(id,[dependence],callback)
 *      id,一个可选参数，说白了就是给模块取个名字，但是却是模块的唯一标识。如果没有提供则取脚本的文件名
 *      dependence，以来的模块数组
 *      callback，工厂方法，模块初始化的一些操作。如果是函数，应该只被执行一次。如果是对象，则为模块的输出值
 */
/** 
 * 使用模块
 * 
 * require([moduleName],callback);
 *      moduleName,模块数组名
 *      callback，即为依赖模块加载成功之后执行的回调函数（前端异步的通用解决方案）
 */
/** 
 * data-main
 * 
 * <script src="scripts/require.js" data-main="scripts/app.js"></script>
 * 
 * data-main 指定入口文件，比如这里指定 scripts 下的 app.js 文件，那么只有直接或者间接与app.js有依赖关系的模块才会被插入到html中。
 */

/** 
 * require.config
 * 
 * 通过这个函数可以对requirejs进行灵活的配置，其参数为一个配置对象，配置项及含义如下:
 *      （1） baseUrl——用于加载模块的根路径
 *      （2） paths——用于映射不存在根路径下面的模块路径。
 *      （3） shims——配置在脚本/模块外面并没有使用RequireJS的函数依赖并且初始化函数。
 *              假设underscore并没有使用 RequireJS定义，但是你还是想通过RequireJS来使用它，
 *              那么你就需要在配置中把它定义为一个shim。
 *      （4） deps——加载依赖关系数组
 */
require.config({
    //默认情况下从这个文件开始拉去取资源
    baseUrl:'scripts/app',
    //如果你的依赖模块以pb头，会从scripts/pb加载模块。
    paths:{
        pb:'../pb'
    },
    // load backbone as a shim，所谓就是将没有采用requirejs方式定义
    //模块的东西转变为requirejs模块
    shim:{
        'backbone':{
            deps:['underscore'],
            exports:'Backbone'
        }
    }
});

// 定义模块
// user.js文件
// 定义没有依赖的模块
define(function() {
    let author = 'Nealyang'
    function getAuthor() {
        return author.toUpperCase()
    }
    return { getAuthor } // 暴露模块
});


//article.js文件
// 定义有依赖的模块
define(['user'], function(user) {
    let name = 'THE LAST TIME'
    function consoleMsg() {
        console.log(`${name} by ${user.getAuthor()}`);
    }
    // 暴露模块
    return { consoleMsg }
});

// main.js
(function() {
    require.config({
        baseUrl: 'js/', //基本路径 出发点在根目录下
        paths: {
            //映射: 模块标识名: 路径
            article: './modules/article', //此处不能写成article.js,会报错
            user: './modules/user'
        }
    });

    require(['article'], function(alerter) {
        article.consoleMsg()
    });
})()

/**
    // index.html文件
    <!DOCTYPE html>
    <html>
    <head>
        <title>Modular Demo</title>
    </head>
    <body>
        <!-- 引入require.js并指定js主文件的入口 -->
        <script data-main="js/main" src="js/libs/require.js"></script>
    </body>
    </html>
 */

// 如果我们需要引入第三方库，则需要在 main.js 文件中引入
(function() {
    require.config({
        baseUrl: 'js/',
        paths: {
            article: './modules/article',
            user: './modules/user',
            // 第三方库模块
            jquery: './libs/jquery-1.10.1'//注意：写成jQuery会报错
        }
    });

    require(['article'], function(article) {
        article.consoleMsg();
    });
})();

/*
    特点:
        异步加载模块，不会造成因网络问题而出现的假死装填
        显式地列出其依赖关系，并以函数(定义此模块的那个函数)参数的形式将这些依赖进行注入
        在模块开始时，加载所有所需依赖
*/

/** 
 * CMD
 * 
 * js 的函数为 sea.js,它和 AMD 其实非常的相似，文件即为模块，但是其最主要的区别是实现了按需加载。
 * 推崇依赖就近的原则，模块延迟执行，而 AMD 所依赖模块式提前执行（requireJS 2.0 后也改为了延迟执行）
 */
//AMD
define(['./a','./b'], function (a, b) {
    //依赖一开始就写好
    a.test();
    b.test();
});
 
//CMD
define(function (requie, exports, module) {
    //依赖可以就近书写
    var a = require('./a');
    a.test();
    
    //按需加载
    if (status) {
      var b = requie('./b');
      b.test();
    }
});

/** 
 * SeaJS 只是实现 JavaScript的模块化和按需加载，并未扩展 JavaScript 语言本身。
 * SeaJS 的主要目的是让开发人员更加专注于代码本身，从繁重的 JavaScript 文件以及对象依赖处理中解放出来。
 */
// 在 hello.html 页尾，通过 script 引入 sea.js 后，有一段配置代码
// seajs 的简单配置
seajs.config({
    base: "../sea-modules/",
    alias: {
      "jquery": "jquery/jquery/1.10.1/jquery.js"
    }
});
  
  // 加载入口模块
seajs.use("../static/hello/src/main");

// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    // 通过 require 引入依赖
    var $ = require('jquery');
    var Spinning = require('./spinning');
  
    // 通过 exports 对外提供接口
    exports.doSomething = {
        //...
    }
  
    // 或者通过 module.exports 提供整个接口
    module.exports = {
        //...
    }
});


/** 
 * ES6
 * 
 * 在ES6中，我们可以使用 import 关键字引入模块，通过 export 关键字导出模块，功能较之于前几个方案更为强大
 * ES6 的模块化汲取了 CommonJS 和AMD 的优点，拥有简洁的语法和异步的支持。并且写法也和 CommonJS 非常的相似
 */

/** 
 * 与 CommonJS 的差异
 * 
 * (1) CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
 * (2) CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
 */

/** 
 * 值拷贝&值引用
 */
// lib/counter.js

var counter = 1;

function increment() {
  counter++;
}

function decrement() {
  counter--;
}

module.exports = {
  counter: counter,
  increment: increment,
  decrement: decrement
};


// src/main.js

var counter = require('../../lib/counter');

counter.increment();
console.log(counter.counter); // 1

/** 
 * 在 main.js 当中的实例是和原本模块完全不相干的。
 * 这也就解释了为什么调用了 counter.increment() 之后仍然返回1。
 * 因为我们引入的 counter 变量和模块里的是两个不同的实例。
 * 
 * 所以调用 counter.increment() 方法只会改变模块中的 counter .想要修改引入的 counter 只有手动一下:
 * counter.counter++;
 * console.log(counter.counter); // 2
 */


/**
 * 而通过 import 语句，可以引入实时只读的模块:
 */
// lib/counter.js
exportlet counter = 1;

exportfunction increment() {
  counter++;
}

exportfunction decrement() {
  counter--;
}


// src/main.js
import * as counter from'../../counter';

console.log(counter.counter); // 1
counter.increment();
console.log(counter.counter); // 2

/** 
 * 加载 & 编译
 * 
 * 因为 CommonJS 加载的是一个对象（module.exports），对象只有在有脚本运行的时候才能生成。
 * 而 ES6 模块不是一个对象，只是一个静态的定义。在代码解析阶段就会生成。
 * 
 * S6 模块是编译时输出接口，因此有如下2个特点：
 *      (1) import 命令会被 JS 引擎静态分析，优先于模块内的其他内容执行
 *      (2) export 命令会有变量声明提升的效果,所以import 和 export 命令在模块中的位置并不影响程序的输出。
 */

/** 重点！！！ */
// a.js
console.log('a.js')
import { foo } from'./b';

// b.js
exportlet foo = 1;
console.log('b.js 先执行');

// 执行结果:
// b.js 先执行
// a.js 


// a.js
import { foo } from'./b';
console.log('a.js');
exportconst bar = 1;
exportconst bar2 = () => {
  console.log('bar2');
}
exportfunction bar3() {
  console.log('bar3');
}

// b.js
exportlet foo = 1;
import * as a from'./a';
console.log(a);

// 执行结果:
// { bar: undefined, bar2: undefined, bar3: [Function: bar3] }
// a.js
