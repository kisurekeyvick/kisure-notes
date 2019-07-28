<script>
    /** 
     * vuex中的Getter，通过getter，在computed中调用返回对应的state
     * 
     * 有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：
     */
    computed: {
        doneTodosCount () {
            return this.$store.state.todos.filter(todo => todo.done).length
        }
    }

    // 如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

    /** 
     * Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。
     * 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
     */

    const store = new Vuex.Store({
        state: {
            todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
            ]
        },
        getters: {
            doneTodos: state => {
            return state.todos.filter(todo => todo.done)
            }
        }
    })

    // 通过属性访问
    // Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：
    // store.getters.doneTodos

    /** 
     * Getter 也可以接受其他 getter 作为第二个参数
     * 
        getters: {
            // ...
            doneTodosCount: (state, getters) => {
                return getters.doneTodos.length
            }
        }

        我们可以很容易地在任何组件中使用它：

        computed: {
            doneTodosCount () {
                return this.$store.getters.doneTodosCount
            }
        }

        getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。
     */

    /** 
     * 通过方法访问
     * 
     * 你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
     * 
        getters: {
            // ...
            getTodoById: (state) => (id) => {
                return state.todos.find(todo => todo.id === id)
            }
        }

        store.getters.getTodoById(2)

        注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
     */

    /** 
     * mapGetters 辅助函数
     * 
     * mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性:
     */
    import { mapGetters } from 'vuex'
    export default {
        // ...
        computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
            ...mapGetters([
                'doneTodosCount',
                'anotherGetter',
                // ...
            ])
        }
    }

    // 如果你想将一个 getter 属性另取一个名字，使用对象形式
    mapGetters({
        // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
        doneCount: 'doneTodosCount'
    })
</script>
