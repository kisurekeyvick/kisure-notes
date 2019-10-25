/**
 * https://juejin.im/post/5dacf37ef265da5b926bdc9a
 * 
 * 
 */

/** 
 * (1) 偶然创建的全局变量
 * 
 * 在下面的代码中 typeof a 和 typeof b 结果各自是什么？
 */
function foo() {
    let a = b = 0;
    a++;
    return a;
}

foo();
typeof a; // => undefined
typeof b; // => number
/** 
 * 这个代码的重点在第二行:let a = b = 0。这个语句声明了一个局部变量 a，但是它也声明了一个全局变量b。
 * 在 foo() 作用域或全局作用域中都没有声明变量 b。
 * 因此 JS 引荐将b = 0 表达式解释为 window.b = 0。 
 */


/**
 * (2) 数组的 length 属性
 * 
 * clothes[0] 的值是什么？
 */
const clothes = ['jacket', 't-shirt'];
clothes.length = 0;

clothes[0]; // => undefined
/** 
 * 数组对象的 length 属性具有一些特殊的行为：
 * 减少 length 属性的值的副作用是删除 自己的 数组元素，这些元素的数组索引位于新旧长度值之间。
 * 
 * 由于 length 属性行为，当 JS 执行 clothes.length = 0 时，删除所有的 clothes 项。 
 * 所以 clothes[0] 的值为 undefined，因为 clothes 数组已被清空。
 */

/** 
 * (3) 说出下面运行的结果，解释原因。
 */
function test(person) {
    person.age = 26;
    person = {
        name: 'hzj',
        age: 18
    };
    return person;
};

const p1 = {
    name: 'fyq',
    age: 19
};

const p2 = test(p1);
console.log(p1);        // {name: “fyq”, age: 26}
console.log(p2);        // {name: “hzj”, age: 18}

/** 
 * 在函数传参的时候传递的是对象在堆中的内存地址值，test函数中的实参person是p1对象的内存地址，
 * 通过调用person.age = 26确实改变了p1的值，
 * 
 * 随后person变成了另一块内存空间的地址，并且在最后将这另外一份内存空间的地址返回，赋给了p2。
 */

/** 
 * (4) null是对象吗？为什么？
 * 
 * - null不是对象
 * - 虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，
 * 为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。
 */

/** 
 * (5) '1'.toString()为什么可以调用？
 */
// 这个语句运行的过程中做了这样几件事情
var s = new String('1');    // 创建string类实例
s.toString();               // 调用实例方法
s = null;                   // 执行完方法立即销毁这个实例

/** 
 * (6) 0.1+0.2为什么不等于0.3？
 */
/** 
 * 0.1和0.2在转换成二进制后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现了精度的损失。
 * 相加后因浮点数小数位的限制而截断的二进制数字在转换为十进制就会变成0.30000000000000004
 */

/** 
 * (7) typeof 是否能正确判断类型？
 * 
 * 对于原始类型来说，除了 null 都可以调用typeof显示正确的类型。
 */
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'

// 但对于引用数据类型，除了函数之外，都会显示"object"。
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'

/** 
 * 因此采用typeof判断对象数据类型是不合适的，采用instanceof会更好，
 * instanceof的原理是基于原型链的查询，只要处于原型链中，判断永远为true
 */

const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str1 = 'hello world'
str1 instanceof String // false

var str2 = new String('hello world')
str2 instanceof String // true

/** 
 * (8) 手动实现一下instanceof的功能？
 */
function myInstanceof(left, right) {
    // 基本数据类型直接返回false
    if (typeof left !== 'object' || left === null) {
        return false;
    }

    // getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true) {
        //查找到尽头，还没找到
        if(proto == null) return false;
        //找到相同的原型对象
        if(proto == right.prototype) return true;
        proto = Object.getPrototypeof(proto);
    }
}

/** 
 * (9) Object.is和===的区别？
 * 
 * Object在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0和-0，NaN和NaN。
 */
function is(x, y) {
    if (x === y) {
        //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
        return x !== 0 || y !== 0 || 1/x === 1/y;
    } else {
        // NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
        // 两个都是NaN的时候返回true
        return x !== x && y !== y;
    }
}

/** 
 * (10) [] == ![]结果是什么？为什么？
 * 
 * == 中，左右两边都需要转换为数字然后进行比较。
 * []转换为数字为0
 * ![] 首先是转换为布尔值，由于[]作为一个引用类型转换为布尔值为true
 * 因此![]为false，进而在转换成数字，变为0
 * 0 == 0，结果为true
 */

/** 
 * (11) JS中类型转换有哪几种？
 * 
 * JS中，类型转换只有三种：
 * - 转换成数字
 * - 转换成布尔值
 * - 转换成字符串
 * 
 * 原始值                       转化目标                结果
 * number                       布尔值                  除了0,-0,NaN都为true
 * string                       布尔值                  除了空串都为true
 * undefined, null              布尔值                  false
 * 引用类型                      布尔值                  true
 * number                       字符串                  5 => '5'
 * boolean, function, symbol    字符串                  'true'
 * 数组                         字符串                  [1,2] => '[1,2]'
 * 对象                         字符串                  '[object, object]'
 * string                       数字                    '1'=>1, 'a'=>NaN
 * 数组                          数字                   空数组为0，存在一个元素且为数字转数字
 * null                         数字                    0
 * 除了数组的引用类型             数字                    NaN
 * symbol                       数字                    抛错
 */

/** 
 * (12) == 和 ===有什么区别？
 * 
 * ===叫做严格相等，是指：左右两边不仅值要相等，类型也要相等，
 * 例如'1'===1的结果是false，因为一边是string，另一边是number。
 * 
 * ==不像===那样严格，对于一般情况，只要值相等，就返回true，
 * 但==还涉及一些类型转换，它的转换规则如下：
 * - 两边的类型是否相同，相同的话就比较值的大小，例如1==2，返回false
 * - 判断的是否是null和undefined，是的话就返回true
 * - 判断的类型是否是String和Number，是的话，把String类型转换成Number，再进行比较
 * - 判断其中一方是否是Boolean，是的话就把Boolean转换成Number，再进行比较
 * - 如果其中一方为Object，且另一方为String、Number或者Symbol，会将Object转换成字符串，再进行比较
 */

/** 
 * (13) 对象转原始类型是根据什么流程运行的？
 * 
 * 对象转原始类型，会调用内置的[ToPrimitive]函数，对于该函数而言，其逻辑如下：
 * - 调用valueOf()，如果转换为原始类型，则返回
 * - 调用toString()，如果转换为原始类型，则返回
 * - 如果Symbol.toPrimitive()方法，优先调用再返回
 * - 如果都没有返回原始类型，会报错
 */
var obj = {
    value: 3,
    valueOf() {
      return 4;
    },
    toString() {
      return '5'
    },
    [Symbol.toPrimitive]() {
      return 6
    }
};
console.log(obj + 1); // 输出7

/** 
 * (14) 如何让if(a == 1 && a == 2)条件成立？
 */
const a = {
    value: 0,
    valueOf: function() {
        console.log('这是叠加前的数据：', this.value);
        this.value++;
        console.log('这是叠加后的数据：', this.value);
        return this.value;
    }
};

/** 
 * (15) DOM事件模型
 * 
 * DOM里监听函数的this指向哪里?
 * 
 * <button id="btn">点击</button>
 */
const btn = document.getElementById('btn');
btn.addEventListener('click', function(e) {
    console.log(this.id);
}, false);
// this指向的是触发事件的那个元素节点

/** 
 * (16) 鼠标里的双击事件是什么，鼠标按下右键触发什么事件？
 * 
 * dblclick：在同一个元素上双击鼠标时触发
 * contextmenu：按下鼠标右键时（上下文菜单出现前）触发，或者按下“上下文菜单键”时触发。
 * 
 * document.addeventlistener('contextmenu', function() {});
 */

/** 
 * https://juejin.im/post/5d8acce86fb9a04dfa0956d0#heading-18
 * (17) 鼠标事件里clientX, screenX, offsetX有什么区别？
 * 
 * MouseEvent.clientX   属性返回鼠标位置相对于浏览器窗口左上角的水平坐标（单位像素）
 * MouseEvent.screenX   属性返回鼠标位置相对于屏幕左上角的水平坐标（单位像素）
 * MouseEvent.offsetX   属性返回鼠标位置与目标节点左侧的padding边缘的水平距离（单位像素）
 */

/** 
 * (18) 如何知道用户是否按下了大写键？
 * 
 * MouseEvent.getModifierState方法返回一个布尔值，表示有没有按下特定的功能键。
 * 它的参数是一个表示功能键的字符串。
 */
document.addEventListener('click', function(e) {
    console.log(e.getModifierState('CapsLock'));
});

/**
 * (19) 什么是Touchlist？
 * 
 * - 由Touch对象构成的数组，通过event.touches取到。
 * - 一个Touch对象代表一个触点，当有多个手指触摸屏幕时，TouchList就会存储多个Touch对象。
 */

/** 
 * (20) touch事件里TouchEvent.touches和TouchEvent.changedTouches的区别是什么？
 * 
 * - changedTouches也是一个 TouchList 对象，对于touchstart 事件, 
 *      这个 TouchList 对象列出在此次事件中新增加的触点。
 * - 对于touchmove事件，列出和上一次事件相比较，发生了变化的触点。
 *      对于touchend, 列出离开触摸平面的触点（这些触点对应已经不接触触摸平面的手指）
 * 
 * 
 */

/** 
 * (21) 绑定在拖拽目标的事件和绑定在放置目标的事件分别有哪些？
 * 
 * - 绑定在拖拽目标
 * 事件名               描述
 * dragstart            当用户开始拖拽一个元素或者一个文本选取区块的时触发
 * drag                 当用户正在拖拽一个元素或者一个文本选取区块的时触发
 * dragend              当用户结束拖拽一个元素或者一个文本选取区块的时触发。（如放开鼠标按键或按下键盘的 escap 键）
 * 
 * - 绑定在放置目标
 * 事件名               描述
 * dragenter            当用户开始拖拽一个元素或者一个文本选取区块的时触发
 * dragover             当用户正在拖拽一个元素或者一个文本选取区块的时触发
 * dragleave            当用户结束拖拽一个元素或者一个文本选取区块的时触发。
 *                         （如放开鼠标按键或按下键盘的 escap 键）
 * drop                 当一个元素或文字选取区块被放置至一个有效的放置目标时触发。
 */

/** 
 * (22) 将文件从操作系统拉进浏览器，会触发dragstart和dragend事件吗？
 * 不会
 */

/**
 * (23) 在进行拖放时，每个event对象中都有DataTransfer对象来保存被拖动的数据，
 *      请问，DataTranfer中dropEffect属性和effectAllowed属性的区别？
 * 
 * - DataTransfer.dropEffect属性用来设置放下（drop）被拖拉节点时的效果，
 *      会影响到拖拉经过相关区域时鼠标的形状
        target.addEventListener('dragover', function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = 'copy';
        });
 * 
 * - DataTransfer.effectAllowed属性设置本次拖拉中允许的效果
        source.addEventListener('dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'move';
        });

        target.addEventListener('dragover', function (e) {
            e.dataTransfer.dropEffect = 'move';
        });

   - 如何利用dataTransfer对象传递数据？
        主要是用到DataTransfer.setData()和DataTransfer.getData()方法：

        document.addEventListener('dragstart', function (event) {
            // 被拖拉节点的背景色变透明
            event.dataTransfer.setData('data',this.nodeName);
        }, false);

        document.addEventListener('drop', function( event ) {
            // 防止事件默认行为（比如某些元素节点上可以打开链接），
            event.preventDefault();
            console.log(event.dataTransfer.getData('data'));
        }, false);
 */

/** 
 * (24) 浏览器加载脚本和渲染相关问题？
 * 
 * - 请简要说一下浏览器加载js脚本的原理？
 *      浏览器一边下载 HTML网页，一边开始解析。也就是说，不等到下载完，就开始解析。
 *      解析过程中，浏览器发现<script>元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
 *      如果<script>元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
 *      JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。
 * 
 * - 为什么加载外部脚本时，浏览器会暂停页面渲染？
 *      原因是 JavaScript 代码可以修改 DOM，所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题
 * 
 * - 从以上js脚本加载原理来看，为什么js脚本最好放在页面底部？
 *      如果外部脚本加载时间很长（一直无法完成下载），那么浏览器就会一直等待脚本下载完成，
 *          造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。
 * 
 *      为了避免这种情况，较好的做法是<script>标签都放在页面底部
 * 
 * - 加载css会阻塞DOM的解析吗？加载css会阻塞DOM的渲染吗？
 *      css的加载和解析不会阻塞html的解析，但会阻塞渲染。
 * 
 * - 不同的浏览器有哪些知名的渲染引擎？渲染引擎的渲染流程是什么？
 *      渲染引擎处理网页，通常分成四个阶段:
 *      (1)解析代码：HTML 代码解析为 DOM，CSS 代码解析为CSSOM（CSS Object Model）。
 *      (2)对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）。
 *      (3)布局：计算出渲染树的布局（layout）。
 *      (4)绘制：将渲染树绘制到屏幕。
 * 
 *      以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。
 *          所以，会看到这种情况：网页的 HTML 代码还没下载完，但浏览器已经显示出内容了。
 * 
 * - 浏览器渲染中发生的回流和重绘是什么？
 *      渲染树转换为网页布局，称为布局流（flow）；布局显示到页面的这个过程，称为绘制（paint）。
 *      它们都具有阻塞效应，并且会耗费很多时间和计算资源。
 * 
 *      页面生成以后，脚本操作和样式表操作，都会触发回流（reflow）和重绘（repaint）。
 *          用户的互动也会触发重流和重绘，比如设置了鼠标悬停（a:hover）效果、页面滚动、在输入框中输入文本、改变窗口大小等等。
 * 
 *      回流和重绘并不一定一起发生，回流必然导致重绘，重绘不一定需要回流。
 *          比如改变元素颜色，只会导致重绘，而不会导致重流；改变元素的布局，则会导致重绘和重流。
 * 
 * - 浏览器解析js的大概过程？
 *      (1)读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）
 *      (2)对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）
 *      (3)使用“翻译器”（translator），将代码转为字节码（bytecode）
 *      (4)使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。
 * 
 *      逐行解释将字节码转为机器码，是很低效的。为了提高运行速度，现代浏览器改为采用“即时编译”。
 *      即字节码只在运行时编译，用到哪一行就编译哪一行，并且把编译结果缓存。
 *      通常，一个程序被经常用到的，只是其中一小部分代码，有了缓存的编译结果，整个程序的运行速度就会显著提升。
 */

/** 
 * (25) cookie的数量和大小限制是多少？
 * 
 * 不同浏览器对 Cookie 数量和大小的限制，是不一样的。一般来说，单个域名设置的 Cookie 不应超过30个，
 * 每个 Cookie 的大小不能超过4KB。超过限制以后，Cookie 将被忽略，不会被设置 。
 */

/** 
 * (26) 什么情况下，两个网址能共享cookie？
 * 
 * 浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享 Cookie。
 * 注意，这里不要求协议相同。也就是说，example.com 设置的 Cookie，可以被https://example.com读取。
 */

/** 
 * (27) 设置cookie里的Expires，Max-Age字段的区别是什么？
 * 
 * - Expires属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 Cookie。
 *      它的值是 UTC 格式，可以使用Date.prototype.toUTCString()进行格式转换。
 *      Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
 *      
 * - Max-Age属性:指定从现在开始 Cookie 存在的秒数，比如60 * 60 * 24 * 365（即一年）。
 *      过了这个时间以后，浏览器就不再保留这个 Cookie。
 * 
 * - 如果同时指定了Expires和Max-Age，那么Max-Age的值将优先生效。
 * 
 * - 如果Set-Cookie字段没有指定Expires或Max-Age属性，那么这个 Cookie 就是 Session Cookie，即它只在本次对话存在，
 *      一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie
 */
