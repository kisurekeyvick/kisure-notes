# 这个是KISURE的笔记，在以后的2-3年内会不断更新
- 记录js底层实现原理，追求新技术的探索

# H5文件目录说明
```
├── h5
│   ├── viewport.js  关于Html5的适配
│ 
```

# react文件目录说明
```
├── react
│   ├── 2019-9-8
│       ├── react-interface.tsx                 react typescript
│       ├── react.forwardRef.tsx                react.createRef 和 react.forwardRef
│       ├── react-hooks.tsx                     useEffect,useState,useMemo,useReducer,useContext
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

# vue文件目录
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

# wechart文件目录说明
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