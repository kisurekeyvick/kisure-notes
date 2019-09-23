# 这个是KISURE的笔记，在以后的2-3年内会不断更新
- 记录js底层实现原理，追求新技术的探索

# 前端脚手架
```
├── vue-cli
│   ├── 2019-8-27
│       ├── cli.js                  关于一些前端脚手架的介绍，入门
│       ├── cli-init.js             脚手架初始化
│       ├── cli-params.js           命令行工具参数设计
│       ├── cli-template.js         输入命令加载对应的模板
│
```

# NodeJs文件目录说
```
├── nodeJs
│   ├── 2019-8-26
│       ├── progress.js             nodejs progress 进程
│       ├── stream-readable.js      nodejs流：readable
│       ├── stream-writable.js      nodejs流：writable
│
│   ├── 2019-8-25
│       ├── __dirname-and-__filename.js     __dirname 和 ./ 的区别, __filename
│       ├── event-and-util.js       nodejs中的event事件，util工具
│       ├── fs.js                   nodejs中的文件系统
│       ├── stream.js               nodejs中流的简单介绍
│
│   ├── 2019-8-21
│       ├── fs-stream.js            nodejs文件系统简单介绍
│ 
│   ├── 2019-8-20
│       ├── common.js               commonjs是js的规范，对commonjs的介绍
│       ├── npm_fs.js               npm的介绍和fs文件系统的尝试
│ 
│   ├── 2019-8-19
│       ├── http.js                 nodejs的http
│
│   ├── 2019-8-18              
│       ├── directory-traversal.js  遍历目录(递归算法, 遍历算法, 同步遍历, 异步遍历, 文本编码, 单字节编码)
│       ├── network.js              网络操作（http模块， url模块）
│
│   ├── 2019-8-17
│       ├── file.js                 nodejs文件系统
│
│   ├── 2019-8-16
│       ├── base.js                 nodejs基础入门必备知识
│       ├── organization&deployment.js      模块路径解析规则, package包, 工程目录
│  
```

# H5文件目录说明
```
├── h5
│   ├── viewport.js  关于Html5的适配
│ 
```

# React文件目录说明
```
├── react
│   ├── 2019-9-9
│       ├── react-interface.tsx (下)            react typescript   类组件，高阶组件泛型
│
│   ├── 2019-9-9
│       ├── react-interface.tsx (中)            react typescript   类组件，高阶组件泛型
│
│   ├── 2019-9-8
│       ├── react-interface.tsx (上)            react typescript   函数组件
│       ├── react.forwardRef.tsx                react.createRef 和 react.forwardRef
│       ├── react-hooks.tsx                     useEffect,useState,useMemo,useReducer,useContext
│       
│   ├── 2019-8-23                               react v16.9的一些更改
│
│   ├── 2019-7-15
│       ├── react-fiber.js(下)                  浅谈 React Fiber 架构(二)
│       │
│
│   ├── 2019-7-14
│       ├── react-fiber.js(上)                  浅谈 React Fiber 架构(一)
│       │
│
│   ├── 2019-7-12
│       ├── react-component-optimize.js         可能你的react函数组件从来没有优化过(函数组件React.memo，useCallback)
│       │
│
```

# Vue文件目录
```
├── vue
│   ├── 2019-7-28
│       ├── vue-vuex-action.vue         vuex中的action
│       ├── vue-vuex-module.vue         vuex中的module
│
│   ├── 2019-7-28
│       ├── vuex-core-concept.js        vuex的基础概念
│       ├── vue-vuex-state.vue          vuex中的state
│       ├── vue-vuex-getter.vue         vuex中的getter方法，获取计算后的state
│       ├── vue-vuex-mutations.vue      vuex中的mutations,用于更新vuex 的 state，更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
│
│   ├── 2019-7-27
│       ├── vue-v-pre.vue               vue中的指令，跳过这个元素和它的子元素的编译过程
│       ├── vue-is.vue                  vue中is的作用和用法
│       ├── vue.transition.vue          vue中的过渡动画
│
│   ├── 2019-7-26
│       ├── vue.$listener.$attrs.vue     vue中祖孙通讯使用$listener，属性传递使用$attrs
│       ├── vue.$refs.vue                vue中的ref使用
│       ├── vue.$set.vue                 vue中使用$set给对象新增属性
│       
│   ├── 2019-7-23
│       ├── vue.mvvm.vue                vue中针对数组的监听，以及双向绑定
│       ├── vue.$emit.vue               vue实例中使用$emit触发事件，$on监听事件
│       ├── vue.$nextTick.vue           vue中通过v-if/show来控制显示元素，通过$nextTick获取相关元素信息
│       ├── vue.slot.vue                vue中的slot
│
│   ├── 2019-7-20
│       ├── filter.vue                   vue中的过滤器
│       ├── directive.vue                vue中的自定义指令
│
│   ├── 2019-7-19
│       ├── vue-exp.vue                  一些在Vue项目中遇到的问题
│
│   ├── 2019-7-17
│       ├── vue-inner-directive.vue       vue中的一些基础指令认识，v-on的一些事件修饰符（stop,prevent,self这一类的）, vue中唯一内置的双向绑定指令 v-model，
│       ├── vue-class-style.vue           在vue中使用样式，使用class的方式和内联样式
│       ├── vue-for-key.vue               关于vue的 v-for  和对应的key
│
```

# Wechart文件目录说明
```
├── wechart
│   ├── 2019-8-13
│       ├── exp.doc                       微信小程序项目开发总结
│
│   ├── 2019-7-16
│       ├── adapter.js                    微信小程序屏幕适配
│       ├── wechart-optimize.js           小程序的优化（分包，加载优化，首屏，渲染，避免不当使用onPageScroll）
│
│   ├── 2019-7-13
│       ├── component-contact.js          组件之间的通讯与事件
│       ├── component-data-observe.js     微信小程序组件数据监听
│       ├── behaviors.js                  小程序中的behaviors
│       ├── page.js                       微信小程序page页面其中的方法
│
│   ├── 2019-7-12
│       ├── page-data-init.js             微信小程序page初始化data注意事项
│
│   ├── 2019-7-11
│       ├── app.js            微信小程序 全局配置中的app.js 以及在page中获取app实例
│       ├── we-if.js          微信小程序中的wx:if
│       ├── component.js      微信小程序创建公共组件
│       ├── pass-params.js    微信小程序，传参
│       ├── background.js     微信小程序中设置背景图片
│       ├── iconfoot.js       关于微信小程序使用字体图标
│       ├── list-rendering.js  微信列表渲染 wx:for相关
│    
```

# Common文件目录说明
```
├── 2019-9-18
│   ├── useful-web-api.js           一些不常见，但是很有用的web api
│
├── 2019-9-12
│   ├── async-await.js              关于async/await的最佳实践
│
├── 2019-9-9
│   ├── cookie-path-domain.js       cookie中的path和domain,httponly,设置含键值对的cookie
│
├── 2019-8-23
│   ├── debounce-and-throttle.js    节流和去抖动的实现和概念
│   ├── judge-array.js              判断数组的方法，及这些方法间的区别和优劣
│   ├── for.js                      for和forEach循环性能对比分析
│   │
│ 
├── 2019-8-15
│   ├── index.js                    关于spread/rest的特性，关于异步迭代（symbol.iterator）
│   │
│
├── 2019-7-31
│   ├── js-features.js              3个实用有趣的JS特性
│   ├── happiness.js                提升幸福感的几个js技巧
│   │
│
├── 2019-7-16
│   ├── ++[[]][+[]]+[+[]] = 10.js   为什么值为10？
│   │
│   
├── 2019-7-05
│   ├── react-knowledge.js(下)       一些关于react的知识点(提高性能，重载时候保存数据)
│   ├── js-skill.js                  8个关于js的小技巧(数组去重，Array.from，解构，有条件的动态属性)
│   │
│   
├── 2019-7-04
│   ├── react-knowledge.js(上)      一些关于react的知识点(生命周期，fragment，错误边界，非/受控组件，纯函数，
│   │                               命令/声明式编程，函数式编程，虚拟dom)
│
├── 2019-7-02
│   ├── js-engine.js    关于JS引擎的一些介绍
│   ├── memory-manage.js    JavaScript如何工作:内存管理+如何处理4个常见的内存泄漏
│   ├── == and ===.js       关于== 和 ===的知识点
│
├── 2019-7-01
│   ├── js-engine.js    JS引擎:它们是如何工作的?从调用堆栈到Promise，需要知道的所有内容
│   ├── optimize-code.js    如何编写优化的 JavaScript
│
├── 2019-6-30
│   ├── git.js 程序员都要掌握的 Git
│
├── 2019-6-29
│   ├── react-hooks.js  react hooks相关内容
│   ├── react-context-contextType-lazy-supense-memo.js  
│
├── 2019-6-28
│   ├── observer and subscribe.js   观察者模式与发布/订阅模式的区别
│
├── 2019-6-27
│   ├── date.js JS的日期的知识
│
├── 2019-6-25
│   ├── ES2019.js   关于ES10的一些语法
│   ├── web-reflow.js   前端页面优化，减少重排回流的方法
│   ├── html-node.js    动态/静态节点
│   ├── good-web-page.js    一次完整的web请求和渲染过程
│   ├── css-blocking-reason.js  CSS 与 JS 阻塞 DOM 解析和渲染的原理
│   ├── code-style.js       代码风格
│
├── 2019-6-19
│   ├── index.html  关于首屏渲染的动画
│
```
# interview questions
```
├──2019-9-23
│   ├── list.js                 数据结构中关于链表的一些理解
│   ├── js-number-type-reference-type.js    js中的值类型和引用类型
│   ├── sort.js                 排序算法介绍
│
├──2019-9-22
│   ├── http.js                 http请求头，user-agent的了解
│
├── 2019-9-17
│   ├── vue.mvvm.js             关于vue中的mvvm（包括了发布订阅，数据劫持，数据代理，模板编译，observe，computed）
│
├── 2019-9-11
│   ├── set-map-others.js       ES6的Set和Map数据结构、Promise、4种循环遍历的方法及之间的区别、结构赋值
│   ├── http-tcp.js             关于http tcp的认知
│
├── 2019-9-11
│   ├── link-tag.js             link标签中的ref属性：prefetch和preload,as属性，相关的作用
│   ├── call-bind-apply.js      call,apply,bind的理解
│
```