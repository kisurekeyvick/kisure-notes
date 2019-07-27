<script>
    /** 
     * vue 的v-pre指令
     * 
     * 跳过这个元素和它的子元素的编译过程。一些静态的内容不需要编辑加这个指令可以加快编辑
     */

    // 案例：
    /** 
     * <span v-pre>{{ this will not be compiled }}</span>   显示的是{{ this will not be compiled }}
     * 
     * <span v-pre>{{msg}}</span>     即使data里面定义了msg这里仍然是显示的{{msg}}
     */
</script>
