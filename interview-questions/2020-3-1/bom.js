/** 
 * https://segmentfault.com/a/1190000013426834?utm_source=channel-hottest
 * 
 * 前端知识点总结——BOM
 */

/** 
 * BOM：浏览器对象模型，专门操作浏览器窗口的API
 * BOM里面包括了：window、history、location、navigator、dom、event、screen
 */ 

/**
 * BOM中常见的对象
    window: 代表整个浏览器窗口 
            注意: window是BOM中的一个对象, 并且是一个顶级的对象(全局),下面的对象都能通过它找到
    Navigator: 代表当前浏览器的信息, 通过Navigator我们就能判断用户当前是什么浏览器
    Location:  代表浏览器地址栏的信息, 通过Location我们就能设置或者获取当前地址信息
    History:   代表浏览器的历史信息, 通过History来实现刷新/上一步/下一步 
                注意点: 出于隐私考虑, 我们并不能拿到用户所有的历史记录, 只能拿本次使用时的历史记录
    Screen:   代表用户的屏幕信息
 */

/** 
 * history
 * 
 * window.history.go(x);
 *  x>0 前进x个当前标签页的历史记录
    x<0 后退x个当前标签页的历史记录
    x=0 刷新
 */ 

/** 
 * navigator
 * 
 * 代表当前浏览器的信息, 通过Navigator我们就能判断用户当前是什么浏览器
 */ 
var agent = window.navigator.userAgent;
if(/chrome/i.test(agent)){
    alert("当前是谷歌浏览器");
}else if(/firefox/i.test(agent)){
    alert("当前是火狐浏览器");
}else if(/msie/i.test(agent)){
    alert("当前是低级IE浏览器");
}else if("ActiveXObject" in window){
    alert("当前是高级IE浏览器");
}

/** 
 * location
 * 
 * location属性用于获取或设置窗体的URL，并且可以用于解析URL。因为这个属性返回的是一个对象，因此也称为location对象
 * 
 * URL一般的语法格式为:
 *          protocol://host[:port]/path/[?query]#fragment
 *          通信协议://域名[:端口号]/路径/[?参数]#片段
 * 
 * 其中需要注意的是host、hostname,host代表的是域名+端口号，hostname不带端口号
 * 例如：http://192.168.162.175:8080
 *      hostname:192.168.162.175
 *      host: 192.168.162.175:8080
 */

/** 
 * location 对象
 * 
 * location 对象提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。
 * window.location 和 document.location 引用的是同一个对象。location 对象的用处不只表现在它保存着当前文档的信息，
 * 还表现在它将 URL 解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。
 * 
 * 查看[location对象.jpg]
 * 
 * 使用 location 对象可以通过很多方式来改变浏览器的位置。首先，也是最常用的方式，就是使用 assign()方法并为其传递一个 URL:
 * location.assign("http://shijiajie.com");
 * 
 * 这样，就可以立即打开新URL并在浏览器的历史记录中生成一条记录。如果是将 location.href 或 window.location 设置为一个URL值，
 * 也会以该值调用 assign() 方法。例如，下列两行代码与显式调用 assign() 方法的效果完全一样。
 * window.location = "http://shijiajie.com";
 * location.href = "http://shijiajie.com";
 * 
 * 修改 location 对象的其他属性也可以改变当前加载的页面。
 * 下面的例子展示了通过将 hash、search、hostname、pathname 和 port 属性设置为新值来改变 URL:
 * 
    // 假设初始 URL 为 http://shijiajie.com/about/
    location.href = "http://shijiajie.com/about/"

    // 将 URL 修改为 "http://shijiajie.com/about/#ds-thread"
    location.hash = "#ds-thread";

    // 将 URL 修改为 "http://shijiajie.com/about/?args=123"
    location.search = "?args=123";

    // 将 URL 修改为 "https://segmentfault.com/"
    location.hostname = "segmentfault.com";

    // 将 URL 修改为 "http://segmentfault.com/u/stone0090/"
    location.pathname = "u/stone0090";

    // 将 URL 修改为 "https://segmentfault.com:8080/"
    location.port = 8080;
 * 
 *  当通过上述任何一种方式修改URL之后，浏览器的历史记录中就会生成一条新记录，因此用户通过单击“后退”按钮都会导航到前一个页面。
 * 要禁用这种行为，可以使用 replace() 方法。这个方法只接受一个参数，即要导航到的 URL；
 * 结果虽然会导致浏览器位置改变，但不会在历史记录中生成新记录。在调用 replace() 方法之后，用户不能回到前一个页面
 * 
 * 
 * 与位置有关的最后一个方法是 reload()，作用是重新加载当前显示的页面。如果调用 reload() 时不传递任何参数，
 * 页面就会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。
 * 如果要强制从服务器重新加载，则需要像下面这样为该方法传递参数 true。
 * location.reload();        // 重新加载（有可能从缓存中加载）
 * location.reload(true);    // 重新加载（从服务器重新加载）
 */

/** 
 * history 对象
 * 
 * history 对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。因为 history 是 window 对象的属性，
 * 因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的 history 对象与特定的 window 对象关联。
 * 
 * 使用 go() 方法可以在用户的历史记录中任意跳转，可以向后也可以向前。这个方法接受一个参数，
 * 表示向后或向前跳转的页面数的一个整数值。负数表示向后跳转（类似于单击浏览器的“后退”按钮），
 * 正数表示向前跳转（类似于单击浏览器的“前进”按钮）
 * 
 * // 后退一页
 * history.go(-1);

    // 前进一页
    history.go(1);

    // 前进两页
    history.go(2);
 *
 * 
 */ 
