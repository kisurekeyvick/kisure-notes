<script>
    /** 
     * https://segmentfault.com/a/1190000017262264
     * 
     * vue中is的作用和用法
     */

    // 总所周知，ul里面嵌套li的写法是html语法的固定写法（还有如table,select等）。
    /** 
        <ul>
            <my-component></my-component>
            <my-component></my-component>
        </ul>

        存在的问题： my-component是我们自己写的组件，但是html在渲染dom的时候，my-component对ul来说并不是有效的dom，甚至会报错。

        正是因为html模板的限制，于是就诞生了is。接下来我们就用is解决上面的问题~
     */

    /** 
     * is的诞生
     * 正是因为html模板的限制，于是就诞生了is。接下来我们就用is解决上面的问题~
     * 
        <ul>
            <li is='my-component'></li>
        </ul>

        首先你得注册my-component组件，全局或者局部都成。 
        <li is='my-component'></li>其实就相当于<my-component></my-component>，语义上是一样一样的，就是解决了html模板的限制。
     */

    /** 
     * is的用法
     * 
     * <!-- 组件会在 `件名` 改变时改变 -->
     * <component :is="组件名变量"></component>
     * 
     * 只要在data里弄个变量，给变量赋值就能动态的切换组件。这个其实在某些场景还是非常好用的安利一下。
     */
</script>
