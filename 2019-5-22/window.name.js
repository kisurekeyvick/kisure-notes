/** 
 * window.name
 * 
 * (1)window.name所具备的属性
 *      I:每个窗口都有独立的window.name与之对应
 *      II:在一个窗口的生命周期中（被关闭前），窗口载入的所有页面同时共享一个window.name，
 *          每个页面对window.name都有读写的权限
 *      III:window.name一直存在与当前窗口，即使是有新的页面载入也不会改变window.name的值
 *      IV:window.name可以存储不超过2M的数据，数据格式按需自定义
 *  
        // 同一个窗口下，页面重新载入，window.name仍然不变
        window.name = "这是a页面的内容"; 
        setTimeout(function(){
            window.location.href= b.html;
            console.log(window.name);  //"这是a页面的内容"
        },2000);
 * 
 * (2)window.name进行跨域
 *      有时候我们的需求是在https://localhost/a.html页面内，获得"https://xxx.github.io/xxx/"上的数据，并且页面不能进行刷新。
 *      对于这种需求，我们不能通过window.location.href更新页面来获得数据，我们可以用一个隐藏的iframe作为中间的代理
 * 
        <script>
            function load() {
                var iframe = document.getElementById('iframe');
                iframe.onload = function () {
                    var window = iframe.contentWindow;
                    console.log(window.name);
                }
                iframe.src = 'about:blank'; // 让url地址改变，与当前页面同源,可以任意写，保持同源就好
            }
        </script>
        <iframe id="iframe" src="https://xxx.github.io/xxx/" onload="load()"></iframe>

        // 我们封装一个完整的跨域，包括动态的创建iframe，获取数据后销毁代理的iframe。
        <script type="text/javascript">
            var boo = false;
            var iframe = document.createElement('iframe');
            var loadData = function() {
                if (boo) {
                    var data = iframe.contentWindow.name;    //获取window.name
                    console.log(data); 
                    //销毁数据   
                    iframe.contentWindow.document.write('');
                    iframe.contentWindow.close();
                    document.body.removeChild(iframe);
                } else {
                    boo = true;
                    iframe.contentWindow.location = "b.html";    // 设置的代理文件,iframe重新载入
                }  
            };

            iframe.src = 'https://xxx.github.io/xxx';

            if (iframe.attachEvent) {
                iframe.attachEvent('onload', loadData);
            } else {
                iframe.onload  = loadData;
            }

            document.body.appendChild(iframe);
        </script>
 */

/** 
 * iframe
 */
var iframe = document.createElement("iframe");
iframe.src = "http://www.jb51.net";

// IE支持iframe的onload事件，不过是隐形的，需要通过attachEvent来注册
if (iframe.attachEvent) {
    iframe.attachEvent('onload', function() {
        console.log('Local iframe is now loaded.');
    });
} else {
    iframe.onload = function() {
        console.log('Local iframe is now loaded.');
    };
}

/** 
 * attachEvent
 * (1)attachEvent用于HTML内代码层和UI层分离
 *    例如：你要给一个按钮增加一个单击事件，你会怎么做？
 *          <input type="button" id="theBtn" value="点击" onclick="alert('点击了一下');" />
 *          但是，明显的，它破坏了标签，如果下次要修改这个按钮不小心就会丢失。
 *          
 *          改进：
 *          <input type="button" id="theBtn" value="点击" />
 *          var theBtn = document.getElementById("theBtn"); //取得ID为theBtn的按钮
 *          theBtn.attachEvent("onclick", buttonClicked); //给按钮增加事件
 *          function buttonClicked(e){ alert("点击了一下"); } //定义函数
 * 
 * (2)用法：attachEvent(事件类型, 处理函数);
 * 
 * (3)attachEvent和addEventListener之间的区别
 *      I:IE7、8不支持addEventListener和removeEventListener方法,但是实现了2个类似的方法：attachEvent，detachEvent
 *      II:兼容范围
 *          attachEvent——兼容：IE7、IE8；不兼容firefox、chrome、IE9、IE10、IE11、safari、opera
 *          addEventListener——兼容：firefox、chrome、IE、safari、opera；不兼容IE7、IE8
 */

 /** 
  * 也就是说target只是方便操作dom的接口，target.onclick=func，就是相当于将点击事件注册到对应的dom上去。
  * 然后target设置为null以后，只是断开了和dom的联系。但是事件还是注册上去了
  */
function run() {
    let target = document.querySelector('#kisure');
    target.onclick = function(e) {
        console.log(e);
        console.log('clicked');
    };
    target = null;
}

window.setTimeout(() => {
    run();
}, 1000);

/** 
 * e.target 和 e.currentTarget之间的区别
 * 
 * (1) e.target 指的是实际触发这个事件的对象
 * (2) e.curretnTarge 指的是注册了事件监听器的对象
 * 
 * 举例：
    <div id="outer" style="background:#099">
        click outer
        <p id="inner" style="background:#9C0">click inner</p>
    </div>   

    在outer上点击时，target跟currentTarget是一样的，都是div
    而在inner上点击时，e.target是p、e.currentTarget是div。
 */

