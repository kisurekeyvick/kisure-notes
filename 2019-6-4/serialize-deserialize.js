/**
 * js的序列化和反序列化
 * 
 * (1) 序列化(即js中的Object转化为字符串)
 *      使用stringify
 *      var last=JSON.stringify(obj); //将JSON对象转化为JSON字符
 * 
 * (2) 反序列化(即js中JSON字符串转化为Object)
 *      JSON.parse(`[1, 2, 3, 4]`); 
 * 
 * 使用场景：
 *      (1)向后台传递参数、接收后台返回值
 *          后台返回的是一个String，需要转化为Object
 */
