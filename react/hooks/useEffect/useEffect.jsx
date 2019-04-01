import React from 'react';
class Person extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          username: "scq000"
      };
  }
  
  componentDidMount() {
      console.log('componentDidMount: 组件加载后')
  }
  
  componentWillUnmount() {
      console.log('componentWillUnmount: 组件卸载， 做一些清理工作')
  }
  
  componentDidUpdate(prevProps, prevState) {
      if(prevState.username !== this.state.username) {
          console.log('componentDidUpdate： 更新usernmae')
      }
  }
  
  render() {
      return (
        <div>
            <p>Welcome to homepage. {state.username}</p>
            <input type="text" placeholder="input a username" onChange={(event) => this.setState({ username: event.target.value})} />
        </div>
      )
  }
}

// 使用useEffect来代替class
import React from 'react';
import { useState, useEffect } from 'react';

export const Person = () => {
  const [state, setState] = useState({username: "scq000"});
  
  // 如果你传入一个空依赖，就能实现原来componentDidMount的效果，即只会执行一次
  useEffect(() => {
      console.log('componentDidMount: 组件加载后')
      return () => {
        console.log('componentWillUnmount: 组件卸载， 做一些清理工作')
      }
  }, []);
  
  // 如果传入的不是[]，那么一旦检测到依赖项数据变动，组件会更新，并且回调函数都会被再次执行一遍，从而实现componentDidUpdate的功能
  useEffect(() => {
      console.log('componentDidUpdate： 更新usernmae')
  }, [state.username]);
  
  return (
    <div>
        <p>Welcome to homepage. {state.username}</p>
        <input type="text" placeholder="input a username" onChange={(event) => setState({username: event.target.value})}></input>
    </div>
  )
}

// 使用useEffect进行订阅
// 这个组件使用了一个副作用函数来订阅一个朋友的在线状态，通过取消订阅来回收。
import { useState, useEffect } from 'react';

function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    // 这一步就是回收订阅的，是为了在组件即将销毁的时候，对订阅进行取消的
    return () => {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
    });

    if (isOnline === null) {
    return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
}