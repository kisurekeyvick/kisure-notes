/**
 * https://mp.weixin.qq.com/s/-i5PsXG0rksygw6wSHrHgA
 * 
 * 场景：
 * 无论您是在客户端还是在服务器端使用JavaScript，在某些时候都需要使用url及其查询参数。
 * 
 * URLSearchParams的用法
 */

/** 
 * 最典型的用法是根据查询字符串构建URLSearchParams实例。
 * 请注意，传递以？开头的字符串也是有效的，URLSearchParams会将其删除：
 */
const params_1 = new URLSearchParams('version=1&name=join&last=fish');
const params_2 = new URLSearchParams('?version=1&name=join&last=fish');

/** 
 * 注意不要传递字符串URL！否则它将被解释为参数名称。例如：
 */
const params_3 = new URLSearchParams('https://some_api.com?para=val1');
// 那么：
params_3.get('https://some_api.com?para');   // val1

/**
 * get(属性名)  获取对应属性的值
 * has(属性名)  判断是否存在属性名
 * append(属性名, 值)   添加属性和值
 * getAll(属性名)   获取对应属性的所有值，返回的是数组
 * delete(属性名)   删除某个属性
 */