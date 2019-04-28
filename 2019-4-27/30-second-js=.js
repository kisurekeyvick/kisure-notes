/**
 * JSONtoCSV
 */
const JSONtoCSV = (arr, columns, delimiter = ',') => [
    columns.join(delimiter),
    ...arr.map(obj => {
        return columns.reduce((acc, key) => {
            return `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`;
        }, '');
    })
].join('\n');

const result = JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']);

console.log(result);    //  a,b\n"1","2"\n"3","4"\n"6",""\n"","7"

/** 
 * longestItem
 * 获取数组中item长度最长的那一个
 */
const longestItem = (...arr) => arr.reduce((pre, cur) => {
    return cur.length > 0 ? cur : pre;
});

console.log(longestItem('this', 'is', 'a', 'testcase'));

/**
 * mapObject
 * 传入一个数组和一个function，通过function对这个数组改造，然后将改造以后的值，以对象的形式展现出来，并且以下标为属性
 * @param {*} arr 
 * @param {*} fn 
 */
const mapObject = (arr, fn) => {
    return (
        (a) => {
            a = [arr, arr.map(fn)];
            return a[0].reduce((pre, cur, i) => {
                pre[cur] = a[1][i];
                return pre;
            }, {});
        }
    )();
};

console.log(mapObject([1, 2, 3], a => a * a));

/** 
 * maxN 
 */
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

[2,3,4,5,3,2,4,9,6,7].sort((a,b) => {
	console.log('前一个a',a);
	console.log('后一个b',b);
	return a-b;
})


/**
 * 关于sort
 * 语法：arrayObject.sort(sortby)
 * 返回值：对数组的引用。请注意，数组在原数组上进行排序，不生成副本。
 *          也就是说，sort排序，已经改变了原数据，并且返回的值是已经排序好的
 * 注意点：如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序。
 * 
 * 如果想按照其他标准进行排序，就需要提供比较函数，
 *      该函数要比较两个值(a,b)，比较函数应该具有两个参数 a 和 b，其返回值如下：
 *      a-b < 0     在排序后的数组中 a 应该出现在 b 之前
 *      a-b = 0     不排序
 *      a-b > 0     在排序后的数组中 a 应该出现在 b 之后
 * 
 * 如果是return一个负数，那么代表的是倒序，如果return一个正数或者0，那么代表的是不排序
 *      
 * 简单记忆法：比较函数两个参数a和b，返回a-b升序，返回b-a降序
 */

/** 
 * none
 * 传入一个数组，和一个function(这个方法会返回一个布尔值)，并判断只要有一个值满足那么none方法就返回false，
 * 如果所有的值都不满足function中的表达式，那么就会none方法就会返回true
 */
const none = (arr, fn = boolean) => !arr.some(fn);
none([0, 1, 3, 0], x => x === 2);                   // true

/** 
 * nthElement
 * 获取数组中某个位置的数据
 */
const nthElement = (arr, n = 0) => {
    return n === -1 ? arr.slice(n) : arr.slice(n, n+1)[0];
}

nthElement([1,2,3,4,5], 3); // 4

/** 
 * offset
 * 对数组的偏移
 */
const offset = (arr, num) => {
    return [...arr.slice(num), ...arr.slice(0, num)];
};

offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]

/** 
 * permutations
 * 对数组的排列
*/
const permutations = arr => {
    if (arr.length <= 2) {
        return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
    }

    return arr.reduce((pre,cur, i) => {
        /** 
         * 这一步，会产生一个数组，数组的组成只有2个元素
         * 而在permutations方法最初，有一个arr参数长度的判断，如果arr的长度小于等于2，那么就会返回重新组装过数组
         */
        const array = [...arr.slice(0, i),...arr.slice(i+1)];

        return pre.concat(
            /** 这一步，会将permutations(array)返回出来的数据进行map，重新和cur组合在一起，拼装成3个元素的数组 */
            permutations(array).map(val => [cur, ...val])
        );
    }, []);
};                                              

console.log(permutations([1, 33, 5]));
// [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]

/** 
 * pullAtIndex
 * 根据传入的数组和指定的要过滤出来的index集合，
 * 通过index集合将arr数组中对应相同下标的值放入remove数组中
 * 最后返回remove集合，并且修改原数据
 */
const pullAtIndex = (arr, pullArr) => {
    let remove = [];
    let pulled = arr.map((item, i) => {
        return pullArr.includes(i) ? remove.push(item) : item;
    }).filter((item, i) => {
        return !pullArr.includes(i);
    });

    arr.length = 0;
    pulled.forEach(item => arr.push(item));
    return remove;
}

let myArray = ['a', 'b', 'c', 'd'];
let pull = pullAtIndex(myArray, [1, 3]);  // myArray = [ 'a', 'c' ] , pull = [ 'b', 'd' ]

/** 
 * reducedFilter
 * 传入数据，以及想要得到的属性，通过某一个fun参数来返回满足条件的数据
 */
const reducedFilter = (arr, keys, fn) => {
    return arr.filter(fn).map(item => {
        return keys.reduce((pre, cur, i) => {
            pre[cur] = item[cur];
            return pre;
        }, {});
    });
};

const data = [
    {
      id: 1,
      name: 'john',
      age: 24
    },
    {
      id: 2,
      name: 'mike',
      age: 50
    }
];

reducedFilter(data, ['id', 'name'], item => item.age > 24); // [{ id: 2, name: 'mike'}]

/** 
 * remove
 */
const remove = (arr, func) => {
    return Array.isArray(arr) ? 
        /** 
         * 先筛选出满足条件的数组数据，然后通过reduce，对原数据进行删除，并且在reduce中，通过concat的方式进行叠加最终的结果
         * 这个最终的结果其实就是arr.filter(func)，只是reduce里面目的就是删除原数据的操作
         */
        arr.filter(func).reduce((pre, cur, i) => {
            /** 我们需要注意的是indexOf是可以找string或者arr中的值的 */
            arr.splice(arr.indexOf(cur), 1);
            return pre.concat(cur);
        }, []) : [];
}

remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

/** 
 * 
 */