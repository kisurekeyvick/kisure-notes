/** 
 * 加载模板
 * 
 * 下载模板，我们需要使用包：download-git-repo
 * 
 * 
 */
const templateList = {
    'React': {
        url: 'https://github.com:kisurekeyvick/spicy-technology#master',
        description: 'react模板'
    },
    'Vue': {
        url: '',
        description: 'vue模板'
    },
    'Note': {
        url: 'https://github.com:kisurekeyvick/kisure-notes#master',
        description: 'note笔记'
    },
    'Angular': {
        url: '',
        description: 'angular模板'
    }
};

program
  .command('init <framework> <projectName>')
  // description代表的是运行命令提示的文本
  .description('K-Cli initing....')
  .option("-s, --init_mode [mode]", "Which init mode to use")
  .action((framework, projectName) => {
    // 根据名称下载对应的模板
    const { url } = templateList[framework];
    /** 
     * download的参数：
     * (1) 仓库的地址
     * (2) 下载的路径
     */
    url && download(url, projectName, { clone: true }, err => {
        if (err) {
            console.log('下载失败');
        }
    });
  });