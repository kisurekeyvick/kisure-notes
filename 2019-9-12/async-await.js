/**
 * https://mp.weixin.qq.com/s/lCRYrSFUWKObXwkhERyoPw
 * 
 * 关于async/await的最佳实践
 * 
 * 如何实现一个函数，使得 repeat(() => {console.log('1')}, 5, 2000) 每两秒执行一次打印，总共五次?
 */
function wait(millisecond) {
    return new Promise((resolve) => {
      setTimeout(resolve, millisecond);
    });
}
  
async function repeat(task, count = 1, millisecond = 0) {
    while(count--) {
        await wait(millisecond);
        task();
    }
}

