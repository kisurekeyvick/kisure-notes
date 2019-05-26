/** 
 * never 
 * 代表：(1)一个从来不会有返回值的函数
 *      (2)一个总是会抛出错误的函数
 * 
 * 需要注意的是：但是，never 类型仅能被赋值给另外一个 never
 */

// 案例
function foo(x: string | number): boolean {
    if (typeof x === 'string') {
      return true;
    } else if (typeof x === 'number') {
      return false;
    }
  
    // 如果不是一个 never 类型，这会报错：
    // - 不是所有条件都有返回值 （严格模式下）
    // - 或者检查到无法访问的代码
    // 但是由于 TypeScript 理解 `fail` 函数返回为 `never` 类型
    // 它可以让你调用它，因为你可能会在运行时用它来做安全或者详细的检查。
    return fail('Unexhaustive');
}
  
function fail(message: string): never {
    throw new Error(message);
}

/** 
 * never和void的区别
 * 
 * void 表示没有任何类型，never 表示永远不存在的值的类型
 * 当一个函数没有返回值时，它返回了一个 void 类型
 * 当一个函数根本就没有返回值时（或者总是抛出错误），它返回了一个 never。
 * 
 * 通俗点理解：
 * void是一个类型，只不过是一个空类型
 * never表示不会有返回类型，死循环和报错属于此列
 */
