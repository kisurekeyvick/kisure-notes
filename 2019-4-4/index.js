/** 
 * innerHTML和outerHTML的区别
 * innerHTML 设置或获取位于对象起始和结束标签内的HTML
 * outerHTML 设置或获取对象及其内容的HTML形式
 * 
 * 例如：
    <body>
		<p>你好</p>
		<div id="test"><h5>就是喜欢你</h5></div>
		<script type="text/javascript">
			var ih=document.getElementById("test").innerHTML;
            console.log(ih);    // <h5>就是喜欢你</h5>
            
            var oh=document.getElementById("test").outerHTML;
            console.log(oh);    // <div id="test"><h5>就是喜欢你</h5></div>
		</script> 
    </body>
*/
console.log('innerHTML:'+test1.innerHTML);
console.log('outerHTML:'+test1.outerHTML);
console.log('innerText:'+test1.innerText);
console.log('outerText:'+test1.outerText);

/**
 * innerText 和 outerText的区别
 * 返回值差不多，但是赋值是有区别的
 * innerText赋值，是直接在对应的dom中添加对应的html内容
 * outerText赋值，是直接将对饮的dom替换成文本
 */
document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        const dom_inner = document.getElementById('innerText');
        dom_inner.innerText = '<div>innerText</div>';
        const dom_outer = document.getElementById('outerText');
        dom_outer.outerText = '<div>outerText</div>';
    }
}

/**
 * window.onload 和 document.onreadystatechange(readyState==='complete')之间区别
 * 页面加载完成有两种事件，
 * ready，表示文档结构已经加载完成（不包含图片等非文字媒体文件）。
 * onload，指示页 面包含图片等文件在内的所有元素都加载完成。(可以说：ready 在onload 前加载！！！)
 */
