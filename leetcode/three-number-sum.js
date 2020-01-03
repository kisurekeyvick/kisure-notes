/** 
 * https://leetcode-cn.com/problems/3sum/solution/15-san-shu-zhi-he-by-alexer-660/
 * 
 * 类型：数组算法
 * 
 * 三数之和
 * 
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
 * 使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
 */

/**
 * 解题思路：
 * 
 * 目的：避免三数重复
 * 为什么：三数重复难以判断的原因是不能一一对应，如1，-1，0和-1，1，0；
 *          这种情况出现的原因是nums里有两个以上1或两个以上-1，或两个以上0
 * 
 * 如何求解避免重复？
 *      (1) 不能全局数组去重，因为可能会漏掉合理的解，如：-1 -1 2是合理的，但如果去重以后，就得不到这组解
 *      (2) 局部去重
 *              就是在求的一组符合题意的解后，立刻判断之前的解是否有相同的解
 *              通过直接跳过可能出现重复解的位置，例如：...，-1，-1，-1，...
 *                  - 当遍历到-1时，我们假设找到了一组数字形如x+(-1)+y == 0的符合题意的组合
 *                  - 当遍历到第二个-1时，我们直接i++，跳过，因为上面一步已经求出了和-1组合的所有符合题意的一组数字
 *                    再用第二个-1重新循环组合时必然出现同一个和上面相同的解
 *                  - 那当遍历第一个-1求解需要第二个-1时呢？如-1,-1,2
 *                      是一样的，因为如果不跳过第二个-1，并开始组合的话依旧会出现-1，2，-1的可能解，而此解重复了
 * 
 *                  - 而当找到一组组合时，要找到下一个和当前位置数字相同的数字，并跳过，
 *                      需要遍历整个数组因此直接数组排序即可，重复的值一定在自己左右，直接++或--即可
 *                      
 * 
 * @param {*} nums 
 */
var threeSum = function(nums) {
    let res = [];
    const len = nums.length;

    if (nums === null || len < 3) {
        return res;
    }

    nums = nums.sort((a, b) => a - b); 

    for (let i = 0; i < len ; i++) {
        if(nums[i] > 0) {
            // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
            break;
        }

        // 第一个数后面中有两个数如果相同且有解时，则此解一定会重复，因此事先跳过直接进入下一个i位置的遍历
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
            
        // 另外两个数的指针位置
        let left = i + 1;
        let right = len - 1;

        // 更新移动指针位置，夹逼求解
        while(left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                res.push([nums[i],nums[left],nums[right]]);
                // 更新指针位置
                // 同上面的continue状态解题，区别是要不断更新直到符合时
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }

                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }

                // 夹逼
                left ++;
                right --;
            } else if (sum < 0) {
                left ++;
            } else {
                right --;
            }
        }
    }

    return res
};

threeSum([-1, 0, 1, 2, -1, -4]);
