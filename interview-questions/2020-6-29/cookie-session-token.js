/**
 * https://www.zhihu.com/question/353373715/answer/878707077
 * 
 * 什么是cookie,token和session?它们之间有什么关系？
 */

/**
 * 因为http是无状态的。但是随着 web 应用的发展，越来越多的场景需要标识用户身份。例如：单点登陆、购物车等等。
 * 而 cookie、session 与 token，就是为了实现带有状态的“会话控制”。
 */

/**
 * Cookie
 * 
 * cookie 是以 K-V 形式，存储在浏览器中一种数据。它可以在服务端设置，也可以在浏览器端用 js 代码设置。
 * 它拥有 maxAge、domain、path 等属性，借助这些属性，可以实现父子域名之间的数据传递。
 * 
 * (1) 设置 Cookie
 * cookie 是 K-V 形式存储的,在服务器/浏览器端均可以设置:
 * 浏览器端：document.cookie = "firstName=dongyuanxin; path=/"
 * 服务器端：通过给 Http Response Headers 中的Set-Cookie字段赋值，来设置 cookie。客户端接收到Set-Cookie字段后，将其存储在浏览器中。
 */
// 服务端demo
const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const port = 3333;
const app = new Koa();
const router = new Router();

router.get("/api", async (ctx, next) => {
    const cookie = ctx.cookies.get("id");
    if (!cookie) {
        // 设置 id = xxoo521.com
        ctx.cookies.set("id", "xxoo521.com");
    }
    ctx.response.body = "原文地址：xxoo521.com";
});

app.use(serve("."))
    .use(router.routes())
    .listen(port, () => {
        console.log("listen port:", port);
    });
/**
 * 在启动上面代码，并且请求/api接口后。在 Chrome Dev Tools 中，能看到服务器返回的 Headers 的信息[set-cookie-response.jpg]
 * 
 * 按照协议，浏览器应该成功保存了 cookies 的值。此时，找到Application => Storage => Cookies => 当前域名，即可验证 cookie 是否设置成功
 * [set-cookie-response.jpg]
 * 
 * cookie的流程(以用户购买商品为例)
 * 监测到浏览器客户端没有标识用户的 cookie，跳转到登陆界面
 * 用户账号密码登陆，后端验证，成功后，在Set-cookie中设置标识用户的 cookie
 * 登陆成功，保存用户标识的 cookie
 * 购买商品，自动携带用户身份的 cookie，后端验证无误后，购买成功
 */

/**
 * Session
 * 
 * Session 机制准确来说，也是通过 K-V 数据格式来保存状态:
 * Key：也称 SessionID，保存在客户端浏览器
 * Value：也称“Session”，保存在服务端
 * 
 * 可以看到，客户端只需要存储 SessionID。具体映射的数据结构放在了服务端，因此跳出了仅仅浏览器 cookie 只可以存储 string 类型的限制。
 * 
 * 而客户端存储 SessionID，还是需要借助 cookie 来实现。
 */ 
 
/**
 * 比较 cookie 与 session
 * 
 * (1)session 传输数据少，数据结构灵活：
 *      相较于 cookie 来说，session 存储在服务端，客户端仅保留换取 session 的用户凭证。因此传输数据量小，速度快
 * (2)session 更安全:
 *      检验、生成、验证都是在服务端按照指定规则完成，而 cookie 可能被客户端通过 js 代码篡改。
 * (3)session 的不足:
 *      服务器是有状态的。多台后端服务器无法共享 session。
 * 
 *      解决方法是，专门准备一台 session 服务器，关于 session 的所有操作都交给它来调用。而服务器之间的调用，可以走内网 ip，走 RPC 调用（不走 http）。
 */

/**
 * Token
 * 
 * 为什么需要 Token？
 * 
 * 但对于 session 来说，服务器是有状态的。这个事情就很麻烦，尤其是在分布式部署服务的时候，需要共享服务器之间的状态。
 * 总不能让用户不停重复登陆吧？虽然专门准备一个服务器用来处理状态是可行的，
 * 但是能不能让服务器变成无状态的，还不能像单纯 cookie 那么蹩脚？
 * 
 * token 就解决了这个问题。它将状态保存在客户端，并且借助加密算法进行验证保证安全性
 * 
 * 整体流程：[token.js]
 * 
 * - 用户尝试登陆登陆成功后，
 * - 后端依靠加密算法，将凭证生成 token，返回给客户端
 * - 客户端保存 token，每次发送请求时，携带 token
 * - 后端再接收到带有 token 的请求时，验证 token 的有效性在整个流程中，
 *      比较重要的是：生成 token、验证 token 的过程。这里设计一种简单的技术实现
 * 
 * token 的优点:
 * 服务器变成无状态了，实现分布式 web 应用授权
 * 可以进行跨域授权，不再局限父子域名
 * 安全性更高，密钥保存在服务器。若密钥被窃取，可以统一重新下发密钥
 */
