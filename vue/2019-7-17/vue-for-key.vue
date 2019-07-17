<script>
    /** 
        关于vue的 v-for  和对应的key
     */
    /** 
        (1) 迭代数组
            <ul>
                <li v-for="(item, i) in list">索引：{{i}} -- 姓名：{{item.name}} -- 年龄：{{item.age}}</li>
            </ul>

        (2) 迭代对象中的属性
            <ul>
                <li v-for="(val, key, i) in userInfo">值：{{val}} -- 键：{{key}} -- 索引：{{i}}</li>
            </ul>

            渲染以后：
            <ul>
                <li>值：1 -- 键：id -- 索引：0</li>
                <li>值：kisure -- 键：name -- 索引：1</li>
                <li>值：男 -- 键：gender -- 索引：2</li>
            </ul>

            const vm = new Vue({
                data: {
                    user: {
                        id: '1',
                        name: 'kisure',
                        gender: '男'
                    }
                }
            });

        (3) 迭代数字
            如果是迭代数字的话，前面的i，起始值是从1开始的
            <p v-for="i in 10">这是第{{ i }} 个P标签</p>
    */
    /** 

     */
</script>