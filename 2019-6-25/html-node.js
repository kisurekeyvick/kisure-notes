/** 
 * 什么是节点Node？
 */

/** 
 * (1) Node是什么？
 * 是一个接口。许多DOM API都会继承于它，如document, Elementdocument.getElementById 的返回值就是一个继承于Node的对象
 * 常用的API有：
 * Node.childNodes只读  返回一个该节点所有的即时更新的NodeList
 * Node.nodeName只读 返回节点名，如 DIV, IMG
 * Node.lastChild只读 最后一个Node，若没有则是null
 * Node.firstChild只读 第一个Node，若没有则是null
 */

/** 
 * (2) NodeList是什么？
 * 它是一个节点的集合，可以通过document.querySelectorAll返回一组静态的NodeList
 * 
 *  我们需要注意的是，document.querySelectorAll返回的是静态的节点列表，也就是说，如果后续插入新的节点
 *  如果我们访问的还是老的nodeList，那么老的节点仍然是不会变的，这就是所谓的静态
 * 
 *  const parentNode = document.getElementById('content')
    const nodeList = parentNode.querySelectorAll('div')
    console.log(nodeList)  // 假设这里的值是5
    const newElement = document.createElement('div')
    parentNode.append(newElement) // 插入一个DOM
    console.log(nodeList) // 这里的nodeList仍是5

    如果我们想要动态的节点，则使用Node.childNodes这类：
    const parentNode = document.getElementById('content')
    const nodeList = parentNode.childNodes
 */
