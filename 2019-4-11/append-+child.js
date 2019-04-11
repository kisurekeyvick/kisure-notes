/**
 * js里用append()和appendChild有什么区别？
 * 
 * append()
 * 可以同时传入多个节点或字符串，没有返回值
 * append可能还存在兼容性问题（PC端 IE不能用，移动端Edge不能用）
 * 
 * appendChild()
 * 只能传一个节点，且不直接支持传字符串【需要 appendChild(document.createTextElement('字符串'))代替】，
 * 返回追加的 Node 节点；
 * 若 appendChild() 的参数是页面存在的一个元素，则执行后原来的元素会被移除
 */
const content = document.getElementById('content-box');

const newElement = document.createElement('p');
newElement.innerHTML = '创建一个新的P标签';

const newElement_two = document.createElement('p');
newElement_two.innerHTML = '创建的第二个新的P标签';

/** 
 * append支持传字符串和元素节点，并且可以传入多个节点元素
 */
const appendFunc_one = content.append('append', 'hello');
const appendFunc = content.append(newElement, newElement_two);

window.setTimeout(() => {
    const appendChildFunc = content.appendChild(newElement);
    console.log(`2秒钟后添加元素，appendChildFunc:${appendChildFunc}`);
},2000);

console.log(`appendFunc:${appendFunc}}`);

/**
 * 若 appendChild() 的参数是页面存在的一个元素，则执行后原来的元素会被移除
 */
const testP = document.getElementById('test');
content.appendChild(testP);