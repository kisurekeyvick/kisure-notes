/** 
 * (1) 最新弃用
 *  React v16.9 不包含破坏性更改，而且旧的生命周期方法在此版本依然沿用
 *  但是，当你在新版本中使用旧的生命周期方法时，控制台会给予警告。
 * 
 *  2018年，React 宣布 unsafe 生命周期方法重命名为
 *  componentWillMount          → UNSAFE_componentWillMount
 *  componentWillReceiveProps   → UNSAFE_componentWillReceiveProps
 *  componentWillUpdate         → UNSAFE_componentWillUpdate
 */

/** 
 * (2) 使用 <React.Profiler> 进行性能评估
 *  
 * 如何帮助开发人员发现项目中的性能瓶颈？
 * v16.9中存在<React.Profiler>，主要用于大型项目中进行跟踪性能
 * 
 * <Profiler> 测量 React 应用程序渲染的频率以及渲染的 "成本" 。其目的是帮助识别应用程序中渲染缓慢的部分，并且可能更益与 memoization 等优化 。 
 * 
 * 使用方式：
 * 可以将 <Profiler> 添加到 React 项目中的任意一个子树上，来测量该子树的渲染成本。
 * 它需要两个 props ：id (string) 和 onRender 回调(function)，
 * 当树中的组件"提交"更新时，React 将调用它。
 * 
    render(
        <Profiler id="application" onRender={onRenderCallback}>
            <App>
                <Navigation {...props} />
                <Main {...props} />
            </App>
        </Profiler>
    );
 * 
 * 注意：Profiler 会增加一些额外的开销，因此在生产构建中禁止使用它。
 */
