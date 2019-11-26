/** 
 * 双向链表
 */
function DoublyLinkedList() {
    const Node = function(element) {
        this.element = element;
        this.prev = null;
        this.next = null;
    }

    let length = 0;
    let head = null;
    // 来保存对列表最后一项的引用
    let tail = null;

    this.insert = function(position, element) {
        if (position > -1 && position < length) {
            const node = new Node(element);
            let current = head;
            let previous = null;
            let index = 0;

            if (position === 0) {   // 在第一个位置添加
                if (!head) {
                    head = node;
                    tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    head = node;
                }
            } else if (position === length) {  // 最后一项 新增
                current = tail;
                current.next = node;
                node.prev = current;
                tail = node;
            } else {
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }

                node.next = current;
                previous.next = node;

                current.prev = node;
                node.prev = previous;
            }

            length ++;

            return true;
        } else {
            return false;
        }
    };

    this.removeAt = function(position) {
        // 检查越界值
        if (position > -1 && position < length) {
            let current = head;
            let previous;
            let index = 0;

            if (position === 0) {
                head = current.next;
                // 如果只有一项，更新tail
                if (length === 1) {
                    tail = null;
                } else {
                    head.prev === null;
                }
            } else if (position === length -1) {    // 如果是最后一项
                current = tail;
                tail = current.prev; 
                tail.next = null;
            } else {
                while(index ++ < position) {
                    previous = current;
                    current = current.next;
                }

                // 将previous与current的下一项链接起来——跳过current
                previous.next = current.next;
                current.next.prev = previous;
            }

            length --;
            return current.element;
        } else {
            return null;
        }
    };
}


/**
 * 循环链表
 * 
 * 循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。
 * 循环链表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针（tail.next）不是引用null，
 * 而是指向第一个元素（head），
 */