/**
 * js中表达式 >>> 0 浅析
 */

/**
 * (1)  >> 和 >>>有什么不一样?
 * >>>是无符号右移，>>是有符号移位
 */
// >>有符号移位：该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，拷贝最左侧的位以1填充左侧
console.log(-9 >> 2);
// 11111111111111111111111111110111  // -9 -> 11111111111111111111111111111101   // -3

// >>>无符号移位：该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，左侧用0填充。
// 因为符号位变成了 0，所以结果总是非负的。（即便右移 0 个比特，结果也是非负的。）

/**
 * (2)  移位0有什么意义?
 * 移位操作符在移位前做了两种转换，
 * 第一将不是number类型的数据转换为number，
 * 第二将number转换为无符号的32bit数据，也就是Uint32类型。
 * 这些与移位的位数无关，移位0位主要就是用了js的内部特性做了前两种转换。
 */

/**
 * (2.1) Uint32类型是如何转换的?
 * 如果不能转换为Number，那就为0
 * 如果为非整数，先转换为整数
 */

/**
 * (2.2) 如果是正数，返回正数，如果是负数，返回负数 + 2的32次方
 */

/**
 * 总结：
 * x >>> 0本质上就是保证x有意义（为数字类型），且为正整数，
 * 在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0。
 */