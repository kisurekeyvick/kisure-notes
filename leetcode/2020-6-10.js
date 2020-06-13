/**
 * https://leetcode-cn.com/problems/unique-paths/
 * 
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 * 问总共有多少条不同的路径？
 * 
 * 
 * 输入: m = 3, n = 2
    输出: 3
    解释:
    从左上角开始，总共有 3 条路径可以到达右下角。
    1. 向右 -> 向右 -> 向下
    2. 向右 -> 向下 -> 向右
    3. 向下 -> 向右 -> 向右
 */
var uniquePaths = function(m, n) {
    /** m是横轴，n是竖轴 */
    let initArrFunc = () => {
        let val = [];
        
        Array.apply(null, Array(n)).forEach((item, index) => {
            val[index] = Array.apply(null, Array(m)).map(() => 1);
        });

        return val;
    };

    const initArr = initArrFunc();

    const run = (layer) => {
        /** layer代表层数 也就是i */
        // initArr[i][j] = initArr[i][j - 1] + initArr[i - 1][j];
        for (let j = 1; j < initArr[layer].length; j++) {
            initArr[layer][j] = initArr[layer][j - 1] + initArr[layer - 1][j];
        }

        initArr[layer + 1] && run(layer + 1);
    }

    if (n > 1) {
        run(1);
    } else {
        return 1;
    }

    return initArr[n - 1][m - 1];
};

/** 优质解法 */
var uniquePaths_2 = function(m, n) {
    const cur = new Array(n).fill(1);

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            cur[j] = cur[j - 1] + cur[j];
        }
    }

    return cur[n - 1];
}
