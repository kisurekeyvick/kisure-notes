const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const commonFunc = require('./static/common/func');

http.createServer(function (request, response) {
    
    let pathName = request.url;
    console.log('pathName', pathName);
    if (pathName === '/') {
        pathName = '/index.html';
    }

    // 获取文件的后缀名
    let extname = commonFunc.getName(path.extname(pathName));

    if (pathName !== '/favicon.ico') {
        fs.readFile(`static/${pathName}`, (err, data) => {
            if (err) {
                fs.readFile('static/404.html', (error, dataFour) => {
                  response.writeHead(404, {'Content-Type': `text/html;charset="utf-8"`});
                  response.write(dataFour);
                  response.end();
                });
            } else {
                response.writeHead(200, {'Content-Type': `${extname};charset="utf-8"`});
                response.write(data);
                response.end();
            }
        });
    }
}).listen(7080);
