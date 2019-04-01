// 和consumer类似，仍然需要与Provider配合使用
import React from 'react';

const Context = React.createContext('light');

// Provider
class Provider extends React.Component {
  render() {
    return (
      <Context.Provider value={'dark'}>
        <DeepTree />
      </Context.Provider>
    )
  }
}