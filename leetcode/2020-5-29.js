/**
 * https://leetcode-cn.com/problems/decode-string/
 * 
 * 字符串解码
    编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数

    s = "3[a]2[bc]", 返回 "aaabcbc".
    s = "3[a2[c]]", 返回 "accaccacc".
    s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".
 */

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    let result = '';
    let left_index = 0;
    let right_index = 0;

    let replaceContent = (str, left_index, right_index) => {
        const currentContent = str.slice(0, left_index);
        const numberArr = currentContent.match(/\d+/g);
        if (numberArr) {
            const number = numberArr[numberArr.length - 1]
            const repeatCount = Number(number);
            const startIndex = currentContent.lastIndexOf(number);
            const repeatCountent = str.slice(left_index + 1, right_index);
            const replaceContent = Array.apply(null, Array(repeatCount)).map(i => repeatCountent).join('');
            const willBeReplaceContent = str.slice(startIndex, right_index + 1);
            str = str.replace(willBeReplaceContent, replaceContent);
        }
        
        return str;
    }

    let read = (str, leftIndex) => {
        left_index = str.indexOf('[', leftIndex + 1);
        right_index = str.indexOf(']', leftIndex + 1);
        const new_left_index = str.indexOf('[', left_index + 1);
        result = str;

        /** [..[...]] */
        if (new_left_index > left_index && new_left_index < right_index && left_index > -1) {
            return read(result, new_left_index);
        } 

        // [...]..[..]
        if (new_left_index > right_index && left_index < right_index) {
            /** 下一个"["出现的位置在"]"之后 */
            result = replaceContent(result, left_index, right_index);
        }

        // [...]...[...]
        if (left_index > right_index && new_left_index === -1) {
            result = replaceContent(result, leftIndex, right_index);
        }

        // [...]...[...]
        if (left_index > right_index && new_left_index > 0) {
            result = replaceContent(result, leftIndex, right_index);
        }

        // [...]
        if (left_index < right_index && new_left_index === -1) {
            result = replaceContent(result, left_index, right_index);
        }

        // ...
        if (left_index === -1) {
            /** 如果left_index为-1，说明没有[, 则设置left_index的值为leftIndex */
            result = replaceContent(result, leftIndex, right_index);
        }

        const result_left_index = result.indexOf('[');
        /** 如果存在，则继续循环 */
        result_left_index > -1 && read(result, result_left_index);
    };

    read(s, -1);

    return result;
};

/** 正解 */
var decodeString = function(s) {
    let numStack = [];
    let strStack = [];
    let result = '';
    let num = 0;

    for (const char of s) {
        if (!isNaN(char)) {
            num = num * 10 + +char;
        } else if (char === '[') {
            strStack.push(result);
            result = '';
            numStack.push(num);
            num = 0;
        } else if (char === ']') {
            let repeatTimes = numStack.pop(); // 获取拷贝次数
            result = strStack.pop() + result.repeat(repeatTimes) // 构建子串
        } else {
            result += char;
        }
    }

    return result;
};

console.log(decodeString("3[a2[c4[abc3[kk]]]]"));

