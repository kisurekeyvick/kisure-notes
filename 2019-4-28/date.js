/**
 * https://github.com/lishengzxc/bblog/issues/5
 */

/**
 * 关于Date()和new Date()
 * 
 * (1)Date()直接返回当前时间字符串，不管参数是number还是任何string
 * 
 * (2)而new Date()则是会根据参数来返回对应的值，无参数的时候，返回当前时间的字符串形式
 * 有参数的时候返回参数所对应时间的字符串。
 */

new Date();
//Sun Apr 28 2019 21:49:10 GMT+0800 (中国标准时间)

new Date(1293879600000);
new Date('2011-01-01T11:00:00')
new Date('2011/01/01 11:00:00')
new Date(2011,0,1,11,0,0)
new Date('jan 01 2011,11 11:00:00')
new Date('Sat Jan 01 2011 11:00:00')
//Sat Jan 01 2011 11:00:00 GMT+0800 (中国标准时间)

new Date('sss');
new Date('2011/01/01T11:00:00');
new Date('2011-01-01-11:00:00')
new Date('1293879600000');
//Invalid Date

new Date('2011-01-01T11:00:00')-new Date('1992/02/11 12:00:12')
//596069988000

/**
 * new Date()解析所支持的参数格式标准
 * (1)时间戳格式
 * (2)时间数字字符串格式
 *      RFC2822 标准日期字符串格式：YYYY/MM/DD HH:mm:SS
 *          案例：new Date('2019/04/28 08:22:22') 
 * 
 *      ISO 8601标准日期字符串格式：YYYY-MM-DDThh:mm:ss
 *          案例：new Date('2019-04-28T08:22:22')   //Sun Apr 28 2019 08:22:22 GMT+0800 (中国标准时间)
 * (3)new Date()中的传参格式
 *      new Date( year, month, date, hrs, min, sec) 按给定的参数创建一日期对象
 */

/** 
 * 如何获得某个月的天数？
 * new Date()的第三个参数传小于1的值会怎么样了，比如传0，我们就获得了上个月的最后一天
 */
function getDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

new Date().valueOf();   //1556461653656 返回的是时间戳
new Date().getTime();   //同上，这两个方法是一样的。
// valueOf()通常在 JavaScript 内部被调用，而不是在代码中显式调用。

new Date().toJSON();    // 返回一个 JSON 格式的字符串："2019-04-28T14:33:38.557Z"
JSON.stringify(new Date()); // "2019-04-28T14:33:38.557Z"


