/** 
 * https://mp.weixin.qq.com/s/ghM8dkXo7I59XBnvihzyeA
 * 关于web component的一些知识点
 * 
 * 
 * 还记得当document.querySelector最开始被广泛的被浏览器支持并且结束了无处不在的JQuery。
 * 这最终给我们提供了一个原生的方法，虽然JQuery已经提供了很久。
 * 我觉得这同样将会发生在像Angular和React这的前端框架身上。
 */

/** 
 * 自定义元素
 * 自定义元素是简单的用户自定义HTML元素。它们通过使用CustomElementRegistry来定义。
 */
window.customElements.define('kisure-ele', KisureEle);
/** 
 * 方法中的第一个参数定义了新创造元素的标签名，我们可以非常简单的直接使用
 * <kisure-ele></kisure-ele>
 * 为了避免和native标签冲突，这里强制使用中划线来连接。
 * 这里的KisureEle的构造函数需要使用ES6的class，这让JavaScript的class不像原来面向对象class那么让人疑惑。
 */
class KisureEle extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * 元素的构造函数和connectCallback的区别：
     * 当时一个元素被创建时（好比document.createElement）将会调用构造函数。
     * 而当一个元素已经被插入到DOM中时会调用connectedCallback。
     * 例如：在已经声明并被解析的文档中，或者使用document.body.appendChild添加。
     */

    connectedCallback() {
        /** 
         * 当这个元素被插入DOM树的时候将会触发这个方法
         * 你可以把这个方法与React的componentDidMount方法。
         * 通常来说，我们需要在connectedCallback之后进行元素的设置。
         * 因为这是唯一可以确定所有的属性和子元素都已经可用的办法。
         * 构造函数一般是用来初始化状态和设置Shadow DOM。
         */
    }

    static get observedAttributes() {
        return ['foo', 'bar'];
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        /** 
         * 每当将属性添加到observedAttributes的数组中时，就会调用这个函数。这个方法调用时两个参数分别为旧值和新值
         * 
         * 这个方法只有当被保存在observedAttributes数组的属性改变时，
         * 就如这个例子中的foo和bar，被改变才会调用，其他属性改变则不会。
         */
        switch(attr) {
            case 'foo': console.log('这个是foo');
                break;
            case 'bar': console.log('这个是bar');
                break;
        }
    }

    disconnectCallback() {
        /** 
         * 当元素从DOM中移除的时候将会调用它。
         * 但是要记住，在用户关闭浏览器或者浏览器tab的时候，不会调用这个方法。
         */
    }

    adoptedCallback() {
        /** 
         * 当元素通过调用document.adoptNode(element)被采用到文档时将会被调用
         */
    }
}

// 同样可以用过调用customElements.get，来获取这个元素构造函数的引用，从而构造元素。
const ele = customElements.get('kisure-ele');
const kisure = new ele();
document.body.appendChild(kisure);

/** 
 * 生命周期函数的顺序
 * constructor -> attributeChangedCallback -> connectedCallback
 * 
 * 为什么attributeChangedCallback要在connectedCallback之前执行呢？
 * web组件上的属性主要用来初始化配置。这意味着当组件被插入DOM时，这些配置需要可以被访问了。
 * 因此attributeChangedCallback要在connectedCallback之前执行。
 */

