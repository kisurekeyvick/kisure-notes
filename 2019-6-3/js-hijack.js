/**
 * js数据劫持
 * 
 * VUE 双向绑定关键的一环就是数据劫持（Vue 2.x 使用的是 Object.defineProperty()，而 Vue 在 3.x 版本之后改用 Proxy 进行实现）
 */

/** 
 * Object.defineProperty
 * 
 * 通过 Object.defineProperty() 来劫持对象属性的 setter 和 getter 操作。
 * 在数据变动时做你想要做的事情。
 * 
    Object.defineProperty(obj, key, {
        get()  {
            // 相关操作，最终 return
        },
        set(newVal) {
            // 一些 handle 操作
        }
    })

    Object.defineProperty 有它存在的问题，比如不能监听数组的变化，对 object 劫持必须遍历每个属性，可能存在深层次的嵌套遍历。
 */

/** 
 * Proxy
 * 
 * Proxy 其内部功能十分强大的，有13种数据劫持的操作，如get、set、has、ownKey（获取目标对象的所有 key）、deleteProperty等，
 * 下面主要梳理 set、get。
 * 
 * (1) get
 *  get 即在获取到某个对象属性值的时候做预处理的方法，其有两个参数：target、key
 
    let Obj = {};
    let proxyObj = new Proxy(Obj, {
        get: function(target, key) {
            // 如通过 target 判断某个属性是否符合预期
            if (target['xx'] > 80) {return “该考生优秀！”}
            else if (!/^[0-9]+$/.test(key)) {return “学号格式不对！”}
            return Reflect.get(target, name, receiver); // Reflect 见文章最后的总结
        }
    });
 * 
 * (2) set
    set 即用来拦截某个属性赋值操作的方法，可以接受四个参数：
        target: 目标值
        key：目标的 key
        value：当前需要做改变的值
        receiver：改变前的原始值
    
    代码如下:
    let handler = {
        set: function(target, key, value) {
            if (key === 'score') {
                if (!/^[0-9]+$/.test(value)) {
                    throw new TypeError(‘分数必须为整数');
                }

                if (value > 100) {
                    throw new TypeError(‘成绩满分为 100');
                }
            }
            // 对于满足条件的属性直接写入
            target[key] = value;
        }
    };

    let proxy = new Proxy(obj, handler);

    注意！！！！
    Proxy 相对 Object.defineProperty，它支持对数组的数据对象的劫持。
    不用像 VUE 那样要对数据劫持的话，需要进行重载 hack。
    对于以上提到的嵌套问题，Proxy 可以在 get 里面递归调用 Proxy 即返回下一个”代理“来完成递归嵌套。
    可以说 ES6 的 Proxy 就是对 Object.defineProperty 的改进和升级。

    let obj = {
        0801080132:  {
            name: ‘Jason',
            score: 99
        },
        // …
    };

    let handler = {
        get (target, key, receiver) {
            // 如果属性值不为空或者是一个对象，则继续递归
            if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], handler)
            }
            return xxx // 返回业务数据
        }
    }

    let proxy = new Proxy(obj, handler)

    Proxy 本质上就是在数据层外加上代理，通过这个代理实例访问里边的数据，这就是 Proxy 实现数据劫持的方式
 */
