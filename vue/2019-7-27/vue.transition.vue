<script>
    /** 
     * vue之transition页面跳转动画
     */

    /** 
     * https://blog.csdn.net/sinat_42664398/article/details/89765025
     * 
     * <transition>标签有两个属性，name 属性和 mode 属性。
     * 
     * transition里的 name 值fade 就是 .fade-enter-active,类名开头的 fade
     * 

       <transition name="fade" mode="out-in">
            <router-view/>
            <router-view class="left" name="nav" />
            <router-view class="right" name="con" />
        </transition>
            
        .fade-enter-active, .fade-leave-active {
            transition:opacity .4s;
        }

        .fade-enter, .fade-leave-to {
            opacity:0;
        }
     */

    // 页面动画用transition这个api

    /** 
     * https://www.jianshu.com/p/a60875deab4e
     * 
       <template>
            <div id="app">
                <!--<HeadNav></HeadNav>-->
                <div id="main">
                    <transition :name="transitionName">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </template>

        export default {
            name: 'App',
            data(){
                return{
                    transitionName:''
                }
            },
            components:{
            },
            watch: {
                '$route' (to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right';
                }
            }
        }

        .slide-right-enter-active,
        .slide-right-leave-active,
        .slide-left-enter-active,
        .slide-left-leave-active {
            will-change: transform;
            transition: all .5s;
            position: absolute;
        }
        .slide-right-enter {
            opacity: 0;
            transform: translate3d(-100%, 0, 0);
        }
        .slide-right-leave-active {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
        }
        .slide-left-enter {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
        }
        .slide-left-leave-active {
            opacity: 0;
            transform: translate3d(-100%, 0, 0);
        }
     */

</script>

<script>
    /** 
     * https://www.jianshu.com/p/3253cf7e1378
     * 
     * Vue - 过渡与动画 transition
     */

    /** 
     * transition钩子函数：
     * 
     * 此处使用了贝塞尔曲线，在css那里：transition: 1s cubic-bezier(.22,.85,.59,1.08)
     * https://cubic-bezier.com/#.22,.85,.59,1.08
     * 
       
        <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
            v-on:enter-cancelled="enterCancelled"
            v-on:before-leave="beforeLeave"
            v-on:leave="leave"
            v-on:after-leave="afterLeave"
            v-on:leave-cancelled="leaveCancelled"
        >
        </transition>

        methods: {
            // 过渡进入
            // 设置过渡进入之前的组件状态
            beforeEnter: function (el) {
                // ...
            },
            // 设置过渡进入完成时的组件状态
            enter: function (el, done) {
                // ...
                done()
            },
            // 设置过渡进入完成之后的组件状态
            afterEnter: function (el) {
                // ...
            },
            enterCancelled: function (el) {
                // ...
            },
            // 过渡离开
            // 设置过渡离开之前的组件状态
            beforeLeave: function (el) {
                // ...
            },
            // 设置过渡离开完成时地组件状态
            leave: function (el, done) {
                // ...
                done()
            },
            // 设置过渡离开完成之后的组件状态
            afterLeave: function (el) {
                // ...
            },
            // leaveCancelled 只用于 v-show 中
            leaveCancelled: function (el) {
                // ...
            }
        }

        //通过vuex获取state.ball数据
        computed: {
            ball () {
                return this.$store.state.ball
            }
        }

        <transition name="ball" //自定义过渡类名通过 name=‘’
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @css="true"
        >
            <div class="addcart-mask" v-show="ball.show">
                <img class="mask-item"/>
            </div>
        </transition>

        //利用钩子函数写了一些相关的飞入购物车的代码
        beforeEnter (el) {
            // 通过浏览器方法获取所有按钮的位置
            let rect = this.ball.el.getBoundingClientRect()
            // 获取购物车的位置
            let rectEL = document.getElementsByClassName('ball-rect')[0].getBoundingClientRect()
            // 拿到当前小球
            let ball = document.getElementsByClassName('mask-item')[0]
            // 计算按钮和购物车之间的差值
            let x = (rectEL.left + 16) - (rect.left + rect.width / 2)
            // 距离顶部的差值
            let y = rect.top + rect.height / 2 - rectEL.top + 5 - 16
            el.style.transform = 'translate3d(0,' + y + 'px,0)'
            ball.style.transform = 'translate3d(-' + x + 'px,0,0)'
            ball.src = this.ball.img
        },
        enter (el) {
            let a = el.offsetHeight
            el.a = a
            el.style.transform = 'translate3d(0,0,0)'
            document.getElementsByClassName('mask-item')[0].style.transform = 'translate3d(0,0,0)'
        },
        afterEnter () {
            this.ball.show = false
        }

        //通过贝塞尔曲线实现飞入时是曲线的效果
        .ball-enter-active{
            transition: 1s cubic-bezier(.22,.85,.59,1.08)
        }
        .ball-enter-active .mask-item{
            transition: 1s cubic-bezier(0,0,0,0)
        }
     */
</script>

