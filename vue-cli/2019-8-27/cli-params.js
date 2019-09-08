/** 
 * (1) 使用commander模块处理命令行
 * 
 * 这里我们可以使用commander，进行终端命令符的接收
 */

const program = require('commander');

program
  // 版本号
  .version('0.1.0')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

program
  // <>代表的是必填参数，而[]代表的是可填写的参数
  .command('init <framework> <projectName>')
  // description代表的是运行命令提示的文本
  .description('K-Cli initing....')
  .option("-s, --init_mode [mode]", "Which init mode to use")
  .action((framework, projectName) => {
    console.log(framework, projectName);
  });
