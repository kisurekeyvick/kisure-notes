/** 
 * https://juejin.im/post/5afbfce56fb9a07ac0226f21
 * 
 * 深入理解Vue的computed实现原理及其实现方式
 */

var vm = new Vue({
    data: { a: 1 },
    computed: {
      // 仅读取
      aDouble: function () {
        return this.a * 2
      },
      // 读取和设置
      aPlus: {
        get: function () {
          return this.a + 1
        },
        set: function (v) {
          this.a = v - 1
        }
      }
    }
});



/** 
 * 计算属性的主要应用场景是代替模板内的表达式，或者data值的任何复杂逻辑都应该使用computed来计算，它有两大优势：
 * (1) 逻辑清晰，方便于管理
 * (2) 计算值会被缓存，依赖的data值改变时才会从新计算
 * 
 * 
 */

