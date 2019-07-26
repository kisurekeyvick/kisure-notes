<script>
    /** 
     * (1) vue中的实例属性：$attrs和inheritAttrs的使用
     * (2) vue中的$listener
     */
</script>

<script>
    /** 
     * https://www.jianshu.com/p/ce8ca875c337
     * 
     * vue中的实例属性：$attrs和inheritAttrs的使用
     * 
     * 首先我们需要知道使用场景：
     * vue中一个比较令人烦恼的事情是属性只能从父组件传递给子组件。
     * 这也就意味着当你想向嵌套层级比较深组件数据传递，只能由父组件传递给子组件，子组件再传递给孙子组件。
     * 
     * 假如我们需要传递的属性只有1,2个还行，但是如果我们要传递的有几个或者10来个的情况，
     * 这会是什么样的场景，我们会在每个组件不停的props，每个必须写很多遍。
     * 有没有其它方便的写法？
     * 
     * 有，通过vuex的父子组件通信，的确这个是一个方法，但是还有其它的方法，这个就是我们要说的。
     * 通过inheritAttrs选项，以及实例属性$attrs。
     */

    /** 
     * 在Vue2.4.0,可以在组件定义中添加inheritAttrs：false，组件将不会把未被注册的props呈现为普通的HTML属性。
     * 但是在组件里我们可以通过其$attrs可以获取到没有使用的注册属性，如果需要，我们在这也可以往下继续传递。
     * 
       案例： 
        <template>
            <div>
                <p>foo:{{foo}}</p>
        </div>
        </template>
        <script>
            export default {
                props: {
                    foo: {
                        default: ''
                    },
                },
                inheritAttrs: false,
                data() {
                    return {};
                }
            }
        </script>
     */

    /* 
        <template>
            <div class="home">
                <mytest :title="title" :massgae="massgae"></mytest>
            </div>
        </template>
        <script>
            export default {
                name: 'home',
                data () {
                    return {
                        title:'title1111',
                        massgae:'message111'
                    }
                },
                components:{
                    'mytest':{
                        template:`<div>这是个h1标题{{title}}</div>`,
                        props:['title'],
                        data(){
                            return{
                            mag:'111'
                            }
                        },
                        created:function(){
                            console.log(this.$attrs)//注意这里
                        }
                    }
                }
            }
        </script>
    
        我们在组件里只是用了title这个属性，massgae属性我么是没有用的
        我们看到：组件内未被注册的属性将作为普通html元素属性被渲染，如果想让属性能够向下传递，
                即使prop组件没有被使用，你也需要在组件上注册。

        在Vue2.4.0,可以在组件定义中添加inheritAttrs：false，组件将不会把未被注册的props呈现为普通的HTML属性。
        但是在组件里我们可以通过其$attrs可以获取到没有使用的注册属性，如果需要，我们在这也可以往下继续传递。
    */
</script>

<script>
    /** 
     * vue中的$listener
     * 
     * 子组件和祖组件之间的通讯使用$listener，
     * 
     * 子组件使用this.$emit('事件名')触发事件
     * 父组件在引用子组件时候，用v-on="$listeners"来监听子组件事件
     * 祖组件使用v-on:孙子组件发出的事件名="事件",来接收孙子组件触发的事件
     */

    /** 
     * 祖级组件
     * 
       <template>
            <div>
                <child-dom
                    :foo="foo"
                    :coo="foo"
                    :speak="speak"
                    v-on:upRocket="reciveRocket">
                </child-dom>
            </div>
        </template>
        <script>
            import childDom from './childDom';
            export default {
                components: {
                    childDom
                },
                data() {
                    return {
                        foo:"Hello, world",
                        coo:"Hello,rui",
                        speak: "nice fish"
                    };
                },
                methods: {
                    reciveRocket(){
                        console.log("reciveRocket success")
                    }
                }
            }
        </script>
     */

    /** 
     * 父级组件
     * 
       <template>
            <div>
                <p>foo:{{foo}}</p>
                <p>attrs:{{$attrs}}</p>
                <childDomChild v-bind="$attrs" v-on="$listeners"></childDomChild>
        </div>
        </template>
        <script>
            import childDomChild from './vue.childDomChild';
            export default {
                components: {
                    childDomChild
                },
                props: {
                    foo: {
                        default: ''
                    },
                },
                inheritAttrs: false,
                data() {
                    return {

                    };
                }
            }
        </script>
     */

    /** 
     * 子级组件
     * 
       <template>
            <div>
                <p>childDomChild 组件</p>
                <p> coo:{{$attrs.coo}}</p>
                <button @click="startUpRocket">我要发射火箭</button>
            </div>
        </template>
        <script>
            export default {
                props: {

                },
                data() {
                    return {

                    };
                },
                methods: {
                    startUpRocket(){
                        console.log("startUpRocket");
                        this.$emit("upRocket");
                        
                    }
                }
            }
        </script>
     */
</script>
