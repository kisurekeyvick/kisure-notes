/** 
 * https://mp.weixin.qq.com/s/suoSlGbcGV9HZHHSwZeFUA
 * 
 * JS开发技巧
 */
/** ----------------- 字符串技巧 ------------------ */

/**
 * @desc 格式化金钱
 * @param {*} num 
 */
const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const money = ThousandNum(20190214);    // money => "20,190,214"

/**
 * @desc 随机生成ID
 * @param {*} len 
 */
NumberObject.toString(radix)    // radix表示数字的基数，使 2 ~ 36 之间的整数,若省略该参数，则使用基数 10
const RandomId = len =>Math.random().toString(36).substr(3, len);
const id = RandomId(10);

/**
 * @desc 生成随机颜色
 * 颜色值是从#000000到#ffffff，后面那六位数是16进制数，相当于“0x000000”到“0xffffff”
 * 实现的思路是将hex的最大值ffffff先转换为10进制，进行random后再转换回16进制
 * 
 * padEnd(length, string) 用于尾部补全，不足补0
 * length：代表当前字符串需要填充到的目标长度
 * string：填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断
 */
const RandomColor = () =>"#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
const color = RandomColor();

/**
 * @desc 生成评分
 * @param {*} rate 
 */
const StartScore = rate =>"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
const start = StartScore(3);    // "★★★☆☆"
const start2 = StartScore(1);   // "★☆☆☆☆"

/**
 * @desc 操作URL查询参数
 */
const params = new URLSearchParams(location.search.replace(/\?/ig, "")); // location.search = "?name=young&sex=male"
params.has("young"); // true
params.get("sex"); // "male"

/** ----------------- 数值技巧 ------------------ */

/**
 * @desc 取整 正数等同于Math.floor,负数等同于Math.ceil
 */
const num1 = ~~1.6
const num2 = 1.6 | 0;
const num3 = 1.6 >> 0;

/** 
 * @desc 时间戳
 * +new Date() === Date.now()
 */
const time = +new Date();

/**
 * @desc 判断数字奇偶
 * @param {*} num 
 */
const OddEven = num => !!(num & 1) ? 'odd' : 'even';

/**
 * @desc 精确小数
 * @param {*} num 
 * @param {*} decimal 
 */
const RoundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal;
const num = RoundNum(1.69, 1);  // num => 1.7

/**
 * @desc 生成范围随机数
 * @param {*} min 
 * @param {*} max 
 */
const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomNum = RandomNum(1, 10);

/** ----------------- 判断技巧 ------------------ */

/**
 * @desc 判断数据类型
 * @param {*} tgt 
 * @param {*} type 
 */
function DataType(tgt, type) {
    const dataType = Object.prototype.toString.call(tgt).replace(/\[object (\w+)\]/, "$1").toLowerCase();
    return type ? dataType === type : dataType;
}

/**
 * @desc 是否为空数组
 * @param {*} arr 
 */
const isEmptyArr = arr => Array.isArray(arr) && !arr.length;

/**
 * @desc 是否为空对象
 * @param {*} obj 
 */
const isEmptyObj = obj => DataType(obj, 'object') && !Object.keys(obj).length;

/** 
 * @desc 函数退出代替条件分支退出
 */
if (flag) {
    Func();
    return false;
}
// 换成
if (flag) {
    return Func();
}

/** ----------------- 数组技巧 ------------------ */

/**
 * @desc 混淆数组
 * @param {*} arr 
 */
const mixArr = arr => arr.slice().sort(() => Math.random - 0.5);

/**
 * @desc 过滤空值
 */
const arrVal = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean);  // [1, 2]

/**
 * @desc 创建指定长度数组
 */
const arrLength = [...new Array(3).keys()];

/** ----------------- 对象技巧 ------------------ */

/** 
 * @desc 删除对象无用属性
 */
const obj = { a: 0, b: 1, c: 2 }; // 只想拿b和c
const { a, ...rest } = obj;
console.log(rest);  // { b: 1, c: 2 }

/** ----------------- 函数技巧 ------------------ */

/** 
 * @desc 字符串创建函数
 */
const Func = new Function("name", "console.log(\"I Love \" + name)");

/** ----------------- DOM技巧 ------------------ */

/**
 * @desc 自适应页面
 * @param {*} width 
 */
function AutoResponse(width = 750) {
    const target = document.documentElement;
    target.clientWidth >= 600
        ? (target.style.fontSize = "80px")
        : (target.style.fontSize = target.clientWidth / width * 100 + "px");
}