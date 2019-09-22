/** 
 * 关于http请求头
 */

/** 
 * https://www.jianshu.com/p/c5cf6a1967d1
 * 
 * User-Agent
 * 
 * User-Agent会告诉网站服务器，访问者是通过什么工具来请求的，如果是爬虫请求，一般会拒绝，如果是用户浏览器，就会应答。
 */

/** 
 * 又该如何使用呢？
 * 
 * 最简单的方法就是按照下面步骤进行：
 * 
    打开你要爬虫的网页
    按键盘的F12或手动去浏览器右上角的“更多工具”选项选择开发者工具
    按键盘的F5刷新网页
    点击Network，再点击Doc
    点击Headers，查看Request Headers的User-Agent字段，直接复制
    将刚才复制的User-Agent字段构造成字典形式
 */

/** 
 * User-Agent通常格式：
 * Mozilla/5.0 (平台) 引擎版本 浏览器版本号
 */



