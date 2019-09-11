/** 
 * (1) 优先使用FC类型来声明函数组件
 * 
 * FC是FunctionComponent的简写, 这个类型定义了默认的 props
 *      (如 children)以及一些静态属性(如 defaultProps)
 */

import * as React from 'react';

export interface IProps {
    className?: string;
    style?: React.CSSProperties;    // react css属性
}

export const KComponent: React.FC<IProps> = props => {
    return <div>123 {props.className}</div>
}

/** 
 * (2) 不要直接使用 export default 导出组件
 * 
 * 
 */
// export default (props: IProps) => {
//     // 这种方式导出的组件在React Inspector查看时会显示为Unknown
// }

// 如果非得这么做, 请使用命名 function 定义:
// export default function Foo(props: any) {

// }

/** 
 * (3) 默认props声明
 * 目前对于上面的使用FC类型声明的函数组件并不能完美支持 defaultProps
 */
export interface HelloProps {
    name: string;
}

export const Hello: React.FC<HelloProps> = ({ name }) => {
    return <div>123 {name}</div>
}

// 如果要使用 FC组件的 defaultProps属性，那么要求使用typescript版本为3.1以上
Hello.defaultProps = { name: 'TJ' };

// 当然我们也可以这样子写

export const Hello_2: React.FC<HelloProps> = ({ name = '123' }) => {
    return <div>123 {name}</div>
}

/** 
 * (4) 子组件声明
 * 
 * 使用Parent.Child形式的 JSX 可以让节点父子关系更加直观, 它类似于一种命名空间的机制, 可以避免命名冲突. 
 * 相比ParentChild这种命名方式, Parent.Child更为优雅些. 当然也有可能让代码变得啰嗦.
 * 
 * React.PropsWithChildren
 * 
 */
export interface LayoutProps {}
export interface LayoutHeaderProps {
    name: string;
}
export interface LayoutFooterProps {
    age: number;
}

export function Layout(props: React.PropsWithChildren<LayoutProps>) {
    return <div>{props.children}</div>
}

Layout.Header = (props: React.PropsWithChildren<LayoutHeaderProps>) => {
    return <div>{props.children} {props.name}</div>
}

Layout.footer = (props: React.PropsWithChildren<LayoutFooterProps>) => {
    return <div>{props.children} {props.age}</div>
}

export interface IHIporps {
    name: string; 
    age: number;
    [key: string]: any;
}

export const HI: React.FC<IHIporps> = props => {
    return <Layout>
            <Layout.Header {...{name: props.name}}><div>123</div></Layout.Header>
            <Layout.footer {...{age: props.age}}><div>456</div></Layout.footer>
        </Layout>
}

/** 
 * (5) Forwarding Refs
 * 
 * React.forwardRef 在 16.3 新增, 可以用于转发 ref, 适用于 HOC 和函数组件.
 * 函数组件在 16.8.4 之前是不支持 ref 的, 配合 forwardRef 和 useImperativeHandle 可以让函数组件向外暴露方法
 */

export interface MyModalProps {
    title?: React.ReactNode;
    onOk?: () => void;
    onCancel?: () => void;
}

export interface MyModalMethods {
    show(): void;
}

export const Modal = React.forwardRef<MyModalMethods, MyModalProps>((props, ref) => {
    const [visible, setVisible] = React.useState();

    // 初始化暴露ref的方法
    React.useImperativeHandle(ref, () => ({
        show: () => setVisible(true)
    }));

    return <div className={`just demo ${visible ? 'visible': ''}`}>
        hello nice fish
    </div>;
})

/**
 * 
 * @param props 
 */
export const Test: React.FC<{}> = props => {
    // 引用
  const modal = React.useRef<MyModalMethods | null>(null);
  const confirm = React.useCallback(() => {
    if (modal.current) {
      modal.current.show();
    }
  }, []);

  const handleOk = React.useCallback(() => {}, []);

  return (
    <div>
      <button onClick={confirm}>show</button>
      <Modal ref={modal} onOk={handleOk} />
    </div>
  );
}
