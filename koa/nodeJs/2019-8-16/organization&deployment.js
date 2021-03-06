/** 
 * 前言：
 * 使用NodeJS编写程序前，为了有个良好的开端，首先需要准备好代码的目录结构和部署方式，就如同修房子要先搭脚手架。
 */

/** 
 * (1) 模块路径解析规则
 * 
 * 我们已经知道，require函数支持斜杠（/）或盘符（C:）开头的绝对路径，也支持./开头的相对路径。
 * 但这两种路径在模块之间建立了强耦合关系，一旦某个模块文件的存放位置需要变更，
 * 使用该模块的其它模块的代码也需要跟着调整，变得牵一发动全身。
 * 因此，require函数支持第三种形式的路径，写法类似于foo/bar，并依次按照以下规则解析路径，直到找到模块位置。
 * 
 *  一：内置模块
 *      如果传递给require函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如require('fs')。
 * 
 *  二：node_modules目录
 *      nodejs定义了一个特殊的node_modiles目录用于存放模块，例如：某个模块的绝对路径是/home/user/hello.js
 *      在该模块中使用require('foo/bar')方式加载模块时，则NodeJS依次尝试使用以下路径：
 *          /home/user/node_modules/foo/bar
 *          /home/node_modules/foo/bar
 *          /node_modules/foo/bar
 * 
 *  三：NODE_PATH环境变量
 *      与PATH环境变量类似，NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径。
 *      NODE_PATH环境变量中包含一到多个目录路径，路径之间在Linux下使用:分隔，在Windows下使用;分隔。例如定义了以下NODE_PATH环境变量：
 *      NODE_PATH=/home/user/lib:/home/lib
 * 
 *      当使用require('foo/bar')的方式加载模块时，则NodeJS依次尝试以下路径：
 *          /home/user/lib/foo/bar
 *          /home/lib/foo/bar
 */

/** 
 * (2) 包(package)
 * 
 * 我们已经知道了JS模块的基本单位是单个JS文件，但复杂些的模块往往由多个子模块组成。
 * 为了便于管理和使用，我们可以把由多个子模块组成的大模块称做包，并把所有子模块放在同一个目录里。
 * 
 * 在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象。
 * 例如有以下目录结构：
 *      - /home/user/lib/
 *          - cat/
 *              head.js
 *              body.js
 *              main.js
 * 
 * 其中cat目录定义了一个包，其中包含了3个子模块。main.js作为入口模块，其内容如下：
 *      var head = require('./head');
 *      var body = require('./body');
 * 
 *      exports.create = function (name) {
 *          return {
 *              name: name,
 *              head: head.create(),
 *              body: body.create()
 *          }
 *      }
 * 
 * 在其它模块里使用包的时候，需要加载包的入口模块。
 * 接着上例，使用require('/home/user/lib/cat/main')能达到目的，但是入口模块名称出现在路径里看上去不是个好主意。
 * 因此我们需要做点额外的工作，让包使用起来更像是单个模块。
 * 
 * 
 * index.js
 * 当模块的文件名是index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径，因此接着上例，以下两条语句等价。
 * var cat = require('/home/user/lib/cat');
 * var cat = require('/home/user/lib/cat/index');
 * 
    - /home/user/lib/
        - cat/
            + doc/
            - lib/
                head.js
                body.js
                main.js
            + tests/
            package.json

    其中package.json内容如下：

    {
        "name": "cat",
        "main": "./lib/main.js"
    }

    如此一来，就同样可以使用require('/home/user/lib/cat')的方式加载模块。
    NodeJS会根据包目录下的package.json找到入口模块所在位置。
 */

/** 
 * (3) 命令行程序
 * 
 * 使用NodeJS编写的东西，要么是一个包，要么是一个命令行程序，而前者最终也会用于开发后者。
 * 因此我们在部署代码时需要一些技巧，让用户觉得自己是在使用一个命令行程序。
 * 
 * 
 */

/** 
 * (4) 工程目录
 * 以编写一个命令行程序为例，一般我们会同时提供命令行模式和API模式两种使用方式，
 * 并且我们会借助三方包来编写代码。除了代码外，一个完整的程序也应该有自己的文档和测试用例。
 * 
    - /home/user/workspace/node-echo/   # 工程目录
        - bin/                          # 存放命令行相关代码
            node-echo
        + doc/                          # 存放文档
        - lib/                          # 存放API相关代码
            echo.js
        - node_modules/                 # 存放三方包
            + argv/
        + tests/                        # 存放测试用例
        package.json                    # 元数据文件
        README.md                       # 说明文件
 */

/** 
 * (5) NPM
 * NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：
 *      一：允许用户从NPM服务器下载别人编写的三方包到本地使用。
 *      二：允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
 *      三：允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。
 * 
 * 指定npm下载的包的版本：
 *      npm install 库名@版本号
 *      
 */
