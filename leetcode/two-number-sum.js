/**
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，
 * 并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 */
// 解法1
var twoSum = (arr, target) => {
    let result = [];
    let find = false;

    for(let i = 0; i < nums.length; i++) {
        const firstVal = nums[i];

        for(let j = 1; j< nums.length; j++) {
            const secondVal = nums[j];

            if (target === (firstVal + secondVal)) {
                result.push(i, j);
                find = true;
                break;
            }
        }

        if(find) {
            break;
        }
    }

    return result;
};

// 解法2
var twoSum = function(nums, target) {
    let result = [];
    let mp = new Map();
    
    for(const key in nums) {
        mp.set(nums[key], key);
    }

    for(let j = 0; j < nums.length; j++) {
        if (mp.has(target - nums[j]) && mp.get(target - nums[j]) !== j) {
            result.push(j, +(mp.get(target - nums[j])));
            return result;
        }
    }
};

// 解法3
var twoSum = function(nums, target, i = 0, maps = {}) {
    const map = maps;

    if (map[target - nums[i]] >= 0) {
        return [map[target - nums[i]], i];
    } else {
        map[nums[i]] = i;
        i++;
        if (i < nums.length -1) {
            return twoSum(nums, target, i, map);
        } else {
            throw new Error('error');
        }
    }
}
