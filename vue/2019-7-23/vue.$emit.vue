<template>
  <div>
      <p @click='emit'>{{msg}}</p>
  </div>
</template>

<script>
    /** 
     * https://juejin.im/post/5bd97e7c6fb9a022852a71cf#heading-43
     * 
     * 每个 Vue 实例都实现了事件接口：
     * (1) 使用 $on(eventName) 监听事件
     * (2) 使用 $emit(eventName) 触发事件
     * 
     * 如果把Vue看成一个家庭（相当于一个单独的components)，女主人一直在家里指派($emit)男人做事，
     * 而男人则一直监听($on)着女士的指派($emit)里eventName所触发的事件消息，一旦 $emit 事件一触发，
     * $on 则监听到 $emit 所派发的事件，派发出的命令和执行派执命令所要做的事都是一一对应的。
     * 
     * 
     * 
     * vm.$emit( event, […args] )
     * 触发当前实例上的事件。附加参数都会传给监听器回调
     * 
     * 
     * vm.$on( event, callback )
     * 监听当前实例上的自定义事件。事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。
     * 
     */

    export default {
        name: 'demo',
        data () {
            return {
                msg : '点击后女人派发事件'
            }
        },
        created () {
            this.$on('wash_Goods',(arg)=> {
                console.log(arg)
            });

            /** 当然也可以用数组的方式进行监听 */
            this.$on(['wash_Goods','drive_Car'],(arg)=> {
                console.log('事真多')
            });
        },
        methods : {
            emit () {
                this.$emit('wash_Goods',['fish',true,{name:'vue',verison:'2.4'}])
            },
            
        }
    }

    /** 
     * 总结：
     * $emit的（eventName）是与 $on(eventName) 是一一对应的
     * $emit 和 $on 必须都在实例上进行触发和监听
     */
</script>

<template>
    <div id="counter-event-example">
        <p>{{ total }}</p>
        <button-counter v-on:increment="incrementTotal"></button-counter>
        <button-counter v-on:increment="incrementTotal"></button-counter>
    </div>
</template>

<script>
    /** 
     * v-on 与 $emit 的关系
     * 
     * 父组件可以在使用子组件的引入模板直接用 v-on 来监听子组件触发的事件
     * $emit和$on只能作用在一一对应的同一个组件实例，而v-on只能作用在父组件引入子组件后的模板上
     * 
     * 例如：<children v-on:eventName="callback"></children>
     */
    // 组件： button-counter
    export default {
        data: function () {
            return {
                counter: 0
            }
        },
        methods: {
            incrementCounter: function () {
            this.counter += 1
            this.$emit('increment')
            }
        }
    }

    // 父组件：counter-event-example 
    export default {
        data: {
            total: 0
        },
        methods: {
            incrementTotal: function () {
                this.total += 1
            }
        }
    }

    /** 
     * 总结：
     * 
     * 这样的好处在哪里？虽然 Vue 是进行数据单向流的，但是子组件不能直接改变父组件的数据
     * 标准通用明了的用法，则是通过父组件在子组件模板上进行一个 v-on 的绑定监听事件，同时再写入监听后所要执行的回调
     * 
     * 在counter-event-example父组件里，声明了两个button-count的实列，通过 data 用闭包的形式，
     * 让两者的数据都是单独享用的，而且v-on 所监听的 eventName 都是当前自己实列中的 $emit 触发的事件，
     * 但是回调都是公用的一个 incrementTotal 函数，因为个实例所触发后都是执行一种操作！
     * 
     * 
     * 如果你只是想进行简单的进行父子组件基础单个数据进行双向通信的话，在模板上通过 v-on 和所在监听的模板实例上进行 $emit 触发事件的话，
     * 未免有点多余。通常来说通过 v-on 来进行监听子组件的触发事件的话，我们会进行一些多步操作。
     * 
     * 
     * 
     */
</script>

