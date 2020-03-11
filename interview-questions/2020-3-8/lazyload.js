/** 
 * https://blog.csdn.net/AsuraDong/article/details/81776658
 * https://xin-tan.com/passages/2018-08-06-webpack-mutiple-pages/
 * 
 * 单页面解决方案--代码分割和懒加载
 */

/** 
 * 目前webpack针对此项功能提供 2 种函数
 * (1) import(): 引入并且自动执行相关 js 代码
 * (2) require.ensure(): 引入但需要手动执行相关 js 代码
 */

/** 
 * (1)第一步准备工作
 * 
 * 我们在demo文件夹下面
 * src/文件夹下创建pageA.js和pageB.js分别作为两个入口文件。同时，这两个入口文件同时引用subPageA.js和subPageB.js，
 * 而subPageA.js和subPageB.js又同时引用module.js文件。
 * 
 * 我们封装入口文件。而为了让情况更真实，这两个入口文件又同时引用了lodash这个第三方库。
 */

/**
 * (2)第二步编写webpack配置文件
 * 
 * 安装相关的库，创建package.json
    {
        "devDependencies": {
            "webpack": "^4.15.1"
        },
        "dependencies": {
            "lodash": "^4.17.10"
        }
    }
 */

/** 
 * (3) 然后配置webpack.config.js文件
 */
const webpack = require("webpack");
const path = require("path");

module.exports = {
    // 多页面应用
    entry: {
        pageA: "./src/pageA.js",
        pageB: "./src/pageB.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "all",
                    minSize: 1,
                    priority: 0
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                }
            }
        }
    }
};
/** 
 * optimization.splitChunks配置。我们将需要打包的代码放在cacheGroups属性中。
 * 其中，每个键对值就是被打包的一部分。例如代码中的common和vendor。
 * 值得注意的是，针对第三方库（例如lodash）通过设置priority来让其先被打包提取，最后再提取剩余代码。
 * 
 * 上述配置中公共代码的提取顺序其实是:先打包vendor，其次是common
 */

/** 
 * 打包和引用
 * 
 * 命令行中运行webpack即可打包
 */

/** 
 * import()编写page.js
 * 
 * import()可以通过注释的方法来指定打包后的 chunk 的名字。
 * 相信对vue-router熟悉的朋友应该知道，其官方文档的路由懒加载的配置也是通过import()来书写的。
 * import()会自动运行subPageA.js和subPageB.js的代码
 */

/** 
 * index.html
 * 
 * 我们创建index.html文件，通过<script>标签引入我们打包结果，
 * 需要注意的是：因为是单页应用，所以只要引用入口文件即可（即是上图中的page.bundle.js）。
 */
