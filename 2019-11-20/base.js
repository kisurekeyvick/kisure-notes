/**
 * 编写数据结构和算法时会大量用到
 */

/**
 * (1) concat
 * concat() 方法用于连接两个或多个数组
 * 该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
 * 
 * concat方法可以向一个数组传递数组、对象或是元素
 * 
 * arrayObject.concat(arrayX,arrayX,......,arrayX)
 */
var zero = 0; 
var positiveNumbers = [1,2,3]; 
var negativeNumbers = [-3,-2,-1]; 
var numbers = negativeNumbers.concat(zero, positiveNumbers);
