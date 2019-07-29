<script>
    /** 
     * vuex中的action
     * 
     * Action 类似于 mutation，不同在于：
     * (1) Action 提交的是 mutation，而不是直接变更状态。
     * (2) Action 可以包含任意异步操作。
     */

    // 注册一个简单的 action：
    const store = new Vuex.Store({
        state: {
            count: 0
        },
        mutations: {
            increment (state) {
                state.count++
            }
        },
        actions: {
            increment (context) {
                context.commit('increment')
            }
        }
    });

    /** 
     * Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
     * 因此你可以调用 context.commit 提交一个 mutation，
     * 或者通过 context.state 和 context.getters 来获取 state 和 getters。
     * 
     * 这里需要注意!!!: context 对象不是 store 实例本身了
     */
</script>

<script>
    /** 
     * 分发 Action
     * 
     * Action 通过 store.dispatch 方法触发：
     * store.dispatch('increment')
     * 
     * 为什么要这么麻烦？
     *  mutation 必须同步执行这个限制，而action就不受约束！我们可以在 action 内部执行异步操作。
     * 
        actions: {
            incrementAsync ({ commit }) {
                setTimeout(() => {
                    commit('increment')
                }, 1000)
            }
        }
     */

    /** 
     * Actions 支持同样的载荷方式和对象方式进行分发：
     * 
        // 以对象形式分发
        store.dispatch({
            type: 'incrementAsync',
            amount: 10
        })

        // 以载荷形式分发
        store.dispatch('incrementAsync', {
            amount: 10
        })
     */
</script>

<script>
    /** 
     * 我们正在进行一系列的异步操作，并且通过提交 mutation 来记录 action 产生的副作用
     */
    actions: {
        checkout ({ commit, state }, products) {
            // 把当前购物车的物品备份起来
            const savedCartItems = [...state.cart.added]
            // 发出结账请求，然后乐观地清空购物车
            commit(types.CHECKOUT_REQUEST)
            // 购物 API 接受一个成功回调和一个失败回调
            shop.buyProducts(
                products,
                // 成功操作
                () => commit(types.CHECKOUT_SUCCESS),
                // 失败操作
                () => commit(types.CHECKOUT_FAILURE, savedCartItems)
            )
        }
    }
</script>

<script>
    /** 
     * 在组件中分发 Action
     * 
     * 你在组件中使用 this.$store.dispatch('xxx') 分发 action，
     * 或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
     */

    import { mapActions } from 'vuex';
    
    export default {
        // ...
        methods: {
            ...mapActions([
                'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

                // `mapActions` 也支持载荷：
                'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
            ]),
            ...mapActions({
                add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
            })
        }
    }
</script>

<script>
    /** 
     * 组合 Action
     */

    /** 
     * Action 通常是异步的，那么如何知道 action 什么时候结束呢？
     * 更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？
     * 
     * store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，
     * 并且 store.dispatch 仍旧返回 Promise。
     */
    actions: {
        actionA ({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('someMutation')
                    resolve()
                }, 1000)
            })
        }
    }

    store.dispatch('actionA').then(() => {
        // ...
    });

    // 在另外一个 action 中也可以
    actions: {
        // ...
        actionB ({ dispatch, commit }) {
            return dispatch('actionA').then(() => {
                commit('someOtherMutation')
            })
        }
    }

    // 如果我们利用 async / await，我们可以如下组合 action：
    actions: {
        async actionA ({ commit }) {
            commit('gotData', await getData())
        },
        async actionB ({ dispatch, commit }) {
            await dispatch('actionA') // 等待 actionA 完成
            commit('gotOtherData', await getOtherData())
        }
    }
</script>
