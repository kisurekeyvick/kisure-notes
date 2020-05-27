var numOfSubarrays = function(arr, k, threshold) {
    if (arr.length < k) return 0;
  
    let ans = 0,
        len = arr.length,
        sum = 0,
        target = threshold === 0 ? 0 : k * threshold;
    
    for (let i = 0; i < k; i++) {
        sum += arr[i];
    };
    
    if (sum >= target) ans++;
    
    for (let i = k; i < len; i++) {
        sum -= arr[i - k];
        sum += arr[i];
        console.log(`减去第${i - k}个数据[${arr[i - k]}],加上第${i}个数据[${arr[i]}],总和为：${sum}`);
        if (sum >= target) {
            ans++;
        }
    }
    
    return ans;
}

console.log(numOfSubarrays([11,13,17,23,29,31,7,5,2,3], 4, 5));