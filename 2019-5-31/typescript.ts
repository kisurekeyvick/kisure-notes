// function test(fun: Function, ...args: any[]) { 
//     return fun.apply(null, args)
// }

type AnyFunction = (...args: any[]) => any
function test<T extends AnyFunction, P extends Parameters<T>>(fun: T, ...args: P): ReturnType<T> { 
    return fun.apply(null, args)
}
