<script>
    /** 
        vue中使用样式
     */
    /** 
        对class的操作

        (1) 数组
        <div id='app'>
            <!-- 传入一个数组，里面存放的是字符串 -->
            <h1 :class="['thin', 'red']">这是一个很大的H1</h1>
        </div>

        (2) 在数组中使用三元表达式
        <h1 :class="['thin', 'red', flag ? 'active' : '']"></h1>

        (3) 在数组中使用对象来代替三元表达式，此方式可以提高可读性
        <h1 :class="['thin', 'red', { 'active': flag }]"></h1>

        (4) 在:class中直接使用对象
        <h1 :class="{ red: true, thin: true, active: flag }"></h1>

        const vm = new Vue({
            data: {
                flag: true
            }
        });
     */
     /** 
        使用内联样式

        (1) 直接在元素上通过 :style，书写样式对象
        <h1 :style="{ color: 'red', font-size: '40px' }"></h1>

        (2) 在元素属性中通过属性绑定的方式
        <h1 :style="[ styleObj1, styleObj2 ]"></h1>

        const vm = new Vue({
            data: {
                styleObj1: { color: 'red' },
                styleObj2: { font-size: '40px' }
            }
        });
      */
</script>