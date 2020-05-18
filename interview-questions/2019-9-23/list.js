/** 
 * https://juejin.im/post/58287452570c3500587642b6
 * 
 * 关于链表
 */

/** 
 * 运用javascript提供的API很容易的实现了栈和队列，但这种数据结构有一个很明显的缺点，
 * 因为数组大小是固定的所以我们在移除或是添加一项数据的时候成本很高，基本都需要吧数据重排一次。
 * (javascript的Array类方法虽然很方便但背后的原理同样是这样的)
 */

/** 
 * 链表的理解：
 * 
 * 在内存中，栈和队列（数组）的存在就是一个整体，如果想要对她内部某一个元素进行移除或是添加一个新元素就要动她内部所有的元素，
 * 所谓牵一发而动全身；而链表则不一样，每一个元素都是由元素本身数据和指向下一个元素的指针构成，
 * 所以添加或是移除某一个元素不需要对链表整体进行操作，只需要改变相关元素的指针指向就可以了。
 * 
 * 比如：火车，火车就是一个链表，每一节车厢就是元素，想要移除或是添加某一节车厢，只需要把连接车厢的链条改变一下就好了。
 */

/** 
 * 链表的创建:
 */
function LinkedList(){
    //各种属性和方法的声明
}

// 然后我们需要一种数据结构来保存链表里面的数据
// Node类表示要添加的元素，他有两个属性，一个是element，表示添加到链表中的具体的值；另一个是next,表示要指向链表中下一个元素的指针。
var Node=function(element){
    this.element=element;
    this.next=null;
}

// 接下来，我们需要给链表声明一些方法：
/** 
 * append(element):向链表尾部添加一个新的元素；
 * insert(position,element):向链表特定位置插入元素；
 * remove(element):从链表移除一项；
 * indexOf(element):返回链表中某元素的索引，如果没有返回-1；
 * removeAt(position):从特定位置移除一项；
 * isEmpty():判断链表是否为空，如果为空返回true,否则返回false;
 * size():返回链表包含的元素个数；
 * toString():重写继承自Object类的toString()方法，因为我们使用了Node类；
 */

// 链表的完整代码
function LinkedList() {
    //Node类声明
    let Node = function(element) {
        this.element = element;
        this.next = null;
    };

    // 初始化链表的长度
    let length = 0;
    // 初始化第一个元素
    let head = null;
    // append
    this.append = function(element) {
        // 初始化添加node实例
        let node = new Node(element);
        let current;

        if (head === null) {
            // 第一个Node实例进入链表，之后在这个linkedList实例中head就不再是null了
            head = node;
        } else {
            current = head;
            // 循环链表知道找到最后一项，循环结束current指向链表最后一项元素
            while(current.next) {
                current = current.next;
            }

            // 找到最后一项元素后，将他的next属性指向新元素node，然后建立起链接
            current.next = node;
        }

        // 更新链表的长度
        length++;
    };

    // 插入数据
    this.insert = function(position, element) {
        // 检测是否越界，超过链表长度或者是小于0，则不符合逻辑
        if (position >= 0 && position <= length) {
            let node = new Node(element);
            let current = head;
            let previous;
            let index = 0;

            if (position === 0) {
                // 在第一个位置添加
                node.next = current;
                head = node;
            } else {
                // 循环链表，找到正确位置，循环完毕，previous，current分别是被添加元素的前一个和后一个元素
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }

                node.next = current;
                previous.next = node;
            }

            // 更新链表长度
            length++;
            return true;
        } else {
            return false;
        }
    }

    this.rotateList = function(k) {
        let start = 1;
        let fast = head;
        
        /** 先让快指针走 n 给个位置 */
        while (start < k && fast.next !== null) {
            fast = fast.next;
            start ++;
        }

        /**
         * 循环结束后如果 start < k 表示 k 整个链表还要长 旋转后还是原链表
         * 如果 fast.next = null 表示 k 正好等于原链表的长度此时也不需要旋转
         */
        if (fast.next === null || start < k) {
            return head;
        }

        /** 倒数第 k + 1个节点 */
        let pre = fast;
        /** 旋转后的头结点 */
        let newHead = fast.next;

        while (fast.next !== null) {
            fast = fast.next;
        }

        /** 原链表的最后一个节点指向原来的头节点 */
        fast.next = head;
        /** 将旋转的节点的上一个节点变为尾节点 */
        pre.next = null;

        return newHead;
    }

    // 移除
    this.removeAt = function(position) {
        // 检查是否越界，超过链表长度或是小于0肯定不符合逻辑的
        if (position > -1 && position < length) {
            let current = head;
            let previous;
            let index = 0;

            // 移除第一个元素
            if (position === 0) {
                // 移除第一项，相当于head=null
                head = current.next;
            } else {
                // 循环链表，找到正确位置，循环完毕，previous，current分别是被添加元素的前一个和后一个元素
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }

                // 链接previous和current的下一个元素，也就是把current移除了
                previous.next = current.next;
            }

            length --;
            return current.element;
        } else {
            return null;
        }
    }

    this.getMid = function() {
        if (head === null) {
            return null;
        }

        let slow = head;
        let fast = head;

        /** fast.next = null 表示 fast 是链表的尾节点 */
        while(fast != null && fast.next !== null) {
            fast = fast.next.next;
            slow = slow.next;
        }

        return slow;
    }

    this.isloopList = function() {
        if (head === null) {
            return null;
        }

        let slow = head;
        let fast = head;

        /** 如果不是循环链表那么一定有尾部节点 此节点 node.next = null */
        while(slow !== null && fast !== null && fast.next !== null) {
            if (fast === slow || fast.next === slow) {
                return true;
            }

            fast = fast.next.next;
            slow = slow.next;
        }

        /** 如果不是循环链表返回 false */
        return false;
    }

    // 找到相关位置
    this.indexOf = function(element) {
        let current = head;
        let index = 0;

        // 循环链表找到元素位置
        while(current) {
            if (element === current.element) {
                return index;
            }

            index ++;
            current = current.next;
        }

        return -1;
    }

    // 移除某个元素
    this.remove = function(element) {
        //调用已经声明过的indexOf和removeAt方法
        let index = this.indexOf(element);
        return this.removeAt(index);
    }

    // 清空
    this.isEmpty = function() {
        return length === 0;
    };

    // 大小 
    this.size = function() {
        return length;
    };

    // 获取head
    this.getHead = function(){
        return head;
    };

    this.toString = function() {
        let current = head;
        let string = '';
        
        while(current) {
            string += current.element + (current.next ? ', ' : '');
            current = current.next;
        }

        return string;
    }

    this.print = function(){
        console.log(this.toString());
    };
}
