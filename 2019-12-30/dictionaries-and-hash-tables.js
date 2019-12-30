/**
 * 字典和散列表
 */

/** 
 * 字典
 * 
 * 在字典中，存储的是[键，值]对，其中键名是用来查询特定元素的。
 * 字典和集合很相似，集合以[值，值]的形式存储元素，字典则是以[键，值]的形式来存储元素。字典也称作映射。
 */
function Dictionary() {
    let items = {};

    this.has = function(key) {
        return key in items;
    }

    this.set = function(key, value) {
        items[key] = value;
    }

    this.remove = function(key) {
        if (this.has(key)) {
            delete items[key];
            return true;
        }

        return false;
    }

    this.get = function(key) {
        return this.has(key) ? items[key] : undefined;
    }

    this.values = function() {
        let values = [];
        for (let k in items) {
            values.push(items[k]);
        }

        return values;
    }
}

/** 
 * 散列表
 * 
 * 散列算法的作用是尽可能快地在数据结构中找到一个值
 */
function HashTable() {
    let table = [];

    var loseHashCode = function(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    }

    this.put = function(key, value) {
        let position = loseHashCode(key);
        table[position] = value;
    }

    this.get = function(key) {
        return table[loseHashCode(key)];
    }

    /** 
     * 要从HashTable实例中移除一个元素，只需要求出元素的位置，并赋值为undefined
     * 对于HashTable类来说，我们不需要像ArrayList类一样从table数组中将位置也移除。
     * 由于元素分布于整个数组范围内，一些位置会没有任何元素占据，并默认为undefined值。
     * 我们也不能将位置本身从数组中移除（这会改变其他元素的位置），否则，
     * 当下次需要获得或移除一个元素的时候，这个元素会不在我们用散列函数求出的位置上。
     */
    this.remove = function(key) {
        table[loseHashCode(key)] = undefined;
    }
}

/** 
 * 使用HashTable类
 */
var hash = new HashTable(); 
hash.put('Gandalf', 'gandalf@email.com'); 
hash.put('John', 'johnsnow@email.com'); 
hash.put('Tyrion', 'tyrion@email.com');
/**
 * 控制台中获得如下输出：
 *  
 * 19 - Gandalf 
 * 29 - John 
 * 16 - Tyrion
 */

console.log(hash.get('Gandalf'));   // gandalf@email.com
console.log(hash.get('Loiane'));    // undefined

/** 
 * 由于Gandalf是一个在散列表中存在的键，get方法将会返回它的值。而由于Loiane是一个
 * 不存在的键，当我们试图在数组中根据位置获取值的时候（一个由散列函数生成的位置），
 * 返回值将会是undefined（即不存在）。
 */

/** 
 * 散列表和散列集合
 * 
 * 散列集合由一个集合构成，但是插入、移除或获取元素时，使用的是散列函数。
 * 我们可以重用本章中实现的所有代码来实现散列集合，
 * 不同之处在于，不再添加键值对，而是只插入值而没有键。
 * 
 * 例如，可以使用散列集合来存储所有的英语单词（不包括它们的定义）。
 *      和集合相似，散列集合只存储唯一的不重复的值
 */

/**
 * 处理散列表中的冲突
 * 
 * 有时候，一些键会有相同的散列值。不同的值在散列表中对应相同位置的时候，我们称其为冲突。
 */ 
var hash = new HashTable(); 
hash.put('Gandalf', 'gandalf@email.com'); 
hash.put('John', 'johnsnow@email.com'); 
hash.put('Tyrion', 'tyrion@email.com'); 
hash.put('Aaron', 'aaron@email.com'); 
hash.put('Donnie', 'donnie@email.com'); 
hash.put('Ana', 'ana@email.com'); 
hash.put('Jonathan', 'jonathan@email.com'); 
hash.put('Jamie', 'jamie@email.com'); 
hash.put('Sue', 'sue@email.com'); 
hash.put('Mindy', 'mindy@email.com'); 
hash.put('Paul', 'paul@email.com'); 
hash.put('Nathan', 'nathan@email.com');

/** 
 * 输出结果如下：
 * 
 *  19 - Gandalf 
    29 - John 
    16 - Tyrion 
    16 - Aaron 
    13 - Donnie 
    13 - Ana 
    5 - Jonathan 
    5 - Jamie 
    5 - Sue 
    32 - Mindy 
    32 - Paul 
    10 – Nathan

    Tyrion和Aaron有相同的散列值（16）。Donnie和Ana有相同的散列值（13），
Jonathan、Jamie和Sue有相同的散列值（5），Mindy和Paul也有相同的散列值（32）

    Jonathan、Jamie和Sue有相同的散列值，也就是5。由于Sue是最后一个被添加的，Sue
    将是在HashTable实例中占据位置5的元素。首先，Jonathan会占据这个位置，然后Jamie会覆
    盖它，然后Sue会再次覆盖。这对于其他发生冲突的元素来说也是一样的。

    当这种情况发生的时候就要去解决它。处理冲突有几种方法：分离链接、线
    性探查和双散列法。
 */

/** 
 * (1) 分离链接
 * 
 * 分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。
 * 它是解决冲突的最简单的方法，但是它在HashTable实例之外还需要额外的存储空间。
 * 
 * 
 */

HashTable.prototype.put = function(key, value) {
    let position = loseHashCode(key);

    if (table[position] == undefined) {
        table[position] = new LinkedList();
    }

    table[position].append()
}


/** 
 * (2) 线性探查
 * 
 * 
 */
