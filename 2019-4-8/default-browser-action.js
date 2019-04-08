/**
 * 浏览器默认动作
 * 
 * 许多事件会自动触发浏览器动作。
    例如：
        单击一个链接 —— 触发到它的 URL。
        单击表单中的提交按钮 —— 触发提交到服务器的动作。
        在文本上按下鼠标按键并移动 —— 选中文本。
 */

/**
 * 阻止浏览器动作
 * 
 * 有两种方法可以告诉浏览器我们不希望它执行动作：
        主流的方法是使用 event 对象。有一个 event.preventDefault() 方法。
        如果使用 on<event>（而不是 addEventListener）分发处理器，那么我们只需要从它内部返回 false 即可

    例如：
    <a href="/" onclick="return false">Click here</a>
    <a href="/" onclick="event.preventDefault()">here</a>
 */

/** 
 *  案例1：为什么function中使用return false不起作用？
 *  <script>
        function handler() {
            alert( "..." );
            return false;
        }
    </script>

    <a href="http://w3.org" onclick="handler()">the browser will go to w3.org</a>

    当浏览器读取如 onclick 这样的 on* 属性时，它会根据内容创建一个处理程序。
    对 onclick="handler()" 来说函数是：
        function(event) {
            handler() // the content of onclick
        }
    可以看到 handler() 返回值没有被使用，也没有对结果产生影响。

    修复方法：
        <a href="http://w3.org" onclick="return handler()">w3.org</a>
        或者
        <a href="http://w3.org" onclick="handler(event)">w3.org</a>
        function handler(event) {
            alert("...");
            event.preventDefault();
        }

    案例2：在元素中捕获链接
    在所有包含 id="contents" 属性元素的链接（在触发单击事件时）询问用户是否真的想离开当前页面。
    
    <div id='contents'>
        <p>
        How about to read <a href="http://wikipedia.org">Wikipedia</a> 
        </p>
    </div>

    document.getElementById('contents').onclick = function(event) {
      function handleLink(href) {
        let isLeaving = confirm(`Leave for ${href}?`);
        if (!isLeaving) return false;
      }

      let target = event.target.closest('a');

      if (target && contents.contains(target)) {
        return handleLink(target.getAttribute('href'));
      }
    };
*/