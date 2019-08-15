/** 
 * https://juejin.im/post/5d3e96696fb9a07ea420c71c
 * 
 * 提升开发幸福感的7条JS技巧
 */

/** 
 * (1) 无loop生成指定长度的数组
 */
const List = len => [...new Array(len).keys()]
const list = List(10) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/** 
 * (2) RGB色值生成16进制色值
 */
const rgb2Hex = rgb => {
    // \d 匹配一个数字字符。等价于 [0-9]。
    // /\d+/g  无限匹配
    let rgbList = rgb.toString().match(/\d+/g)
    let hex = '#'
    for (let i = 0, len = rgbList.length; i < len; ++i) {
      hex += ('0' + Number(rgbList[i]).toString(16)).slice(-2)
    }
    return hex
};
rgb2Hex('100, 50, 0'); // '#643200'

// 将数字转化为16进制
Number(100).toString(16);   // 64

/** 
 * (3) 判断是否为质数
 */
const mathIsPrime = n => {
    if (n === 2 || n === 3) {
        return true
    }

    if (isNaN(n) || n <= 1 || n % 1 != 0 || n % 2 == 0 || n % 3 == 0) {
        return false;
    }

    for (let x = 6; x <= Math.sqrt(n) + 1; x += 6) {
        if (n % (x - 1) == 0 || n % (x + 1) == 0) {
            return false
        }
    }

    return true
}

mathIsPrime(0);

/** 
 * (4) 遍历类数组对象
 */
const elements = document.querySelectorAll(selector);
[].prototype.forEach.call(elements, (el, idx, list) => {
    console.log(el) // 元素节点
});

/** 
 * (5) 判断对象类型
 */
const type = data => Object.prototype.toString.call(data).replace(/^\[object (.+)\]$/, '$1').toLowerCase()
type({}); // object

/** 
 * (6) 优化多层判断条件
 */
const getScore = score => {
    const scoreData = new Array(101).fill(0)
                        .map((data, idx) => ([idx, () => (idx < 60 ? '不及格' : '及格')]));
    const scoreMap = new Map(scoreData);
    return (scoreMap.get(score) 
          ? scoreMap.get(score)() 
          : '未知分数');
};

getScore(30);   // 不及格

/** 
 * (7) 时间格式化
 */
const dateFormatter = (formatter, date) => {
	date = (date ? new Date(date) : new Date);
	const Y = date.getFullYear() + '',
          M = date.getMonth() + 1,
          D = date.getDate(),
          H = date.getHours(),
          m = date.getMinutes(),
          s = date.getSeconds()
    return formatter.replace(/YYYY|yyyy/g, Y)
        			.replace(/YY|yy/g, Y.substr(2, 2))
        			.replace(/MM/g, (M < 10 ? '0' : '') + M)
        			.replace(/DD/g, (D < 10 ? '0' : '') + D)
        			.replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
        			.replace(/mm/g, (m < 10 ? '0' : '') + m)
        			.replace(/ss/g, (s < 10 ? '0' : '') + s);
}

dateFormatter('YYYY-MM-DD HH:mm', '1995/02/15 13:55');
