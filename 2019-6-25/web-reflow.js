/** 
 * 前端页面优化，减少reflow的方法
 * 
 * reflow也就是 重排或者回流
 * 
 * 如你改变了一个div的位置，或者是改变了这个div的width, height, position 或者布局类的样式。
 * 
 * (1) 利用display:none不渲染的特点
 * 通过一次完整的web请求和渲染过程以及如何优化网页，我们可以知道页面渲染的时候，会忽略掉display: none这一类的不占布局的元素。
 * 所以，我们可以将元素先display:none，然后用JS对该元素进行操作。等操作完成在会后，再将它display:block，这样只会触发2次的reflow。
 * 
 * (2) 利用innerHTML
 * 当然上述的写法也可以利用innerHTML进行修改。
 * const ul = document.getElementById('content')
 * const lists = ['a', 'b', 'c', 'd']
 * const childElementString = lists.map(list=>`<li>${list}</li>`).join('')
 * ul.innerHTML = ul.innerHTML + childElementString
 * 
 * 这里只进行了一次reflow。
 * 
 * (3) 使用DocumentFragment
 * 上面的写法显然不够好，无法复用。我们可以使用DocumentFragment进行优化。
 * DocumentFragments是DOM节点，但不是DOM tree的一部分。它存在于内存中，可以理解为虚拟DOM。
 * 
 *  const parentNode = document.getElementById('content')
    const lists = ['a', 'b', 'c', 'd']
    const fragment = document.createDocumentFragment
    lists.forEach(text=>{
        const li = document.createElement('li')
        li.textContent = text
        fragment.appendChild(li)
    })
    parentNode.appendChild(fragment)

    如果不使用DocumentFragment的话，会造成4次reflow，随着需要修改的dom次数变多，还会造成更多次的reflow，但是通过fragment，只需要一次就够了。
 */