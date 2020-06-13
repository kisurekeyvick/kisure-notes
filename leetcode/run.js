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
        const history = [];
        const [i, j] = coordinates;

        const repeat = (i, j) => {
            if (i < 0 || i >= yAxis || j <0 || j >= xAxis || grid[i][j] === 0 || history.includes(`${i}-${j}`)) {
                return 0;
            }

            let add = 1;
            history.push(`${i}-${j}`);
            count += repeat(i, j + 1);
            count += repeat(i, j - 1);
            count += repeat(i + 1, j);
            count += repeat(i - 1, j);

            return add;
        }

        repeat(i, j);

        return count;
    }

    const areaList = points.map(point => readArea(point, 0));
    
    return Math.max(...areaList);
};

// var maxAreaOfIsland = function(grid) {
//     const y = grid[0].length;
//     const x = grid.length;

//     for(let i=0;i<x;i++){
//         for(let j =0;j<y;j++){
//             if(grid[i][j]==1){
//                 max = Math.max(max,cntArea(grid,i,j,x,y))
//             }
//         }
//     }
    
//     return max;
// };

// let cntArea = (grid, i, j, x, y) =>{
//     if(i<0 || i>=x || j<0 || j>=y || grid[i][j]==0) {
//         return 0
//     }    
    
//     let cnt = 1
//     grid[i][j] = 0
    
//     cnt += cntArea(grid, i+1, j, x, y)
//     cnt += cntArea(grid, i-1, j, x, y)
//     cnt += cntArea(grid, i, j+1, x, y)
//     cnt += cntArea(grid, i, j-1, x, y)
    
//     return cnt
// }

console.log(maxAreaOfIsland([[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]));
