/**
 * 给定一个包含了一些 0 和 1 的非空二维数组 grid 。
 * 一个 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。
 * 你可以假设 grid 的四个边缘都被 0（代表水）包围着。
 * 找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为 0 。)
 * 
    [   
        [0,0,1,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,1,1,0,1,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,1,0,0,1,0,1,0,0],
        [0,1,0,0,1,1,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0]
    ]

    对于上面这个给定矩阵应返回 6。注意答案不应该是 11 ，因为岛屿只能包含水平或垂直的四个方向的 1
 */

var maxAreaOfIsland = function(grid) {
    const xAxis = grid[0].length;
    const yAxis = grid.length;
    
    if (yAxis === 1) {
        return 0;
    }

    let points = [];

    for (let i = 1; i < yAxis; i ++) {
        for (let j = 1; j < xAxis; j++) {
            if (grid[i][j] === 1 && grid[i][j + 1] === 1 || /** 水平方向 和右边比较 */
                grid[i][j] === 1 && grid[i][j - 1] === 1 || /** 水平方向 和左边比较 */
                grid[i][j] === 1 && grid[i + 1][j] === 1 || /** 竖直方向 和下边比较 */
                grid[i][j] === 1 && grid[i - 1][j] === 1    /** 竖直方向 和上边比较 */
            ) {
                points.push([i, j]);
            }
        }
    }

    const readArea = (coordinates, count) => {
        const repeat = (point) => {
            const [i, j] = point;

            if (grid[i][j] === 1 && grid[i][j + 1] === 1) {
                count ++;
                repeat([i, j + 1]);
            }

            if (grid[i][j] === 1 && grid[i][j - 1] === 1) {
                count ++;
                repeat([i, j - 1]);
            }

            if (grid[i][j] === 1 && grid[i + 1][j] === 1) {
                count ++;
                repeat([i + 1, j]);
            }

            if (grid[i][j] === 1 && grid[i - 1][j] === 1) {
                count ++;
                repeat([i - 1, j]);
            }
        }

        repeat(coordinates);

        return count;
    }

    const areaList = points.map(point => readArea(point, 0));
    
    return Math.max(...areaList);
};
