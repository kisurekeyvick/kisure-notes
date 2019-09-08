/** 
 * 包与npm
 * 
 * (1) npm 是啥？
 *  npm 是世界上最大的开放源代码的生态系统。我们可以通过 npm 下载各种各样的包。
 *  在我们安装 Node 的时候，它默认会顺带给你安装 npm。
 * 
 * (2) 一些npm的基础操作
 *  npm -v：查看 npm 版本。
 *  npm list：查看当前目录下都安装了哪些 npm 包。
 *  npm info 模块：查看该模块的版本及内容。
 *  npm i 模块@版本号：安装该模块的指定版本。
 * 
 *  i/install：安装。使用 install 或者它的简写 i，都表明你想要下载这个包。
    uninstall：卸载。如果你发现这个模块你已经不使用了，那么可以通过 uninstall 卸载它。
    g：全局安装。表明这个包将安装到你的计算机中，你可以在计算机任何一个位置使用它。
    --save/-S：通过该种方式安装的包的名称及版本号会出现在 package.json 中的 dependencies 中。
    -save-dev/-D：通过该种方式安装的包的名称及版本号会出现在 package.json 中的 devDependencies 中。
 * 
 * (3) npm 包，我们通过什么管理呢?
 *  答案是 package.json。
 *  如果我们需要创建 package.json，那么我们只需要在指定的包管理目录（例如 node_modules）中通过以下命名进行生成：
 *  npm init：按步骤创建 package.json。
 *  npm init --yes：快速创建 package.json
 */

/** 
 * fs文件管理
 * 
 * fs.Stats 对象提供有关文件的信息
 */
let fs = require('fs');
fs.stat('npm_fs.js',(error, stats) => {
   console.log(`文件：${stats.isFile()}`); 
   // Console：文件：true
    
   console.log(`目录：${stats.isDirectory()}`); 
   // Console：目录：false

   if (error) {

   } else {
      console.log(stats);
      /** 
         Stats {
            dev: 1591047682,
            mode: 33206,
            nlink: 1,
            uid: 0,
            gid: 0,
            rdev: 0,
            blksize: undefined,
            ino: 15481123719220100,
            size: 1616,
            blocks: undefined,
            atimeMs: 1566282060034.517,
            mtimeMs: 1566282060034.517,
            ctimeMs: 1566282060034.517,
            birthtimeMs: 1566272517310.9497,
            atime: 2019-08-20T06:21:00.035Z,
            mtime: 2019-08-20T06:21:00.035Z,
            ctime: 2019-08-20T06:21:00.035Z,
         }
       */
   }
});

/** 
 * fs.mkdir 创建目录
 */
/**
 * 接收参数
 * path - 将创建的目录路径
 * mode - 目录权限（读写权限），默认 0777
 * callback - 回调，传递异常参数 err
 */
fs.mkdir('./css', (err) => {
   if(err) {
      console.log(err);
      return false;
    } else {
      console.log("创建目录成功！");
      // Console：创建目录成功！
    }
}); 

/** 
 * fs.rmdir 删除目录
 */
fs.rmdir('./css', (err) => {
   if(err) {
      console.log(err);
      return false;
    } else {
      console.log("删除成功！");
      // Console：创建目录成功！
    }
});

/** 
 * fs.writeFile 创建写入文件
 */
/** 
 * filename (String) 文件名称
 * data (String | Buffer) 将要写入的内容，可以是字符串或者 buffer 数据。
 * option
 * · encoding (String) 可选。默认 'utf-8'，当 data 是 buffer 时，该值应该为 ignored。
 * · mode (Number) 文件读写权限，默认 438。
 * · flag (String) 默认值 'w'。
 * callback 
 */
fs.writeFile('./nicefisher.js', 'nice fisher', () => {
   if(err) {
      console.log(err);
      return false;
    } else {
      console.log('写入成功！');
    }
});
/** 
 * 值得注意的是，这样的写入，是清空原文件中的所有数据，然后添加 Hello jsliang 这句话。
 * 即：存在即覆盖，不存在即创建。
 */

/** 
 * fs.appendFile 追加内容
 */
fs.appendFile('./nicefisher.js', '这段文本是要追加的内容', (err) => {
   if(err) {
     console.log(err);
     return false;
   } else {
     console.log("追加成功");
   }
});
/** 
 * 这样，我们就成功往里面追加了一段话，从而使 index.js 变成了
 * Hello jsliang这段文本是要追加的内容
 */

/** 
 * fs.readFile 读取文件
 */
fs.readFile('./nicefisher.js', (err, data) => {
   if(err) {
     console.log(err);
     return false;
   } else {
     console.log("读取文件成功！");
     console.log(data);
     // Console：
     // 读取文件成功！
     // <Buffer 48 65 6c 6c 6f 20 6a 73 6c 69 61 6e 67 e8 bf 99 e6 ae b5 e6 96 87 e6 9c ac e6 98 af e8 a6 81 e8 bf bd e5 8a a0 e7 9a 84 e5 86 85 e5 ae b9>
   }
 })

/** 
 * fs.readdir 读取目录
 */
fs.readdir('node_modules', (err, data) => {
   if(err) {
      console.log(err);
      return false;
   } else {
      console.log("读取目录成功！");
      console.log(data);
      // Console：
      // 读取目录成功！
      // [ '03_tool-multiply.js', 'jsliang-module' ]
   }
});

/** 
 * fs.rename 重命名
 */
fs.rename('./index.js', './nicefisher.js', (err) => {
   if(err) {
     console.log(err);
     return false;
   } else {
     console.log("重命名成功！");
   }
});

/** 
 * 当然fs.rename 还有更劲爆的功能：剪切
 */

