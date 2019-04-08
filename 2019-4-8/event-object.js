/** 
 * js event对象
 * offsetX, clientX, pageX, screenX, layerX之间的区别
 * 
 * https://www.cnblogs.com/qianduanjingying/p/5842678.html
 * https://img-blog.csdn.net/20150502094344891?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbHpkaW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center
*/

/**
 * offsetX, offsetY
 * 当前元素中点击的位置到元素边缘的距离。
 * （发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标。）
 * 
 * clientX, clientY
 * 当前元素在鼠标点击以后，距离浏览器页面的位置
 * (clientX 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标。)
 * 
 * pageX, pageY
 * pageX = clientX + 横向滚动条距离
 * (pageX/Y获取到的是触发点相对文档区域左上角距离，会随着页面滚动而改变) 
 * 
 * screenX, screenY 
 * 鼠标点击的位置距离电脑屏幕边的距离
 * (screenX/Y 事件属性可返回事件发生时鼠标指针相对于屏幕的水平坐标)
 * 
 * layerX, layerY
 * 这两个属性是火狐浏览器中的，ev.layerX === ev.offsetX
 * 
 * x,y
 * 在点击元素没有滚动条的情况下，ev.pageX === ev.clientX === ev.X
 * ev.pageY === ev.clientY === ev.Y
 * 
 * 如果存在滚动条，那么ev.clientX === ev.X  ev.clientY === ev.Y
 * 
 * ev.type
 * 事件的类型
 */

/**
 * 注意点：
 * (1)当鼠标点击的是相同的位置，如果浏览器的宽高发生改变，那么对应的client、page X/Y 也是会发生改变的。
 *      这4个属性计算时候会根据浏览器的大小来计算的
 */

const target = document.querySelector('#content');
target.addEventListener('click', (e) => {
    const array = ['offsetX', 'offsetY', 'clientX', 'clientY', 'pageX', 'pageY', 
    'screenX', 'screenY', 'layerX', 'layerY', 'x', 'y'];

    array.forEach((item) => {
        console.log(`当前属性为${item},它的值为${e[item]}`);
    });
});

/**
 * 原生js事件绑定
 * https://zh.javascript.info/introduction-browser-events
 */
function sayHello() {
    alert('hello kisure');
}

// 使用函数式绑定事件，ele.on事件 = 函数名，如果是 sayHello()，那么就是函数的执行结果，函数将什么都不会返回，所以不可取。
const btn = document.querySelector('#btn');
btn.onclick = sayHello;

/**
 * 使用html方式进行绑定：
 * <button id='btn' onclick='sayHello()'>点击我</button>
 */
