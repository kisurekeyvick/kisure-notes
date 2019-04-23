/**
 * 筛选出数组中的唯一值
 * indexOf(searchvalue,fromindex)    找出数组或者字符串中找出你指定的值得位置index，并返回这个index
 * 参数：
 * (1)searchvalue   规定需检索的值
 * (2)fromindex     检索的位置，如省略该参数，则将0开始检索
 * 
 * lastIndexOf(searchvalue,fromindex)    找出数组或者字符串指定的值最后出现的位置index，并返回这个index
 */
const filterUniqueValue = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
filterUniqueValue([1, 2, 2, 3, 4, 4, 5]);

/**
 * 过滤数组中，不重复的数据(id不重复)
 */
const filterNonUniqueBy = (arr, fn) => arr.filter((item, i) => {
    return arr.every((x, j) => {
        return (i === j ) === fn(item, x);
    });
});

filterNonUniqueBy(
    [
      { id: 0, value: 'a' },
      { id: 1, value: 'b' },
      { id: 2, value: 'c' },
      { id: 1, value: 'd' },
      { id: 0, value: 'e' }
    ],
    (a, b) => a.id == b.id
);