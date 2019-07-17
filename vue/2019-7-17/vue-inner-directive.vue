<script>
/** 
    https://www.jianshu.com/p/f56cde007210?utm_source=oschina-app
    (1) v-cloak
        不需要表达式
        解决内容：当网络较慢，网页还在加载 Vue.js ，而导致 Vue 来不及渲染，这时页面就会显示出 Vue 源代码。
                我们可以使用 v-cloak 指令来解决这一问题。
        用法: 
            <div id="app" v-cloak>
                {{context}}
            </div>

            [v-cloak]{
                display: none;
            }

            在简单项目中，使用 v-cloak 指令是解决屏幕闪动的好方法。
            但在大型、工程化的项目中（webpack、vue-router）只有一个空的 div 元素，元素中的内容是通过路由挂载来实现的，这时我们就不需要用到 v-cloak 指令咯。

    https://blog.csdn.net/u014541501/article/details/78181729
    (2) vue中v-text，v-html, v-model, {{}}之间的异同
        1.v-text和{{}}的区别
            v-text默认是不存在闪烁的问题，
            v-text是用于操作纯文本，它会替代显示对应的数据对象上的值。当绑定的数据对象上的值发生改变，插值处的内容也会随之更新。
            例如：<p v-text='msg'>hello kisure</p> vue解析到v-text指令的时候，会将'hello kisure'这个内容替换成 msg的内容。

        2.v-html可以渲染模板字符串
            它与v-text区别在于v-text输出的是纯文本，浏览器不会对其再进行html解析，但v-html会将其当html标签解析后输出。
            <div id="app">
                <p v-html="html"></p>
            </div>

            let app = new Vue({
                el: "#app",
                data: {
                    html: "<b style='color:red'>v-html</b>"
                }
            });

        3.v-model通常用于表单组件的绑定，例如input，select等。
            它与v-text的区别在于它实现的表单组件的双向绑定，如果用于表单控件以外标签是没有用的。

        4.{{}}是v-text的一种简写形式

    （3）v-bind是vue用于绑定属性的指令
        案例：<input type='button' value='按钮' v-bind:title='title + "hello nice fish"'>

        const vm = new Vue({
            el: '...',
            data: {
                title: '这是一个title'
            }
        });

        v-bind会将":"后面的表达式进行计算，然后以将结果赋值给title属性

        当然我们也可以用简写的方式：<input type='button' value='按钮' :title='title + "hello nice fish"'>

        也就是说，我们可以将v-bind指令简写成:的形式

        当然，我们也可以绑定一个对象： <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

    (4) v-on指令定义vue中的事件
        案例：<input type='button' value='按钮' v-bind:title='title' v-on:click='' />
        如果我们写成：v-on:click='alert('nice fish')'   vue是识别不了alert的，因为写在引号中的内如，vue会把它当做一个变量，
            如果在程序中找不到对应的变量，那么就会报错。

        <button v-on:click="doThis"></button>
        缩写： <button @click="doThis"></button>
        动态事件缩写 (2.6.0+)：<button @[event]="doThis"></button>
        停止冒泡：<button @click.stop="doThis"></button>
        键修饰符，键代码：<input @keyup.enter="onEnter">
        击回调只会触发一次：<button v-on:click.once="doThis"></button>
        对象语法 (2.4.0+)：<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>


    (5) vue中的一些事件修饰符
        .stop       阻止事件冒泡，调用 event.stopPropagation()
        .prevent    阻止默认事件，调用 event.preventDefault()
        .once       事件只会触发一次
        .capture    添加事件侦听器时使用 capture 模式（事件捕获模式）
        .self       只当事件在该元素本身（例如不是子元素）触发时触发回调

        I: 关于.stop的用法范围
        <div class='inner' @click='innerClick'>
            <input class='button' @click='btnClick' value='点击' />
        </div>
    
        寻常的，如果我们点击按钮，那么就会先触发执行btnClick，然后再执行innerClick。

        如果我们给@click修改为：@click.stop，那么当我们点击input的时候，innerClick是不会被触发的，因为
            stop的作用是阻止事件冒泡

        II：关于.prevent的用法范围
        <a href='http://www.baidu.com' @click.prevent='linkClick'></a>
        如果我们不添加prevent的话，那么点击以后，会默认直接跳转到百度这个网址上去

        III：关于.capture的用法范围
        <div class='inner' @click.capture='innerClick'>
            <input class='button' @click='btnClick' value='点击' />
        </div>
        如果我们点击内容的时候，想先触发div，然后再触发input，那么我们可以给div的@click添加.capture
        那么div的点击事件就会先被触发，然后再触发input的事件

        V：关于.self的用法范围
        <div class='inner' @click.self='innerClick'>
            <input class='button' @click='btnClick' value='点击' />
        </div>
        那么当我们点击input按钮的时候，只会触发btnClick事件，而如果要触发innerClick，那么就需要点击div才会触发

        VI：关于.once的用法范围
        <a href='http://www.baidu.com' @click.prevent.once='linkClick'>点击跳转</a>
        当我们第一次点击的时候，会阻止默认事件跳转，当我们点击第二次的时候（因为once只会执行一次），那么
        a就会直接跳转到百度页面上去

        VII：关于.self和.stop之间的区别
        <div class='outer' @click='outerClick'>
             <div class='inner' @click.self='innerClick'>
                <input class='button' @click='btnClick' value='点击' />
            </div>
        </div>
        当我们点击input按钮的时候，btnClick和 outerClick会触发，但是innerClick不会触发，因为@click.self代表的是
        只有点击自己才会触发

    (6) vue中唯一的双向绑定指令：v-model
        v-bind只能实现数据的单项绑定，也就是：Model层自定绑定到View层

        v-model能够将Model渲染到view中，同时也能从view中更新对应的Model 
 */
</script>