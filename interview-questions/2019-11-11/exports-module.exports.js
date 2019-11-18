/**
 * exports和module.exports的区别你真的懂吗?
 * 
 * 灵魂四连问：
 * require 的运行机制和缓存策略你了解吗？
 * require 加载模块的是同步还是异步？谈谈你的理解？
 * exports 和 module.exports 的区别是什么？
 * require 加载模块的时候加载的究竟是什么？
 */

/** 
 * (1) Node.js 遵循 CommonJS 规范，使用 require 关键字来加载模块
 */

/**
 * (2) require 重复引入问题
 * 
 * Node.js 中无需关心这一点，因为 Node.js 默认先从缓存中加载模块，一个模块被加载一次之后，
 * 就会在缓存中维持一个副本，如果遇到重复加载的模块会直接提取缓存中的副本，
 * 也就是说在任何时候每个模块都只在缓存中有一个实例。
 */

/** 
 * (3) require 加载模块的时候是同步还是异步？
 * 
 * 同步的
 * 因为：一个作为公共依赖的模块，当然想一次加载出来，同步更好。
 *      模块的个数往往是有限的，而且 Node.js 在 require 的时候会自动缓存已经加载的模块，
 *      再加上访问的都是本地文件，产生的IO开销几乎可以忽略。
 */

/** 
 * (4) require() 的缓存策略
 * 
 * Node.js 会自动缓存经过 require 引入的文件，使得下次再引入不需要经过文件系统而是直接从缓存中读取。
 * 不过这种缓存方式是经过文件路径定位的，即使两个完全相同的文件，
 * 但是位于不同的路径下，会在缓存中维持两份。可以通过：console.log(require.cache)   来获取目前在缓存中的所有文件
 */

/**
 * (5) exports 与 module.exports 区别
 * 
 * 在一个 node 执行一个文件时，会给这个文件内生成一个 exports 和 module 对象， 
 * 而module又有一个 exports 属性。他们之间的关系如下图，都指向一块{}内存区域。
 * 
 * exports = module.exports = {};  【exports-module.exports.png】
 */

/**
 * (6) require()加载模块
 * 
 * // a.js
 * let a = 'nice fish';
 * console.log(module.exports); // {}
 * console.log(exports);        // {}
 * 
 * export.a = '这个是内容';      // 将module.exports的内容改成：{ a: '这个是内容' }
 * export = 'hello kisure';
 * 
 * // b.js
 * const moduleA = require('/a.js');
 * console.log(moduleA);        // 打印为：{ a: '这个是内容' }
 * 
 * 结论：
 *      require导出的内容是module.exports的指向的内存块内容，并不是exports的。
 *      简而言之，区分他们之间的区别就是 exports 只是 module.exports的引用，
 *      辅助后者添加内容用的。用内存指向的方式更好理解。
 */
