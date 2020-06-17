/**
 * https://zhuanlan.zhihu.com/p/30669007
 * https://juejin.im/post/5ee8e32a51882543485780d3#heading-22
 * 
 * webpack 热更新
 */

/**
 * 热更新的表现：
 * 
 * 当你对代码进行修改并保存后，webpack 将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，
 * 这样在不刷新浏览器的前提下就能够对应用进行更新。例如，在开发 Web 页面过程中，当你点击按钮，出现一个弹窗的时候，
 * 发现弹窗标题没有对齐，这时候你修改 CSS 样式，然后保存，在浏览器没有刷新的前提下，标题样式发生了改变。
 * 感觉就像在 Chrome 的开发者工具中直接修改元素样式一样。
 */

/**
 * 提出如下疑问：
 * (1) webpack 可以将不同的模块打包成 bundle 文件或者几个 chunk 文件，
 *      但是当我通过 webpack HMR 进行开发的过程中，我并没有在我的 dist 目录中找到 webpack 打包好的文件，它们去哪呢？
 * (2) 通过查看 webpack-dev-server 的 package.json 文件，我们知道其依赖于 webpack-dev-middleware 库，
 *      那么 webpack-dev-middleware 在 HMR 过程中扮演什么角色？
 * (3) 使用 HMR 的过程中，通过 Chrome 开发者工具我知道浏览器是通过 websocket 和 webpack-dev-server 进行通信的，
 *      但是 websocket 的 message 中并没有发现新模块代码。打包后的新模块又是通过什么方式发送到浏览器端的呢？
 *      为什么新的模块不通过 websocket 随消息一起发送到浏览器端呢？
 * (4) 浏览器拿到最新的模块代码，HMR 又是怎么将老的模块替换成新的模块，在替换的过程中怎样处理模块之间的依赖关系？
 * (5) 当模块的热替换过程中，如果替换模块失败，有什么回退机制吗？
 */ 

/**
 * HMR 的工作原理图解
 * 
 * 【webpack-HMR.jpg】
 * 上图是webpack 配合 webpack-dev-server 进行应用开发的模块热更新流程图。
 * - 红色边框内是服务端，橙色边框是浏览器端
 * - 绿色的方框是 webpack 代码控制的区域。蓝色方框是 webpack-dev-server 代码控制的区域，
 *      洋红色的方框是文件系统，文件修改后的变化就发生在这，而青色的方框是应用本身。
 * - 上图显示了我们修改代码到模块热更新完成的一个周期，通过深绿色的阿拉伯数字符号已经将 HMR 的整个过程标识了出来。
 * 
 *      (1) 第一步，在webpack的watch模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，
 *          根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。
 *      (2) 第二步是 webpack-dev-server 和 webpack 之间的接口交互，
 *          而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，
 *          webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。
 *      (3) 第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。
 *          当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，
 *          变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。
 *      (4) 第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）
 *          在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，
 *          同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。
 *          当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。
 *      (5) webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，
 *          webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。
 *          当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。
 *      (6) HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，
 *          它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，
 *          该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，
 *          获取到最新的模块代码。这就是上图中 7、8、9 步骤。
 *      (7) 而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，
 *          决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。
 *      (8) 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。
 */

/**
 * 运用 HMR 的简单例子
 * 
 * 上一个部分，通过一张 HMR 流程图，简要的说明了 HMR 进行模块热更新的过程。
 * （上面这些英文名词代表着代码仓库或者仓库中的文件模块）
 * 通过一个最简单最纯粹的例子，通过分析 wepack及 webpack-dev-server 源码详细说明各个库在 HMR 过程中的具体职责:
 */
/**
 * 有如下仓库文件：
    --hello.js
    --index.js
    --index.html
    --package.json
    --webpack.config.js

 * 项目中包含两个 js 文件，项目入口文件是 index.js 文件，hello.js 文件是 index.js 文件的一个依赖
 */
// webpack.config.js的配置
const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/')
    },
    devServer: {
        hot: true
    }
}

/**
 * 在上面的配置中并没有配置 HotModuleReplacementPlugin，
 * 原因在于当我们设置 devServer.hot 为 true 后，并且在package.json 文件中添加如下的 scripts 脚本：
 * "start": "webpack-dev-server --hot --open"
 * 
 * 添加 —hot 配置项后，devServer 会告诉 webpack 自动引入 HotModuleReplacementPlugin 插件，而不用我们再手动引入了。
 */

/**
 * 当我们修改 hello.js 文件中的代码，在源码层面上来分析 HMR 的具体运行流程：
 * 
 * 第一步：webpack 对文件系统进行 watch 打包到内存中
 *          webpack-dev-middleware 调用 webpack 的 api 对文件系统 watch，当 hello.js 文件发生改变后，
 *          webpack 重新对文件进行编译打包，然后保存到内存中。
 * 
 *          你可能会疑问了，为什么 webpack 没有将文件直接打包到 output.path 目录下呢？文件又去了哪儿？
 *          原来 webpack 将 bundle.js 文件打包到了内存中，不生成文件的原因就在于访问内存中的代码比访问文件系统中的文件更快，
 *          而且也减少了代码写入文件的开销，这一切都归功于memory-fs，memory-fs 是 webpack-dev-middleware 的一个依赖库，
 *          webpack 原本的 outputFileSystem 替换成了MemoryFileSystem 实例，这样代码就将输出到内存中。
 *          
 *          webpack-dev-middleware 中该部分源码如下：
                var isMemoryFs = !compiler.compilers && compiler.outputFileSystem instanceof MemoryFileSystem;
                if(isMemoryFs) {
                    fs = compiler.outputFileSystem;
                } else {
                    fs = compiler.outputFileSystem = new MemoryFileSystem();
                }                 
 *              
 *          首先判断当前 fileSystem 是否已经是 MemoryFileSystem 的实例，如果不是，
 *          用 MemoryFileSystem 的实例替换 compiler 之前的 outputFileSystem。
 *          这样 bundle.js 文件代码就作为一个简单 javascript 对象保存在了内存中，
 *          当浏览器请求 bundle.js 文件时，devServer就直接去内存中找到上面保存的 javascript 对象返回给浏览器端。
 * 
 * 第二步：devServer 通知浏览器端文件发生改变
 *          在这一阶段，sockjs 是服务端和浏览器端之间的桥梁，在启动 devServer 的时候，
 *          sockjs 在服务端和浏览器端建立了一个 webSocket 长连接，以便将 webpack 编译和打包的各个阶段状态告知浏览器，
 *          最关键的步骤还是 webpack-dev-server 调用 webpack api 监听 compile的 done 事件，当compile 完成后，
 *          webpack-dev-server通过 _sendStatus 方法将编译打包后的新模块 hash 值发送到浏览器端。
 * 
            // webpack-dev-server/lib/Server.js
            compiler.plugin('done', (stats) => {
                // stats.hash 是最新打包文件的 hash 值
                this._sendStats(this.sockets, stats.toJson(clientStats));
                this._stats = stats;
            });
            ...
            Server.prototype._sendStats = function (sockets, stats, force) {
                if (!force && stats &&
                    (!stats.errors || stats.errors.length === 0) && stats.assets &&
                    stats.assets.every(asset => !asset.emitted)
                ) { return this.sockWrite(sockets, 'still-ok'); }
                    // 调用 sockWrite 方法将 hash 值通过 websocket 发送到浏览器端
                    this.sockWrite(sockets, 'hash', stats.hash);
                    if (stats.errors.length > 0) { 
                        this.sockWrite(sockets, 'errors', stats.errors); 
                    } 
                    else if (stats.warnings.length > 0) { 
                        this.sockWrite(sockets, 'warnings', stats.warnings); 
                    } else { this.sockWrite(sockets, 'ok'); }
            };
 * 
 * 第三步：webpack-dev-server/client 接收到服务端消息做出响应
 *          可能你又会有疑问，我并没有在业务代码里面添加接收 websocket 消息的代码，也没有在 webpack.config.js 中的 entry 属性中添加新的入口文件，
 *          那么 bundle.js 中接收 websocket 消息的代码从哪来的呢？
 * 
 *          原来是 webpack-dev-server 修改了webpack 配置中的 entry 属性，在里面添加了 webpack-dev-client 的代码，
 *          这样在最后的 bundle.js 文件中就会有接收 websocket 消息的代码了。
 * 
 *          webpack-dev-server/client 当接收到 type 为 hash 消息后会将 hash 值暂存起来，当接收到 type 为 ok 的消息后对应用执行 reload 操作，
 *          如图【webpack-dev-server-client-websocket.jpg】所示，hash 消息是在 ok 消息之前。
 * 
 *          websocket 接收 dev-server 通过 sockjs 发送到浏览器端的消息列表，在 reload 操作中，
 *          webpack-dev-server/client 会根据 hot 配置决定是刷新浏览器还是对代码进行热更新（HMR）。代码如下：
 * 
            // webpack-dev-server/client/index.js
            hash: function msgHash(hash) {
                currentHash = hash;
            },
            ok: function msgOk() {
                // ...
                reloadApp();
            },
            // ...
            function reloadApp() {
                // ...
                if (hot) {
                    log.info('[WDS] App hot update...');
                    const hotEmitter = require('webpack/hot/emitter');
                    hotEmitter.emit('webpackHotUpdate', currentHash);
                    // ...
                } else {
                    log.info('[WDS] App updated. Reloading...');
                    self.location.reload();
                }
            }
 * 
 *          如上面代码所示，首先将 hash 值暂存到 currentHash 变量，当接收到 ok 消息后，对 App 进行 reload。
 *          如果配置了模块热更新，就调用 webpack/hot/emitter 将最新 hash 值发送给 webpack，然后将控制权交给 webpack 客户端代码。
 *          如果没有配置模块热更新，就直接调用 location.reload 方法刷新页面。
 * 
 * 第四步：webpack 接收到最新 hash 值验证并请求模块代码
 *          在这一步，其实是 webpack 中三个模块（三个文件，后面英文名对应文件路径）之间配合的结果，
 *          首先是 webpack/hot/dev-server（以下简称 dev-server） 监听第三步 webpack-dev-server/client 发送的 webpackHotUpdate 消息，
 *          调用 webpack/lib/HotModuleReplacement.runtime（简称 HMR runtime）中的 check 方法，检测是否有新的更新，
 *          在 check 过程中会利用 webpack/lib/JsonpMainTemplate.runtime（简称 jsonp runtime）中的两个方法 hotDownloadUpdateChunk 和 hotDownloadManifest ，
 *          第二个方法(hotDownloadManifest)是调用 AJAX 向服务端请求是否有更新的文件，如果有将发更新的文件列表返回浏览器端，
 *          而第一个方法(hotDownloadUpdateChunk)是通过 jsonp 请求最新的模块代码，然后将代码返回给 HMR runtime，HMR runtime 
 *          会根据返回的新模块代码做进一步处理，可能是刷新页面，也可能是对模块进行热更新。
 * 
 *          hotDownloadManifest方法获取更新文件列表：【hotDownloadManifest.jpg】
 * 
 *          hotDownloadUpdateChunk获取到更新的新模块代码：【hotDownloadUpdateChunk.jpg】
 * 
 *          值得注意的是，两次请求的都是使用上一次的 hash 值拼接的请求文件名，hotDownloadManifest 方法返回的是最新的 hash 值，
 *          hotDownloadUpdateChunk 方法返回的就是最新 hash 值对应的代码块。然后将新的代码块返回给 HMR runtime，进行模块热更新。
 * 
 *          还记得 HMR 的工作原理图解 中的问题 3 吗？为什么更新模块的代码不直接在第三步通过 websocket 发送到浏览器端，
 *          而是通过 jsonp 来获取呢？
 *          我的理解是，功能块的解耦，各个模块各司其职，dev-server/client 只负责消息的传递而不负责新模块的获取，
 *          而这些工作应该有 HMR runtime 来完成，HMR runtime 才应该是获取新代码的地方。
 * 
 * 第五步：HotModuleReplacement.runtime 对模块进行热更新
 *          这一步是整个模块热更新（HMR）的关键步骤，而且模块热更新都是发生在HMR runtime 中的 hotApply 方法中，
 *          如下的关键代码：
                // webpack/lib/HotModuleReplacement.runtime
                function hotApply() {
                    // ...
                    var idx;
                    var queue = outdatedModules.slice();
                    while(queue.length > 0) {
                        moduleId = queue.pop();
                        module = installedModules[moduleId];
                        // ...
                        // remove module from cache
                        delete installedModules[moduleId];
                        // when disposing there is no need to call dispose handler
                        delete outdatedDependencies[moduleId];
                        // remove "parents" references from all children
                        for(j = 0; j < module.children.length; j++) {
                            var child = installedModules[module.children[j]];
                            if(!child) continue;
                            idx = child.parents.indexOf(moduleId);
                            if(idx >= 0) {
                                child.parents.splice(idx, 1);
                            }
                        }
                    }
                    // ...
                    // insert new code
                    for(moduleId in appliedUpdate) {
                        if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
                            modules[moduleId] = appliedUpdate[moduleId];
                        }
                    }
                    // ...
                }
 *          
 *              从上面 hotApply 方法可以看出，模块热替换主要分三个阶段，第一个阶段是找出 outdatedModules 和 outdatedDependencies，
 *              第三个阶段是将新的模块添加到 modules 中，当下次调用 __webpack_require__ (webpack 重写的 require 方法)方法的时候，
 *              就是获取到了新的模块代码了。
 * 
 *          模块热更新的错误处理，如果在热更新过程中出现错误，热更新将回退到刷新浏览器，这部分代码在 dev-server 代码中，简要代码如下：
                module.hot.check(true).then(function(updatedModules) {
                    if(!updatedModules) {
                        return window.location.reload();
                    }
                    // ...
                }).catch(function(err) {
                    var status = module.hot.status();
                    if(["abort", "fail"].indexOf(status) >= 0) {
                        window.location.reload();
                    }
                });
 *   
 *              dev-server 先验证是否有更新，没有代码更新的话，重载浏览器。如果在 hotApply 的过程中出现 abort 或者 fail 错误，也进行重载浏览器。
 * 
 * 
 * 第六步：业务代码需要做些什么？
 *          当用新的模块代码替换老的模块后，但是我们的业务代码并不能知道代码已经发生变化，也就是说，当 hello.js 文件修改后，
 *          我们需要在 index.js 文件中调用 HMR 的 accept 方法，添加模块更新后的处理函数，及时将 hello 方法的返回值插入到页面中。
 *          代码如下：
                // index.js
                if(module.hot) {
                    module.hot.accept('./hello.js', function() {
                        div.innerHTML = hello()
                    })
                }
 */ 