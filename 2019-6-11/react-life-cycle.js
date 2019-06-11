/**
 * react 生命周期
 * 
 
 arr：1,2,1,1,1
 K：3
 结果返回3

 */
function judgeItervalNumber(value) {
    return typeof value === 'number' && parseInt(value, 10) === value;
}

function findMaxArrGroup(arr, value) {
    if (!arr instanceof Array) {
        throw new Error('Please pass in the array');
    }

    if (!judgeItervalNumber(value)) {
        throw new Error('Please pass in integer number');
    }

    const groupArr = [];
    

    /** 
     * 是否满足条件
     * source 传入的数组
     * val 总和值
     */
    const isMeetConditions = (source, val) => {
        return source.reduce((pre, cur) => {
            return cur + pre;
        }, 0) === val;
    }

    /**
     * 往groupArr中push满足条件的组合数组
     * @param {*} source 
     */
    const createInnerArrGroup = source => val => {
        if (isMeetConditions(source, val)) {
            groupArr.push(source);
        } else {
            source.forEach((item, i) => {
                const newArr = rebuildArr(i + 1)(source);
                if (newArr.length !== 0) {
                    createInnerArrGroup(newArr)(value);
                }
            });
        }
    }

    /** 
     * 切割数组
     * i为数组下标
     */
    const rebuildArr = i => source => {
        return source.slice(i, source.length);
    }

    /**
     * 循环被切割的数组
     */
    arr.forEach((item, index) => {
        const newArr = rebuildArr(index)(arr);
        createInnerArrGroup(newArr)(value);
    });

    return [...groupArr].reduce((pre, cur) => {
        return cur.length > pre.length ? cur : pre;
    }, []);
}

console.log(findMaxArrGroup([1,0,-1,2,3,0,-4,1,3,4,1], 5));
