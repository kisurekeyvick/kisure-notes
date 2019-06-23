/** 
 * 使用一组有限的字符串字面量
 */
type Index = 'a' | 'b' | 'c';
type FromIndex = { [k in Index]?: number };
const good: FromIndex = { b: 1, c: 2 };

/** 
 * 此处会报错，因为d属性不在FromIndex类型上
 */
const bad: FromIndex = { b: 1, c: 2, d: 3 };

/** 
 * 同时拥有 string 和 number 类型的索引签名
 */

 /** 
  * 设计模式：索引签名的嵌套
  * 尽量不要使用这种把字符串索引签名与有效变量混合使用。如果属性名称中有拼写错误，这个错误不会被捕获到
  */
interface NestedCSS {
    color?: string;
    nest?: {
      [selector: string]: NestedCSS;
    };
}

interface errorNestedCSS {
    color?: string; 
    [selector: string]: string | NestedCSS;
}

// 所以说，尽量不要使用这种把字符串索引签名与有效变量混合使用。如果属性名称中有拼写错误，这个错误不会被捕获到
const errorExample: errorNestedCSS = {
    colour: 'red'
};

const example: NestedCSS = {
    color: 'red',
    nest: {
      '.subclass': {
        color: 'blue'
      }
    }
}

/** 
 * 索引签名中排除某些属性
 */
// 有时，你需要把属性合并至索引签名（虽然我们并不建议这么做，你应该使用上文中提到的嵌套索引签名的形式）,如下：
type FieldState = {
    value: string;
};
  
type FromState = {
    isValid: boolean; // Error: 不符合索引签名
    [filedName: string]: FieldState;
};

// 但是如果我们这么写，那么ts会报错，因为添加的索引签名，并不兼容它原有的类型，所以我们可以使用交叉类型可以解决上述问题
type FormState_2 = { isValid: boolean } & { [fieldName: string]: FieldState };

// 请注意尽管你可以声明它至一个已存在的 TypeScript 类型上，但是你不能创建如下的对象：

// 将它用于从某些地方获取的 JavaScript 对象
declare const foo_kk: FormState_2;

const isValidBool = foo_kk.isValid;
const somethingFieldState = foo_kk['something'];

// 使用它来创建一个对象时，将不会工作
const bar_kkas: FormState_2 = {
    // 'isValid' 不能赋值给 'FieldState'
    isValid: false
};