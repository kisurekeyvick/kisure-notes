/**
 * https://juejin.im/post/5bee2d436fb9a049f818dcfb
 * 
 * vue中的mvvm
 */

/**
 * (1) MVVM模式
 * 
 * MVVM的设计思想：关注Model（数据）的变化，让MVVM框架去自动更新DOM的状态，
 * 比较主流的实现有：angular的（脏值检测）vue的（数据劫持->发布订阅模式）我们重点了解vue（数据劫持->发布订阅模式）的实现方式，
 * 让我们从操作DOM的繁琐操作中解脱出来
 */

/**
 * (2) 核心方法Object.defineProperty的理解
 * 
 * 我们先简单看一下这个方法它也是用来实现我们数据劫持（数据监听）的关键方法，
 * 我们知道vue框架是不兼容IE6~8低版本的，主要是因为它的用到了ES5中的这个Object.defineProperty的方法，
 * 而且这个方法暂时没有很好的降级方案。
 */
var a = {};
Object.defineProperty(a, 'b', {
       value: 123,         // 设置的属性值
       writable: false,    // 是否只读
       enumerable: false,  // 是否可枚举
       configurable: false 
});
console.log(a.b); //123
   
/**
    方法使用很简单，它接受三个参数，而且都是必填的

 	第一个参数：目标对象
 	第二个参数：需要定义的属性或方法的名字。
 	第三个参数：目标属性所拥有的特性

    前两个参数比较好理解，主要看第三个参数它是一个对象，看看有哪些属性定义

 	value：属性的值。
 	writable：如果为 false ，属性的值就不能被重写,只能为只读了。
 	enumerable：是否可枚举，默认是false不可枚举的（通常设置为true）
 	configurable：总开关，一旦为false，就不能再设置其他的（ value ， writable ， enumerable）
 	get()：函数，获取属性值时执行的方法（不可以和writable、value属性共存）
 	set()：函数，设置属性值时执行的方法（不可以和writable、value属性共存
 */

// 常用定义
var obj = {};
Object.defineProperty(obj, 'school', {
   enumerable: true,
   get: function() {                // 获取属性值时会调用get方法
   },
   set: function(newVal) {                // 设置属性值时会调用set方法
       return newVal
   }
});

/**
  我们通过这个Object.defineProperty这个方法，可以实现对定义的引用数据类型的实现监听，被方法监听后的对象，
  里面定义的值发生被获取和设置操作的时候，会分别触发Object.defineProperty里面参数三的get和set方法。
 */























/** 
 * https://mp.weixin.qq.com/s/4Ea8t3aHWmqp9rqL27wPhg
 * 
 * 关于MVVM的原理：
 * 
 * 真正实现其实靠的也是ES5中提供的Object.defineProperty
 */

// 关于Object.defineProperty的用法
let obj = {};
let song = '发如雪'; 
obj.singer = '周杰伦';  

Object.defineProperty(obj, 'music', {
    // value: '七里香',
    configurable: true,     // 可以配置对象，删除属性
    // writable: true,
    enumerable: true,       // 可以枚举
    // ☆ get,set设置时不能设置writable和value，它们代替了二者且是互斥的
    get() {
        // 获取obj.music的时候就会调用get方法
        return song;
    },
    set(val) {
        // 将修改的值重新赋给song
        song = val;
    }
});

// 下面打印的部分分别是对应代码写入顺序执行
console.log(obj);   // {singer: '周杰伦', music: '七里香'}  // 1

delete obj.music;   // 如果想对obj里的属性进行删除，configurable要设为true  2
console.log(obj);   // 此时为  {singer: '周杰伦'}

obj.music = '听妈妈的话';   // 如果想对obj的属性进行修改，writable要设为true  3
console.log(obj);   // {singer: '周杰伦', music: "听妈妈的话"}

for (let key in obj) {    
    // 默认情况下通过defineProperty定义的属性是不能被枚举(遍历)的
    // 需要设置enumerable为true才可以
    // 不然你是拿不到music这个属性的，你只能拿到singer
    console.log(key);   // singer, music    4
}

console.log(obj.music);   // '发如雪'  5
obj.music = '夜曲';       // 调用set设置新的值
console.log(obj.music);   // '夜曲'

// 案例
// index.html
/** 
    <body>
        <div id="app">
            <h1>{{song}}</h1>
            <p>《{{album.name}}》是{{singer}}2005年11月发行的专辑</p>
            <p>主打歌为{{album.theme}}</p>
            <p>作词人为{{singer}}等人。</p>
            为你弹奏肖邦的{{album.theme}}
        </div>
        <!--实现的mvvm-->
        <script src="mvvm.js"></script>
        <script>
            // 写法和Vue一样
            let mvvm = new Mvvm({
                el: '#app',
                data: {     // Object.defineProperty(obj, 'song', '发如雪');
                    song: '发如雪',
                    album: {
                        name: '十一月的萧邦',
                        theme: '夜曲'
                    },
                    singer: '周杰伦'
                }
            });
        </script>
    </body>
 */

// 创建一个Mvvm构造函数
// 这里用es6方法将options赋一个初始值，防止没传，等同于options || {}
function Mvvm(options = {}) {
    // vm.$options Vue上是将所有属性挂载到上面
    // 所以我们也同样实现,将所有属性挂载到了$options
    this.$options = options;
    // this._data 这里也和Vue一样
    let data = this._data = this.$options.data;

    // 数据劫持
    observe(data);
}

/** 
 * - 数据劫持
 * 
 * 为什么要做数据劫持？
 * (1) 观察对象，给对象增加Object.defineProperty
 * (2) vue特点是不能新增不存在的属性 不存在的属性没有get和set
 * (3) 深度响应 因为每次赋予一个新对象时会给这个新对象增加defineProperty(数据劫持)
 */

// 创建一个Observe构造函数
// 写数据劫持的主要逻辑
function Observe(data) {
    // 所谓数据劫持就是给对象增加get,set
    // 先遍历一遍对象再说
    for (let key in data) {     // 把data属性通过defineProperty的方式定义属性
        let val = data[key];
        observe(val);   // 递归继续向下找，实现深度的数据劫持
        Object.defineProperty(data, key, {
            configurable: true,
            get() {
                return val;
            },
            set(newVal) {   // 更改值的时候
                if (val === newVal) {   // 设置的值和以前值一样就不理它
                    return;
                }
                val = newVal;   // 如果以后再获取值(get)的时候，将刚才设置的值再返回去
                observe(newVal);    // 当设置为新值后，也需要把新值再去定义成属性
            }
        });
    }
}

// 外面再写一个函数
// 不用每次调用都写个new
// 也方便递归调用
function observe(data) {
    // 如果不是对象的话就直接return掉
    // 防止递归溢出
    if (!data || typeof data !== 'object') return;
    return new Observe(data);
}

// 以上代码就实现了数据劫持，不过可能也有些疑惑的地方比如：递归
let mvvm = new Mvvm({
    el: '#app',
    data: {
        a: {
            b: 1
        },
        c: 2
    }
});

/** 
 * - 数据代理
 * 
 * 数据代理就是让我们每次拿data里的数据时，不用每次都写一长串，如mvvm._data.a.b这种，
 * 我们其实可以直接写成mvvm.a.b这种显而易见的方式。
 */
function Mvvm(options = {}) {
    // 数据劫持
    observe(data);
    // this 代理了this._data
    for (let key in data) {
        Object.defineProperty(this, key, {
            configurable: true,
            get() {
                return this._data[key];     // 如this.a = {b: 1}
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        });
    }
}

// 此时就可以简化写法了
console.log(mvvm.a.b);   // 1
mvvm.a.b = 'ok';    
console.log(mvvm.a.b);  // 'ok'

// 写到这里数据劫持和数据代理都实现了

/** 
 * - 数据编译
 */
function Mvvm(options = {}) {
    // observe(data);

    // 编译    
    new Compile(options.el, this);    
}

// 创建Compile构造函数
function Compile(el, vm) {
    // 将el挂载到实例上方便调用
    vm.$el = document.querySelector(el);
    // 在el范围里将内容都拿到，当然不能一个一个的拿
    // 可以选择移到内存中去然后放入文档碎片中，节省开销
    let fragment = document.createDocumentFragment();

    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);    // 此时将el中的内容放入内存中
    }

    // 对el里面的内容进行替换
    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            let reg = /\{\{(.*?)\}\}/g;     // 正则匹配{{}}

            if (node.nodeType === 3 && reg.test(txt)) {
                // 即是文本节点又有大括号的情况{{}}
                console.log(RegExp.$1); // 匹配到的第一个分组 如：a.b, c
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach(key => {
                    val = val[key];     // 如this.a.b
                });
                
                // 用trim方法去除一下首尾空格
                node.textContent = txt.replace(reg, val).trim();
            }

            // 如果还有子节点，继续递归replace
            if (node.childNodes && node.childNodes.length) {
                replace(node);
            }
        });
    }

    replace(fragment);  // 替换内容
    vm.$el.appendChild(fragment);   // 再将文档碎片放入el中
}

// 现在数据已经可以编译了，但是我们手动修改后的数据并没有在页面上发生改变

/** 
 * - 发布订阅
 * 
 * 发布订阅主要靠的就是数组关系，订阅就是放入函数，发布就是让数组里的函数执行
 */
// 发布订阅模式  订阅和发布 如[fn1, fn2, fn3]
function Dep() {
    // 一个数组(存放函数的事件池)
    this.subs = [];
}

Dep.prototype = {
    addSub(sub) {   
        this.subs.push(sub);    
    },
    notify() {
        // 绑定的方法，都有一个update方法
        this.subs.forEach(sub => sub.update());
    }
};

// 监听函数
// 通过Watcher这个类创建的实例，都拥有update方法
function Watcher(fn) {
    this.fn = fn;   // 将fn放到实例上
}

Watcher.prototype.update = function() {
    this.fn();  
};

let watcher = new Watcher(() => console.log(111));
let dep = new Dep();
dep.addSub(watcher);

/** 
 * - 数据更新视图
 * 
 * 现在我们要订阅一个事件，当数据改变需要重新刷新视图，这就需要在replace替换的逻辑里来处理
 * 通过new Watcher把数据订阅一下，数据一变就执行改变内容的操作
 */
function replace(frag) {
    node.textContent = txt.replace(reg, val).trim();
    // 监听变化
    // 给Watcher再添加两个参数，用来取新的值(newVal)给回调函数传参
    new Watcher(vm, RegExp.$1, newVal => {
        node.textContent = txt.replace(reg, newVal).trim();    
    });
}




