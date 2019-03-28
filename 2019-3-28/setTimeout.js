/**
 * 浏览器内，嵌套定时器运行的最小延时
 * 
 * 在浏览器环境下，嵌套定时器的运行频率是受限制的。
 * 根据 HTML5 标准 所言：“经过 5 重嵌套之后，定时器运行间隔强制要求至少达到 4 毫秒”。
 */
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // 保存上次调用的延时

  if (start + 100 < Date.now()) 
    console.log(times); // 100 毫秒之后，显示延时信息
  else 
    setTimeout(run, 0); // 没超过 100 毫秒则再进行调度
}, 0);
//  [2, 4, 6, 8, 14, 18, 24, 30, 35, 40, 45, 51, 56, 62, 68, 74, 80, 85, 91, 97, 103]

/**
 * setTimeout(...,0)的作用：
 * (1) 将耗费 CPU 的任务分割成多块，这样脚本运行不会进入“挂起”状态
 * (2) 进程繁忙时也能让浏览器抽身做其它事情（例如绘制进度条）
 * 
 * 浏览器内部的定时器会因各种原因而出现降速情况
 * (1) CPU 过载。
 * (2) 浏览器页签切换到了后台模式。
 * (3) 笔记本电脑用的是电池供电
 */
function run() {
    let i = 0;
    let start = Date.now();

    function count() {
        // 执行一个耗时的任务
        for (let j = 0; j < 1e9; j++) {
            i++;
        }

        console("Done in " + (Date.now() - start) + 'ms');
    }

    count();
}

run();