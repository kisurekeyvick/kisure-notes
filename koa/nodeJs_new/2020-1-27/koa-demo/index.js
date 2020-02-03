const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static'); 
const utilsFunc = require('./utils/func');

// const { postFunc } = utilsFunc.commonFunc;
const app = new Koa();
const router = new Router();

/** 
 * 配置第三方中间件
 * 
 * 加载模板引擎
 * 1. 安装 koa-views
 * 2. 安装 ejs
 * 3. app.use(views(__dirname, { extension: 'ejs' }))
 * 4. 安装koa-bodyparser
 * 5. 安装koa-static
 * 
 * 'views'代表的是koa-demo文件夹下面的views文件夹
 * extension:'ejs' 代表的是应用ejs模板引擎
 * 
 * 
 * 当然，我们也可以这样：app.use(views('views', { map: { html: 'ejs' } }))
 * 使用这句话的话，需要注意，我们在views文件夹中写的不是ejs文件，而是.html文件
 * 
 * 使用koa-bodyparser来获取提交的数据
 * 
 * koa-static是静态资源中间件
 */
app.use(views('views', {
    extension: 'ejs'
}));

/** 
 *  使用static加载静态文件
 */
app.use(static(__dirname,'static'));

/** 
 * 作为中间件，匹配路由之前的操作
 * 如果我们不写next(),那么路由一旦被匹配到了，就不会继续向下继续匹配了
 */
app.use(async (ctx, next) => {
    console.log(new Date());
    /** 
     * 当前路由匹配完成以后继续向下匹配
     */
    await next();
});

/** 
 * 错误处理中间件
 */
app.use(async (ctx, next) => {
    console.log('这是一个中间件路由');
    await next();

    if (ctx.status === 404) {
        ctx.body = '这是一个404页面';
    }
});

/** 
 * 如果是公共的数据，那么卸载中间件里面
 */
app.use(async (ctx, next) => {
    ctx.state.userInfo = {
        name: 'nicefish',
        age: '1000'
    };

    await next();
});

/** 
 * 通俗的讲：路由就是更具不同的URL，加载不同页面的实现功能
 * koa的路由与Express不同，express是直接可以引入Express就可以配置路由，但是在Koa中我们需要安装koa-router路由模块来实现
 * 在回调函数中存在2个参数：ctx，next
 * ctx：代表的是上下文，包含了response,request
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

    /** 
     * 这里需要注意，我们在渲染模板的时候要加上await
     * 如果不加await，那么页面就会找不到
     */
    await ctx.render('index', {
        ...state
    });
});

/** 
 * 使用next()，那么匹配到该路由以后，继续向下匹配路由
 */
router.get('/news', async (ctx, next) => {
    console.log('nice fish');
    await next();
});

router.get('/news', function(ctx, next) {
    ctx.body = '新闻';
});


/** 
 * 动态路由
 */
router.get('/newscontent/:aid', function(ctx, next) {
    /** 
     * 从ctx中读取get传值
     * 在koa中GET传值通过request接收，但是接收的方法有2种：query和querystring
     * query：返回的是格式化好的参数对象
     * querystring：返回的是请求字符串
     */

    console.log(ctx.params);

    ctx.body = '新闻详情';
});

/**
 * (1)作用：启动路由
 *      app.use(function)
 *          将给定的中间件方法添加到此应用程序
 *          只有配置了app.use(router.routes()),那么路由才能够启动
 * 
 * (2)app.use用于中间件
 *      app.use有2个参数，第一个参数用于匹配路由，第二个参数写入中间件
 *      如果app.user只有一个参数（中间件），那么匹配的是全部路由
 */
app.use(router.routes());

/**
 * 作用：router.allowedMethods()用在了路由匹配router.routes()之后，所以在当所有路由中间件最后调用
 * 此时更具ctx.status设置response响应头
 */
app.use(router.allowedMethods());

/** 
 * 使用bodyParser以后，我们就可以在其他地方使用：ctx.request.body来获取的提交数据
 */
app.use(bodyParser());

/** 
 * 使用bodyParser以后，我们就不用再自己费尽的组装一个获取数据的功能
 */
router.post('/addInfo', async (ctx, next) => {
    // const data = await postFunc(ctx);
    const data = ctx.request.body;
    /** 
     * 获取数据
     */
    ctx.body = data;
});

app.listen(3001, () => {

});


/** 
 * 关于ejs的一些知识点
 * (1): ejs引入模板
 *      <%- include(模板的路径) %>
 * 
 * (2)；ejs绑定数据
 *      <%=变量名%>
 *  
 * (3)：ejs绑定HTML数据
 *      <%-变量%>
 * 
 * (4): ejs循环内容
 *      <ul>
 *          <%for(let i = 0; i < 变量.length; i++){%>
 *              <li>数据：<%=变量[i]%></li>
 *          <}%>
 *      </ul>
 * 
 * (5)：ejs模板判断语句
 *      <%if(条件判断){%>
 * 
 *      <%}else{%>
 *          
 *      <%}%>
 * 
 * (6)：使用全局的数据
 *      app.use(async (ctx, next) => {
            ctx.state.userInfo = {
                name: 'nicefish',
                age: '1000'
            };

            await next();
        });

        这样在每一个路由中都可以使用userInfo这个对象了
 *
 *
 */