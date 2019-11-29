/** 
 * (1) 优先使用FC类型来声明函数组件
 * 
 * FC是FunctionComponent的简写, 这个类型定义了默认的 props(如 children)以及一些静态属性(如 defaultProps)
 * 也就是说默认的会有children属性这类
 */
import React, { FC } from 'react';
export interface MyComponentProps {
    className?: string;
    style?: React.CSSProperties;
}
  
export const MyComponent: FC<MyComponentProps> = props => {
    return <div>
        { props.children }
    </div>;
};

/** 
 * (2) 不要直接使用export default导出组件
 * 
 * 这种方式导出的组件在React Inspector查看时会显示为Unknown
 * 也就是说ts的类型推论，推不出导出来的是个什么东西
 * 
 * 如果非得这么做, 请使用命名 function 定义:
 * export default function Foo(props: {}) {
 *      return <div>xxx</div>;
 * }
 */

/** 
 * (3) 泛型函数组件
 */
export interface ListProps<T> {
    list: T[];
    visible: boolean;
    callback: Function;
}

export function List<T>(props: ListProps<T>) {
    return <div {...props} />
}

/** 
 * (4) 泛型类组件
 */
export class ListClass<T> extends React.Component<ListProps<T>> {
    public render() {}
}

/** 
 * (5) 高阶组件
 */
/**
 * 声明注入的Props
 */
export interface ThemeProps {
    primary: string;
    secondary: string;
  }
  
  /**
   * 给指定组件注入'主题'
   */
  export function withTheme<P>(Component: React.ComponentType<P & ThemeProps>) {
    /**
     * WithTheme 自己暴露的Props
     */
    interface OwnProps {}
  
    /**
     * 高阶组件的props, 忽略ThemeProps, 外部不需要传递这些属性
     */
    type WithThemeProps = P & OwnProps;
  
    /**
     * 高阶组件
     */
    const WithTheme = (props: WithThemeProps) => {
      // 假设theme从context中获取
      const fakeTheme: ThemeProps = {
        primary: 'red',
        secondary: 'blue',
      };
      return <Component {...fakeTheme} {...props} />;
    };
  
    WithTheme.displayName = `withTheme${Component.displayName}`;
  
    return WithTheme;
  }
  
  // Test
const Foo: FC<{ a: number } & ThemeProps> = props => <div style={{ color: props.primary }} />;
const FooWithTheme = withTheme(Foo);

// 再重构一下:
/**
 * 抽取出通用的高阶组件类型
 */
type HOC<InjectedProps, OwnProps = {}> = <P>(
    Component: React.ComponentType<P & InjectedProps>,
  ) => React.ComponentType<P & OwnProps>;
  
  /**
   * 声明注入的Props
   */
  export interface ThemeProps {
    primary: string;
    secondary: string;
  }
  
  export const withTheme_d: HOC<ThemeProps> = Component => props => {
    // 假设theme从context中获取
    const fakeTheme: ThemeProps = {
      primary: 'red',
      secondary: 'blue',
    };
    return <Component {...fakeTheme} {...props} />;
  };

/** 
 * (6) 使用handleEvent命名事件处理器
 * 
 * 如果存在多个相同事件处理器, 则按照handle{Type}{Event}命名, 例如: handleNameChange.
 */
export const EventDemo: FC<{}> = props => {
    const handleClick = useCallback<React.MouseEventHandler>(evt => {
        evt.preventDefault();
        // ...
    }, []);

    return <button onClick={handleClick} />;
};

/** 
 * (7) 获取原生元素 props 定义
 * 
 * 有些场景我们希望原生元素扩展一下一些 props. 所有原生元素 props 都继承了React.HTMLAttributes, 
 * 某些特殊元素也会扩展了自己的属性, 例如InputHTMLAttributes
 */
export function fixClass<
    T extends Element = HTMLDivElement, 
    Attribute extends React.HTMLAttributes<T> = React.HTMLAttributes<T>>(
        cls: string, 
        type: keyof React.ReactHTML = 'div'
    ) {
    const FixedClassName: FC<Attribute> = props => {
        return React.createElement(type, { ...props, className: `${cls} ${props.className}` });
    };
    
    return FixedClassName;
}

/**
 * (8) 不要使用 PropTypes
 * 
 * 有了 Typescript 之后可以安全地约束 Props 和 State, 
 * 没有必要引入 React.PropTypes, 而且它的表达能力比较弱
 */

/** 
 * (9) 关于泛型
 * 
 * 我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：
 */
function identity<T>(arg: T): T {
    return arg;
}
// 这里我们明确的指定了T是string类型，并做为一个参数传给函数，使用了<>括起来而不是()
let output = identity<string>("myString"); 

/**
 * (10) 泛型中使用extends
 */
interface Lengthwise {
    length: number;
}
// 型函数被定义了约束，因此它不再是适用于任意类
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity({length: 10, value: 3});

/** 
 * (11) TypeScript 2.3扩充了语言的语法，添加的内容包括支持泛型参数（Generic Parameter）定义默认值
 * 
 * 泛型参数默认值类似于函数参数的默认值
 * T extends Element = HTMLDivElement
 */
export function fixClass_1<
    T extends Element = HTMLDivElement, 
    Attribute extends React.HTMLAttributes<T> = React.HTMLAttributes<T>>(
        cls: string, 
        type: keyof React.ReactHTML = 'div'
    ) {
    const FixedClassName: FC<Attribute> = props => {
        return React.createElement(type, { ...props, className: `${cls} ${props.className}` });
    };
    
    return FixedClassName;
}