/**
 * 这里我们先看一个例子：class状态组件和函数组件带hooks
 */

class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
  
    render() {
      return (
        <div>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
          </button>
        </div>
      );
    }
}

import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

/** 
 * (1)react提供了hooks，其中如果函数组件使用useState，那么这个函数就存在自己的状态了，并且还可以更新状态
 * (2)
*/

/**
 * react 为什么要搞一个hooks？
 * react都核心思想就是，将一个页面拆成一堆独立的，可复用的组件，并且用自上而下的单向数据流的形式将这些组件串联起来。
 * 但假如你在大型的工作项目中用react，你会发现你的项目中实际上很多react组件冗长且难以复用。尤其是那些写成class的组件，
 * 它们本身包含了状态（state），所以复用这类组件就变得很麻烦
 * 
 * 寻常情况下使用class或者函数式组件存在的问题：
 * (1)用class来创建react组件时,需要处理this指向问题，为了保证this的指向正确，我们要经常写这样的代码：this.handleClick = this.handleClick.bind(this)，
 *      或者是这样的代码：<button onClick={() => this.handleClick(e)}>。一旦我们不小心忘了绑定this，各种bug就随之而来。
 * (2)我们用function写了一个简洁完美的无状态组件，后来因为需求变动这个组件必须得有自己的state，我们又得很麻烦的把function改成class。
 * (3)
 */

/** 
 * react hook相关的一些api
 * https://blog.csdn.net/weixin_44282875/article/details/85277868
 * 
 * (1) const [count, setCount] = useState(0);
 *      count 相当于 之前的 state.count
 *      setCount 相当于 this.setState(count)
 *      useState(0) 相当于 状态以 { count: 0 } 开始
 * 
 * (2) 使用多个 state(状态) 变量
 *      例如： 
 *          const [age, setAge] = useState(42);
            const [fruit, setFruit] = useState('banana');
            const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
    
    (3) Effect Hook
        可以将 useEffect Hook 视为 componentDidMount，componentDidUpdate 和 componentWillUnmount的组合
*/