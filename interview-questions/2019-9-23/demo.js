// 冒泡排序
// 嵌套两层  第一层，循环遍历 i从最大索引开始，依次递减
//          第二层，循环遍历 j从0开始，但是小于i-1,依次递增
// 如果data[j] > data[j+1] 也就是前一个比后一个大，那么就需要交换位置
function bubbleSort(arr) {
    let temp = 0;

    for (let i = arr.length; i > 0; i--) {
        for (j = 0; j< i-1; j++) {
            if (arr[j] > arr[j+1]) {
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }

    return arr;
}

// 选择排序
// 从头开始遍历，将第一个最小元素和其他的元素比较，记录最小的元素，循环结束以后，放到第一个位置
function selectionSort(arr) {
    for (let i = 0; i< arr.length; i++) {
        let min = arr[i];
        let temp;
        let index = i;

        for (let j = i+1; j<arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j];
                index = j;
            }
        }

        temp = arr[i];
        arr[i] = min;
        arr[index] = temp;
    }

    return arr;
}

// 插入排序
// 假设第一个元素已经排序了，从第二个位置开始，向后扫描
// 如果该元素大于新元素，则该元素向下移动一个位置
function insertionSort(arr) {
    let len = arr.length;

    for(let i = 1; i<len; i++) {
        let currentVal = arr[i]; // 目标值
        let j = i-1;

        // 循环对比之前已经排序号的数据
        while(j>=0 && arr[j] > currentVal) {
            // 如果第j个位置比目标值大，此时将arr[j]的值往后移动，这个时候会出现 例如： [..., 24, 24] 这样的情况。arr[j]是24， arr[j+1]也是24
                                                                                    // 但是前面的arr[j-1]如果也比currentVal大，那么就会将arr[j-1]的值赋值给arr[j]
                                                                                    // 这样就达到了数据的移动
            arr[j+1] = arr[j];
            j--;
        }

        arr[j+1]= currentVal;   // 将拿出来的比较值进行归为
    }

    return arr;
}

// 希尔排序
function shallSort(arr) {
    let increment = arr.length;
    let i;
    let temp;
    do {
        increment = Math.floor(increment/3)+1;
        for (i = increment; i< arr.length; i++) {
            if (arr[i] < arr[i - increment]) {  // 跨越increment个位置进行数值的比较
                temp = arr[i];                  // 如果排序在后面的值比排在前面的值小，那么将小的值赋值给temp

                for (let j = i - increment; j >= 0 && temp < arr[j]; j -= increment) {  // 如果存在同位置比较的存在，那么就需要循环对比这些值
                    // 循环从最大的i-cincrement开始遍历相关的几个数值，如果某个值比temp大
                    // 那么就将arr[j]移动到后面去
                    arr[j + increment] = arr[j];
                }

                arr[j + increment] = temp;
            }
        }
    }
    while (increment > 1);

    return arr;
}

// 归并排序
// 左右分开两组排序到最细，然后进行合并，再合并，最后将两个最大的组合合并
function mergeSort(arr) {
    const len = arr.length;

    if (len < 2) {
        return arr;
    }

    let start = Math.floor(len/2);
    let left = arr.slice(0, start);
    let right = arr.slice(start);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const result = [];

    while(left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while(left.length)
        result.push(left.shift());

    while(right.length)
        result.push(right.shift());

    return result;
}

// 快速排序 其实就是二分
function quickSort(arr) {
    if (arr.length === 0) {
        return [];
    }

    let point = arr[0];
    let left = [];
    let right = [];

    for(var i = 1; i< arr.length; i++) {
        point > arr[i] ? left.push(arr[i]) : right.push(arr[i]);
    }

    return quickSort(left).concat(point, quickSort(right));
}

function insertionSort(data) {
    for (let i = 1; i < data.length; i++) {
        let key = data[i];
        let j = i - 1;

        while (j >= 0 && data[j] > key) {
            data[j + 1] = key;
            j --;
        }

        data[j + 1] = key;
    }

    return data;
}

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const middle = Math.floor(arr.length/2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    while(left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while(left.length) {
        result.push(left.shift());
    }

    while(right.length) {
        result.push(right.shift());
    }

    return result;
}

function quickSort(arr) {
    if (arr.length === 0) {
        return [];
    }

    let left = [];
    let right = [];
    let point = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > point) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }

    return quickSort(left).concat(point, quickSort(right));
}
