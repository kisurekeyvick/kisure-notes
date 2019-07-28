<script>
    /** 
     * vuex中的mutations
     * 
     * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
     * Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
     * 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。
     */

    const store = new Vuex.Store({
        state: {
            count: 1
        },
        mutations: {
            increment (state) {
                // 变更状态
                state.count++
            }
        }
    })

    /** 
     * 你不能直接调用一个 mutation handler。
     * 这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”
     * 要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
     * store.commit('increment')
     */
</script>

<script>
    /** 
     * 提交载荷（Payload）
     * 
     * 你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：
     * 
        // ...
        mutations: {
            increment (state, n) {
                state.count += n
            }
        }

        store.commit('increment', 10)

        // 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读

        mutations: {
            increment (state, payload) {
                state.count += payload.amount
            }
        }

        store.commit('increment', {
            amount: 10
        })
     */
</script>

<script>
    /** 
     * 对象风格的提交方式
     * 
     * 提交 mutation 的另一种方式是直接使用包含 type 属性的对象：
     * 
        store.commit({
            type: 'increment',
            amount: 10
        })

        当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：
        mutations: {
            increment (state, payload) {
                state.count += payload.amount
            }
        }
     */
</script>

<script>
    /** 
     * Mutation 需遵守 Vue 的响应规则
     * 
     * 既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。
     * 这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：
     * 
     * (1) 最好提前在你的 store 中初始化好所有所需属性
     * (2) 当需要在对象上添加新属性时，你应该
     *      使用 Vue.set(obj, 'newProp', 123), 或者
     *      以新对象替换老对象。例如: state.obj = { ...state.obj, newProp: 123 }
     */
</script>

<script>
    /** 
     * Mutation 必须是同步函数
     * 
     * 一条重要的原则就是要记住 mutation 必须是同步函数。为什么？
        mutations: {
            someMutation (state) {
                api.callAsyncMethod(() => {
                state.count++
                })
            }
        }

        每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。
        然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，
        devtools 不知道什么时候回调函数

        实质上任何在回调函数中进行的状态的改变都是不可追踪的
     */
</script>

<script>
    /** 
     * 在组件中提交 Mutation
     * 
     * 你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，
     * 或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用
     */

    // 调用
    // <div @click="increment({amount: 10 })">Click me</div>
    import { mapMutations } from 'vuex'

    export default {
        // ...
        methods: {
            ...mapMutations([
                'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

                // `mapMutations` 也支持载荷：
                'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
            ]),
            ...mapMutations({
                add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
            })
        }
    }
</script>

