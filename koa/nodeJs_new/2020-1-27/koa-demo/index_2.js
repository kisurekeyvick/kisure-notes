const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const static = require('koa-static');
const artTemplate = require('koa-art-template'); 
const session = require('koa-session');

const app = new Koa();
const router = new Router();

/** 
 * 这边首先需要配置art-template模板引擎
 * https://aui.github.io/art-template/zh-cn/docs/   这个是模板引擎的语法
 */
artTemplate(app, {
    //视图的位置
    root: path.join(__dirname, 'views'),
    // 视图的后缀名
    extname: '.html',
    // 是否开启调试模式
    debug: process.env.NODE_ENV !== 'production'
});

/** 
 *  使用static加载静态文件
 */
// cookie的签名
app.keys = ['hello kisure']
app.use(static(__dirname,'static'));

/** 
 * 配置session的中间件
 */
const SESSION_CONFIG = {
    key: 'koa:session',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    /** 如果设置为true,那么代表每一次访问都会重新设置session的过期时间 */
    rolling: false,
    /** 如果设置为true，那么代表的是，当访问以后，发现session快要过期的时候，就会重新设置session的过期时间 */
    renew: true
};

app.use(session(SESSION_CONFIG, app));

/** 
 * 在koa中使用cookie进行传递数据：ctx.cookies.set(name, value, [option])
 * option:
 *      maxAge          一个数字表示从 Date.now() 得到的毫秒数（其实就是多少毫秒以后到期）
 *      expires         cookie过期的date（具体到什么时候到期）
 *      path            cookie的路径，默认为'/'
 *                      如果配置了例如：'/news'，那么只能再news路径下，才能够访问这个cookie
 *      domain          cookie域名 
 *      secure          安全cookie默认为false，设置为true表示只有https才能访问
 *      httpOnly        是否只是服务器可访问cookie，默认是true（也就是默认是只能再服务器上访问cookie）
 *                      如果设置为false，那么在浏览器上也可以访问
 *      overwrite       是否可以覆盖以前设置的同名的cookie，默认为false。
 */
router.get('/', async (ctx, next) => {
    const state = {
        name: 'kisure',
        age: '26',
        list: [
            { name: '小🌧', age: '25' },
            { name: '小🐔', age: '24' },
            { name: '小🦆', age: '23' },
            { name: '小🐂', age: '22' }
        ],
        htmlFields: '<h3>hello~这我是h3标签</h3>',
        num: 24
    };

    ctx.cookies.set('userinfo', JSON.stringify({
        name: 'kisure',
        age: 26
    }), {
        maxAge: 60 * 1000 * 2
    });

    // 设置session
    ctx.session.kis = 'nice fish';

    /** 
     * 这里需要注意，我们在渲染模板的时候要加上await
     * 如果不加await，那么页面就会找不到
     */
    await ctx.render('news', {
        ...state
    });
});

/** 
 * koa中使用cookie
 */
router.get('/kisure', async (ctx, next) => {
    const userInfo = JSON.parse(ctx.cookies.get('userinfo') || {});
    console.log('userInfo', userInfo);

    // 获取session
    console.log('session.kis', ctx.session.kis);

    await ctx.render('kisure', {
        userInfo
    });
});

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(3003, () => {

});