<script>
    /** 
     * https://blog.seosiwei.com/detail/36
     * 
     * Vue的watch实现原理及其实现方式
     */

    // watch的简单工作流程
    /** 
           let vm = new Vue(...)        初始化watcher ->      let watcher = new Watcher()     ->      initData(vm)
                                                            Dep.target = watcher                    初始化data数据



            |   初始化watch                                                                             |  收集data依赖


                                                                                                                    
            initWatch(wm, opt.watch)                收集watch依赖 ->                                new Observer(...)
                初始化watch                                                                         Object.defineProperty   get/set
            let watcher = new Watcher(...)                                                          get 收集依赖
                Dep.target = watcher                                                                set 触发更新
    */

</script>
