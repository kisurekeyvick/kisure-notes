/** 
 * 鼠标事件基础
 * mousedown/mouseup    元素上单击/释放鼠标按钮
 * mouseover/mouseout   鼠标指针从一个元素上移入/出
 * mousemove            鼠标每次移动到元素上时都会触发事件 
*/

/**
 * 复杂事件
 * click            如果使用鼠标左键，则在 mousedown 及 mouseup 相继触发后触发该事件。
 *                  我们需要注意的是：click是在mousedown 及 mouseup之后发生的。
 * contextmenu      如果使用鼠标右键，则在 mousedown 后触发。
 * dblclick         对元素进行双击后触发。
 */

 /** 
  * 事件顺序
  * 在按下鼠标按钮时，单击会首先触发 mousedown，然后释放鼠标按钮时，会触发 mouseup 和 click。
  * 在单个动作触发多个事件时，它们的顺序是固定的。
  * 也就是说会遵循 mousedown → mouseup → click 的顺序。事件按照相同的顺序被处理：onmouseup 在 onclick 运行之前完成
  */

document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        const target = document.querySelector('#kisure');
        target.addEventListener('click', function(e) {
            console.log('current event', e);
            console.log(e.which);
            console.log('clientX', e.clientX);
            console.log('clientX', e.clientY);
            console.log('pageX', e.pageX);
            console.log('pageY', e.pageY);

            /** 
             * 
             *  获取按钮:which
             *  该属性允许获取准确的鼠标按钮
             *  如果我们跟踪 mousedown 和 mouseup，那么我们就需要它，
             *   因为这些事件在任意鼠标按钮按下时都会触发，所以 which 允许区分 “right-mousedown” 和 “left-mousedown”
             * 
                event.which == 1 —— 左按钮
                event.which == 2 —— 中间按钮
                event.which == 3 —— 右按钮
             */

            /**
             * 组合键: shift、alt、ctrl 和 meta
             *  
             * 所有的鼠标事件都包含有关按下的组合键信息:
             * shiftKey、altKey、ctrlKey、metaKey (Cmd for Mac)
             */

             /** 
              * https://blog.csdn.net/onion_line/article/details/79559331
              * 
              * pageX/Y
              * 对于窗口而言
              * event.pageX 是目标点距离document最左上角的X轴坐标
              * event.pageY 是目标点距离document最左上角的Y轴坐标
              * 所谓的文档，也就是说，如果当前的container元素处于整个窗口中央，那么pageX和pageY就是当前点击的位置到窗口的位置。
              * 
              * clientX/Y
              * 对于文档而言
              * 如果我们有一个 500 x 500 的窗口，鼠标在左上方，那么 clientX 和 clientY 都是 0。
              * 如果鼠标在中间，那么 clientX 和 clientY 就是 250。
              * 和它在文档中的位置无关。它们类似于 position:fixed
              */
        });

        // 下述按钮仅仅在 Alt+Shift+click 上有效
        const button = document.getElementById('button');
        button.addEventListener('click', function(e) {
            if (e.altKey && e.ctrlKey) {
                console.log('事件生效');
            }
        });
    }
}