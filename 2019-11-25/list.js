/**
 * 链表
 */

/**
 * - 数组（或列表）可能是最常用的数据结构
 *      这种数据结构非常方便，提供了一个便利的[]语法来访问它的元素。然而，
 *      这种数据结构有一个缺点：（在大多数语言中）数组的大小是固定的，从数组的起点或中间插入
 *      或移除项的成本很高，因为需要移动元素   
 * 
 * - 链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。
 *      每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。
 *      【链表结构.jpg】
 * 
 * - 链表和数组之间的其他区别
 *      相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。
 *      然而，链表需要使用指针，因此实现链表时需要额外注意。
 * 
 *      数组的另一个细节是可以直接访问任何位置的任何元素，
 *      而要想访问链表中间的一个元素，需要从起点（表头）开始迭代列表直到找到所需的元素。
 */

/**
 * (1) 创建一个链表
 */
function LinkedList() {
    const Node = function(element) {
        this.element = element;
        this.next = null;
    }

    let length = 0;
    let head = null;

    // 向列表尾部添加一个新的项
    this.append = function(element) {
        const node = new Node(element);
        let current;

        if (head === null) {
            head = node;
        } else {
            current = head;

            // 循环列表，直到找到最后一项
            while(current.next) {
                current = current.next;
            }

            // 找到最后一项，将其next赋为node，建立链接
            current.next = node;
        }

        length ++;
    };
    // 向列表的特定位置插入一个新的项
    this.insert = function(position, element) {
        // 检查越界值
        if (position > -1 && position <= length) {
            const node = new Node(element);
            let current = head;
            let previous;
            let index = 0;

            if (position === 0) {
                node.next = current;
                head = node;
            } else {
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }

                node.next = current;
                previous.next = node;
            }

            length ++;
            return true;
        } else {
            return false;
        }
    };
    // 从列表的特定位置移除一项。
    this.removeAt = function(position) {
        // 检查越界值
        if (position > -1 && position < length) {
            const current = head;
            let previous;
            let index = 0;

            // 移除第一项
            if (position === 0) {
                head = current.next;
            } else {
                /**
                 * 这边我们需要注意，index++< position
                 * 拆分为2步骤：
                 *          - index < position
                 *          - index++
                 */
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }
            }
        } else {
            return null;
        }
    };
    // 从列表中移除一项
    this.remove = function(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    };
    // 返回元素在列表中的索引。如果列表中没有该元素则返回-1。
    this.indexOf = function(element) {
        let current = head;
        let index = -1;

        while(current) {
            if (element === current.element) {
                return index;
            }

            index ++;
            current = current.next;
        }

        return index;
    };
    // 如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。
    this.isEmpty = function() {
        return length === 0;
    };
    // 返回链表包含的元素个数。与数组的length属性类似。
    this.size = function() {
        return length;
    };
    this.toString = function() {
        let current = head;
        let string = '';

        while(current) {
            string += current.element;
            current = current.next;
        }

        return string;
    };
    this.print = function() {};
}

