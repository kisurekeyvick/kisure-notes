/** 
 * 首先需要了解 使用react hooks的特性，需要react版本为V18以上
 */
import * as React from 'react';
import { Button } from 'antd';

// 创建共享的context，用于父子组件数据的传递
const KisureContext = React.createContext(0);

export interface IClickTimesprops {
    [key: string]: any
}

export const ClickTimes: React.FC<IClickTimesprops> = props => {
    /**
     * useState(0)  // 0 代表的是初始值
     * useState返回一个数组，前者count是执行以后的初始值，后者setCount是修改state的方法
     */

    /**
     * 但是react是如何记住count的值呢？
     * 是用过useState的顺序来记录值的，所以我们也需要注意，useState是不能够使用在条件判断之中的
     */


    const [ count, setCount] = React.useState(0);
    const [ count_2, setCount_2] = React.useState(2);

    /** 
     * useEffect
     * 
     * （1）userEffect 是可以代表componentDidMount,componnetDidUpdate,componentWillUnmount的
     *      - componentWillUnmount:
     *        如果我们在  useEffect 的回调函数中在一次return 一个function，那么这个function执行的功能就相当于是在componentWillUnmount执行的东西
     * 
     *        但是需要注意的一点，如果我们不监听state（也就是第二个参数不写），那么每一次state发生改变的时候就会去执行一遍return中的函数
     *        所以如果想要做componentWillUnmount的功能，需要单独的使用useEffect（例如：第三个useEffect）
     * 
     * 
     * （2） 如果使用第二个参数什么也不写，那么就代表监听所有的状态
     *      如果第二个参数写了[]，那么useEffect只会在初始化的时候执行依次，后面无论state如何变化都不会触发
     *      如果第二个参数[]中写了某些个state，那么当这几个state（只要有一个state发生变化），那么就会触发这个方法
     * 
     * （3）useState里面的函数式异步的 
     */
    React.useEffect(() => {
        console.log(`count 发生变化了,当前的值为：${count}`);
    }, [count]);

    React.useEffect(() => {
        console.log(`count_2 发生变化了,当前的值为：${count_2}`);
    }, [count_2]);

    // 第三个useEffect
    React.useEffect(() => {
        return () => {
            console.log(`离开当前页面`);
        }
    }, []);

    /**
     * useContext
     * 用于解决父组件的传值
     */
    
    const click = () => {
        setCount(count + 1);
    };

    const click_2 = () => {
        setCount_2(count_2 + 1);
    };

    return <div>
                <p>已经被点击了{count}次</p>
                <Button onClick={click}>点击</Button>

                <p>起步为2，被点击了{count_2}次</p>
                <Button onClick={click_2}>点击</Button>

                <KisureContext.Provider value={count}>
                    <ChildTimes />
                </KisureContext.Provider>

                <ChildrenReducer />

                <ParentMeMemo />
            </div>
}

interface childProps {
    [key: string]: any;
}

/**
 * 子组件
 * @param props 
 */
const ChildTimes: React.FC<childProps> = props => {
    /**
     * useContext
     * 
     * useContext接收的参数是： React.createContext(0)，这样就可以获取到对应的state了
     */
    let count = React.useContext(KisureContext);

    return <div>
        我是子组件，共享的字段为count，它的值为{count}
    </div>
}

/**
 * 子组件
 * @param props 
 */
const ChildrenReducer: React.FC<childProps> = props => {
    /**
     * useReducer  这里就是相当于简单版本的redux
     * 
     * 第一个参数是reducer，用于更改state
     * 第二个参数是state的初始值
     */
    const [count, dispatch] = React.useReducer((state, action) => {
        switch(action) {
            case 'add':
                    return state + 1;
            case 'minus':
                    return state - 1;
            default:
                    return state;
        }
    }, 0);

    const changeCount = (type: string) => {
        dispatch(type);
    }

    return <div>
                <p>当前子组件的count值为{count}</p>
                <Button onClick={() => changeCount('add')}>子组件点击增加count</Button>
                <Button onClick={() => changeCount('minus')}>子组件点击减少count</Button>
            </div>
}

/**
 * 子组件
 * @param props 
 */
const ParentMeMemo: React.FC<childProps> = props => {
    const [kisure, kisureFunc] = React.useState();
    const [niceFish, niceFishFunc] = React.useState();

    const click = (name: string) => {
        if (name === 'kiusre') {
            kisureFunc(`${new Date().getTime()} this is kisure clicked`);
        } else {
            niceFishFunc(`${new Date().getTime()} this is niceFish clicked`);
        }
    }

    /** 
     * 这个父组件的操作就是，点击两个按钮分别改变对应的state值
     */

    return <div style={{ marginTop: '48px' }}>
            hello this is parent useMemo
            <Button onClick={() => click('kiusre')}>kiusre</Button>
            <Button onClick={() => click('niceFish')}>niceFish</Button>
            <p>---------------------</p>
            <ChildMeMemo {...{ name: kisure}}>{ `niceFish: ${niceFish}` }</ChildMeMemo>
        </div>
}

interface InnerChild {
    name: string;
    [key: string]: any;
}

const ChildMeMemo: React.FC<InnerChild> = props => {
    function run() {
        console.log('这个是kisure的子组件');

        return props.name + '' + new Date().getTime() + '改变';
    }

    /**
     * useMemo
     * 
     * 存在两个参数
     * 第一个参数传入一个function，
     * 第二个参数是数组，[]写入对应的props，如果子组件的props值被父组件所改变了，那么才会重新执行run,然后重新渲染
     * 如果对应的props的值没有发生改变，那么子组件就不会重新渲染了
     */
    const changeVal = React.useMemo(() => {
        return run();
    }, [props.name]);

    return <div>
        <p>{ changeVal }</p>
        hello this is child useMemo
    </div>
} 

/**
 * useRef
 * 用法：const refContainer = React.useRef(初始值);
 */
function TextInputWithFocusButton() {
    const inputEl = React.useRef(null);
    const onButtonClick = () => {
        // `current` points to the mounted text input element
        inputEl.current.focus();
    };
    return (
        <>
          <input ref={inputEl} type="text" />
          <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}

/** 
 * useImperativeMethods
 * 用法： useImperativeMethods(ref, createInstance, [inputs])
 * useImperativeMethods自定义使用ref时公开给父组件的实例值。与往常一样，在大多数情况下应避免使用refs的命令式代码。 
 * useImperativeMethods应与forwardRef一起使用
 */
function FancyInput(props, ref) {
    const inputRef = React.useRef();
    React.useImperativeMethods(ref, () => {
        focus: () => {
            inputRef.current.focus();
        }
    });
    return <input ref={inputRef}/>
}

const FanInput = React.forwardRef(FancyInput);

// 在此示例中，呈现<FanInput ref = {fancyInputRef} />的父组件将能够调用fancyInputRef.current.focus()。

/** 
 * useCallback
 * 
 * useCallback将返回一个回忆的memoized版本，该版本仅在其中一个输入发生更改时才会更改。
 * 当将回调传递给依赖于引用相等性的优化子组件以防止不必要的渲染（例如，shouldComponentUpdate）时，这非常有用。
 * 
 * useCallback(fn，inputs) 等效 useMemo(() => fn，inputs)
 */
const memoizedCallback = useCallback(() => {
    run();  
}, [a,b])


