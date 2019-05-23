/** 
 * 声明空间
 */

/** 
 * 类型声明空间
 * 
 * 类型声明空间包含用来当做类型注解的内容，例如以下的一些类型声明:
 */
class Foo {}
interface Bar {}
type Bas = {};

let foo: Foo;
let bar: Bar;
let bas: Bas;

/** 
 * 变量声明空间
 * 
 * 变量声明空间包含可用作变量的内容，在上文中 Class Foo 提供了一个类型 Foo 到类型声明空间，
 * 此外它同样提供了一个变量 Foo 到变量声明空间，如下所示：
 */
const someVar = Foo;
const someOtherVar = 123;
