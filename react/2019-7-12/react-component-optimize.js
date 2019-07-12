/** 
 * https://juejin.im/post/5d26fdb8f265da1b5e731dfe
 * 
 * 可能你的react函数组件从来没有优化过
 */

/** 
 * 前言：
 * 
 * 16.6之前，函数组件没有像shouldComponentUpdate这样的方法，也没有类似PureComponent这种解决方案，
 * 避免不了函数组件里面所有的代码再次的执行，要依靠外面的条件渲染来控制，或者是高阶组件。
 * 
 * 之前的话，选择使用函数组件的情况是一些比较简单的又比较纯的组件，只是负责展示的。
 * 而且函数组件最终编译babel结果是只执行createElement那一步
 */

/** 
 * React.memo
 * 
 * 当16.6的memo问世，函数组件就有了类似PureComponent和shouldComponentUpdate的解决方案，memo的使用方法。
 * 
 * 当父组件执行render的时候，避免不了C组件的渲染和C函数的执行。
 * （如果不在外面加判断的话：{isShowC && <C />}）。当到了C组件的时候，会浅比较C组件前后props值。
 * 如果props每一个属性值都一样，会跳过函数组件C的执行，减少了不必要的渲染，达到了性能优化。
 */
const C = (props) => {
    return <section>hello {props.name} 你好！</section>
}
export default React.memo(C);

/** 
 * memo第二个参数
 * 
 * 第二个参数，是一个函数，该函数传入参数是新props和上次props，我们可以在函数里面做判断逻辑，控制返回值。
 * 当我们让函数return true的时候，告诉了react这两个props是一样的，不用重新执行整个函数组件；
 * 反之false的时候会重新执行该组件
 */
/**
 * 比如这行代码，判断函数一直返回false，memo包住的IfEqual组件无论怎样都会重新执行
 **/
memo(IfEqual, () => false);

React.memo(C, (nextProps, prevProps) => {
    // 做我们想做的事情，类似shouldComponentUpdate
});

/** 
 * 函数组件中传入的props值为函数时
 * 
 * 我们都知道，js中函数不是简单数据类型，也就是说function(){}和function(){}是不一样的，与{}和{}不一样同理。
 * 那么我们传入props.onClick（即使是长得一样的内容完全一样），前后props.onClick都不能划上等号。
 */
<div>
    <IfEqual onClick={() => {}} />
</div>
/** 
 * 然而onClick里面的function在组件每一次执行都是不一样的。
 * 因为函数组件的渲染，也就是执行，每一次重新执行，函数作用域里面一切都是重新开始。
 * 这就相当于上一次组件渲染const handleClick = () => {}，后面渲染又一次const handleClick = () => {},
 * 它们都不是同一个东西。
 */

/** 
 * 如何解决多余一次的渲染？
 * 
 * 当函数组件中的props为：{ a: 1, onClick: () => {} }
 * 在我们知道onClick是做同一个事情的函数的前提下，不比较onClick
 * React.memo(C, (nextProps, prevProps) => nextProps.a === prevProps.a)
 * 
 * 最后，前后props的onClick，它们只有一种情况是一样的——把声明抽到组件外面去
 */
const handleClick = () => {} 
export default () => {
  return (
    <div>
      <IfEqual onClick={handleClick} />
    </div>
  )
};

/** 
 * useCallback
 * 
 * 函数组件把函数定义写在外面，是可以解决问题。但是，如果handleClick依赖组件内部的一些变量，
 * 那handleClick又不得不写在里面（当然利用引用类型可以解决）。或者还是正常写，
 * 靠memo第二个参数来控制要不要重新渲染子函数组件。但是无论怎样，都存在一个问题，就是那一块代码写在里面呢，
 * 都无法避免代码的执行和函数的重新定义，比如：
 */

function a(){
    const b = function(){
        console.log(1)
        // 很多很多代码
    }
}
a()
a()  // 函数b又被定义了一次

// 如果我们通过依赖来确定前后两次是不是同一个函数，我们可以用函数记忆来实现整个功能

// 我们来实现一个伪useCallback
// 半伪代码
let prev
let prevDeps
function memorize(fn, deps) {
    // 前后依赖一致，不用重新计算直接返回上次结果
    if (prev && isEqual(deps, prevDeps)) {
        return prev
    }
    prevDeps = deps
    prev = fn
    return fn
}

function a(){
    const b = memorize(function(){
        console.log(1)
        // 很多很多代码
    }, [])
}
a()
a() // 函数b是同一个

/** 
 * 类似函数记忆的原理，后来有了useCallback的出现，多了一种新的解决方案，根据依赖生成一个函数：
 * 
    const handleClick = useCallback(() => {
        console.log(dep)
    }, [dep])

    当dep不变，每一次函数组件的执行，handleClick都是同一个函数。如果dep变了，那么handleClick又是一个新的函数
 */
// 案例代码；
export default () => {
    // 没有依赖，永远是同一个函数
    const handleClick = useCallback(() => {}, []);
    
    // 依赖a，重新执行函数组件，a不变的，是同一个函数
    // a变了handleClick是新的函数
    const handleClick1 = useCallback(() => {}, [a]);
    return (
        <div>
            <IfEqual onClick={handleClick} />
        </div>
    );
}

/** 
 * react组件也是一个函数，那其实useCallback还可以做一个函数组件：
 */
export default () => {
    // 没有依赖，永远是同一个函数
    const handleClick = useCallback(() => {}, []);

    // 依赖handleClick，重新执行函数组件，handleClick不变的，是同一个函数
    const Cpn = useCallback(({ name }) => {
        return <button onClick={handleClick}>{name}</button>;
    }, [handleClick]);
    
    return (
        <div>
            <Cpn name="hi" />
        </div>
    )
}
/** 
 * 上面的方法，只是在初始化的时候，渲染，后续是不会重新渲染的。因为Cpn监听的是handleClick是否存在变化
 * 而handleClick是不会变化的，所以Cpn也不会变化
 *  */

/** 
 * useMemo
 */
const a = useMemo(() => memorizeValue, deps);

/**
 * 当deps不变，a的值还是上次的memorizeValue，省去了重新计算的过程。
 * 如果memorizeValue是一个函数，和useCallback是一样的效果：
 *      useCallback(fn, inputs) <=> useMemo(() => fn, inputs)
 */

// 我们可以试一下同步执行的代码，当时间非常长的时候，useMemo可以发挥它的作用了：
// 强行更新组件
const useForceUpdate = () => {
    const forceUpdate = useState(0)[1];
    return () => forceUpdate(x => x + 1);
}

// 一个很耗时间的代码
function slowlyAdd(n) {
    console.time('add slowly')
    let res = n;
    for (let i = 0; i < 2000000000; i++) {
        res += 1;
    }
    console.timeEnd('add slowly')
    return res;
}
  
// useMemo记忆结果的一个自定义hook
function useSlowlyAdd(n) {
    const res = useMemo(() => {
        return slowlyAdd(n);
    }, [n])
    return res;
}
  
export default () => {
    const [count, add] = useState(1);
    const forceUpdate = useForceUpdate();
    const handleClick = useCallback(() => {}, []);
    useSlowlyAdd(count); // 第一次这里会耗很多时间，页面卡死一阵
    return (
      <>
        <button onClick={forceUpdate}>更新页面</button>
        <button onClick={() => add(count + 1)}>+</button>
      </>
    );
}

/**
 * 第一次进来，页面暂时没有任何反应一阵，这是因为slowlyAdd占用了js主线程。
 * 当我们点击‘更新页面’更新的时候，页面并没有卡死，而且组件也重新渲染执行了一次。
 * 当我们点击+，页面又开始卡死一阵。
 * 这是因为点击+的时候，修改了useMemo的依赖n，n变了重新计算，计算耗费时间。
 * 如果点击更新页面，没有修改到依赖n，不会重新计算，页面也不会卡。
 * 
 * 当然，useMemo也可以做高阶组件，用起来的时候，可以写成reactElement的形式了：
 * const HOC = useMemo(() => <C />, deps)
 */
