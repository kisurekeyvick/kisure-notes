/**
 * https://www.jianshu.com/p/1bda5568b344
 * 
 * WebScoket协议的理解与使用
 */

/**
 * (1) 什么是websocket
 * 
 * - WebScoket是HTML5的一个持久化协议，实现了浏览器与服务器的双全工通信，同时也是跨域的一种解决方法。
 * - WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。
 *  在WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。
 * - 一般有实时数据要求的会考虑 websocket
 */

/**
 * (2) webscoket和ajax的区别
 * 
 * - 使用Ajax轮询：轮询是特定的时间间隔，对服务器发出http请求，然后服务器返回最新的数据给客户端。
 *      缺点：浏览器需要不断的向服务端发送请求，但是请求的头可能就很长，实际的数据只占一小部分，就造成了带宽的浪费。
 * 
 * - 使用 WebScoket协议，能更快的节省服务器资源和带宽，并且能时时通讯。
 */

/**
 * (3) websocket建立连接过程
 * 如图【webScoket.jpg】
 * 
 * - 客户端浏览器首先要向服务器发起一个 HTTP 请求，求和通常的 HTTP 请求不同，包含了一些附加头信息，
 * 其中附加头信息"Upgrade: WebSocket"表明这是一个申请协议升级的 HTTP 请求
 * 
 * - 服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了
 * 
 * - 双方就可以通过这个连接通道自由的传递信息
 * 
 * - 连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接
 */

/**
 * (4) websocket和http的区别
 * 
 * http协议是用在应用层的协议，他是基于tcp协议的，http协议建立链接也必须要有三次握手才能发送信息。
 * http链接分为短链接，长链接，短链接是每次请求都要三次握手才能发送自己的信息。即每一个request对应一个response。
 * 长链接是在一定的期限内保持链接。保持TCP连接不断开。
 * 客户端与服务器通信，必须要有客户端发起然后服务器返回结果。客户端是主动的，服务器是被动的。 
 * 
 * WebSocket他是为了解决客户端发起多个http请求到服务器资源浏览器必须要经过长时间的轮训问题而生的，
 * 他实现了多路复用，他是全双工通信。在webSocket协议下客服端和浏览器可以同时发送信息。
 * 建立了WenSocket之后服务器不必在浏览器发送request请求之后才能发送信息到浏览器。
 */

/**
 * (5) 使用
 * 
 * - 创建WebSocket对象
 *      var Socket = new WebSocket(url, [protocol] );
 *          第一个参数：指定连接的url
 *          第二个参数：指定可接受的子协议 [可选]
 * 
 * - 使用WebSocket 事件
 *      ws.onopen = () => {
 *          ws.send('发送数据')
 *      }
 * 
 *      ws.onmessage = (res) => {
 *          console.log('接收数据', res.data)
 *      }
 * 
 *      ws.onclose = () => {
 *          console.log('连接关闭')
 *      }
 * 
 *      ws.onerror = () => {
 *          console.log('连接发生错误时候触发')
 *      }
 */

/**
 * demo案例
 * 
 * html部分：
    <body>
        <div>
            <h2>Why do you always like to stay with me？</h2>
            <button onclick="my_scoket()">查看回答</button>
        </div>
        <script>
            function my_scoket(){
                let scoket = new WebSocket('ws://localhost:3000');
                //向服务器发送数据
                scoket.onopen = function () {
                    scoket.send("Why do you always like to stay with me?")
                };
                //接收服务器返回的数据
                scoket.onmessage = function (e) {
                    alert(e.data)
                }
            }
        </script>
    </body>

    后端node.js部分：
    const express = require('express');
    const app = express();
    const WebSocket = require('ws');
    let wss = new WebSocket.Server({port:3000});
    wss.on('connection',function (ws) {
        ws.on('message',function (data) {
            console.log(data); //接收到的客户端数据
            ws.send('I need you');//发送给客户端的数据
        })
    });

    效果图查看：【webScoket-demo.jpg】
 */ 


