/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function(root) {
    let history = {
 '1': [root.val]
};
const readNode = (node, layer) => {
 // 每一层的宽度被定义为两个端点（该层最左和最右的非空节点，两端点间的null节点也计入长度）之间的长度。
 if (!history.hasOwnProperty(layer + 1)) {
     history[layer + 1] = [];
 }

 let left = node && node.left || { val: null };
 let right = node && node.right || { val: null };
 history[layer + 1].push(left.val, right.val);

 // 进行下一次的循环
 if (node) {
     if (node.left || node.right) {
         readNode(node.left, layer + 1);
         readNode(node.right, layer + 1);
     }
 }
};

readNode(root, 1);

console.log(history);
        const historyArr = Object.values(history).map(item => {
            console.log(item);
 if (item[0] !== null && item[item.length - 1] !== null) {
     return item;
 } else {
     let firstIndex = -1;
     let lastIndex = -1;

     for(let i = 0; i < item.length; i++) {
         if (item[i] !== null) {
             firstIndex = i;
             break;
         }
     }

     for(let i = 0; i < item.length; i++) {
         if (item[i] !== null) {
             lastIndex = i;
         }
     }
     // console.log(item, firstIndex, lastIndex);

     if (firstIndex === -1 && lastIndex === -1) {
         return [];
     } else if (firstIndex === lastIndex) {
         return item.splice(firstIndex, 1);
     }

     return item.splice(firstIndex, lastIndex + 1 - firstIndex);;
 }
});

console.log('hihi');
console.log(historyArr);
let maxLength = 0;
historyArr.forEach(history => {
 if (history.length > maxLength) {
     maxLength = history.length;
 }
});

return maxLength;
};