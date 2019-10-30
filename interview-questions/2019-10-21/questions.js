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

/**
 * (28) 同源指的是什么？
 * 
 * - 协议相同
 * - 域名相同
 * - 端口相同
 */

/** 
 * (29) 哪些行为受到同源策略的限制？
 * 
 * - 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。
 * - 无法接触非同源网页的 DOM。
 * - 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）
 */

 /** 
  * (30) HTML5如何实现窗口间数据通信，请简要介绍一下？
  * 
  * postMessage是html5引入的API,postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,
  * 可以实现跨文本文档,多窗口,跨域消息传递.多用于窗口间数据通信,这也使它成为跨域通信的一种有效的解决方案。
  * 
  * - postMessage跨域通信的案例
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Document</title>
            </head>
            <body>
                <iframe src="http://127.0.0.1:9090/b.html" name="postIframe" onload="messageLoad()"></iframe>
            <script>
                function messageLoad(){
                    var url = "http://127.0.0.1:9090";
                    window.postIframe.postMessage("给我tsort的信息",url); //发送数据
                }

                window.onmessage = function(e){
                    e = e || event;
                    console.log(e.data); //接收b返回的数据，在控制台有两次输出
                }
            </script>
            </body>
        </html>
  * 
  * 
  * - 子窗体接收信息并处理
  * 
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        <body>
        <script>
            window.onmessage = function(e){
                e = e || event;
                alert(e.data); //立即弹出a发送过来的数据
                e.source.postMessage("好的，请稍等三秒！",e.origin); //立即回复a

                var postData = {name:"tsrot",age:24};
                var strData = JSON.stringify(postData); //json对象转化为字符串
                setTimeout(function(){
                    e.source.postMessage(strData,e.origin);
                },3000); //3秒后向a发送数据
            }
        </script>
        </body>
    </html>
  */

/** 
 * (31) CORS里的简单请求和非简单请求的区别是什么？
 * 
 * 只要同时满足以下两大条件，就属于简单请求。
 * - 请求方法是以下三种方法之一：HEAD、GET、POST
 * - HTTP 的头信息不超出以下几种字段：
 *      Accept
 *      Accept-Language
 *      Content-Language
 *      Last-Event-ID
 *      Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
 */

/** 
 * (32) 浏览器发现这次跨域 AJAX 请求是简单请求，就自动在头信息之中添加哪个字段，表示什么意思？
 * 
 * 添加一个Origin字段。说明本次请求来自哪个域（协议 + 域名 + 端口）
 */

/** 
 * (33) 如果origin指定的地址，不在服务器的许可范围内，浏览器会怎样，
 *      那在服务器许可的范围，响应头会多出哪几个字段？
 * 
 * 如果Origin指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。
 * 浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段（详见下文），就知道出错了，
 * 从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。
 * 
 * 这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是200。
 * 
 * 如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段:
    * - Access-Control-Allow-Origin: http://api.bob.com
        Access-Control-Allow-Credentials: true
        Access-Control-Expose-Headers: FooBar
        Content-Type: text/html; charset=utf-8
 */

/** 
 * (34) Access-Control-Allow-Credentials: true表示什么意思？
 * 
 * CORS 请求默认不包含 Cookie 信息（以及 HTTP 认证信息等），这是为了降低 CSRF 攻击的风险。
 * 但是某些场合，服务器可能需要拿到 Cookie，这时需要服务器显式指定Access-Control-Allow-Credentials字段，告诉浏览器可以发送 Cookie
 */

/** 
 * (35) 非简单请求中的预检请求是什么，预检请求有哪些不同于普通请求的请求头？
 * 
 * 非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为预检请求（preflight）。
 * 浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 方法和头信息字段。
 * 
    var url = 'http://api.alice.com/cors';
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('X-Custom-Header', 'value');
    xhr.send();
 */

/**
 * (36) history.pushState()是什么意思，它会跳转网页吗？
 * 
 * History.pushState()方法用于在历史中添加一条记录。
 * window.history.pushState(state, title, url)
 * 
 * 该方法接受三个参数，依次为：
 *      - state: 一个与添加的记录相关联的状态对象，主要用于popstate事件。该事件触发时，该对象会传入回调函数。
 *               也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。
 *               如果不需要这个对象，此处可以填null。
 *      - title: 新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串。
 *      - url：  新的网址，必须与当前页面处在同一个域。
 * 
 * 此API不会跳转网页。
 */

/** 
 * (37) history.pushState()之后，用户点击浏览器的倒退按钮，会触发什么事件？
 * 
    window.addEventListener('popstate', function(event) {
        console.log('location: ' + document.location);
        console.log('state: ' + JSON.stringify(event.state));
    });
 */

// URL对象相关问题?

/** 
 * (38) URL的编码和解码中，URL只能包含两类合法的字符，是那两类？
 * 
 * URL 元字符：分号（;），逗号（,），斜杠（/），问号（?），冒号（:），at（@），&，等号（=），加号（+），美元符号（$），井号（#）
 * 
 * 语义字符：a-z，A-Z，0-9，连词号（-），下划线（_），点（.），感叹号（!），波浪线（~），星号（*），单引号（'），圆括号（()）
 * 
 * 除了以上字符，其他字符出现在 URL 之中都必须转义，规则是根据操作系统的默认编码，
 * 将每个字节转为百分号（%）加上两个大写的十六进制字母。
 */

/** 
 * (39) URL提供了哪些URL的编码/解码方法？
 * 
 * JavaScript 提供四个 URL 的编码/解码方法。
 * 
 * - encodeURI
 *      encodeURI()方法用于转码整个 URL。它的参数是一个字符串，代表整个 URL。它会将元字符和语义字符之外的字符，都进行转义。
 *      encodeURI('http://www.example.com/q=春节')
 *      // "http://www.example.com/q=%E6%98%A5%E8%8A%82"
 * 
 * - encodeURIComponent
 *      encodeURIComponent()方法用于转码 URL 的组成部分，会转码除了语义字符之外的所有字符，即元字符也会被转码。
 *      所以，它不能用于转码整个 URL。它接受一个参数，就是 URL 的片段。
 *      
 *      encodeURIComponent('春节')      // "%E6%98%A5%E8%8A%82"
 *      encodeURIComponent('http://www.example.com/q=春节')
 *      // "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
 * 
 * - decodeURI 和 decodeURIComponent 是encodeURI、encodeURIComponent的逆运算
 */

/** 
 * (40) URL对象的实例有哪些常用属性和方法？
 * 
 * var url = new URL('http://www.example.com:4097/path/a.html?x=111#part1');
 * 
 * url.href         // "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
 * url.pathname     // "/path/a.html"
 * url.search       // "?x=111"
 * 
 * 常用的静态方法有:
 * - URL.createObjectURL()
 *      我自己经常会用这个API做本地图片预览。如下案例:
        <body>
            <div id="display" />
            <input type="file" id="fileElem" multiple accept="image/*" onchange="handleFiles(this.files)">
            <script>
                var div = document.getElementById('display');

                function handleFiles(files) {
                    for (var i = 0; i < files.length; i++) {
                        var img = document.createElement('img');
                        console.log(window.URL.createObjectURL(files[i]))
                        img.src = window.URL.createObjectURL(files[i]);
                        div.appendChild(img);
                    }
                }
            </script>
        </body>     
 * 
 * - URL.revokeObjectURL()
 *      URL.revokeObjectURL方法用来释放URL.createObjectURL方法生成的 URL 实例。
 *      它的参数就是URL.createObjectURL方法返回的 URL 字符串。
 * 
        var div = document.getElementById('display');

        function handleFiles(files) {
            for (var i = 0; i < files.length; i++) {
                var img = document.createElement('img');
                img.src = window.URL.createObjectURL(files[i]);
                div.appendChild(img);
                img.onload = function() {
                    window.URL.revokeObjectURL(this.src);
                }
            }
        }
 */

/** 
 * (41) Blob对象的实例如何保存JSON？
 * 
 * var obj = { hello: 'world' };
 * var blob = new Blob([ JSON.stringify(obj) ], {type : 'application/json'});
 */

/** 
 * (42) File 对象是什么？
 * 
 * File对象代表一个文件，用来读写文件信息。
 * 它继承了 Blob对象，或者说是一种特殊的 Blob对象，所有可以使用 Blob 对象的场合都可以使用它。
 * 
 * // <input id="fileItem" type="file">
 * var file = document.getElementById('fileItem').files[0];
 * file instanceof File // true
 */

/** 
 * (43) FileReader 对象是什么？
 * 
 * FileReader对象用于读取File对象或Blob对象所包含的文件内容。
 * 浏览器原生提供一个FileReader构造函数，用来生成 FileReader 实例。
 * 
 * var reader = new FileReader();
 * 
 * 常用的FileReader 有以下的实例属性：
 *      - FileReader.result
 *          读取完成后的文件内容，有可能是字符串，也可能是一个 ArrayBuffer 实例。
 * 
 *      - FileReader.onload
 *          load事件（读取操作完成）的监听函数，通常在这个函数里面使用result属性，拿到文件内容。
 * 
 *      - FileReader.readAsDataURL()
 *          读取完成后，result属性将返回一个 Data URL 格式（Base64 编码）的字符串，代表文件内容。
 *          对于图片文件，这个字符串可以用于<img>元素的src属性。
 *          注意，这个字符串不能直接进行 Base64 解码，必须把前缀"data:*/*;base64",从字符串里删除以后，再进行解码。
 *
 *      - FileReader.readAsText()
 *          读取完成后，result属性将返回文件内容的文本字符串。
 *          该方法的第一个参数是代表文件的 Blob 实例，第二个参数是可选的，表示文本编码，默认为 UTF-8。
 */

/** 
 * (44) 下面是一个FileReader例子
 */
/* HTML 代码如下
  <input type="file" onchange="previewFile()">
  <img src="" height="200">
*/
function previewFile() {
    const preview = document.querySelector('img');
    const file    = document.querySelector('input[type=file]').files[0];
    const reader  = new FileReader();

    reader.addEventListener('load', () => {
        preview.src = reader.result;
    }, false);
    // false 时候，事件句柄在冒泡阶段执行
    // true 时候，事件句柄在捕获阶段执行522222222222222222222222222222222222222222222222222222222222222222222222222

    file && reader.readAsDataURL(file);
}

/** 
 * (45) FormData 对象?
 * 
 * Blob构造函数接受两个参数。
 * 第一个参数是数组，成员是字符串或二进制对象，表示新生成的Blob实例对象的内容；
 * 第二个参数是可选的，是一个配置对象，目前只有一个属性type，它的值是一个字符串，表示数据的MIME 类型，默认是空字符串。
 * 
 * - FormData 对象的实例，有哪些常用的方法？
 *      FormData.append(key, value)：
 *          添加一个键值对。如果键名重复，则会生成两个相同键名的键值对。
 *          如果第二个参数是文件，还可以使用第三个参数，表示文件名。
 *      FormData.set(key, value)：
 *          设置指定键名的键值，参数为键名。如果键名不存在，会添加这个键值对，否则会更新指定键名的键值。
 *          如果第二个参数是文件，还可以使用第三个参数，表示文件名。
 *      FormData.delete(key)：
 *          删除一个键值对，参数为键名。
 *      FormData.get(key)：
 *          获取指定键名对应的键值，参数为键名。如果有多个同名的键值对，则返回第一个键值对的键值。
 *      FormData.getAll(key)：
 *          返回一个数组，表示指定键名对应的所有键值。如果有多个同名的键值对，数组会包含所有的键值。
 */
var formData = new FormData();
// 设置某个控件的值
formData.set('username', '张三');
formData.get('username') // "张三"
formData.set('username', '张三');
formData.append('username', '李四');
formData.get('username') // "张三"
formData.getAll('username') // ["张三", "李四"]

formData.append('userpic[]', myFileInput.files[0], 'user1.jpg');
formData.append('userpic[]', myFileInput.files[1], 'user2.jpg');

/** 
 * (46) enctype 属性是什么，有哪些值？
 * 
 * 表单能够用四种编码，向服务器发送数据。编码格式由表单的enctype属性决定。
 * 
 * - GET 方法
 *      如果表单使用GET方法发送数据，enctype属性无效。
 * 
 *      <form action="register.php" method="get" onsubmit="AJAXSubmit(this); return false;">
 *      </form>
 * 
 *      数据将以 URL 的查询字符串发出。
 *      例如：?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.
 * 
 * - application/x-www-form-urlencoded
 *      如果表单用POST方法发送数据，并省略enctype属性，那么数据以application/x-www-form-urlencoded格式发送（因为这是默认值）。
 * 
 *      <form action="register.php" method="get" onsubmit="AJAXSubmit(this); return false;">
 *      </form>
 * 
 *      发送的 HTTP 请求如下：
 *          Content-Type: application/x-www-form-urlencoded
 *          foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A
 * 
 * - text/plain
 *      如果表单使用POST方法发送数据，enctype属性为text/plain，那么数据将以纯文本格式发送。
 * 
 *      <form action="register.php" enctype="text/plain" method="post" onsubmit="AJAXSubmit(this); return false;">
 *      </form>
 * 
 *      发送的 HTTP 请求如下:
 *          Content-Type: text/plain
 *          foo=bar
 *          baz=The first line.
 * 
 * - multipart/form-data
 *      如果表单使用POST方法，enctype属性为multipart/form-data，那么数据将以混合的格式发送。
 * 
        <form
            action="register.php"
            method="post"
            enctype="multipart/form-data"
            onsubmit="AJAXSubmit(this); return false;"></form>   
 * 
 *      发送的 HTTP 请求如下:
            Content-Type: multipart/form-data; boundary=---------------------------314911788813839

            -----------------------------314911788813839
            Content-Disposition: form-data; name="foo"

            bar
            -----------------------------314911788813839
            Content-Disposition: form-data; name="baz"

            The first line.
            The second line.

            -----------------------------314911788813839--
 * 
 */
