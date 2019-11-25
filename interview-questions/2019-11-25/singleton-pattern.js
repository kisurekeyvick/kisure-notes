/**
 * https://blog.csdn.net/xhjfor/article/details/81163509
 * 
 * 单例模式
 * 单例模式的定义是产生一个类的唯一实例，核心是确保只有一个实例，并提供全局访问
 */

/**
 * - 直接创建一个对象实现单例模式
 */
// 对象字面量
var Singleton = {
    attr1: 1,
    attr2: 2,
    method1: function(){
        return this.attr1;
    },
    method2: function(){
        return this.attr2;
    }
};
 
/**
 * 缺点：
 * (1)没有什么封装性，所有的属性方法都是暴露的。
 * (2)全局变量很容易造成命名空间污染。
 * (3)对象一开始变创建，万一我们用不上就浪费了
 */

/**
 * - 实现惰性单例(利用闭包和立即执行函数来实现)
 */
// 实现单体模式创建div
var createDiv = (function(){
    var div;  
    return function(){
        if(!div) {
            div = document.createElement("div");
            div.style.width = '100px';
            div.style.height = '100px';
            div.style.background = '#e4e4e4';
            document.body.appendChild(div);
        }
        return div;
    }
})();
 
var div1 = createDiv();
var div2 = createDiv();
console.log(div1 === div2); //true

/**
 * 虽然我们完成了惰性单例，但是我们同样发现了问题
 * (1) 违反了单一职责原则，创建对象和管理单例放在了一个函数中createDiv
 * (2) 如果我们还想创建一个其他的唯一对象，那就只能copy了
 */

/**
 * - 抽离管理单例逻辑
 */
// 获取单个实例
var getInstance = function(fn) {
    var result;
    return function(){
        return result || (result = fn.call(this,arguments));
    }
};
// 创建div
var createWindow = function(){
    var div = document.createElement("div");
    div.innerHTML = "i am #div";
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
};

// 创建iframe
var createIframe = function(){
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    return iframe;
};

// 测试创建div
var createSingleDiv = getInstance(createWindow);  //返回一个闭包,result 为null
document.getElementById("test1").onclick = function(){
    var win = createSingleDiv();
    win.style.display = "block";
};

// 测试创建iframe
var createSingleIframe = getInstance(createIframe); //返回一个闭包,result 为null
document.getElementById("test2").onclick = function(){
    var win = createSingleIframe();
    win.src = "https://www.imooc.com";
};

/**
 * getInstance函数将一个fn作为参数传递进去，如果有result这个实例的话，直接返回。
 * 否则的话，当前的调用fn这个函数，是this指针指向这个fn这个函数，之后返回被保存在result里面。
 */


/**
 * 总结：
 * 所谓的单例模式，就是实现一个全局变量，
 */