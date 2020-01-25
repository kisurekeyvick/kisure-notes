/** 
 * supervisor的作用就是全局监听应用文件的改变
 * 
 * 我们可以使用supervisor代替node命令启动应用
 */

var http = require('http');
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('ok');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');

/** 
 * 我们运行的时候：supervisor supervisor
 * 这样就可以实时监听了
 */
