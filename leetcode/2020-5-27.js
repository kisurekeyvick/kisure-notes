/**
 * https://leetcode-cn.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/
 * 
 * 大小为 K 且平均值大于等于阈值的子数组数目
 * 
 * 内容：给你一个整数数组 arr 和两个整数 k 和 threshold(阈值)，请你返回长度为 k 且平均值大于等于 threshold 的子数组数目
 */
var numOfSubarrays = function(arr, k, threshold) {
    // arr是源数据
    // k是子数组的长度
    // threshold是K个数组长度下的平均值

    if (arr.length < k) return 0;
  
    let count = 0,
        len = arr.length,
        sum = 0,
        target = threshold === 0 ? 0 : k * threshold;
    
    for (let i = 0; i < k; i++) {
        sum += arr[i];
    };
    
    if (sum >= target) count++;
    
    for (let i = k; i < len; i++) {
        sum -= arr[i - k];
        sum += arr[i];
        if (sum >= target) {
            count++;
        }
    }
    
    return count;
};

/**
 * 思路：先从i=0开始，叠加k个数得出sum总和，如果总和大于target(平均值)，那么count+1
 *      然后继续循环数组，sum减去[i - k]位置的数字，加上[i]位置的数字
 *      说白了就是左右移动数据和
 */
