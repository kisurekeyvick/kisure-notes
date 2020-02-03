const http = require('http');
const url = require('url');

http.createServer(function(req, res) {
    const pathName = url.parse(req.url).pathname;
    if (pathName === '/login') {
        
    } else if (pathName === '/register') {

    } else if (pathName === '/order') {

    }
}).listen(8000);

/** 
 * 模板引擎：EJS
 * 作用：将数据库和文件读取的数据显示到HTML页面上，它是第三方模块
 * 下载：npm install ejs
 */