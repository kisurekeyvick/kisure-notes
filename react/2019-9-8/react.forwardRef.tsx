import * as React from 'react';

// React.forwardRef 是 Ref 的转发, 它能够让父组件访问到子组件的 Ref，从而操作子组件的 DOM。 React.forwardRef 接收一个函数，函数参数有 props 和 ref。

// ❌ 这个是错误的写法
const A = React.forwardRef((props, ref) => {
    return <B ref={ref}>123</B>
});

// ✅ 正确的写法
// 这是因为ref必须指向dom元素
const A_1 = React.forwardRef((props, ref) => {
    return <div ref={ref}>
        <B>123</B>
    </div>
});

// (2) react.createRef 和 react.forwardref 之间的区别
/** 
    - React.createRef()
        作用：获取目标element的DOM实例    

        使用：
        import React from 'react'

        export default class Father extends  React.Completed{
            constructor(props){
                super(props)
                this.father=React.createRef()
            }

            componentDidMount(){
                this.father.current.value='hahhaha'
            }

            render(){
                return <div ref={this.father}>
                this is div
                </div>
            }
        }

    - React.forwardRef()
        作用：从父组件中获取子组件是FunctionComponent的DOM实例

        import React from 'react'
        //  funciton component是没有dom实例的，因为它是PureComponent，所以没有this，
        //  所以不能通过createRef()来拿到实例

        //  将Father的father传给子组件，并绑定子组件的DOM实例，从而能在父组件拿到子组件的DOM实例
        const Child=React.forwardRef((props,ref)=>{
            return <div ref={ref}>child div</div>
        })

        export default class Father extends  React.Completed{
            constructor(props){
                super(props)
                this.father=React.createRef()
            }

            componentDidMount(){
                this.father.current.value='hahhaha'
            }

            render(){
                return <Child ref={this.father} />
            }
        }
 */
