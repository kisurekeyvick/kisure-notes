/**
 * Array.from()
 */
let array = {
    'name': 'name', 
    'age': 'age',
    'sex': 'sex',
    'user': ['user1','user2','user3'],
    'length': 4
};

let arr = Array.from(array);
console.log(arr);  // [ undefined, undefined, undefined, undefined ]
/**
 * 会发现结果是长度为4，元素均为undefined的数组，由此可见，
 * 要将一个类数组对象转换为一个真正的数组，必须具备以下条件：
 * （1）该类数组对象必须具有length属性，用于指定数组的长度。如果没有length属性，那么转换后的数组是一个空数组。
 * （2）该类数组对象的属性名必须为数值型或字符串型的数字，如下所示：
            let array = {
                0: 'name', 
                1: 'age',
                2: 'sex',
                3: ['user1','user2','user3'],
                'length': 4
            }
 */

/**
 * Array.from还可以接受第二个参数，作用类似于数组的map方法，
 * 用来对每个元素进行处理，将处理后的值放入返回的数组。如下：
 */
let arr = [1,2,3,4,5,6,7,8,9]
let set = new Set(arr)
console.log(Array.from(set, item => item + 1)) // [2,3,4,5,6,7,8,9,10]