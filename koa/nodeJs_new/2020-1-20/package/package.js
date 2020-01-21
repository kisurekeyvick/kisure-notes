/** 
 * 终端打开package文件夹，然后输入 npm init --yes
 * 这样就可以初始化package.json
 */

/** 
    {
        "name": "kisure",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {
            "md5":"^2.2.1"
        }
    }

    (1) 在使用这个包的时候，我们npm install，那么通过package.json
    会将md5的包下载下来，然后main的入口文件是index.js。我们引用这个模块的时候，
    会使用index.js。而引用的包的名字叫kisure
    也就是说:  const func = require('kisure');

    (2) 指定包的版本：npm install 包的名字@2.1.0

    (3) 版本号标识符
        ^ 表示第一位的版本号不变
            例如：^2.1.0，如果这个包更新成了2.2.0，那么我们重新npm下载的时候，下载的版本号是2.2.0
        ~ 表示前两位不变，最后一个取最新的值
        * 表示全部去最新的
        或者什么都没有
            例如： 2.1.0，代表的是无论版本怎么改变，我们都加载的是2.1.0版本
            
    (4) dependencies保存的是项目中所需要的包，而devDependencies保存的是项目中所需要的工具包
        通常情况下我们都会选择将包放在dependencies中的
 */