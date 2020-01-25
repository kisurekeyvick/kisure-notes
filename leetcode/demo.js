/**
 * 现在有一个数组,存储所有的文件路径
 * 找出数组中，文件路径起始值一样的前缀，返回当前路径的下标。
 */
const arr = [
    'a/b/c',
    'b/c/d',
    'c/d/e',
    'a/b/k',
    'c/d/j',
    'a/k'
];

function find(arr) {
    let maxLength = 0;

    arr.forEach((i) => {
        const length = (i.match(/\//g)).length;
        maxLength < length && (maxLength = length);
    });

    return cal(arr, maxLength);
}

function cal(arr, number = 0, result = {}) {
    if (number < 1) {
        const map = new Map();

        for (const key in result) {
            if (result[key].length === 1) {
                delete result[key];
                continue;
            }

            const item = map.get(String(result[key]));
            if (item) {
                item.length < key && map.set(String(result[key]), key);
            } else {
                map.set(String(result[key]), key);
            }
        }

        result = {};
        map.forEach((value, key) => {
            result[value] = key
        });

        return result;
    }

    for (let i = 0; i < arr.length; i++) {
        const path = arr[i].split('/');
        const val = number === 1 ? path[0] : path.slice(0, number).join('/');

        if (!val) {
            continue;
        }

        if (result.hasOwnProperty(val)) {
            result[val].push(i);
        } else {
            result[val] = [];
            result[val].push(i);
        }
    }

    return cal(arr, number - 1, result);
}

console.log(find(arr));
