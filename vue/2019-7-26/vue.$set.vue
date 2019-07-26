<script>
    /**
     * https://www.jianshu.com/p/71b1807b1815
     * 
     * Vue-给对象新增属性（使用Vue.$set()）
     */

    /** 
     * 在开发过程中，我们时常会遇到这样一种情况：
     * 当vue的data里边声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，向对象中添加新的属性，
     * 如果更新此属性的值，是不会更新视图的。
     * 
     * 根据官方文档定义：如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。
     * 
     * Vue 不能检测到对象属性的添加或删除。
     * 由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。
     *  */ 

    /** 
        案例：
        <template>
            <div>
                <p @click="addd(obj)">{{obj.d}}</p>
                <p @click="adde(obj)"> {{obj.e}}</p>
            </div>
        </template>

        <script>
            import Vue from "vue";

            export default {
                data(){
                    return {
                        obj:{}
                    }
                },
                mounted() {
                    this.obj = {d: 0};
                    this.obj.e = 0;
                    
                    console.log('after--', this.obj);
                },
                methods: {
                    addd(item) {
                        item.d = item.d + 1;
                        console.log('item--',item);
                    },
                    adde(item) {
                        item.e = item.e + 1;
                        console.log('item--',item);
                    }
                }
            }
        </scirpt>

        此时，我们看到，obj有2个属性，一个是d，一个是e。
        d属性是有get 和 set方法的，而新增的e属性是没有的。
        所以，点击触发addd，可以更新视图，但是点击adde，不能够触发更新视图。
        adde虽然不会触发视图，但是确实更新的e属性的值。

        出现这种情况的原因：
        Vue 不允许在已经创建的实例上动态添加新的根级响应式属性。
        然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：Vue.set(vm.obj, 'e', 0)
        也可以使用vue的实例方法：this.$set(this.obj,'e',02)

        有时你想向已有对象上添加一些属性，例如使用 Object.assign() 或 _.extend() 方法来添加属性。
        但是，添加到对象上的新属性不会触发更新。
        在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：
        this.obj= Object.assign({}, this.obj, { a: 1, e: 2 })
     */
</script>
