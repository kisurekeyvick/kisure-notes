/** 
 * https://mp.weixin.qq.com/s?__biz=MzI0MTUxOTE5NQ==&mid=2247484010&idx=1&sn=18920137bdd7896d3cd48de61532bdf3&scene=21#wechat_redirect
 * react的diff算法
 * 
 * React 分别对 tree diff、component diff 以及 element diff 进行算法优化，
 */

/** 
 * (1) tree diff
 * 
 * 两棵树只会对同一层次的节点进行比较。
 * 当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。
 * 
 * 而当出现节点跨层级移动时(例如移动A节点)，react最终会以 A 为根节点的树被整个重新创建     
 */

/** 
 * (2) component diff
 * 
 * React 是基于组件构建应用的
 * - 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree
 * - 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
 * - 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，
 *      因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。
 * 
 * 当 component D 改变为 component G 时，即使这两个 component 结构相似，一旦 React 判断 D 和 G 是不同类型的组件，
 * 就不会比较二者的结构，而是直接删除 component D，重新创建 component G 以及其子节点。
 * 虽然当两个 component 是不同类型但结构相似时，React diff 会影响性能，但正如 React 官方博客所言：不同类型的 component 是很少存在相似 DOM tree 的机会，
 * 因此这种极端因素很难在实现开发过程中造成重大影响的
 */

/** 
 * (3) element diff
 * 
 * 当节点处于同一层级时，React diff 提供了三种节点操作,分别为:插入,移动,删除
 * 
 * 老集合中包含节点：A、B、C、D，更新后的新集合中包含节点：B、A、D、C，
 * 新老集合进行 diff 差异化对比，通过 key 发现新老集合中的节点都是相同的节点，因此无需进行节点删除和创建，只需要将老集合中节点的位置进行移动，更新为新集合中节点的位置
 * 此时 React 给出的 diff 结果为：B、D 不做任何操作，A、C 进行移动操作，即可
 * 
 * - 源码分析
 * 首先对新集合的节点进行循环遍历，for (name in nextChildren)，通过唯一 key 可以判断新老集合中是否存在相同的节点，
 * if (prevChild === nextChild)，如果存在相同节点，则进行移动操作，但在移动前需要将当前节点在老集合中的位置与 lastIndex 进行比较，
 * if (child._mountIndex < lastIndex)，则进行节点移动操作，否则不执行该操作。这是一种顺序优化手段，
 * lastIndex 一直在更新，表示访问过的节点在老集合中最右的位置（即最大的位置）。
 * 
 * 如果新集合中当前访问的节点比 lastIndex 大，说明当前访问节点在老集合中就比上一个节点位置靠后，则该节点不会影响其他节点的位置，
 * 因此不用添加到差异队列中，即不执行移动操作，只有当访问的节点比 lastIndex 小时，才需要进行移动操作。
 * 
 * - 通过【虚拟dom对比.jpg】示例分析：
 * (1) 从新集合中取得 B，判断老集合中存在相同节点 B，通过对比节点位置判断是否进行移动操作，B 在老集合中的位置 B._mountIndex = 1，
 * 此时 lastIndex = 0，不满足 child._mountIndex < lastIndex 的条件，因此不对 B 进行移动操作；
 * 更新 lastIndex = Math.max(prevChild._mountIndex, lastIndex)，其中 prevChild._mountIndex 表示 B 在老集合中的位置，
 * 则 lastIndex ＝ 1，并将 B 的位置更新为新集合中的位置 prevChild._mountIndex = nextIndex，
 * 此时新集合中 B._mountIndex = 0，nextIndex++ 进入下一个节点的判断。
 * 
 * (2) 从新集合中取得 A，判断老集合中存在相同节点 A，通过对比节点位置判断是否进行移动操作，A 在老集合中的位置 A._mountIndex = 0，
 * 此时 lastIndex = 1，满足 child._mountIndex < lastIndex 的条件，因此对 A 进行移动操作 enqueueMove(this, child._mountIndex, toIndex)，
 * 其中 toIndex 其实就是 nextIndex，表示 A 需要移动到的位置；更新 lastIndex = Math.max(prevChild._mountIndex, lastIndex)，
 * 则 lastIndex ＝ 1，并将 A 的位置更新为新集合中的位置 prevChild._mountIndex = nextIndex，此时新集合中 A._mountIndex = 1，nextIndex++ 进入下一个节点的判断。
 * 
 * (3) 从新集合中取得 D，判断老集合中存在相同节点 D，通过对比节点位置判断是否进行移动操作，D 在老集合中的位置 D._mountIndex = 3，
 * 此时 lastIndex = 1，不满足 child._mountIndex < lastIndex 的条件，因此不对 D 进行移动操作；
 * 更新 lastIndex = Math.max(prevChild._mountIndex, lastIndex)，则 lastIndex ＝ 3，
 * 并将 D 的位置更新为新集合中的位置 prevChild._mountIndex = nextIndex，此时新集合中 D._mountIndex = 2，nextIndex++ 进入下一个节点的判断。
 * 
 * (4) 从新集合中取得 C，判断老集合中存在相同节点 C，通过对比节点位置判断是否进行移动操作，C 在老集合中的位置 C._mountIndex = 2，
 * 此时 lastIndex = 3，满足 child._mountIndex < lastIndex 的条件，因此对 C 进行移动操作 enqueueMove(this, child._mountIndex, toIndex)；
 * 更新 lastIndex = Math.max(prevChild._mountIndex, lastIndex)，则 lastIndex ＝ 3，并将 C 的位置更新为新集合中的位置 prevChild._mountIndex = nextIndex，
 * 此时新集合中 C._mountIndex = 3，nextIndex++ 进入下一个节点的判断，由于 C 已经是最后一个节点，因此 diff 到此完成。
 */

/** 
 * (4) 总结
 * 
 * - React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；
 * - React 通过分层求异的策略，对 tree diff 进行算法优化
 * - React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；
 * - React 通过设置唯一 key 的策略，对 element diff 进行算法优化；
 */
