/** 
 * 非线性数据结构——图
 */

/**
 * 邻接矩阵
 * 
 * 图最常见的实现是邻接矩阵。每个节点都和一个整数相关联，该整数将作为数组的索引。
 * 
 * 不是强连通的图（[稀疏图.jpg]）如果用邻接矩阵来表示，则矩阵中将会有很多0，
 * 这意味着我们浪费了计算机存储空间来表示根本不存在的边。
 * 例如，找给定顶点的相邻顶点，即使该顶点只有一个相邻顶点，我们也不得不迭代一整行。
 * 邻接矩阵表示法不够好的另一个理由是，图中顶点的数量可能会改变，而2维数组不太灵活
 */

/** 
 * 邻接表 [邻接表.jpg]
 * 
 * 邻接表由图中每个顶点的相邻顶点列表所组成。
 */

/** 
 * 关联矩阵
 * 
 * 在关联矩阵中，矩阵的行表示顶点，列表示边。
 * 如图[关联矩阵.jpg]所示，我们使用二维数组来表示两者之间的连通性，如果顶点v是边e的入射点，则array[v][e] === 1；
 * 否则，array[v][e] === 0
 */ 

/** 
 * 创建图类
 */ 
function Graph() {
    // 数组用于存储图中所有顶点的名字
    const vertices = [];
    let adjList = new Dictionary();

    // 向图中添加一个新的顶点
    this.addVertex = function(v) {
        vertices.push(v);
        // 在邻接表中，设置顶点v作为键对应的字典值为一个空数组
        adjList.set(v, []);
    }

    /** 
     * 这个方法接受两个顶点作为参数。
     * 首先，通过将w加入到v的邻接表中，我们添加了一条自顶点v到顶点w的边。
     */
    this.addEdge = function(v, w) {
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    }

    this.toString = function() {
        let s = '';
        for (var i=0; i<vertices.length; i++) {
            s += vertices[i] + ' -> '; 
            var neighbors = adjList.get(vertices[i]);
            for (var j=0; j<neighbors.length; j++) {
                s += neighbors[j] + ' '; 
            }
            s += '\n'; //{13} 
        }

        return s;
    }
}

function Dictionary() {
    let items = {};

    this.has = function(key) {
        return key in items;
    }

    this.set = function(key, value) {
        items[key] = value;
    }

    this.remove = function(key) {
        if (this.has(key)) {
            delete items[key];
            return true;
        }

        return false;
    }

    this.get = function(key) {
        return this.has(key) ? items[key] : undefined;
    }

    this.values = function() {
        let values = [];
        for (let k in items) {
            values.push(items[k]);
        }

        return values;
    }
}

var graph = new Graph(); 
var myVertices = ['A','B','C','D','E','F','G','H','I']; //{7} 
for (var i=0; i<myVertices.length; i++){ //{8} 
 graph.addVertex(myVertices[i]); 
} 
graph.addEdge('A', 'B'); //{9} 
graph.addEdge('A', 'C'); 
graph.addEdge('A', 'D'); 
graph.addEdge('C', 'D'); 
graph.addEdge('C', 'G'); 
graph.addEdge('D', 'G'); 
graph.addEdge('D', 'H'); 
graph.addEdge('B', 'E'); 
graph.addEdge('B', 'F'); 
graph.addEdge('E', 'I');

console.log(graph.toString());
/**
 *  A -> B C D 
    B -> A E F 
    C -> A D G 
    D -> A C G H 
    E -> B I 
    F -> B 
    G -> C D 
    H -> D 
    I -> E
 */

/** 
 * 图的遍历
 * 
 * 有两种算法可以对图进行遍历：广度优先搜索 和 深度优先搜索
 * 图遍历可以用来寻找特定的顶点或寻找两个顶点之间的路径，检查图是否连通，检查图是否含有环等
 * 
 * 图遍历算法的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索。
 * 对于两种图遍历算法，都需要明确指出第一个被访问的顶点。
 * 
 * 完全探索一个顶点要求我们查看该顶点的每一条边。对于每一条边所连接的没有被访问过的顶点，
 * 将其标注为被发现的，并将其加进待访问顶点列表中。
 * 
 * 为了保证算法的效率，务必访问每个顶点至多两次。连通图中每条边和顶点都会被访问到。
 * 
 * 广度优先搜索算法和深度优先搜索算法基本上是相同的，只有一点不同，那就是待访问顶点列表的数据结构。
 */

/** 
 * 广度优先搜索
 * 
 * [广度优先搜索.jpg]
 * 广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的相邻点，就像一次访问图的一层。
 * 简单的说：就是先宽后深地访问顶点
 */
function Queue() { 
    var items = []; 

    this.enqueue = function(element){ 
        items.push(element); 
    }; 

    this.dequeue = function(){ 
        return items.shift(); 
    }; 

    this.front = function(){ 
        return items[0]; 
    };

    this.isEmpty = function(){ 
        return items.length == 0; 
    }; 

    this.clear = function(){ 
        items = []; 
    }; 

    this.size = function(){ 
        return items.length; 
    }; 

    this.print = function(){ 
        console.log(items.toString()); 
    }; 
}

/** 
 * 从顶点v开始的广度优先搜索算法所遵循的步骤:
 * (1) 创建一个队列Q。
 * (2) 将v标注为被发现的（灰色），并将v入队列Q。
 * (3) 如果Q非空，则运行以下步骤:
 *     - 将u从Q中出队列
 *     - 将标注u为被发现的（灰色） 
 *     - 将u所有未被访问过的邻点（白色）入队列
 *     - 将u标注为已被探索的（黑色）
 */
Graph.prototype.bfs = function(v, callBack) {
    /**
     * vertices是所有顶点的名字
     * initializeColor用于循环所有顶点，设置其值为white
     */
    var initializeColor = function(){ 
        const color = []; 
        for (var i = 0; i<vertices.length; i++) { 
            color[vertices[i]] = 'white'; //{1} 
        } 
        return color; 
    };

    const color = initializeColor();
    const queue = new Queue();
    queue.enqueue(v);

    while (!queue.isEmpty()) {
        let u = queue.dequeue();
        let neighbors = adjList.get(u);
        color[u] = 'grey';

        for (let i = 0; i < neighbors.length; i++) {
            let w = neighbors[i];

            if (color[w] === 'white') {
                color[w] = 'grey';
                queue.enqueue(w);
            }
        }

        color[u] = 'black';

        if (callBack) {
            callBack(u);
        }
    }
}

/** 
 * 深度优先搜索
 * 
 * 步骤：
 * (1) 标注v为被发现的（灰色）
 * (2) 对于v的所有未访问的邻点w
 *      - 访问顶点w
 * (3) 标注v为已被探索的（黑色）
 */ 
Graph.prototype.dfs = function(callback) {
    var initializeColor = function(){ 
        const color = []; 
        for (var i = 0; i<vertices.length; i++) { 
            color[vertices[i]] = 'white'; //{1} 
        } 
        return color; 
    };

    var dfsVisit = function(u, color, callback){ 
        color[u] = 'grey'; //{5} 
        if (callback) { //{6} 
            callback(u); 
        } 
        var neighbors = adjList.get(u); //{7} 
        for (var i=0; i<neighbors.length; i++){ //{8} 
            var w = neighbors[i]; //{9} 
            if (color[w] === 'white'){ //{10} 
                dfsVisit(w, color, callback); //{11} 
            } 
        } 
        color[u] = 'black'; //{12} 
    };

    var color = initializeColor();

    for (var i=0; i<vertices.length; i++){ //{2} 
        if (color[vertices[i]] === 'white'){ //{3} 
            dfsVisit(vertices[i], color, callback); //{4} 
        } 
    }
}

function printNode(value){ //{16} 
    console.log('Visited vertex: ' + value); //{17} 
}

graph.dfs(printNode);