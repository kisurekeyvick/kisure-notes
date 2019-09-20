/** 
 * 脚手架初始化
 */

/** 
 * (1) #!node 会去环境设置寻找node目录
 *  相当于告诉执行器，用node来执行脚本代码
 * 
 * 使用node开发命令行工具所执行的js脚本必须在顶部加入 #!/user/bin/env node 声明
 * 
 * 有可能在写成#!/user/bin/env node，会找不到对应的路径，在终端输入命令的时候会爆出：系统找不到指定的路径。
 * 那是因为寻找的目录不对，你可以参考yarn的路径
 * 这边可能是因为安装nodejs的姿势不对，所以我将匹配的路径写成了#!node
 */

/** 
 * (2) 第二步，使用npm init -y 来进行初始化package.json文件
 */

/** 
 * (3) 第三步，在package.json文件中
 * 
    "bin": {
        "nice fish": ""
    }

    bin 字段可以定义命令名和关联的执行文件

    在对应的文件环境中，打开终端，输入：npm link，于是就会关联全局

    如果你觉得这个命令不合适，想换一个命令，那么就使用npm unlink，将这个关联取消移除掉
 */


 