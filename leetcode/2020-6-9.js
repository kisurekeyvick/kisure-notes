/**
 * 给你一个整数数组 nums，每次 操作 会从中选择一个元素并 将该元素的值减少 1
 * 
 * 如果符合下列情况之一，则数组 A 就是 锯齿数组:
 *      每个偶数索引对应的元素都大于相邻的元素，即 A[0] > A[1] < A[2] > A[3] < A[4] > ...
 *      或者，每个奇数索引对应的元素都大于相邻的元素，即 A[0] < A[1] > A[2] < A[3] > A[4]
 * 
 *      思路：
 *      A[0] > A[1] < A[2] > A[3] < A[4]
 *              A[0] < A[1] > A[2] < A[3] > A[4]
 *      只是起始index的不同
 */

/**
 * 输入：nums = [1,2,3]
 * 输出：2
 * 解释：我们可以把 2 递减到 0，或把 3 递减到 1。
 */

/**
 * 输入：nums = [9,6,1,6,2]
 * 输出：4
 */

var movesToMakeZigzag = function(nums) {
    const run = (arr, startIndex, count) => {
        const arrLen = arr.length;
        for(let i = startIndex; i < arrLen; i++) {
            /** 如果 右侧 >= 左侧 */
            if (i - 1 > -1 && arr[i - 1] >= arr[i]) {
                const distance = arr[i - 1] - arr[i] + 1;
                count += distance;
                arr[i - 1] -= distance;
            }

            /** 如果 左侧 <= 右侧*/
            if (i + 1 < len && arr[i] <= arr[i + 1]) {
                const distance = arr[i + 1] - arr[i] + 1;
                count += distance;
                arr[i + 1] -= distance;
            }
        }

        return count;
    };

    const oddCount = run([...nums], 1, 0);
    const evenCount = run([...nums], 0, 0);

    return Math.min(oddCount, evenCount);
};

console.log(movesToMakeZigzag([7,4,8,9,7,7,5]));