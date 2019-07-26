<script>
    /** 
     * https://juejin.im/post/5afbfce56fb9a07ac0226f21
     * 
     * 深入理解Vue的computed实现原理及其实现方式
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
    vm.aPlus   // => 2
    vm.aPlus = 3
    vm.a       // => 2
    vm.aDouble // => 4

    /** 
     * 计算属性的主要应用场景是代替模板内的表达式，或者data值的任何复杂逻辑都应该使用computed来计算，
     * 它有两大优势：
     * (1) 逻辑清晰，方便于管理
     * (2) 计算值会被缓存，依赖的data值改变时才会从新计算
     */

    // 当computed中用到的data值发生变化时，视图更新调用computed值时会从新执行，获得新的计算属性值。
</script>

<script>
    /** 
     * https://juejin.im/post/5b87f13bf265da436479f3c1#heading-1
     * 
     * watch是一个侦听的动作，用来观察和响应 Vue 实例上的数据变动
     * 
        <div id="watch-example">
            <p>
                Ask a yes/no question:
                <input v-model="question">
            </p>
            <p>{{ answer }}</p>
        </div>
     */
    export default {
        watch: {
            // 如果 `question` 发生改变，这个函数就会运行
            question: function (newQuestion, oldQuestion) {
                this.answer = 'Waiting for you to stop typing...'
                this.debouncedGetAnswer()
            }
        }
    }
</script>

<script>
    /** 
     * https://juejin.im/post/5b87f13bf265da436479f3c1#heading-1
     * 
     * computed和watch用法异同
     * 
     * 相同： computed和watch都起到监听/依赖一个数据，并进行处理的作用
     * 异同：它们其实都是vue对监听器的实现，只不过computed主要用于对同步数据的处理，
     *      watch则主要用于观测某个值的变化去完成一段开销较大的复杂业务逻辑。
     *      能用computed的时候优先用computed，避免了多个数据影响其中某个数据时多次调用watch的尴尬情况。
     */
</script>

<script>
    /** 
     * https://juejin.im/post/5b87f13bf265da436479f3c1#heading-1
     * 
     * (1) watch的高级用法
     * 
     * <div id="demo">{{ fullName }}</div>
     */
    export const vue = {
        data: {
            firstName: 'Foo',
            lastName: 'Bar',
            fullName: 'Foo Bar'
        },
        watch: {
            firstName: function (val) {
                console.log('第一次没有执行～')
                this.fullName = val + ' ' + this.lastName
            }
        }
    }

    /** 
     * 可以看到，初始化的时候watch是不会执行的。看上边的例子，
     * 只要当firstName的值改变的时候才会执行监听计算。
     * 但如果想在第一次它在被绑定的时候就执行怎么办？
     * 这时候就要修改一下我们的例子：
     */

    export const vue_1 = {
        data: {
            firstName: 'Foo',
            lastName: 'Bar',
            fullName: 'Foo Bar'
        },
        watch: {
            firstName: function (val) {
                console.log('第一次没有执行～')
                this.fullName = val + ' ' + this.lastName
            },
            // 代表在watch里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    }

    /** 
     * 而immediate:true代表如果在 wacth 里声明了 firstName 之后，
     * 就会立即先去执行里面的handler方法，如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行。
     */

    /** 
     * (2) deep属性
     *      watch里还有一个deep属性，代表是否开启深度监听，默认为false
     * 
            <div id="app">
                <div>obj.a: {{obj.a}}</div>
                <input type="text" v-model="obj.a">
            </div>
     */
    export const vue_2 = {
        data: {
            obj: {
                a: 1
            }
        },
        watch: {
            obj: {
                handler(val) {
                    console.log('obj.a changed')
                },
                immediate: true
            }
        }
    }

    /** 
     * 当我们在input输入框中输入数据改变obj.a的值时，我们发现在控制台没有打印出'obj.a changed'。
     * 受现代 JavaScript 的限制 (以及废弃 Object.observe)，Vue 不能检测到对象属性的添加或删除。
     * 由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，
     * 所以属性必须在 data 对象上存在才能让 Vue 转换它，才能让它是响应式的。
     */

    /** 
     * 但是我们如果需要监听obj里的属性值呢？这时候，deep属性就派上用场了。
     * 我们只需要加上deep:true，就能深度监听obj里属性值。
     */
    export const vue_3 = {
        data: {
            obj: {
                a: 1
            }
        },
        watch: {
            obj: {
                handler(val) {
                    console.log('obj.a changed')
                },
                immediate: true,
                deep: true
            }
        }
    }
</script>

<script>
    /** 
     * https://juejin.im/post/5b87f13bf265da436479f3c1#heading-1
     * 
     * computed的本质 —— computed watch
     * 
     * 以下是初始化watch(initWatch)的实现：
     */

    // 用于传入Watcher实例的一个对象，即computed watcher
    const computedWatcherOptions = { computed: true };

    function initComputed (vm, computed) {
        // 声明一个watchers且同时挂载到vm实例上
        const watchers = vm._computedWatchers = Object.create(null);
        // 在SSR模式下computed属性只能触发getter方法
        const isSSR = isServerRendering();

        // 遍历传入的computed方法
        for (const key in computed) {
            // 取出computed对象中的每个方法并赋值给userDef
            const userDef = computed[key];
            const getter = typeof userDef === 'function' ? userDef : userDef.get
            if (process.env.NODE_ENV !== 'production' && getter == null) {
                warn(
                    `Getter is missing for computed property "${key}".`,
                    vm
                )
            }

            // 如果不是SSR服务端渲染，则创建一个watcher实例
            if(!isSSR) {
                // create internal watcher for the computed property.
                watchers[key] = new Watcher(
                    vm,
                    getter || noop,
                    noop,
                    computedWatcherOptions
                )
            }

            if (!(key in vm)) {
                // 如果computed中的key没有设置到vm中，通过defineComputed函数挂载上去 
                defineComputed(vm, key, userDef)
            } else if (process.env.NODE_ENV !== 'production') {
                // 如果data和props有和computed中的key重名的，会产生warning
                if (key in vm.$data) {
                    warn(`The computed property "${key}" is already defined in data.`, vm)
                } else if (vm.$options.props && key in vm.$options.props) {
                    warn(`The computed property "${key}" is already defined as a prop.`, vm)
                }
            }
        }
    }

    /** 
     * 通过源码我们可以发现它先声明了一个名为watchers的空对象，同时在vm上也挂载了这个空对象。
     * 之后遍历计算属性，并把每个属性的方法赋给userDef，如果userDef是function的话就赋给getter，
     * 接着判断是否是服务端渲染，如果不是的话就创建一个Watcher实例。
     * 
     * 不过需要注意的是，这里新建的实例中我们传入了第四个参数，也就是computedWatcherOptions。
     * const computedWatcherOptions = { computed: true }，这个对象是实现computed watcher的关键。
     * 这时，Watcher中的逻辑就有变化了：
     */

    // 源码定义在src/core/observer/watcher.js中
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.computed = !!options.computed
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.computed = this.sync = false
    }
    // 其他的代码......
    this.dirty = this.computed // for computed watchers

    /** 
     * 这里传入的options就是上边定义的computedWatcherOptions，当走initData方法的时候，options并不存在，
     * 但当走到initComputed的时候，computedWatcherOptions中的computed为true，
     * 注意上边的一行代码this.dirty = this.computed，将this.computed赋值给this.dirty。
     */

    evaluate () {
        if (this.dirty) {
        this.value = this.get()
        this.dirty = false
        }
        return this.value
    }

    /** 
     * 只有this.dirty为true的时候才能通过 this.get() 求值，然后把 this.dirty 设置为 false。
     * 在求值过程中，会执行 value = this.getter.call(vm, vm)，这实际上就是执行了计算属性定义的 getter 函数，
     * 否则直接返回value。
     */

    /** 
     * 当对计算属性依赖的数据做修改的时候，会触发 setter 过程，通知所有订阅它变化的 watcher 更新，执行 watcher.update() 方法：
     */
    update () {
        /* istanbul ignore else */
        if (this.computed) {
            // A computed property watcher has two modes: lazy and activated.
            // It initializes as lazy by default, and only becomes activated when
            // it is depended on by at least one subscriber, which is typically
            // another computed property or a component's render function.
            if (this.dep.subs.length === 0) {
                // In lazy mode, we don't want to perform computations until necessary,
                // so we simply mark the watcher as dirty. The actual computation is
                // performed just-in-time in this.evaluate() when the computed property
                // is accessed.
                this.dirty = true
            } else {
                // In activated mode, we want to proactively perform the computation
                // but only notify our subscribers when the value has indeed changed.
                this.getAndInvoke(() => {
                    this.dep.notify()
                })
            }
        } else if (this.sync) {
            this.run()
        } else {
            queueWatcher(this)
        }
    }
</script>

