/** 
 * https://juejin.im/post/5e38dd65518825492b509dd6
 * 
 * TypeScript 参数简化实战（进阶知识点conditional types，中高级必会）
 */

/** 
 * (1) 先简单的看一个条件类型的示例
 */
function process<T extends string | null>(text: T): T extends string ? string : null {
}
/** 
 * A extends B ? C : D
 * 这样的语法就叫做条件类型，A, B, C和D可以是任何类型表达式。
 */

/** 
 * (2) 可分配性
 * 
 * 这个extends关键字是条件类型的核心。 A extends B恰好意味着可以将类型A的任何值安全地分配给类型B的变量。在类型系统术语中，我们可以说“ A可分配给B”。
 * 
 * 从结构上来讲，我们可以说A extends B，就像“ A是B的超集”，或者更确切地说，“ A具有B的所有特性，也许更多”。
 * 
 * 举个例子来说 { foo: number, bar: string } extends { foo: number }是成立的，因为前者显然是后者的超集，比后者拥有更具体的类型
 */

/** 
 * (3) 分布条件类型
 * 
 * 简单来说，传入给T extends U中的T如果是一个联合类型A | B | C，则这个表达式会被展开成：
 * (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
 */ 
// 条件类型让你可以过滤联合类型的特定成员。 为了说明这一点，假设我们有一个称为Animal的联合类型：
type Animal = Lion | Zebra | Tiger | Shark;

// 再假设我们要编写一个类型，来过滤出Animal中属于“猫”的那些类型
type ExtractCat<A> = A extends { meow(): void } ? A : never;
type Cat = ExtractCat<Animal>;

// 接下来，Cat的计算过程会是这样子的：
type Cat =
  | ExtractCat<Lion>
  | ExtractCat<Zebra>
  | ExtractCat<Tiger>
  | ExtractCat<Shark>

// 然后，它被计算成联合类型
type Cat = Lion | never | Tiger | never;

// 然后，联合类型中的never没什么意义，所以最后的结果的出来了：
type Cat = Lion | Tiger


/** 
 * (4) 分布条件类型的真实用例
 * 
 * 举一个类似redux中的dispatch的例子。
 * 首先，我们有一个联合类型Action，用来表示所有可以被dispatch接受的参数类型:
 */  
type Action = { type: "INIT" } | { type: "SYNC" } | {
        type: "LOG_IN"
        emailAddress: string
    } | {
        type: "LOG_IN_SUCCESS"
        accessToken: string
    };

declare function dispatch(action: Action): void;

// ok
dispatch({
    type: "INIT"
});

// ok
dispatch({
    type: "LOG_IN",
    emailAddress: "david.sheldrick@artsy.net"
});

// ok
dispatch({
    type: "LOG_IN_SUCCESS",
    accessToken: "038fh239h923908h"
});
    
// 这个API是类型安全的，当TS识别到type为LOG_IN的时候，它会要求你在参数中传入emailAddress这个参数，这样才能完全满足联合类型中的其中一项。


/** 
 * (5) 参数简化实现
 */
/** 
 * 首先，利用方括号选择出Action中的所有type，这个技巧很有用
 */
type ActionType = Action["type"];
// => "INIT" | "SYNC" | "LOG_IN" | "LOG_IN_SUCCESS"

// 但是第二个参数的类型取决于第一个参数。 我们可以使用类型变量来对该依赖关系建模。
declare function dispatch<T extends ActionType>(
    type: T,
    args: ExtractActionParameters<Action, T>
): void;
  
/** 
 * 注意，这里就用到了extends语法，规定了我们的入参type必须是ActionType中一部分。
 * 
 * 注意这里的第二个参数args，用ExtractActionParameters<Action, T>这个类型来把type和args做了关联，
 */
// 来看看ExtractActionParameters是如何实现的
type ExtractActionParameters<A, T> = A extends { type: T } ? A : never;

/** 
 * 在这次实战中，我们第一次运用到了条件类型，ExtractActionParameters<Action, T>会按照我们上文提到的分布条件类型，
 * 把Action中的4项依次去和{ type: T }进行比对，找出符合的那一项。
 * 
 * 来看看如何使用它：
 */
type Test = ExtractActionParameters<Action, "LOG_IN">;
// => { type: "LOG_IN", emailAddress: string }

/** 
 * 这样就筛选出了type匹配的一项。
 * 接下来我们要把type去掉，第一个参数已经是type了，因此我们不想再额外声明type了。
 */
// 把类型中key为"type"去掉
type ExcludeTypeField<A> = { [K in Exclude<keyof A, "type">]: A[K] };
// { emailAddress: string }

/** 
 * 这里利用了keyof语法，并且利用内置类型Exclude把type这个key去掉，因此只会留下额外的参数。
 */
type Test1 = ExcludeTypeField<{ type: "LOG_IN", emailAddress: string }>;
// { emailAddress: string }


/** 
 * (6) 利用重载进一步优化
 * 
 * 到了这一步为止，虽然带参数的Action可以完美支持了，但是对于"INIT"这种不需要传参的Action，我们依然要写下面这样代码：
 */
dispatch("INIT", {});

/**
 * 这肯定是不能接受的！所以我们要利用TypeScript的函数重载功能。
 * @param type 
 */
// 简单参数类型
function dispatch<T extends SimpleActionType>(type: T): void

// 复杂参数类型
function dispatch<T extends ComplexActionType>(
  type: T,
  args: ExtractActionParameters<Action, T>,
): void

// 实现
function dispatch(arg: any, payload?: any) {};

/** 
 * 那么关键点就在于SimpleActionType和ComplexActionType要如何实现了
 * SimpleActionType 顾名思义就是除了type以外不需要额外参数的Action类型
 */

/** 
 * 我们可能会凭直觉写出这样的代码
 * 
 * type ExtractSimpleAction<A> = ExcludeTypeField<A> extends {} ? A : never
 * 但这样是行不通的，几乎所有的类型都可以extends {}，因为{}太宽泛了
 * 
 * 我们应该反过来写：
 * type ExtractSimpleAction<A> = {} extends ExcludeTypeField<A> ? A : never
 * 但这仍然行不通！ 因为分布条件类型仅在extends关键字左侧是类型变量时发生。
 * 
 * type Blah<Var> = Var extends Whatever ? A : B;
 * 
 * 而不是：
 * type Blah<Var> = Foo<Var> extends Whatever ? A : B
 * type Blah<Var> = Whatever extends Var ? A : B
 * 
 * 但是我们可以通过一些小技巧绕过这个限制：
 */
type ExtractSimpleAction<A> = A extends any
  ? {} extends ExcludeTypeField<A>
    ? A
    : never
  : never

/** 
 * A extends any是一定成立的，这只是用来绕过ts对于分布条件类型的限制，而我们真正想要做的条件判断被放在了中间，因此Action联合类型中的每一项又能够分布的去匹配了。
 * 那么我们就可以简单的筛选出所有不需要额外参数的type
 */
type SimpleAction = ExtractSimpleAction<Action>;
type SimpleActionType = SimpleAction['type'];
 