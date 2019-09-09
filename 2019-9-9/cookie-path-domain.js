/** 
 * https://www.jianshu.com/p/1b7aa6fb81ec
 * 
 * cookie中的domain和path
 */

/**
 * domain
 * 
 * domain表示的是cookie所在的域，默认为请求的地址，
 * 如网址为www.jb51.net/test/test.aspx，那么domain默认为www.jb51.net。
 * 
 * 而跨域访问，如域A为t1.test.com，域B为t2.test.com，
 * 那么在域A生产一个令域A和域B都能访问的cookie就要将该cookie的domain设置为.test.com；
 */

/** 
 * path
 * 
 * path表示cookie所在的目录，asp.net默认为/，就是根目录。
 * 
 * 在同一个服务器上有目录如下：/test/,/test/cd/,/test/dd/，
 * 现设一个cookie1的path为/test/，cookie2的path为/test/cd/，
 * 那么test下的所有页面都可以访问到cookie1，而/test/和/test/dd/的子页面不能访问cookie2。
 * 这是因为cookie能让其path路径下的页面访问
 */ 

/** 
 * 含值键值对的cookie
 * 
 * 含值键值对的cookie：以前一直用的是nam=value单键值对的cookie，一说到含多个子键值对的就蒙了。
 * 现在总算弄清楚了。含多个子键值对的cookie格式是name=key1=value1&key2=value2。
 * 可以理解为单键值对的值保存一个自定义的多键值字符串，其中的键值对分割符为&，
 * 当然可以自定义一个分隔符，但用asp.net获取时是以&为分割符。
 */

/** 
 * 服务端的Cookie
 * 
 * 相比较浏览器端，服务端执行Cookie的写操作时，是将拼接好的Cookie字符串放入响应头的Set-Cookie字段中；
 * 执行Cookie的读操作时，则是解析HTTP请求头字段Cookie中的键值对。
 * 
 * (1) signed
 * 当设置signed=true时，服务端会对该条Cookie字符串生成两个Set-Cookie响应头字段：
 *  Set-Cookie: lastTime=2019-03-05T14:31:05.543Z; path=/; httponly
 *  Set-Cookie: lastTime.sig=URXREOYTtMnGm0b7qCYFJ2Db400; path=/; httponly
 * 
 *  这里通过再发送一条以.sig为后缀的名称以及对值进行加密的Cookie，来验证该条Cookie是否在传输的过程中被篡改。
 * 
 * (2) httpOnly
 * 服务端Set-Cookie字段中新增httpOnly属性，当服务端在返回的Cookie信息中含有httpOnly字段时，
 * 开发者是不能通过js来操纵该条Cookie字符串的。
 * 这样做的好处主要在于面对XSS（Cross-site ing）攻击时，黑客无法拿到设置httpOnly字段的Cookie信息
 */

