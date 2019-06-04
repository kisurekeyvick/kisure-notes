/**
 * WeakMap
 * 
 * 注意！！！
 * WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
 * WeakMap 相对于普通的 Map，也是键值对集合，只不过 WeakMap 的 key 只能是非空对象（non-null object）。
 * 
 * 
 * WeakMap 对它的 key 仅保持弱引用，也就是说它不阻止垃圾回收器回收它所引用的 key。
 * WeakMap 最大的好处是可以避免内存泄漏。一个仅被 WeakMap 作为 key 而引用的对象，会被垃圾回收器回收掉。
 * WeakMap 拥有和 Map 类似的 set(key, value) 、get(key)、has(key)、delete(key) 和 clear() 方法，
 * 但没有 size 属性，也没有任何与迭代有关的方法。
 */

/** 
 * https://www.cnblogs.com/white0710/p/7048673.html
 * 
 * 为什么WeakMap能够阻止内存泄漏？
 * 因为一个仅被 WeakMap 作为 key 而引用的对象，会被垃圾回收器回收掉。
 * 
 * Map/WeakMap 添加大量对象后，内存使用大幅增加；但 WeakMap 没有阻止这些对象随后被回收，内存使用马上跌落，与 Map 对比非常明显；
 */

/**
 * WeakMap 和 Map的区别
 * 
 * (1)不接受基本类型的值作为键名
 * (2)没有keys、values、entries和size
 */