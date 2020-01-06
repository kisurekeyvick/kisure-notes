/** 
 * 类型：数组算法
 * 
 * 字符串转换整数 (atoi)
 * 
 * 题目链接：https://leetcode-cn.com/problems/string-to-integer-atoi/
 * 
 * 请你来实现一个 atoi 函数，使其能将字符串转换成整数
 * 
 * - 首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
 * - 当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；
 *      假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
 * - 假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。
 *      如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。
 */

var myAtoi = function(str) {
    str = str.replace(/^\s*/, '');
    const firstStr = str.slice(0 , 1);

    /** 首位不是-或者不是数字，则返回0 */
    if (!(/\d || '-'/.test(firstStr))) {
        return 0;
    }

    const isMinusSign = firstStr === '-';
    if (isMinusSign) {
        str = str.replace('-', '');
    }    

    const strArr = str.split('');
    const isNumber = str => /\d/.test(str);
    let numberStr = '';
    for (let i = 0; i < strArr.length; i++) {
        if (isNumber(strArr[i])) {
            numberStr += strArr[i];
        } else {
            break;
        }
    }

    const value = isMinusSign ? -1 * Number(numberStr) : Number(numberStr);

    
};
