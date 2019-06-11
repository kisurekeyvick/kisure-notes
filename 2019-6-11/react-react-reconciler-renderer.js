/**
 * react、react-reconciler、renderer 三者关系
 */

/**
 * react基础模块： react 基础 API 及组件类，组件内定义 render 、setState 方法和生命周期相关的回调方法，
 * 相关 API 如下：
 */
const React = {
    Children: {},
  
    createRef,
    Component,
    PureComponent,
  
    createContext,
    forwardRef,
  
    Fragment: REACT_FRAGMENT_TYPE,
    StrictMode: REACT_STRICT_MODE_TYPE,
    unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
    unstable_Profiler: REACT_PROFILER_TYPE,
  
    createElement: __DEV__ ? createElementWithValidation : createElement,
    cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement,
    createFactory: __DEV__ ? createFactoryWithValidation : createFactory,
    isValidElement: isValidElement,
};

/**
 * 渲染模块： 针对不同宿主环境采用不同的渲染方法实现
 * 
 * react-dom, react-webgl, react-native, react-art, 依赖 react-reconciler, 注入相应的渲染方法到 reconciler 中，
 * react-dom 中相关的 API 如下：
 */
const ReactDOM: Object = {
    createPortal,
  
    findDOMNode(
      componentOrElement: Element | ?React$Component<any, any>,
    ): null | Element | Text {},
  
    hydrate(element: React$Node, container: DOMContainer, callback: ?Function) {},
  
    render(
      element: React$Element<any>,
      container: DOMContainer,
      callback: ?Function,
    ) {},
  
    unstable_renderSubtreeIntoContainer() {},
  
    unmountComponentAtNode(container: DOMContainer) {},
  
    unstable_batchedUpdates: DOMRenderer.batchedUpdates,
  
    unstable_deferredUpdates: DOMRenderer.deferredUpdates,
  
    unstable_interactiveUpdates: DOMRenderer.interactiveUpdates,
  
    flushSync: DOMRenderer.flushSync,
  
    unstable_flushControlled: DOMRenderer.flushControlled,
}

/**
 * react-reconciler
 * 
 * 核心模块，负责调度算法及 Fiber tree diff, 连接 react 及 renderer 模块，
 * 注入 setState 方法到 component 实例中，在 diff 阶段执行 react 组件中 render 方法，
 * 在 patch(补丁) 阶段执行 react 组件中生命周期回调并调用 renderer 中注入的相应的方法渲染真实视图结构。
 * 
 * 这里我们需要注意，react执行render的时候，会发生diff运算
 */

/** 
 * React Fiber 架构中最重要的 Diff 算法中任务拆分渲染机制，也叫 Async Rendering, 
 * 如果项目中已经升级到 react 最新版本，在不变动项目代码默认还是采用的是同步渲染机制，只是使用了新的架构
 * 
    调用 ReactDom.render() 方法时会调用此方法
    默认 isAsync = false

    function legacyCreateRootFromDOMContainer(container, forceHydrate) {
      var isAsync = false;
      return new ReactRoot(container, isAsync, shouldHydrate);
    }
 */

