/** 
 * 数据结构与算法 - 集合
 * 
 * 集合是由一个既没有重复元素，也没有顺序概念的数组
 */

/** 
 * 实现一个ES6的Set类的实现
 */
function Set() {
    /** 
     * 有一个非常重要的细节，我们使用对象而不是数组来表示集合
     * 当然也可以用数组实现
     * 在这里我们用对象来实现，因为JavaScript的对象不允许一个键指向两个不同的属性，也保证了集合里的元素都是唯一的。
     */
    var items = {};

    this.has = function(value) {
        return value in items;
    }

    /** 
     * 对于给定的value，可以检查它是否存在于集合中。如果不存在，就把value添加到集合中
     * （行{1}），返回true，表示添加了这个值。如果集合中已经有这个值，就返回false，表示没有添加它
     */
    this.add = function(value) {
        if (!this.has(value)) {
            items[value] = value;
            return true;
        }
        return false;
    }

    this.remove = function(value) {
        if (this.has(value)) {
            delete items[value];
            return true;
        }
        return false;
    }

    /** 
     * 全部清除
     */
    this.clear = function() {
        items = {};
    }

    /** 
     * 大小
     */
    this.size = function() {
        return Object.keys(items).length;
    }

    this.values = function() {
        return Object.keys(items);
    }
}

/** 
 * 集合的操作
 * 
 * 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
 * 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
 * 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
 * 子集：验证一个给定集合是否是另一集合的子集。
 */

/** 
 * 并集
 */
Set.prototype.union = function(otherSet) {
    var unionSet = new Set();
    var values = this.values();

    for (let i = 0; i < values.length; i++) {
        unionSet.add(values[i]);
    }

    values = otherSet.values();
    for (let i = 0; i < values.length; i++) {
        unionSet.add(values[i]);
    }

    return unionSet;
}

var setA = new Set(); 
setA.add(1); 
setA.add(2); 
setA.add(3); 
var setB = new Set(); 
setB.add(3); 
setB.add(4); 
setB.add(5); 
setB.add(6); 
var unionAB = setA.union(setB); 
console.log(unionAB.values());  // ["1", "2", "3", "4", "5", "6"]

/** 
 * 交集
 */
Set.prototype.intersection = function(otherSet) {
    let intersectionSet = new Set();
    let values = this.values();

    for (let i = 0; i < values.length; i++) {
        if (otherSet.has(values(i))) {
            intersectionSet.add(values[i]);
        }
    }

    return intersectionSet;
}

/** 
 * 差集
 */
Set.prototype.difference = function(otherSet) {
    let differenceSet = new Set();
    let values = this.values();

    for(let i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) {
            differenceSet.add(values[i]);
        }
    }

    return differenceSet;
}

/** 
 * 子集
 */
Set.prototype.subset = function(otherSet) {
    if (this.size() > otherSet.size()) {
        return false;
    } else {
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                return false;
            }
        }

        return true;
    }
}
