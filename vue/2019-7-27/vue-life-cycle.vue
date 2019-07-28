<script>
    /** 
     * https://www.jianshu.com/p/0d50ea1cef93?utm_source=oschina-app
     * 
     * Vue 生命周期方法和介绍
     * 
     * 1、creating 状态--vue 实例被创建的过程
     * 2、mounting 状态--挂到到真实的 DOM 节点
     * 3、updating 状态--如果 data 中的数据改变就会触发对应组件的重新渲染
     * 4、destroying 状态--实例销毁
     */

    /** 
     * (1) beforeCreate(creating 状态)
     *      实例创建之前调用
     * 
     * (2) created(creating 状态)
     *      实例创建成功，此时 data 中的数据显示出来了
     * 
     * (3) beforeMount(mounting 状态)
     *      数据中的 data 在模版中先占一个位置
     * 
     * (4) mounted(mounting 状态)
     *      模版中的 data 数据直接显示出来了
     * 
     * (5) beforeUpdate(updating 状态)
     *      当 data 数据发生变化调用，发生在虚拟 DOM 重新渲染和打补丁之前
     * 
     * (6) updated(updating 状态)
     *      数据更改导致的虚拟 DOM 重新渲染和打补丁
     * 
     * (7) beforeDestroy(destroying 状态)
     *      在 vue 实例销毁之前调用，此时实例任然可用
     * 
     * (8) destroyed(destroying 状态)
     *      在 vue 实例销毁之后调用，vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
     */

    /** 
     * 当代码运行的时候，依次调用 Vue 的 beforeCreate、created、beforeMount、mounted 四个方法直至完成组件的挂载
     * 
        <div id="container">
            <button @click="changeMsg()">change</button>
            <span>{{msg}}</span>
        </div>
     * 
     * (1) 什么是挂载？
     *      在 Vue 中指的就是 el 被实例的 vm.$el 所替换，并且挂载到该实例中。
     *      通俗的说就是　Vue 的实例挂靠到某个 DOM 元素「挂载点」的这一个过程。
     *      在上面的例子中就是把 Vue 的实例挂靠到 id 为 container 的 div 元素上。
     * 
     *      也就是说使用 vm.$el 就相当于使用了 document.getElementById('container') 来找到这个元素了。
     *      
     *      
     *      vue中渲染html的方式有三种
     *      I: 
     *          <div id="container">
                    <button @click="changeMsg()">change</button>
                    <span>{{msg}}</span>
                </div>

                <script type="text/javascript">
                    var vm = new Vue({
                        el:'#container',
                        data:{
                            msg:'TigerChain'
                        }
                    });
     * 
     *      II:
     *          在vue中添加template
     *          
                <script type="text/javascript">
                    var vm = new Vue({
                        el:'#container',
                        data:{
                            msg:'TigerChain'
                        },
                        methods: {
                            changeMsg() {
                                this.msg = 'TigerChain'+parseInt(10*Math.random());
                            }
                        },
                        // 添加一个模版
                        template:"<h4>{{'template 中的 msg:'+this.msg}}</h4>",
                    });

                当 template 和 div 中的 container 中的 html 同时出现的时候，优先使用 template

     *      III:
     *          在　vue　中我们直接可以调用　render 函数来渲染一个页面
     * 
                // 使用 render 方法来渲染模版
                render(h){
                    return h('h4', "这是render 方法渲染出来的")
                },
     * 
     *      总结：
     *      render 函数的优先级 > template 模版 > outerhtml
     * 
     * (2) 
     *      I：beforeMount 和 mounted 生命周期函数
     *      <div id="container">
                <button @click="changeMsg()">change</button>
                <span>{{msg}}</span>
            </div>

            在挂载之前数据使用 {{msg}} 占位，这就是虚拟 DOM 的优势，先把坑占了。
            加载到数据，在挂载之后，{{msg}} 被真实的数据替换了
     *          
     * 
     *      II：在 beforeDestroy 阶段，Vue 实例是完全可以使用的，当调用了 destroyed Vue 实例就会解除所有绑定，
     *      所有事件被移除，子组件被销毁，所以以当 destroyed方法执行了以后，再点击界面上的 change 就再也没有效果了
     * 
     * (3) 了解生命周期的作用
     *      我们以在不同的生命周期方法中做不同的操作处理:
     *      一般情况下我们在 beforecreate 方法中可以加 Loading 事件，在 created 方法中结束 Loading，
     *      并且还可以在此方法中做一些初始化操作，在 mounted 方法中进行发起异步服务端请求。
     *      当然，如果你想页面没有加载完成就请求数据那么在 created 方法请求数据也没有什么问题，
     *      可以在 beforeDestroy 方法中弹出确认删除，destroyed 中清除相关数据达到资源的有效利用。
     */
</script>
