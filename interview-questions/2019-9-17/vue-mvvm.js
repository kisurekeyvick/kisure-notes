/** 关于Object.defineProperty的了解 */
let obj = {};
Object.defineProperty(obj, 'like', {
    value: 'nice fish'
});
delete obj.like;
/** 
 * 打印出：{ like: 'nice fish' }
 * 
 * 但是，如果是如上用object.defineProperty来定义的属性，是删除不了的
 * 因为你没有使用其中的属性：   configurable:true
 */
console.log(obj);

// （1）所以如果想要删除其中的属性，那么需要使用configurable属性
let obj_2 = {};
Object.defineProperty(obj_2, 'like', {
    configurable: true,
    value: 'nice fish'
});
delete obj_2.like;
console.log(obj_2); // {}

// 但是如果我们使用：obj_2.like = 'kisure'，那么是不会改变，因为我们没有使用属性： writable: true

// （2）所以如果想要修改其中的属性，那么需要使用writable属性
let obj_3 = {};
Object.defineProperty(obj_3, 'like', {
    configurable: true,
    value: 'nice fish',
    writable: true 
});
obj_3.like = 'demo';

// 但是如果我们使用for...in来遍历对象的属性，是遍历不出的

// （3）所以如果想要遍历其中的属性，需要使用属性：enumberable:true
let obj_4 = {};
Object.defineProperty(obj_4, 'like', {
    configurable: true,
    value: 'nice fish',
    enumerable: true,
    writable: true 
});

for(const key in obj_4) {
    console.log(obj_4[key]);
}

// (4) 但是如果我们想要使用get和set，那么是不能够使用 value 和 writable


/** 数据劫持 */
let kisure = new K({
    el: '#app',
    data: {
        a: { 
            b: {
                c: 'nice'
            }
        }
    }
});

function K(options = {}) {
    this.$options = options;    // 将所有的属性挂载在了$options
    // this._data   代表的是将data数据挂载到当前的实例中
    let data = this._data = this.$options.data;
    observe(data);

    // 经过observe以后，我们将数据劫持以后的data，挂载到this上
    // 这一步就是《数据代理》
    for(const key in data) {
        Object.defineProperty(this, key, {
            get() {
                return this._data[key];     // 做完次步骤，相当于我们可以直接使用this[key]进行访问了
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        });
    }

    initCompouted();
    new Compile(options.el, this);
}

// 观察对象，给对象增加Object.defineProperty
function observe(data) {
    if (typeof data === 'object') {
        return;
    }
    return new Observe(data);
}

function Observe(data) {
    let dep = new Dep();

    for(const key in data) {    
        let value = data[key];
        // 继续进行观察
        observe(value);
        // 把data属性通过 Object.defineProperty 的方式 定义属性
        Object.defineProperty(data, key, {
            enumerable: true,
            get() {
                // 这一步可以添加watcher
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set(newVal) {
                if (value === newVal) {
                    return;
                }
                // 如果以后再获取值的时候将刚才设置的值再丢回去（用于get中的 return value）
                value = newVal;
                
                // 如果设置了不同的值，那么就对新设置的值进行数据劫持
                observe(newVal);

                dep.notify();   // 每一次更新值以后，都会更新dom操作
            }
        });
    }
}

/** 
 * 有一个知识点： vue不能新增不存在的属性，不能存在的属性没有get和set
 * 而没有get和set，那么就不能监控数据的变化
 * 
 * (2)深度响应：因为每次赋予一个新对象时会给这个新对象增加数据劫持
 */

/** 
 * 模板的编译
 * 
    <div id='app'>
        <p>{{a}}</p>
        <div>{{b}}</div>
    </div>
 * 
 */

/**
 * @desc 模板斌编译             用于K()中
 * @param {*} el el代表的是替换的范围
 * @param {*} vm 当前的实例(this)
 */
function Compile(el, vm) {
    // el代表的是替换的范围
    vm.$el = document.querySelector(el);
    // 创建文档碎片存储
    let fragment = document.createDocumentFragment();
    
    // 执行完while以后，页面中的元素不存在了，也就是说会将元素存在方文档碎片中去
    while(child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }

    function replace(fragment) {
        Array.from(fragment.childNodes).forEach((node) => {
            // 循环每一层
            let text = node.textContent;
            // 正则
            const reg = /\{\{(.*)\}\}/g;
            // node.nodeType为3，代表的是文本，并且匹配成功
            if (node.nodeType === 3 && reg.test(text)) {
                /** 
                 * $1, ..., $9 属性是静态的, 他不是独立的的正则表达式属性. 所以, 我们总是像这样子使用他们RegExp.$1, ..., RegExp.$9.
                 * RegExp对象能捕获的只有九个. 你可以通过返回一个数组索引来取得所有的括号匹配项.
                 * 
                 * 使用replace()去匹配一个 first last 格式的 name String 实例，然后输出 last first 格式。
                 * 在替换文本中，用 $1 和 $2 表示正则表达式中括号匹配项的结果。
                 * 
                 * let regExp = /(\w+)\s(\w+)/
                 * let str = 'Jianran Lin'
                 * str.replace(regExp, '$2 '+ '$1') // "Lin Jianran"
                 * console.log(RegExp.$1) // "Jianran"
                 * console.log(RegExp.$2) // "Lin"
                 */
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach((key) => {
                    val = val[key]; 
                });

                // 如果数据发生了变化，那么就添加监听
                new Watcher(vm, RegExp.$1, function(newVal) {
                    node.textContent = text.replace(/\{\{(.*)\}\}/, newVal);
                });

                node.textContent = text.replace(/\{\{(.*)\}\}/, val);
            }

            /** v-model 双向数据的绑定 */
            if (node.nodeType === 1) {
                /** node.nodeType为1，代表的是元素节点 */
                let nodeAttrs = node.attributes;
                Array.from(nodeAttrs).forEach((attr) => {
                    let name = attr.name;   // type='text'
                    let exp = attr.value;   // v-modal='b'
                    
                    if (name.indexOf('v-modal') === 0) {
                        // 也就是v-modal
                        node.value = vm[exp];
                    }

                    new Watcher(vm, exp, function(newVal) {
                        // 当watch触发时，会自动将内容放到输入框内
                        node.value = newVal;
                    });

                    node.addEventListener('input', (e) => {
                        let newVal = e.target.value;
                        // 当我们使用vm[exp]的时候，就会触发observe中的set方法，于是就会执行observe中的notify方法
                        vm[exp] = newVal;
                    });
                });
            }
    
            if (node.childNodes) {
                replace(node);
            }
        });
    }

    replace(fragment);

    // 最后，我们把文档碎片重新挂载到vm.$el上去
    vm.$el.appendChild(fragment);
}

/** 
 * 发布订阅模式
 * 
 */
// 发布订阅模式，都需要有一个update属性
function Dep() {
    this.subs = [];
}

// 添加订阅
Dep.prototype.addSub = function(sub) {
    this.subs.push(sub);
}

// 通知
Dep.prototype.notify = function() {
    this.subs.forEach(sub => sub.update());
}

function Watcher(vm, exp, fn) {
    this.fn = fn;
    this.vm = vm;
    this.exp = exp;

    // 然后我们需要将watcher添加到Dep中
    // 我们现在Dep构造函数上，定一个target属性
    Dep.target = this;
    let val = vm;
    let arr = exp.split('.');
    arr.forEach(function(key) { // 相当于this.a.a
        val = val[key];
    });
    Dep.target = null;
}

Watcher.prototype.update = function() {
    let val = this.vm;
    let arr = this.exp.split('.');
    arr.forEach(function(key) { // 相当于this.a.a
        val = val[key];
    });
    this.fn(val);
}

/** 
 * computed
 * computed可以被缓存，它其实是把数据挂在到vm上
 */
function initCompouted() {
    let vm = this;
    let computed = this.$options.computed;
    Object.keys(computed).forEach(item => {
        Object.defineProperty(vm, key, {
            get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
            set() { }
        });
    });
}

/** 
 * mvvm的概述
 * 
 * vue中的mvvm，使用了数据劫持，数据代理，发布订阅者模式，模板编译。
 * 
 * - 数据劫持，使用Object.defineProperty(对象,属性, {
 *      enumberable: true,
 *      configurable: true,
 *      get() {},
 *      set() {}
 * }),我们会定义一个observe的方法，这个方法传入一个参数，最开始会判断是否为对象，如果是对象，那么return new Observe();
 * 而Observe这个构造函数中，会有一个Object.defineProperty属性，用于针对对象的属性做出拦截（用到了get和set）
 * 
 * - 当我们进行完数据劫持以后，我们还会进行数据的代理，用的也是Object.defineproperty。目的就将对象的属性挂载到this上面，这样我们就
 * 可以直接通过this.的方式进行属性的访问
 * 
 * - 发布订阅者模式
 * 我们使用Dep和Watch两个构造函数，Dep构造函数用于存储观察者，并且有一个notify的方法，它会执行观察者的update方法
 * Dep还有一个add的方法用于添加观察者。
 * Watch构造函数中接收3个参数：vm(this),属性，以及方法。而这个方法会接收一个参数，用于后面的替换节点的文本内容。
 * 我们在构造watch的时候，会设置Dep函数一个target属性，这个属性用于存储this，这一步会在Observe中使用，在Observe中会使用
 * new Dep()进行构造，然后在get方法中使用：Dep.target && dep.addSub(Dep.target); 这一步的触发，是因为watch中，我们在
 * 设置Dep.target属性的值为this时候，还进行了传进来的属性的值访问。于是就会触发Observe中的get。
 * 而watch中的update方法，也是对属性的访问和赋值。最后会执行this.fn(val)，这个val就是最终的访问到的值。
 * 
 * - 模板编译
 * compile构造函数存在2个参数，一个是el代表的是选择器，第二个参数是当前的实例。
 * 然后会创建文档碎片，创建文档碎片是为了节省内存的开支。然后compile中会实现一个replace方法，它的作用就是字面意思替换内容。
 * replace接收文档碎片。我们通过Array.from的方式循环遍历存储在文档碎片中的节点。其中我们会判断这个节点是否为文本，或者为输入框
 * 如果是文本，我们会在其中new Watch，传入：参数1（this），参数2（正则匹配到的属性），最后，传入一个function，这个function接收一个新的值
 * 这个方法的目的就是设置文本的属性 textContent 的值为接收到的新值
 * 如果是输入框，如果存在v-model，那么就会设置节点的value值。同时也会调用new Watcher()进行监听。
 */
