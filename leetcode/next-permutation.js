/** 
 * https://leetcode-cn.com/problems/next-permutation/
 * 
 *  实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

    如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

    必须原地修改，只允许使用额外常数空间。

    以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
    1,2,3 → 1,3,2
    3,2,1 → 1,2,3
    1,1,5 → 1,5,1
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 
 * 思路： 从右往左，找到第一个左值小于右值的数，然后从右往左，找到第一个大于该左值的数，交换这两个值，
 * 并将该左值(不包含)右边的进行从小到大进行排序(原来为降序，只需要改为升序)。
 */
// var nextPermutation = function(nums) {
//     let len = nums.length;
//     if (len <= 1) return;
  
//     for (let i = len - 2; i >= 0; i--) {
//         if (nums[i] < nums[i + 1]) {
//             for (let j = len - 1; j > i; j--) {
//                 if (nums[i] < nums[j]) {
//                     swap(i, j, nums)
//                     break;
//                 }
//             }
//             let x = i + 1, y = len - 1;
//             while (x < y) swap(x++, y--, nums)
//             break;
//         }

//         if (i === 0) {
//             let x = i, y = len - 1;
//             while (x < y) swap(x++, y--, nums)
//         }
//     }
// };
  
// function swap(i, j, nums) {
//     let t = nums[i];
//     nums[i] = nums[j];
//     nums[j] = t;
// }

// const arr = [3,1,4,2,7,5,6];
// nextPermutation(arr);
// console.log(arr);


function nextPermutation(nums) {
    let len = nums.length;
    if (len <= 1) return;

    for (let i = len - 2; i >= 0 ; i--) {
        if (nums[i] < nums[i + 1]) {
            let J = 0;
            for (let j = len - 1; j >0; j--) {
                if (nums[j] > nums[i]) {
                    J = j;
                    break;
                }
            }

            if (i < J) {
                let temp = nums[i];
                nums[i] = nums[J];
                nums[J] = temp;

                let right = nums.slice(i+1).sort((x, y) => x - y);
                nums.splice(i + 1, nums.length, ...right);
                break;
            }
        }

        if (i === 0) {
            nums = nums.sort((x, y) => x - y);
        }
    }
}

var arrr = [11,12,0,27,3,11,21,9,0,15,26,27,17,24,0,16,4,17,14,8,15,8,2,16,10,6,6,24,16,2,18,19,6,10,17,10,21,0,11,13,7,7,2,16,24,25,2,20,12,9,20,19];

// [11,12,0,27,3,11,21,9,0,15,26,27,17,24,0,16,4,17,14,8,15,8,2,16,10,6,6,24,16,2,18,19,6,10,17,10,21,0,11,13,7,7,2,16,24,25,2,20,12,19,20,9]
// [11,12,0,27,3,11,21,9,0,15,26,27,17,24,0,16,4,17,14,8,15,8,2,16,10,6,6,24,16,2,18,19,6,10,17,10,21,0,11,13,7,7,2,16,24,25,2,20,12,19,9,20]
nextPermutation(arrr);
console.log(arrr);

// [3,1,4,2,7,5,9,8,7,6,5,4,3]
// [3,1,4,2,7,6,9,8,7,5,5,4,3]
// [3, 1, 4, 2, 7, 5, 9, 8, 7, 6, 5, 4, 3]
// [3,1,4,2,7,6,3,4,5,5,7,8,9]