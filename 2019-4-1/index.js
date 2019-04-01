/**
 * constructor、_proto_、prototype之间的关系
 */

/**
 * 这是一个测试
 */
Array.constructor === Function.constructor    // true
Function.constructor === Object.constructor   // true
String.constructor === Number.constructor     // true

/**
 * Math和JSON不是构造函数
 * typeof Math // 'object'
 */
Math.constructor === Object
Math.__proto__.constructor === Object