<script>
    /** 
     * https://www.jianshu.com/p/3ce762cabf14
     * 
     * $nextTick的使用
     * 
     * 理解：当你修改了data的值然后马上获取这个dom元素的值，是不能获取到更新后的值，
     * 你需要使用$nextTick这个回调，让修改后的data值渲染更新到dom元素之后在获取，才能成功。
     */

    export default {
        /** 
         * 你修改了show的值，让submenu显示出来，但是你不能马上获取改dom元素的offsetWidth值，这是为什么呢？
         * 
         * 1、 dom更新：在vue中，你修改了data的某一个值，并不会立即反应到该ele中。vue将你对data的更
         * 改放到watcher的一个对列中（异步），只有在当前任务空闲时才会去执行watcher队列任务。这就有一个延迟时间了。
         * 
         * 2、当执行到$nextTick的时候，这是一个异步事件，他也会把这个事件放到一个队列当中，异步事件是
         * 不会立即执行的代码，会被js处理器放到一个队列里，按照队列的顺序优先级等一个个按次序执行，
         * 新添加的事件都会放在队列末尾。所以，当第一个也就是data的修改执行渲染在页面之后，
         * 这个时候执行$nextTick，就肯定能获取dom的东西la。
         * 
         * 3、同理也是，创建一个setTimeout，他也会放到队列中，当上一个事件执行完之后，
         * 才会这个他这个事件，才会执行他里面的回调，也就能成功获取啦。
         */
        methods: {
            openSubmenu() {
                this.show = true
                let w = this.$refs.submenu.offsetWidth;
                console.log(w)
                //获取不到宽度
                this.$nextTick(() => {
                    //这里才可以
                    let w = this.$refs.submenu.offsetWidth;
                    console.log(w);
                });
            }
        },
    }
</script>
