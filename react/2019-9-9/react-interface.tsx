/** 
 * https://juejin.im/post/5cd7f2c4e51d453a7d63b715#heading-9
 * 
 * 类组件
 */

/** 
 * (1) 继承 Component 或 PureComponent
 */
import React from 'react';

/**
 * 首先导出Props声明, 同样是{ComponentName}Props形式命名
 */
export interface CounterProps {
  defaultCount: number; // 可选props, 不需要?修饰
}

/**
 * 组件状态, 不需要暴露
 */
interface State {
  count: number;
}

/**
 * 类注释
 * 继承React.Component, 并声明Props和State类型
 */
export class Counter extends React.Component<CounterProps, State> {
  /**
   * 默认参数
   */
  public static defaultProps = {
    defaultCount: 0,
  };

  /**
   * 初始化State
   */
  public state = {
    count: this.props.defaultCount,
  };
}

/** 
 * (2) 高阶组件
 */
/**
 * 抽取出通用的高阶组件类型
 * 其中 p 是这个(component)=>... 中component的props的类型推论 p是泛型
 */
type HOC<InjectedProps, OwnProps ={}> = <p>(
    Component: React.ComponentType<p & InjectedProps>
) => React.ComponentType<p & OwnProps>;

/**
 * 声明注入的Props
 */
export interface ThemeProps {
    primary: string;
    secondary: string;
}

export const WithTheme: HOC<ThemeProps> = Component => props => {
    // 假设theme从context中获取
    const fakeTheme: ThemeProps = {
        primary: 'red',
        secondary: 'blue',
    };
    return <Component {...fakeTheme} {...props} />;
};
