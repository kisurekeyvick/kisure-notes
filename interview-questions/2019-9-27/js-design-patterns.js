/** 
 * https://juejin.im/post/59df4f74f265da430f311909
 * 
 * JavaScript设计模式
 * 设计模式是解决某个特定场景下对某种问题的解决方案。
 */

/** 
 * (1) 单例模式
 * 
 * 单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
 * 实现的方法为先判断实例存在与否，如果存在则直接返回，
 * 如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
 */
class CreateUser {
    constructor(name) {
        this.name = name;
        this.getName();
    }

    getName() {
         return this.name;
    }
}

// 代理实现单例模式
const ProxyMode = (function() {
    let instance = null;
    return function(name) {
        if (!instance) {
            instance = new CreateUser(name);
        }

        return instance;
    } 
});

// 测试单体模式的实例
const a = new ProxyMode("aaa");
const b = new ProxyMode("bbb");
// 因为单体模式是只实例化一次，所以下面的实例是相等的
console.log(a === b);

/** 
 * (2) 代理模式
 * 
 * 常用的虚拟代理形式：某一个花销很大的操作，可以通过虚拟代理的方式延迟到这种需要它的时候才去创建（例：使用虚拟代理实现图片懒加载）
 */
/** 
 * 图片懒加载的方式：先通过一张loading图占位，然后通过异步的方式加载图片，
 * 等图片加载好了再把完成的图片加载到img标签里面。
 */

const imgFunc = (function() {
    const imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setStr: function(src) {
            imgNode.src = src;
        }
    };
})();

const proxyImage = function() {
    const img = new Image();
    img.onload = function() {
        imgFunc.setStr(this.src);
    };

    return {
        setStr: function(src) {
            imgFunc.setStr('./loading,gif');
            img.src = src;
        }
    };
};

proxyImage.setSrc('./pic.png');