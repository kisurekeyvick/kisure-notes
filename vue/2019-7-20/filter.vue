<script>
    /** 
     * https://cn.vuejs.org/v2/guide/filters.html#ad
     * vue中的过滤器

    
    (1)使用范围：
        双花括号插值        例如：{{ 'ok' | globalFilter }}
        v-bind 表达式 (后者从 2.1.0+ 开始支持)。    例如：<div v-bind:data="'ok' | globalFilter" ></div>

    
    (2)过滤器的调用
        一：{{ message | filterA | filterB }}
            message是作为参数传给filterA 函数，而filterA 函数的返回值作为参数传给filterB函数，最终结果显示是由filterB返回的

        二：{{ message | filterA('arg1', arg2) }}
            filterA的第一个参数是message，依次是‘arg1’,arg2

        三：{{ 'a','b' | filterB }}
            上述代码表示'a'和'b'分别作为参数传给filterB

    (3)自定义一个filter
        我们在组件中：
            export default {
                props: {
                    ....
                },
                data() {
                    return  {
                        ...
                    }
                },
                filter: {
                    globalFilter(val) {
                        return 'nice fish' + val;
                    }
                }
            }

    (4)vue中的一些内置的filter
        一：capitalize     首字母大写
        二：uppercase      全部大写
        三：lowercase      全部小写
        四：json           将数组和对象转化成字符串
        五：orderBy        正对于v-for的排序
                            该过滤器存在2个参数：（1）需要搜索的字符串
                                            （2）数字，>=0 是升序，<0 是降序

                        // lili 的值为：["oi", "kk", "ll"]
                        // <!--输出kk ll oi-->
                        <ul v-for="item in lili | orderBy 'o' 1"> 
                            <li>{{item}}</li>       
                        </ul>

                        这句代码的意思就是，将 lili 中的元素，根据含有o字母的排序，并且是升序
        六：filterBy        搜索需要的字符串
                            该过滤器存在3个参数： （1）需要搜索的字符串
                                               （2）in （可以指定搜寻的位置）
                                                (3) 可以是字段名字，格式为数组格式

                            (1) // lili: ["oi", "oa", "ll", "lo" ,"ouo" ,"kk" ,"oala"]
                            <ul v-for="item in lili | filterBy 'o' "> <!--输出oi oa lo ouo oala-->
                                <li>{{item}}</li>
                            </ul>

                            (2) man: [   //此处注意man是数组,不是对象
                                    {name: "lily"},
                                    {name: "lucy"},
                                    {name: "oo"},
                                    {dada: "lsh"},
                                    {dada: "ofg"}
                                ]
                            <ul v-for="item in man | filterBy 'l' in 'name' "> <!--输出lily lucy-->
                                <li>{{item.name}}</li>
                            </ul>

                            (3) <ul v-for="item in man | filterBy 'l' in 'name' 'dada' "> <!--输出lily+undefined lucy+undefined undefined+lsh-->
                                    <li>{{item.name+"+"+item.dada}}</li>
                                </ul>
     */
</script>
