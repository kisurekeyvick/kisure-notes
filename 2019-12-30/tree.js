/**
 * 树
 * 
 * 位于树顶部的节点叫作根节点。
 * 树中的每个元素都叫作节点，节点分为内部节点和外部节点。
 * 一个节点可以有祖先和后代。一个节点（除了根节点）的祖先包括父节点、祖父节点、曾祖父节点等。
 * 一个节点的后代包括子节点、孙子节点、曾孙节点等。
 */

/** 
 * 二叉树和二叉搜索树
 * 
 * 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。
 * 二叉搜索树（BST）是二叉树的一种，但是它只允许你在左侧节点存储（比父节点）小的值，
 *      在右侧节点存储（比父节点）大（或者等于）的值。
 * 
 * 一个指向左侧子节点，另一个指向右侧子节点。因此，将声明一个Node类来表示树中的每个节点。
 * 值得注意的一个小细节是，不同于在之前的章节中将节点本身称作节点或项，我们将会称其为键。
 * 键是树相关的术语中对节点的称呼。
 */
function BinarySearchTree() {
    const Node = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    const insertNode = function(node, newNode) {
        // 如果新节点的键小于当前节点的键
        if (newNode.key < node.key) {
            if (node.left === null) {
                // 检查当前节点的左侧子节点。如果它没有左侧子节点，就在那里插入新的节点
                node.left = newNode;
            } else {
                // 如果有左侧子节点，需要通过递归调用insertNode方法继续找到树的下一层。
                insertNode(node.left, newNode);
            }
        } else {
            // 如果节点的键比当前节点的键大
            if (node.right === null) {
                // 当前节点没有右侧子节点,就在那里插入新的节点
                node.right = newNode;
            } else {
                // 如果有右侧子节点，同样需要递归调用insertNode方法
                insertNode(node.right, newNode);
            }
        }
    }

    let root = null;

    this.insert = function(key) {
        const newNode = new Node(key);
        if (root === null) {
            root = newNode;
        } else {
            insertNode(root, newNode);
        }
    }
}

/** 
 * 树的遍历
 * 
 * 访问树的所有节点有三种方式：中序、先序和后序。
 */

/** 
 * (1) 中序遍历
 * 
 * 从最小到最大的顺序访问所有节点。
 * 访问顺序：先访问左侧子节点，再访问当前节点，再访问右侧子节点
 */
// inOrderTraverse方法接收一个回调函数作为参数。回调函数用来定义我们对遍历到的每个节点进行的操作
BinarySearchTree.prototype.inOrderTraverse = function(callback) {
    /**
     * 要通过中序遍历的方法遍历一棵树，首先要检查以参数形式传入的节点是否为null
     * （这就是停止递归继续执行的判断条件——行{2}——递归算法的基本条件）。
     * @param {*} node 
     * @param {*} callback 
     */
    const inOrderTraverseNode = function(node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            inOrderTraverseNode(node.right, callback);
        }
    }

    inOrderTraverseNode(root, callback);
}

function printNode(value){
    console.log(value); 
} 
tree.inOrderTraverse(printNode);

// 查看【中序遍历.jpg】 
// 输出顺序：3 5 6 7 8 9 10 11 12 13 14 15 18 20 25


/** 
 * 先序遍历
 * 访问顺序：先访问当前节点，在访问左侧子节点，再访问右侧子节点
 */
BinarySearchTree.prototype.preOrderTraverse = function(callback) {
    var preOrderTraverseNode = function (node, callback) { 
        if (node !== null) { 
            callback(node.key); //{1} 
            preOrderTraverseNode(node.left, callback); //{2} 
            preOrderTraverseNode(node.right, callback); //{3}
        } 
    };

    preOrderTraverseNode(root, callback);
}
/** 
 * 先序遍历和中序遍历的不同点是，先序遍历会先访问节点本身（行{1}），
 * 然后再访问它的左侧子节点（行{2}），最后是右侧子节点（行{3}），
 * 而中序遍历的执行顺序是：{2}、{1}和{3}。
 */
// 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25


/** 
 * 后序遍历
 * 遍历顺序：先遍历左侧子节点，再遍历右侧子节点，再访问当前节点
 */
BinarySearchTree.prototype.postOrderTraverse = function(callback) {
    var postOrderTraverseNode = function (node, callback) { 
        if (node !== null) { 
            postOrderTraverseNode(node.left, callback); //{1} 
            postOrderTraverseNode(node.right, callback); //{2} 
            callback(node.key); //{3} 
        } 
    };

    postOrderTraverseNode(root, callback);
}

//输出结果： 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11 

/** 
 * 搜索树中的值
 * 
 * 最小值；
 * 最大值；
 * 搜索特定的值；
 */
// 查找最小值
BinarySearchTree.prototype.min = function() { 
    var minNode = function (node) { 
        if (node){ 
            while (node && node.left !== null) { //{2} 
                node = node.left; //{3} 
            } 
            return node.key; 
        }

        return null; //{4} 
    };

    return minNode(root); //{1} 
};

// 查找最大值
BinarySearchTree.prototype.max = function() {
    var maxNode = function (node) { 
        if (node){ 
            while (node && node.right !== null) { //{5} 
                node = node.right; 
            } 
            return node.key; 
        }

        return null; 
    };

    return maxNode(root);
};

// 搜索某个特定的值
BinarySearchTree.prototype.search = function() {
    var searchNode = function(node, key){ 
        if (node === null){ //{2} 
            return false; 
        }

        if (key < node.key){ //{3} 
            return searchNode(node.left, key); //{4} 
        } else if (key > node.key){ //{5} 
            return searchNode(node.right, key); //{6} 
        } else { 
            return true; //{7} 
        } 
    };

    return searchNode(root, key);
}

/** 
 * 移除一个节点
 */
BinarySearchTree.prototype.remove = function() {
    var removeNode = function(node, key) {
        if (node === null){ //{2} 
            return null; 
        }

        if (key < node.key){ //{3} 
            node.left = removeNode(node.left, key); //{4} 
            return node; //{5} 
        } else if (key > node.key){ //{6} 
            node.right = removeNode(node.right, key); //{7} 
            return node; //{8} 
        } else {
            //键等于node.key
            //第一种情况——一个叶节点
            if (node.left === null && node.right === null){ //{9} 
                node = null; //{10} 
                return node; //{11} 
            } 
            //第二种情况——一个只有一个子节点的节点
            if (node.left === null){ //{12} 
                node = node.right; //{13} 
                return node; //{14} 
            } else if (node.right === null){ //{15} 
                node = node.left; //{16} 
                return node; //{17} 
            } 
            //第三种情况——一个有两个子节点的节点
            var aux = findMinNode(node.right); //{18} 
            node.key = aux.key; //{19} 
            node.right = removeNode(node.right, aux.key); //{20} 
            return node; //{21}
        }
    };

    root = removeNode(root, key);
}
