/**
 * https://www.jianshu.com/p/8d30da8b832e
 * 
 * 关于算法
 */

/** 
 * 在介绍各个算法之前，我们有必要了解一下评估算法优劣的一些术语：
 * 
 * 稳定：如果a原本在b前面，当a=b时，排序之后a仍然在b的前面
 * 不稳定：如果a原本在b的前面，当a=b时，排序之后a可能会出现在b的后面
 * 
 * 内排序：所有排序操作都在内存中完成
 * 外排序：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行
 * 
 * 时间复杂度：一个算法执行所耗费的时间
 * 空间复杂度：运行完一个程序所需内存的大小
 */

/** 
 * (1) 冒泡排序
 *      - 比较相邻的元素。如果第一个比第二个大，就交换它们两个
 *      - 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样最终最大数被交换到最后的位置
 *      - 除了最后一个元素以外，针对所有的元素重复以上的步骤
 *      - 重复步骤1~3，直到排序完成
 */
function bubbleSort(data) {
    let temp = 0;
    for (let i = data.length; i > 0; i--) {
        for(let j = 0; j < i - 1; j++) {
            if (data[j] > data[j + 1]) {
                temp = data[j];
                data[j] = data[j+1];
                data[j+1] = temp;
            }
        }
    }

    return data;
}

/** 
 * (2) 选择排序
 *      从数组的开头开始遍历，将第一个元素和其他元素分别进行比较，记录最小的元素，等循环结束之后，将最小的元素放到数组的第一个位置上，
 *      然后从数组的第二个位置开始继续执行上述步骤。当进行到数组倒数第二个位置的时候，所有的数据就完成了排序。
 * 
 *      选择排序同样会用到嵌套循环，外循环从数组第一个位置移到倒数第二个位置；内循环从第二个位置移动到数组最后一个位置，
 *      查找比当前外循环所指向的元素还要小的元素，每次内循环结束后，都会将最小的值放到合适的位置上。
 */
function selectionSort(data) {
    for (let i = 0; i< data.length; i++) {
        let min = data[i];
        let temp;
        let index = i;

        for(let j = i + 1; j < data.length; j++) {
            if (data[j] < min) {
                min = data[j];
                index = j;
            }
        }

        temp = data[i];
        data[i] = min;
        data[index] = temp;
    }

    return data;
}

/** 
 * (3) 插入排序
 *      插入排序有点类似人类按字母顺序对数据进行排序，就如同你打扑克牌一样，将摸来的扑克按大小放到合适的位置一样。
 *      
 *      它的原理就是通过嵌套循环，外循环将数组元素挨个移动，而内循环则对外循环中选中的元素及它后面的元素进行比较。
 * 
 *      如果外循环中选中的元素比内循环中选中的元素小，那么数组元素会向右移动，为内循环中的这个元素腾出位置
 * 
 * 步骤：
 *  - 从第一个元素开始，该元素默认已经被排序
 *  - 取出下一个元素，在已经排序的元素序列中从后向前扫描
 *  - 如果该元素（已排序）大于新元素，将该元素移到下一位置
 *  - 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
 *  - 将新元素插入到该位置
 *  - 重复步骤2~5，直到排序完成
 */
function insertionSort(data) {
    let len = data.length;

    for (let i = 1; i < len; i++) {
        let key = data[i];
        let j = i - 1;
        
        while(j>=0 && data[j] > key) {
            data[j + 1] = data[j];
            j--;
        }

        data[j+1] = key;
    }

    return data;
}

/** 
 * (4) 希尔排序
 *  
 * 又称缩小增量排序，这个算法是在插入排序的基础上做了很大的改善，与插入排序不同的是，
 * 它首先会比较位置较远的元素，而非相邻的元素。这种方案可以使离正确位置很远的元素能够快速回到合适的位置，
 * 当算法进行遍历时，所有元素的间距会不断的减小，直到数据的末尾，此时比较的就是相邻元素了。    
 */
function shallSort(array) {
    let increment = array.length;
    let i
    let temp; //暂存
    do {
        //设置增量
        increment = Math.floor(increment / 3) + 1;
        for (i = increment ; i < array.length; i++) {
            if ( array[i] < array[i - increment]) {
                temp = array[i];
                for (var j = i - increment; j >= 0 && temp < array[j]; j -= increment) {
                    array[j + increment] = array[j];
                }
                array[j + increment] = temp;
            }
        }
    }
    while (increment > 1)

    return array;
}

/** 
 * (5) 归并排序（Merge Sort）
 * 
 * 将两个的有序数列合并成一个有序数列，我们称之为"归并"，归并排序的思想就是将一系列排序好的子序列合并成一个大的完整有序的序列。
 * 
 * 步骤：
 * - 把长度为n的输入序列分成两个长度为n/2的子序列
 * - 对这两个子序列分别采用归并排序
 * - 将两个排序好的子序列合并成一个最终的排序序列
 */
function mergeSort ( array ) {
    var len = array.length;
    if( len < 2 ){
        return array;
    }
    var middle = Math.floor(len / 2),
        left = array.slice(0, middle),
        right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right){
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());
    while (right.length)
        result.push(right.shift());
    return result;
}

/** 
 * (6) 快速排序
 * 
 * 快速排序是处理大数据最快的排序算法之一，它也是一种分而治之的算法，
 * 通过递归方式将数据依次分解为包含较小元素和较大元素的不同子序列，会不断重复这个步骤，
 * 直到所有的序列全部为有序的，最后将这些子序列一次拼接起来，就可得到排序好的数据。
 */
function quickSort( arr ){
    if ( arr.length == 0) {
        return [];
    }
    var left = [];
    var right = [];
    var pivot = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push( arr[i] );
        } else {
            right.push( arr[i] );
        }
    }
    return quickSort( left ).concat( pivot, quickSort( right ));
}
