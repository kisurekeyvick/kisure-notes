/** 
 * vuex的基础概念
 */

/** 
 * 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。
 * Vuex 和单纯的全局对象有以下两点不同：
 * 
 * (1) Vuex 的状态存储是响应式的。
 *      当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
 * 
 * (2) 你不能直接改变 store 中的状态。
 *      改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。
 *      这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
 */

/** 
 * 创建一个 store
 * 
 * 需要提供一个初始 state 对象和一些 mutation：
    
    // 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
    const store = new Vuex.Store({
        state: {
            count: 0
        },
        mutations: {
            increment (state) {
                state.count++
            }
        }
    })

    // 现在，你可以通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更：
    store.commit('increment')
    console.log(store.state.count) // -> 1

    再次强调，我们通过提交 mutation 的方式，而非直接改变 store.state.count，是因为我们想要更明确地追踪到状态的变化。
 */