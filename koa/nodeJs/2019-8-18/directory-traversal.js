/** 
 * 遍历目录
 * 
 * 遍历目录是操作文件时的一个常见需求。比如写一个程序，需要找到并处理指定目录下的所有JS文件时，就需要遍历整个目录。
 */

/** 
 * (1) 递归算法
 * 遍历目录时一般使用递归算法，否则就难以编写出简洁的代码。递归算法与数学归纳法类似，通过不断缩小问题的规模来解决问题。
 */
function factorial(n) {
    if (n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
// 上边的函数用于计算N的阶乘（N!）。可以看到，当N大于1时，问题简化为计算N乘以N-1的阶乘。当N等于1时，问题达到最小规模，不需要再简化，因此直接返回1。

// 注意： 使用递归算法编写的代码虽然简洁，但由于每递归一次就产生一次函数调用，在需要优先考虑性能时，需要把递归算法转换为循环算法，以减少函数调用次数。

/** 
 * (2) 遍历算法
 * 目录是一个树状结构，在遍历时一般使用深度优先+先序遍历算法。
 * 深度优先，意味着到达一个节点后，首先接着遍历子节点而不是邻居节点。
 * 先序遍历，意味着首次到达了某节点就算遍历完成，而不是最后一次返回某节点才算数。
 * 因此使用这种遍历方式时，下边这棵树的遍历顺序是A > B > D > E > C > F。
 */
/** 
          A
         / \
        B   C
       / \   \
      D   E   F
 */

/** 
 * 同步遍历
 */
const fs = require('fs');
function travel(dir, callback) {
    fs.readFileSync(dir).forEach((file) => {
        const pathName = path.join(dir, file);

        /** 
         * fs.statSync 提供文件的相关信息
         * fs.statSync(pathName).isDirectory()  用于判断 pathName路径下是否为目录
         *      如果是文件目录则返回true
         */
        if (fs.statSync(pathName).isDirectory()) {
            travel(pathName, callback);
        } else {
            callback(pathname);
        }
    });
}

/** 
    - /home/user/
        - foo/
            x.js
        - bar/
            y.js
        z.css

    使用以下代码遍历该目录时，得到的输入如下:
        travel('/home/user', function (pathname) {
            console.log(pathname);
        });

        ------------------------
        /home/user/foo/x.js
        /home/user/bar/y.js
        /home/user/z.css
 */

/** 
 * 异步遍历
 * 如果读取目录或读取文件状态时使用的是异步API，目录遍历函数实现起来会有些复杂，但原理完全相同。travel函数的异步版本如下。
 */
function travel(dir, callback, finish) {
    /** 
     * fs.readdir 读取目录的内容。
     * 回调有两个参数 (err, files)，其中 files 是目录中的文件名的数组（不包括 '.' 和 '..'）。
     */
    fs.readdir(dir, function(err, files) {
        const next = (i) => {
            if (i < files.length) {
                // path.join 将文件目录的路径和子文件的名字拼接 返回新的文件目录
                const pathName = path.join(dir, files[i]);

                fs.stat(pathName, function(error, stats) {
                    if (stats.isDirectory()) {
                        travel(pathName, callback, function() {
                            next(i + 1);
                        });
                    } else {
                        callback(pathName, function() {
                            next(i + 1);
                        });
                    }
                });
            } else {
                finish && finish();
            }
        };

        next(0);
    });
}

/** 
 * 文本编码
 * 
 * 使用NodeJS编写前端工具时，操作得最多的是文本文件，因此也就涉及到了文件编码的处理问题。
 * 我们常用的文本编码有UTF8和GBK两种，并且UTF8文件还可能带有BOM。
 * 在读取不同编码的文本文件时，需要将文件内容转换为JS使用的UTF8编码字符串后才能正常处理。
 * 
 * 在不同的Unicode编码下，BOM字符对应的二进制字节如下：
        Bytes      Encoding
    ----------------------------
        FE FF       UTF16BE
        FF FE       UTF16LE
        EF BB BF    UTF8
 * 
    因此，我们可以根据文本文件头几个字节等于啥来判断文件是否包含BOM，以及使用哪种Unicode编码。
    但是，BOM字符虽然起到了标记文件编码的作用，其本身却不属于文件内容的一部分，如果读取文本文件时不去掉BOM，在某些使用场景下就会有问题。

    例如我们把几个JS文件合并成一个文件后，如果文件中间含有BOM字符，就会导致浏览器JS语法错误。因此，使用NodeJS读取文本文件时，一般需要去掉BOM。
 */
function readtext(pathname) {
    const bin = fs.readFileSync(pathname);

    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }

    return bin.toString('utf-8');
}

/** 
 * 单字节编码
 * 
 * 有时候，我们无法预知需要读取的文件采用哪种编码，因此也就无法指定正确的编码。
 * 比如我们要处理的某些CSS文件中，有的用GBK编码，有的用UTF8编码。
 * 虽然可以一定程度可以根据文件的字节内容猜测出文本编码，但这里要介绍的是有些局限，但是要简单得多的一种技术。
 * 
 * 首先我们知道，如果一个文本文件只包含英文字符，比如Hello World，那无论用GBK编码或是UTF8编码读取这个文件都是没问题的。
 * 这是因为在这些编码下，ASCII0~128范围内字符都使用相同的单字节编码。
 * 
 * 反过来讲，即使一个文本文件中有中文等字符，如果我们需要处理的字符仅在ASCII0~128范围内，比如除了注释和字符串以外的JS代码，
 * 我们就可以统一使用单字节编码来读取文件，不用关心文件的实际编码是GBK还是UTF8。
 */

/** 
 * NodeJS中自带了一种binary编码可以用来实现这个方法，因此在下例中，我们使用这种编码来演示上例对应的代码该怎么写。
 */
function replace(pathname) {
    var str = fs.readFileSync(pathname, 'binary');
    str = str.replace('foo', 'bar');
    fs.writeFileSync(pathname, str, 'binary');
}

/** 
 * 总结：
 * 
 * 本章介绍了使用NodeJS操作文件时需要的API以及一些技巧，总结起来有以下几点：
 * 需要对文件读写做到字节级别的精细控制时，请使用fs模块的文件底层操作API。
 * 不要使用拼接字符串的方式来处理路径，使用path模块。
 * 掌握好目录遍历和文件编码处理技巧，很实用。
 */

