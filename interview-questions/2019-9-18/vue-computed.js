/** 
 * https://juejin.im/post/5afbfce56fb9a07ac0226f21
 * 
 * 深入理解Vue的computed实现原理及其实现方式
 * 你需要知道3点：
 * (1) computed是如何初始化，初始化之后干了些什么?
 * (2) 为何触发data值改变时computed会从新计算?
 * (3) computed值为什么说是被缓存的呢，如何做的?
 */

var vm = new Vue({
    data: { a: 1 },
    computed: {
      // 仅读取
      aDouble: function () {
        return this.a * 2
      },
      // 读取和设置
      aPlus: {
        get: function () {
          return this.a + 1
        },
        set: function (v) {
          this.a = v - 1
        }
      }
    }
});

/** 
 * 计算属性的主要应用场景是代替模板内的表达式，或者data值的任何复杂逻辑都应该使用computed来计算，它有两大优势：
 * (1) 逻辑清晰，方便于管理
 * (2) 计算值会被缓存，依赖的data值改变时才会从新计算
 */

// Dep代码实现的方式
let uidep = 0;  // 标识当前的dep id
class Dep {
  constructor() {
    this.id = uidep++;
    // 此处存放所有的watcher
    this.subs = [];
  }

  // 添加一个观察者对象
  addSub(Watcher) {
    this.subs.push(Watcher);
  }

  // 依赖收集
  depend() {
    // 只有需要的才会收集依赖
    if (Dep.target) {
      Dep.target.addSub(this);
    }
  }

  // 调用依赖收集的watcher更新
  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

Dep.target = null;
const targetStack = [];

// 为Dep.target 赋值
function pushTarget(Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = Watcher
}

function popTarget() {
  Dep.target = targetStack.pop()
}

// Watcher功能
//去重 防止重复收集
let uid = 0;
class Watcher {
  constructor(vm, expOrFn, cb, options) {
    //传进来的对象 例如Vue
    this.vm = vm;
    
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
    } else {
      this.deep = this.user = this.lazy = false;
    }

    this.dirty = this.lazy;

    //在Vue中cb是更新视图的核心，调用diff并更新视图的过程
    this.cb = cb;
		this.id = ++uid;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();

    if (typeof expOrFn === 'function') {
      //data依赖收集走此处
      this.getter = expOrFn;
    } else {
      //watch依赖走此处
      this.getter = this.parsePath(expOrFn);
    }

    //设置Dep.target的值，依赖收集时的watcher对象
    this.value = this.lazy ? undefined : this.get();
  }

  get() {
    //设置Dep.target值，用以依赖收集
    pushTarget(this);
    const vm = this.vm;

    //此处会进行依赖收集 会调用data数据的 get
    let value = this.getter.call(vm, vm);
    popTarget();
    return value;
  }

  //添加依赖
  addDep(dep) {
    //去重
    const id = dep.id;

    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);

      if (!this.depIds.has(id)) {
        //收集watcher 
        /** 
         * 每次data数据 set时会遍历收集的watcher依赖进行相应视图更新或执行watch监听函数等操作
         */
        dep.addSub(this);
      }
    }
  }

  // 更新
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else {
      this.run();
    }
  }

  // 更新视图
  run() {
    console.log(`这里会去执行Vue的diff相关方法，进而更新数据`);
    const value = this.get();
    const oldValue = this.value;
    this.value = value;

    if (this.user) {
      // watch监听，则走这一步
      this.cb.call(this.vm, value, oldValue);
    } else {
      // data监听，走此处
      // 这里只做简单的console.log 处理，在Vue中会调用diff过程从而更新视图
      this.cb.call(this.vm, value, oldValue);
    }
  }

  // 如果计算熟悉依赖的data值发生变化时会调用
  // 案例中 当data.name值发生变化时会执行此方法
  evalute() {
    this.value = this.get();
    this.dirty = false;
  }

  // 依赖收集
  depend() {
    let i = this.deps.length;
    while(i--) {
      this.deps[i].depend();
    }
  }

  // 此方法获得每个watch中key在data中对应的value值
  // 使用split('.')是为了得到 像'a.b.c' 这样的监听值
  parsePath(path) {
    const bailRE = /[^w.$]/;
    if (bailRE.test(path)) {
      return;
    }

    const segments = path.split('.');

    return function(obj) {
      for(let i = 0; i < segments.length; i++) {
        if (!obj) {
          return;
        }

        if (i === 0) {
          obj = obj.data[segments[i]];
        } else {
          obj = obj[segments[i]];
        }
      }

      return obj;
    };
  }
}

/** 
 * 在Watcher中对于computed来说核心注意点是以下方法：
 * 
 * 如果计算熟悉依赖的data值发生变化时会调用,
 * 案例中 当data.name值发生变化时会执行此方法
 * 
    evaluate () {
        this.value = this.get()
        this.dirty = false
    }

    当computed中用到的data值发生变化时，视图更新调用computed值时会从新执行，获得新的计算属性值。
 */

/** 
 * Observer代码实现
 */
class Observer {
  constructor(value) {
    this.value = value;
    // 增加dep属性(处理数组时可以直接调用)
    this.dep = new Dep();
    //将Observer实例绑定到data的__ob__属性上面去，后期如果oberve时直接使用，不需要从新Observer,
    //处理数组是也可直接获取Observer对象

    def(value, '__ob__', this);

    if (Array.isArray(value)) {
      //
    } else {
      // 处理对象
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for(let i = 0; i< keys.length; i++) {
      //此处我做了拦截处理，防止死循环，Vue中在oberve函数中进行的处理
      if (keys[i] === '__ob__') {
        return;
      }

      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}

//数据重复Observer
function observe(value) {
  if (typeof value !== 'object') {
    return;
  }

  let ob = new Observer(value);
  return ob;
}

// 把对象属性改为getter/setter，并收集依赖
function defineReactive(obj, key, val) {
  const dep = new Dep();
  // 处理children
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      const value = val;
      if (Dep.target) {
        dep.depend();
        childOb && childOb.dep.depend();
      }
      return value;
    },
    set: function(newVal) {
      val = newVal;
      //对新值进行observe
      childOb = observe(newVal);
      //通知dep调用,循环调用手机的Watcher依赖，进行视图的更新
      dep.notify();
    }
  });
}

function def(obj, key, val) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: true,
    writable: true,
    configurable: true
  });
}
