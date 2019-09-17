/** 
 * https://juejin.im/post/5cd7f2c4e51d453a7d63b715#heading-16
 */

/** 
 * (1) Render Props
 * 
 * React 的 props(包括 children)并没有限定类型, 它可以是一个函数。
 * 于是就有了 render props,这是和高阶组件一样常见的模式:
 */
import React from 'react';

export interface ThemeConsumerProps {
    children: () => React.ReactNode;
}

export const ThemeConsumer = (props: ThemeConsumerProps) => {
    const fakeTheme = { primary: 'red', secondary: 'blue' };
    return props.children();
}

// test
<ThemeConsumer>
    {({primary}) => {
        return <div style={{ color: primary }}>nice fish</div>;
    }}
</ThemeConsumer>

/** 
 * (2) Context
 * Context提供了一种跨组件间状态共享机制
 */
import React, { FC, useContext } from 'react';

export interface Theme {
    primary: string;
    secondary: string;
}

/**
 * 声明Context的类型, 以{Name}ContextValue命名
 */
export interface ThemeContextValue {
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
}

/**
 * 创建Context, 并设置默认值, 以{Name}Context命名
 */
export const ThemeContext = React.createContext<ThemeContextValue>({
    theme: {
        primary: 'red',
        secondary: 'blue'
    },
    onThemeChange: () => {}
});

/** 
 * provider 以{name}Provider名称
 */
export const ThemeProvider: FC<{ theme: Theme; onThemeChange: (theme: Theme) => void }> = props => {
    return <ThemeContext.provider value={{ theme: props.theme, onThemeChange: props.onThemeChange }}>
            { props.children }
        </ThemeContext.provider>
}

/** 
 * 杂项
 * 
 * 使用handleEvent命名事件处理器
 * 如果存在多个相同事件处理器, 则按照handle{Type}{Event}命名, 例如 handleNameChange
 */
// 使用handleEvent命名事件处理器
export const EventDemo: FC<{}> = props => {
    const handleClick = useCallback<React.MouseEventHandler>(evt => {
        evt.preventDefault();
        // ...
    }, []);

    return <button onClick={handleClick}></button>;
};

/** 
 * 为没有提供 Typescript 声明文件的第三方库自定义模块声明
 */
// 一般习惯在项目根目录下(和 tsconfig.json 同在一个目录下)放置一个global.d.ts. 放置项目的全局声明文件
// /global.d.ts
// 自定义模块声明
declare module 'awesome-react-component' {
    // 依赖其他模块的声明文件
    import * as React from 'react';
    export const Foo: React.FC<{ a: number; b: string }>;
}

/** 
 * @types/react内置了以下事件处理器的类型 
 */
type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }['bivarianceHack'];
type ReactEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;
type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;

