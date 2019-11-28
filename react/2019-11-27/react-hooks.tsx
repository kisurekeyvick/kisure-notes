/**
 * 使用 Hooks 优化 React 组件
 */

/** 
 * React 组件设计模式
 * 
 * - Context 模式
 * - 组合组件
 * - 继承模式
 * - 容器组件和展示组件
 * - Render Props
 * - Hoc 高阶组件
 */

/**
 * - 组合组件
 * 
 * 组合组件是通过模块化组件构建应用的模式，它是 React 模块化开发的基础。
 * 除去普通的按照正常的业务功能进行模块拆分，还有就是将配置和逻辑进行解耦的组合组件方式。
 * 
 * 例如下面的组合方式就是利用类似 Vue 的 slot 方式将配置通过子组件的形式与 <Modal /> 组件进行组合，是的组件配置更优雅。
 */
<Modal>
    <Modal.Title>Modal Title</Modal.Title>
    <Modal.Content>Modal Content</Modal.Content>
    <Modal.Footer> <button>OK</button> </Modal.Footer>
</Modal>

/** 
 * - 继承模式
 * 
 * 继承模式是使用类继承的方式对组件代码进行复用。在面向对象编程模式中，继承是一种非常简单且通用的代码抽象复用方式。
 * 如果大部分逻辑相同，只是一些细节不一致，只要简单的将不一致的地方抽成成员方法，继承的时候复写该成员方法即可达到简单的组件复用。
 */

/** 
 * - 容器组件和展示组件
 * 
 * 展示组件和容器组件是将数据逻辑和渲染逻辑进行拆分从而降低组件复杂度的模式。
 * 这样做最大的好处是渲染层可以抽离成无状态组件，它不需要关心数据的获取逻辑，
 * 直接通过 props 获取数据渲染即可，针对展示组件能实现很好的复用。
 */
import * as React from "react";
class NewsList extends React.Component<any, any> {
    constructor(public props: any) {
        super(props);

        this.state = {
            newsData: [], adData: []
        }
    }
  
    getNewsData() { 
        this.getAdData() 
    }
  
    getAdData() {}
  
    render() { 
        return <List news={this.state.newsData} ad={this.state.adData} />
    }
}

function List({news, ad}) {
    const {newsData, adData} = this.state;
    const comps = [];
  
    for(let i = 0; i < newsData.length; i++) {
        comps.push(<NewsCard {...newsData[i]} key={`news-${i}`} />);
        if(i % 2) { comps.push(<AdCard {...adData[i/2]} key={`ad-${i}`} />); }
    }
  
    return (<div>{comps}</div>);
}

/** 
 * 但是我们也可以看到即使我们把渲染逻辑拆分出去了，本身组件的数据逻辑还是非常的复杂，
 * 没有做到很好的拆分。同时容器组件和展示组件存在耦合关系，所以无法很好的对逻辑组件进行复用。
 */

/** 
 * - Render Props
 * 
 * 它的本质实际上是通过一个函数 prop 将数据传递到其它组件的方式，所以按照这个逻辑我们又可以将刚才的代码简单的改写一下。
 */

class NewsList extends React.Component {
    constructor(public props: any) {
        super(props);

        this.state = {
            newsData: [], adData: []
        }
    }
  
    getNewsData() { 
        this.getAdData() 
    }
  
    getAdData() {}
  
    render() { return this.props.render(this.state) }
  
  }
  
  function List({news, ad}) { 
    const {newsData, adData} = this.state;
    const comps = [];
  
    for(let i = 0; i < newsData.length; i++) {
        comps.push(<NewsCard {...newsData[i]} key={`news-${i}`} />);
        if(i % 2) { comps.push(<AdCard {...adData[i/2]} key={`ad-${i}`} />); }
    }
  
    return (<div>{comps}</div>);
}
  
<NewsList render={({newsData, adData}) => <List news={newsData} ad={adData} />

/** 
 * 可以看到，通过一个函数调用我们将数据逻辑和渲染逻辑进行解耦，解决了之前数据逻辑无法复用的问题。
 * 不过通过函数回调的形式将数据传入，如果想要把逻辑拆分（例如资讯数据获取与广告数据获取逻辑拆分）会变得比较麻烦，
 * 让我想起了被 callback 支配的恐惧。
 * 
 * 同时由于 render 的值为一个匿名函数，每次渲染 <NewsList /> 的时候都会重新生成，
 * 而这个匿名函数执行的时候会返回一个 <List /> 组件，这个本质上每次执行也是一个“新”的组件。
 * 所以 Render Props 使用不当的话会非常容易造成不必要的重复渲染。
 */

/** 
 * - HoC 组件
 * 
 * React 里还有一种使用比较广泛的组件模式就是 HoC 高阶组件设计模式。
 * 它是一种基于 React 的组合特性而形成的设计模式，它的本质是参数为组件，返回值为新组件的函数。
 */
function withNews(Comp: any) {
    return class extends React.Component {
        constructor(public props: any) { 
            super(props);
            this.state = {
                newsData: []
            };
        }

        render() { return <Comp {...this.props} news={this.state.newsData} /> }
    }
}
  
function withAd(Comp) {
    return class extends React.Component {
        constructor(public props: any) {
            super(props);
            this.state = {
                adData: []
            };
        }

        componentWillReceiveProps(nextProps) {
            if(this.props.news.length) { this.getAdData(); }
        }

        render() { return <Comp {...this.props} ad={this.state.adData} /> }
    }
}
  
const ListWithNewsAndAd = withAd(withNews(List));
